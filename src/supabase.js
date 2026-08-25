import { createClient } from '@supabase/supabase-js';

// Get credentials from Vite environment or localStorage override
const getCredentials = () => {
  let url = import.meta.env.VITE_SUPABASE_URL || '';
  let anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  try {
    const customConfig = localStorage.getItem('portfolio_custom_supabase');
    if (customConfig) {
      const parsed = JSON.parse(customConfig);
      if (parsed.url) url = parsed.url;
      if (parsed.anonKey) anonKey = parsed.anonKey;
    }
  } catch (e) {
    console.warn('Failed to read custom Supabase config:', e);
  }

  return { url, anonKey };
};

let supabaseInstance = null;

export function getSupabase() {
  if (supabaseInstance) return supabaseInstance;

  const { url, anonKey } = getCredentials();

  if (url && anonKey && url.startsWith('http')) {
    try {
      supabaseInstance = createClient(url, anonKey, {
        auth: { persistSession: false }
      });
      return supabaseInstance;
    } catch (err) {
      console.warn('Supabase initialization failed, running in local offline mode:', err);
      return null;
    }
  }

  return null;
}

export function updateSupabaseConfig(url, anonKey) {
  if (url && anonKey) {
    localStorage.setItem('portfolio_custom_supabase', JSON.stringify({ url, anonKey }));
    supabaseInstance = createClient(url, anonKey, {
      auth: { persistSession: false }
    });
  } else {
    localStorage.removeItem('portfolio_custom_supabase');
    supabaseInstance = null;
  }
  return supabaseInstance;
}

export function isSupabaseConnected() {
  return Boolean(getSupabase());
}
