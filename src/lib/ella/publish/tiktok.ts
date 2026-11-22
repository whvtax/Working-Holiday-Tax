import type { AccountLive } from '../store'
// TikTok Content Posting API (Direct Post, file upload) and the stats Ella
// reads back. Until TikTok audits the app, every API post is private, so the
// default mode is "manual": Ella prepares the file and caption and Jo posts
// from the phone. The client is ready for the day the audit passes.
//
// Tokens: OAuth (Atlas, Settings, Connect TikTok). Access tokens last 24 hours
// and are refreshed here; both are kept sealed in ella_settings.

export interface TikTokTokens { accessToken: string; refreshToken: string; expiresAt: number; openId: string }

const API = 'https://open.tiktokapis.com'
export const TIKTOK_SCOPES = ['user.info.basic', 'user.info.stats', 'video.publish', 'video.list']
/** The one redirect URI registered in the TikTok app (Login Kit, Web). It must
 *  match character for character. It is on the SVT domain on purpose: see
 *  SVT_TIKTOK_CALLBACK in config/brand-routing.js (one-time exception, 23 Nov 2026). */
export const TIKTOK_CALLBACK_URL = 'https://studentvisatax.com.au/api/atlas/ella/tiktok/callback'

export class TikTokError extends Error {
  constructor(message: string, public code?: string) { super(message) }
}

function clientCreds() {
  const key = process.env.ELLA_TIKTOK_CLIENT_KEY, secret = process.env.ELLA_TIKTOK_CLIENT_SECRET
  if (!key || !secret) throw new Error('Missing ELLA_TIKTOK_CLIENT_KEY or ELLA_TIKTOK_CLIENT_SECRET')
  return { key, secret }
}

export function tiktokAuthorizeUrl(redirectUri: string, state: string): string {
  const q = new URLSearchParams({ client_key: clientCreds().key, scope: TIKTOK_SCOPES.join(','), response_type: 'code', redirect_uri: redirectUri, state })
  return `https://www.tiktok.com/v2/auth/authorize/?${q}`
}

async function tokenCall(body: Record<string, string>, fetchImpl: typeof fetch = fetch): Promise<TikTokTokens> {
  const { key, secret } = clientCreds()
  const res = await fetchImpl(`${API}/v2/oauth/token/`, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_key: key, client_secret: secret, ...body }),
  })
  const j = await res.json() as { access_token?: string; refresh_token?: string; expires_in?: number; open_id?: string; error?: string; error_description?: string }
  if (!res.ok || !j.access_token) throw new TikTokError(`TikTok token: ${j.error_description ?? j.error ?? res.status}`, j.error)
  return { accessToken: j.access_token, refreshToken: j.refresh_token ?? '', expiresAt: Date.now() + (j.expires_in ?? 86400) * 1000, openId: j.open_id ?? '' }
}

export const tiktokExchangeCode = (code: string, redirectUri: string, f?: typeof fetch) =>
  tokenCall({ code, grant_type: 'authorization_code', redirect_uri: redirectUri }, f)
export const tiktokRefresh = (refreshToken: string, f?: typeof fetch) =>
  tokenCall({ refresh_token: refreshToken, grant_type: 'refresh_token' }, f)

export class TikTokClient {
  constructor(private accessToken: string, private fetchImpl: typeof fetch = fetch) {}

  private async call<T>(path: string, body?: unknown, query = ''): Promise<T> {
    const res = await this.fetchImpl(`${API}${path}${query}`, {
      method: 'POST',
      headers: { authorization: `Bearer ${this.accessToken}`, 'content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(body ?? {}),
    })
    const j = await res.json() as { data?: T; error?: { code?: string; message?: string } }
    if (!res.ok || (j.error && j.error.code && j.error.code !== 'ok')) throw new TikTokError(`TikTok ${path}: ${j.error?.message ?? res.status}`, j.error?.code)
    return j.data as T
  }

  async creatorInfo() {
    return this.call<{ creator_nickname: string; creator_username: string; privacy_level_options: string[]; max_video_post_duration_sec: number }>(
      '/v2/post/publish/creator_info/query/')
  }

  /** Direct post by file upload (no domain check needed). Returns publish_id. */
  async postVideo(input: { bytes: Uint8Array; caption: string; publicIfAllowed: boolean; aiLabel: boolean }): Promise<string> {
    const info = await this.creatorInfo()
    const privacy = input.publicIfAllowed && info.privacy_level_options.includes('PUBLIC_TO_EVERYONE') ? 'PUBLIC_TO_EVERYONE' : 'SELF_ONLY'
    const size = input.bytes.byteLength
    const init = await this.call<{ publish_id: string; upload_url: string }>('/v2/post/publish/video/init/', {
      post_info: {
        title: input.caption.slice(0, 2200), privacy_level: privacy,
        disable_duet: false, disable_stitch: false, disable_comment: false,
        brand_content_toggle: false, brand_organic_toggle: true, is_aigc: input.aiLabel,
      },
      source_info: { source: 'FILE_UPLOAD', video_size: size, chunk_size: size, total_chunk_count: 1 },
    })
    const put = await this.fetchImpl(init.upload_url, {
      method: 'PUT',
      headers: { 'content-type': 'video/mp4', 'content-length': String(size), 'content-range': `bytes 0-${size - 1}/${size}` },
      body: Buffer.from(input.bytes),
    })
    if (!put.ok) throw new TikTokError(`TikTok upload failed: HTTP ${put.status}`)
    return init.publish_id
  }

  async publishStatus(publishId: string) {
    const d = await this.call<{ status: string; fail_reason?: string; publicaly_available_post_id?: Array<number | string> }>(
      '/v2/post/publish/status/fetch/', { publish_id: publishId })
    return { status: d.status, failReason: d.fail_reason ?? null, postId: d.publicaly_available_post_id?.[0] != null ? String(d.publicaly_available_post_id[0]) : null }
  }

  async videoStats(videoIds: string[]) {
    const d = await this.call<{ videos: Array<{ id: string; view_count?: number; like_count?: number; comment_count?: number; share_count?: number }> }>(
      '/v2/video/query/', { filters: { video_ids: videoIds } }, '?fields=id,view_count,like_count,comment_count,share_count')
    return d.videos ?? []
  }

  async followers(): Promise<number> {
    const res = await this.fetchImpl(`${API}/v2/user/info/?fields=follower_count`, { headers: { authorization: `Bearer ${this.accessToken}` } })
    const j = await res.json() as { data?: { user?: { follower_count?: number } } }
    return Number(j.data?.user?.follower_count ?? 0)
  }

  /** The profile as people see it, and the latest 12 videos, for the live phone on the overview. */
  async profile(): Promise<AccountLive> {
    const res = await this.fetchImpl(`${API}/v2/user/info/?fields=avatar_url,display_name,username,bio_description,follower_count,following_count,likes_count,video_count,profile_deep_link`,
      { headers: { authorization: `Bearer ${this.accessToken}` } })
    const u = ((await res.json()) as { data?: { user?: Record<string, unknown> } }).data?.user ?? {}
    let videos: Array<{ id: string; cover_image_url?: string; share_url?: string; view_count?: number; like_count?: number }> = []
    try { videos = (await this.call<{ videos: typeof videos }>('/v2/video/list/', { max_count: 12 }, '?fields=id,cover_image_url,share_url,view_count,like_count')).videos ?? [] } catch { /* needs the video.list scope */ }
    const num = (x: unknown) => (x == null ? null : Number(x))
    const username = String(u.username ?? '')
    return {
      username, name: String(u.display_name ?? ''), bio: String(u.bio_description ?? ''), avatar: (u.avatar_url as string) ?? null,
      followers: num(u.follower_count), following: num(u.following_count), posts: num(u.video_count), likes: num(u.likes_count),
      link: (u.profile_deep_link as string) ?? (username ? `https://www.tiktok.com/@${username}` : null),
      media: videos.map(v => ({ id: v.id, thumb: v.cover_image_url ?? null, link: v.share_url ?? null, views: v.view_count ?? null, likes: v.like_count ?? null })),
      at: new Date().toISOString(),
    }
  }
}
