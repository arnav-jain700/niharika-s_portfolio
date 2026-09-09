// Universal Serverless API Proxy for Developer Coding Platforms
// Supports LeetCode, Codeforces, CodeChef with parallel fetching & edge caching

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { leetcode, codeforces, codechef } = req.query;

  // Cache response at edge for 30 minutes, browser for 5 minutes
  res.setHeader('Cache-Control', 's-maxage=1800, max-age=300, stale-while-revalidate=3600');

  const stats = {
    leetcode: null,
    codeforces: null,
    codechef: null,
    timestamp: new Date().toISOString()
  };

  const fetchWithTimeout = async (url, options = {}, timeoutMs = 6000) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      return response;
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  };

  // 1. Fetch LeetCode Data
  const leetcodePromise = (async () => {
    if (!leetcode) return;
    try {
      // Primary public proxy
      const r = await fetchWithTimeout(`https://leetcode-stats-api.herokuapp.com/${encodeURIComponent(leetcode)}`);
      if (r.ok) {
        const d = await r.json();
        if (d.status === 'success') {
          stats.leetcode = {
            handle: leetcode,
            solvedTotal: d.totalSolved || 0,
            solvedEasy: d.easySolved || 0,
            solvedMedium: d.mediumSolved || 0,
            solvedHard: d.hardSolved || 0,
            acceptanceRate: d.acceptanceRate ? `${d.acceptanceRate}%` : null,
            globalRank: d.ranking ? `#${d.ranking.toLocaleString()}` : null,
            contributionPoints: d.contributionPoints || 0,
            reputation: d.reputation || 0,
            url: `https://leetcode.com/u/${leetcode}/`
          };
          return;
        }
      }
    } catch (e) {
      console.warn('Leetcode proxy 1 failed:', e.message);
    }

    try {
      // Secondary fallback proxy
      const r2 = await fetchWithTimeout(`https://alfa-leetcode-api.onrender.com/userProfile/${encodeURIComponent(leetcode)}`);
      if (r2.ok) {
        const d2 = await r2.json();
        stats.leetcode = {
          handle: leetcode,
          solvedTotal: d2.totalSolved || 0,
          solvedEasy: d2.easySolved || 0,
          solvedMedium: d2.mediumSolved || 0,
          solvedHard: d2.hardSolved || 0,
          globalRank: d2.ranking ? `#${d2.ranking.toLocaleString()}` : null,
          url: `https://leetcode.com/u/${leetcode}/`
        };
      }
    } catch (e) {
      console.warn('Leetcode proxy 2 failed:', e.message);
    }
  })();

  // 2. Fetch Codeforces Data
  const codeforcesPromise = (async () => {
    if (!codeforces) return;
    try {
      const [infoRes, statusRes] = await Promise.allSettled([
        fetchWithTimeout(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(codeforces)}`),
        fetchWithTimeout(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(codeforces)}&from=1&count=2000`)
      ]);

      let userInfo = null;
      let solvedCount = 0;

      if (infoRes.status === 'fulfilled' && infoRes.value.ok) {
        const d = await infoRes.value.json();
        if (d.status === 'OK' && d.result?.[0]) {
          userInfo = d.result[0];
        }
      }

      if (statusRes.status === 'fulfilled' && statusRes.value.ok) {
        const d = await statusRes.value.json();
        if (d.status === 'OK' && Array.isArray(d.result)) {
          const solvedSet = new Set();
          d.result.forEach(sub => {
            if (sub.verdict === 'OK' && sub.problem) {
              solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
            }
          });
          solvedCount = solvedSet.size;
        }
      }

      if (userInfo) {
        stats.codeforces = {
          handle: codeforces,
          rating: userInfo.rating || 0,
          maxRating: userInfo.maxRating || 0,
          rank: userInfo.rank ? userInfo.rank.charAt(0).toUpperCase() + userInfo.rank.slice(1) : 'Unrated',
          maxRank: userInfo.maxRank ? userInfo.maxRank.charAt(0).toUpperCase() + userInfo.maxRank.slice(1) : 'Unrated',
          solvedTotal: solvedCount,
          organization: userInfo.organization || '',
          url: `https://codeforces.com/profile/${codeforces}`
        };
      }
    } catch (e) {
      console.warn('Codeforces fetch failed:', e.message);
    }
  })();

  // 3. Fetch CodeChef Data
  const codechefPromise = (async () => {
    if (!codechef) return;
    try {
      const r = await fetchWithTimeout(`https://codechef-api.vercel.app/handle/${encodeURIComponent(codechef)}`);
      if (r.ok) {
        const d = await r.json();
        if (d.success !== false) {
          stats.codechef = {
            handle: codechef,
            stars: d.stars ? `${d.stars}` : '3★',
            rating: d.currentRating || 0,
            highestRating: d.highestRating || 0,
            globalRank: d.globalRank ? `#${Number(d.globalRank).toLocaleString()}` : null,
            countryRank: d.countryRank ? `#${Number(d.countryRank).toLocaleString()}` : null,
            solvedTotal: d.problemsSolved || 0,
            url: `https://www.codechef.com/users/${codechef}`
          };
        }
      }
    } catch (e) {
      console.warn('Codechef fetch failed:', e.message);
    }
  })();

  // Run all in parallel with max 6s wait
  await Promise.allSettled([leetcodePromise, codeforcesPromise, codechefPromise]);

  res.status(200).json({
    success: true,
    data: stats
  });
}
