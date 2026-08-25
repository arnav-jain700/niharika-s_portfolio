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
    categories: ['Frontend', 'Backend', 'Databases', 'DevOps', 'AI / ML', 'Tools']
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
      local.settings = { ...local.settings, ...cloudSettings };
    } else if (setErr && setErr.code === 'PGRST116') {
      // Table is empty, upload initial local settings
      await supabase.from('portfolio_settings').upsert([local.settings]);
    }

    // 2. Sync Collections
    const collections = [
      { table: 'portfolio_tech_stacks', key: 'tech_stacks' },
      { table: 'portfolio_projects', key: 'projects' },
      { table: 'portfolio_timeline', key: 'timeline' },
      { table: 'portfolio_certificates', key: 'certificates' },
      { table: 'portfolio_achievements', key: 'achievements' },
      { table: 'portfolio_blog', key: 'blog' },
      { table: 'portfolio_messages', key: 'messages' }
    ];

    for (const { table, key } of collections) {
      const { data, error } = await supabase.from(table).select('*');
      if (!error && Array.isArray(data)) {
        if (data.length > 0) {
          local[key] = data;
        } else if (local[key] && local[key].length > 0) {
          // Cloud table is empty but local has seed data - auto upload
          try {
            await supabase.from(table).upsert(local[key]);
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

// --- Direct CRUD Methods ---

export async function saveSettings(newSettings) {
  const data = getLocalData();
  data.settings = { ...data.settings, ...newSettings };
  saveToStorage();

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('portfolio_settings').upsert([data.settings]);
    } catch (e) {
      console.warn('Cloud save settings failed:', e);
    }
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
      await supabase.from('portfolio_tech_stacks').upsert([record]);
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
      await supabase.from('portfolio_projects').upsert([record]);
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
      await supabase.from('portfolio_timeline').upsert([record]);
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
      await supabase.from('portfolio_certificates').upsert([record]);
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
      await supabase.from('portfolio_achievements').upsert([record]);
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
