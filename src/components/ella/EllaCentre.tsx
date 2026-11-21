'use client'
// Ella (Social Media, SVT) in Atlas. Every figure comes from the server
// (lib/ella/view.ts); every button posts one action to /api/atlas/ella/action
// and reloads the data. Nothing here holds a key or a token.
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { EllaConfig, Slot } from '@/lib/ella/config'
import type { EllaPageData, EllaPageResult } from '@/lib/ella/view'
import type { ProductionDetail } from '@/lib/ella/store'
import type { GroupStat } from '@/lib/ella/learn'
import { KIT } from '@/lib/ella/kit'
import { finishCaption } from '@/lib/ella/script/captions'
import { FEED_RULES } from '@/lib/ella/video/feed-rules'
import { BANNED } from '@/lib/ella/script/rules'
import { HistoryPanel, ScriptsBoard, useRunner, VideosBoard, type JobKind } from './EllaBoard'
import s from './ella.module.css'

type Tab = 'overview' | 'scripts' | 'videos' | 'ready' | 'posted' | 'insights' | 'promotion' | 'settings'
/** The five stages of a video, in order, then the tools around them. */
const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'scripts', label: '1 · Scripts' }, { id: 'videos', label: '2 · Videos' }, { id: 'ready', label: '3 · Ready to post' },
  { id: 'posted', label: '4 · Posted' }, { id: 'insights', label: '5 · Learning' },
  { id: 'promotion', label: 'Promotion' }, { id: 'settings', label: 'Settings and setup' },
]
const OLD_TABS: Record<string, Tab> = { review: 'scripts', calendar: 'ready' }
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const STATUS_TEXT: Record<string, string> = {
  drawn: 'Blog drawn', scripting: 'Writing script', script_ready: 'Script ready', needs_jo: 'Script needs you', approved: 'Script approved',
  producing: 'Making video', video_ready: 'Video ready for review', video_needs_jo: 'Video needs you', scheduled: 'Scheduled',
  published: 'Published', cancelled: 'Cancelled',
}

const fmtTime = (iso: string | null | undefined, tz: string) =>
  iso ? new Intl.DateTimeFormat('en-AU', { timeZone: tz, weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(iso)) : ''
const money = (n: number, cur: string) => `${cur === 'USD' ? 'US$' : 'A$'}${n.toFixed(2)}`
/** Spelled acronyms are for the voice; people read "ABN". */
const shown = (t: string | null) => (t ?? '').replace(/\b([A-Z])-([A-Z])(?:-([A-Z]))?\b/g, (_m, a: string, b: string, c?: string) => a + b + (c ?? ''))
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
  const runner = useRunner(t => { setToast(t); setTimeout(() => setToast(null), 15000) })

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
  const counts: Partial<Record<Tab, number>> = {
    scripts: data.board.scripts.length + data.reviews.filter(p => ['script_ready', 'needs_jo', 'approved'].includes(p.status)).length,
    videos: data.board.videos.length + waitingVideos,
    ready: data.posts.filter(p => ['manual_ready', 'scheduled', 'publishing'].includes(p.status)).length,
    posted: data.posts.filter(p => p.status === 'published').length,
    promotion: data.ads.filter(a => a.status === 'proposed').length,
  }
  const alert: Partial<Record<Tab, boolean>> = { scripts: waitingScripts > 0, videos: waitingVideos > 0, ready: data.posts.some(p => p.status === 'manual_ready'), promotion: data.ads.some(a => a.status === 'proposed') }
  const reviewScript = (p: ProductionDetail) => <ScriptReview p={p} run={run} busy={busy || !!runner.job} start={runner.start} />
  const reviewVideo = (p: ProductionDetail) => p.render ? <VideoReview p={p} d={data} run={run} busy={busy || !!runner.job} /> : <ScriptReview p={p} run={run} busy={busy || !!runner.job} start={runner.start} />
  return (
    <div className={s.frame}><main className={s.page}>
      <Header on={data.config.enabled} flip={() => (data.config.enabled || window.confirm('Switch to Automatic? Ella will draw blogs, write scripts and spend on HeyGen by herself.')) && run({ kind: 'save_config', config: { ...data.config, enabled: !data.config.enabled } }, data.config.enabled ? 'Manual: Ella waits for your buttons' : 'Automatic: Ella works by herself')} problems={data.dashboard.alerts.filter(a => PROBLEM_KINDS.has(a.kind)).length + (runner.error ? 1 : 0)} open={bellOpen} toggle={() => setBellOpen(!bellOpen)} />
      {notice && <p className={s.note}>{notice}</p>}
      <nav className={s.tabs} aria-label="Ella sections">
        {TABS.map(t => (
          <button key={t.id} type="button" className={`${s.tab} ${tab === t.id ? s.tabOn : ''}`} onClick={() => choose(t.id)} aria-current={tab === t.id ? 'page' : undefined}>
            {t.label}{(counts[t.id] ?? 0) > 0 && <span className={s.badge} style={alert[t.id] ? undefined : { background: '#E5E7EB', color: '#111827' }}>{counts[t.id]}</span>}
          </button>
        ))}
      </nav>
      {bellOpen && <ErrorBanner d={data} run={run} busy={busy} local={runner.error} clearLocal={runner.clearError} />}
      {/* On the Scripts and Videos tabs the stage card itself shows the run; elsewhere this bar does. */}
      {tab === 'overview' && <Overview d={data} run={run} busy={busy} go={choose} />}
      {tab === 'scripts' && <ScriptsBoard d={data} job={runner.job} start={runner.start} review={reviewScript} run={run} busy={busy} />}
      {tab === 'videos' && <VideosBoard d={data} job={runner.job} start={runner.start} review={reviewVideo} />}
      {tab === 'ready' && <Calendar d={data} run={run} busy={busy} part="ready" />}
      {tab === 'posted' && <Calendar d={data} run={run} busy={busy} part="posted" />}
      {tab === 'promotion' && <Promotion d={data} run={run} busy={busy} />}
      {tab === 'insights' && <Insights d={data} />}
      {tab === 'settings' && <Settings d={data} run={run} busy={busy} />}
      {toast && <div role="status" className={`${s.toast} ${toast.err ? s.toastErr : ''}`}>{toast.text}</div>}
    </main></div>
  )
}

/** Every problem stays on top of every tab until Jo clears it: what failed and what to do. */
const PROBLEM_KINDS = new Set(['error', 'publish_failed', 'budget', 'setup', 'stuck'])
function ErrorBanner({ d, run, busy, local, clearLocal }: { d: EllaPageData; run: Run; busy: boolean; local: string | null; clearLocal: () => void }) {
  const problems = d.dashboard.alerts.filter(a => PROBLEM_KINDS.has(a.kind))
  // The same failure arrives twice (the button's answer and the saved alert): show it once.
  const core = (t: string) => (t.match(/stopped: (.{20,120})/)?.[1] ?? t.slice(0, 120))
  const own = local
  if (own && problems.some(a => a.message.includes(core(own)))) local = null
  // The bell is also the activity log: recent steps show even when nothing is wrong.
  const log = d.dashboard.recentAudit.slice(0, 15)
  return (
    <section className={problems.length || local ? s.problems : s.card} role={problems.length || local ? 'alert' : undefined}>
      {(problems.length > 0 || local) && (
        <>
          <strong>Needs fixing ({problems.length + (local ? 1 : 0)})</strong>
          <ul>
            {local && <li><span>{local}</span><button type="button" className={s.btn} onClick={clearLocal}>Clear</button></li>}
            {problems.map(a => (
              <li key={a.id}><span>{a.message}</span>
                <button type="button" className={s.btn} disabled={busy} onClick={() => run({ kind: 'resolve_alert', alertId: a.id }, 'Cleared')}>Clear</button></li>
            ))}
          </ul>
        </>
      )}
      <strong>Activity</strong>
      {log.length === 0 ? <p className={s.note}>Nothing yet.</p> : (
        <ul className={s.list}>
          {log.map((e, i) => (
            <li key={i} className={s.item}><span>{eventText(e.action)}</span><span className={s.itemSub}>{fmtTime(e.at, d.config.timezone)}</span></li>
          ))}
        </ul>
      )}
    </section>
  )
}

/** Plain words for a system step, so the log reads like a diary of what happened. */
const EVENT_TEXT: Record<string, string> = {
  'action:approve_script': 'Script approved',
  'action:approve_video': 'Video approved, waiting for its slot',
  'action:cancel': 'Cancelled; the blog went back into the draw',
  'action:edit_video': 'Video edited',
  'action:save_config': 'Settings saved',
  'action:resolve_alert': 'Alert cleared',
  'action:learning_report': 'Learning report downloaded',
  script_ready: 'Script ready for your review',
  video_ready: 'Video ready for your review',
  gave_up: 'Script gave up after the checks failed',
}
const eventText = (action: string) => EVENT_TEXT[action] ?? action.replace(/^action:/, '').replace(/_/g, ' ')

function Header({ on, problems = 0, open = false, toggle, flip }: { on: boolean; problems?: number; open?: boolean; toggle?: () => void; flip?: () => void }) {
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
          <button type="button" className={`${s.bell} ${problems ? s.bellOn : ''}`} onClick={toggle} aria-expanded={open} aria-label={problems ? `${problems} problem${problems > 1 ? 's' : ''} to fix` : 'No problems'}>
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
const MILESTONE: Record<string, (x: Record<string, unknown>) => string> = {
  script_ready: x => `Wrote a script${x.slug ? ` for “${x.slug}”` : ''}${x.hook ? `: “${x.hook}”` : ''}`,
  production_started: () => 'Started making a video',
  video_rendered: x => x.status === 'video_ready' ? 'Finished a video, it passed every check' : 'Finished a video, it needs a look',
  published: x => `Posted on ${x.platform === 'tiktok' ? 'TikTok' : 'Instagram'}`,
  script_gave_up: x => `Gave up on a blog after several tries${x.slug ? ` (${x.slug})` : ''}`,
  learning_report: () => 'Prepared a learning report',
  fresh_start: () => 'Started again from zero',
}

function Overview({ d, run, busy, go = () => {} }: { d: EllaPageData; run: Run; busy: boolean; go?: (t: Tab) => void }) {
  const done = d.dashboard.recentAudit.filter(a => a.actor !== 'jo' && MILESTONE[a.action]).slice(0, 12).map(a => ({ at: a.at, text: MILESTONE[a.action](a.detail ?? {}) }))
  const tz = d.config.timezone
  const vidPct = Math.min(100, (d.money.videoUsdMonth / Math.max(d.config.budgets.videoUsdPerMonth, 1)) * 100)
  const published30 = d.posts.filter(p => p.status === 'published' && p.publishedAt && Date.parse(d.now) - Date.parse(p.publishedAt) < 30 * 86400000)
  // Views of the posts published in the last 30 days, per platform (latest number the platform gave us).
  const since30 = Date.parse(d.now) - 30 * 86400000
  const viewsOf = (pf: 'instagram' | 'tiktok') => d.performance.filter(r => r.platform === pf && Date.parse(r.publishedAt) >= since30)
  const sumViews = (rows: typeof d.performance) => rows.reduce((a, r) => a + (r.views ?? 0), 0)
  const igViews = sumViews(viewsOf('instagram')), ttViews = sumViews(viewsOf('tiktok'))
  const noViews = d.performance.every(r => r.views == null)
  const libLeft = d.dashboard.library.total - d.dashboard.library.used
  return (
    <>
      <section className={s.card}>
        <div className={s.tiles}>
          {(['instagram', 'tiktok'] as const).map(pf => {
            const n = d.followers[pf]
            const share = Math.min(100, ((n ?? 0) / d.followers.goal) * 100)
            return (
              <div key={pf} className={s.tile}><span className={s.tileKey}>{pf === 'instagram' ? 'Instagram followers' : 'TikTok followers'} (goal 10k)</span>
                <span className={s.tileValue}>{n == null ? '-' : n.toLocaleString('en-AU')}</span>
                <div className={s.bar}><div className={s.barFill} style={{ width: `${share}%` }} /></div>
                <span className={s.tileSub}>{n == null ? 'Shows once the account is connected' : `${Math.round(share)}% of the goal`}</span></div>
            )
          })}
          <div className={s.tile}><span className={s.tileKey}>Posts, last 30 days</span><span className={s.tileValue}>{published30.length}</span><span className={s.tileSub}>Plan {d.config.slots.length} a week · IG {viewsOf('instagram').length} · TikTok {viewsOf('tiktok').length}</span></div>
          <div className={s.tile}><span className={s.tileKey}>Views, last 30 days</span><span className={s.tileValue}>{noViews ? '-' : (igViews + ttViews).toLocaleString('en-AU')}</span><span className={s.tileSub}>{noViews ? 'Shows once the platforms report views' : `Instagram ${igViews.toLocaleString('en-AU')} · TikTok ${ttViews.toLocaleString('en-AU')} · ${[...viewsOf('instagram'), ...viewsOf('tiktok')].filter(r => r.views != null).length} of ${viewsOf('instagram').length + viewsOf('tiktok').length} posts reported`}</span></div>
          <div className={s.tile} role="button" tabIndex={0} style={{ cursor: 'pointer' }} onClick={() => go(d.reviews.some(p => p.status === 'script_ready' || p.status === 'needs_jo') ? 'scripts' : 'videos')}><span className={s.tileKey}>Waiting for you</span><span className={`${s.tileValue} ${d.reviews.length ? s.attn : ''}`}>{d.reviews.length}</span><span className={s.tileSub}>Scripts and videos</span></div>
          <div className={s.tile}><span className={s.tileKey}>Video spend this month</span><span className={s.tileValue}>{money(d.money.videoUsdMonth, 'USD')}</span>
            <div className={s.bar}><div className={`${s.barFill} ${vidPct > 85 ? s.barFillWarn : ''}`} style={{ width: `${vidPct}%` }} /></div>
            <span className={s.tileSub}>of {money(d.config.budgets.videoUsdPerMonth, 'USD')}</span></div>
          <div className={s.tile}><span className={s.tileKey}>Promotion this month</span><span className={s.tileValue}>{money(d.money.adsAudMonthCommitted, 'AUD')}</span><span className={s.tileSub}>cap {money(d.config.ads.monthlyCapAud, 'AUD')}{d.config.ads.enabled ? '' : ' · off'}</span></div>
          <div className={s.tile}><span className={s.tileKey}>Blogs not used yet</span><span className={`${s.tileValue} ${libLeft < 10 ? s.attn : ''}`}>{libLeft}</span><span className={s.tileSub}>of {d.dashboard.library.total}</span></div>
        </div>
      </section>

      <section className={s.card}>
        <div className={s.cardHead}><h2>Live on the accounts</h2><p>What people see now: every posted video, newest first.</p></div>
        <div className={s.phones}>
          <Phone d={d} platform="tiktok" />
          <Phone d={d} platform="instagram" />
        </div>
      </section>

      <div>
        <section className={s.card}>
          <div className={s.cardHead}><h2>Needs attention</h2></div>
          {d.dashboard.alerts.filter(a => PROBLEM_KINDS.has(a.kind)).length === 0 ? <p className={s.empty}>All clear. Only real system problems show here.</p> : (
            <ul className={s.list}>{d.dashboard.alerts.filter(a => PROBLEM_KINDS.has(a.kind)).map(a => (
              <li key={a.id} className={s.item}>
                <div className={s.itemMain}>
                  <span className={`${s.itemTitle} ${a.kind === 'review' ? '' : s.attn}`} style={{ whiteSpace: 'normal' }}>{a.kind === 'review' ? a.message : `Attention: ${a.message}`}</span>
                  <span className={s.itemSub}>{fmtTime(a.createdAt, tz)}</span></div>
                <button type="button" className={s.btn} disabled={busy} onClick={() => run({ kind: 'resolve_alert', alertId: a.id }, 'Cleared')}>Clear</button>
              </li>))}</ul>
          )}
        </section>
      </div>

      <section className={s.card}>
        <div className={s.cardHead}><h2>What Ella did</h2></div>
        <table className={s.table}><tbody>
          {done.length === 0 ? <tr><td className={s.empty}>Nothing yet.</td></tr> : done.map((a, i) => (
            <tr key={i}><td style={{ width: 150 }}>{fmtTime(a.at, tz)}</td><td>{a.text}</td></tr>
          ))}
        </tbody></table>
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
  const [note, setNote] = useState('')
  const [rows, setRows] = useState<Record<number, { headline: string; zoom: boolean; ella?: boolean }>>({})
  const [scene, setScene] = useState<number>(draft.scenes[0]?.scene ?? 1)
  const blocks = qa.filter(q => q.severity === 'block')
  const cancellable = !['published', 'cancelled'].includes(p.status)
  const changed = Object.entries(rows).map(([k, v]) => ({ scene: Number(k), headline: v.headline, zoom: v.zoom ? 1.1 : 1, ...(v.ella ? { shot: 'ella' as const } : {}) }))
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
              ? <button type="button" className={`${s.btn} ${s.btnDanger}`} disabled={busy} onClick={() => window.confirm(`Cancel this video? US$${p.spentUsd.toFixed(2)} already spent is not refunded. The blog goes back into the draw.`) && run({ kind: 'cancel', productionId: p.id }, 'Cancelled')}>Cancel video</button>
              : <span className={s.note}>This video is {p.status === 'published' ? 'already published' : 'already cancelled'}, so it cannot be cancelled.</span>}
          </div>
          <p className={s.note}>Approved videos go to “3 · Ready to post” for the next free slot ({fmtTime(d.nextSlots[0], d.config.timezone)} or later).</p>

          <HistoryPanel title={p.title ?? p.slug} slug={p.slug} steps={d.history[p.id] ?? []} />

          <span className={s.label} style={{ marginTop: 16 }}>Edit with Claude</span>
          <textarea className={s.textarea} style={{ minHeight: 60 }} placeholder="For example: no text over her face in scene 3, zoom in on the last line" value={note} onChange={e => setNote(e.target.value)} />
          <details className={s.more}><summary>Or change scenes yourself</summary>
            <table className={s.table}><thead><tr><th>#</th><th>Ella says</th><th>Shows</th><th>Text at the top (empty for none)</th><th>Zoom</th></tr></thead><tbody>
              {draft.scenes.map(sc => {
                const r = rows[sc.scene] ?? { headline: sc.onScreen, zoom: false }
                return (
                  <tr key={sc.scene}><td>{sc.scene}</td><td>{sc.voice}</td>
                    <td>{shotLite(sc) === 'ella' ? 'Ella' : <select className={`${s.select} ${s.inputSmall}`} value={r.ella ? 'ella' : 'keep'} onChange={e => setRows({ ...rows, [sc.scene]: { ...r, ella: e.target.value === 'ella' } })} aria-label={`What scene ${sc.scene} shows`}>
                      <option value="keep">{SHOT_TEXT[shotLite(sc)]}</option><option value="ella">Ella instead</option></select>}</td>
                    <td>{shotLite(sc) === 'graphic' && !r.ella ? <span className={s.muted}>card text</span> : <input className={s.input} value={r.headline} onChange={e => setRows({ ...rows, [sc.scene]: { ...r, headline: e.target.value } })} />}</td>
                    <td>{shotLite(sc) === 'ella' || r.ella ? <input type="checkbox" checked={r.zoom} onChange={e => setRows({ ...rows, [sc.scene]: { ...r, zoom: e.target.checked } })} aria-label={`Zoom scene ${sc.scene}`} /> : ''}</td></tr>)
              })}
            </tbody></table>
          </details>
          <div className={s.row} style={{ marginTop: 8 }}>
            <button type="button" className={s.btn} disabled={busy || (!note.trim() && changed.length === 0)}
              onClick={() => run({ kind: 'edit_video', productionId: p.id, note, overrides: changed }, 'Editing: the new version appears here in a few minutes. Nothing is paid again.')}>Apply the edit</button>
              {/* TEMPORARY (Jo): re-render this finished video with all the latest fixes, nothing paid again. Remove when Jo says so. */}
              <button className={s.btn} disabled={busy} onClick={() => run({ kind: 'edit_video', productionId: p.id, note: '', overrides: [] }, 'Re-rendering with the latest fixes: the new version appears here in a few minutes. Nothing is paid again.')}>Re-render with latest fixes (temporary)</button>
            <span className={s.itemSub}>Free: only the edit is done again.</span>
          </div>

          <details className={s.more}><summary>Behind the scenes: Claude’s check, and making a shot again (paid)</summary>
            {qa.length === 0 ? <p className={s.empty}>No problems found.</p> : (
              <ul className={s.qa}>{qa.map((q, i) => (
                <li key={i}><span className={s.sec}>{q.second == null ? 'whole' : `${q.second.toFixed(1)}s`}</span>
                  <span className={q.severity === 'block' ? s.attn : undefined}>{q.scene != null ? `Scene ${q.scene}: ` : ''}{q.problem}</span></li>))}</ul>
            )}
            <div className={s.row} style={{ marginTop: 8 }}>
              <select className={`${s.select} ${s.inputSmall}`} value={scene} onChange={e => setScene(Number(e.target.value))} aria-label="Shot to make again">
                {draft.scenes.filter(sc => shotLite(sc) !== 'graphic').map(sc => <option key={sc.scene} value={sc.scene}>Scene {sc.scene} ({SHOT_TEXT[shotLite(sc)]}{shotLite(sc) === 'ella' ? ': all of Ella again' : ''})</option>)}
              </select>
              <button type="button" className={s.btn} disabled={busy} onClick={() => run({ kind: 'redo_scene', productionId: p.id, scene }, `Scene ${scene} will be made again`)}>Make this shot again at HeyGen</button>
            </div>
          </details>
        </div>
      </div>
    </section>
  )
}

function ScriptReview({ p, run, busy, start }: { p: ProductionDetail; run: Run; busy: boolean; start: (k: JobKind, id?: string) => void }) {
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
        {p.status === 'script_ready' && <>
          <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy} onClick={() => window.confirm('Send to HeyGen? This starts a paid video. The cost cap is in Settings.') && start('make_video', p.id)}>Send to HeyGen</button>
          <button type="button" className={s.btn} disabled={busy} onClick={() => run({ kind: 'approve_script', productionId: p.id }, 'Script approved. Send it to HeyGen when you are ready.')}>Approve, send later</button>
        </>}
        {p.status === 'video_needs_jo' && !p.render && <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy} onClick={() => run({ kind: 'retry_video', productionId: p.id }, 'Ready to try again')}>Make the video again</button>}
        <button type="button" className={`${s.btn} ${s.btnDanger}`} disabled={busy} onClick={() => run({ kind: 'cancel', productionId: p.id }, 'Cancelled; the blog goes back into the draw')}>Cancel</button>
      </div>
    </section>
  )
}

// ── Calendar ──────────────────────────────────────────────────────────────
/** The steps for posting by hand; "I posted it" unlocks only when the must-do ones are ticked. */
function PostChecklist({ platform, cover, onReady }: { platform: string; cover: string | null; onReady: (ok: boolean) => void }) {
  const items = platform === 'tiktok'
    ? [
        { k: 'video', t: 'Download the video and the caption above to your phone', must: false },
        { k: 'ai', t: 'More options: turn ON “AI-generated content”', must: true },
        { k: 'cc', t: 'Turn OFF auto captions (the video already has its own)', must: true },
        { k: 'cover', t: 'Cover: pick the first second, with the headline', must: false },
        { k: 'link', t: 'After posting, copy the post link and paste it here', must: false },
      ]
    : [
        { k: 'video', t: 'Download the video and copy the caption', must: false },
        { k: 'ai', t: 'Advanced settings: turn ON “AI info”', must: true },
        { k: 'link', t: 'After posting, copy the post link and paste it here', must: false },
      ]
  const [done, setDone] = useState<Record<string, boolean>>({})
  const flip = (k: string) => {
    const next = { ...done, [k]: !done[k] }
    setDone(next)
    onReady(items.filter(i => i.must).every(i => next[i.k]))
  }
  return (
    <div style={{ marginTop: 10 }}>
      <span className={s.label}>Posting checklist</span>
      {items.map(i => (
        <label key={i.k} className={s.check}><input type="checkbox" checked={!!done[i.k]} onChange={() => flip(i.k)} /> {i.t}{i.must ? ' (required)' : ''}</label>
      ))}
      {cover && <a className={s.btn} href={cover} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginTop: 6 }}>Download cover image</a>}
    </div>
  )
}

function Calendar({ d, run, busy, part }: { d: EllaPageData; run: Run; busy: boolean; part: 'ready' | 'posted' }) {
  const tz = d.config.timezone
  const [urls, setUrls] = useState<Record<string, string>>({})
  const [ready, setReady] = useState<Record<string, boolean>>({})
  const manual = d.posts.filter(p => p.status === 'manual_ready')
  const upcoming = d.posts.filter(p => ['scheduled', 'publishing'].includes(p.status)).sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))
  const done = d.posts.filter(p => ['published', 'failed'].includes(p.status)).sort((a, b) => (b.publishedAt ?? b.scheduledAt).localeCompare(a.publishedAt ?? a.scheduledAt))
  if (part === 'posted') return (
    <section className={s.card}>
      <div className={s.cardHead}><div><h2>Stage 4 · Posted</h2><p>Every posted video with its caption and hashtags exactly as they went out. Numbers come in under Stage 5.</p></div></div>
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
      <section className={s.card}><div className={s.cardHead}><div><h2>Stage 3 · Ready to post</h2><p>Approved videos with their captions and hashtags, waiting for their slot. Captions are set when you approve the video in Stage 2.</p></div></div></section>
      {manual.length > 0 && (
        <section className={s.card}>
          <div className={s.cardHead}><h2>Post these by hand</h2><p>Until TikTok approves the app, TikTok posts go from your phone.</p></div>
          <ul className={s.list}>{manual.map(p => (
            <li key={p.id} className={s.item} style={{ alignItems: 'flex-start' }}>
              <div className={s.itemMain} style={{ flex: 1 }}>
                <span className={s.itemTitle}>{p.platform === 'tiktok' ? 'TikTok' : 'Instagram'} · {p.title ?? p.slug} · best at {fmtTime(p.scheduledAt, tz)}</span>
                <pre className={s.copy}>{p.caption}</pre>
                <div className={s.row} style={{ marginTop: 8 }}>
                  {p.videoPath && <a className={s.btn} href={mediaUrl(p.videoPath, true)} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Download video</a>}
                  <button type="button" className={s.btn} onClick={() => navigator.clipboard?.writeText(p.caption)}>Copy caption</button>
                  <input className={s.input} style={{ width: 320 }} placeholder="Paste the post link after posting" value={urls[p.id] ?? ''} onChange={e => setUrls({ ...urls, [p.id]: e.target.value })} />
                  <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy || !urls[p.id] || !ready[p.id]} title={ready[p.id] ? undefined : 'Tick the checklist first'} onClick={() => run({ kind: 'mark_posted', postId: p.id, url: urls[p.id] }, 'Marked as posted')}>I posted it</button>
                </div>
                <PostChecklist platform={p.platform} cover={p.videoPath ? mediaUrl(p.videoPath.replace(/final-(\d+)\.mp4$/, 'cover-$1.jpg'), true) : null} onReady={ok => setReady({ ...ready, [p.id]: ok })} />
              </div>
            </li>))}</ul>
        </section>
      )}
      <section className={s.card}>
        <div className={s.cardHead}><h2>Coming up</h2></div>
        {upcoming.length === 0 ? <p className={s.empty}>Nothing scheduled.</p> : (
          <ul className={s.list}>{upcoming.map(p => (
            <li key={p.id} className={s.item}>
              <div className={s.itemMain}><span className={s.itemTitle}>{fmtTime(p.scheduledAt, tz)} · {p.platform === 'tiktok' ? 'TikTok' : 'Instagram'}</span><span className={s.itemSub}>{p.title ?? p.slug}{p.error ? ` · Attention: ${p.error}` : ''}</span></div>
              <div className={s.row}>
                <span className={s.pill}>{p.status === 'publishing' ? 'Posting now' : 'Scheduled'}</span>
                {p.status === 'scheduled' && <button type="button" className={s.btn} disabled={busy} onClick={() => window.confirm('Post now? This goes live on the platform straight away.') && run({ kind: 'publish_now', postId: p.id }, 'Will post on the next run')}>Post now</button>}
              </div>
            </li>))}</ul>
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
        <div><h2>Stage 5 · Learning report</h2><p>Five Claude analysts each study one angle: the script and hook, the AI clips and edit, Ella’s delivery, every Instagram and TikTok number, and a devil’s advocate. A lead writes the ranked changes. Download it and send it to Claude in chat; the code is changed from it there.</p></div>
        <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={state.busy} onClick={make}>{state.busy ? 'Writing the report (2 to 4 min)…' : 'Download the report'}</button>
      </div>
      {state.busy && <div className={s.bar}><div className={`${s.barFill} ${s.barRun}`} style={{ width: '60%' }} /></div>}
      {state.last && <p className={s.note}>Downloaded {state.last}. The next report starts from now.</p>}
      {state.error && <p className={s.attn}>The report failed: {state.error}. Send Claude a screenshot.</p>}
    </section>
  )
}

function Insights({ d }: { d: EllaPageData }) {
  const L = d.learnings
  return (
    <>
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
  const setSlot = (i: number, slot: Slot) => set('slots', c.slots.map((x, k) => (k === i ? slot : x)))
  const wa = c.ids.whatsappNumber.replace(/\D/g, '')
  const waLink = wa ? `https://wa.me/${wa}?text=${encodeURIComponent('Hi, I saw your video. My visa type is: ')}` : ''
  return (
    <>
      <section className={s.card}>
        <div className={s.cardHead}><h2>Ella</h2>
          <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy || !dirty} onClick={() => run({ kind: 'save_config', config: c }, 'Settings saved')}>Save settings</button></div>
        <label className={s.check}><input type="checkbox" checked={c.enabled} onChange={e => set('enabled', e.target.checked)} /> Ella is switched on (draws blogs, writes scripts, makes videos and posts approved ones)</label>
        <label className={s.check}><input type="checkbox" checked={c.agentSignoffConfirmed} onChange={e => set('agentSignoffConfirmed', e.target.checked)} /> The supervising tax agent signed off the script rules in writing (allows the WhatsApp CTA)</label>
        <label className={s.check}><input type="checkbox" checked={c.allowPrice} onChange={e => set('allowPrice', e.target.checked)} /> Price may appear in captions</label>
        <div className={s.grid3}>
          <div><span className={s.label}>Ella’s voice id (HeyGen)</span><input className={s.input} value={c.voiceId} onChange={e => set('voiceId', e.target.value.trim())} /></div>
          <div><span className={s.label}>Video budget a month (US$)</span>{numIn(c.budgets.videoUsdPerMonth, n => set('budgets', { ...c.budgets, videoUsdPerMonth: n }))}</div>
          <div><span className={s.label}>Cap per video (US$)</span>{numIn(c.budgets.maxUsdPerVideo, n => set('budgets', { ...c.budgets, maxUsdPerVideo: n }), 0.5)}</div>
        </div>
        <span className={s.label}>Posting slots ({c.timezone})</span>
        {c.slots.map((sl, i) => (
          <div key={i} className={s.row} style={{ marginBottom: 6 }}>
            <select className={`${s.select} ${s.inputSmall}`} style={{ width: 150 }} value={sl.dow} onChange={e => setSlot(i, { ...sl, dow: Number(e.target.value) })}>{DAYS.map((n, k) => <option key={k} value={k}>{n}</option>)}</select>
            <input className={`${s.input} ${s.inputTime}`} type="time" value={sl.time} onChange={e => setSlot(i, { ...sl, time: e.target.value })} />
            <button type="button" className={s.btn} onClick={() => set('slots', c.slots.filter((_, k) => k !== i))} disabled={c.slots.length <= 1}>Remove</button>
          </div>))}
        <button type="button" className={s.btn} onClick={() => set('slots', [...c.slots, { dow: 6, time: '11:00' }])} disabled={c.slots.length >= 7}>Add slot</button>
      </section>

      <section className={s.card}>
        <div className={s.cardHead}><h2>Approval and accounts</h2></div>
        <label className={s.check}><input type="checkbox" checked={!!c.autoApproveVideo} onChange={e => set('autoApproveVideo', e.target.checked)} /> Approve videos automatically when every check passes (otherwise you approve each one in Stage 2)</label>
        <div className={s.grid2}>
          <div><span className={s.label}>Instagram account name</span><input className={s.input} placeholder="account name, without @" value={c.handles?.instagram ?? ''} onChange={e => set('handles', { ...(c.handles ?? { instagram: '', tiktok: '' }), instagram: e.target.value.trim().replace(/^@/, '') })} /></div>
          <div><span className={s.label}>TikTok account name</span><input className={s.input} placeholder="account name, without @" value={c.handles?.tiktok ?? ''} onChange={e => set('handles', { ...(c.handles ?? { instagram: '', tiktok: '' }), tiktok: e.target.value.trim().replace(/^@/, '') })} /></div>
        </div>
      </section>

      <section className={s.card}>
        <div className={s.cardHead}><h2>Covers and feed: the brand book</h2><p>The cover designer (Opus) follows these rules for every video; code draws the colours, font and layout.</p></div>
        <pre className={s.copy} style={{ whiteSpace: 'pre-wrap' }}>{FEED_RULES}</pre>
      </section>

      <section className={s.card}>
        <div className={s.cardHead}><h2>Music</h2></div>
        <label className={s.check}><input type="checkbox" checked={c.music !== false} onChange={e => set('music', e.target.checked)} /> Quiet background music from HeyGen’s library (dips while Ella speaks)</label>
      </section>

      <div className={s.cols}>
        <section className={s.card}>
          <div className={s.cardHead}><h2>Instagram</h2></div>
          <label className={s.check}><input type="checkbox" checked={c.instagram.enabled} onChange={e => set('instagram', { ...c.instagram, enabled: e.target.checked })} /> Post to Instagram</label>
          <label className={s.check}><input type="checkbox" checked={c.instagram.mode === 'auto'} onChange={e => set('instagram', { ...c.instagram, mode: e.target.checked ? 'auto' : 'manual' })} /> Post automatically at the slot (otherwise you post by hand)</label>
          <label className={s.check}><input type="checkbox" checked={c.instagram.trialReels} onChange={e => set('instagram', { ...c.instagram, trialReels: e.target.checked })} /> Trial Reels (shown to non-followers first)</label>
          <label className={s.check}><input type="checkbox" checked={c.instagram.aiLabel} onChange={e => set('instagram', { ...c.instagram, aiLabel: e.target.checked })} /> Add Instagram’s AI label</label>
          <div className={s.grid2}>
            <div><span className={s.label}>Instagram account id</span><input className={s.input} value={c.ids.igUserId} onChange={e => set('ids', { ...c.ids, igUserId: e.target.value.trim() })} /></div>
            <div><span className={s.label}>Facebook Page id</span><input className={s.input} value={c.ids.fbPageId} onChange={e => set('ids', { ...c.ids, fbPageId: e.target.value.trim() })} /></div>
          </div>
        </section>
        <section className={s.card}>
          <div className={s.cardHead}><h2>TikTok</h2><span className={`${s.pill} ${d.tiktokConnected ? s.pillGood : ''}`}>{d.tiktokConnected ? 'Connected' : 'Not connected'}</span></div>
          <label className={s.check}><input type="checkbox" checked={c.tiktok.enabled} onChange={e => set('tiktok', { ...c.tiktok, enabled: e.target.checked })} /> Post to TikTok</label>
          <label className={s.check}><input type="checkbox" checked={c.tiktok.audited} onChange={e => set('tiktok', { ...c.tiktok, audited: e.target.checked })} /> TikTok approved our app (audit passed)</label>
          <label className={s.check}><input type="checkbox" checked={c.tiktok.mode === 'auto'} disabled={!c.tiktok.audited} onChange={e => set('tiktok', { ...c.tiktok, mode: e.target.checked ? 'auto' : 'manual' })} /> Post automatically (only after the audit; before it, posts would be private)</label>
          <label className={s.check}><input type="checkbox" checked={c.tiktok.aiLabel} onChange={e => set('tiktok', { ...c.tiktok, aiLabel: e.target.checked })} /> Mark as AI-generated</label>
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
          <div><span className={s.label}>Ad account id</span><input className={s.input} value={c.ids.adAccountId} onChange={e => set('ids', { ...c.ids, adAccountId: e.target.value.trim() })} /></div>
          <div><span className={s.label}>SVT WhatsApp number (+61...)</span><input className={s.input} value={c.ids.whatsappNumber} onChange={e => set('ids', { ...c.ids, whatsappNumber: e.target.value.trim() })} /></div>
          <div><span className={s.label}>Meta special ad category</span>
            <select className={s.select} value={c.ads.specialAdCategory} onChange={e => set('ads', { ...c.ads, specialAdCategory: e.target.value as EllaConfig['ads']['specialAdCategory'] })}>
              <option value="NONE">None</option><option value="FINANCIAL_PRODUCTS_SERVICES">Financial products and services</option></select></div>
        </div>
        <p className={s.note}>Meta may treat tax services as financial services. If it rejects an ad for that, switch the category; age targeting is then not allowed.</p>
      </section>

      <section className={s.card}>
        <div className={s.cardHead}><h2>Connections</h2><p>Keys live in Vercel only; this shows whether each is present.</p></div>
        <EnvList env={d.env} />
      </section>

      <section className={s.card}>
        <div className={s.cardHead}><h2>Account setup kit</h2><p>Copy into the Instagram and TikTok profiles (the platforms do not allow this by API)</p></div>
        <div className={s.grid2}>
          <div><span className={s.label}>Instagram name (searchable)</span><pre className={s.copy}>{KIT.igName}</pre>
            <span className={s.label}>Instagram bio ({KIT.igBio.length}/150)</span><pre className={s.copy}>{KIT.igBio}</pre></div>
          <div><span className={s.label}>TikTok bio ({KIT.ttBio.length}/80)</span><pre className={s.copy}>{KIT.ttBio}</pre>
            <span className={s.label}>Link in bio (opens WhatsApp with a first line)</span><pre className={s.copy}>{waLink || 'Add the SVT WhatsApp number above'}</pre></div>
        </div>
        <p className={s.note}>Profile photo: the Ella profile image (1080 x 1080). Use a Business account on Instagram linked to the SVT Facebook Page, and a Business account on TikTok. Keep these accounts for this brand only.</p>
      </section>
    </>
  )
}
