/**
 * Lightweight Supabase client using fetch API.
 * Dramatically reduces bundle size for Cloudflare Pages edge functions
 * compared to the full @supabase/supabase-js library.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

interface SupabaseRow {
  [key: string]: any;
}

function buildUrl(table: string, params: Record<string, string | undefined>): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      query.set(key, value);
    }
  }
  const qs = query.toString();
  return `${supabaseUrl}/rest/v1/${table}${qs ? `?${qs}` : ""}`;
}

function getHeaders(): HeadersInit {
  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    "Content-Type": "application/json",
  };
}

export const supabaseLite = {
  async selectAll(table: string, filters: Record<string, string> = {}, orderBy?: string, ascending = true, limit?: number): Promise<any[]> {
    const params: Record<string, string> = { select: "*" };

    for (const [key, value] of Object.entries(filters)) {
      params[key] = `eq.${value}`;
    }

    if (orderBy) {
      params.order = `${orderBy}.${ascending ? "asc" : "desc"}`;
    }

    if (limit) {
      params.limit = String(limit);
    }

    const res = await fetch(buildUrl(table, params), {
      headers: getHeaders(),
    });

    if (!res.ok) {
      console.error(`Supabase selectAll error: ${res.status} ${res.statusText}`);
      return [];
    }

    return res.json();
  },

  async selectOne(table: string, filters: Record<string, string> = {}): Promise<any | null> {
    const params: Record<string, string> = { select: "*" };

    for (const [key, value] of Object.entries(filters)) {
      params[key] = `eq.${value}`;
    }

    const res = await fetch(buildUrl(table, params), {
      headers: getHeaders(),
    });

    if (!res.ok) {
      console.error(`Supabase selectOne error: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  },
};