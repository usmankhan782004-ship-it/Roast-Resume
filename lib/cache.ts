/**
 * In-memory cache for roast results.
 * Used as a fallback when Supabase table doesn't exist yet,
 * and for instant result display before DB confirms.
 * In a serverless/multi-process environment this won't persist across
 * instances, but is perfect for single-server dev + demo.
 */

export interface CachedRoast {
  id: string;
  resume_text: string;
  score: number;
  roast_text: string;
  problems: string[];
  fixes: { section: string; suggestion: string }[];
  tags: { bad: string[]; ok: string[] };
  ats_score: number;
  verdict: string;
  is_paid: boolean;
  share_token: string;
  created_at: string;
}

// Global Map persists across requests within the same Node.js process
const roastCache = new Map<string, CachedRoast>();

export function cacheRoast(id: string, data: CachedRoast) {
  roastCache.set(id, data);
  // Also index by share_token
  if (data.share_token && data.share_token !== id) {
    roastCache.set(data.share_token, data);
  }
}

export function getCachedRoast(id: string): CachedRoast | null {
  return roastCache.get(id) ?? null;
}
