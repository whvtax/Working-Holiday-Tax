// Instagram (Reels) and Meta Ads through the Graph API, with one long-lived
// token (a Business Manager system user token with instagram_basic,
// instagram_content_publish, instagram_manage_insights, pages_read_engagement,
// pages_show_list and ads_management). ELLA_META_ACCESS_TOKEN is set by Jo in
// Vercel and only read here, on the server.
//
// Reels: create a container from a public video link, wait until FINISHED,
// then publish. Ads: boost a published Reel as a click-to-WhatsApp ad; every
// object is created PAUSED, Meta enforces the lifetime budget and end date,
// and Ella's own checks stop it early (ads.ts).

export interface GraphFetch { (url: string, init?: RequestInit): Promise<Response> }

export class GraphError extends Error {
  constructor(message: string, public code?: number, public subcode?: number) { super(message) }
}

export class MetaGraph {
  constructor(private opts: { token?: string; version?: string; fetchImpl?: GraphFetch } = {}) {}

  private token() {
    const t = this.opts.token ?? process.env.ELLA_META_ACCESS_TOKEN
    if (!t) throw new Error('Missing ELLA_META_ACCESS_TOKEN')
    return t
  }
  private base() { return `https://graph.facebook.com/${this.opts.version ?? process.env.ELLA_META_API_VERSION ?? 'v24.0'}` }

  async get<T>(path: string, params: Record<string, string> = {}): Promise<T> {
    const q = new URLSearchParams({ ...params, access_token: this.token() })
    return this.parse<T>(await (this.opts.fetchImpl ?? fetch)(`${this.base()}/${path}?${q}`))
  }

  async post<T>(path: string, body: Record<string, unknown>): Promise<T> {
    const form = new URLSearchParams({ access_token: this.token() })
    for (const [k, v] of Object.entries(body)) if (v !== undefined) form.set(k, typeof v === 'string' ? v : JSON.stringify(v))
    return this.parse<T>(await (this.opts.fetchImpl ?? fetch)(`${this.base()}/${path}`, { method: 'POST', body: form }))
  }

  private async parse<T>(res: Response): Promise<T> {
    const text = await res.text()
    let j: { error?: { message?: string; code?: number; error_subcode?: number } } & Record<string, unknown> = {}
    try { j = text ? JSON.parse(text) : {} } catch { /* not JSON */ }
    if (!res.ok || j.error) throw new GraphError(`Meta: ${j.error?.message ?? `HTTP ${res.status}`}`, j.error?.code, j.error?.error_subcode)
    return j as T
  }
}

// ── Instagram Reels ────────────────────────────────────────────────────────
export type ContainerState = 'IN_PROGRESS' | 'FINISHED' | 'ERROR' | 'EXPIRED' | 'PUBLISHED'

export class InstagramPublisher {
  constructor(private g: MetaGraph, private igUserId: string) {}

  async createReel(input: { videoUrl: string; caption: string; trial: boolean; aiLabel: boolean }): Promise<string> {
    const body: Record<string, unknown> = {
      media_type: 'REELS', video_url: input.videoUrl, caption: input.caption, share_to_feed: 'true',
    }
    if (input.aiLabel) body.is_ai_generated = 'true'
    // Trial reels go to non-followers first; Instagram shares them to followers if they do well.
    if (input.trial) body.trial_params = { graduation_strategy: 'SS_PERFORMANCE' }
    const r = await this.g.post<{ id: string }>(`${this.igUserId}/media`, body)
    return r.id
  }

  async containerState(containerId: string): Promise<{ state: ContainerState; detail: string }> {
    const r = await this.g.get<{ status_code?: ContainerState; status?: string }>(containerId, { fields: 'status_code,status' })
    return { state: r.status_code ?? 'IN_PROGRESS', detail: r.status ?? '' }
  }

  async publish(containerId: string): Promise<{ mediaId: string; permalink: string | null }> {
    const r = await this.g.post<{ id: string }>(`${this.igUserId}/media_publish`, { creation_id: containerId })
    let permalink: string | null = null
    try { permalink = (await this.g.get<{ permalink?: string }>(r.id, { fields: 'permalink' })).permalink ?? null } catch { /* link is optional */ }
    return { mediaId: r.id, permalink }
  }

  /** Lifetime numbers for one Reel. If Meta rejects a newer metric, the core set is asked again. */
  async insights(mediaId: string): Promise<Record<string, number>> {
    const full = ['views', 'reach', 'likes', 'comments', 'shares', 'saved', 'ig_reels_avg_watch_time']
    const core = ['views', 'reach', 'likes', 'comments', 'shares', 'saved']
    const read = async (metrics: string[]) => {
      const r = await this.g.get<{ data: Array<{ name: string; values?: Array<{ value: number }>; total_value?: { value: number } }> }>(
        `${mediaId}/insights`, { metric: metrics.join(',') })
      const out: Record<string, number> = {}
      for (const d of r.data) out[d.name] = Number(d.values?.[0]?.value ?? d.total_value?.value ?? 0)
      return out
    }
    try { return await read(full) } catch (e) {
      if (e instanceof GraphError && e.code === 100) return read(core)
      throw e
    }
  }

  async followers(): Promise<number> {
    return Number((await this.g.get<{ followers_count?: number }>(this.igUserId, { fields: 'followers_count' })).followers_count ?? 0)
  }
}

// ── Paid promotion: boost a published Reel to WhatsApp chats ───────────────
export interface BoostInput {
  name: string
  adAccountId: string          // digits, without "act_"
  pageId: string
  igUserId: string
  mediaId: string
  whatsappNumber: string       // E.164, the SVT WhatsApp number
  totalCapAud: number          // Meta lifetime budget: a hard cap on Meta's side
  days: number
  specialAdCategory: 'NONE' | 'FINANCIAL_PRODUCTS_SERVICES'
  ageMin: number
  ageMax: number
  now?: Date
}

export class MetaAds {
  constructor(private g: MetaGraph) {}

  /** Creates campaign, ad set, creative and ad, all PAUSED. Returns their ids. */
  async createPausedBoost(b: BoostInput) {
    const act = `act_${b.adAccountId.replace(/^act_/, '')}`
    const special = b.specialAdCategory === 'NONE' ? [] : [b.specialAdCategory]
    const campaign = await this.g.post<{ id: string }>(`${act}/campaigns`, {
      name: `${b.name} | campaign`, objective: 'OUTCOME_ENGAGEMENT', status: 'PAUSED',
      special_ad_categories: special, ...(special.length ? { special_ad_category_country: ['AU'] } : {}),
    })
    const end = new Date((b.now ?? new Date()).getTime() + b.days * 86400000)
    // Special ad categories do not allow narrowing by age, so the range is only sent without one.
    const targeting: Record<string, unknown> = { geo_locations: { countries: ['AU'] }, targeting_automation: { advantage_audience: 1 } }
    if (!special.length) Object.assign(targeting, { age_min: b.ageMin, age_max: b.ageMax })
    const adset = await this.g.post<{ id: string }>(`${act}/adsets`, {
      name: `${b.name} | ad set`, campaign_id: campaign.id, status: 'PAUSED',
      lifetime_budget: String(Math.round(b.totalCapAud * 100)), end_time: end.toISOString(),
      billing_event: 'IMPRESSIONS', optimization_goal: 'CONVERSATIONS', bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
      destination_type: 'WHATSAPP', promoted_object: { page_id: b.pageId, whatsapp_phone_number: b.whatsappNumber },
      targeting,
    })
    const creative = await this.g.post<{ id: string }>(`${act}/adcreatives`, {
      name: `${b.name} | creative`, object_id: b.pageId, instagram_user_id: b.igUserId, source_instagram_media_id: b.mediaId,
      call_to_action: { type: 'WHATSAPP_MESSAGE', value: { app_destination: 'WHATSAPP' } },
    })
    const ad = await this.g.post<{ id: string }>(`${act}/ads`, {
      name: `${b.name} | ad`, adset_id: adset.id, creative: { creative_id: creative.id }, status: 'PAUSED',
    })
    return { campaignId: campaign.id, adsetId: adset.id, creativeId: creative.id, adId: ad.id }
  }

  async setStatus(ids: { campaignId: string; adsetId: string; adId: string }, status: 'ACTIVE' | 'PAUSED') {
    // Order matters: switch on from the top down, switch off from the top (one call stops everything).
    await this.g.post(ids.campaignId, { status })
    if (status === 'ACTIVE') { await this.g.post(ids.adsetId, { status }); await this.g.post(ids.adId, { status }) }
  }

  /** Spend (AUD), impressions and WhatsApp conversations started, lifetime. */
  async results(adId: string): Promise<{ spendAud: number; impressions: number; conversations: number }> {
    const r = await this.g.get<{ data: Array<{ spend?: string; impressions?: string; actions?: Array<{ action_type: string; value: string }> }> }>(
      `${adId}/insights`, { fields: 'spend,impressions,actions', date_preset: 'maximum' })
    const d = r.data[0] ?? {}
    const conv = (d.actions ?? []).find(a => a.action_type === 'onsite_conversion.messaging_conversation_started_7d')
    return { spendAud: Number(d.spend ?? 0), impressions: Number(d.impressions ?? 0), conversations: Number(conv?.value ?? 0) }
  }
}
