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
  saveMessage,
  getMessages,
  toggleMessageRead,
  deleteMessage,
  exportBackupJSON,
  importBackupJSON,
  clearLocalCache,
  fetchLiveCodingProfiles,
  saveCodingProfiles,
  extractHandle,
  saveCustomCodingProfile,
  deleteCustomCodingProfile,
  fetchLiveCustomProfileStats
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
// 1. Interactive Chromatic Ambient Canvas (Fluid Aurora Orbs & Luminous Stardust)
// ==========================================================================
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let animId = null;
  const mouse = { x: null, y: null, targetX: null, targetY: null, radius: 240 };

  // Chromatic Ambient Light Spheres (Soft breathing fluid colors)
  let orbs = [];
  // Floating Luminous Micro-Pearls / Stardust (Pure floating motes, NO webs/lines)
  let motes = [];

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    initOrbsAndMotes();
  }

  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    if (mouse.x === null) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.targetX = null;
    mouse.targetY = null;
  });

  function initOrbsAndMotes() {
    const isMobile = width < 768;
    
    // 5 Organic Floating Chromatic Orbs with harmonic speeds and Lissajous motion
    orbs = [
      {
        baseX: width * 0.18,
        baseY: height * 0.25,
        radius: isMobile ? 180 : 320,
        colorLight: ['rgba(79, 70, 229, 0.12)', 'rgba(124, 58, 237, 0.06)', 'transparent'],
        colorDark: ['rgba(0, 242, 254, 0.08)', 'rgba(79, 70, 229, 0.04)', 'transparent'],
        freqX: 0.0006,
        freqY: 0.0008,
        ampX: 120,
        ampY: 80,
        phase: 0,
        currentX: width * 0.18,
        currentY: height * 0.25
      },
      {
        baseX: width * 0.82,
        baseY: height * 0.35,
        radius: isMobile ? 200 : 360,
        colorLight: ['rgba(244, 63, 94, 0.11)', 'rgba(251, 146, 60, 0.05)', 'transparent'],
        colorDark: ['rgba(236, 72, 153, 0.07)', 'rgba(168, 85, 247, 0.04)', 'transparent'],
        freqX: 0.0007,
        freqY: 0.0005,
        ampX: 140,
        ampY: 100,
        phase: Math.PI / 3,
        currentX: width * 0.82,
        currentY: height * 0.35
      },
      {
        baseX: width * 0.48,
        baseY: height * 0.72,
        radius: isMobile ? 220 : 380,
        colorLight: ['rgba(14, 165, 233, 0.10)', 'rgba(99, 102, 241, 0.05)', 'transparent'],
        colorDark: ['rgba(127, 0, 255, 0.08)', 'rgba(56, 189, 248, 0.04)', 'transparent'],
        freqX: 0.0005,
        freqY: 0.0007,
        ampX: 100,
        ampY: 90,
        phase: Math.PI / 1.5,
        currentX: width * 0.48,
        currentY: height * 0.72
      },
      {
        baseX: width * 0.15,
        baseY: height * 0.82,
        radius: isMobile ? 160 : 280,
        colorLight: ['rgba(245, 158, 11, 0.09)', 'rgba(244, 63, 94, 0.04)', 'transparent'],
        colorDark: ['rgba(245, 158, 11, 0.05)', 'rgba(236, 72, 153, 0.03)', 'transparent'],
        freqX: 0.0008,
        freqY: 0.0006,
        ampX: 80,
        ampY: 110,
        phase: Math.PI,
        currentX: width * 0.15,
        currentY: height * 0.82
      },
      {
        baseX: width * 0.76,
        baseY: height * 0.85,
        radius: isMobile ? 180 : 300,
        colorLight: ['rgba(16, 185, 129, 0.08)', 'rgba(14, 165, 233, 0.04)', 'transparent'],
        colorDark: ['rgba(16, 185, 129, 0.06)', 'rgba(0, 242, 254, 0.03)', 'transparent'],
        freqX: 0.0006,
        freqY: 0.0008,
        ampX: 110,
        ampY: 70,
        phase: Math.PI * 1.4,
        currentX: width * 0.76,
        currentY: height * 0.85
      }
    ];

    // Floating Stardust Motes (Gentle luminous drifting motes, NO lines, NO web structures)
    const moteCount = isMobile ? 16 : 32;
    motes = [];
    for (let i = 0; i < moteCount; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius: Math.random() * 2 + 1.2,
        speedY: Math.random() * 0.35 + 0.15,
        wobbleSpeed: Math.random() * 0.015 + 0.008,
        wobbleAmp: Math.random() * 18 + 8,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.4 ? 245 : (Math.random() > 0.5 ? 345 : 198)
      });
    }
  }

  function drawScene(time) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Smooth mouse interpolation
    if (mouse.targetX !== null && mouse.targetY !== null) {
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
    } else {
      mouse.x = null;
      mouse.y = null;
    }

    // 1. Draw Floating Chromatic Ambient Orbs
    for (let i = 0; i < orbs.length; i++) {
      const orb = orbs[i];
      let targetX = orb.baseX + Math.sin(time * orb.freqX + orb.phase) * orb.ampX;
      let targetY = orb.baseY + Math.cos(time * orb.freqY + orb.phase) * orb.ampY;

      // Gentle fluid response to mouse position
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - targetX;
        const dy = mouse.y - targetY;
        const dist = Math.hypot(dx, dy);
        if (dist < 500) {
          const force = (1 - dist / 500) * 45;
          targetX += (dx / dist) * force;
          targetY += (dy / dist) * force;
        }
      }

      orb.currentX += (targetX - orb.currentX) * 0.04;
      orb.currentY += (targetY - orb.currentY) * 0.04;

      const colors = isDark ? orb.colorDark : orb.colorLight;
      const grad = ctx.createRadialGradient(
        orb.currentX, orb.currentY, 0,
        orb.currentX, orb.currentY, orb.radius
      );
      grad.addColorStop(0, colors[0]);
      grad.addColorStop(0.55, colors[1]);
      grad.addColorStop(1, colors[2]);

      ctx.save();
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orb.currentX, orb.currentY, orb.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 2. Draw Floating Luminous Stardust Motes (NO connecting lines)
    for (let i = 0; i < motes.length; i++) {
      const m = motes[i];
      m.y -= m.speedY;
      m.phase += m.wobbleSpeed;
      m.pulsePhase += m.pulseSpeed;

      // Wrap around screen top to bottom
      if (m.y < -10) {
        m.y = height + 10;
        m.x = Math.random() * width;
      }

      let drawX = m.x + Math.sin(m.phase) * m.wobbleAmp;
      let drawY = m.y;

      // Gentle fluid repulsion from mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = drawX - mouse.x;
        const dy = drawY - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const push = (mouse.radius - dist) / mouse.radius;
          drawX += (dx / dist) * push * 25;
          drawY += (dy / dist) * push * 25;
        }
      }

      const alpha = 0.25 + Math.sin(m.pulsePhase) * 0.18;
      const lightness = isDark ? 75 : 62;
      const color = `hsla(${m.hue}, 85%, ${lightness}%, ${alpha.toFixed(3)})`;

      ctx.save();
      ctx.beginPath();
      ctx.arc(drawX, drawY, m.baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowBlur = isDark ? 8 : 4;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.restore();
    }
  }

  function animate(timestamp) {
    if (!document.hidden) {
      ctx.clearRect(0, 0, width, height);
      drawScene(timestamp || 0);
    }
    animId = requestAnimationFrame(animate);
  }

  resize();
  animate(0);
}

// ==========================================================================
// 2. Theme Management (Light by Default, Dark as Optional)
// ==========================================================================
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  // Clear legacy theme override so every visitor gets light mode by default
  try {
    if (localStorage.getItem('portfolio_theme')) {
      localStorage.removeItem('portfolio_theme');
    }
  } catch (e) {}

  // Default is 'light'; 'dark' is an optional user preference
  const savedTheme = localStorage.getItem('portfolio_theme_mode') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio_theme_mode', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle-btn use');
  const btn = document.getElementById('theme-toggle-btn');
  if (icon) {
    // In light mode: show Moon icon to switch to dark
    // In dark mode: show Sun icon to switch to light
    icon.setAttribute('href', theme === 'dark' ? '/icons.svg#icon-sun' : '/icons.svg#icon-moon');
  }
  if (btn) {
    const label = theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme';
    btn.setAttribute('title', label);
    btn.setAttribute('aria-label', label);
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

  // 8. Contact Links
  const emailLink = document.getElementById('contact-link-email');
  if (emailLink) emailLink.href = `mailto:${data.settings.email}`;
  const emailText = document.getElementById('contact-display-email');
  if (emailText) emailText.textContent = data.settings.email;
  const linkedinLink = document.getElementById('contact-link-linkedin');
  if (linkedinLink) linkedinLink.href = data.settings.linkedin;
  const githubLink = document.getElementById('contact-link-github');
  if (githubLink) githubLink.href = data.settings.github;

  // 9. Official CV Document Download Actions
  const updateCvButton = (btnEl) => {
    if (!btnEl) return;
    const cvUrl = data.settings?.cvUrl;
    const cvFilename = data.settings?.cvFilename || `${data.settings?.ownerName || 'Niharika'}_CV.pdf`;
    if (cvUrl) {
      btnEl.href = cvUrl;
      btnEl.target = '_blank';
      if (cvUrl.startsWith('data:')) {
        btnEl.setAttribute('download', cvFilename);
      } else {
        btnEl.removeAttribute('download');
      }
    } else {
      btnEl.href = '?print=cv';
      btnEl.target = '_blank';
      btnEl.removeAttribute('download');
    }
  };
  updateCvButton(document.getElementById('hero-cv-btn'));
  updateCvButton(document.getElementById('footer-cv-btn'));

  // Trigger Visual Enhancements on dynamically rendered cards & metrics
  initCardSpotlightAndTilt();
  initCounterAnimations();
  initScrollReveal();
  initMagneticButtons();
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
        <a href="${p.githubUrl || '#'}" target="_blank" class="btn btn-primary" style="padding: 6px 14px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 6px;">
          <svg class="icon" style="width: 14px; height: 14px;"><use href="/icons.svg#icon-github"></use></svg>
          Source Code
        </a>
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
          <a href="${p.githubUrl || '#'}" target="_blank" class="btn btn-primary" style="flex: 1; justify-content: center; padding: 8px; font-size: 0.85rem;" title="View Source Code">
            <svg class="icon"><use href="/icons.svg#icon-github"></use></svg>
            <span>Source Code</span>
          </a>
          <button class="btn btn-secondary view-project-modal-btn" data-id="${p.id}" style="padding: 8px 14px; font-size: 0.85rem;" title="Project Overview">
            <svg class="icon"><use href="/icons.svg#icon-external"></use></svg>
            <span>Overview</span>
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
  const gfg = profiles.geeksforgeeks || {};
  const at = profiles.atcoder || {};
  const customProfiles = Array.isArray(profiles.customProfiles) ? profiles.customProfiles : [];

  // Calculate custom platforms aggregate additions
  let customSolved = 0;
  let customMaxRating = 0;
  let customContests = 0;

  customProfiles.forEach(cp => {
    const m = cp.metrics || {};
    const enabled = Array.isArray(cp.enabledParams) ? cp.enabledParams : [];
    if (enabled.includes('solvedTotal') && m.solvedTotal) {
      customSolved += (parseInt(m.solvedTotal) || 0);
    }
    if (enabled.includes('rating') && m.rating) {
      const r = parseInt(m.rating) || 0;
      if (r > customMaxRating) customMaxRating = r;
    }
    if (enabled.includes('highestRating') && m.highestRating) {
      const hr = parseInt(m.highestRating) || 0;
      if (hr > customMaxRating) customMaxRating = hr;
    }
    if (enabled.includes('contests') && m.contests) {
      customContests += (parseInt(m.contests) || 0);
    }
  });

  // Calculate aggregate metrics accurately across all platforms (standard + custom)
  const totalSolved = (parseInt(lc.solvedTotal) || 0) + (parseInt(cf.solvedTotal) || 0) + (parseInt(cc.solvedTotal) || 0) + (parseInt(gfg.solvedTotal) || 0) + customSolved;
  const peakRating = Math.max(
    parseInt(lc.rating) || 0,
    parseInt(cf.maxRating) || parseInt(cf.rating) || 0,
    parseInt(cc.highestRating) || parseInt(cc.rating) || 0,
    parseInt(at.highestRating) || parseInt(at.rating) || 0,
    customMaxRating
  );
  const totalContests = (parseInt(cf.contests) || 0) + (parseInt(cc.contests) || 0) + (parseInt(at.contests) || parseInt(at.ratedMatches) || 0) + customContests;

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

  // Generate HTML for dynamically added custom platform profiles
  const customCardsHTML = customProfiles.map(cp => {
    const m = cp.metrics || {};
    const enabled = Array.isArray(cp.enabledParams) ? cp.enabledParams : [];
    const color = cp.color || '#00f2fe';
    const icon = cp.icon || 'icon-code';

    // Primary badge text
    let badgeText = 'Active';
    if (enabled.includes('rating') && m.rating) {
      badgeText = `Rating: ${m.rating}`;
    } else if (enabled.includes('badges') && m.badges) {
      badgeText = m.badges;
    } else if (enabled.includes('score') && m.score) {
      badgeText = `Score: ${m.score}`;
    } else if (enabled.includes('rank') && m.rank) {
      badgeText = m.rank;
    } else if (enabled.includes('solvedTotal') && m.solvedTotal) {
      badgeText = `${m.solvedTotal} Solved`;
    }

    // Build metric boxes for ONLY checked parameters
    const metricBoxes = [];
    if (enabled.includes('solvedTotal') && (m.solvedTotal !== undefined && m.solvedTotal !== null && m.solvedTotal !== '')) {
      metricBoxes.push(`
        <div class="metric-box">
          <span class="metric-val" style="color: ${color};">${m.solvedTotal}</span>
          <span class="metric-label">Problems Solved</span>
        </div>
      `);
    }
    if (enabled.includes('rating') && (m.rating !== undefined && m.rating !== null && m.rating !== '')) {
      metricBoxes.push(`
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-cyan);">${m.rating}</span>
          <span class="metric-label">Contest Rating</span>
        </div>
      `);
    }
    if (enabled.includes('highestRating') && (m.highestRating !== undefined && m.highestRating !== null && m.highestRating !== '')) {
      metricBoxes.push(`
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-purple);">${m.highestRating}</span>
          <span class="metric-label">Peak Rating</span>
        </div>
      `);
    }
    if (enabled.includes('rank') && (m.rank !== undefined && m.rank !== null && m.rank !== '')) {
      metricBoxes.push(`
        <div class="metric-box">
          <span class="metric-val">${m.rank}</span>
          <span class="metric-label">Rank / Tier</span>
        </div>
      `);
    }
    if (enabled.includes('contests') && (m.contests !== undefined && m.contests !== null && m.contests !== '')) {
      metricBoxes.push(`
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-green);">${m.contests}</span>
          <span class="metric-label">Contests</span>
        </div>
      `);
    }
    if (enabled.includes('score') && (m.score !== undefined && m.score !== null && m.score !== '')) {
      metricBoxes.push(`
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-cyan);">${m.score}</span>
          <span class="metric-label">Score / Points</span>
        </div>
      `);
    }
    if (enabled.includes('streak') && (m.streak !== undefined && m.streak !== null && m.streak !== '')) {
      metricBoxes.push(`
        <div class="metric-box">
          <span class="metric-val" style="color: #f59e0b;">${m.streak}</span>
          <span class="metric-label">Streak</span>
        </div>
      `);
    }
    if (enabled.includes('percentile') && (m.percentile !== undefined && m.percentile !== null && m.percentile !== '')) {
      metricBoxes.push(`
        <div class="metric-box">
          <span class="metric-val">${m.percentile}</span>
          <span class="metric-label">Percentile</span>
        </div>
      `);
    }
    if (enabled.includes('badges') && (m.badges !== undefined && m.badges !== null && m.badges !== '')) {
      metricBoxes.push(`
        <div class="metric-box" style="grid-column: 1 / -1;">
          <span class="metric-val" style="font-size: 0.92rem; color: var(--accent-purple);">${m.badges}</span>
          <span class="metric-label">Badges / Title</span>
        </div>
      `);
    }
    if (enabled.includes('customMetric') && (m.customLabel && m.customValue)) {
      metricBoxes.push(`
        <div class="metric-box" style="grid-column: 1 / -1;">
          <span class="metric-val" style="font-size: 0.92rem; color: ${color};">${m.customValue}</span>
          <span class="metric-label">${m.customLabel}</span>
        </div>
      `);
    }

    const noteHTML = cp.note 
      ? `<div style="font-size: 0.83rem; color: var(--text-muted); line-height: 1.5; margin: 12px 0 16px;">${cp.note}</div>` 
      : '<div style="margin-bottom: 16px;"></div>';

    const targetUrl = cp.url || (cp.handle ? `https://google.com/search?q=${encodeURIComponent(cp.name + ' ' + cp.handle)}` : '#');

    return `
      <!-- CUSTOM PLATFORM CARD: ${cp.name} -->
      <div class="platform-card glass-card" style="--card-accent: ${color};" data-custom-id="${cp.id}">
        <div class="platform-header">
          <div class="platform-brand">
            <div class="platform-logo-box" style="color: ${color};">
              <svg class="icon"><use href="/icons.svg#${icon}"></use></svg>
            </div>
            <div>
              <h3 class="platform-title">${cp.name}</h3>
              <span class="platform-handle">@${cp.handle || 'developer'}</span>
            </div>
          </div>
          <span class="platform-badge badge-custom" style="border-color: ${color}50; color: ${color};">
            ${badgeText}
          </span>
        </div>

        <div class="platform-metrics-grid">
          ${metricBoxes.length > 0 ? metricBoxes.join('') : `
            <div class="metric-box" style="grid-column: 1 / -1;">
              <span class="metric-val" style="color: ${color};">Active</span>
              <span class="metric-label">Profile Tracked</span>
            </div>
          `}
        </div>

        ${noteHTML}

        <div class="platform-card-footer">
          <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; justify-content: center; font-size: 0.85rem;">
            View ${cp.name} Profile &rarr;
          </a>
        </div>
      </div>
    `;
  }).join('');

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

    <!-- 5. GEEKSFORGEEKS CARD -->
    <div class="platform-card glass-card" style="--card-accent: #2f855a;">
      <div class="platform-header">
        <div class="platform-brand">
          <div class="platform-logo-box" style="color: #38a169;">
            <svg class="icon"><use href="/icons.svg#icon-geeksforgeeks"></use></svg>
          </div>
          <div>
            <h3 class="platform-title">GeeksforGeeks</h3>
            <span class="platform-handle">@${gfg.handle || 'niharik8bqf'}</span>
          </div>
        </div>
        <span class="platform-badge badge-geeksforgeeks">
          ${gfg.score ? `Score: ${gfg.score}` : 'Active Solver'}
        </span>
      </div>

      <div class="platform-metrics-grid">
        <div class="metric-box">
          <span class="metric-val" style="color: #38a169;">${gfg.solvedTotal !== undefined && gfg.solvedTotal !== null ? gfg.solvedTotal : 98}</span>
          <span class="metric-label">Problems Solved</span>
        </div>
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-cyan);">${gfg.score || 250}</span>
          <span class="metric-label">Coding Score</span>
        </div>
        <div class="metric-box">
          <span class="metric-val">${gfg.instituteRank || '#6,885'}</span>
          <span class="metric-label">Institute Rank</span>
        </div>
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-purple);">${gfg.longestStreak ? `${gfg.longestStreak} Days` : 'Active'}</span>
          <span class="metric-label">Longest Streak</span>
        </div>
      </div>

      <div style="font-size: 0.83rem; color: var(--text-muted); line-height: 1.5; margin: 12px 0 16px;">
        Campus Ranking at Lovely Professional University (LPU Jalandhar) &bull; DSA & Problem Solving
      </div>

      <div class="platform-card-footer">
        <a href="${gfg.url || (gfg.handle ? `https://www.geeksforgeeks.org/profile/${gfg.handle}` : 'https://www.geeksforgeeks.org/')}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; justify-content: center; font-size: 0.85rem;">
          View GeeksforGeeks Profile &rarr;
        </a>
      </div>
    </div>

    <!-- 6. ATCODER CARD -->
    <div class="platform-card glass-card" style="--card-accent: #64748b;">
      <div class="platform-header">
        <div class="platform-brand">
          <div class="platform-logo-box" style="color: #94a3b8;">
            <svg class="icon"><use href="/icons.svg#icon-atcoder"></use></svg>
          </div>
          <div>
            <h3 class="platform-title">AtCoder</h3>
            <span class="platform-handle">@${at.handle || 'niharikab1806'}</span>
          </div>
        </div>
        <span class="platform-badge badge-atcoder">
          ${at.rating ? `Rating: ${at.rating}` : 'Active'}
        </span>
      </div>

      <div class="platform-metrics-grid">
        <div class="metric-box">
          <span class="metric-val" style="color: #cbd5e1;">${at.rating || 129}</span>
          <span class="metric-label">Current Rating</span>
        </div>
        <div class="metric-box">
          <span class="metric-val" style="color: #94a3b8;">${at.highestRating || 129}</span>
          <span class="metric-label">Peak Rating</span>
        </div>
        <div class="metric-box">
          <span class="metric-val">${at.rank || '#59,023'}</span>
          <span class="metric-label">Global Rank</span>
        </div>
        <div class="metric-box">
          <span class="metric-val" style="color: var(--accent-green);">${at.contests || at.ratedMatches || 6}</span>
          <span class="metric-label">Rated Matches</span>
        </div>
      </div>

      <div style="font-size: 0.83rem; color: var(--text-muted); line-height: 1.5; margin: 12px 0 16px;">
        International Competitive Programming (Japan) &bull; <strong style="color: #cbd5e1;">${at.percentile || 'Top 46.3%'}</strong>
      </div>

      <div class="platform-card-footer">
        <a href="${at.url || (at.handle ? `https://atcoder.jp/users/${at.handle}` : 'https://atcoder.jp/')}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; justify-content: center; font-size: 0.85rem;">
          View AtCoder Profile &rarr;
        </a>
      </div>
    </div>

    ${customCardsHTML}
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
      <a href="${project.githubUrl || '#'}" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px;">
        <svg class="icon"><use href="/icons.svg#icon-github"></use></svg>
        View GitHub Repository &rarr;
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
let currentCvDataUrl = '';
let currentCvFilename = '';

function updateAdminCvStatusUI() {
  const statusBox = document.getElementById('admin-cv-status-box');
  if (!statusBox) return;

  if (currentCvDataUrl) {
    const isData = currentCvDataUrl.startsWith('data:');
    const displayName = currentCvFilename || (isData ? 'Uploaded Custom CV Document (PDF)' : currentCvDataUrl);
    statusBox.innerHTML = `
      <span class="gradient-badge" style="font-size: 0.78rem; display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px;">
        <svg class="icon" style="width: 12px; height: 12px;"><use href="/icons.svg#icon-check"></use></svg>
        ${escapeHTML(displayName)}
      </span>
      <a href="${currentCvDataUrl}" target="_blank" ${isData ? `download="${currentCvFilename || 'CV.pdf'}"` : ''} class="action-btn" style="padding: 4px 10px; font-size: 0.76rem; text-decoration: none; color: var(--accent-cyan); border-color: rgba(0,242,254,0.3);">Preview / Test</a>
      <button type="button" id="admin-cv-remove-btn" class="action-btn delete" style="padding: 4px 10px; font-size: 0.76rem;">Remove</button>
    `;
    document.getElementById('admin-cv-remove-btn')?.addEventListener('click', () => {
      currentCvDataUrl = '';
      currentCvFilename = '';
      const urlInput = document.getElementById('admin-cv-url-input');
      if (urlInput) urlInput.value = '';
      const fileIn = document.getElementById('admin-cv-file-input');
      if (fileIn) fileIn.value = '';
      updateAdminCvStatusUI();
    });
  } else {
    statusBox.innerHTML = `<span style="color: var(--text-dim); font-size: 0.8rem;">No custom CV uploaded yet (using default generated CV)</span>`;
  }
}

function openCustomProfileEditor(id) {
  const container = document.getElementById('custom-profile-form-container');
  if (!container) return;

  const titleEl = document.getElementById('custom-prof-form-title');
  const idInput = document.getElementById('custom-prof-id');
  const nameInput = document.getElementById('custom-prof-name');
  const handleInput = document.getElementById('custom-prof-handle');
  const urlInput = document.getElementById('custom-prof-url');
  const noteInput = document.getElementById('custom-prof-note');
  const colorInput = document.getElementById('custom-prof-color');
  const iconInput = document.getElementById('custom-prof-icon');
  const statusEl = document.getElementById('custom-autodetect-status');
  if (statusEl) statusEl.style.display = 'none';

  const data = getLocalData();
  const customList = data.settings?.codingProfiles?.customProfiles || [];
  const existing = id ? customList.find(p => p.id === id) : null;

  if (existing) {
    if (titleEl) titleEl.textContent = `Edit ${existing.name} Platform Profile`;
    idInput.value = existing.id;
    nameInput.value = existing.name || '';
    handleInput.value = existing.handle || '';
    urlInput.value = existing.url || '';
    noteInput.value = existing.note || '';
    colorInput.value = existing.color || '#00f2fe';
    iconInput.value = existing.icon || 'icon-code';

    // Highlight matching color swatch if available
    document.querySelectorAll('#custom-prof-swatches .color-swatch').forEach(sw => {
      sw.classList.toggle('active', sw.dataset.color.toLowerCase() === (existing.color || '').toLowerCase());
    });

    const enabled = Array.isArray(existing.enabledParams) ? existing.enabledParams : [];
    const m = existing.metrics || {};

    const setParam = (checkId, valId, paramKey, val) => {
      const cb = document.getElementById(checkId);
      const inp = document.getElementById(valId);
      if (cb && inp) {
        cb.checked = enabled.includes(paramKey);
        inp.disabled = !cb.checked;
        inp.value = val !== undefined && val !== null ? val : '';
      }
    };

    setParam('check-param-solved', 'val-param-solved', 'solvedTotal', m.solvedTotal);
    setParam('check-param-rating', 'val-param-rating', 'rating', m.rating);
    setParam('check-param-highestRating', 'val-param-highestRating', 'highestRating', m.highestRating);
    setParam('check-param-rank', 'val-param-rank', 'rank', m.rank);
    setParam('check-param-contests', 'val-param-contests', 'contests', m.contests);
    setParam('check-param-score', 'val-param-score', 'score', m.score);
    setParam('check-param-streak', 'val-param-streak', 'streak', m.streak);
    setParam('check-param-percentile', 'val-param-percentile', 'percentile', m.percentile);
    setParam('check-param-badges', 'val-param-badges', 'badges', m.badges);

    const customCb = document.getElementById('check-param-custom');
    const customLabelInp = document.getElementById('val-param-custom-label');
    const customValInp = document.getElementById('val-param-custom-value');
    if (customCb && customLabelInp && customValInp) {
      customCb.checked = enabled.includes('customMetric');
      customLabelInp.disabled = !customCb.checked;
      customValInp.disabled = !customCb.checked;
      customLabelInp.value = m.customLabel || '';
      customValInp.value = m.customValue || '';
    }
  } else {
    if (titleEl) titleEl.textContent = '+ Add Coding Platform Profile';
    idInput.value = '';
    nameInput.value = '';
    handleInput.value = '';
    urlInput.value = '';
    noteInput.value = '';
    colorInput.value = '#00f2fe';
    iconInput.value = 'icon-code';

    document.querySelectorAll('#custom-prof-swatches .color-swatch').forEach(sw => {
      sw.classList.toggle('active', sw.dataset.color === '#00f2fe');
    });

    const resetParam = (checkId, valId, defaultChecked) => {
      const cb = document.getElementById(checkId);
      const inp = document.getElementById(valId);
      if (cb && inp) {
        cb.checked = defaultChecked;
        inp.disabled = !defaultChecked;
        inp.value = '';
      }
    };

    resetParam('check-param-solved', 'val-param-solved', true);
    resetParam('check-param-rating', 'val-param-rating', true);
    resetParam('check-param-highestRating', 'val-param-highestRating', false);
    resetParam('check-param-rank', 'val-param-rank', false);
    resetParam('check-param-contests', 'val-param-contests', false);
    resetParam('check-param-score', 'val-param-score', false);
    resetParam('check-param-streak', 'val-param-streak', false);
    resetParam('check-param-percentile', 'val-param-percentile', false);
    resetParam('check-param-badges', 'val-param-badges', false);

    const customCb = document.getElementById('check-param-custom');
    const customLabelInp = document.getElementById('val-param-custom-label');
    const customValInp = document.getElementById('val-param-custom-value');
    if (customCb && customLabelInp && customValInp) {
      customCb.checked = false;
      customLabelInp.disabled = true;
      customValInp.disabled = true;
      customLabelInp.value = '';
      customValInp.value = '';
    }
  }

  container.style.display = 'block';
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

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

  setVal('admin-gfg-handle', cp.geeksforgeeks?.handle);
  setVal('admin-gfg-solved', cp.geeksforgeeks?.solvedTotal);
  setVal('admin-gfg-score', cp.geeksforgeeks?.score);
  setVal('admin-gfg-rank', cp.geeksforgeeks?.instituteRank);
  setVal('admin-gfg-streak', cp.geeksforgeeks?.longestStreak);

  setVal('admin-at-handle', cp.atcoder?.handle);
  setVal('admin-at-rating', cp.atcoder?.rating);
  setVal('admin-at-peak', cp.atcoder?.highestRating || cp.atcoder?.rating);
  setVal('admin-at-rank', cp.atcoder?.rank);
  setVal('admin-at-contests', cp.atcoder?.contests || cp.atcoder?.ratedMatches);

  // Populate Custom Coding Profiles List
  const customListEl = document.getElementById('admin-custom-profiles-list');
  if (customListEl) {
    const customList = Array.isArray(cp.customProfiles) ? cp.customProfiles : [];
    if (customList.length === 0) {
      customListEl.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 18px; border: 1px dashed var(--glass-border); border-radius: var(--radius-md); font-size: 0.85rem;">
          No custom platforms added yet. Click <strong>"+ Add New Coding Platform"</strong> above to add platforms like HackerRank, Kaggle, Spoj, etc.
        </div>
      `;
    } else {
      customListEl.innerHTML = customList.map(item => {
        const enabledCount = (item.enabledParams || []).length;
        const color = item.color || '#00f2fe';
        const icon = item.icon || 'icon-code';
        return `
          <div class="custom-prof-item" style="border-left: 3px solid ${color};">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: ${color}15; display: flex; align-items: center; justify-content: center; color: ${color}; flex-shrink: 0;">
                <svg class="icon" style="width: 18px; height: 18px;"><use href="/icons.svg#${icon}"></use></svg>
              </div>
              <div>
                <strong style="font-size: 0.95rem; color: var(--text-primary);">${item.name}</strong>
                <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 6px;">@${item.handle || 'developer'}</span>
                <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 2px;">
                  ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); text-decoration: underline;">${item.url}</a> &bull; ` : ''}
                  ${enabledCount} active metrics
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn btn-secondary btn-edit-custom-prof" data-id="${item.id}" style="padding: 5px 12px; font-size: 0.8rem;">
                Edit
              </button>
              <button type="button" class="btn action-btn delete btn-delete-custom-prof" data-id="${item.id}" style="padding: 5px 12px; font-size: 0.8rem;">
                Delete
              </button>
            </div>
          </div>
        `;
      }).join('');

      customListEl.querySelectorAll('.btn-edit-custom-prof').forEach(btn => {
        btn.addEventListener('click', () => {
          openCustomProfileEditor(btn.dataset.id);
        });
      });
      customListEl.querySelectorAll('.btn-delete-custom-prof').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (confirm('Are you sure you want to delete this coding platform profile card?')) {
            await deleteCustomCodingProfile(btn.dataset.id);
            populateAdminPanes();
            renderCodingProfiles();
          }
        });
      });
    }
  }

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

  // Populate CV Document state
  currentCvDataUrl = set.cvUrl || '';
  currentCvFilename = set.cvFilename || '';
  const cvUrlInput = document.getElementById('admin-cv-url-input');
  if (cvUrlInput) {
    cvUrlInput.value = currentCvDataUrl.startsWith('data:') ? '' : currentCvDataUrl;
  }
  updateAdminCvStatusUI();

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


  // Save Coding Profiles Form Handler
  document.getElementById('admin-coding-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const saveBtn = document.getElementById('admin-save-coding-btn');
    const origText = saveBtn ? saveBtn.innerHTML : 'Save Coding Settings';
    if (saveBtn) {
      saveBtn.innerHTML = `<svg class="icon" style="animation: spin 1s linear infinite;"><use href="/icons.svg#icon-refresh"></use></svg> Saving & Syncing Live Stats...`;
      saveBtn.disabled = true;
    }

    const lcRaw = document.getElementById('admin-lc-handle')?.value?.trim() || '';
    const cfRaw = document.getElementById('admin-cf-handle')?.value?.trim() || '';
    const ccRaw = document.getElementById('admin-cc-handle')?.value?.trim() || '';
    const cdRaw = document.getElementById('admin-cd-url')?.value?.trim() || '';
    const gfgRaw = document.getElementById('admin-gfg-handle')?.value?.trim() || '';
    const atRaw = document.getElementById('admin-at-handle')?.value?.trim() || '';

    const lcHandle = extractHandle(lcRaw, 'leetcode');
    const cfHandle = extractHandle(cfRaw, 'codeforces');
    const ccHandle = extractHandle(ccRaw, 'codechef');
    const cdUrl = extractHandle(cdRaw, 'codolio');
    const gfgHandle = extractHandle(gfgRaw, 'geeksforgeeks');
    const atHandle = extractHandle(atRaw, 'atcoder');

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
      },
      geeksforgeeks: {
        ...(existing.geeksforgeeks || {}),
        handle: gfgHandle,
        solvedTotal: getNum('admin-gfg-solved', existing.geeksforgeeks?.solvedTotal ?? 0),
        score: getNum('admin-gfg-score', existing.geeksforgeeks?.score ?? 0),
        instituteRank: getStr('admin-gfg-rank', existing.geeksforgeeks?.instituteRank || ''),
        longestStreak: getNum('admin-gfg-streak', existing.geeksforgeeks?.longestStreak ?? 0),
        url: gfgHandle ? `https://www.geeksforgeeks.org/profile/${gfgHandle}` : ''
      },
      atcoder: {
        ...(existing.atcoder || {}),
        handle: atHandle,
        rating: getNum('admin-at-rating', existing.atcoder?.rating ?? 0),
        highestRating: getNum('admin-at-peak', existing.atcoder?.highestRating ?? existing.atcoder?.rating ?? 0),
        rank: getStr('admin-at-rank', existing.atcoder?.rank || ''),
        ratedMatches: getNum('admin-at-contests', existing.atcoder?.ratedMatches ?? existing.atcoder?.contests ?? 0),
        contests: getNum('admin-at-contests', existing.atcoder?.contests ?? existing.atcoder?.ratedMatches ?? 0),
        url: atHandle ? `https://atcoder.jp/users/${atHandle}` : ''
      }
    };

    await saveCodingProfiles(updatedProfiles);

    // If handles were provided, attempt live synchronization
    if (lcHandle || cfHandle || ccHandle || gfgHandle || atHandle) {
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

  // --------------------------------------------------------------------------
  // Custom Coding Profiles Builder & Parameter Checklist Event Handlers
  // --------------------------------------------------------------------------
  document.getElementById('btn-open-add-custom-profile')?.addEventListener('click', () => {
    openCustomProfileEditor('');
  });

  const closeCustomForm = () => {
    const container = document.getElementById('custom-profile-form-container');
    if (container) container.style.display = 'none';
  };
  document.getElementById('btn-close-custom-prof-form')?.addEventListener('click', closeCustomForm);
  document.getElementById('btn-cancel-custom-prof')?.addEventListener('click', closeCustomForm);

  document.querySelectorAll('#custom-prof-swatches .color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.dataset.color;
      const colorInp = document.getElementById('custom-prof-color');
      if (colorInp) colorInp.value = color;
      document.querySelectorAll('#custom-prof-swatches .color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
  });

  document.getElementById('custom-prof-color')?.addEventListener('input', (e) => {
    const color = e.target.value.toLowerCase();
    document.querySelectorAll('#custom-prof-swatches .color-swatch').forEach(s => {
      s.classList.toggle('active', s.dataset.color.toLowerCase() === color);
    });
  });

  document.querySelectorAll('.param-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const card = checkbox.closest('.param-check-card');
      if (!card) return;
      const inputs = card.querySelectorAll('.param-val-input');
      inputs.forEach(inp => {
        inp.disabled = !checkbox.checked;
        if (checkbox.checked) inp.focus();
      });
    });
  });

  document.getElementById('btn-custom-autodetect-stats')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-custom-autodetect-stats');
    const statusEl = document.getElementById('custom-autodetect-status');
    const url = document.getElementById('custom-prof-url')?.value?.trim() || '';
    const platform = document.getElementById('custom-prof-name')?.value?.trim() || '';
    const handle = document.getElementById('custom-prof-handle')?.value?.trim() || '';

    if (!url && !handle) {
      alert('Please enter a Profile URL or Handle above to auto-detect stats.');
      return;
    }

    const origHTML = btn.innerHTML;
    btn.innerHTML = `<svg class="icon" style="animation: spin 1s linear infinite;"><use href="/icons.svg#icon-refresh"></use></svg> Detecting...`;
    btn.disabled = true;
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.style.color = 'var(--accent-cyan)';
      statusEl.textContent = 'Connecting to profile and extracting live metrics...';
    }

    try {
      const liveData = await fetchLiveCustomProfileStats({ url, platform, handle });
      if (liveData) {
        const found = [];
        const applyVal = (checkId, valId, key, val) => {
          if (val !== null && val !== undefined && val !== '') {
            const cb = document.getElementById(checkId);
            const inp = document.getElementById(valId);
            if (cb && inp) {
              cb.checked = true;
              inp.disabled = false;
              inp.value = val;
              found.push(`${key}: ${val}`);
            }
          }
        };

        applyVal('check-param-solved', 'val-param-solved', 'Solved', liveData.solvedTotal);
        applyVal('check-param-rating', 'val-param-rating', 'Rating', liveData.rating);
        applyVal('check-param-highestRating', 'val-param-highestRating', 'Peak Rating', liveData.highestRating);
        applyVal('check-param-rank', 'val-param-rank', 'Rank', liveData.rank);
        applyVal('check-param-contests', 'val-param-contests', 'Contests', liveData.contests);
        applyVal('check-param-score', 'val-param-score', 'Score', liveData.score);
        applyVal('check-param-streak', 'val-param-streak', 'Streak', liveData.streak);
        applyVal('check-param-percentile', 'val-param-percentile', 'Percentile', liveData.percentile);
        applyVal('check-param-badges', 'val-param-badges', 'Badges', liveData.badges);

        if (statusEl) {
          if (found.length > 0) {
            statusEl.style.color = 'var(--accent-green)';
            statusEl.textContent = `✓ Auto-detected ${found.length} live metrics: ${found.join(', ')}`;
          } else {
            statusEl.style.color = 'var(--accent-amber)';
            statusEl.textContent = `Profile was reached, but no standard numbers could be auto-extracted. You can fill in the parameters manually below.`;
          }
        }
      } else {
        if (statusEl) {
          statusEl.style.color = 'var(--accent-amber)';
          statusEl.textContent = `Could not reach URL live. You can enter parameter values manually.`;
        }
      }
    } catch (e) {
      if (statusEl) {
        statusEl.style.color = 'var(--accent-red)';
        statusEl.textContent = `Auto-detect failed: ${e.message}. You can enter values manually.`;
      }
    } finally {
      btn.innerHTML = origHTML;
      btn.disabled = false;
    }
  });

  document.getElementById('admin-custom-profile-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const saveBtn = document.getElementById('btn-save-custom-prof');
    const origText = saveBtn.textContent;
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;

    try {
      const id = document.getElementById('custom-prof-id').value.trim();
      const name = document.getElementById('custom-prof-name').value.trim();
      const handle = document.getElementById('custom-prof-handle').value.trim();
      const url = document.getElementById('custom-prof-url').value.trim();
      const note = document.getElementById('custom-prof-note').value.trim();
      const color = document.getElementById('custom-prof-color').value;
      const icon = document.getElementById('custom-prof-icon').value;

      const enabledParams = [];
      const metrics = {};

      const readParam = (checkId, valId, key, isNumber = false) => {
        const cb = document.getElementById(checkId);
        const inp = document.getElementById(valId);
        if (cb && cb.checked) {
          enabledParams.push(key);
          const v = inp ? inp.value.trim() : '';
          metrics[key] = isNumber ? (v !== '' && !isNaN(v) ? parseInt(v) : null) : v;
        }
      };

      readParam('check-param-solved', 'val-param-solved', 'solvedTotal', true);
      readParam('check-param-rating', 'val-param-rating', 'rating', true);
      readParam('check-param-highestRating', 'val-param-highestRating', 'highestRating', true);
      readParam('check-param-rank', 'val-param-rank', 'rank', false);
      readParam('check-param-contests', 'val-param-contests', 'contests', true);
      readParam('check-param-score', 'val-param-score', 'score', true);
      readParam('check-param-streak', 'val-param-streak', 'streak', false);
      readParam('check-param-percentile', 'val-param-percentile', 'percentile', false);
      readParam('check-param-badges', 'val-param-badges', 'badges', false);

      const customCb = document.getElementById('check-param-custom');
      if (customCb && customCb.checked) {
        enabledParams.push('customMetric');
        metrics.customLabel = document.getElementById('val-param-custom-label')?.value?.trim() || 'Special Metric';
        metrics.customValue = document.getElementById('val-param-custom-value')?.value?.trim() || '';
      }

      await saveCustomCodingProfile({
        id,
        name,
        handle,
        url,
        note,
        color,
        icon,
        enabledParams,
        metrics
      });

      closeCustomForm();
      populateAdminPanes();
      renderAllUI();
      alert(`✓ Platform "${name}" profile card saved successfully!`);
    } catch (err) {
      console.error('Save custom profile error:', err);
      alert('Failed to save platform profile: ' + err.message);
    } finally {
      saveBtn.textContent = origText;
      saveBtn.disabled = false;
    }
  });

  // Handle CV file upload
  document.getElementById('admin-cv-file-input')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4.5 * 1024 * 1024) {
      alert('The selected file exceeds 4.5MB. For large documents, please host on Google Drive or Dropbox and paste the direct link.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      currentCvDataUrl = reader.result;
      currentCvFilename = file.name;
      const urlInput = document.getElementById('admin-cv-url-input');
      if (urlInput) urlInput.value = '';
      updateAdminCvStatusUI();
    };
    reader.readAsDataURL(file);
  });

  // Handle direct CV URL input
  document.getElementById('admin-cv-url-input')?.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val) {
      currentCvDataUrl = val;
      currentCvFilename = val.split('/').pop().split('?')[0] || 'Official_CV.pdf';
      const fileIn = document.getElementById('admin-cv-file-input');
      if (fileIn) fileIn.value = '';
      updateAdminCvStatusUI();
    } else if (!currentCvDataUrl.startsWith('data:')) {
      currentCvDataUrl = '';
      currentCvFilename = '';
      updateAdminCvStatusUI();
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
    const cvUrl = currentCvDataUrl || document.getElementById('admin-cv-url-input')?.value.trim() || '';
    const cvFilename = currentCvFilename || '';

    await saveSettings({
      ownerName, email, ownerBio, location, linkedin, github, codolio, medium, groqKey,
      cvUrl, cvFilename
    });
    alert('Settings & CV saved successfully!');
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
// VISUAL UPGRADE: 3D Perspective Tilt & Linear/Vercel Spotlight Handler
// ==========================================================================
function initCardSpotlightAndTilt() {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const cards = document.querySelectorAll(
    '.glass-card, .stat-card, .coding-summary-card, .coding-platform-card, .project-card, .skill-card, .cert-card'
  );

  cards.forEach(card => {
    // Explicitly exclude admin panel modal and its contents from tilting
    if (
      card.classList.contains('admin-modal') ||
      card.closest('.admin-modal') ||
      card.closest('#admin-console-modal') ||
      card.closest('#admin-auth-modal') ||
      card.classList.contains('no-tilt')
    ) {
      return;
    }

    if (card.dataset.tiltInitialized === 'true') return;
    card.dataset.tiltInitialized = 'true';

    // Spotlight cursor tracking
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt calculation (desktop mouse only, keep touch scroll fluid)
      if (!isTouch) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -((y - centerY) / centerY) * 5.5;
        const rotateY = ((x - centerX) / centerX) * 5.5;
        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.012, 1.012, 1.012)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '-999px');
      card.style.setProperty('--mouse-y', '-999px');
      if (!isTouch) {
        card.style.transform = '';
      }
    });
  });
}

// ==========================================================================
// VISUAL UPGRADE: Pinned Neon Scroll Progress Bar & Floating Back-to-Top Dock
// ==========================================================================
function initScrollProgressAndBackToTop() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('floating-back-to-top');
  const progressCircle = backToTopBtn?.querySelector('.progress-ring-circle');
  const circumference = 2 * Math.PI * 20; // ~125.66

  if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;
  }

  let ticking = false;

  function updateScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPct = docHeight > 0 ? Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100) : 0;

    // Progress Bar
    if (progressBar) {
      progressBar.style.width = `${scrollPct}%`;
    }

    // Back to top visibility & ring progress
    if (backToTopBtn) {
      if (scrollTop > 260) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }

      if (progressCircle) {
        const offset = circumference - (scrollPct / 100) * circumference;
        progressCircle.style.strokeDashoffset = `${offset}`;
      }
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });

  updateScroll();

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================================================
// VISUAL UPGRADE: Smooth Scroll-Reveal Entrance Animations
// ==========================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal="true"]');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => {
    if (!el.classList.contains('is-revealed')) {
      observer.observe(el);
    }
  });
}

// ==========================================================================
// VISUAL UPGRADE: Interactive Rolling Numbers Counter (Roll-Up)
// ==========================================================================
function initCounterAnimations() {
  const counterSelectors = [
    '#stat-projects-count',
    '#stat-skills-count',
    '#stat-certs-count',
    '#summary-total-solved',
    '#summary-peak-rating',
    '#summary-contests-count',
    '#summary-global-percentile',
    '#hero-chip-solved',
    '#hero-chip-rating',
    '.coding-summary-val',
    '.stat-number'
  ];

  const elements = document.querySelectorAll(counterSelectors.join(', '));

  function parseMetric(str) {
    const raw = (str || '').trim();
    const match = raw.match(/^([^\d.]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return null;
    return {
      prefix: match[1],
      targetNum: parseFloat(match[2]),
      suffix: match[3],
      isFloat: match[2].includes('.')
    };
  }

  function animateRollUp(el, parsed) {
    const { prefix, targetNum, suffix, isFloat } = parsed;
    const duration = 1400; // ms
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quartic
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = targetNum * ease;
      el.textContent = `${prefix}${isFloat ? current.toFixed(1) : Math.round(current)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${isFloat ? targetNum.toFixed(1) : targetNum}${suffix}`;
      }
    }
    requestAnimationFrame(update);
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.dataset.hasCounted === 'true') return;
        const parsed = parseMetric(el.textContent);
        if (parsed && !isNaN(parsed.targetNum) && parsed.targetNum > 0) {
          el.dataset.hasCounted = 'true';
          animateRollUp(el, parsed);
        }
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.2
  });

  elements.forEach(el => {
    if (el.dataset.hasCounted !== 'true') {
      observer.observe(el);
    }
  });
}

// ==========================================================================
// VISUAL UPGRADE: Magnetic Button Micro-Interactions
// ==========================================================================
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const buttons = document.querySelectorAll('.btn-primary, .hero-cta-group .btn, .brand-logo');
  buttons.forEach(btn => {
    if (btn.dataset.magneticInit === 'true') return;
    btn.dataset.magneticInit = 'true';
    btn.classList.add('btn-magnetic');

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
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
  initScrollProgressAndBackToTop();
  initScrollReveal();
  initCardSpotlightAndTilt();
  initCounterAnimations();
  initMagneticButtons();
  initContactForm();
  initAdminConsole();
  initGlobalListeners();
  checkPrintRoute();
});
