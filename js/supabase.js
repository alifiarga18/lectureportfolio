// ============================================================
// supabase.js — Supabase Client Initialization
// Reads credentials from localStorage (set by installer) first,
// then falls back to hardcoded defaults.
// Run install.html to configure your own Supabase project.
// ============================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Read config from localStorage (set by the CMS installer)
const _config = JSON.parse(localStorage.getItem('supabase_config') || 'null');

const SUPABASE_URL = _config?.url || '';
const SUPABASE_ANON_KEY = _config?.anon_key || '';
const SUPABASE_SERVICE_KEY = _config?.service_key || '';

// Public (anon) client — used for frontend reads & public operations
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Admin (service_role) client — used for admin CRUD operations
// The service_role key bypasses RLS, so all write operations succeed.
// Only used in admin pages, never exposed on the public frontend.
export const supabaseAdmin = SUPABASE_SERVICE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false }
    })
    : supabase; // fallback to anon if no service key stored
