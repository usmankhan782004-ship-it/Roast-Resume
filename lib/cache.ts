import fs from "fs";
import path from "path";

/**
 * Fallback cache for roast results.
 * Keeps an in-memory copy for speed and mirrors it to disk so demo/roast
 * results can still be loaded after the redirect when Supabase is unavailable.
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
const cacheDir = path.join(process.cwd(), ".next", "cache", "roasts");

function ensureCacheDir() {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
}

function getCacheFilePath(id: string) {
  return path.join(cacheDir, `${id}.json`);
}

export function cacheRoast(id: string, data: CachedRoast) {
  roastCache.set(id, data);
  // Also index by share_token
  if (data.share_token && data.share_token !== id) {
    roastCache.set(data.share_token, data);
  }

  try {
    ensureCacheDir();
    fs.writeFileSync(getCacheFilePath(id), JSON.stringify(data), "utf8");
    if (data.share_token && data.share_token !== id) {
      fs.writeFileSync(getCacheFilePath(data.share_token), JSON.stringify(data), "utf8");
    }
  } catch {
    // Disk cache is a fallback only; in-memory cache still works within-process.
  }
}

export function getCachedRoast(id: string): CachedRoast | null {
  const cached = roastCache.get(id);
  if (cached) {
    return cached;
  }

  try {
    const filePath = getCacheFilePath(id);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as CachedRoast;
    roastCache.set(id, parsed);
    if (parsed.share_token && parsed.share_token !== id) {
      roastCache.set(parsed.share_token, parsed);
    }
    return parsed;
  } catch {
    return null;
  }
}
