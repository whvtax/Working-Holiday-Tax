'use client'
// Ella (Social Media, SVT) in Atlas. Every figure comes from the server
// (lib/ella/view.ts); every button posts one action to /api/atlas/ella/action
// and reloads the data. Nothing here holds a key or a token.
import { EllaLog } from './EllaLog'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { EllaConfig } from '@/lib/ella/config'
import type { EllaPageData, EllaPageResult } from '@/lib/ella/view'
import type { ProductionDetail } from '@/lib/ella/store'
import type { GroupStat } from '@/lib/ella/learn'
import { finishCaption } from '@/lib/ella/script/captions'
import { BANNED } from '@/lib/ella/script/rules'
import { HistoryPanel, STEP_NAME, ScriptsBoard, Stepper, scriptSteps, stopRunner, useRunner, VideosBoard, type Job, type JobKind } from './EllaBoard'
import s from './ella.module.css'

type Tab = 'overview' | 'scripts' | 'videos' | 'ready' | 'posted' | 'insights' | 'promotion' | 'settings' | 'log'
/** The five stages of a video, in order, then the tools around them. */
const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'ready', label: 'Ready to post' },
  { id: 'posted', label: 'Posted' }, { id: 'insights', label: 'Learning' },
  { id: 'promotion', label: 'Promotion' }, { id: 'settings', label: 'Settings and setup' }, { id: 'log', label: 'Log' },
]
const OLD_TABS: Record<string, Tab> = { review: 'scripts', calendar: 'overview', videos: 'overview' }
const STATUS_TEXT: Record<string, string> = {
  drawn: 'Blog drawn', scripting: 'Writing script', script_ready: 'Script ready', needs_jo: 'Script needs you', approved: 'Script approved',
  producing: 'Making video', video_ready: 'Video ready for review', video_needs_jo: 'Video needs you', scheduled: 'Scheduled',
  published: 'Published', cancelled: 'Cancelled',
}

/** Every status between Start and Ready to post: one pipeline (Jo, Nov 22). */
const PIPELINE = ['drawn', 'scripting', 'script_ready', 'needs_jo', 'approved', 'producing', 'video_ready', 'video_needs_jo']
const fmtTime = (iso: string | null | undefined, tz: string) =>
  iso ? new Intl.DateTimeFormat('en-AU', { timeZone: tz, weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(iso)) : ''
const money = (n: number, cur: string) => `${cur === 'USD' ? 'US$' : 'A$'}${n.toFixed(2)}`
/** Spelled acronyms are for the voice; people read "ABN". */
const shown = (t: string | null) => (t ?? '').replace(/\b([A-Z])-([A-Z])(?:-([A-Z]))?\b/g, (_m, a: string, b: string, c?: string) => a + b + (c ?? ''))
/** The cover image saved next to a final video (final-N.mp4 -> cover-N.jpg). */
const coverOf = (videoPath: string) => videoPath.replace(/final-(\d+)\.mp4$/, 'cover-$1.jpg')
const mediaUrl = (path: string, download = false) => `/api/atlas/ella/media?path=${encodeURIComponent(path)}${download ? '&download=1' : ''}`

function useAction() {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState<{ text: string; err: boolean } | null>(null)
  const run = async (body: Record<string, unknown>, okText = 'Done') => {
    setBusy(true)
    try {
      const res = await fetch('/api/atlas/ella/action', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
      const j = await res.json().catch(() => ({
        ok: false,
        error: res.status === 504 || res.status === 502
          ? 'The server ran out of time. Wait a minute, refresh the page and check Review.'
          : `No readable answer from the server (HTTP ${res.status})`,
      })) as { ok: boolean; error?: string; detail?: { ran?: boolean; steps?: Array<{ step: string; ok: boolean; detail: string }> } }
      // Run now: say what Ella actually did, not just "done".
      const steps = j.detail?.steps ?? []
      const failed = steps.filter(x => !x.ok)
      const said = failed.length ? failed.map(x => `${x.step}: ${x.detail}`).join(' · ')
        : steps.filter(x => x.step === 'draw' || x.step === 'produce' || x.step === 'lock').map(x => x.detail).filter(Boolean).join(' · ')
      setToast({ text: j.ok ? (said ? `${okText}: ${said}` : okText) : `Attention: ${j.error ?? 'failed'}`, err: !j.ok || failed.length > 0 })
      if (j.ok) router.refresh()
      return j.ok
    } finally {
      setBusy(false)
      setTimeout(() => setToast(null), 12000)
    }
  }
  return { busy, toast, run, setToast }
}
type Run = ReturnType<typeof useAction>['run']

export default function EllaCentre({ data, initialTab, notice }: { data: EllaPageResult; initialTab: string; notice: string | null }) {
  const start0 = OLD_TABS[initialTab] ?? (TABS.some(t => t.id === initialTab) ? initialTab : 'overview')
  const [tab, setTab] = useState<Tab>(start0 as Tab)
  // Keep the chosen tab in the address, so a refresh or a re-render brings back the same tab.
  const choose = (t: Tab) => { setTab(t); if (typeof window !== 'undefined') window.history.replaceState(null, '', `?tab=${t}`) }
  const [bellOpen, setBellOpen] = useState(false)
  const { busy, toast, run, setToast } = useAction()
  const router = useRouter()
  const runner = useRunner(t => { setToast(t); setTimeout(() => setToast(null), 15000) })
  // While a run is going, the page re-reads the saved steps every few seconds, so each stage shows as soon as it is saved.
  useEffect(() => { if (!runner.job) return; const t = setInterval(() => router.refresh(), 4000); return () => clearInterval(t) }, [runner.job, router])
  // Always on: events from the scheduler (script ready, video ready, posted) reach the bell without a reload.
  useEffect(() => { const t = setInterval(() => router.refresh(), 20000); return () => clearInterval(t) }, [router])

  if (!data.ok) {
    return (
      <div className={s.frame}><main className={s.page}>
        <Header on={false} />
        <section className={s.card}>
          <div className={s.cardHead}><h2>Ella is not set up yet</h2></div>
          <p className={s.attn}>Attention: {data.error}</p>
          <EnvList env={data.env} />
        </section>
      </main></div>
    )
  }
  // Red = waiting for you. Grey = how many are in that stage (for information).
  const waitingScripts = data.reviews.filter(p => p.status === 'script_ready' || p.status === 'needs_jo').length
  const waitingVideos = data.reviews.filter(p => p.status === 'video_ready' || p.status === 'video_needs_jo').length
  const issueList = [...bellConnections(data.env).map(k => `Not connected: ${CONNECTION_NAMES[k]}`), ...data.dashboard.alerts.filter(a => a.kind !== 'library_empty').map(a => a.message)]
  const counts: Partial<Record<Tab, number>> = {
    scripts: data.board.scripts.length + data.reviews.filter(p => ['script_ready', 'needs_jo', 'approved'].includes(p.status)).length,
    videos: data.board.videos.length + waitingVideos,
    // One per video, as the Ready to post tab shows them (Jo, Nov 23).
    ready: new Set(data.posts.filter(p => ['scheduled', 'publishing'].includes(p.status)).map(p => p.productionId)).size,
    posted: data.posts.filter(p => p.status === 'published').length,
    promotion: data.ads.filter(a => a.status === 'proposed').length,
  }
  const alert: Partial<Record<Tab, boolean>> = { scripts: waitingScripts > 0, videos: waitingVideos > 0, promotion: data.ads.some(a => a.status === 'proposed') }
  const reviewScript = (p: ProductionDetail) => <ScriptReview p={p} run={run} busy={busy || !!runner.job} start={runner.start} auto={data.config.autoApproveVideo} />
  const reviewVideo = (p: ProductionDetail) => p.render ? <VideoReview p={p} d={data} run={run} busy={busy || !!runner.job} /> : <ScriptReview p={p} run={run} busy={busy || !!runner.job} start={runner.start} auto={data.config.autoApproveVideo} />
  return (
    <div className={s.frame}><main className={s.page}>
      <Header on={data.config.enabled} flip={() => (data.config.enabled || window.confirm('Switch to Automatic? Ella will draw blogs, write scripts and spend on HeyGen by herself.')) && run({ kind: 'save_config', config: { ...data.config, enabled: !data.config.enabled } }, data.config.enabled ? 'Manual: Ella waits for your buttons' : 'Automatic: Ella works by herself')} problems={issueList.length + (runner.error ? 1 : 0)} hint={[...issueList, ...(runner.error ? [runner.error] : [])].join('\n') || undefined} open={bellOpen} toggle={() => setBellOpen(!bellOpen)} />
      {notice && <p className={s.note}>{notice}</p>}
      <nav className={s.tabs} aria-label="Ella sections">
        {TABS.map(t => (
          <button key={t.id} type="button" className={`${s.tab} ${tab === t.id ? s.tabOn : ''}`} onClick={() => choose(t.id)} aria-current={tab === t.id ? 'page' : undefined}>
            {t.label}{(counts[t.id] ?? 0) > 0 && <span className={s.badge} style={alert[t.id] ? undefined : { background: '#E5E7EB', color: '#111827' }}>{counts[t.id]}</span>}
          </button>
        ))}
      </nav>
      {bellOpen && <ErrorBanner d={data} run={run} busy={busy} local={runner.error} clearLocal={runner.clearError} />}
      {tab === 'overview' && <>
        <Overview d={data} start={runner.start} job={runner.job} run={run} busy={busy} />
        <VideosBoard d={data} job={runner.job} start={runner.start} review={reviewVideo} />
      </>}
      {tab === 'ready' && <Calendar d={data} run={run} busy={busy} part="ready" />}
      {tab === 'scripts' && <ScriptsBoard d={data} job={runner.job} start={runner.start} review={reviewScript} run={run} busy={busy} />}
      {tab === 'posted' && <Calendar d={data} run={run} busy={busy} part="posted" />}
      {tab === 'promotion' && <Promotion d={data} run={run} busy={busy} />}
      {tab === 'insights' && <Insights d={data} />}
      {tab === 'log' && <EllaLog rows={data.log} />}
      {tab === 'settings' && <Settings d={data} run={run} busy={busy} />}
      {toast && <div role="status" className={`${s.toast} ${toast.err ? s.toastErr : ''}`}>{toast.text}</div>}
    </main></div>
  )
}

/** Every problem stays on top of every tab until Jo clears it: what failed and what to do. */
const PROBLEM_KINDS = new Set(['error', 'publish_failed', 'budget', 'setup', 'stuck'])
const clockOf = (ms: number) => { const t = Math.max(0, Math.floor(ms / 1000)); return t >= 3600 ? `${Math.floor(t / 3600)}:${String(Math.floor((t % 3600) / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}` : `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}` }
const CONNECTION_NAMES: Record<string, string> = { supabase: 'Supabase', anthropic: 'Claude', heygen: 'HeyGen', meta: 'Meta', tiktokApp: 'TikTok app', tokenKey: 'Token lock', cron: 'Scheduler' }
function missingConnections(env: Record<string, boolean>) { return Object.keys(CONNECTION_NAMES).filter(k => !env[k]) }
/** Connections that the bell reports: TikTok's app is expected to be missing until TikTok approves it, so it stays on the Connections card only. */
function bellConnections(env: Record<string, boolean>) { return missingConnections(env).filter(k => k !== 'tiktokApp') }
function connectionSummary(env: Record<string, boolean>) {
  const m = missingConnections(env)
  return m.length ? `Not connected: ${m.map(k => CONNECTION_NAMES[k]).join(', ')}.` : 'Everything is connected.'
}
function ErrorBanner({ d, run, busy, local, clearLocal }: { d: EllaPageData; run: Run; busy: boolean; local: string | null; clearLocal: () => void }) {
  // Everything the system reports: problems and events (started, created, posted). Jo clears each one; the library-empty stop has its own red box.
  const problems = d.dashboard.alerts.filter(a => a.kind !== 'library_empty')
  // The same failure arrives twice (the button's answer and the saved alert): show it once.
  const core = (t: string) => (t.match(/stopped: (.{20,120})/)?.[1] ?? t.slice(0, 120))
  const own = local
  if (own && problems.some(a => a.message.includes(core(own)))) local = null
  const missing = bellConnections(d.env)
  const count = problems.length + missing.length + (local ? 1 : 0)
  return (
    <section className={count ? s.problems : s.card} role={count ? 'alert' : undefined}>
      {count > 0 && (
        <>
          <strong>Notifications ({count})</strong>
          <ul>
            {local && <li><span>{local}</span><button type="button" className={s.btn} onClick={clearLocal}>Clear</button></li>}
            {missing.map(k => <li key={k}><span>Not connected: {CONNECTION_NAMES[k]}. Add its key in Vercel, then redeploy.</span></li>)}
            {problems.map(a => (
              <li key={a.id}><span>{a.kind === 'event' ? '• ' : '⚠ '}{a.createdAt.slice(11, 16)} · {a.message}</span>
                <button type="button" className={s.btn} disabled={busy} onClick={() => run({ kind: 'resolve_alert', alertId: a.id }, 'Cleared')}>Clear</button></li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}


function Header({ on, problems = 0, open = false, toggle, flip, hint }: { on: boolean; problems?: number; open?: boolean; toggle?: () => void; flip?: () => void; hint?: string }) {
  return (
    <header className={s.top}>
      <div className={s.title}>
        <span className={s.dot} />
        <h1>Social Media (SVT) · Ella</h1>
        {flip ? (
          <button type="button" role="switch" aria-checked={on} className={`${s.modeSwitch} ${on ? s.modeOn : ''}`} onClick={flip}
            title={on ? 'Ella writes scripts and makes videos by herself. Click for manual.' : 'Ella waits for your buttons. Click for automatic.'}>
            <span className={s.modeKnob} aria-hidden="true" />{on ? 'Automatic' : 'Manual'}
          </button>
        ) : <span className={`${s.state} ${on ? s.stateOn : ''}`}>{on ? 'Automatic' : 'Manual'}</span>}
      </div>
      <div className={s.row} style={{ gap: 14, alignItems: 'center' }}>
        {toggle && (
          <button type="button" className={`${s.bell} ${problems ? s.bellOn : ''}`} onClick={toggle} title={hint || 'Everything is working'} aria-expanded={open} aria-label={problems ? `${problems} problem${problems > 1 ? 's' : ''} to fix` : 'No problems'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
            {problems > 0 && <span className={s.bellCount}>{problems}</span>}
          </button>
        )}
        <a href="/atlas">Back to Atlas</a>
      </div>
    </header>
  )
}

// ── The two phones ───────────────────────────────────────────────────────
/** An iPhone showing the account as people see it: name, followers, posts, and the grid of posted videos. */
const viaUs = (u: string | null | undefined) => (u ? `/api/atlas/ella/media?image=${encodeURIComponent(u)}` : null)
const compact = (n: number | null | undefined) => (n == null ? '-' : n >= 10000 ? `${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}K` : n.toLocaleString('en-AU'))

/** An iPhone showing the account as people see it: picture, name, bio, numbers and the latest posts. */
function Phone({ d, platform }: { d: EllaPageData; platform: 'tiktok' | 'instagram' }) {
  const tt = platform === 'tiktok'
  const live = d.accounts?.[platform]
  const handle = live?.username || (d.config.handles?.[platform] ?? '').replace(/^@/, '')
  const ours = d.posts.filter(p => p.platform === platform && p.status === 'published').sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
  const tiles = live?.media?.length
    ? live.media.map(m => ({ id: m.id, img: viaUs(m.thumb), link: m.link, label: m.views != null ? `▶ ${compact(m.views)}` : m.likes != null ? `♥ ${compact(m.likes)}` : '' }))
    : ours.map(p => ({ id: p.id, img: p.videoPath ? mediaUrl(p.videoPath.replace(/final-(\d+)\.mp4$/, 'cover-$1.jpg')) : null, link: p.permalink, label: '' }))
  const profile = live?.link ?? (handle ? (tt ? `https://www.tiktok.com/@${handle}` : `https://www.instagram.com/${handle}/`) : null)
  const followers = live?.followers ?? d.followers[platform]
  if (!tt) return (
    <figure className={s.phoneWrap}>
      <div className={`${s.phone} ${s.phoneIg}`}>
        <div className={s.island} aria-hidden="true" />
        <div className={s.phoneScreen}>
          <div className={s.igZoom}>
            <div className={s.igStatus} aria-hidden="true"><span>9:41</span><span>▮▮▮ ▲ ▭</span></div>
            <div className={s.igNav}>
              {profile ? <a href={profile} target="_blank" rel="noreferrer" className={s.igUser}><span>{handle || 'instagram'}</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#000" strokeWidth="2.6" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></a> : <strong className={s.igUser}><span>{handle || 'instagram'}</span></strong>}
              <div className={s.igIcons} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"><path d="M12 3v18M3 12h18" /></svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
              </div>
            </div>
            <div className={s.igBody}>
              <div className={s.igProfile}>
                <div className={s.igRing}>{live?.avatar ? <img className={s.igAvatar} src={viaUs(live.avatar)!} alt="" /> : <div className={s.igAvatar}>SVT</div>}</div>
                <div className={s.igStats}>
                  <span><b>{compact(live?.posts ?? ours.length)}</b>posts</span>
                  <span><b>{compact(followers)}</b>followers</span>
                  <span><b>{compact(live?.following)}</b>following</span>
                </div>
              </div>
              <div className={s.igName}>{live?.name || 'Connected account'}</div>
              {live?.bio && <p className={s.igBio}>{live.bio}</p>}
              <div className={s.igBtns}><span>Edit profile</span><span>Share profile</span></div>
              <div className={s.igHighlights} aria-hidden="true"><span><i /></span></div>
              <div className={s.igTabs} aria-hidden="true">
                <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="3.5" width="7" height="7" /><rect x="13.5" y="3.5" width="7" height="7" /><rect x="3.5" y="13.5" width="7" height="7" /><rect x="13.5" y="13.5" width="7" height="7" /></svg></span>
                <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M10 8.5l5 3.5-5 3.5z" /></svg></span>
                <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></svg></span>
              </div>
              {tiles.length === 0 ? (
                <p className={s.igEmpty}><b>No posts yet</b></p>
              ) : (
                <div className={s.igGrid}>
                  {tiles.slice(0, 12).map(t => (
                    <a key={t.id} href={t.link ?? undefined} target="_blank" rel="noreferrer" className={s.igTile}>
                      {t.img ? <img src={t.img} alt="" loading="lazy" /> : null}
                    </a>))}
                </div>
              )}
            </div>
            <div className={s.igBottom} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinejoin="round"><path d="M3 11l9-7 9 7v9h-6v-6H9v6H3z" /></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M10 8.5l5 3.5-5 3.5z" /></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinejoin="round"><path d="M5 8h14l-1 13H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
              <span className={s.igMe} />
            </div>
          </div>
        </div>
      </div>
      <figcaption className={s.note}>{live ? `Live · read ${fmtTime(live.at, d.config.timezone)}` : 'Shows live once Instagram is connected in Settings.'}</figcaption>
    </figure>
  )
  return (
    <figure className={s.phoneWrap}>
      <div className={`${s.phone} ${tt ? s.phoneDark : ''}`}>
        <div className={s.island} aria-hidden="true" />
        <div className={s.phoneScreen}>
          <div className={s.phoneTop}><strong>{handle ? (tt ? `@${handle}` : handle) : (tt ? 'TikTok' : 'Instagram')}</strong>{profile && <a href={profile} target="_blank" rel="noreferrer">Open</a>}</div>
          <div className={s.phoneProfile}>
            {live?.avatar ? <img className={s.avatarImg} src={viaUs(live.avatar)!} alt="" /> : <div className={s.avatar} aria-hidden="true">SVT</div>}
            {live?.name && <strong>{live.name}</strong>}
            <div className={s.phoneStats}>
              <span><b>{compact(live?.posts ?? ours.length)}</b>{tt ? 'Videos' : 'Posts'}</span>
              <span><b>{compact(followers)}</b>Followers</span>
              <span><b>{compact(tt ? live?.likes : live?.following)}</b>{tt ? 'Likes' : 'Following'}</span>
            </div>
            {live?.bio && <p className={s.phoneBio}>{live.bio}</p>}
          </div>
          <div className={s.phoneGrid}>
            {tiles.length === 0 ? <p className={s.phoneEmpty}>No videos posted yet.</p> : tiles.slice(0, 12).map(t => (
              <a key={t.id} href={t.link ?? undefined} target="_blank" rel="noreferrer" className={s.phoneTile}>
                {t.img ? <img src={t.img} alt="" loading="lazy" /> : null}
                {t.label && <span className={s.phoneTileLabel}>{t.label}</span>}
              </a>))}
          </div>
        </div>
      </div>
      <figcaption className={s.note}>{live ? `Live · read ${fmtTime(live.at, d.config.timezone)}` : `Shows live once ${tt ? 'TikTok' : 'Instagram'} is connected in Settings.`}</figcaption>
    </figure>
  )
}

// ── Overview ──────────────────────────────────────────────────────────────
/** Ella's own milestones in plain words; Jo's clicks and the background runs are left out. */

function Overview({ d, start, job, run, busy }: { d: EllaPageData; start: (kind: JobKind) => unknown; job: Job | null; run: Run; busy: boolean }) {
  const running = !!job
  // The timer stays on screen while anything is still being made (script or video), even if the browser's loop has stopped (Jo, Nov 22).
  const working = running || d.dashboard.queue.some(q => (PIPELINE as string[]).includes(q.status))
  const starts = [...d.board.scripts.map(x => Date.parse(x.startedAt)), ...d.board.videos.flatMap(v => v.steps.map(x => (x.startedAt ? Date.parse(x.startedAt) : NaN)))].filter(n => Number.isFinite(n))
  const sinceMs: number | null = starts.length ? Math.min(...starts) : (job?.start ?? null)
  const outOfBlogs = d.dashboard.library.total - d.dashboard.library.used <= 0
  // Jo, Nov 22: while a script or video is already in the pipeline, Start is grey and cannot be clicked.
  // Jo, Nov 22: the pipeline is one unit from Start until the video is in Ready to post; Stop cancels what it can.
  const inPipeline = running || d.dashboard.queue.some(q => (PIPELINE as string[]).includes(q.status))
  const waitingVideos = d.reviews.filter(p => p.status === 'video_ready' || p.status === 'video_needs_jo')
  const startOver = async () => {
    await run({ kind: 'start_over_blogs' }, 'All blogs are back in the draw')
    void start('write_script')
  }
  // A clock from the press of Start: how long Ella has been working.
  const [now, setNow] = useState(() => Date.now())
  // Jo, Nov 22: the clock ticks every second while anything is being made, not only while this browser's loop runs.
  useEffect(() => { if (!working) return; const first = setTimeout(() => setNow(Date.now()), 0); const t = setInterval(() => setNow(Date.now()), 1000); return () => { clearTimeout(first); clearInterval(t) } }, [working])
  const published30 = d.posts.filter(p => p.status === 'published' && p.publishedAt && Date.parse(d.now) - Date.parse(p.publishedAt) < 30 * 86400000)
  // Views of the posts published in the last 30 days, per platform (latest number the platform gave us).
  const since30 = Date.parse(d.now) - 30 * 86400000
  const viewsOf = (pf: 'instagram' | 'tiktok') => d.performance.filter(r => r.platform === pf && Date.parse(r.publishedAt) >= since30)
  const sumViews = (rows: typeof d.performance) => rows.reduce((a, r) => a + (r.views ?? 0), 0)
  const noViews = d.performance.every(r => r.views == null)
  return (
    <>
      {outOfBlogs && (
        <section id="ella-out-of-blogs" className={s.alarm} role="alert">
          <h2>You used all the blogs</h2>
          <p>Start over? Every blog goes back into the draw, and Ella starts the next script straight away. Nothing else changes.</p>
          <div className={s.row}><button type="button" className={`${s.btn} ${s.btnMain}`} disabled={running || busy} onClick={() => { void startOver() }}>Yes, start over</button></div>
        </section>
      )}

      <section className={s.card}>
        <div className={s.cardHead}>
          <div><h2>Start Ella</h2><p>One button: Ella writes the next script, checks it, and makes the video. A video that passes every check goes to Ready to post.</p></div>
          <div className={s.row} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'nowrap', gap: 10 }}>{working && sinceMs !== null && <span className={s.note} style={{ whiteSpace: 'nowrap' }}>{clockOf(now - sinceMs)} since Start</span>}<button type="button" className={`${s.btn} ${s.btnMain} ${inPipeline ? s.btnLocked : ''}`} disabled={inPipeline} aria-disabled={inPipeline} title={inPipeline ? 'A video is already in the pipeline. Start opens again when it is done or stopped.' : undefined} onClick={() => { if (outOfBlogs) { document.getElementById('ella-out-of-blogs')?.scrollIntoView({ block: 'center' }); return } void start('write_script') }}>Start</button></div>
        </div>
        {d.board.scripts.map(x => (
          <div key={x.id} className={s.stageCard} style={{ marginTop: 12 }}>
            <div className={s.runProgHead}><strong>{job && <span className={s.spinner} aria-hidden="true" />}{x.title}</strong><span>{x.pct}%</span></div>
            {/* The script stages, then one point for everything HeyGen makes (Jo, Nov 22). */}
            <Stepper steps={[...scriptSteps(x), { label: 'HeyGen', status: 'waiting' as const }]} />
            <div className={s.row} style={{ marginTop: 10 }}>
              <button type="button" className={`${s.btn} ${s.btnDanger}`} disabled={busy} onClick={() => { stopRunner(); run({ kind: 'cancel', productionId: x.id }, 'Stopped. Everything in progress is cancelled; the blogs go back into the draw') }}>Cancel</button>
            </div>
          </div>
        ))}
        {/* After the script: the same card goes on through HeyGen, render and the check, until the video is in Ready to post (Jo, Nov 22). */}
        {d.board.videos.map(v => (
          <div key={v.id} className={s.stageCard} style={{ marginTop: 12 }}>
            <div className={s.runProgHead}><strong>{job && <span className={s.spinner} aria-hidden="true" />}{v.title}</strong><span>{v.pct}%</span></div>
            <Stepper steps={[...scriptSteps(v.studio ?? { phase: 'done', log: [] }), ...v.steps]} />
            <div className={s.row} style={{ marginTop: 10 }}>
              <button type="button" className={`${s.btn} ${s.btnDanger}`} disabled={busy} onClick={() => window.confirm(`Cancel this video? US$${v.spentUsd.toFixed(2)} already spent is not refunded.`) && (stopRunner(), run({ kind: 'cancel', productionId: v.id }, 'Stopped'))}>Cancel</button>
            </div>
          </div>
        ))}
        {waitingVideos.map(p => (
          <div key={p.id} className={s.stageCard} style={{ marginTop: 12 }}>
            <div className={s.runProgHead}><strong>{p.title ?? p.slug}</strong><span>99%</span></div>
            <Stepper steps={[...scriptSteps({ phase: 'done', log: [] }), { label: 'HeyGen', status: 'done' }, { label: 'Render the video', status: 'done' }, { label: 'Quality check', status: p.status === 'video_needs_jo' ? 'failed' : 'done' }, { label: 'Ready to post', status: 'waiting' }]} />
            <p className={s.attn} style={{ marginTop: 8 }}>{p.status === 'video_needs_jo' ? 'The quality check found a problem. Watch it in Videos, then send it on or cancel it.' : 'The video is finished but did not move to Ready to post.'}</p>
            <div className={s.row} style={{ marginTop: 6 }}>
              <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy || !p.render} onClick={() => run({ kind: 'approve_video', productionId: p.id }, 'In Ready to post')}>Send to Ready to post</button>
              <button type="button" className={`${s.btn} ${s.btnDanger}`} disabled={busy} onClick={() => window.confirm(`Cancel this video? US$${p.spentUsd.toFixed(2)} already spent is not refunded.`) && run({ kind: 'cancel', productionId: p.id }, 'Stopped')}>Cancel</button>
            </div>
          </div>
        ))}
      </section>

      <section className={s.card}>
        <div className={s.tiles}>
          {(['instagram', 'tiktok'] as const).map(pf => {
            const n = d.followers[pf]
            return (
              <div key={pf} className={s.tile}><span className={s.tileKey}>{pf === 'instagram' ? 'Instagram followers' : 'TikTok followers'}</span>
                <span className={s.tileValue}>{n == null ? '-' : n.toLocaleString('en-AU')}</span>
                </div>
            )
          })}
          <div className={s.tile}><span className={s.tileKey}>Posts, last 30 days</span><span className={s.tileValue}>{published30.length}</span></div>
          {(['instagram', 'tiktok'] as const).map(pf => {
            const rows = viewsOf(pf), total = sumViews(rows), reported = rows.filter(r => r.views != null).length
            return (
              <div key={pf} className={s.tile}><span className={s.tileKey}>{`views last 30 days (${pf === 'instagram' ? 'IG' : 'TikTok'})`}</span><span className={s.tileValue}>{noViews ? '-' : total.toLocaleString('en-AU')}</span>{!noViews && <span className={s.tileSub}>{`${reported} of ${rows.length} posts reported`}</span>}</div>
            )
          })}
          <div className={s.tile}><span className={s.tileKey}>Video spend this month</span><span className={s.tileValue}>{money(d.money.videoUsdMonth, 'USD')}</span>
          </div>
        </div>
      </section>

      <section className={s.card}>
        <div className={s.cardHead}><h2>Live on the accounts</h2><p>What people see now: every posted video, newest first.</p></div>
        <div className={s.phones}>
          <Phone d={d} platform="tiktok" />
          <Phone d={d} platform="instagram" />
        </div>
      </section>


    </>
  )
}

// ── Review cards (used by stages 1 and 2) ─────────────────────────────────
interface QaIssue { second: number | null; scene: number | null; check: string; problem: string; severity: 'block' | 'warn' }
interface SceneLite { scene: number; start: number; end: number; voice: string; emphasis: string; onScreen: string; visual: string; ellaInFrame: boolean; claimRef: string; shotPrompt?: string; shot?: 'ella' | 'graphic' | 'clip'; graphic?: { type: string; title: string; lines: string[] } }
const SHOT_TEXT = { ella: 'Ella', graphic: 'Card', clip: 'AI clip' } as const
const shotLite = (sc: SceneLite) => sc.shot ?? (sc.ellaInFrame ? 'ella' : 'clip')

/** Live caption check while Jo edits: what will be posted, and anything that breaks a rule. */
/** The caption as it shows on the app, always fully open. It is the only caption box: Jo edits it in place. */
function CaptionBox({ value, onChange, handle }: { value: string; onChange: (v: string) => void; handle: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const full = finishCaption(value)
  // Only write the text in from outside while the box is not being typed in, so the cursor does not jump.
  useEffect(() => { if (ref.current && document.activeElement !== ref.current && ref.current.innerText !== full) ref.current.innerText = full }, [full])
  return (
    <div className={s.capPreview}>
      <span className={s.label}>Caption as it shows on the app (edit it here)</span>
      <div className={s.capPhone}>
        <p><b>{handle}</b></p>
        <div ref={ref} contentEditable suppressContentEditableWarning style={{ whiteSpace: 'pre-wrap', outline: 'none' }}
          onInput={e => onChange(e.currentTarget.innerText)} />
      </div>
    </div>
  )
}

function CaptionLint({ text }: { text: string }) {
  const out = finishCaption(text)
  const hits = BANNED.filter(b => b.re.test(text.replace(/General information only, not tax advice\./g, ''))).map(b => b.why)
  const tags = (text.match(/#[A-Za-z0-9_]+/g) ?? []).length
  const notes = [...new Set(hits)].map(h => `Attention: ${h}`)
  if (tags > 4) notes.push(`${tags} hashtags: only the first 4 approved ones are kept`)
  if (out.length > 2200) notes.push(`Too long for Instagram (${out.length} of 2,200 characters)`)
  return notes.length ? <ul className={s.problems}>{notes.map(n => <li key={n} className={n.startsWith('Attention') ? s.attn : undefined}>{n}</li>)}</ul> : <p className={s.note}>Caption check passed. The “not tax advice” line is added automatically.</p>
}
interface StudioLite {
  research?: { facts: Array<{ id: string; fact: string; softened: string; hedge: string; source: string; kind: string }>; ideas: Array<{ idea: string; surprise: number; stakes: number; clarity: number; safety: number }>; chosen: { idea: string; why: string } }
  review?: { scores: Record<string, number>; notes: Array<{ scene: number; dimension: string; problem: string; fix: string }>; verdict: string }
  log?: Array<{ phase: string; seconds: number; ok: boolean; note: string }>
  drafts?: number
  panel?: { notes: Array<{ expert: string; scene: number; note: string }>; summary: string; director?: string }
  advocate?: { risks: Array<{ where: string; risk: string; why: string }>; summary: string }
  judgeTake?: { from: 'A' | 'B'; items: string[] }
  captionNotes?: { candidates: string[]; keywords: string[]; why: string }
}
interface DraftLite {
  scenes: SceneLite[]; captions: { instagram: string; tiktok: string }; hookType: string; ctaType: string; coreMessage: string
  keyTerm?: string; audienceSlice?: string; claims?: Array<{ id: string; text: string; source: string }>; studio?: StudioLite
}
const DIM_TEXT: Record<string, string> = { hook: 'Hook', promise: 'Payoff keeps the promise', clarity: 'Clarity (ESL)', sendable: 'Would a student send it', cta: 'Call to action', flow: 'Natural flow', accuracy: 'Accuracy', visuals: 'Visuals', compliance: 'Compliance' }
/** Display only: the first five words of a line in the summary card. The script itself is not changed. */
const five = (t: string | undefined) => { const w = String(t ?? '').split(/\s+/).filter(Boolean); return w.length > 5 ? `${w.slice(0, 5).join(' ')}…` : w.join(' ') }

function VideoReview({ p, d, run, busy }: { p: ProductionDetail; d: EllaPageData; run: Run; busy: boolean }) {
  const draft = p.script?.script as DraftLite
  const qa = (p.render?.qa ?? []) as QaIssue[]
  const [cap, setCap] = useState(draft.captions.instagram)
  const blocks = qa.filter(q => q.severity === 'block')
  const cancellable = !['published', 'cancelled'].includes(p.status)
  return (
    <section className={s.card}>
      <div className={s.cardHead}><h2>{p.title ?? p.slug}</h2>
        <span className={`${s.pill} ${blocks.length ? s.pillAttn : s.pillGood}`}>{blocks.length ? 'Claude found a problem' : 'Edited and checked by Claude'}</span></div>
      <div className={s.review}>
        <div>
          <video className={`${s.video} ${s.videoBig}`} src={mediaUrl(p.render!.videoPath)} controls playsInline preload="metadata" />
          <p className={s.note}>{p.render!.durationSec}s · cost {money(p.spentUsd, 'USD')}</p>
          <a className={s.btn} href={mediaUrl(p.render!.videoPath, true)} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Download video</a>
        </div>
        <div>
          <CaptionLint text={cap} />
          <CaptionBox value={cap} onChange={setCap} handle={d.config.handles?.instagram || d.accounts?.instagram?.username || 'your account'} />
          <div className={s.row} style={{ marginTop: 12 }}>
            <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy}
              onClick={() => run({ kind: 'approve_video', productionId: p.id, captions: { instagram: cap, tiktok: cap } }, 'Approved: it is in Ready to post')}>Approve</button>
            {cancellable
              ? <button type="button" className={`${s.btn} ${s.btnDanger}`} disabled={busy} onClick={() => window.confirm(`Cancel this video? Everything in progress stops. US$${p.spentUsd.toFixed(2)} already spent is not refunded. The blog goes back into the draw.`) && (stopRunner(), run({ kind: 'cancel', productionId: p.id }, 'Stopped'))}>Cancel video</button>
              : <span className={s.note}>This video is {p.status === 'published' ? 'already published' : 'already cancelled'}, so it cannot be cancelled.</span>}
          </div>
          <p className={s.note}>Approved videos go to “3 · Ready to post” for the next free slot ({fmtTime(d.nextSlots[0], d.config.timezone)} or later).</p>

          <HistoryPanel title={p.title ?? p.slug} slug={p.slug} steps={d.history[p.id] ?? []} />

        </div>
      </div>
    </section>
  )
}

function ScriptReview({ p, run, busy, start, auto }: { p: ProductionDetail; run: Run; busy: boolean; start: (k: JobKind, id?: string) => void; auto: boolean }) {
  const draft = p.script?.script as DraftLite | undefined
  const allIssues = (p.script?.issues ?? []) as Array<{ code: string; message: string; scene?: number; severity?: 'warn' }>
  const issues = allIssues.filter(i => i.severity !== 'warn')
  const tips = allIssues.filter(i => i.severity === 'warn')
  const st = draft?.studio
  const total = draft?.scenes.length ? draft.scenes[draft.scenes.length - 1].end : 0
  return (
    <section className={s.card}>
      <div className={s.cardHead}><h2>{p.title ?? p.slug}</h2>
        <span className={`${s.pill} ${p.status === 'needs_jo' ? s.pillAttn : p.status === 'script_ready' ? s.pillGood : ''}`}>{p.status === 'needs_jo' ? 'Could not be fixed' : STATUS_TEXT[p.status]}</span></div>

      {draft && (
        <div className={s.facts}>
          <div><span className={s.tileKey}>Hook</span><span><strong>{five(draft.scenes[0]?.voice)}</strong></span></div>
          <div><span className={s.tileKey}>Message</span><span>{five(draft.coreMessage)}</span></div>
          <div><span className={s.tileKey}>Length</span><span>about {Math.round(total)} s · {draft.scenes.length} scenes</span></div>
          <div><span className={s.tileKey}>Ends with</span><span>{five(draft.scenes[draft.scenes.length - 1]?.voice)}</span></div>
        </div>
      )}

      {draft && (
        <table className={s.table} style={{ marginTop: 12 }}>
          <thead><tr><th>#</th><th>Time</th><th>Shot</th><th>Ella says</th><th>On screen</th></tr></thead>
          <tbody>{draft.scenes.map(sc => (
            <tr key={sc.scene}><td>{sc.scene}</td><td style={{ whiteSpace: 'nowrap' }}>{sc.start?.toFixed?.(1)}-{sc.end?.toFixed?.(1)}s</td><td><span className={s.pill}>{SHOT_TEXT[shotLite(sc)]}</span></td><td>{sc.voice}</td><td>{shotLite(sc) === 'graphic' ? `Card: ${sc.graphic?.title ?? sc.onScreen}` : sc.onScreen}</td></tr>))}</tbody>
        </table>
      )}
      {p.status === 'needs_jo' && <p className={s.attn} style={{ marginTop: 10 }}>Claude could not make this script pass every check after 4 fixes. Cancel it; the blog goes back into the draw.</p>}

      <details className={s.more}><summary>Behind the scenes: exactly what HeyGen receives</summary>
        {st?.panel && (
          <div style={{ marginBottom: 12 }}>
            <span className={s.label}>Visual panel (5 experts): cinematographer, growth marketer, viewer psychologist, AI prompt engineer, compliance reviewer</span>
            <p className={s.note} style={{ marginTop: 4 }}>{st.panel.summary}{st.panel.director ? ` · Director: ${st.panel.director}` : ''}</p>
            <table className={s.table}><thead><tr><th>#</th><th>Expert</th><th>Note</th></tr></thead><tbody>
              {st.panel.notes.map((n, i) => <tr key={i}><td>{n.scene || ''}</td><td>{n.expert}</td><td>{n.note}</td></tr>)}
            </tbody></table>
          </div>
        )}
        {st?.captionNotes && (
          <p className={s.note} style={{ marginBottom: 12 }}>Keyword research: {st.captionNotes.keywords.join(', ')}. {st.captionNotes.why}</p>
        )}
        {st?.judgeTake && st.judgeTake.items.length > 0 && (
          <p className={s.note} style={{ marginBottom: 12 }}>The judge took ideas from draft {st.judgeTake.from === 'A' ? 'B' : 'A'}: {st.judgeTake.items.join(' · ')}</p>
        )}
        {st?.advocate && (
          <div style={{ marginBottom: 12 }}>
            <span className={s.label}>Devil&apos;s advocate (notes only, for the learning tab): {st.advocate.summary}</span>
            <table className={s.table}><thead><tr><th>Where</th><th>Risk</th><th>Why</th></tr></thead><tbody>
              {st.advocate.risks.map((r, i) => <tr key={i}><td>{r.where}</td><td>{r.risk}</td><td>{r.why}</td></tr>)}
            </tbody></table>
          </div>
        )}
        {draft && (
          <table className={s.table}>
            <thead><tr><th>#</th><th>Stress</th><th>Picture</th><th>Full instruction to the video model</th><th>Fact</th></tr></thead>
            <tbody>{draft.scenes.map(sc => (
              <tr key={sc.scene}><td>{sc.scene}</td><td>{sc.emphasis}</td><td>{shotLite(sc) === 'ella' ? 'Ella talking' : shotLite(sc) === 'graphic' ? `Card: ${sc.graphic?.title ?? ''}${sc.graphic?.lines?.length ? ` · ${sc.graphic.lines.join(' · ')}` : ''}` : sc.visual}</td>
                <td style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>{shotLite(sc) === 'graphic' ? 'Drawn by code' : sc.shotPrompt ?? ''}</td><td>{sc.claimRef === 'none' ? '' : sc.claimRef}</td></tr>))}</tbody>
          </table>
        )}
        {st?.review && (
          <table className={s.table} style={{ marginTop: 12 }}>
            <thead><tr><th style={{ width: 170 }}>Judge</th><th style={{ width: 70 }}>Score</th><th>Note</th></tr></thead>
            <tbody>{Object.entries(st.review.scores).map(([k, v]) => {
              const note = st.review!.notes.find(n => n.dimension === k)
              return <tr key={k}><td>{DIM_TEXT[k] ?? k}</td><td>{v}/5</td><td>{note ? `${note.scene ? `Scene ${note.scene}: ` : ''}${note.problem} ${note.fix}` : '-'}</td></tr>
            })}</tbody>
          </table>
        )}
        {issues.length > 0 && <ul className={s.qa}>{issues.map((i, k) => <li key={k}><span className={s.sec}>{i.scene ? `S${i.scene}` : ''}</span><span className={s.attn}>{i.message}</span></li>)}</ul>}
        {tips.length > 0 && <ul className={s.qa}>{tips.map((i, k) => <li key={k}><span className={s.sec}>{i.scene ? `S${i.scene}` : ''}</span><span>{i.message}</span></li>)}</ul>}
        {st?.log && st.log.length > 0 && (
          <table className={s.table} style={{ marginTop: 12 }}><thead><tr><th>Stage</th><th>Result</th><th>Time</th></tr></thead><tbody>
            {st.log.map((l, i) => <tr key={i}><td>{l.phase}</td><td>{l.note}</td><td>{l.seconds}s</td></tr>)}
          </tbody></table>
        )}
      </details>

      <div className={s.row} style={{ marginTop: 14 }}>
        {p.status === 'script_ready' && !auto && <>
          <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy} onClick={() => start('make_video', p.id)}>Send to HeyGen</button>
          <button type="button" className={s.btn} disabled={busy} onClick={() => run({ kind: 'approve_script', productionId: p.id }, 'Script approved. Send it to HeyGen when you are ready.')}>Approve, send later</button>
        </>}
        {p.status === 'video_needs_jo' && !p.render && <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy} onClick={() => run({ kind: 'retry_video', productionId: p.id }, 'Ready to try again')}>Make the video again</button>}
        <button type="button" className={`${s.btn} ${s.btnDanger}`} disabled={busy} onClick={() => { stopRunner(); run({ kind: 'cancel', productionId: p.id }, 'Stopped. Everything in progress is cancelled; the blogs go back into the draw') }}>Cancel</button>
      </div>
    </section>
  )
}

// ── Calendar ──────────────────────────────────────────────────────────────

function Calendar({ d, run, busy, part }: { d: EllaPageData; run: Run; busy: boolean; part: 'ready' | 'posted' }) {
  const tz = d.config.timezone
  // Jo, Nov 23: one row per video: the video, its one caption with hashtags, and three buttons. Nothing else.
  const [when, setWhen] = useState<Record<string, string>>({})
  const waiting = d.posts.filter(p => ['scheduled', 'publishing', 'manual_ready'].includes(p.status))
  const videos = [...new Set(waiting.filter(p => p.status !== 'manual_ready').map(p => p.productionId))]
    .map(id => ({ id, posts: waiting.filter(p => p.productionId === id) }))
    .map(v => ({ ...v, first: [...v.posts].sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))[0] }))
    .sort((a, b) => a.first.scheduledAt.localeCompare(b.first.scheduledAt))
  const publishNow = async (posts: typeof waiting) => {
    if (!window.confirm('Post now? This goes live straight away.')) return
    for (const p of posts.filter(x => x.status === 'scheduled')) if (!(await run({ kind: 'publish_now', postId: p.id }, 'Posting on the next run (within 5 minutes)'))) break
  }
  const localInput = (iso: string) => { const x = new Date(iso); return new Date(x.getTime() - x.getTimezoneOffset() * 60_000).toISOString().slice(0, 16) }
  const done = d.posts.filter(p => ['published', 'failed'].includes(p.status)).sort((a, b) => (b.publishedAt ?? b.scheduledAt).localeCompare(a.publishedAt ?? a.scheduledAt))
  if (part === 'posted') return (
    <section className={s.card}>
      <div className={s.cardHead}><div><h2>Posted</h2><p>Every posted video with its caption and hashtags exactly as they went out. Numbers come in under Stage 5.</p></div></div>
      {done.length === 0 ? <p className={s.empty}>No posts yet.</p> : (
        <div className={s.libGrid}>
          {done.map(p => (
            <div key={p.id} className={s.libCard}>
              {p.videoPath && <video className={s.vidThumb} src={mediaUrl(p.videoPath)} controls playsInline preload="none" poster={mediaUrl(p.videoPath.replace(/final-(\d+)\.mp4$/, 'cover-$1.jpg'))} />}
              <span className={s.libTop} style={{ marginTop: 8 }}><span className={`${s.pill} ${p.status === 'failed' ? s.pillWarn : s.pillOk}`}>{p.platform === 'tiktok' ? 'TikTok' : 'Instagram'}{p.status === 'failed' ? ' · failed' : p.status === 'cancelled' ? ' · cancelled' : ''}</span><span className={s.itemSub}>{fmtTime(p.publishedAt ?? p.scheduledAt, tz)}</span></span>
              <span className={s.libHook} style={{ fontSize: 15, marginTop: 6 }}>{p.permalink ? <a href={p.permalink} target="_blank" rel="noreferrer">{p.title ?? p.slug}</a> : (p.title ?? p.slug)}</span>
              <pre className={s.copy}>{p.caption}</pre>
              {p.status === 'failed' && <p className={s.attn}>{p.error}</p>}
            </div>))}
        </div>
      )}
    </section>
  )
  return (
    <>
      <section className={s.card}>
        <div className={s.cardHead}><div><h2>Ready to post</h2><p>Each video with its caption and hashtags. It goes out at its time, or now.</p></div></div>
        {videos.length === 0 ? <p className={s.empty}>Nothing waiting.</p> : (
          <ul className={s.list}>{videos.map(({ id, posts, first }) => {
            const p = first
            const sending = posts.some(x => x.status === 'publishing')
            return (
              <li key={id} className={s.item} style={{ alignItems: 'flex-start' }}>
                {p.videoPath && (
                  // Jo, Nov 23: the video and its cover side by side, each named.
                  <div className={`${s.row} ${s.vidSide}`} style={{ alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                    <figure style={{ margin: 0 }}><video className={s.vidThumb} src={mediaUrl(p.videoPath)} controls playsInline preload="none" poster={mediaUrl(coverOf(p.videoPath))} /><figcaption className={s.itemSub} style={{ textAlign: 'center' }}>Video</figcaption></figure>
                    <figure style={{ margin: 0 }}><img className={s.vidThumb} src={mediaUrl(coverOf(p.videoPath))} alt={`Cover: ${p.title ?? p.slug}`} /><figcaption className={s.itemSub} style={{ textAlign: 'center' }}>Cover</figcaption></figure>
                  </div>
                )}
                <div className={s.itemMain} style={{ flex: 1 }}>
                  <span className={s.itemTitle}>{p.title ?? p.slug}</span>
                  <span className={s.itemSub}>{sending ? 'Posting now' : `Goes out ${fmtTime(p.scheduledAt, tz)}`}{posts.find(x => x.error) ? ` · Attention: ${posts.find(x => x.error)!.error}` : ''}</span>
                  <pre className={s.copy} style={{ marginTop: 6 }}>{p.caption}</pre>
                  <div className={s.row} style={{ marginTop: 10 }}>
                    {p.videoPath && <a className={s.btn} href={mediaUrl(p.videoPath, true)} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Download</a>}
                    <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy || sending} onClick={() => { void publishNow(posts) }}>Publish now</button>
                    <button type="button" className={s.btn} disabled={busy || sending} onClick={() => setWhen({ ...when, [id]: when[id] ?? localInput(p.scheduledAt) })}>Schedule</button>
                    <button type="button" className={`${s.btn} ${s.btnDanger}`} disabled={busy || sending} onClick={() => window.confirm('Cancel this video? It is removed from Ready to post, will not be posted, and the blog goes back into the draw.') && run({ kind: 'discard_video', productionId: id }, 'Video cancelled; the blog is back in the draw')}>Cancel</button>
                  </div>
                  {when[id] !== undefined && (
                    <div className={s.row} style={{ marginTop: 8 }}>
                      <input className={s.input} type="datetime-local" value={when[id]} onChange={e => setWhen({ ...when, [id]: e.target.value })} />
                      <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy || !when[id]} onClick={() => { void run({ kind: 'reschedule_video', productionId: id, at: new Date(when[id]).toISOString() }, 'Time saved').then(ok => { if (ok) { const n = { ...when }; delete n[id]; setWhen(n) } }) }}>Save time</button>
                    </div>
                  )}
                </div>
              </li>
            )
          })}</ul>
        )}
      </section>
    </>
  )
}

// ── Promotion ─────────────────────────────────────────────────────────────
function Promotion({ d, run, busy }: { d: EllaPageData; run: Run; busy: boolean }) {
  const a = d.config.ads
  const proposed = d.ads.filter(x => x.status === 'proposed')
  const live = d.ads.filter(x => ['creating', 'ready_paused', 'active', 'paused'].includes(x.status))
  const past = d.ads.filter(x => ['stopped', 'failed', 'rejected'].includes(x.status))
  const cpc = (x: { spendAud: number; conversations: number }) => (x.conversations ? money(x.spendAud / x.conversations, 'AUD') : '-')
  return (
    <>
      <section className={s.card}>
        <div className={s.cardHead}><h2>How promotion works</h2><span className={`${s.pill} ${a.enabled ? s.pillGood : ''}`}>{a.enabled ? 'On' : 'Off'}</span></div>
        <p className={s.note}>Ella suggests boosting one of the best recent Reels as a WhatsApp ad. Nothing spends until you press Approve.
          Each promotion has a hard cap set in Meta ({money(a.totalCapAud, 'AUD')} over {a.days} days), and Ella stops it early when a WhatsApp chat costs more than {money(a.maxCostPerConversationAud, 'AUD')}{' '}
          or nothing comes in. Monthly cap: {money(a.monthlyCapAud, 'AUD')}, {money(d.money.adsAudMonthCommitted, 'AUD')} committed so far.</p>
      </section>
      <section className={s.card}>
        <div className={s.cardHead}><h2>Waiting for your approval</h2></div>
        {proposed.length === 0 ? <p className={s.empty}>No suggestions right now.</p> : (
          <ul className={s.list}>{proposed.map(x => (
            <li key={x.id} className={s.item}>
              <div className={s.itemMain}><span className={s.itemTitle}>{x.title ?? x.slug}</span><span className={s.itemSub}>{x.reason} · up to {money(x.totalCapAud, 'AUD')} over {x.days} days</span>
                {x.permalink && <a className={s.itemSub} href={x.permalink} target="_blank" rel="noreferrer">See the Reel</a>}</div>
              <div className={s.row}>
                <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy || !a.enabled} onClick={() => run({ kind: 'approve_ad', adId: x.id }, 'Promotion started')}>Approve</button>
                <button type="button" className={s.btn} disabled={busy} onClick={() => run({ kind: 'reject_ad', adId: x.id }, 'Dismissed')}>Dismiss</button>
              </div>
            </li>))}</ul>
        )}
      </section>
      <section className={s.card}>
        <div className={s.cardHead}><h2>Running and past</h2></div>
        {live.length + past.length === 0 ? <p className={s.empty}>No promotions yet.</p> : (
          <table className={s.table}><thead><tr><th>Video</th><th>Status</th><th className={s.num}>Spent</th><th className={s.num}>Chats</th><th className={s.num}>Per chat</th><th /></tr></thead><tbody>
            {[...live, ...past].map(x => (
              <tr key={x.id}><td>{x.title ?? x.slug}</td>
                <td className={['failed'].includes(x.status) ? s.attn : undefined}>{x.status === 'stopped' ? `Stopped: ${x.stopReason}` : x.status === 'failed' ? `Attention: ${x.error}` : x.status}</td>
                <td className={s.num}>{money(x.spendAud, 'AUD')}</td><td className={s.num}>{x.conversations}</td><td className={s.num}>{cpc(x)}</td>
                <td>{x.status === 'active' && <button type="button" className={s.btn} disabled={busy} onClick={() => run({ kind: 'pause_ad', adId: x.id }, 'Paused')}>Pause</button>}
                  {x.status === 'paused' && <button type="button" className={s.btn} disabled={busy} onClick={() => run({ kind: 'resume_ad', adId: x.id }, 'Running again')}>Resume</button>}</td></tr>))}
          </tbody></table>
        )}
      </section>
    </>
  )
}

// ── Insights ──────────────────────────────────────────────────────────────
function Group({ title, rows }: { title: string; rows: GroupStat[] }) {
  return (
    <section className={s.card}>
      <div className={s.cardHead}><h2>{title}</h2></div>
      {rows.length === 0 ? <p className={s.empty}>Not enough data yet.</p> : (
        <table className={s.table}><thead><tr><th>Type</th><th className={s.num}>Videos</th><th className={s.num}>Score</th><th className={s.num}>Avg reach</th></tr></thead>
          <tbody>{rows.map(r => <tr key={r.key}><td>{r.key}</td><td className={s.num}>{r.n}</td><td className={s.num}>{r.avgScore}</td><td className={s.num}>{r.avgReach.toLocaleString('en-AU')}</td></tr>)}</tbody></table>
      )}
    </section>
  )
}

/** Weekly file of every problem the code found in the last 7 days, for Jo to send back each week. Built from the page data, nothing is paid. */
function WeeklyProblems({ d }: { d: EllaPageData }) {
  const make = () => {
    const since = Date.now() - 7 * 86400000
    const lines: string[] = [`# Ella problems, last 7 days`, '', `Generated ${new Date().toISOString()}`, '']
    const alerts = d.dashboard.alerts.filter(a => PROBLEM_KINDS.has(a.kind) && Date.parse(a.createdAt) >= since)
    lines.push('## Open alerts', '')
    lines.push(...(alerts.length ? alerts.map(a => `- ${a.createdAt}: [${a.kind}] ${a.message}`) : ['- none']), '')
    lines.push('## Failed steps', '')
    let n = 0
    for (const [id, steps] of Object.entries(d.history)) {
      const title = d.board.videos.find(v => v.id === id)?.title ?? id
      for (const x of steps) {
        if (x.status !== 'failed' && !x.error) continue
        if (!x.createdAt || Date.parse(x.createdAt) < since) continue
        n++
        lines.push(`- ${x.createdAt} · ${title} · ${STEP_NAME[x.kind] ?? x.kind}${x.scene ? ` scene ${x.scene}` : ''} try ${x.attempt}: ${(x.error ?? x.status).slice(0, 300)}`)
      }
    }
    if (n === 0) lines.push('- none')
    const recent = (t?: string | null) => !!t && Date.parse(t) >= since
    lines.push('', '## Scripts and videos, last 7 days', '')
    const moved = d.dashboard.queue.filter(q => recent(q.updatedAt))
    lines.push(...(moved.length ? moved.map(q => `- ${q.updatedAt} · ${q.title ?? q.slug} · ${q.status}`) : ['- none']))
    lines.push('', '## Posts and views, last 7 days', '')
    const posts = d.posts.filter(p => recent(p.publishedAt) || p.status === 'failed' || (p.status === 'scheduled' && recent(p.scheduledAt)))
    lines.push(...(posts.length ? posts.map(p => `- ${p.platform} · ${p.title ?? p.slug} · ${p.status}${p.publishedAt ? ` · published ${p.publishedAt}` : ''}${p.error ? ` · error: ${p.error.slice(0, 200)}` : ''}`) : ['- none']))
    const views = d.performance.filter(r => recent(r.publishedAt))
    lines.push(...views.map(r => `- ${r.platform} · ${r.publishedAt} · views ${r.views ?? 'not reported yet'} · shares ${r.shares ?? '-'} · saves ${r.saves ?? '-'}`))
    lines.push('', '## Time from Start to ready video, last 7 days', '')
    const timed = d.board.videos.filter(v => v.steps.some(x => x.startedAt))
    lines.push(...(timed.length ? timed.map(v => { const a = v.steps.map(x => x.startedAt).filter(Boolean).sort()[0]; const b = v.steps.map(x => x.endedAt).filter(Boolean).sort().at(-1); return `- ${v.title}: ${a ? `started ${a}` : 'not started'}${b ? `, ready ${b}` : ', not ready yet'}` }) : ['- none']))
    lines.push('', '## Connections', '')
    const missing = Object.keys(CONNECTION_NAMES).filter(k => !d.env[k])
    lines.push(...(missing.length ? missing.map(k => `- not connected: ${CONNECTION_NAMES[k]}`) : ['- all connected']))
    lines.push('', `## Spend this month`, '', `- Video: US$${d.money.videoUsdMonth.toFixed(2)}`)
    const sp = d.slotProposal
    lines.push('', '## Posting times for next week', '')
    lines.push(`Videos with numbers: ${sp.videos}. ${sp.ready ? 'Proposal from the account\'s own numbers:' : sp.lines[0]}`)
    if (sp.ready) { lines.push(...sp.lines.map(x => `- ${x}`), '', `Proposed slots: ${sp.proposed.map(x => `dow ${x.dow} ${x.time}`).join(', ')}`) }
    lines.push('', '## What to do', '', 'Send this file back to Claude every week. Each problem is fixed in the code, not by a setting. Posting times change only after Jo approves the proposal above.', '')
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `ella-problems-${new Date().toISOString().slice(0, 10)}.md`
    a.click()
    URL.revokeObjectURL(a.href)
  }
  return (
    <section className={s.card}>
      <div className={s.cardHead}>
        <div><h2>Weekly problems file</h2><p>Every error and failed step from the last 7 days, in one file. Download it and send it to Claude each week, and each problem gets fixed in the code.</p></div>
        <button type="button" className={s.btn} onClick={make}>Download this week&apos;s problems</button>
      </div>
    </section>
  )
}

/** Stage 5: a deep report from a panel of Claude analysts. Downloading it starts a new period. */
function LearningReport() {
  const [state, setState] = useState<{ busy: boolean; error: string | null; last: string | null }>({ busy: false, error: null, last: null })
  const make = async () => {
    setState({ busy: true, error: null, last: null })
    try {
      const res = await fetch('/api/atlas/ella/action', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'learning_report' }) })
      const j = await res.json().catch(() => ({ ok: false, error: `The server gave no answer (${res.status})` }))
      if (!j.ok) throw new Error(j.error ?? 'failed')
      const blob = new Blob([j.detail.markdown], { type: 'text/markdown' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob); a.download = j.detail.filename; a.click()
      URL.revokeObjectURL(a.href)
      setState({ busy: false, error: null, last: j.detail.filename })
    } catch (e) { setState({ busy: false, error: String((e as Error).message ?? e), last: null }) }
  }
  return (
    <section className={s.card}>
      <div className={s.cardHead}>
        <div><h2>Learning report</h2><p>Every error, problem and step time since the last download, in one file: each script’s log, every failed step, open alerts, the numbers, and the time from Start to a ready video. Five Claude analysts read it and a lead writes the ranked fixes. Download it and send it to Claude in chat; the next file starts from the moment you download.</p></div>
        <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={state.busy} onClick={make}>{state.busy ? 'Writing the report (2 to 4 min)…' : 'Download the report'}</button>
      </div>
      {state.last && <p className={s.note}>Downloaded {state.last}. The next report starts from now.</p>}
      {state.error && <p className={s.attn}>The report failed: {state.error}. Send Claude a screenshot.</p>}
    </section>
  )
}

/** One action call that returns its detail, or throws the server's error. */
async function ellaPost(body: Record<string, unknown>) {
  const res = await fetch('/api/atlas/ella/action', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
  const j = await res.json().catch(() => ({ ok: false, error: `The server gave no answer (${res.status})` }))
  if (!j.ok) throw new Error(j.error ?? 'failed')
  return j.detail
}
type StartRunRow = { id: number; at: string; until: string | null; outcome: 'video' | 'failed' | 'running'; title: string | null; status: string | null; where: string; reason: string; spentUsd: number }
/** Jo, Nov 22: every Start that did not end with a video, each with a detailed PDF to send to Claude. */
function FailedStarts({ tz }: { tz: string }) {
  const [list, setList] = useState<{ runs: StartRunRow[]; partial: boolean } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState<number | null>(null)
  const load = useCallback(async () => {
    setError(null)
    try { setList(await ellaPost({ kind: 'start_runs' })) } catch (e) { setError(String((e as Error).message ?? e)) }
  }, [])
  useEffect(() => { const t = setTimeout(() => { void load() }, 0); return () => clearTimeout(t) }, [load])
  const download = async (id: number) => {
    setBusy(id); setError(null)
    try {
      const d = await ellaPost({ kind: 'start_run_pdf', startId: id }) as { filename: string; base64: string }
      const bin = atob(d.base64); const bytes = new Uint8Array(bin.length)
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
      const a = document.createElement('a')
      a.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })); a.download = d.filename; a.click()
      URL.revokeObjectURL(a.href)
    } catch (e) { setError(`The PDF failed: ${String((e as Error).message ?? e)}`) }
    setBusy(null)
  }
  const failed = list?.runs.filter(r => r.outcome === 'failed') ?? []
  const made = list?.runs.filter(r => r.outcome === 'video').length ?? 0
  return (
    <section className={s.card}>
      <div className={s.cardHead}>
        <div><h2>Starts with no video{list ? ` (${failed.length})` : ''}</h2><p>Every press of Start in the last 30 days that did not end with a video in Ready to post. Each one downloads a detailed PDF: where it stopped, why, and every log line, step and check behind it. Send the PDF to Claude in chat to fix the code.</p></div>
        <button type="button" className={s.btn} onClick={() => { void load() }}>Refresh</button>
      </div>
      {!list && !error && <p className={s.note}>Reading the log…</p>}
      {list && failed.length === 0 && <p className={s.note}>No failed Starts in the last 30 days.{made ? ` ${made} Start${made === 1 ? '' : 's'} made a video.` : ''}</p>}
      {failed.length > 0 && (
        <table className={s.table}>
          <thead><tr><th>Start</th><th>Blog</th><th>Where it stopped</th><th>Why</th><th /></tr></thead>
          <tbody>
            {failed.map(r => (
              <tr key={r.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{fmtTime(r.at, tz)}</td>
                <td>{r.title ?? 'No blog drawn'}{r.spentUsd > 0 && <div className={s.note}>US${r.spentUsd.toFixed(2)} spent</div>}</td>
                <td>{r.where}</td>
                <td>{r.reason.length > 160 ? `${r.reason.slice(0, 160)}…` : r.reason}</td>
                <td><button type="button" className={`${s.btn} ${s.btnMain}`} style={{ whiteSpace: 'nowrap' }} disabled={busy !== null} onClick={() => { void download(r.id) }}>{busy === r.id ? 'Making the PDF…' : 'Download PDF'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {list?.partial && <p className={s.attn}>Run migration 057 in Supabase: until then only the latest 1000 log lines are read, so older Starts are missing.</p>}
      {error && <p className={s.attn}>{error}</p>}
    </section>
  )
}

function Insights({ d }: { d: EllaPageData }) {
  const L = d.learnings
  return (
    <>
      <FailedStarts tz={d.config.timezone} />
      <WeeklyProblems d={d} />
      <LearningReport />
      <section className={s.card}>
        <div className={s.cardHead}><h2>Quick view</h2><p>Score = sends, saves, follows and comments per 1,000 people reached</p></div>
        <p style={{ margin: 0 }}>{L.summary || `Clear patterns need at least 6 videos with 3 days of numbers (now ${L.videos}).`}</p>
        <p className={s.note}>Nothing here changes Ella by itself. Changes come from the report.</p>
      </section>
      <div className={s.cols}><Group title="By hook" rows={L.byHook} /><Group title="By call to action" rows={L.byCta} /></div>
      <div className={s.cols}><Group title="By topic" rows={L.byPillar} /><Group title="By length" rows={L.byLength} /></div>
      <section className={s.card}>
        <div className={s.cardHead}><h2>Every video</h2></div>
        {d.performance.length === 0 ? <p className={s.empty}>No numbers yet.</p> : (
          <table className={s.table}><thead><tr><th>Video</th><th>Where</th><th className={s.num}>Views</th><th className={s.num}>Reach</th><th className={s.num}>Sends</th><th className={s.num}>Saves</th><th className={s.num}>Score</th></tr></thead>
            <tbody>{d.performance.map(r => (
              <tr key={r.postId}><td>{r.permalink ? <a href={r.permalink} target="_blank" rel="noreferrer">{shown(r.hook) || r.title || r.slug}</a> : (shown(r.hook) || r.title || r.slug)}</td>
                <td>{r.platform === 'tiktok' ? 'TikTok' : 'Instagram'}</td><td className={s.num}>{r.views ?? '-'}</td><td className={s.num}>{r.reach ?? '-'}</td>
                <td className={s.num}>{r.shares ?? '-'}</td><td className={s.num}>{r.saves ?? '-'}</td><td className={s.num}>{r.score}</td></tr>))}</tbody></table>
        )}
      </section>
    </>
  )
}

// ── Settings and setup ────────────────────────────────────────────────────
function EnvList({ env }: { env: Record<string, boolean> }) {
  const NAMES: Record<string, string> = {
    supabase: 'Supabase (database and storage)', anthropic: 'Claude (scripts and quality check): ANTHROPIC_API_KEY, ELLA_SCRIPT_MODEL',
    heygen: 'HeyGen (voice and video): ELLA_HEYGEN_API_KEY', meta: 'Meta (Instagram and ads): ELLA_META_ACCESS_TOKEN',
    tiktokApp: 'TikTok app: ELLA_TIKTOK_CLIENT_KEY, ELLA_TIKTOK_CLIENT_SECRET', tokenKey: 'Token lock: ELLA_TOKEN_KEY', cron: 'Scheduler: CRON_SECRET',
  }
  return (
    <ul className={s.list}>{Object.entries(NAMES).map(([k, label]) => (
      <li key={k} className={s.item}><span>{label}</span><span className={`${s.pill} ${env[k] ? s.pillGood : s.pillAttn}`}>{env[k] ? 'Set' : 'Missing'}</span></li>))}</ul>
  )
}

function Settings({ d, run, busy }: { d: EllaPageData; run: Run; busy: boolean }) {
  const [c, setC] = useState<EllaConfig>(d.config)
  // When the header switch changes Ella on or off, the form follows it (other unsaved edits stay).
  useEffect(() => { setC(x => ({ ...x, enabled: d.config.enabled })) }, [d.config.enabled])
  const dirty = useMemo(() => JSON.stringify(c) !== JSON.stringify(d.config), [c, d.config])
  const set = <K extends keyof EllaConfig>(k: K, v: EllaConfig[K]) => setC({ ...c, [k]: v })
  const numIn = (v: number, on: (n: number) => void, step = 1) => <input className={`${s.input} ${s.inputSmall}`} type="number" step={step} value={v} onChange={e => on(Number(e.target.value))} />
  return (
    <>
      <section className={s.card}>
        <div className={s.cardHead}><h2>Save</h2>
          <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy || !dirty} onClick={() => run({ kind: 'save_config', config: c }, 'Settings saved')}>Save settings</button></div>
      </section>

      <div className={s.cols}>
        <section className={s.card}>
          <div className={s.cardHead}><h2>Instagram</h2></div>
        </section>
        <section className={s.card}>
          <div className={s.cardHead}><h2>TikTok</h2><span className={`${s.pill} ${d.tiktokConnected ? s.pillGood : ''}`}>{d.tiktokConnected ? 'Connected' : 'Not connected'}</span></div>
          <label className={s.check}><input type="checkbox" checked={c.tiktok.audited} onChange={e => set('tiktok', { ...c.tiktok, audited: e.target.checked })} /> TikTok approved our app (audit passed)</label>
          <a className={s.btn} href="/api/atlas/ella/tiktok/connect" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginTop: 8 }}>{d.tiktokConnected ? 'Reconnect TikTok' : 'Connect TikTok'}</a>
        </section>
      </div>

      <section className={s.card}>
        <div className={s.cardHead}><h2>Paid promotion (Meta)</h2></div>
        <label className={s.check}><input type="checkbox" checked={c.ads.enabled} onChange={e => set('ads', { ...c.ads, enabled: e.target.checked })} /> Allow paid promotion (each one still needs your approval)</label>
        <label className={s.check}><input type="checkbox" checked={c.ads.autoPropose} onChange={e => set('ads', { ...c.ads, autoPropose: e.target.checked })} /> Ella suggests which Reels to promote</label>
        <div className={s.grid3}>
          <div><span className={s.label}>Cap per promotion (A$)</span>{numIn(c.ads.totalCapAud, n => set('ads', { ...c.ads, totalCapAud: n }))}</div>
          <div><span className={s.label}>Days per promotion</span>{numIn(c.ads.days, n => set('ads', { ...c.ads, days: n }))}</div>
          <div><span className={s.label}>Daily budget guide (A$)</span>{numIn(c.ads.dailyBudgetAud, n => set('ads', { ...c.ads, dailyBudgetAud: n }))}</div>
          <div><span className={s.label}>Stop above this per WhatsApp chat (A$)</span>{numIn(c.ads.maxCostPerConversationAud, n => set('ads', { ...c.ads, maxCostPerConversationAud: n }))}</div>
          <div><span className={s.label}>Monthly cap (A$)</span>{numIn(c.ads.monthlyCapAud, n => set('ads', { ...c.ads, monthlyCapAud: n }))}</div>
          <div><span className={s.label}>Ages</span><div className={s.row}>{numIn(c.ads.ageMin, n => set('ads', { ...c.ads, ageMin: n }))}{numIn(c.ads.ageMax, n => set('ads', { ...c.ads, ageMax: n }))}</div></div>
          <div><span className={s.label}>Instagram places (Facebook Page IDs, comma separated; one is picked at random per Reel)</span><input className={s.input} placeholder="Empty: Ella finds Sydney CBD places by herself" value={c.instagram.locationId} onChange={e => set('instagram', { ...c.instagram, locationId: e.target.value.replace(/[^\d,\s]/g, '') })} /></div>
          <div><span className={s.label}>Ad account id</span><input className={s.input} value={c.ids.adAccountId} onChange={e => set('ids', { ...c.ids, adAccountId: e.target.value.trim() })} /></div>
          <div><span className={s.label}>SVT WhatsApp number (+61...)</span><input className={s.input} value={c.ids.whatsappNumber} onChange={e => set('ids', { ...c.ids, whatsappNumber: e.target.value.trim() })} /></div>
          <div><span className={s.label}>Meta special ad category</span>
            <select className={s.select} value={c.ads.specialAdCategory} onChange={e => set('ads', { ...c.ads, specialAdCategory: e.target.value as EllaConfig['ads']['specialAdCategory'] })}>
              <option value="NONE">None</option><option value="FINANCIAL_PRODUCTS_SERVICES">Financial products and services</option></select></div>
        </div>
        <p className={s.note}>Meta may treat tax services as financial services. If it rejects an ad for that, switch the category; age targeting is then not allowed.</p>
      </section>

      <section className={s.card}>
        <div className={s.cardHead}><h2>Connections</h2><p>{connectionSummary(d.env)}</p></div>
        <EnvList env={d.env} />
      </section>

    </>
  )
}
