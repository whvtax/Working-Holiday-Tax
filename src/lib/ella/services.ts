// The real wiring for production (Vercel): Supabase, HeyGen, Claude, Meta and
// TikTok, all from environment variables Jo sets in Vercel himself.
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { getSupabase } from '@/lib/supabase'
import { SupabaseEllaDb } from './db'
import { loadSvtLibrary } from './library-svt'
import { MetaGraph } from './publish/meta'
import { TikTokClient } from './publish/tiktok'
import type { EllaServices } from './run'
import { BIBLE_V1 } from './script/bible'
import { AnthropicLlm } from './script/llm'
import { EllaRepo } from './store'
import { HeyGenClient } from './video/heygen'
import { SupabaseMediaStore } from './video/media'
import { AnthropicVision } from './video/qa'

let cached: EllaServices | null = null

export function ellaServices(): EllaServices {
  if (cached) return cached
  const repo = new EllaRepo(new SupabaseEllaDb())
  cached = {
    repo,
    media: new SupabaseMediaStore(process.env.ELLA_STORAGE_BUCKET ?? 'ella'),
    library: loadSvtLibrary,
    bible: BIBLE_V1,
    llm: () => new AnthropicLlm(),
    video: () => new HeyGenClient(),
    vision: () => (process.env.ANTHROPIC_API_KEY ? new AnthropicVision() : undefined),
    meta: () => new MetaGraph(),
    tiktok: (token: string) => new TikTokClient(token),
    now: () => new Date(),
    workDir: join(tmpdir(), 'ella-work'),
    pollSeconds: 20,
  }
  return cached
}

function supabaseReady(): boolean {
  try { getSupabase(); return true } catch { return false }
}

/** Which keys are present (never their values), for the Atlas setup screen. */
export function ellaEnvStatus() {
  const has = (k: string) => Boolean(process.env[k])
  return {
    supabase: supabaseReady(),
    anthropic: has('ANTHROPIC_API_KEY') && (has('ELLA_SCRIPT_MODEL') || has('CLAUDE_MODEL')),
    heygen: has('ELLA_HEYGEN_API_KEY'),
    meta: has('ELLA_META_ACCESS_TOKEN'),
    tiktokApp: has('ELLA_TIKTOK_CLIENT_KEY') && has('ELLA_TIKTOK_CLIENT_SECRET'),
    tokenKey: has('ELLA_TOKEN_KEY'),
    cron: has('CRON_SECRET'),
  }
}
