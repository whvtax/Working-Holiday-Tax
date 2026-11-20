'use client'
// Ella (Social Media, SVT) in Atlas. Every figure comes from the server
// (lib/ella/view.ts); every button posts one action to /api/atlas/ella/action
// and reloads the data. Nothing here holds a key or a token.
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { EllaConfig, Slot } from '@/lib/ella/config'
import type { EllaPageData, EllaPageResult } from '@/lib/ella/view'
import type { ProductionDetail } from '@/lib/ella/store'
import type { GroupStat } from '@/lib/ella/learn'
import { KIT } from '@/lib/ella/kit'
import s from './ella.module.css'

type Tab = 'overview' | 'review' | 'calendar' | 'promotion' | 'insights' | 'settings'
const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'overview', label: 'Overview' }, { id: 'review', label: 'Review' }, { id: 'calendar', label: 'Calendar' },
  { id: 'promotion', label: 'Promotion' }, { id: 'insights', label: 'Insights' }, { id: 'settings', label: 'Settings and setup' },
]
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
      const j = await res.json().catch(() => ({ ok: false, error: 'No answer' })) as { ok: boolean; error?: string }
      setToast({ text: j.ok ? okText : `Attention: ${j.error ?? 'failed'}`, err: !j.ok })
      if (j.ok) router.refresh()
      return j.ok
    } finally {
      setBusy(false)
      setTimeout(() => setToast(null), 5000)
    }
  }
  return { busy, toast, run }
}
type Run = ReturnType<typeof useAction>['run']

export default function EllaCentre({ data, initialTab, notice }: { data: EllaPageResult; initialTab: string; notice: string | null }) {
  const [tab, setTab] = useState<Tab>((TABS.some(t => t.id === initialTab) ? initialTab : 'overview') as Tab)
  const { busy, toast, run } = useAction()

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
  const reviewCount = data.reviews.length + data.ads.filter(a => a.status === 'proposed').length + data.posts.filter(p => p.status === 'manual_ready').length
  return (
    <div className={s.frame}><main className={s.page}>
      <Header on={data.config.enabled} />
      {notice && <p className={s.note}>{notice}</p>}
      <nav className={s.tabs} aria-label="Ella sections">
        {TABS.map(t => (
          <button key={t.id} type="button" className={`${s.tab} ${tab === t.id ? s.tabOn : ''}`} onClick={() => setTab(t.id)} aria-current={tab === t.id ? 'page' : undefined}>
            {t.label}{t.id === 'review' && reviewCount > 0 && <span className={s.badge}>{reviewCount}</span>}
          </button>
        ))}
      </nav>
      {tab === 'overview' && <Overview d={data} run={run} busy={busy} />}
      {tab === 'review' && <Review d={data} run={run} busy={busy} />}
      {tab === 'calendar' && <Calendar d={data} run={run} busy={busy} />}
      {tab === 'promotion' && <Promotion d={data} run={run} busy={busy} />}
      {tab === 'insights' && <Insights d={data} />}
      {tab === 'settings' && <Settings d={data} run={run} busy={busy} />}
      {toast && <div role="status" className={`${s.toast} ${toast.err ? s.toastErr : ''}`}>{toast.text}</div>}
    </main></div>
  )
}

function Header({ on }: { on: boolean }) {
  return (
    <header className={s.top}>
      <div className={s.title}>
        <span className={s.dot} />
        <h1>Social Media (SVT) · Ella</h1>
        <span className={`${s.state} ${on ? s.stateOn : ''}`}>{on ? 'Running' : 'Switched off'}</span>
      </div>
      <a href="/atlas">Back to Atlas</a>
    </header>
  )
}

// ── Overview ──────────────────────────────────────────────────────────────
function Overview({ d, run, busy }: { d: EllaPageData; run: Run; busy: boolean }) {
  const tz = d.config.timezone
  const followers = (d.followers.instagram ?? 0) + (d.followers.tiktok ?? 0)
  const pct = Math.min(100, (followers / d.followers.goal) * 100)
  const vidPct = Math.min(100, (d.money.videoUsdMonth / Math.max(d.config.budgets.videoUsdPerMonth, 1)) * 100)
  const published30 = d.posts.filter(p => p.status === 'published' && p.publishedAt && Date.parse(d.now) - Date.parse(p.publishedAt) < 30 * 86400000)
  const libLeft = d.dashboard.library.total - d.dashboard.library.used
  return (
    <>
      <section className={s.card}>
        <div className={s.tiles}>
          <div className={s.tile}><span className={s.tileKey}>Followers (goal 10k)</span><span className={s.tileValue}>{d.followers.instagram == null && d.followers.tiktok == null ? '-' : followers.toLocaleString('en-AU')}</span>
            <div className={s.bar}><div className={s.barFill} style={{ width: `${pct}%` }} /></div>
            <span className={s.tileSub}>IG {d.followers.instagram ?? '-'} · TikTok {d.followers.tiktok ?? '-'}</span></div>
          <div className={s.tile}><span className={s.tileKey}>Posts, last 30 days</span><span className={s.tileValue}>{published30.length}</span><span className={s.tileSub}>Plan {d.config.slots.length} a week</span></div>
          <div className={s.tile}><span className={s.tileKey}>Waiting for you</span><span className={`${s.tileValue} ${d.reviews.length ? s.attn : ''}`}>{d.reviews.length}</span><span className={s.tileSub}>Scripts and videos</span></div>
          <div className={s.tile}><span className={s.tileKey}>Video spend this month</span><span className={s.tileValue}>{money(d.money.videoUsdMonth, 'USD')}</span>
            <div className={s.bar}><div className={`${s.barFill} ${vidPct > 85 ? s.barFillWarn : ''}`} style={{ width: `${vidPct}%` }} /></div>
            <span className={s.tileSub}>of {money(d.config.budgets.videoUsdPerMonth, 'USD')}</span></div>
          <div className={s.tile}><span className={s.tileKey}>Promotion this month</span><span className={s.tileValue}>{money(d.money.adsAudMonthCommitted, 'AUD')}</span><span className={s.tileSub}>cap {money(d.config.ads.monthlyCapAud, 'AUD')}{d.config.ads.enabled ? '' : ' · off'}</span></div>
          <div className={s.tile}><span className={s.tileKey}>Blogs not used yet</span><span className={`${s.tileValue} ${libLeft < 10 ? s.attn : ''}`}>{libLeft}</span><span className={s.tileSub}>of {d.dashboard.library.total}</span></div>
        </div>
      </section>

      <div className={s.cols}>
        <section className={s.card}>
          <div className={s.cardHead}><h2>Needs attention</h2>
            <button type="button" className={s.btn} disabled={busy} onClick={() => run({ kind: 'run_now' }, 'Ella ran once')}>Run now</button></div>
          {d.dashboard.alerts.length === 0 ? <p className={s.empty}>All clear.</p> : (
            <ul className={s.list}>{d.dashboard.alerts.map(a => (
              <li key={a.id} className={s.item}>
                <div className={s.itemMain}>
                  <span className={`${s.itemTitle} ${a.kind === 'review' ? '' : s.attn}`} style={{ whiteSpace: 'normal' }}>{a.kind === 'review' ? a.message : `Attention: ${a.message}`}</span>
                  <span className={s.itemSub}>{fmtTime(a.createdAt, tz)}</span></div>
                <button type="button" className={s.btn} disabled={busy} onClick={() => run({ kind: 'resolve_alert', alertId: a.id }, 'Cleared')}>Clear</button>
              </li>))}</ul>
          )}
        </section>
        <section className={s.card}>
          <div className={s.cardHead}><h2>In the pipeline</h2><p>Next slots: {d.nextSlots.slice(0, 3).map(x => fmtTime(x, tz)).join(', ')}</p></div>
          {d.dashboard.queue.length === 0 ? <p className={s.empty}>Nothing yet. {d.config.enabled ? 'Ella draws the next blog on her next run.' : 'Switch Ella on in Settings to start.'}</p> : (
            <ul className={s.list}>{d.dashboard.queue.map(q => (
              <li key={q.id} className={s.item}>
                <div className={s.itemMain}><span className={s.itemTitle}>{q.title ?? q.slug}</span><span className={s.itemSub}>{q.pillar}{q.hookType ? ` · ${q.hookType}` : ''}</span></div>
                <span className={`${s.pill} ${['needs_jo', 'video_needs_jo'].includes(q.status) ? s.pillAttn : q.status === 'video_ready' ? s.pillGood : ''}`}>{STATUS_TEXT[q.status] ?? q.status}</span>
              </li>))}</ul>
          )}
        </section>
      </div>

      <section className={s.card}>
        <div className={s.cardHead}><h2>Recent activity</h2></div>
        <table className={s.table}><tbody>
          {d.dashboard.recentAudit.slice(0, 12).map((a, i) => (
            <tr key={i}><td style={{ width: 150 }}>{fmtTime(a.at, tz)}</td><td style={{ width: 70 }}>{a.actor}</td><td>{a.action.replace(/_/g, ' ')}</td></tr>
          ))}
        </tbody></table>
      </section>
    </>
  )
}

// ── Review ────────────────────────────────────────────────────────────────
function Review({ d, run, busy }: { d: EllaPageData; run: Run; busy: boolean }) {
  if (!d.reviews.length && !d.producing.length) return <section className={s.card}><p className={s.empty}>Nothing waiting for you. New videos appear here before anything is posted.</p></section>
  return (
    <>
      {d.reviews.map(p => p.render && ['video_ready', 'video_needs_jo'].includes(p.status)
        ? <VideoReview key={p.id} p={p} d={d} run={run} busy={busy} />
        : <ScriptReview key={p.id} p={p} run={run} busy={busy} />)}
      {d.producing.map(p => (
        <section key={p.id} className={s.card}><div className={s.cardHead}><h2>{p.title ?? p.slug}</h2><span className={s.pill}>Making video · {money(p.spentUsd, 'USD')} so far</span></div></section>
      ))}
    </>
  )
}

interface QaIssue { second: number | null; scene: number | null; check: string; problem: string; severity: 'block' | 'warn' }
interface SceneLite { scene: number; voice: string; onScreen: string; visual: string; ellaInFrame: boolean }
interface DraftLite { scenes: SceneLite[]; captions: { instagram: string; tiktok: string }; hookType: string; ctaType: string; coreMessage: string }

function VideoReview({ p, d, run, busy }: { p: ProductionDetail; d: EllaPageData; run: Run; busy: boolean }) {
  const draft = p.script?.script as DraftLite
  const qa = (p.render?.qa ?? []) as QaIssue[]
  const [ig, setIg] = useState(draft.captions.instagram)
  const [tt, setTt] = useState(draft.captions.tiktok)
  const [scene, setScene] = useState<number>(draft.scenes[0]?.scene ?? 1)
  const blocks = qa.filter(q => q.severity === 'block')
  return (
    <section className={s.card}>
      <div className={s.cardHead}><h2>{p.title ?? p.slug}</h2>
        <span className={`${s.pill} ${blocks.length ? s.pillAttn : s.pillGood}`}>{blocks.length ? `Attention: ${blocks.length} problem${blocks.length > 1 ? 's' : ''} found` : 'Checks passed'}</span></div>
      <div className={s.review}>
        <div>
          <video className={s.video} src={mediaUrl(p.render!.videoPath)} controls playsInline preload="metadata" />
          <p className={s.note}>{p.render!.durationSec}s · {p.hookType} hook · {p.ctaType} CTA · cost {money(p.spentUsd, 'USD')}</p>
        </div>
        <div>
          <span className={s.label}>Quality check</span>
          {qa.length === 0 ? <p className={s.empty}>No problems found.</p> : (
            <ul className={s.qa}>{qa.map((q, i) => (
              <li key={i}><span className={s.sec}>{q.second == null ? 'whole' : `${q.second.toFixed(1)}s`}</span>
                <span className={q.severity === 'block' ? s.attn : undefined}>{q.scene != null ? `Scene ${q.scene}: ` : ''}{q.problem}</span></li>))}</ul>
          )}
          <span className={s.label}>Instagram caption</span>
          <textarea className={s.textarea} value={ig} onChange={e => setIg(e.target.value)} />
          <span className={s.label}>TikTok caption</span>
          <textarea className={s.textarea} style={{ minHeight: 70 }} value={tt} onChange={e => setTt(e.target.value)} />
          <p className={s.note}>Goes out at the next free slot ({fmtTime(d.nextSlots[0], d.config.timezone)} or later). Captions keep the line “General information only, not tax advice.”</p>
          <div className={s.row} style={{ marginTop: 12 }}>
            <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy}
              onClick={() => run({ kind: 'approve_video', productionId: p.id, captions: { instagram: ig, tiktok: tt } }, 'Approved and scheduled')}>Approve and schedule</button>
            <select className={`${s.select} ${s.inputSmall}`} value={scene} onChange={e => setScene(Number(e.target.value))} aria-label="Scene to redo">
              {draft.scenes.map(sc => <option key={sc.scene} value={sc.scene}>Scene {sc.scene}</option>)}
            </select>
            <button type="button" className={s.btn} disabled={busy} onClick={() => run({ kind: 'redo_scene', productionId: p.id, scene }, `Scene ${scene} will be made again`)}>Redo this scene</button>
            <button type="button" className={`${s.btn} ${s.btnDanger}`} disabled={busy} onClick={() => run({ kind: 'cancel', productionId: p.id }, 'Cancelled')}>Cancel video</button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScriptReview({ p, run, busy }: { p: ProductionDetail; run: Run; busy: boolean }) {
  const draft = p.script?.script as DraftLite | undefined
  const allIssues = (p.script?.issues ?? []) as Array<{ code: string; message: string; scene?: number; severity?: 'warn' }>
  const issues = allIssues.filter(i => i.severity !== 'warn')
  const tips = allIssues.filter(i => i.severity === 'warn')
  return (
    <section className={s.card}>
      <div className={s.cardHead}><h2>{p.title ?? p.slug}</h2>
        <span className={`${s.pill} ${p.status === 'needs_jo' ? s.pillAttn : ''}`}>{STATUS_TEXT[p.status]}</span></div>
      {issues.length > 0 && <ul className={s.qa}>{issues.map((i, k) => <li key={k}><span className={s.sec}>{i.scene ? `S${i.scene}` : ''}</span><span className={s.attn}>{i.message}</span></li>)}</ul>}
      {tips.length > 0 && <><p className={s.muted}>Flow tips (the script still passes):</p><ul className={s.qa}>{tips.map((i, k) => <li key={k}><span className={s.sec}>{i.scene ? `S${i.scene}` : ''}</span><span>{i.message}</span></li>)}</ul></>}
      {draft && (
        <table className={s.table} style={{ marginTop: 10 }}>
          <thead><tr><th>#</th><th>Ella says</th><th>On screen</th><th>Picture</th></tr></thead>
          <tbody>{draft.scenes.map(sc => (
            <tr key={sc.scene}><td>{sc.scene}</td><td>{sc.voice}</td><td>{sc.onScreen}</td><td>{sc.ellaInFrame ? 'Ella' : sc.visual}</td></tr>))}</tbody>
        </table>
      )}
      <div className={s.row} style={{ marginTop: 12 }}>
        {p.status === 'needs_jo' && <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy} onClick={() => run({ kind: 'approve_script', productionId: p.id }, 'Script approved; Ella will make the video')}>Approve script anyway</button>}
        {p.status === 'video_needs_jo' && <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy} onClick={() => run({ kind: 'retry_video', productionId: p.id }, 'Ella will try again on her next run')}>Make the video again</button>}
        {p.note && <span className={s.itemSub}>{p.note}</span>}
        <button type="button" className={`${s.btn} ${s.btnDanger}`} disabled={busy} onClick={() => run({ kind: 'cancel', productionId: p.id }, 'Cancelled')}>Cancel</button>
      </div>
    </section>
  )
}

// ── Calendar ──────────────────────────────────────────────────────────────
function Calendar({ d, run, busy }: { d: EllaPageData; run: Run; busy: boolean }) {
  const tz = d.config.timezone
  const [urls, setUrls] = useState<Record<string, string>>({})
  const manual = d.posts.filter(p => p.status === 'manual_ready')
  const upcoming = d.posts.filter(p => ['scheduled', 'publishing'].includes(p.status)).sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))
  const done = d.posts.filter(p => ['published', 'failed', 'cancelled'].includes(p.status))
  return (
    <>
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
                  <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={busy || !urls[p.id]} onClick={() => run({ kind: 'mark_posted', postId: p.id, url: urls[p.id] }, 'Marked as posted')}>I posted it</button>
                </div>
                <p className={s.note}>On TikTok, turn on “AI-generated content” in More options before posting.</p>
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
                {p.status === 'scheduled' && <button type="button" className={s.btn} disabled={busy} onClick={() => run({ kind: 'publish_now', postId: p.id }, 'Will post on the next run')}>Post now</button>}
              </div>
            </li>))}</ul>
        )}
      </section>
      <section className={s.card}>
        <div className={s.cardHead}><h2>Posted</h2></div>
        {done.length === 0 ? <p className={s.empty}>No posts yet.</p> : (
          <table className={s.table}><thead><tr><th>When</th><th>Where</th><th>Video</th><th>Status</th></tr></thead><tbody>
            {done.map(p => (
              <tr key={p.id}><td>{fmtTime(p.publishedAt ?? p.scheduledAt, tz)}</td><td>{p.platform === 'tiktok' ? 'TikTok' : 'Instagram'}</td>
                <td>{p.permalink ? <a href={p.permalink} target="_blank" rel="noreferrer">{p.title ?? p.slug}</a> : (p.title ?? p.slug)}</td>
                <td className={p.status === 'failed' ? s.attn : undefined}>{p.status === 'failed' ? `Attention: ${p.error ?? 'failed'}` : p.status}</td></tr>))}
          </tbody></table>
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

function Insights({ d }: { d: EllaPageData }) {
  const L = d.learnings
  return (
    <>
      <section className={s.card}>
        <div className={s.cardHead}><h2>What Ella has learned</h2><p>Score = sends, saves, follows and comments per 1,000 people reached</p></div>
        <p style={{ margin: 0 }}>{L.summary || `Ella needs at least 6 videos with 3 days of numbers before she draws conclusions (now ${L.videos}).`}</p>
        <p className={s.note}>This goes into every new script as a tie-breaker. The script rules always come first.</p>
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
        <label className={s.check}><input type="checkbox" checked={c.autoProduce} onChange={e => set('autoProduce', e.target.checked)} /> Make the video as soon as a script passes every check (you still approve every video)</label>
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
