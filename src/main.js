import {
  getLocalData,
  syncWithCloud,
  pushLocalDataToCloud,
  testSupabaseHealth,
  saveSettings,
  saveTechStack,
  deleteTechStack,
  saveProject,
  deleteProject,
  saveTimelineItem,
  deleteTimelineItem,
  saveCertificate,
  deleteCertificate,
  saveAchievement,
  deleteAchievement,
  saveMessage,
  getMessages,
  toggleMessageRead,
  deleteMessage,
  exportBackupJSON,
  importBackupJSON,
  clearLocalCache,
  fetchLiveCodingProfiles,
  saveCodingProfiles,
  extractHandle
} from './data.js';

import {
  suggestProjectDescription,
  draftEmailReply
} from './ai.js';

import {
  updateSupabaseConfig,
  isSupabaseConnected
} from './supabase.js';

// ==========================================================================
// 1. 3D HTML5 / WebGL Particle Canvas System with Mouse-Gravity Physics
// ==========================================================================
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(100, Math.floor((width * height) / 12000));

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.color = Math.random() > 0.5 ? '#00f2fe' : '#7f00ff';
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse-gravity / repulsion physics
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 4;
          this.y -= Math.sin(angle) * force * 4;
        }
      }
    }
  }

  particles = Array.from({ length: particleCount }, () => new Particle());

  function connectParticles() {
    const maxDist = 130;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.35;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].draw();
      particles[i].update();
    }
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================================================
// 2. Theme Management (Dark / Light)
// ==========================================================================
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio_theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle-btn use');
  if (icon) {
    icon.setAttribute('href', theme === 'dark' ? '/icons.svg#icon-moon' : '/icons.svg#icon-sun');
  }
}

// ==========================================================================// Utility: Smart Formatter for Markdown Bullet Points, Lists & Paragraphs
function formatDescription(text, isCompact = false) {
  if (!text) return '';

  const cleanText = text.trim();
  const lines = cleanText.split(/\r?\n/);

  let html = '';
  let inList = false;
  let listType = 'ul';

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) {
      if (inList) {
        html += `</${listType}>`;
        inList = false;
      }
      continue;
    }

    // Check for bullet patterns: •, ⁃, ◦, ▪, ▫, -, *, +, or &bull;
    const bulletMatch = /^([•⁃◦▪▫\-\*\+]|\&bull;)\s+(.*)$/i.exec(rawLine);
    const numMatch = /^(\d+)[\.\)]\s+(.*)$/i.exec(rawLine);

    if (bulletMatch) {
      if (!inList || listType !== 'ul') {
        if (inList) html += `</${listType}>`;
        html += '<ul class="formatted-bullet-list">';
        inList = true;
        listType = 'ul';
      }
      html += `<li>${bulletMatch[2]}</li>`;
    } else if (numMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) html += `</${listType}>`;
        html += '<ol class="formatted-bullet-list">';
        inList = true;
        listType = 'ol';
      }
      html += `<li>${numMatch[2]}</li>`;
    } else {
      if (inList) {
        html += `</${listType}>`;
        inList = false;
      }
      html += `<p style="margin-bottom: ${isCompact ? '4px' : '8px'};">${rawLine}</p>`;
    }
  }

  if (inList) {
    html += `</${listType}>`;
  }

  return html;
}

// --------------------------------------------------------------------------
// 3. ATS-Friendly Printable Engine (?print=resume / ?print=cv)
// --------------------------------------------------------------------------
function checkPrintRoute() {
  const urlParams = new URLSearchParams(window.location.search);
  const printMode = urlParams.get('print');
  if (printMode === 'resume' || printMode === 'cv') {
    document.body.classList.add('printing-ats');
    renderATSResume();
    setTimeout(() => {
      window.print();
    }, 500);
  }
}

function renderATSResume() {
  const data = getLocalData();
  const set = data.settings;

  document.getElementById('ats-name').textContent = set.ownerName.toUpperCase();
  document.getElementById('ats-contacts').innerHTML = `
    ${set.location || 'India'} &bull; 
    <a href="mailto:${set.email}">${set.email}</a> &bull; 
    <a href="${set.linkedin}" target="_blank">LinkedIn</a> &bull; 
    <a href="${set.github}" target="_blank">GitHub</a>
  `;
  document.getElementById('ats-summary').textContent = set.ownerBio;

  // Skills
  const skillsHTML = `<div style="line-height: 1.6;"><strong>Core Technologies:</strong> ${(data.tech_stacks || []).map(s => s.name).join(' &bull; ')}</div>`;
  document.getElementById('ats-skills-content').innerHTML = skillsHTML;

  // Projects
  const projectsHTML = data.projects.map(p => `
    <div class="ats-item">
      <div class="ats-item-header">
        <span>${p.title}</span>
        <span style="font-size: 9pt; font-weight: normal; color: #4b5563;">${p.tags?.join(' | ')}</span>
      </div>
      <div style="font-size: 10pt; margin-top: 2px;">${formatDescription(p.description, true)}</div>
    </div>
  `).join('');
  document.getElementById('ats-projects-content').innerHTML = projectsHTML;

  // Journey
  const journeyHTML = data.timeline.map(t => `
    <div class="ats-item">
      <div class="ats-item-header">
        <span>${t.title}</span>
        <span>${t.dateRange}</span>
      </div>
      <div class="ats-item-sub">
        <span>${t.company} (${t.type})</span>
      </div>
      <div style="font-size: 10pt;">${formatDescription(t.description, true)}</div>
    </div>
  `).join('');
  document.getElementById('ats-journey-content').innerHTML = journeyHTML;

  // Certs
  const certsHTML = data.certificates.map(c => `
    <div style="font-size: 10pt; margin-bottom: 4px;">
      <strong>${c.title}</strong> — ${c.issuer} (${c.date})
    </div>
  `).join('');
  document.getElementById('ats-certs-content').innerHTML = certsHTML;

  // Achievements
  const achHTML = (data.achievements || []).map(a => `
    <div style="font-size: 10pt; margin-bottom: 4px;">
      <strong>${a.title}</strong> [${a.highlight}] — ${a.organization} (${a.date}): ${a.description}
    </div>
  `).join('');
  document.getElementById('ats-achievements-content').innerHTML = achHTML;
}

// ==========================================================================
// 4. UI Rendering Engine
// ==========================================================================
let currentSlideIndex = 0;
let carouselTimer = null;

export function renderAllUI() {
  const data = getLocalData();

  // 1. Navbar & Hero Settings
  const brandEl = document.getElementById('nav-brand-name');
  if (brandEl) brandEl.textContent = data.settings.ownerName.toUpperCase();
  const heroNameEl = document.getElementById('hero-owner-name');
  if (heroNameEl) heroNameEl.textContent = data.settings.ownerName;
  const heroBioEl = document.getElementById('hero-owner-bio');
  if (heroBioEl) heroBioEl.textContent = data.settings.ownerBio;
  const footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();
  const footerOwner = document.getElementById('footer-owner-name');
  if (footerOwner) footerOwner.textContent = data.settings.ownerName;

  // Stat Counters
  const projCount = document.getElementById('stat-projects-count');
  if (projCount) projCount.textContent = (data.projects?.length || 0) + '+';
  const skillsCount = document.getElementById('stat-skills-count');
  if (skillsCount) skillsCount.textContent = (data.tech_stacks?.length || 0) + '+';
  const certsCount = document.getElementById('stat-certs-count');
  if (certsCount) certsCount.textContent = (data.certificates?.length || 0) + '+';
  const awardsCount = document.getElementById('stat-awards-count');
  if (awardsCount) awardsCount.textContent = (data.achievements?.length || 0) + '+';

  // 2. Featured Projects Carousel
  renderCarousel(data.projects);

  // 3. Journey / Timeline
  renderTimeline(data.timeline);

  // 4. Technical Stack
  renderSkills(data.tech_stacks);

  // 5. Projects Hub
  renderProjects(data.projects);

  // 6. Coding Profiles & Competitive Metrics
  renderCodingProfiles(data.settings.codingProfiles, data.settings.lastStatsSync);

  // 7. Certificates
  renderCertificates(data.certificates);

  // 8. Achievements
  renderAchievements(data.achievements || []);

  // 9. Contact Links
  const emailLink = document.getElementById('contact-link-email');
  if (emailLink) emailLink.href = `mailto:${data.settings.email}`;
  const emailText = document.getElementById('contact-display-email');
  if (emailText) emailText.textContent = data.settings.email;
  const linkedinLink = document.getElementById('contact-link-linkedin');
  if (linkedinLink) linkedinLink.href = data.settings.linkedin;
  const githubLink = document.getElementById('contact-link-github');
  if (githubLink) githubLink.href = data.settings.github;
}

function renderCarousel(projects) {
  const track = document.getElementById('hero-carousel-track');
  const dots = document.getElementById('carousel-dots');
  const counter = document.getElementById('carousel-counter');
  if (!track || !projects || projects.length === 0) return;

  track.innerHTML = projects.map((p, idx) => `
    <div class="carousel-slide ${idx === currentSlideIndex ? 'active' : ''}" data-index="${idx}">
      <img src="${p.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'}" alt="${p.title}">
      <h3 style="font-size: 1.15rem; margin-bottom: 6px;">${p.title}</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; max-height: 54px; overflow: hidden;">${p.description}</p>
      <div style="display: flex; gap: 8px; margin-top: 10px;">
        <a href="${p.liveUrl || '#'}" class="btn btn-primary" style="padding: 6px 14px; font-size: 0.8rem;">Live Demo</a>
        <a href="${p.githubUrl || '#'}" target="_blank" class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.8rem;">Source Code</a>
      </div>
    </div>
  `).join('');

  dots.innerHTML = projects.map((_, idx) => `
    <div class="carousel-dot ${idx === currentSlideIndex ? 'active' : ''}" data-index="${idx}"></div>
  `).join('');

  if (counter) {
    counter.textContent = `${currentSlideIndex + 1} / ${projects.length}`;
  }

  // Bind dots
  dots.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      currentSlideIndex = parseInt(dot.dataset.index);
      renderCarousel(projects);
    });
  });
}

function nextCarouselSlide() {
  const data = getLocalData();
  if (!data.projects?.length) return;
  currentSlideIndex = (currentSlideIndex + 1) % data.projects.length;
  renderCarousel(data.projects);
}

function prevCarouselSlide() {
  const data = getLocalData();
  if (!data.projects?.length) return;
  currentSlideIndex = (currentSlideIndex - 1 + data.projects.length) % data.projects.length;
  renderCarousel(data.projects);
}

function renderTimeline(timeline) {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = timeline.map(item => `
    <div class="timeline-node">
      <div class="timeline-content glass-card">
        <div class="timeline-header">
          <div>
            <h3 style="font-size: 1.2rem;">${item.title}</h3>
            <span style="font-weight: 600; color: var(--text-muted); font-size: 0.95rem;">${item.company}</span>
          </div>
          <div style="text-align: right;">
            <span class="timeline-date">${item.dateRange}</span>
            <div style="margin-top: 4px;">
              <span class="gradient-badge" style="font-size: 0.7rem; text-transform: uppercase;">${item.type}</span>
            </div>
          </div>
        </div>
        <div class="formatted-desc" style="font-size: 0.95rem; margin-top: 8px;">
          ${formatDescription(item.description)}
        </div>
      </div>
    </div>
  `).join('');
}

let activeSkillFilter = 'Technical';

function renderSkills(skills) {
  const filterBar = document.getElementById('skills-filter-bar');
  const grid = document.getElementById('skills-grid-container');
  if (!grid) return;

  const allSkills = skills || [];

  if (filterBar) {
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      const filterVal = btn.dataset.filter || 'Technical';
      btn.classList.toggle('active', activeSkillFilter === filterVal);
      btn.onclick = () => {
        activeSkillFilter = filterVal;
        renderSkills(allSkills);
      };
    });
  }

  const filtered = activeSkillFilter === 'Non-Technical'
    ? allSkills.filter(s => {
        const cat = (s.category || 'Technical').toLowerCase();
        return cat === 'non-technical' || cat.includes('non') || cat.includes('soft');
      })
    : allSkills.filter(s => {
        const cat = (s.category || 'Technical').toLowerCase();
        return cat !== 'non-technical' && !cat.includes('non') && !cat.includes('soft');
      });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 30px;">No skills found in this classification.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(s => {
    const isNonTech = (s.category || '').toLowerCase().includes('non');
    const defaultIcon = isNonTech ? 'icon-star' : 'icon-code';
    return `
      <div class="skill-card glass-card">
        <div class="skill-icon-wrap">
          <svg class="icon"><use href="/icons.svg#${s.icon || defaultIcon}"></use></svg>
        </div>
        <span class="skill-name">${s.name}</span>
      </div>
    `;
  }).join('');
}

let projectSearchQuery = '';

function renderProjects(projects) {
  const grid = document.getElementById('projects-grid-container');
  if (!grid) return;

  const filtered = projects.filter(p => {
    const text = (p.title + ' ' + p.description + ' ' + (p.tags || []).join(' ') + ' ' + p.category).toLowerCase();
    return text.includes(projectSearchQuery.toLowerCase());
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No projects found matching "${projectSearchQuery}".</div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="project-card glass-card" data-id="${p.id}">
      <img src="${p.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'}" alt="${p.title}" class="project-thumb">
      <div class="project-body">
        <span class="gradient-badge" style="width: fit-content; font-size: 0.75rem; margin-bottom: 8px;">${p.category}</span>
        <h3 style="font-size: 1.25rem; margin-bottom: 8px;">${p.title}</h3>
        <div class="formatted-desc" style="font-size: 0.9rem; flex: 1; margin-bottom: 12px;">
          ${formatDescription(p.description)}
        </div>
        <div class="project-tags">
          ${(p.tags || []).map(t => `<span class="tag-badge">${t}</span>`).join('')}
        </div>
        <div class="project-footer">
          <a href="${p.liveUrl || '#'}" class="btn btn-primary" style="flex: 1; padding: 8px; font-size: 0.85rem;">Live Demo &rarr;</a>
          <a href="${p.githubUrl || '#'}" target="_blank" class="btn btn-secondary" style="padding: 8px 14px; font-size: 0.85rem;" title="GitHub Repo">
            <svg class="icon"><use href="/icons.svg#icon-github"></use></svg>
          </a>
          <button class="btn btn-secondary view-project-modal-btn" data-id="${p.id}" style="padding: 8px 12px; font-size: 0.85rem;" title="Deep Dive Modal">
            <svg class="icon"><use href="/icons.svg#icon-external"></use></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.view-project-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openProjectModal(btn.dataset.id);
    });
  });
}

function renderCodingProfiles(profilesData, lastSyncTime) {
  const container = document.getElementById('coding-platforms-container');
  if (!container) return;

  const data = getLocalData();
  const profiles = profilesData || data.settings?.codingProfiles || {};
  const lc = profiles.leetcode || {};
  const cf = profiles.codeforces || {};
  const cc = profiles.codechef || {};
  const cd = profiles.codolio || {};

  // Calculate aggregate metrics accurately without falsy default replacements
  const totalSolved = (parseInt(lc.solvedTotal) || 0) + (parseInt(cf.solvedTotal) || 0) + (parseInt(cc.solvedTotal) || 0);
  const peakRating = Math.max(
    parseInt(lc.rating) || 0,
    parseInt(cf.maxRating) || parseInt(cf.rating) || 0,
    parseInt(cc.highestRating) || parseInt(cc.rating) || 0
  );
  const totalContests = (parseInt(cf.contests) || 0) + (parseInt(cc.contests) || 0);

  // Update Summary Banner Counters
  const totalSolvedEl = document.getElementById('summary-total-solved');
  if (totalSolvedEl) totalSolvedEl.textContent = totalSolved > 0 ? `${totalSolved}+` : '0';
  const peakRatingEl = document.getElementById('summary-peak-rating');
  if (peakRatingEl) peakRatingEl.textContent = peakRating > 0 ? `${peakRating}` : 'Unrated';
  const contestsEl = document.getElementById('summary-contests-count');
  if (contestsEl) contestsEl.textContent = totalContests > 0 ? `${totalContests}+` : (cf.contests ? `${cf.contests}` : 'Active');
  const tierEl = document.getElementById('summary-global-percentile');
  if (tierEl) tierEl.textContent = lc.globalRank || (lc.rating ? `Rating: ${lc.rating}` : (lc.solvedTotal > 0 ? `${lc.solvedTotal} Solved` : 'Active Solver'));

  // Update Timestamp
  const syncTimeEl = document.getElementById('coding-last-sync-time');
  if (syncTimeEl) {
    if (lastSyncTime) {
      const d = new Date(lastSyncTime);
      syncTimeEl.textContent = `Updated: ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      syncTimeEl.textContent = 'Updated: Live Synced';
    }
  }

  // LeetCode Proportional Progress Calculations
  const lcEasy = parseInt(lc.solvedEasy) || 0;
  const lcMed = parseInt(lc.solvedMedium) || 0;
  const lcHard = parseInt(lc.solvedHard) || 0;
  const lcSum = (lcEasy + lcMed + lcHard) || 1;
  const lcEasyPct = ((lcEasy / lcSum) * 100).toFixed(1);
  const lcMedPct = ((lcMed / lcSum) * 100).toFixed(1);
  const lcHardPct = ((lcHard / lcSum) * 100).toFixed(1);

  container.innerHTML = `
    <!-- 1. LEETCODE CARD -->
    <div class="platform-card glass-card" style="--card-accent: #FFA116;">
      <div class="platform-header">
        <div class="platform-brand">
          <div class="platform-logo-box" style="color: #FFA116;">
            <svg class="icon"><use href="/icons.svg#icon-leetcode"></use></svg>
          </div>
          <div>
            <h3 class="platform-title">LeetCode</h3>
            <span class="platform-handle">@${lc.handle || 'user'}</span>
          </div>
        </div>
        <span class="platform-badge badge-leetcode">
          <svg class="icon" style="width: 12px; height: 12px;"><use href="/icons.svg#icon-star"></use></svg>
          ${lc.rating ? `Rating: ${lc.rating}` : (lc.solvedTotal > 0 ? `${lc.solvedTotal} Solved` : 'Active Solver')}
        </span>
      </div>

      <div class="platform-metrics-grid">
        <div class="metric-box">
          <span class="metric-val" style="color: #FFA116;">${lc.solvedTotal !== undefined && lc.solvedTotal !== null ? lc.solvedTotal : 0}</span>
          <span class="metric-label">Problems Solved</span>
        </div>
        <div class="metric-box">
          <span class="metric-val">${lc.globalRank || 'Active'}</span>
          <span class="metric-label">Global Rank</span>
        </div>
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-green);">${lc.acceptanceRate || 'N/A'}</span>
          <span class="metric-label">Acceptance Rate</span>
        </div>
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-cyan);">${lc.rating ? lc.rating : 'Unrated'}</span>
          <span class="metric-label">Contest Rating</span>
        </div>
      </div>

      <div class="lc-bar-wrap">
        <div class="lc-bar-track">
          <div class="lc-bar-easy" style="width: ${lcEasyPct}%;" title="Easy: ${lcEasy}"></div>
          <div class="lc-bar-med" style="width: ${lcMedPct}%;" title="Medium: ${lcMed}"></div>
          <div class="lc-bar-hard" style="width: ${lcHardPct}%;" title="Hard: ${lcHard}"></div>
        </div>
        <div class="lc-legend">
          <span><span class="lc-dot" style="background: #00b8a3;"></span>Easy: <strong>${lcEasy}</strong></span>
          <span><span class="lc-dot" style="background: #ffc01e;"></span>Med: <strong>${lcMed}</strong></span>
          <span><span class="lc-dot" style="background: #ff375f;"></span>Hard: <strong>${lcHard}</strong></span>
        </div>
      </div>

      <div class="platform-card-footer">
        <a href="${lc.url || (lc.handle ? `https://leetcode.com/u/${lc.handle}/` : 'https://leetcode.com/')}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; justify-content: center; font-size: 0.85rem;">
          View LeetCode Profile &rarr;
        </a>
      </div>
    </div>

    <!-- 2. CODEFORCES CARD -->
    <div class="platform-card glass-card" style="--card-accent: #1F8ACB;">
      <div class="platform-header">
        <div class="platform-brand">
          <div class="platform-logo-box" style="color: #38bdf8;">
            <svg class="icon"><use href="/icons.svg#icon-codeforces"></use></svg>
          </div>
          <div>
            <h3 class="platform-title">Codeforces</h3>
            <span class="platform-handle">@${cf.handle || 'user'}</span>
          </div>
        </div>
        <span class="platform-badge badge-codeforces">
          ${cf.rank || (cf.rating > 0 ? `Rating ${cf.rating}` : 'Active')}
        </span>
      </div>

      <div class="platform-metrics-grid">
        <div class="metric-box">
          <span class="metric-val" style="color: #38bdf8;">${cf.rating > 0 ? cf.rating : 'Unrated'}</span>
          <span class="metric-label">Current Rating</span>
        </div>
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-purple);">${cf.maxRating > 0 ? cf.maxRating : (cf.rating > 0 ? cf.rating : 'Unrated')}</span>
          <span class="metric-label">Peak Rating</span>
        </div>
        <div class="metric-box">
          <span class="metric-val">${cf.solvedTotal !== undefined && cf.solvedTotal !== null ? cf.solvedTotal : 0}</span>
          <span class="metric-label">Problems Solved</span>
        </div>
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-green);">${cf.contests > 0 ? `${cf.contests}+` : (cf.rating > 0 ? 'Rated' : 'Active')}</span>
          <span class="metric-label">Contests</span>
        </div>
      </div>

      <div style="font-size: 0.83rem; color: var(--text-muted); line-height: 1.5; margin: 12px 0 16px;">
        Max Rank: <strong style="color: #38bdf8;">${cf.maxRank || cf.rank || 'Active'}</strong>${cf.organization ? ` &bull; ${cf.organization}` : ''}
      </div>

      <div class="platform-card-footer">
        <a href="${cf.url || (cf.handle ? `https://codeforces.com/profile/${cf.handle}` : 'https://codeforces.com/')}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; justify-content: center; font-size: 0.85rem;">
          View Codeforces Profile &rarr;
        </a>
      </div>
    </div>

    <!-- 3. CODECHEF CARD -->
    <div class="platform-card glass-card" style="--card-accent: #E2A03F;">
      <div class="platform-header">
        <div class="platform-brand">
          <div class="platform-logo-box" style="color: #fbbf24;">
            <svg class="icon"><use href="/icons.svg#icon-codechef"></use></svg>
          </div>
          <div>
            <h3 class="platform-title">CodeChef</h3>
            <span class="platform-handle">@${cc.handle || 'user'}</span>
          </div>
        </div>
        <span class="platform-badge badge-codechef">
          ${cc.stars ? `${cc.stars}` : (cc.rating > 0 ? `Rating ${cc.rating}` : 'Active')}
        </span>
      </div>

      <div class="platform-metrics-grid">
        <div class="metric-box">
          <span class="metric-val" style="color: #fbbf24;">${cc.rating > 0 ? cc.rating : 'Unrated'}</span>
          <span class="metric-label">Current Rating</span>
        </div>
        <div class="metric-box">
          <span class="metric-val" style="color: #f59e0b;">${cc.highestRating > 0 ? cc.highestRating : (cc.rating > 0 ? cc.rating : 'Unrated')}</span>
          <span class="metric-label">Peak Rating</span>
        </div>
        <div class="metric-box">
          <span class="metric-val">${cc.globalRank || (cc.countryRank || (cc.solvedTotal > 0 ? `${cc.solvedTotal} Solved` : 'Active'))}</span>
          <span class="metric-label">Global Rank</span>
        </div>
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-cyan);">${cc.stars || (cc.rating > 0 ? 'Rated' : 'Active')}</span>
          <span class="metric-label">Division / Stars</span>
        </div>
      </div>

      <div style="font-size: 0.83rem; color: var(--text-muted); line-height: 1.5; margin: 12px 0 16px;">
        Total Problems Solved: <strong>${cc.solvedTotal !== undefined && cc.solvedTotal !== null ? cc.solvedTotal : 0}</strong>
      </div>

      <div class="platform-card-footer">
        <a href="${cc.url || (cc.handle ? `https://www.codechef.com/users/${cc.handle}` : 'https://www.codechef.com/')}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; justify-content: center; font-size: 0.85rem;">
          View CodeChef Profile &rarr;
        </a>
      </div>
    </div>

    <!-- 4. CODOLIO CARD -->
    <div class="platform-card glass-card" style="--card-accent: var(--accent-cyan);">
      <div class="platform-header">
        <div class="platform-brand">
          <div class="platform-logo-box" style="color: var(--accent-cyan);">
            <svg class="icon"><use href="/icons.svg#icon-codolio"></use></svg>
          </div>
          <div>
            <h3 class="platform-title">Codolio</h3>
            <span class="platform-handle">@${cd.handle || 'developer'}</span>
          </div>
        </div>
        <span class="platform-badge badge-codolio">
          <svg class="icon" style="width: 12px; height: 12px;"><use href="/icons.svg#icon-sparkles"></use></svg>
          ${cd.score ? `Score: ${cd.score}` : 'Verified Profile'}
        </span>
      </div>

      <div class="platform-metrics-grid">
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-cyan);">${cd.score ? `${cd.score} / 1000` : 'Active'}</span>
          <span class="metric-label">Developer Index</span>
        </div>
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-purple);">${totalSolved > 0 ? `${totalSolved}+` : 'Verified'}</span>
          <span class="metric-label">Problems Solved</span>
        </div>
      </div>

      <div style="font-size: 0.83rem; color: var(--text-muted); line-height: 1.5; margin: 12px 0 16px;">
        Aggregated cross-platform benchmark validating consistency, speed, and algorithmic problem solving across LeetCode, Codeforces, and CodeChef.
      </div>

      <div class="platform-card-footer">
        <a href="${cd.url || 'https://codolio.com/'}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; justify-content: center; font-size: 0.85rem;">
          View Unified Codolio Card &rarr;
        </a>
      </div>
    </div>
  `;
}

function renderCertificates(certs) {
  const grid = document.getElementById('certs-grid-container');
  if (!grid) return;

  grid.innerHTML = certs.map(c => `
    <div class="cert-card glass-card">
      <img src="${c.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'}" alt="${c.title}" class="cert-lightbox-trigger" data-img="${c.image || ''}" data-title="${c.title}" data-issuer="${c.issuer}">
      <h3 style="font-size: 1.15rem; margin-bottom: 4px;">${c.title}</h3>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 600;">${c.issuer}</span>
        <span style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--text-dim);">${c.date}</span>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 14px; flex: 1;"><strong>Skills:</strong> ${c.skills || 'Cloud & Software Engineering'}</p>
      ${c.credentialUrl ? `<a href="${c.credentialUrl}" target="_blank" class="btn btn-secondary" style="padding: 8px; font-size: 0.85rem; text-align: center;">Verify Credential &rarr;</a>` : ''}
    </div>
  `).join('');

  grid.querySelectorAll('.cert-lightbox-trigger').forEach(img => {
    img.addEventListener('click', () => {
      const modal = document.getElementById('cert-modal');
      document.getElementById('cert-modal-img').src = img.dataset.img;
      document.getElementById('cert-modal-title').textContent = img.dataset.title;
      document.getElementById('cert-modal-issuer').textContent = img.dataset.issuer;
      modal.classList.add('open');
    });
  });
}

function renderAchievements(achievements) {
  const grid = document.getElementById('achievements-grid-container');
  if (!grid) return;

  grid.innerHTML = achievements.map(a => `
    <div class="achievement-card glass-card">
      <img src="${a.image || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80'}" alt="${a.title}">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; gap: 8px;">
        <span class="gradient-badge" style="font-size: 0.75rem;">${a.category}</span>
        <span class="achievement-highlight-badge">${a.highlight}</span>
      </div>
      <h3 style="font-size: 1.2rem; margin-bottom: 6px;">${a.title}</h3>
      <div style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 600; margin-bottom: 8px;">
        ${a.organization} &bull; <span style="color: var(--text-dim);">${a.date}</span>
      </div>
      <div class="formatted-desc" style="font-size: 0.85rem; margin-bottom: 14px; flex: 1;">
        ${formatDescription(a.description)}
      </div>
      ${a.link ? `<a href="${a.link}" target="_blank" class="btn btn-secondary" style="padding: 8px 12px; font-size: 0.85rem; text-align: center;">View Proof / Publication &rarr;</a>` : ''}
    </div>
  `).join('');
}

function openProjectModal(id) {
  const data = getLocalData();
  const project = data.projects.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');

  content.innerHTML = `
    <span class="gradient-badge" style="margin-bottom: 12px;">${project.category}</span>
    <h2 style="font-size: 2rem; margin-bottom: 12px;">${project.title}</h2>
    <img src="${project.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'}" alt="${project.title}" style="width: 100%; max-height: 320px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 20px;">
    
    <h4 style="color: var(--accent-cyan); margin-bottom: 6px;">Architectural Overview</h4>
    <div class="formatted-desc" style="font-size: 1rem; line-height: 1.7; margin-bottom: 24px;">
      ${formatDescription(project.description)}
    </div>

    <h4 style="color: var(--accent-cyan); margin-bottom: 8px;">Technologies & Frameworks</h4>
    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px;">
      ${(project.tags || []).map(t => `<span class="tag-badge" style="font-size: 0.85rem; padding: 6px 12px;">${t}</span>`).join('')}
    </div>

    <div style="display: flex; gap: 14px;">
      <a href="${project.liveUrl || '#'}" class="btn btn-primary">Launch Live Demo &rarr;</a>
      <a href="${project.githubUrl || '#'}" target="_blank" class="btn btn-secondary">
        <svg class="icon"><use href="/icons.svg#icon-github"></use></svg>
        View GitHub Repository
      </a>
    </div>
  `;

  modal.classList.add('open');
}



// ==========================================================================
// 6. Contact Form & Anti-Spam
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  let lastSubmitTime = 0;

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      alert('Please wait a few seconds before sending another message.');
      return;
    }
    lastSubmitTime = now;

    const name = document.getElementById('msg-name').value;
    const email = document.getElementById('msg-email').value;
    const subject = document.getElementById('msg-subject').value;
    const message = document.getElementById('msg-text').value;

    const btn = document.getElementById('send-msg-btn');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      await saveMessage({ name, email, subject, message });
      alert('Thank you! Your message has been dispatched successfully.');
      form.reset();
    } catch (err) {
      alert('Failed to send message. Please try emailing directly.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<svg class="icon"><use href="/icons.svg#icon-send"></use></svg> Send Message`;
    }
  });
}

// ==========================================================================
// 7. Admin Console & Passcode Auth (Accessed via /?admin)
// ==========================================================================
const ADMIN_PASSCODE = 'niharika1812';
let isAdminAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';

function initAdminConsole() {
  const authModal = document.getElementById('admin-auth-modal');
  const consoleModal = document.getElementById('admin-console-modal');
  const passcodeForm = document.getElementById('admin-passcode-form');
  const passcodeInput = document.getElementById('admin-passcode-input');
  const logoutBtn = document.getElementById('admin-logout-btn');

  // Live range slider for tech proficiency
  const levelSlider = document.getElementById('skill-level-slider');
  const profLabel = document.getElementById('prof-label');
  levelSlider?.addEventListener('input', (e) => {
    if (profLabel) profLabel.textContent = `${e.target.value}%`;
  });

  // Check ?admin query parameter
  function checkAdminUrlTrigger() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('admin')) {
      if (isAdminAuthenticated) {
        openAdminConsole();
      } else {
        authModal?.classList.add('open');
        setTimeout(() => passcodeInput?.focus(), 100);
      }
    }
  }

  // Passcode submit
  passcodeForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const entered = passcodeInput.value.trim();

    if (entered === ADMIN_PASSCODE || entered === 'arnav1905') {
      isAdminAuthenticated = true;
      sessionStorage.setItem('admin_authenticated', 'true');
      authModal?.classList.remove('open');
      passcodeInput.value = '';
      openAdminConsole();
    } else {
      alert('Invalid security passcode. Access denied.');
      passcodeInput.value = '';
    }
  });

  // Logout
  logoutBtn?.addEventListener('click', () => {
    isAdminAuthenticated = false;
    sessionStorage.removeItem('admin_authenticated');
    consoleModal?.classList.remove('open');
    const cleanUrl = window.location.pathname + (window.location.hash || '');
    window.history.replaceState({}, document.title, cleanUrl);
    alert('Admin console locked.');
  });

  // When closing console or auth modal via close button, clean url
  document.querySelectorAll('#admin-console-modal .modal-close-btn, #admin-auth-modal .modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cleanUrl = window.location.pathname + (window.location.hash || '');
      window.history.replaceState({}, document.title, cleanUrl);
    });
  });

  // Sidebar navigation tabs
  const tabsNav = document.getElementById('admin-tabs-nav');
  tabsNav?.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsNav.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-pane').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const pane = document.getElementById(btn.dataset.pane);
      if (pane) pane.classList.add('active');
    });
  });

  initAdminPaneHandlers();
  checkAdminUrlTrigger();
}

function openAdminConsole() {
  const modal = document.getElementById('admin-console-modal');
  modal?.classList.add('open');
  populateAdminPanes();
}

// Utility: compress and convert local file to DataURL
function compressImageFile(file, maxWidth = 1000, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Image upload controller helper
function setupImageUploader({ fileInputId, urlInputId, previewBoxId, previewImgId, removeBtnId }) {
  const fileInput = document.getElementById(fileInputId);
  const urlInput = document.getElementById(urlInputId);
  const previewBox = document.getElementById(previewBoxId);
  const previewImg = document.getElementById(previewImgId);
  const removeBtn = document.getElementById(removeBtnId);

  let currentDataUrl = '';

  const updatePreview = (src) => {
    if (src) {
      currentDataUrl = src;
      if (previewImg) previewImg.src = src;
      if (previewBox) previewBox.style.display = 'flex';
      if (urlInput && !src.startsWith('data:')) urlInput.value = src;
    } else {
      currentDataUrl = '';
      if (previewImg) previewImg.src = '';
      if (previewBox) previewBox.style.display = 'none';
      if (fileInput) fileInput.value = '';
      if (urlInput) urlInput.value = '';
    }
  };

  fileInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await compressImageFile(file);
        updatePreview(dataUrl);
        if (urlInput) urlInput.value = '';
      } catch (err) {
        console.error('Failed to compress image:', err);
        alert('Could not process the selected image.');
      }
    }
  });

  urlInput?.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val) {
      updatePreview(val);
    } else if (!fileInput?.files?.length) {
      updatePreview('');
    }
  });

  removeBtn?.addEventListener('click', () => {
    updatePreview('');
  });

  return {
    getValue: () => currentDataUrl || urlInput?.value.trim() || '',
    setValue: (src) => updatePreview(src || ''),
    clear: () => updatePreview('')
  };
}

let projImageUploader = null;
let certImageUploader = null;
let achImageUploader = null;

function populateAdminPanes() {
  const data = getLocalData();

  // Initialize uploaders if not ready
  if (!projImageUploader) {
    projImageUploader = setupImageUploader({
      fileInputId: 'proj-file-input',
      urlInputId: 'proj-img-input',
      previewBoxId: 'proj-img-preview-box',
      previewImgId: 'proj-img-preview',
      removeBtnId: 'proj-img-remove-btn'
    });
  }
  if (!certImageUploader) {
    certImageUploader = setupImageUploader({
      fileInputId: 'cert-file-input',
      urlInputId: 'cert-img-input',
      previewBoxId: 'cert-img-preview-box',
      previewImgId: 'cert-img-preview',
      removeBtnId: 'cert-img-remove-btn'
    });
  }
  if (!achImageUploader) {
    achImageUploader = setupImageUploader({
      fileInputId: 'ach-file-input',
      urlInputId: 'ach-img-input',
      previewBoxId: 'ach-img-preview-box',
      previewImgId: 'ach-img-preview',
      removeBtnId: 'ach-img-remove-btn'
    });
  }

  // Update Status Badge
  const statusBadge = document.getElementById('admin-cloud-status-badge');
  if (statusBadge) {
    statusBadge.innerHTML = `<svg class="icon" style="width: 12px; height: 12px;"><use href="/icons.svg#icon-database"></use></svg> Cloud Synchronized`;
  }

  // --------------------------------------------------------------------------
  // Pane A: Skillset
  // --------------------------------------------------------------------------
  // Render Skills List
  const skillsList = document.getElementById('admin-skills-list');
  if (skillsList) {
    skillsList.innerHTML = data.tech_stacks.map(s => {
      const isNonTech = (s.category || '').toLowerCase().includes('non');
      const badgeClass = isNonTech ? 'tag-badge' : 'gradient-badge';
      const typeLabel = isNonTech ? 'Non-Technical' : 'Technical';
      const iconName = s.icon || (isNonTech ? 'icon-star' : 'icon-code');
      return `
        <div class="admin-list-item">
          <div class="admin-list-info" style="flex: 1; display: flex; align-items: center; gap: 12px;">
            <div class="skill-icon-wrap" style="width: 32px; height: 32px; border-radius: 6px;">
              <svg class="icon" style="color: var(--accent-cyan); width: 16px; height: 16px;"><use href="/icons.svg#${iconName}"></use></svg>
            </div>
            <div>
              <h4 style="margin: 0; font-size: 0.95rem;">${s.name}</h4>
              <span class="${badgeClass}" style="font-size: 0.7rem; padding: 1px 8px; margin-top: 3px; display: inline-block;">${typeLabel}</span>
            </div>
          </div>
          <div class="admin-list-actions">
            <button class="action-btn edit-skill-btn" data-id="${s.id}">Edit</button>
            <button class="action-btn delete delete-skill-btn" data-id="${s.id}">Delete</button>
          </div>
        </div>
      `;
    }).join('');

    // Edit Skill
    skillsList.querySelectorAll('.edit-skill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = data.tech_stacks.find(s => s.id === btn.dataset.id);
        if (!item) return;
        document.getElementById('admin-skill-id').value = item.id;
        document.getElementById('skill-name-input').value = item.name;
        const typeSelect = document.getElementById('skill-type-select');
        if (typeSelect) {
          typeSelect.value = (item.category || '').toLowerCase().includes('non') ? 'Non-Technical' : 'Technical';
        }
        document.getElementById('admin-skill-submit-btn').textContent = 'Update Skill';
        document.getElementById('admin-skill-cancel-btn').style.display = 'inline-block';
        document.getElementById('admin-add-skill-form').scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Delete Skill
    skillsList.querySelectorAll('.delete-skill-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (confirm('Delete this skill entry?')) {
          await deleteTechStack(btn.dataset.id);
          populateAdminPanes();
          renderAllUI();
        }
      });
    });
  }

  // Cancel Skill Edit
  document.getElementById('admin-skill-cancel-btn')?.addEventListener('click', () => {
    document.getElementById('admin-add-skill-form').reset();
    document.getElementById('admin-skill-id').value = '';
    document.getElementById('admin-skill-submit-btn').textContent = 'Add Skill';
    document.getElementById('admin-skill-cancel-btn').style.display = 'none';
  });

  // --------------------------------------------------------------------------
  // Pane B: Projects
  // --------------------------------------------------------------------------
  // Checkboxes for project tech tags
  const projTagBox = document.getElementById('admin-project-tech-tags');
  if (projTagBox) {
    const allTags = Array.from(new Set(data.tech_stacks.map(s => s.name)));
    projTagBox.innerHTML = allTags.map(t => `
      <label style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.78rem; background: rgba(255,255,255,0.05); padding: 3px 8px; border-radius: 4px; cursor: pointer;">
        <input type="checkbox" class="proj-tag-cb" value="${t}"> ${t}
      </label>
    `).join('');

    projTagBox.querySelectorAll('.proj-tag-cb').forEach(cb => {
      cb.addEventListener('change', () => {
        const checked = Array.from(projTagBox.querySelectorAll('.proj-tag-cb:checked')).map(c => c.value);
        const customTags = document.getElementById('proj-tags-input').value
          .split(',')
          .map(t => t.trim())
          .filter(t => t && !allTags.includes(t));
        document.getElementById('proj-tags-input').value = [...checked, ...customTags].join(', ');
      });
    });
  }

  // Projects list
  const projsList = document.getElementById('admin-projects-list');
  if (projsList) {
    projsList.innerHTML = data.projects.map(p => `
      <div class="admin-list-item">
        <div class="admin-list-info" style="display: flex; gap: 14px; align-items: center; flex: 1;">
          <img src="${p.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80'}" style="width: 56px; height: 56px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--glass-border);">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <h4 style="margin: 0; font-size: 1rem;">${p.title}</h4>
              <span class="gradient-badge" style="font-size: 0.7rem; padding: 2px 8px;">${p.category}</span>
            </div>
            <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted);">${(p.tags || []).join(' &bull; ')}</p>
          </div>
        </div>
        <div class="admin-list-actions">
          <button class="action-btn edit-proj-btn" data-id="${p.id}">Edit</button>
          <button class="action-btn delete delete-proj-btn" data-id="${p.id}">Delete</button>
        </div>
      </div>
    `).join('');

    // Edit Project
    projsList.querySelectorAll('.edit-proj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = data.projects.find(p => p.id === btn.dataset.id);
        if (!item) return;
        document.getElementById('admin-proj-id').value = item.id;
        document.getElementById('proj-title-input').value = item.title;
        document.getElementById('proj-cat-input').value = item.category;
        document.getElementById('proj-tags-input').value = (item.tags || []).join(', ');
        document.getElementById('proj-desc-input').value = item.description;
        document.getElementById('proj-github-input').value = item.githubUrl || '';
        document.getElementById('proj-live-input').value = item.liveUrl || '';
        projImageUploader?.setValue(item.image || '');

        // Check matching tag checkboxes
        projTagBox?.querySelectorAll('.proj-tag-cb').forEach(cb => {
          cb.checked = (item.tags || []).includes(cb.value);
        });

        document.getElementById('admin-proj-submit-btn').textContent = 'Update Project';
        document.getElementById('admin-proj-cancel-btn').style.display = 'inline-block';
        document.getElementById('admin-add-project-form').scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Delete Project
    projsList.querySelectorAll('.delete-proj-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (confirm('Delete this project?')) {
          await deleteProject(btn.dataset.id);
          populateAdminPanes();
          renderAllUI();
        }
      });
    });
  }

  // Cancel Project Edit
  document.getElementById('admin-proj-cancel-btn')?.addEventListener('click', () => {
    document.getElementById('admin-add-project-form').reset();
    document.getElementById('admin-proj-id').value = '';
    projImageUploader?.clear();
    projTagBox?.querySelectorAll('.proj-tag-cb').forEach(cb => { cb.checked = false; });
    document.getElementById('admin-proj-submit-btn').textContent = 'Save Project';
    document.getElementById('admin-proj-cancel-btn').style.display = 'none';
  });

  // --------------------------------------------------------------------------
  // Pane C: Timeline & Journey
  // --------------------------------------------------------------------------
  const timelineList = document.getElementById('admin-timeline-list');
  if (timelineList) {
    timelineList.innerHTML = data.timeline.map(t => `
      <div class="admin-list-item">
        <div class="admin-list-info" style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <h4 style="margin: 0; font-size: 0.95rem;">${t.title}</h4>
            <span class="gradient-badge" style="font-size: 0.7rem; padding: 2px 8px; text-transform: uppercase;">${t.type}</span>
          </div>
          <p style="margin: 0; font-size: 0.82rem; color: var(--text-muted);">${t.company} &bull; <span style="color: var(--accent-cyan);">${t.dateRange}</span></p>
        </div>
        <div class="admin-list-actions">
          <button class="action-btn edit-time-btn" data-id="${t.id}">Edit</button>
          <button class="action-btn delete delete-time-btn" data-id="${t.id}">Delete</button>
        </div>
      </div>
    `).join('');

    timelineList.querySelectorAll('.edit-time-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = data.timeline.find(t => t.id === btn.dataset.id);
        if (!item) return;
        document.getElementById('admin-time-id').value = item.id;
        document.getElementById('time-title-input').value = item.title;
        document.getElementById('time-company-input').value = item.company;
        document.getElementById('time-daterange-input').value = item.dateRange;
        document.getElementById('time-type-select').value = item.type;
        document.getElementById('time-desc-input').value = item.description;
        document.getElementById('admin-time-submit-btn').textContent = 'Update Journey Entry';
        document.getElementById('admin-time-cancel-btn').style.display = 'inline-block';
        document.getElementById('admin-add-timeline-form').scrollIntoView({ behavior: 'smooth' });
      });
    });

    timelineList.querySelectorAll('.delete-time-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (confirm('Delete this journey entry?')) {
          await deleteTimelineItem(btn.dataset.id);
          populateAdminPanes();
          renderAllUI();
        }
      });
    });
  }

  document.getElementById('admin-time-cancel-btn')?.addEventListener('click', () => {
    document.getElementById('admin-add-timeline-form').reset();
    document.getElementById('admin-time-id').value = '';
    document.getElementById('admin-time-submit-btn').textContent = 'Save Journey Entry';
    document.getElementById('admin-time-cancel-btn').style.display = 'none';
  });

  // --------------------------------------------------------------------------
  // Pane D: Certificates
  // --------------------------------------------------------------------------
  const certsList = document.getElementById('admin-certs-list');
  if (certsList) {
    certsList.innerHTML = data.certificates.map(c => `
      <div class="admin-list-item">
        <div class="admin-list-info" style="display: flex; gap: 14px; align-items: center; flex: 1;">
          ${c.image ? `<img src="${c.image}" style="width: 48px; height: 48px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--glass-border);">` : ''}
          <div>
            <h4 style="margin: 0 0 4px 0; font-size: 0.95rem;">${c.title}</h4>
            <p style="margin: 0; font-size: 0.82rem; color: var(--text-muted);">${c.issuer} &bull; <span style="color: var(--accent-cyan);">${c.date}</span></p>
          </div>
        </div>
        <div class="admin-list-actions">
          <button class="action-btn edit-cert-btn" data-id="${c.id}">Edit</button>
          <button class="action-btn delete delete-cert-btn" data-id="${c.id}">Delete</button>
        </div>
      </div>
    `).join('');

    certsList.querySelectorAll('.edit-cert-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = data.certificates.find(c => c.id === btn.dataset.id);
        if (!item) return;
        document.getElementById('admin-cert-id').value = item.id;
        document.getElementById('cert-title-input').value = item.title;
        document.getElementById('cert-issuer-input').value = item.issuer;
        document.getElementById('cert-date-input').value = item.date;
        document.getElementById('cert-url-input').value = item.credentialUrl || '';
        document.getElementById('cert-skills-input').value = item.skills || '';
        certImageUploader?.setValue(item.image || '');
        document.getElementById('admin-cert-submit-btn').textContent = 'Update Certificate';
        document.getElementById('admin-cert-cancel-btn').style.display = 'inline-block';
        document.getElementById('admin-add-cert-form').scrollIntoView({ behavior: 'smooth' });
      });
    });

    certsList.querySelectorAll('.delete-cert-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (confirm('Delete this certificate?')) {
          await deleteCertificate(btn.dataset.id);
          populateAdminPanes();
          renderAllUI();
        }
      });
    });
  }

  document.getElementById('admin-cert-cancel-btn')?.addEventListener('click', () => {
    document.getElementById('admin-add-cert-form').reset();
    document.getElementById('admin-cert-id').value = '';
    certImageUploader?.clear();
    document.getElementById('admin-cert-submit-btn').textContent = 'Save Certificate';
    document.getElementById('admin-cert-cancel-btn').style.display = 'none';
  });

  // --------------------------------------------------------------------------
  // Pane E: Achievements
  // --------------------------------------------------------------------------
  const achList = document.getElementById('admin-achievements-list');
  if (achList) {
    achList.innerHTML = (data.achievements || []).map(a => `
      <div class="admin-list-item">
        <div class="admin-list-info" style="display: flex; gap: 14px; align-items: center; flex: 1;">
          ${a.image ? `<img src="${a.image}" style="width: 48px; height: 48px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--glass-border);">` : ''}
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <h4 style="margin: 0; font-size: 0.95rem;">${a.title}</h4>
              <span class="achievement-highlight-badge">${a.highlight}</span>
            </div>
            <p style="margin: 0; font-size: 0.82rem; color: var(--text-muted);">${a.organization} &bull; ${a.category} &bull; <span style="color: var(--accent-cyan);">${a.date}</span></p>
          </div>
        </div>
        <div class="admin-list-actions">
          <button class="action-btn edit-ach-btn" data-id="${a.id}">Edit</button>
          <button class="action-btn delete delete-ach-btn" data-id="${a.id}">Delete</button>
        </div>
      </div>
    `).join('');

    achList.querySelectorAll('.edit-ach-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = (data.achievements || []).find(a => a.id === btn.dataset.id);
        if (!item) return;
        document.getElementById('admin-ach-id').value = item.id;
        document.getElementById('ach-title-input').value = item.title;
        document.getElementById('ach-cat-input').value = item.category;
        document.getElementById('ach-highlight-input').value = item.highlight;
        document.getElementById('ach-org-input').value = item.organization;
        document.getElementById('ach-date-input').value = item.date;
        document.getElementById('ach-link-input').value = item.link || '';
        document.getElementById('ach-desc-input').value = item.description;
        achImageUploader?.setValue(item.image || '');
        document.getElementById('admin-ach-submit-btn').textContent = 'Update Achievement';
        document.getElementById('admin-ach-cancel-btn').style.display = 'inline-block';
        document.getElementById('admin-add-ach-form').scrollIntoView({ behavior: 'smooth' });
      });
    });

    achList.querySelectorAll('.delete-ach-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (confirm('Delete this achievement?')) {
          await deleteAchievement(btn.dataset.id);
          populateAdminPanes();
          renderAllUI();
        }
      });
    });
  }

  document.getElementById('admin-ach-cancel-btn')?.addEventListener('click', () => {
    document.getElementById('admin-add-ach-form').reset();
    document.getElementById('admin-ach-id').value = '';
    achImageUploader?.clear();
    document.getElementById('admin-ach-submit-btn').textContent = 'Save Achievement';
    document.getElementById('admin-ach-cancel-btn').style.display = 'none';
  });

  // --------------------------------------------------------------------------
  // Pane F: Messages Inbox
  // --------------------------------------------------------------------------
  const msgsBox = document.getElementById('admin-messages-container');
  if (msgsBox) {
    if (!data.messages || data.messages.length === 0) {
      msgsBox.innerHTML = '<p style="color: var(--text-dim);">No incoming messages in inbox.</p>';
    } else {
      msgsBox.innerHTML = data.messages.map(m => `
        <div class="glass-card" style="padding: 16px; border-left: 4px solid ${m.unread ? 'var(--accent-cyan)' : 'var(--glass-border)'}; background: ${m.unread ? 'rgba(0, 242, 254, 0.03)' : 'var(--glass-card)'};">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <strong>${m.name}</strong>
                ${m.unread ? '<span class="gradient-badge" style="font-size: 0.65rem; padding: 2px 6px;">NEW</span>' : ''}
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted);"><a href="mailto:${m.email}" style="color: var(--accent-cyan);">${m.email}</a> &bull; ${new Date(m.timestamp).toLocaleString()}</div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="action-btn toggle-read-btn" data-id="${m.id}">
                ${m.unread ? 'Mark Read' : 'Mark Unread'}
              </button>
              <button class="action-btn draft-reply-btn" data-id="${m.id}" style="color: var(--accent-cyan); border-color: rgba(0,242,254,0.3);">
                Draft AI Reply
              </button>
              <button class="action-btn delete delete-msg-btn" data-id="${m.id}">
                Delete
              </button>
            </div>
          </div>
          <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 4px;">Subject: ${m.subject}</div>
          <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; white-space: pre-wrap;">${m.message}</p>
        </div>
      `).join('');

      msgsBox.querySelectorAll('.toggle-read-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          await toggleMessageRead(btn.dataset.id);
          populateAdminPanes();
        });
      });

      msgsBox.querySelectorAll('.delete-msg-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          await deleteMessage(btn.dataset.id);
          populateAdminPanes();
        });
      });

      msgsBox.querySelectorAll('.draft-reply-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const msg = data.messages.find(m => m.id === btn.dataset.id);
          if (!msg) return;
          btn.textContent = 'Drafting...';
          const draft = await draftEmailReply(msg.name, msg.subject, msg.message);
          prompt('Generated AI Email Reply (Copy to clipboard):', draft);
          btn.textContent = 'Draft AI Reply';
        });
      });
    }
  }

  // --------------------------------------------------------------------------
  // Pane: Coding Profiles
  // --------------------------------------------------------------------------
  const cp = data.settings?.codingProfiles || {};
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val !== undefined && val !== null ? val : ''; };
  setVal('admin-lc-handle', cp.leetcode?.handle);
  setVal('admin-lc-solved', cp.leetcode?.solvedTotal);
  setVal('admin-lc-rating', cp.leetcode?.rating);
  setVal('admin-lc-easy', cp.leetcode?.solvedEasy);
  setVal('admin-lc-medium', cp.leetcode?.solvedMedium);
  setVal('admin-lc-hard', cp.leetcode?.solvedHard);

  setVal('admin-cf-handle', cp.codeforces?.handle);
  setVal('admin-cf-rating', cp.codeforces?.rating);
  setVal('admin-cf-rank', cp.codeforces?.rank);

  setVal('admin-cc-handle', cp.codechef?.handle);
  setVal('admin-cc-stars', cp.codechef?.stars);
  setVal('admin-cc-rating', cp.codechef?.rating);

  setVal('admin-cd-url', cp.codolio?.url);
  setVal('admin-cd-score', cp.codolio?.score);

  // --------------------------------------------------------------------------
  // Pane G: Settings
  // --------------------------------------------------------------------------
  const set = data.settings || {};
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  setEl('setting-name', set.ownerName);
  setEl('setting-email', set.email);
  setEl('setting-bio', set.ownerBio);
  setEl('setting-location', set.location);
  setEl('setting-linkedin', set.linkedin);
  setEl('setting-github', set.github);
  setEl('setting-codolio', set.codolio);
  setEl('setting-medium', set.medium);
  setEl('setting-groq-key', set.groqKey);

  // --------------------------------------------------------------------------
  // Pane H: Cloud Sync & Supabase Database Configuration
  // --------------------------------------------------------------------------
  const isConnected = isSupabaseConnected();
  if (statusBadge) {
    if (isConnected) {
      statusBadge.innerHTML = `<svg class="icon" style="width: 12px; height: 12px; color: #22c55e;"><use href="/icons.svg#icon-database"></use></svg> Supabase Connected ☁️`;
      statusBadge.style.borderColor = 'rgba(34, 197, 94, 0.4)';
    } else {
      statusBadge.innerHTML = `<svg class="icon" style="width: 12px; height: 12px; color: #f59e0b;"><use href="/icons.svg#icon-database"></use></svg> Local Storage Mode`;
      statusBadge.style.borderColor = 'rgba(245, 158, 11, 0.4)';
    }
  }

  // Populate Supabase inputs
  try {
    const customConfig = localStorage.getItem('portfolio_custom_supabase');
    if (customConfig) {
      const parsed = JSON.parse(customConfig);
      if (document.getElementById('setting-supabase-url')) document.getElementById('setting-supabase-url').value = parsed.url || '';
      if (document.getElementById('setting-supabase-key')) document.getElementById('setting-supabase-key').value = parsed.anonKey || '';
    } else {
      if (document.getElementById('setting-supabase-url')) document.getElementById('setting-supabase-url').value = import.meta.env.VITE_SUPABASE_URL || '';
      if (document.getElementById('setting-supabase-key')) document.getElementById('setting-supabase-key').value = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    }
  } catch (e) {}

  const backupText = document.getElementById('admin-backup-textarea');
  if (backupText) backupText.value = exportBackupJSON();
}

function initAdminPaneHandlers() {
  // Add/Update Skill
  document.getElementById('admin-add-skill-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('admin-skill-id').value || undefined;
    const name = document.getElementById('skill-name-input').value.trim();
    if (!name) return;

    const typeSelect = document.getElementById('skill-type-select');
    const category = typeSelect ? typeSelect.value : 'Technical';
    const level = 100;
    const icon = category === 'Non-Technical' ? 'icon-star' : 'icon-code';

    await saveTechStack({ id, name, category, level, icon });
    e.target.reset();
    document.getElementById('admin-skill-id').value = '';
    document.getElementById('admin-skill-submit-btn').textContent = 'Add Skill';
    document.getElementById('admin-skill-cancel-btn').style.display = 'none';
    populateAdminPanes();
    renderAllUI();
  });

  // AI Suggest Project Description
  document.getElementById('ai-suggest-desc-btn')?.addEventListener('click', async () => {
    const title = document.getElementById('proj-title-input').value.trim();
    const cat = document.getElementById('proj-cat-input').value.trim();
    const tags = document.getElementById('proj-tags-input').value.trim();
    if (!title) {
      alert('Please enter a project title first.');
      return;
    }
    const btn = document.getElementById('ai-suggest-desc-btn');
    btn.innerHTML = `<svg class="icon"><use href="/icons.svg#icon-sparkles"></use></svg> Synthesizing...`;
    const suggestion = await suggestProjectDescription(title, cat, tags);
    document.getElementById('proj-desc-input').value = suggestion;
    btn.innerHTML = `<svg class="icon"><use href="/icons.svg#icon-sparkles"></use></svg> Draft Description`;
  });

  // Add/Update Project
  document.getElementById('admin-add-project-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('admin-proj-id').value || undefined;
    const title = document.getElementById('proj-title-input').value.trim();
    const category = document.getElementById('proj-cat-input').value.trim();
    const tags = document.getElementById('proj-tags-input').value.split(',').map(t => t.trim()).filter(Boolean);
    const description = document.getElementById('proj-desc-input').value.trim();
    const githubUrl = document.getElementById('proj-github-input').value.trim();
    const liveUrl = document.getElementById('proj-live-input').value.trim();
    const image = projImageUploader ? projImageUploader.getValue() : document.getElementById('proj-img-input')?.value.trim();

    await saveProject({ id, title, category, tags, description, githubUrl, liveUrl, image });
    e.target.reset();
    document.getElementById('admin-proj-id').value = '';
    projImageUploader?.clear();
    document.querySelectorAll('#admin-project-tech-tags .proj-tag-cb').forEach(cb => { cb.checked = false; });
    document.getElementById('admin-proj-submit-btn').textContent = 'Save Project';
    document.getElementById('admin-proj-cancel-btn').style.display = 'none';
    populateAdminPanes();
    renderAllUI();
  });

  // Add/Update Timeline Entry
  document.getElementById('admin-add-timeline-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('admin-time-id').value || undefined;
    const title = document.getElementById('time-title-input').value.trim();
    const company = document.getElementById('time-company-input').value.trim();
    const dateRange = document.getElementById('time-daterange-input').value.trim();
    const type = document.getElementById('time-type-select').value;
    const description = document.getElementById('time-desc-input').value.trim();

    await saveTimelineItem({ id, title, company, dateRange, type, description });
    e.target.reset();
    document.getElementById('admin-time-id').value = '';
    document.getElementById('admin-time-submit-btn').textContent = 'Save Journey Entry';
    document.getElementById('admin-time-cancel-btn').style.display = 'none';
    populateAdminPanes();
    renderAllUI();
  });

  // Add/Update Certificate
  document.getElementById('admin-add-cert-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('admin-cert-id').value || undefined;
    const title = document.getElementById('cert-title-input').value.trim();
    const issuer = document.getElementById('cert-issuer-input').value.trim();
    const date = document.getElementById('cert-date-input').value.trim();
    const credentialUrl = document.getElementById('cert-url-input').value.trim();
    const skills = document.getElementById('cert-skills-input').value.trim();
    const image = certImageUploader ? certImageUploader.getValue() : document.getElementById('cert-img-input')?.value.trim();

    await saveCertificate({ id, title, issuer, date, credentialUrl, image, skills });
    e.target.reset();
    document.getElementById('admin-cert-id').value = '';
    certImageUploader?.clear();
    document.getElementById('admin-cert-submit-btn').textContent = 'Save Certificate';
    document.getElementById('admin-cert-cancel-btn').style.display = 'none';
    populateAdminPanes();
    renderAllUI();
  });

  // Add/Update Achievement
  document.getElementById('admin-add-ach-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('admin-ach-id').value || undefined;
    const title = document.getElementById('ach-title-input').value.trim();
    const category = document.getElementById('ach-cat-input').value.trim();
    const highlight = document.getElementById('ach-highlight-input').value.trim();
    const organization = document.getElementById('ach-org-input').value.trim();
    const date = document.getElementById('ach-date-input').value.trim();
    const link = document.getElementById('ach-link-input').value.trim();
    const description = document.getElementById('ach-desc-input').value.trim();
    const image = achImageUploader ? achImageUploader.getValue() : document.getElementById('ach-img-input')?.value.trim();

    await saveAchievement({ id, title, category, highlight, organization, date, link, image, description });
    e.target.reset();
    document.getElementById('admin-ach-id').value = '';
    achImageUploader?.clear();
    document.getElementById('admin-ach-submit-btn').textContent = 'Save Achievement';
    document.getElementById('admin-ach-cancel-btn').style.display = 'none';
    populateAdminPanes();
    renderAllUI();
  });

  // Save Coding Profiles Form Handler
  document.getElementById('admin-coding-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const saveBtn = document.getElementById('admin-save-coding-btn');
    const origText = saveBtn ? saveBtn.innerHTML : 'Save Coding Settings';
    if (saveBtn) {
      saveBtn.innerHTML = `<svg class="icon" style="animation: spin 1s linear infinite;"><use href="/icons.svg#icon-refresh"></use></svg> Saving & Syncing Live Stats...`;
      saveBtn.disabled = true;
    }

    const lcRaw = document.getElementById('admin-lc-handle').value.trim();
    const cfRaw = document.getElementById('admin-cf-handle').value.trim();
    const ccRaw = document.getElementById('admin-cc-handle').value.trim();
    const cdRaw = document.getElementById('admin-cd-url').value.trim();

    const lcHandle = extractHandle(lcRaw, 'leetcode');
    const cfHandle = extractHandle(cfRaw, 'codeforces');
    const ccHandle = extractHandle(ccRaw, 'codechef');
    const cdUrl = extractHandle(cdRaw, 'codolio');

    const data = getLocalData();
    const existing = data.settings?.codingProfiles || {};

    const getNum = (id, fallback) => {
      const val = document.getElementById(id)?.value?.trim();
      return val !== '' && !isNaN(val) ? parseInt(val) : fallback;
    };
    const getStr = (id, fallback) => {
      const val = document.getElementById(id)?.value?.trim();
      return val !== undefined && val !== '' ? val : fallback;
    };

    const updatedProfiles = {
      leetcode: {
        ...(existing.leetcode || {}),
        handle: lcHandle,
        solvedTotal: getNum('admin-lc-solved', existing.leetcode?.solvedTotal ?? 0),
        rating: getNum('admin-lc-rating', existing.leetcode?.rating ?? null),
        solvedEasy: getNum('admin-lc-easy', existing.leetcode?.solvedEasy ?? 0),
        solvedMedium: getNum('admin-lc-medium', existing.leetcode?.solvedMedium ?? 0),
        solvedHard: getNum('admin-lc-hard', existing.leetcode?.solvedHard ?? 0),
        url: lcHandle ? `https://leetcode.com/u/${lcHandle}/` : ''
      },
      codeforces: {
        ...(existing.codeforces || {}),
        handle: cfHandle,
        rating: getNum('admin-cf-rating', existing.codeforces?.rating ?? 0),
        rank: getStr('admin-cf-rank', existing.codeforces?.rank || 'Unrated'),
        url: cfHandle ? `https://codeforces.com/profile/${cfHandle}` : ''
      },
      codechef: {
        ...(existing.codechef || {}),
        handle: ccHandle,
        stars: getStr('admin-cc-stars', existing.codechef?.stars || 'Unrated'),
        rating: getNum('admin-cc-rating', existing.codechef?.rating ?? 0),
        url: ccHandle ? `https://www.codechef.com/users/${ccHandle}` : ''
      },
      codolio: {
        ...(existing.codolio || {}),
        url: cdUrl || (cdRaw.startsWith('http') ? cdRaw : (cdRaw ? `https://codolio.com/profile/${cdRaw.replace(/^@/,'')}` : 'https://codolio.com/')),
        score: getNum('admin-cd-score', existing.codolio?.score ?? null)
      }
    };

    await saveCodingProfiles(updatedProfiles);

    // If handles were provided, attempt live synchronization
    if (lcHandle || cfHandle || ccHandle) {
      try {
        await fetchLiveCodingProfiles(true);
      } catch (fetchErr) {
        console.warn('Auto live fetch on save encountered error:', fetchErr);
      }
    }

    const toast = document.getElementById('admin-coding-save-status');
    if (toast) {
      toast.style.display = 'inline-block';
      setTimeout(() => { toast.style.display = 'none'; }, 3500);
    }

    if (saveBtn) {
      saveBtn.innerHTML = origText;
      saveBtn.disabled = false;
    }

    populateAdminPanes();
    renderAllUI();
  });

  // Admin Live Fetch from Platforms Button
  document.getElementById('admin-fetch-live-stats-btn')?.addEventListener('click', async () => {
    const btn = document.getElementById('admin-fetch-live-stats-btn');
    const originalContent = btn.innerHTML;
    btn.innerHTML = `<svg class="icon" style="animation: spin 1s linear infinite;"><use href="/icons.svg#icon-refresh"></use></svg> Fetching Live Data...`;
    btn.disabled = true;

    try {
      await fetchLiveCodingProfiles(true);
      populateAdminPanes();
      renderAllUI();
      alert('✓ Live platform statistics updated successfully!');
    } catch (err) {
      console.error('Failed to fetch live stats:', err);
      alert('Could not fetch all platforms live. Checked fallback and cached metrics were preserved.');
    } finally {
      btn.innerHTML = originalContent;
      btn.disabled = false;
    }
  });

  // Front-End Sync Live Stats Button Handler
  document.getElementById('btn-refresh-coding-stats')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-refresh-coding-stats');
    const icon = btn.querySelector('.icon');
    if (icon) icon.style.animation = 'spin 1s linear infinite';
    btn.disabled = true;

    try {
      await fetchLiveCodingProfiles(true);
      renderAllUI();
    } catch (err) {
      console.warn('Refresh error:', err);
    } finally {
      if (icon) icon.style.animation = '';
      btn.disabled = false;
    }
  });

  // Save Settings
  document.getElementById('admin-settings-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ownerName = document.getElementById('setting-name').value.trim();
    const email = document.getElementById('setting-email').value.trim();
    const ownerBio = document.getElementById('setting-bio').value.trim();
    const location = document.getElementById('setting-location').value.trim();
    const linkedin = document.getElementById('setting-linkedin').value.trim();
    const github = document.getElementById('setting-github').value.trim();
    const codolio = document.getElementById('setting-codolio').value.trim();
    const medium = document.getElementById('setting-medium').value.trim();
    const groqKey = document.getElementById('setting-groq-key').value.trim();

    await saveSettings({ ownerName, email, ownerBio, location, linkedin, github, codolio, medium, groqKey });
    alert('Settings & Groq API Key saved successfully!');
    populateAdminPanes();
    renderAllUI();
  });

  // Cloud Sync Now (Push all local collections to Supabase Cloud)
  document.getElementById('admin-sync-cloud-btn')?.addEventListener('click', async () => {
    const btn = document.getElementById('admin-sync-cloud-btn');
    if (!isSupabaseConnected()) {
      alert('Please configure your Supabase Project URL and Anon Public Key in the box above first.');
      return;
    }
    btn.textContent = 'Uploading to Cloud...';
    try {
      const res = await pushLocalDataToCloud();
      btn.textContent = 'Upload Complete! ☁️';
      alert('All local items uploaded to Supabase Cloud successfully!\n\n' + res.details.join('\n'));
    } catch (err) {
      alert('Cloud upload failed: ' + (err.message || err));
      btn.textContent = 'Sync Local Data to Cloud Now';
    }
    setTimeout(() => { btn.textContent = 'Sync Local Data to Cloud Now'; }, 3000);
  });

  // Clear Local Cache
  document.getElementById('admin-clear-cache-btn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the local cache and reset to default data?')) {
      clearLocalCache();
      populateAdminPanes();
      renderAllUI();
      alert('Local cache reset to factory defaults.');
    }
  });

  // Save Supabase Configuration
  document.getElementById('admin-supabase-config-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('setting-supabase-url').value.trim();
    const key = document.getElementById('setting-supabase-key').value.trim();
    updateSupabaseConfig(url, key);
    const toast = document.getElementById('supabase-save-status');
    if (toast) {
      toast.style.display = 'inline';
      setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }
    await syncWithCloud();
    populateAdminPanes();
    renderAllUI();
  });

  // Test Supabase Connection & Health Check
  document.getElementById('admin-test-db-btn')?.addEventListener('click', async () => {
    const box = document.getElementById('admin-db-health-box');
    if (!box) return;
    box.style.display = 'block';
    box.innerHTML = '<p style="color: var(--accent-cyan); margin: 0;">Checking Supabase database connection and validating all 7 tables...</p>';

    const report = await testSupabaseHealth();
    if (!report.connected) {
      box.innerHTML = `
        <div style="color: #f87171; font-weight: 700; margin-bottom: 6px;">❌ Supabase Connection Failed</div>
        <p style="margin: 0; color: var(--text-muted);">${report.message}</p>
      `;
      return;
    }

    const tableRows = report.tables.map(t => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
        <span><strong>${t.name}</strong> (<code style="color: var(--accent-cyan); font-size: 0.75rem;">${t.table}</code>)</span>
        <span>
          ${t.ok 
            ? `<span style="color: #22c55e; font-weight: 600;">✅ OK (${t.count} items)</span>` 
            : `<span style="color: #f87171; font-weight: 600;" title="${t.error}">❌ Failed: ${t.error}</span>`}
        </span>
      </div>
    `).join('');

    const allOkNotice = report.allOk
      ? `<div style="margin-top: 10px; color: #22c55e; font-weight: 600;">✨ All 7 tables verified and cloud database is ready for all devices!</div>`
      : `<div style="margin-top: 10px; color: #f87171; font-weight: 600;">⚠️ One or more tables failed. Please ensure you ran the complete SQL Schema script in Supabase SQL Editor.</div>`;

    box.innerHTML = `
      <div style="font-weight: 700; color: var(--accent-cyan); margin-bottom: 10px;">Supabase Database Diagnostics:</div>
      ${tableRows}
      ${allOkNotice}
    `;
  });

  // Disconnect Supabase
  document.getElementById('admin-supabase-disconnect-btn')?.addEventListener('click', () => {
    if (confirm('Disconnect Supabase and revert to local storage mode?')) {
      updateSupabaseConfig('', '');
      if (document.getElementById('setting-supabase-url')) document.getElementById('setting-supabase-url').value = '';
      if (document.getElementById('setting-supabase-key')) document.getElementById('setting-supabase-key').value = '';
      populateAdminPanes();
      alert('Supabase disconnected. Running in offline localStorage mode.');
    }
  });

  // Copy Backup JSON
  document.getElementById('admin-copy-backup-btn')?.addEventListener('click', () => {
    const jsonStr = exportBackupJSON();
    navigator.clipboard.writeText(jsonStr);
    const toast = document.getElementById('admin-backup-toast');
    if (toast) {
      toast.style.display = 'inline';
      setTimeout(() => { toast.style.display = 'none'; }, 2500);
    }
  });

  // Toggle Restore Box
  document.getElementById('admin-restore-toggle-btn')?.addEventListener('click', () => {
    const box = document.getElementById('admin-restore-box');
    if (box) {
      box.style.display = box.style.display === 'none' ? 'block' : 'none';
    }
  });

  // Restore Backup JSON
  document.getElementById('admin-restore-backup-btn')?.addEventListener('click', async () => {
    const jsonStr = document.getElementById('admin-backup-textarea').value.trim();
    try {
      await importBackupJSON(jsonStr);
      populateAdminPanes();
      renderAllUI();
      alert('Portfolio database restored successfully!');
    } catch (e) {
      alert('Failed to restore backup. Invalid JSON format.');
    }
  });
}

// ==========================================================================
// 8. Global Listeners, Search & Carousel Controls
// ==========================================================================
function initGlobalListeners() {
  // Mobile Nav Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links-list');
  mobileBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  // Close modals on backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop || e.target.classList.contains('modal-close-btn')) {
        backdrop.classList.remove('open');
      }
    });
  });

  // Project search input
  const searchInput = document.getElementById('project-search-input');
  searchInput?.addEventListener('input', (e) => {
    projectSearchQuery = e.target.value;
    renderProjects(getLocalData().projects);
  });

  // Carousel Controls
  document.getElementById('carousel-next')?.addEventListener('click', () => {
    nextCarouselSlide();
    resetCarouselTimer();
  });
  document.getElementById('carousel-prev')?.addEventListener('click', () => {
    prevCarouselSlide();
    resetCarouselTimer();
  });

  function startCarouselTimer() {
    carouselTimer = setInterval(nextCarouselSlide, 5000);
  }
  function resetCarouselTimer() {
    clearInterval(carouselTimer);
    startCarouselTimer();
  }
  startCarouselTimer();

  // Immediate live platform statistics background fetch
  fetchLiveCodingProfiles().then(() => {
    renderAllUI();
  });

  // Sync with cloud on startup
  syncWithCloud().then(() => {
    renderAllUI();
    fetchLiveCodingProfiles().then(() => {
      renderAllUI();
    });
  });

  // Automatic periodic background refresh every 10 minutes
  setInterval(() => {
    if (!document.hidden) {
      fetchLiveCodingProfiles().then(() => {
        renderAllUI();
      });
    }
  }, 10 * 60 * 1000);

  // Listen for data updates
  window.addEventListener('portfolio_data_changed', () => {
    renderAllUI();
  });
}

// ==========================================================================
// Initialization Entrypoint
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTheme();
  renderAllUI();
  initContactForm();
  initAdminConsole();
  initGlobalListeners();
  checkPrintRoute();
});
