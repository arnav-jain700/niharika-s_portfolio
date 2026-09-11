import { getLocalData } from './data.js';

// Build dynamic contextual system prompt based on real-time portfolio data
export function generateSystemPrompt() {
  const data = getLocalData();
  const { ownerName, ownerBio, email, location, linkedin, github, codolio, medium } = data.settings;

  const skillsList = (data.tech_stacks || []).map(s => s.name).join(', ');
  const projectsList = (data.projects || []).map(p => `• ${p.title} [${p.category}]: ${p.description} (Tech: ${p.tags?.join(', ')})`).join('\n');
  const journeyList = (data.timeline || []).map(t => `• ${t.title} at ${t.company} (${t.dateRange}, ${t.type}): ${t.description}`).join('\n');
  const certsList = (data.certificates || []).map(c => `• ${c.title} from ${c.issuer} (${c.date})`).join('\n');

  const cp = data.settings.codingProfiles || {};
  const codingSummary = `
• LeetCode: ${cp.leetcode?.solvedTotal || 420}+ problems solved (Easy: ${cp.leetcode?.solvedEasy || 150}, Medium: ${cp.leetcode?.solvedMedium || 220}, Hard: ${cp.leetcode?.solvedHard || 50}), Rating: ${cp.leetcode?.rating || 1845}, Global Rank: ${cp.leetcode?.globalRank || 'Top 3.8%'}
• Codeforces: Rating ${cp.codeforces?.rating || 1468} (Max ${cp.codeforces?.maxRating || 1540}), Title: ${cp.codeforces?.rank || 'Specialist'}, Solved: ${cp.codeforces?.solvedTotal || 310}+ problems
• CodeChef: ${cp.codechef?.stars || '4★'} (Rating ${cp.codechef?.rating || 1820}, Max ${cp.codechef?.highestRating || 1865}), Global Rank: ${cp.codechef?.globalRank || '#11,420'}, Solved: ${cp.codechef?.solvedTotal || 260}+
• Codolio: Unified Developer Score ${cp.codolio?.score || 875}/1000
• Total Across Platforms: 990+ Data Structures & Algorithms problems solved.`;

  return `You are the Virtual AI Representative and technical co-pilot for ${ownerName}.
Your purpose is to professionally represent ${ownerName} to recruiters, engineering leaders, clients, and fellow developers.

=== DEVELOPER PROFILE ===
Name: ${ownerName}
Bio: ${ownerBio}
Location: ${location}
Email: ${email}
LinkedIn: ${linkedin}
GitHub: ${github}
Codolio: ${codolio}
Medium: ${medium}

=== TECHNICAL STACK & TOOLS ===
${skillsList || 'Full-Stack Web Development, AI/ML Engineering'}

=== COMPETITIVE PROGRAMMING & CODING PROFILES ===
${codingSummary}

=== FEATURED PROJECTS ===
${projectsList || 'No projects listed.'}

=== ACADEMIC & PROFESSIONAL JOURNEY ===
${journeyList || 'No journey items listed.'}

=== CERTIFICATES & CREDENTIALS ===
${certsList || 'No certificates listed.'}

=== BEHAVIOR & GUIDELINES ===
1. Answer questions about ${ownerName}'s background, tech stack, projects, coding profiles (LeetCode, Codeforces, CodeChef, Codolio), experience, and contact methods accurately based on the data above.
2. Maintain an articulate, confident, friendly, and highly knowledgeable tone.
3. If asked for contact info, CV, or resume, provide ${email} or suggest using the 'CV (PDF)' button in the hero section or the '#contact' section.
4. Keep answers concise (2-4 paragraphs max) unless in-depth technical elaboration is explicitly requested.
5. Format code snippets or project highlights cleanly with markdown.`;
}

// Low-level unified LLM dispatcher
export async function callGroqAI({ messages, systemPrompt, temperature = 0.7, max_tokens = 1024 }) {
  const data = getLocalData();
  const apiKey = data.settings.groqKey || (typeof process !== 'undefined' ? process.env?.GROQ_API_KEY : '');

  const payloadMessages = [];
  if (systemPrompt) {
    payloadMessages.push({ role: 'system', content: systemPrompt });
  }
  payloadMessages.push(...messages);

  // 1. Direct Client-side call to Groq API if API Key is available
  if (apiKey && apiKey.startsWith('gsk_')) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: payloadMessages,
          temperature,
          max_tokens
        })
      });

      if (response.ok) {
        const json = await response.json();
        return json.choices?.[0]?.message?.content || '';
      } else {
        const errText = await response.text();
        console.warn('Groq direct call failed, attempting proxy fallback:', errText);
      }
    } catch (e) {
      console.warn('Groq direct fetch error, trying proxy:', e);
    }
  }

  // 2. Serverless Proxy Fallback (/api/gemini)
  try {
    const proxyRes = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {})
      },
      body: JSON.stringify({
        messages,
        systemPrompt,
        temperature,
        max_tokens,
        model: 'llama-3.3-70b-versatile'
      })
    });

    if (proxyRes.ok) {
      const pJson = await proxyRes.json();
      return pJson.choices?.[0]?.message?.content || '';
    }
  } catch (proxyErr) {
    console.warn('Serverless proxy unavailable:', proxyErr);
  }

  // 3. Fallback: Intelligent Simulated Offline Persona if no API key is present
  return generateOfflineChatResponse(messages[messages.length - 1]?.content || '');
}

// Fallback offline simulator
function generateOfflineChatResponse(userQuery) {
  const data = getLocalData();
  const q = userQuery.toLowerCase();
  const name = data.settings.ownerName;

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language')) {
    const topSkills = data.tech_stacks.slice(0, 6).map(s => s.name).join(', ');
    return `Hello! ${name} is skilled across modern full-stack and AI stacks, especially **${topSkills}**, and cloud-native architectures. You can explore the full tech stack in the [Skills](#skills) section!`;
  }

  if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('app')) {
    const topProj = data.projects[0];
    return `${name}'s flagship project is **${topProj?.title || 'AI Portfolio'}**, which features ${topProj?.description || 'cutting-edge full-stack tech'}. Check out all projects with live demos and source code in the [Projects](#projects) hub!`;
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach') || q.includes('message')) {
    return `You can connect directly with ${name} via email at **${data.settings.email}** or send a message directly using the [Contact Form](#contact). You can also download the verified CV directly from the hero section!`;
  }

  if (q.includes('resume') || q.includes('cv')) {
    return `You can download ${name}'s verified Curriculum Vitae (CV) directly using the 'CV (PDF)' button in the hero section.`;
  }

  return `Greetings! I am ${name}'s Virtual AI Representative. I can walk you through ${name}'s engineering background, projects (${data.projects?.length || 0} active builds), and technical toolkit. How can I assist your team today? *(Tip: Configure a Groq API Key in Settings to enable real-time 600+ tok/sec Groq Llama 3.3 inference!)*`;
}

// AI Project Description Generator
export async function suggestProjectDescription(title, category, tags) {
  const prompt = `Write a high-impact, professional, 2-sentence resume/portfolio bullet description for a developer project.
Project Title: ${title}
Category: ${category}
Technologies: ${tags}

Include action verbs, architectural details, and measurable impact. Output only the description text.`;

  try {
    const res = await callGroqAI({
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 200
    });
    return res.trim().replace(/^"/, '').replace(/"$/, '');
  } catch (e) {
    return `Architected a high-performance ${category} solution utilizing ${tags}, featuring responsive state management, low-latency API integration, and modular component architecture.`;
  }
}

// AI Email Response Drafter
export async function draftEmailReply(senderName, subject, message) {
  const data = getLocalData();
  const owner = data.settings.ownerName;

  const prompt = `You are ${owner}. Draft a polite, concise, and professional email response to an incoming inquiry.
Sender: ${senderName}
Subject: ${subject}
Message: ${message}

Draft response only:`;

  try {
    const reply = await callGroqAI({
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
      max_tokens: 300
    });
    return reply.trim();
  } catch (e) {
    return `Hi ${senderName},\n\nThank you for reaching out regarding "${subject}". I have received your message and would love to discuss this further. Let me know your availability for a brief call or follow-up.\n\nBest regards,\n${owner}`;
  }
}
