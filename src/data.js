import { getSupabase } from './supabase.js';

// Default initial state & seed data
const DEFAULT_DATA = {
  settings: {
    id: 'main_settings',
    ownerName: 'Niharika',
    ownerBio: 'Full-Stack Developer & AI Systems Engineer crafting resilient web applications, distributed edge systems, and intelligent agentic workflows.',
    email: 'niharika@example.com',
    location: 'Ludhiana, Punjab, India',
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/',
    codolio: 'https://codolio.com/',
    medium: 'https://medium.com/',
    groqKey: '',
    geminiKey: '',
    categories: ['Frontend', 'Backend', 'Databases', 'DevOps', 'AI / ML', 'Tools'],
    codingProfiles: {
      leetcode: {
        handle: 'niharika18',
        url: 'https://leetcode.com/u/niharika18/',
        solvedTotal: 420,
        solvedEasy: 150,
        solvedMedium: 220,
        solvedHard: 50,
        acceptanceRate: '68.4%',
        globalRank: 'Top 3.8%',
        rating: 1845
      },
      codeforces: {
        handle: 'niharika18',
        url: 'https://codeforces.com/profile/niharika18',
        rating: 1468,
        maxRating: 1540,
        rank: 'Specialist',
        maxRank: 'Specialist',
        solvedTotal: 310,
        contests: 24
      },
      codechef: {
        handle: 'niharika18',
        url: 'https://www.codechef.com/users/niharika18',
        stars: '4★',
        rating: 1820,
        highestRating: 1865,
        globalRank: '#11,420',
        countryRank: '#2,850',
        solvedTotal: 260
      },
      codolio: {
        handle: 'niharika',
        url: 'https://codolio.com/profile/niharika',
        score: 875,
        badges: '5 Verified Badges',
        summary: 'Unified cross-platform problem solving profile aggregating contest history & DSA strengths.'
      }
    }
  },
  tech_stacks: [
    { id: 'tech-1', name: 'JavaScript / ES6+', category: 'Frontend', level: 95, icon: 'icon-code' },
    { id: 'tech-2', name: 'React & Next.js', category: 'Frontend', level: 92, icon: 'icon-code' },
    { id: 'tech-3', name: 'TypeScript', category: 'Frontend', level: 88, icon: 'icon-code' },
    { id: 'tech-4', name: 'Node.js & Express', category: 'Backend', level: 90, icon: 'icon-terminal' },
    { id: 'tech-5', name: 'Python & FastAPI', category: 'Backend', level: 92, icon: 'icon-cpu' },
    { id: 'tech-6', name: 'PostgreSQL & Supabase', category: 'Databases', level: 88, icon: 'icon-database' },
    { id: 'tech-7', name: 'Redis & Caching', category: 'Databases', level: 85, icon: 'icon-database' },
    { id: 'tech-8', name: 'Docker & Microservices', category: 'DevOps', level: 84, icon: 'icon-cpu' },
    { id: 'tech-9', name: 'CI/CD & Vercel Edge', category: 'DevOps', level: 86, icon: 'icon-terminal' },
    { id: 'tech-10', name: 'Groq Llama 3.3 / AI Agents', category: 'AI / ML', level: 94, icon: 'icon-bot' },
    { id: 'tech-11', name: 'RAG & Vector Search', category: 'AI / ML', level: 87, icon: 'icon-sparkles' },
    { id: 'tech-12', name: 'Git & Version Control', category: 'Tools', level: 95, icon: 'icon-terminal' }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'ALL_ME AI Portfolio & Agent Co-Pilot',
      category: 'AI / ML',
      description: 'Ultra high-performance framework-less SPA featuring 600+ tok/sec Groq Llama 3.3 70B AI Representative, recruiter job-fit analyzer, WebGL particle physics, and Supabase cloud sync.',
      tags: ['JavaScript', 'Groq API', 'Llama 3.3', 'Supabase', 'WebGL', 'Vite'],
      githubUrl: 'https://github.com/',
      liveUrl: '#home',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'proj-2',
      title: 'NeuralEdge - Real-time Agentic Pipeline',
      category: 'Backend',
      description: 'Distributed event-driven agent orchestration system powered by FastAPI, asynchronous Celery workers, and low-latency Redis streaming with streaming token telemetry.',
      tags: ['Python', 'FastAPI', 'Redis', 'Docker', 'OpenAI'],
      githubUrl: 'https://github.com/',
      liveUrl: 'https://github.com/',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'proj-3',
      title: 'OmniSync - Cloud Native Postgres Sync',
      category: 'Databases',
      description: 'Resilient offline-first database synchronization client library enabling instantaneous zero-latency local caching with background conflict resolution and transaction batching.',
      tags: ['TypeScript', 'PostgreSQL', 'Web Workers', 'IndexedDB'],
      githubUrl: 'https://github.com/',
      liveUrl: 'https://github.com/',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'proj-4',
      title: 'CyberMatrix 3D Visualizer',
      category: 'Frontend',
      description: 'Interactive hardware-accelerated 3D WebGL data visualization platform rendering 50,000+ interactive nodes with dynamic force-directed graph layouts and spatial audio.',
      tags: ['Three.js', 'WebGL', 'GLSL Shaders', 'Vite'],
      githubUrl: 'https://github.com/',
      liveUrl: 'https://github.com/',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'proj-5',
      title: 'AutoDoc AI - Intelligent API Spec Generator',
      category: 'AI / ML',
      description: 'AST-based static code analysis tool that parses enterprise codebases and automatically synthesizes OpenAPI 3.1 specifications, integration tests, and SDK clients.',
      tags: ['Python', 'AST', 'LLMs', 'CLI'],
      githubUrl: 'https://github.com/',
      liveUrl: 'https://github.com/',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    }
  ],
  timeline: [
    {
      id: 'time-1',
      title: 'B.Tech in Computer Science & Engineering',
      company: 'Guru Nanak Dev Engineering College',
      role: 'Student Engineer',
      dateRange: '2021 — 2025',
      type: 'education',
      description: 'Graduating with Distinction. Core coursework in Data Structures, Algorithms, Distributed Systems, Database Management, and Artificial Intelligence.'
    },
    {
      id: 'time-2',
      title: 'Full-Stack Developer Intern',
      company: 'Innovatech Labs',
      role: 'Software Engineer',
      dateRange: '2024 — Present',
      type: 'experience',
      description: 'Architected scalable microservices and responsive modern web applications. Reduced API response latencies by 38% through Redis caching and query optimization.'
    },
    {
      id: 'time-3',
      title: 'AI Research & Open Source Contributor',
      company: 'Autonomous Systems Hub',
      role: 'Core Contributor',
      dateRange: '2023 — 2024',
      type: 'experience',
      description: 'Built RAG pipelines, benchmarked LLM inference throughputs across GPU clusters, and developed interactive UI tooling for multi-agent workflows.'
    }
  ],
  certificates: [
    {
      id: 'cert-1',
      title: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: '2024',
      credentialUrl: 'https://aws.amazon.com/certification/',
      skills: 'AWS Lambda, DynamoDB, ECS, API Gateway, CloudFormation',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'cert-2',
      title: 'Generative AI with Large Language Models',
      issuer: 'DeepLearning.AI',
      date: '2024',
      credentialUrl: 'https://www.deeplearning.ai/',
      skills: 'LLM Fine-Tuning, PEFT, LoRA, RLHF, Prompt Engineering',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'cert-3',
      title: 'Google Cloud Associate Cloud Engineer',
      issuer: 'Google Cloud',
      date: '2023',
      credentialUrl: 'https://cloud.google.com/certification',
      skills: 'Compute Engine, GKE, BigQuery, IAM, Cloud Run',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'cert-4',
      title: 'Meta Front-End Developer Professional',
      issuer: 'Meta',
      date: '2023',
      credentialUrl: 'https://www.coursera.org/',
      skills: 'React, JavaScript ES6+, Responsive Design, UI/UX, Jest',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Smart India Hackathon Grand Prize Winner',
      category: 'National Competition',
      highlight: '1st Place / 10,000+ Teams',
      organization: 'Ministry of Education & AICTE',
      date: '2024',
      description: 'Led a 6-member engineering team to design and deploy an autonomous drone traffic management spatial mesh system with sub-second collision avoidance.',
      link: 'https://github.com/',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'ach-2',
      title: 'Published Research on Edge LLM Acceleration',
      category: 'Publications & Research',
      highlight: 'Peer-Reviewed Paper',
      organization: 'IEEE / Open Research Hub',
      date: '2024',
      description: 'Co-authored research benchmarking quantized large language model inference latency and token streaming throughput across edge compute devices.',
      link: 'https://github.com/',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'ach-3',
      title: 'Global AI Agent Buildathon Finalist',
      category: 'Hackathon Award',
      highlight: 'Top 3 Globally',
      organization: 'Groq & Devpost',
      date: '2024',
      description: 'Engineered an 800+ tok/sec medical triage voice-and-text assistant utilizing Groq Llama 3 70B and verified clinical database retrieval.',
      link: 'https://github.com/',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'ach-4',
      title: 'Academic Excellence & Dean’s Merit Honor',
      category: 'Academic Honor',
      highlight: 'Top 1% Class Rank',
      organization: 'Guru Nanak Dev Engineering College',
      date: '2021 — 2024',
      description: 'Maintained distinction grade across all semesters, recognized for exemplary performance in Algorithms, Data Structures, and Software Architecture.',
      link: 'https://github.com/',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80'
    }
  ],
  blog: [
    {
      id: 'blog-1',
      title: 'Sub-Second LLM Inference: Harnessing Groq Llama 3.3 on the Edge',
      summary: 'A comprehensive technical deep dive into streaming tokens at 600+ tok/sec, designing reactive UI components, and managing token budgets.',
      tags: ['AI', 'Groq', 'Llama 3.3', 'Performance'],
      content: 'Large language models have historically been bottlenecked by memory bandwidth during inference. The advent of LPUs (Language Processing Units) by Groq unlocks true interactive real-time conversational experiences...',
      date: 'Aug 2024'
    },
    {
      id: 'blog-2',
      title: 'Zero-Latency Architectures with Offline-First LocalStorage & Supabase',
      summary: 'How to build high-performance web applications that render instantly using local memory cache while guaranteeing cloud synchronization.',
      tags: ['PostgreSQL', 'Supabase', 'Architecture', 'WebDev'],
      content: 'Users expect web apps to load within milliseconds. By pairing client-side cache stores with background PostgreSQL upserts, we eliminate perceived network lag...',
      date: 'Jul 2024'
    }
  ],
  messages: []
};

const STORAGE_KEY = 'portfolio_local_data_v1';

// In-memory data store
let memoryStore = null;

// Initialize data from localStorage or default
export function getLocalData() {
  if (memoryStore) return memoryStore;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      memoryStore = JSON.parse(saved);
      // Merge in any missing top-level arrays/objects
      for (const key of Object.keys(DEFAULT_DATA)) {
        if (!memoryStore[key]) {
          memoryStore[key] = DEFAULT_DATA[key];
        }
      }
    } else {
      memoryStore = JSON.parse(JSON.stringify(DEFAULT_DATA));
      saveToStorage();
    }
  } catch (err) {
    console.error('Error loading localStorage, resetting to default:', err);
    memoryStore = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  return memoryStore;
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStore));
    window.dispatchEvent(new CustomEvent('portfolio_data_changed', { detail: memoryStore }));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

// Handle / Username Extractor (Strips URLs, @, and slashes)
export function extractHandle(input, platform) {
  if (!input) return '';
  let str = String(input).trim();
  // Strip query parameters (?...) and hash fragments (#...)
  str = str.split('?')[0].split('#')[0].replace(/\/+$/, '');

  if (platform === 'leetcode') {
    const match = str.match(/(?:leetcode\.com\/(?:u\/)?|@|^)([a-zA-Z0-9_\-]+)$/i) || str.match(/([a-zA-Z0-9_\-]+)$/);
    return match ? match[1] : str.replace(/^@/, '');
  }
  if (platform === 'codeforces') {
    const match = str.match(/(?:codeforces\.com\/profile\/|@|^)([a-zA-Z0-9_\.\-]+)$/i) || str.match(/([a-zA-Z0-9_\.\-]+)$/);
    return match ? match[1] : str.replace(/^@/, '');
  }
  if (platform === 'codechef') {
    const match = str.match(/(?:codechef\.com\/users\/|@|^)([a-zA-Z0-9_]+)$/i) || str.match(/([a-zA-Z0-9_]+)$/);
    return match ? match[1] : str.replace(/^@/, '');
  }
  if (platform === 'codolio') {
    if (!str.startsWith('http')) {
      const h = str.replace(/^@/, '');
      return `https://codolio.com/profile/${h}`;
    }
    return str;
  }
  return str.replace(/^@/, '');
}

// --- Data Normalization Helpers (Fix PostgreSQL lowercase key compatibility) ---
function normalizeSettings(s) {
  if (!s) return memoryStore?.settings || DEFAULT_DATA.settings;
  const currentLocalProfiles = memoryStore?.settings?.codingProfiles || DEFAULT_DATA.settings.codingProfiles;
  
  let parsedProfiles = null;
  if (s.codingProfiles && typeof s.codingProfiles === 'object' && Object.keys(s.codingProfiles).length > 0) {
    parsedProfiles = s.codingProfiles;
  } else if (s.codingprofiles) {
    try {
      parsedProfiles = typeof s.codingprofiles === 'string' ? JSON.parse(s.codingprofiles) : s.codingprofiles;
    } catch (e) {
      console.warn('Failed to parse codingprofiles JSON:', e);
    }
  }

  // Merge carefully: if parsedProfiles is found, merge with currentLocalProfiles so no fields are lost
  let mergedProfiles = currentLocalProfiles;
  if (parsedProfiles && typeof parsedProfiles === 'object') {
    mergedProfiles = {
      leetcode: { ...(currentLocalProfiles.leetcode || {}), ...(parsedProfiles.leetcode || {}) },
      codeforces: { ...(currentLocalProfiles.codeforces || {}), ...(parsedProfiles.codeforces || {}) },
      codechef: { ...(currentLocalProfiles.codechef || {}), ...(parsedProfiles.codechef || {}) },
      codolio: { ...(currentLocalProfiles.codolio || {}), ...(parsedProfiles.codolio || {}) }
    };
  }

  return {
    id: 'main_settings',
    ownerName: s.ownerName ?? s.ownername ?? DEFAULT_DATA.settings.ownerName,
    ownerBio: s.ownerBio ?? s.ownerbio ?? DEFAULT_DATA.settings.ownerBio,
    email: s.email ?? DEFAULT_DATA.settings.email,
    location: s.location ?? DEFAULT_DATA.settings.location,
    linkedin: s.linkedin ?? DEFAULT_DATA.settings.linkedin,
    github: s.github ?? DEFAULT_DATA.settings.github,
    codolio: s.codolio ?? DEFAULT_DATA.settings.codolio,
    medium: s.medium ?? DEFAULT_DATA.settings.medium,
    groqKey: s.groqKey ?? s.groqkey ?? '',
    geminiKey: s.geminiKey ?? s.geminikey ?? '',
    categories: Array.isArray(s.categories) ? s.categories : (typeof s.categories === 'string' ? JSON.parse(s.categories || '[]') : DEFAULT_DATA.settings.categories),
    codingProfiles: mergedProfiles,
    lastStatsSync: s.lastStatsSync ?? s.laststatssync ?? (memoryStore?.settings?.lastStatsSync || null)
  };
}

function normalizeProject(p) {
  if (!p) return null;
  return {
    id: p.id,
    title: p.title || '',
    category: p.category || 'General',
    description: p.description || '',
    tags: Array.isArray(p.tags) ? p.tags : (typeof p.tags === 'string' ? JSON.parse(p.tags || '[]') : []),
    githubUrl: p.githubUrl ?? p.githuburl ?? '',
    liveUrl: p.liveUrl ?? p.liveurl ?? '',
    image: p.image || ''
  };
}

function normalizeTimeline(t) {
  if (!t) return null;
  return {
    id: t.id,
    title: t.title || '',
    company: t.company || '',
    role: t.role || '',
    dateRange: t.dateRange ?? t.daterange ?? '',
    type: t.type || 'experience',
    description: t.description || ''
  };
}

function normalizeCertificate(c) {
  if (!c) return null;
  return {
    id: c.id,
    title: c.title || '',
    issuer: c.issuer || '',
    date: c.date || '',
    credentialUrl: c.credentialUrl ?? c.credentialurl ?? '',
    skills: c.skills || '',
    image: c.image || ''
  };
}

function normalizeAchievement(a) {
  if (!a) return null;
  return {
    id: a.id,
    title: a.title || '',
    category: a.category || 'General',
    highlight: a.highlight || '',
    organization: a.organization || '',
    date: a.date || '',
    link: a.link || '',
    image: a.image || '',
    description: a.description || ''
  };
}

function normalizeTechStack(s) {
  if (!s) return null;
  return {
    id: s.id,
    name: s.name || '',
    category: s.category || 'General',
    level: typeof s.level === 'number' ? s.level : parseInt(s.level || 80),
    icon: s.icon || 'icon-code'
  };
}

// --- Data Serializers for Supabase (Lowercase column compatibility) ---
function serializeSettings(s) {
  return {
    id: 'main_settings',
    ownername: s.ownerName ?? s.ownername ?? '',
    ownerbio: s.ownerBio ?? s.ownerbio ?? '',
    email: s.email ?? '',
    location: s.location ?? '',
    linkedin: s.linkedin ?? '',
    github: s.github ?? '',
    codolio: s.codolio ?? '',
    medium: s.medium ?? '',
    groqkey: s.groqKey ?? s.groqkey ?? '',
    categories: s.categories || [],
    codingprofiles: s.codingProfiles || DEFAULT_DATA.settings.codingProfiles,
    laststatssync: s.lastStatsSync || new Date().toISOString()
  };
}

function serializeProject(p) {
  return {
    id: p.id,
    title: p.title || '',
    category: p.category || 'General',
    description: p.description || '',
    tags: Array.isArray(p.tags) ? p.tags : [],
    githuburl: p.githubUrl ?? p.githuburl ?? '',
    liveurl: p.liveUrl ?? p.liveurl ?? '',
    image: p.image || ''
  };
}

function serializeTimeline(t) {
  return {
    id: t.id,
    title: t.title || '',
    company: t.company || '',
    role: t.role || 'Engineer',
    daterange: t.dateRange ?? t.daterange ?? '',
    type: t.type || 'experience',
    description: t.description || ''
  };
}

function serializeCertificate(c) {
  return {
    id: c.id,
    title: c.title || '',
    issuer: c.issuer || '',
    date: c.date || '',
    credentialurl: c.credentialUrl ?? c.credentialurl ?? '',
    skills: c.skills || '',
    image: c.image || ''
  };
}

function serializeAchievement(a) {
  return {
    id: a.id,
    title: a.title || '',
    category: a.category || 'General',
    highlight: a.highlight || '',
    organization: a.organization || '',
    date: a.date || '',
    link: a.link || '',
    image: a.image || '',
    description: a.description || ''
  };
}

function serializeTechStack(s) {
  return {
    id: s.id,
    name: s.name || '',
    category: s.category || 'General',
    level: typeof s.level === 'number' ? s.level : parseInt(s.level || 80),
    icon: s.icon || 'icon-code'
  };
}

// Robust Cloud Upsert for Settings with schema backward-compatibility
async function upsertSettingsToSupabase(supabase, settings) {
  if (!supabase) return { ok: false };
  const payload = serializeSettings(settings);
  try {
    const { error } = await supabase.from('portfolio_settings').upsert([payload]);
    if (error) {
      if (error.code === '42703' || (error.message && (error.message.includes('codingprofiles') || error.message.includes('laststatssync') || error.message.includes('column')))) {
        console.warn('Supabase portfolio_settings table missing codingprofiles/laststatssync column. Retrying backward-compatible upsert...');
        const legacyPayload = {
          id: payload.id,
          ownername: payload.ownername,
          ownerbio: payload.ownerbio,
          email: payload.email,
          location: payload.location,
          linkedin: payload.linkedin,
          github: payload.github,
          codolio: payload.codolio,
          medium: payload.medium,
          groqkey: payload.groqkey,
          categories: payload.categories
        };
        const { error: fallbackErr } = await supabase.from('portfolio_settings').upsert([legacyPayload]);
        if (fallbackErr) {
          console.warn('Fallback settings upsert failed:', fallbackErr);
          return { ok: false, error: fallbackErr, partial: true };
        }
        return { ok: true, partial: true };
      }
      console.warn('Cloud save settings error:', error);
      return { ok: false, error };
    }
    return { ok: true, partial: false };
  } catch (err) {
    console.warn('Cloud upsert settings exception:', err);
    return { ok: false, error: err };
  }
}

// Background Cloud Sync
export async function syncWithCloud() {
  const supabase = getSupabase();
  const local = getLocalData();
  if (!supabase) return local;

  try {
    // 1. Sync Settings
    const { data: cloudSettings, error: setErr } = await supabase
      .from('portfolio_settings')
      .select('*')
      .eq('id', 'main_settings')
      .single();

    if (!setErr && cloudSettings) {
      local.settings = normalizeSettings(cloudSettings);
    } else if (setErr && setErr.code === 'PGRST116') {
      // Table is empty, upload initial local settings
      await upsertSettingsToSupabase(supabase, local.settings);
    } else if (setErr) {
      console.warn('Supabase fetch error for portfolio_settings:', setErr);
    }

    // 2. Sync Collections
    const collections = [
      { table: 'portfolio_tech_stacks', key: 'tech_stacks', normalizer: normalizeTechStack, serializer: serializeTechStack },
      { table: 'portfolio_projects', key: 'projects', normalizer: normalizeProject, serializer: serializeProject },
      { table: 'portfolio_timeline', key: 'timeline', normalizer: normalizeTimeline, serializer: serializeTimeline },
      { table: 'portfolio_certificates', key: 'certificates', normalizer: normalizeCertificate, serializer: serializeCertificate },
      { table: 'portfolio_achievements', key: 'achievements', normalizer: normalizeAchievement, serializer: serializeAchievement },
      { table: 'portfolio_messages', key: 'messages', normalizer: (m) => m, serializer: (m) => m }
    ];

    for (const { table, key, normalizer, serializer } of collections) {
      const { data, error } = await supabase.from(table).select('*');
      if (error) {
        console.warn(`Supabase fetch error for ${table}:`, error);
        continue;
      }
      if (Array.isArray(data)) {
        if (data.length > 0) {
          local[key] = data.map(normalizer).filter(Boolean);
        } else if (local[key] && local[key].length > 0) {
          // Cloud table is empty but local has seed data - auto upload
          try {
            await supabase.from(table).upsert(local[key].map(serializer));
          } catch (upErr) {
            console.warn(`Failed to auto-seed cloud table ${table}:`, upErr);
          }
        }
      }
    }

    saveToStorage();
    return local;
  } catch (err) {
    console.warn('Cloud sync encountered non-critical error, continuing offline:', err);
    return local;
  }
}

// Diagnostic Health Checker for Supabase Connection & Tables
export async function testSupabaseHealth() {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      connected: false,
      message: 'Supabase client is not connected. Please check your Supabase Project URL and Anon Key.',
      tables: []
    };
  }

  const collections = [
    { table: 'portfolio_settings', name: 'Profile Settings' },
    { table: 'portfolio_tech_stacks', name: 'Technical Skills' },
    { table: 'portfolio_projects', name: 'Featured Projects' },
    { table: 'portfolio_timeline', name: 'Timeline Journey' },
    { table: 'portfolio_certificates', name: 'Certificates' },
    { table: 'portfolio_achievements', name: 'Key Achievements' },
    { table: 'portfolio_messages', name: 'Inquiry Messages' }
  ];

  const report = [];
  let allOk = true;

  for (const { table, name } of collections) {
    try {
      const { data, error } = await supabase.from(table).select('*');
      if (error) {
        allOk = false;
        report.push({ table, name, ok: false, count: 0, error: `${error.code || 'ERR'}: ${error.message}` });
      } else {
        report.push({ table, name, ok: true, count: data ? data.length : 0, error: null });
      }
    } catch (e) {
      allOk = false;
      report.push({ table, name, ok: false, count: 0, error: e.message });
    }
  }

  return {
    connected: true,
    allOk,
    tables: report
  };
}

// Push all local data items to Cloud Supabase
export async function pushLocalDataToCloud() {
  const supabase = getSupabase();
  const local = getLocalData();
  if (!supabase) {
    throw new Error('Supabase is not connected. Please provide your Supabase Project URL and Anon API Key.');
  }

  const results = { success: true, details: [] };

  // 1. Settings
  try {
    const res = await upsertSettingsToSupabase(supabase, local.settings);
    if (res?.partial) {
      results.details.push('Profile Settings synced (Note: Run ALTER TABLE migration in Supabase to sync coding profiles cloud-side)');
    } else {
      results.details.push('Profile Settings synced');
    }
  } catch (e) {
    console.error('Push settings error:', e);
    results.details.push(`Settings error: ${e.message}`);
  }

  // 2. Collections
  const collections = [
    { table: 'portfolio_tech_stacks', key: 'tech_stacks', name: 'Tech Stack', serializer: serializeTechStack },
    { table: 'portfolio_projects', key: 'projects', name: 'Projects', serializer: serializeProject },
    { table: 'portfolio_timeline', key: 'timeline', name: 'Journey', serializer: serializeTimeline },
    { table: 'portfolio_certificates', key: 'certificates', name: 'Certificates', serializer: serializeCertificate },
    { table: 'portfolio_achievements', key: 'achievements', name: 'Achievements', serializer: serializeAchievement },
    { table: 'portfolio_messages', key: 'messages', name: 'Messages', serializer: (m) => m }
  ];

  for (const { table, key, name, serializer } of collections) {
    const items = local[key] || [];
    if (items.length > 0) {
      try {
        const payload = items.map(serializer);
        const { error } = await supabase.from(table).upsert(payload);
        if (error) throw error;
        results.details.push(`${name} (${items.length} items synced)`);
      } catch (err) {
        console.error(`Push ${table} error:`, err);
        results.details.push(`${name} failed: ${err.message}`);
      }
    }
  }

  return results;
}

// --- Direct CRUD Methods ---

export async function saveSettings(newSettings) {
  const data = getLocalData();
  data.settings = { ...data.settings, ...newSettings };
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    await upsertSettingsToSupabase(supabase, data.settings);
  }
  return data.settings;
}

export async function saveTechStack(item) {
  const data = getLocalData();
  const id = item.id || 'tech-' + Date.now();
  const record = { ...item, id };
  const idx = data.tech_stacks.findIndex(t => t.id === id);
  if (idx >= 0) {
    data.tech_stacks[idx] = record;
  } else {
    data.tech_stacks.push(record);
  }
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_tech_stacks').upsert([serializeTechStack(record)]);
    } catch (e) {
      console.warn('Cloud save tech stack failed:', e);
    }
  }
  return record;
}

export async function deleteTechStack(id) {
  const data = getLocalData();
  data.tech_stacks = data.tech_stacks.filter(t => t.id !== id);
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_tech_stacks').delete().eq('id', id);
    } catch (e) {
      console.warn('Cloud delete tech stack failed:', e);
    }
  }
}

export async function saveProject(item) {
  const data = getLocalData();
  const id = item.id || 'proj-' + Date.now();
  const record = { ...item, id };
  const idx = data.projects.findIndex(p => p.id === id);
  if (idx >= 0) {
    data.projects[idx] = record;
  } else {
    data.projects.unshift(record);
  }
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_projects').upsert([serializeProject(record)]);
    } catch (e) {
      console.warn('Cloud save project failed:', e);
    }
  }
  return record;
}

export async function deleteProject(id) {
  const data = getLocalData();
  data.projects = data.projects.filter(p => p.id !== id);
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_projects').delete().eq('id', id);
    } catch (e) {
      console.warn('Cloud delete project failed:', e);
    }
  }
}

export async function saveTimelineItem(item) {
  const data = getLocalData();
  const id = item.id || 'time-' + Date.now();
  const record = { ...item, id };
  const idx = data.timeline.findIndex(t => t.id === id);
  if (idx >= 0) {
    data.timeline[idx] = record;
  } else {
    data.timeline.push(record);
  }
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_timeline').upsert([serializeTimeline(record)]);
    } catch (e) {
      console.warn('Cloud save timeline failed:', e);
    }
  }
  return record;
}

export async function deleteTimelineItem(id) {
  const data = getLocalData();
  data.timeline = data.timeline.filter(t => t.id !== id);
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_timeline').delete().eq('id', id);
    } catch (e) {
      console.warn('Cloud delete timeline failed:', e);
    }
  }
}

export async function saveCertificate(item) {
  const data = getLocalData();
  const id = item.id || 'cert-' + Date.now();
  const record = { ...item, id };
  const idx = data.certificates.findIndex(c => c.id === id);
  if (idx >= 0) {
    data.certificates[idx] = record;
  } else {
    data.certificates.unshift(record);
  }
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_certificates').upsert([serializeCertificate(record)]);
    } catch (e) {
      console.warn('Cloud save certificate failed:', e);
    }
  }
  return record;
}

export async function deleteCertificate(id) {
  const data = getLocalData();
  data.certificates = data.certificates.filter(c => c.id !== id);
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_certificates').delete().eq('id', id);
    } catch (e) {
      console.warn('Cloud delete certificate failed:', e);
    }
  }
}

export async function saveAchievement(item) {
  const data = getLocalData();
  const id = item.id || 'ach-' + Date.now();
  const record = { ...item, id };
  const idx = (data.achievements || []).findIndex(a => a.id === id);
  if (idx >= 0) {
    data.achievements[idx] = record;
  } else {
    if (!data.achievements) data.achievements = [];
    data.achievements.unshift(record);
  }
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_achievements').upsert([serializeAchievement(record)]);
    } catch (e) {
      console.warn('Cloud save achievement failed:', e);
    }
  }
  return record;
}

export async function deleteAchievement(id) {
  const data = getLocalData();
  data.achievements = (data.achievements || []).filter(a => a.id !== id);
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_achievements').delete().eq('id', id);
    } catch (e) {
      console.warn('Cloud delete achievement failed:', e);
    }
  }
}


export async function saveBlog(item) {
  const data = getLocalData();
  const id = item.id || 'blog-' + Date.now();
  const record = { ...item, id };
  const idx = data.blog.findIndex(b => b.id === id);
  if (idx >= 0) {
    data.blog[idx] = record;
  } else {
    data.blog.unshift(record);
  }
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_blog').upsert([record]);
    } catch (e) {
      console.warn('Cloud save blog failed:', e);
    }
  }
  return record;
}

export async function deleteBlog(id) {
  const data = getLocalData();
  data.blog = data.blog.filter(b => b.id !== id);
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_blog').delete().eq('id', id);
    } catch (e) {
      console.warn('Cloud delete blog failed:', e);
    }
  }
}

export async function saveMessage(msg) {
  const data = getLocalData();
  const id = 'msg-' + Date.now();
  const record = {
    id,
    name: msg.name,
    email: msg.email,
    subject: msg.subject || 'Portfolio Inquiry',
    message: msg.message,
    timestamp: new Date().toISOString(),
    unread: true
  };
  data.messages.unshift(record);
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_messages').upsert([record]);
    } catch (e) {
      console.warn('Cloud save message failed:', e);
    }
  }
  return record;
}

export function getMessages() {
  const data = getLocalData();
  return data.messages || [];
}


export async function toggleMessageRead(id) {
  const data = getLocalData();
  const msg = data.messages.find(m => m.id === id);
  if (msg) {
    msg.unread = !msg.unread;
    saveToStorage();

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from('portfolio_messages').update({ unread: msg.unread }).eq('id', id);
      } catch (e) {
        console.warn('Cloud update message failed:', e);
      }
    }
  }
}

export async function deleteMessage(id) {
  const data = getLocalData();
  data.messages = data.messages.filter(m => m.id !== id);
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_messages').delete().eq('id', id);
    } catch (e) {
      console.warn('Cloud delete message failed:', e);
    }
  }
}

// Backup / Restore utilities
export function exportBackupJSON() {
  return JSON.stringify(getLocalData(), null, 2);
}

export async function importBackupJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed.settings || !parsed.projects) {
      throw new Error('Invalid portfolio backup JSON schema');
    }
    memoryStore = parsed;
    saveToStorage();

    // Push to Supabase if connected
    const supabase = getSupabase();
    if (supabase) {
      await supabase.from('portfolio_settings').upsert([parsed.settings]);
      if (parsed.tech_stacks?.length) await supabase.from('portfolio_tech_stacks').upsert(parsed.tech_stacks);
      if (parsed.projects?.length) await supabase.from('portfolio_projects').upsert(parsed.projects);
      if (parsed.timeline?.length) await supabase.from('portfolio_timeline').upsert(parsed.timeline);
      if (parsed.certificates?.length) await supabase.from('portfolio_certificates').upsert(parsed.certificates);
      if (parsed.achievements?.length) await supabase.from('portfolio_achievements').upsert(parsed.achievements);
      if (parsed.blog?.length) await supabase.from('portfolio_blog').upsert(parsed.blog);
    }
    return true;
  } catch (err) {
    console.error('Backup restore failed:', err);
    throw err;
  }
}

export function clearLocalCache() {
  localStorage.removeItem(STORAGE_KEY);
  memoryStore = JSON.parse(JSON.stringify(DEFAULT_DATA));
  saveToStorage();
}

// Live Coding Profiles Fetcher (LeetCode, Codeforces, CodeChef)
export async function fetchLiveCodingProfiles(forceRefresh = false) {
  const data = getLocalData();
  const profiles = data.settings.codingProfiles || DEFAULT_DATA.settings.codingProfiles;

  const leetcodeHandle = extractHandle(profiles.leetcode?.handle || '', 'leetcode');
  const codeforcesHandle = extractHandle(profiles.codeforces?.handle || '', 'codeforces');
  const codechefHandle = extractHandle(profiles.codechef?.handle || '', 'codechef');

  // Ensure cleaned handles and URLs are set
  if (leetcodeHandle) {
    profiles.leetcode.handle = leetcodeHandle;
    profiles.leetcode.url = `https://leetcode.com/u/${leetcodeHandle}/`;
  }
  if (codeforcesHandle) {
    profiles.codeforces.handle = codeforcesHandle;
    profiles.codeforces.url = `https://codeforces.com/profile/${codeforcesHandle}`;
  }
  if (codechefHandle) {
    profiles.codechef.handle = codechefHandle;
    profiles.codechef.url = `https://www.codechef.com/users/${codechefHandle}`;
  }

  let hasUpdates = false;

  // 1. Try Vercel Serverless Proxy / Vite Dev Middleware
  try {
    const url = `/api/coding-stats?leetcode=${encodeURIComponent(leetcodeHandle)}&codeforces=${encodeURIComponent(codeforcesHandle)}&codechef=${encodeURIComponent(codechefHandle)}${forceRefresh ? '&t=' + Date.now() : ''}`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        if (json.data.leetcode && json.data.leetcode.solvedTotal !== undefined) {
          profiles.leetcode = { ...profiles.leetcode, ...json.data.leetcode };
          hasUpdates = true;
        }
        if (json.data.codeforces && (json.data.codeforces.rating !== undefined || json.data.codeforces.solvedTotal !== undefined || json.data.codeforces.handle)) {
          profiles.codeforces = { ...profiles.codeforces, ...json.data.codeforces };
          hasUpdates = true;
        }
        if (json.data.codechef && (json.data.codechef.rating !== undefined || json.data.codechef.stars || json.data.codechef.handle)) {
          profiles.codechef = { ...profiles.codechef, ...json.data.codechef };
          hasUpdates = true;
        }
      }
    }
  } catch (err) {
    console.warn('Coding stats proxy error, attempting direct client fetch:', err);
  }

  // 2. Direct Fallback if proxy was offline or missing fields
  if (!hasUpdates) {
    // Leetcode direct fallback
    if (leetcodeHandle) {
      try {
        const lcRes = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${encodeURIComponent(leetcodeHandle)}`);
        if (lcRes.ok) {
          const lc = await lcRes.json();
          if (lc && lc.totalSolved !== undefined) {
            profiles.leetcode.solvedTotal = lc.totalSolved;
            profiles.leetcode.solvedEasy = lc.easySolved || 0;
            profiles.leetcode.solvedMedium = lc.mediumSolved || 0;
            profiles.leetcode.solvedHard = lc.hardSolved || 0;
            profiles.leetcode.acceptanceRate = lc.acceptanceRate ? `${lc.acceptanceRate}%` : '65%';
            profiles.leetcode.globalRank = lc.ranking && lc.ranking < 5000000 ? `#${Number(lc.ranking).toLocaleString()}` : (lc.ranking ? `#${Number(lc.ranking).toLocaleString()}` : profiles.leetcode.globalRank);
            if (lc.contributionPoint) profiles.leetcode.rating = lc.contributionPoint;
            hasUpdates = true;
          }
        }
      } catch (e) {
        console.warn('Direct LeetCode fetch 1 failed:', e);
      }

      if (!hasUpdates) {
        try {
          const lcRes2 = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${encodeURIComponent(leetcodeHandle)}`);
          if (lcRes2.ok) {
            const lc2 = await lcRes2.json();
            if (lc2 && lc2.totalSolved !== undefined) {
              profiles.leetcode.solvedTotal = lc2.totalSolved;
              profiles.leetcode.solvedEasy = lc2.easySolved || 0;
              profiles.leetcode.solvedMedium = lc2.mediumSolved || 0;
              profiles.leetcode.solvedHard = lc2.hardSolved || 0;
              profiles.leetcode.acceptanceRate = lc2.acceptanceRate ? `${lc2.acceptanceRate}%` : '65%';
              profiles.leetcode.globalRank = lc2.ranking && lc2.ranking < 5000000 ? `#${Number(lc2.ranking).toLocaleString()}` : profiles.leetcode.globalRank;
              hasUpdates = true;
            }
          }
        } catch (e) {
          console.warn('Direct LeetCode fetch 2 failed:', e);
        }
      }
    }

    // Codeforces direct fallback
    if (codeforcesHandle) {
      try {
        const [cfRes, cfStatus] = await Promise.allSettled([
          fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(codeforcesHandle)}`),
          fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(codeforcesHandle)}&from=1&count=2000`)
        ]);

        if (cfRes.status === 'fulfilled' && cfRes.value.ok) {
          const cf = await cfRes.value.json();
          if (cf.status === 'OK' && cf.result?.[0]) {
            const u = cf.result[0];
            profiles.codeforces.rating = u.rating || 0;
            profiles.codeforces.maxRating = u.maxRating || 0;
            profiles.codeforces.rank = u.rank ? u.rank.charAt(0).toUpperCase() + u.rank.slice(1) : 'Unrated';
            profiles.codeforces.maxRank = u.maxRank ? u.maxRank.charAt(0).toUpperCase() + u.maxRank.slice(1) : 'Unrated';
            hasUpdates = true;
          }
        }

        if (cfStatus.status === 'fulfilled' && cfStatus.value.ok) {
          const cfs = await cfStatus.value.json();
          if (cfs.status === 'OK' && Array.isArray(cfs.result)) {
            const solvedSet = new Set();
            cfs.result.forEach(sub => {
              if (sub.verdict === 'OK' && sub.problem) {
                solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
              }
            });
            profiles.codeforces.solvedTotal = solvedSet.size;
            hasUpdates = true;
          }
        }
      } catch (e) {
        console.warn('Direct Codeforces fetch failed:', e);
      }
    }

    // CodeChef direct fallback
    if (codechefHandle) {
      try {
        const ccRes = await fetch(`https://codechef-api-gamma.vercel.app/handle/${encodeURIComponent(codechefHandle)}`);
        if (ccRes.ok) {
          const cc = await ccRes.json();
          if (cc && cc.success !== false) {
            profiles.codechef.stars = cc.stars ? (cc.stars.includes('★') ? cc.stars : `${cc.stars}★`) : (profiles.codechef.stars || '2★');
            profiles.codechef.rating = cc.currentRating || profiles.codechef.rating || 0;
            profiles.codechef.highestRating = cc.highestRating || profiles.codechef.highestRating || 0;
            profiles.codechef.globalRank = cc.globalRank ? `#${Number(cc.globalRank).toLocaleString()}` : profiles.codechef.globalRank;
            profiles.codechef.countryRank = cc.countryRank ? `#${Number(cc.countryRank).toLocaleString()}` : profiles.codechef.countryRank;
            if (cc.heatMap) {
              const solvedFromHeatmap = cc.heatMap.reduce((acc, cur) => acc + (cur.value || 0), 0);
              if (solvedFromHeatmap > 0) profiles.codechef.solvedTotal = solvedFromHeatmap;
            }
            hasUpdates = true;
          }
        }
      } catch (e) {
        console.warn('Direct CodeChef fetch failed:', e);
      }
    }
  }

  data.settings.codingProfiles = profiles;
  data.settings.lastStatsSync = new Date().toISOString();
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    await upsertSettingsToSupabase(supabase, data.settings);
  }

  return profiles;
}

export async function saveCodingProfiles(updatedProfiles) {
  const data = getLocalData();
  data.settings.codingProfiles = { ...data.settings.codingProfiles, ...updatedProfiles };
  data.settings.lastStatsSync = new Date().toISOString();
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    await upsertSettingsToSupabase(supabase, data.settings);
  }
  return data.settings.codingProfiles;
}
