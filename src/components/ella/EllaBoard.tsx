'use client'
// The production board: stage 1 (scripts) and stage 2 (videos), each with its
// own buttons, and the run bar that stays on top across tabs until a stage
// ends. Progress comes from the server (lib/ella/view.ts loadBoard): saved
// studio stages for scripts, the paid-step ledger for videos.
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { EllaPageData } from '@/lib/ella/view'
import type { ProductionDetail } from '@/lib/ella/store'
import s from './ella.module.css'

export type JobKind = 'write_script' | 'continue_script' | 'make_video'
export interface Job { kind: JobKind; productionId?: string; start: number; runs: number; last: string }
type Toast = (t: { text: string; err: boolean }) => void

/** The stop of the run in progress (null when none). Stop and Cancel call it. */
let stopRequest: (() => void) | null = null
export function stopRunner() { stopRequest?.() }

/**
 * Runs one stage to its end: calls the server again while it reports more to
 * do (each call stops before the server's 5 minute limit). A call that runs
 * out of time is simply repeated; saved work is never paid for twice.
 */
export function useRunner(toast: Toast) {
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  // A failure stays on screen (in the red banner) until Jo clears it.
  const [error, setError] = useState<string | null>(null)
  const fail = (text: string) => { setError(text); toast({ text, err: true }) }
  const start = async (kind: JobKind, productionId?: string) => {
    if (job) return
    let body: Record<string, unknown> = { kind, productionId }
    // The kind of the call in hand: after the script hands off to the video, calls are make_video, not write_script again.
    let cur: JobKind = kind
    const j: Job = { kind, productionId, start: Date.now(), runs: 0, last: '' }
    setJob(j)
    // Jo, Nov 22: Stop ends this loop at once and aborts the request in hand; the server halts its own work too.
    let stop = false
    // Why this browser loop ended, written to the Log when it does (Jo, Nov 22). No line means the page went away first.
    let endReason = 'the loop ended without a reason'
    const ctrl = new AbortController()
    stopRequest = () => { stop = true; ctrl.abort() }
    try {
      // No cap on the calls (Jo, Nov 22): the run goes on until it is done or Stop is pressed. The limit is only a safety net against a loop that makes no progress.
      for (let i = 0; !stop && i < 2000; i++) {
        let res: Response
        try { res = await fetch('/api/atlas/ella/action', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal }) }
        catch { if (stop) break; endReason = 'connection to the server dropped'; fail(`${label(kind)}: the connection to the server dropped. Ella carries on in the background; refresh in a minute.`); break }
        router.refresh()
        // A server that stopped without a readable answer (a crash, out of memory, or the time limit) is not a failed step:
        // every finished step is saved, so the next call carries on from the same place.
        const readable = res.headers.get('content-type')?.includes('application/json') ?? false
        if (res.status === 502 || res.status === 504 || (res.status === 500 && !readable)) { setJob(x => x && { ...x, runs: i + 1, last: 'The server stopped part way; carrying on from the saved work' }); body = next(kind, body); continue }
        const r = await res.json().catch(() => ({ ok: false, error: `No readable answer (HTTP ${res.status})` })) as
          { ok: boolean; error?: string; detail?: { more?: boolean; steps?: Array<{ step: string; ok: boolean; detail: string }> } }
        if (!r.ok) { endReason = `server answered not ok: ${r.error ?? 'no reason given'}`; fail(`${label(kind)} failed: ${r.error ?? 'no reason given'}`); break }
        const steps = r.detail?.steps ?? []
        const failed = steps.filter(x => !x.ok)
        const said = (failed.length ? failed : steps).map(x => x.detail).filter(Boolean).join(' · ')
        if (failed.length) { endReason = `a step failed: ${said}`; fail(`${label(kind)} failed: ${said}`); break }
        if (!r.detail?.more) { endReason = 'server said nothing more to do'; toast({ text: said || 'Done', err: false }); break }
        setJob(x => x && { ...x, runs: i + 1, last: said })
        // After the script is approved, the next call makes its video (same Start, no extra click).
        const vid = said.match(/^Video next: (\S+)/)
        if (vid) cur = 'make_video'
        body = vid ? { kind: 'make_video', productionId: vid[1] } : next(cur, body)
        // HeyGen needs time between checks; scripts go straight on.
        if (cur === 'make_video') await new Promise(ok => setTimeout(ok, 2000))
      }
    } finally {
      if (stop) endReason = 'stopped by Stop or Cancel'
      // The reason goes to the Log (a fresh line per run); if it is missing, the page closed or reloaded first.
      void fetch('/api/atlas/ella/action', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'client_end', reason: endReason, runKind: kind, productionId: productionId ?? null }) }).catch(() => undefined)
      stopRequest = null
      setJob(null)
      router.refresh()
    }
  }
  return { job, start, error, clearError: () => setError(null) }
}

const label = (k: JobKind) => (k === 'make_video' ? 'Making the video' : 'Writing the script')

/** After the first run, "write a new script" only carries on the one it started. */
const next = (kind: JobKind, body: Record<string, unknown>) => (kind === 'write_script' ? { kind: 'continue_script' } : body)

const mmss = (ms: number) => { const t = Math.max(0, Math.floor(ms / 1000)); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}` }

/** The bar on top of every tab while a stage runs. */
export function RunnerBar({ job, d }: { job: Job; d: EllaPageData }) {
  const [now, setNow] = useState(job.start)
  const router = useRouter()
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  // A run can last minutes; the board reloads every 10 s so the bar follows the real work, not a guess.
  useEffect(() => { const t = setInterval(() => router.refresh(), 10_000); return () => clearInterval(t) }, [router])
  const video = job.kind === 'make_video'
  const item = video
    ? d.board.videos.find(v => v.id === job.productionId) ?? d.board.videos[0]
    : d.board.scripts.find(x => x.id === job.productionId) ?? [...d.board.scripts].sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0]
  const pct = item?.pct ?? 1
  const title = item?.title ?? (video ? 'Starting the video' : 'Choosing a blog')
  const stage = !item ? (video ? 'Sending to HeyGen' : 'Choosing a blog and starting the research') : 'label' in item ? `Next: ${item.label} · stage ${Math.min(item.stagesDone + 1, item.stagesPlanned)} of ${item.stagesPlanned}` : `${item.done} of ${item.total} steps done · US$${item.spentUsd.toFixed(2)} so far`
  return (
    <div className={s.runner} role="status" aria-live="polite">
      <span className={s.spinner} aria-hidden="true" />
      <div className={s.runProgMain}>
        <div className={s.runProgHead}><strong>{video ? 'Making the video' : 'Writing the script'}: {title}</strong><span>{pct}% · {mmss(now - job.start)}</span></div>
        <div className={s.bar}><div className={s.barFill} style={{ width: `${pct}%` }} /></div>
        <span className={s.tileSub}>{stage}{job.last ? ` · ${job.last}` : ''}. Keep this page open until it ends.</span>
      <button type="button" className={`${s.btn} ${s.btnDanger}`} onClick={() => { stopRunner(); void fetch('/api/atlas/ella/action', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'stop_all' }) }).then(() => router.refresh()) }}>Stop</button>
      </div>
    </div>
  )
}

/** The time since a run started; the board reloads every 10 s so the points follow the real work. */
function Clock({ since }: { since: number }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  return <> · {mmss(now - since)}</>
}

/** "12 s", "3:05": how long ago something was saved, ticking every second. */
function Ago({ since }: { since: number }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  return <>{mmss(now - since)}</>
}

/** A row of points, one per stage, two words each; a point fills green when its stage is done. */
export function Stepper({ steps }: { steps: Array<{ label: string; status: 'waiting' | 'working' | 'done' | 'failed'; startedAt?: string; endedAt?: string }> }) {
  return (
    <ol className={s.points}>
      {steps.map((st, i) => (
        <li key={i} className={`${s.point} ${st.status === 'done' ? s.pointDone : st.status === 'working' ? s.pointNow : st.status === 'failed' ? s.pointFail : ''}`}>
          <span className={s.pointDot} aria-hidden="true" />
          <span className={s.pointLabel}>{st.label}{st.startedAt && <span className={s.itemSub}> · {clock(st.startedAt)}{st.endedAt ? ` · ${took(st.startedAt, st.endedAt)}` : ' · running'}</span>}</span>
          <span className={s.srOnly}>{st.status}</span>
        </li>
      ))}
    </ol>
  )
}

const SCRIPT_POINTS: Array<{ phase: string; label: string }> = [
  { phase: 'research', label: 'Research facts' }, { phase: 'draftA', label: 'Draft A' }, { phase: 'draftB', label: 'Draft B' },
  { phase: 'judge', label: 'Judge review' }, { phase: 'revise', label: 'Fix script' }, { phase: 'panel', label: 'Visual panel' },
  { phase: 'direct', label: 'Director shots' }, { phase: 'caption', label: 'Keyword research' }, { phase: 'advocate', label: "Devil's advocate" },
]
export function scriptSteps(x: { phase: string; log: Array<{ phase: string; ok: boolean }> }) {
  const order = SCRIPT_POINTS.map(p => p.phase)
  const at = x.phase === 'done' ? order.length : Math.max(0, order.indexOf(x.phase))
  const fixed = x.log.some(l => l.phase === 'revise') || x.phase === 'revise'
  // If the studio gave up, the stage that broke shows red, not green.
  const last = x.log.at(-1)
  const broke = x.phase === 'done' && last && !last.ok ? last.phase : null
  return SCRIPT_POINTS.filter(p => p.phase !== 'revise' || fixed).map(p => {
    const i = order.indexOf(p.phase)
    if (broke && p.phase === broke) return { label: p.label, status: 'failed' as const }
    return { label: p.label, status: (i < at ? 'done' : i === at ? 'working' : 'waiting') as 'done' | 'working' | 'waiting' }
  })
}

/** The video steps, in order, shown from Start so the whole line is visible before the video exists. */
const VIDEO_LABELS = ['HeyGen', 'Render the video', 'Quality check', 'Ready to post']
/** Start to a ready video: the script stages, then the video stages (waiting until the script is done). */
export function pipelineSteps(x: { phase: string; log: Array<{ phase: string; ok: boolean }> }) {
  return [...scriptSteps(x), ...VIDEO_LABELS.map(label => ({ label, status: 'waiting' as const }))]
}

// ── Stage 1: scripts ──────────────────────────────────────────────────────

/** Seconds of a script, from its last scene. */
const scriptSeconds = (p: ProductionDetail) => {
  const sc = (p.script?.script as { scenes?: Array<{ end?: number; voice?: string }> } | undefined)?.scenes ?? []
  return { seconds: Math.round(Number(sc[sc.length - 1]?.end ?? 0)), hook: String(sc[0]?.voice ?? ''), opening: sc.slice(1, 4).map(x => x.voice).join(' ') }
}
const LIB_STATUS: Record<string, { text: string; cls: string }> = {
  script_ready: { text: 'Ready for you', cls: 'pillOk' }, needs_jo: { text: 'Needs a look', cls: 'pillWarn' }, approved: { text: 'Approved', cls: 'pillOk' },
}

export function ScriptsBoard({ d, job, start, review, run, busy }: { d: EllaPageData; job: Job | null; start: (k: JobKind, id?: string) => void; review: (p: ProductionDetail) => React.ReactNode; run: (body: Record<string, unknown>, okText?: string) => unknown; busy: boolean }) {
  const library = d.reviews.filter(p => ['script_ready', 'needs_jo', 'approved'].includes(p.status))
  const [open, setOpen] = useState<string | null>(null)
  const router = useRouter()
  // While scripts are being written, fetch the saved progress every 10 seconds.
  const writing = d.board.scripts.length > 0
  useEffect(() => { if (!writing) return; const t = setInterval(() => router.refresh(), 10_000); return () => clearInterval(t) }, [router, writing])
  return (
    <>
      <section className={s.card}>
        <div className={s.cardHead}>
          <div><h2>Scripts</h2><p>Each script goes through research, writing and a strict review, and is rewritten until it passes.</p></div>
          <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={!!job} onClick={() => start('write_script')}>Write a new script</button>
        </div>
        {d.board.scripts.map(x => (
          <div key={x.id} className={s.stageCard}>
            <div className={s.runProgHead}><strong>{job && job.kind !== 'make_video' && <span className={s.spinner} aria-hidden="true" />}{x.title}</strong><span>{x.pct}%<Clock since={Date.parse(x.startedAt)} /></span></div>
            <Stepper steps={pipelineSteps(x)} />
            {x.runningSince
              ? <p className={s.note}>Working on {x.label} for <Ago since={Date.parse(x.runningSince)} />. If this does not change, the next run retries this step.</p>
              : <p className={s.note}>Waiting for the next step. Last saved <Ago since={Date.parse(x.updatedAt)} /> ago.</p>}
            <div className={s.row} style={{ marginTop: 10 }}>
              {!job && <button type="button" className={s.btn} onClick={() => start('continue_script', x.id)}>Continue</button>}
              <button type="button" className={`${s.btn} ${s.btnDanger}`} disabled={busy} onClick={() => { stopRunner(); run({ kind: 'cancel', productionId: x.id }, 'Stopped. Everything in progress is cancelled; the blogs go back into the draw') }}>Cancel</button>
              {!job && <span className={s.itemSub}>It also carries on by itself every 5 minutes.</span>}
            </div>
          </div>
        ))}
      </section>

      <section className={s.card}>
        <div className={s.cardHead}><div><h2>Script library ({library.length})</h2><p>Click a script to read it. “Send to HeyGen” starts its video in stage 2. “Approve, send later” keeps it ready. “Cancel” returns the blog to the queue.</p></div></div>
        {library.length === 0 ? <p className={s.empty}>No finished scripts yet.</p> : (
          <div className={s.libGrid}>
            {library.map(p => {
              const x = scriptSeconds(p)
              const st = LIB_STATUS[p.status] ?? { text: p.status, cls: '' }
              const isOpen = open === p.id
              return (
                <div key={p.id} className={`${s.libCard} ${isOpen ? s.libOpen : ''}`}>
                  {isOpen ? (
                    <>
                      <div className={s.row} style={{ justifyContent: 'flex-start', marginBottom: 8 }}><button type="button" className={s.btn} style={{ fontSize: 13, padding: '6px 12px' }} onClick={() => setOpen(null)}>← Close</button></div>
                      <div>{review(p)}</div>
                    </>
                  ) : (
                    <>
                      <button type="button" className={s.libHead} onClick={() => setOpen(p.id)} aria-expanded={false}>
                        <span className={s.libTop}><span className={`${s.pill} ${s[st.cls] ?? ''}`}>{st.text}</span><span className={s.libLen}>{x.seconds ? `${x.seconds}s` : ''}</span></span>
                        <span className={s.libHook}>“{x.hook || p.title}”</span>
                        <span className={s.libOpening}>{x.opening}</span>
                      </button>
                      <div className={s.row} style={{ marginTop: 10 }}>
                        {!d.config.autoApproveVideo && <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={!!job} onClick={() => start('make_video', p.id)}>Send to HeyGen</button>}
                        <button type="button" className={s.btn} onClick={() => setOpen(p.id)}>Read script</button>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}

// ── Stage 2: videos ───────────────────────────────────────────────────────
export function VideosBoard({ d, job, start, review }: { d: EllaPageData; job: Job | null; start: (k: JobKind, id?: string) => void; review: (p: ProductionDetail) => React.ReactNode }) {
  const making = d.board.videos.filter(v => d.dashboard.queue.find(q => q.id === v.id)?.status === 'producing')
  // While videos are being made, fetch the saved progress every 10 seconds, so the steps move on screen.
  const router = useRouter()
  useEffect(() => { if (!making.length) return; const t = setInterval(() => router.refresh(), 10_000); return () => clearInterval(t) }, [router, making.length])
  const waiting = d.reviews.filter(p => (p.status === 'video_ready' || p.status === 'video_needs_jo') && p.render)
  const [openVid, setOpenVid] = useState<string | null>(null)
  const stopped = d.reviews.filter(p => p.status === 'video_needs_jo' && !p.render)
  const retry = async (id: string) => {
    await fetch('/api/atlas/ella/action', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'retry_video', productionId: id }) })
    start('make_video', id)
  }
  return (
    <>
      <section className={s.card}>
        <div className={s.cardHead}><div><h2>Videos in production</h2><p>Who does what: HeyGen makes the voice, Ella and the clips. The video is rendered with its subtitles as they are, then Claude checks the frames. Each step is shown in order, saved when done, and never paid for twice.</p></div></div>
        {making.length === 0 ? <p className={s.empty}>No video is being made. Press “Send to HeyGen” on a script in Stage 1.</p> : making.map(v => (
          <div key={v.id} className={s.stageCard}>
            <div className={s.runProgHead}><strong>{job?.kind === 'make_video' && <span className={s.spinner} aria-hidden="true" />}{v.title}</strong><span>{v.pct}% · US${v.spentUsd.toFixed(2)}{job?.kind === 'make_video' ? <Clock since={job.start} /> : null}</span></div>
            <Stepper steps={[...(v.studio ? scriptSteps(v.studio) : []), ...v.steps]} />
            {!job && <div className={s.row} style={{ marginTop: 10 }}>
              <button type="button" className={s.btn} onClick={() => start('make_video', v.id)}>Continue</button>
              <span className={s.itemSub}>It also carries on by itself every 5 minutes.</span>
            </div>}
          </div>
        ))}
      </section>
      {stopped.length > 0 && (
        <section className={s.card}>
          <div className={s.cardHead}><div><h2>Stopped ({stopped.length})</h2><p>Something went wrong while making these. Try again: finished shots are kept and never paid twice.</p></div></div>
          <ul className={s.list}>{stopped.map(p => (
            <li key={p.id} className={s.item}>
              <div className={s.itemMain}><span className={s.itemTitle}>{p.title ?? p.slug}</span><span className={s.itemSub}>{p.note ?? ''}</span></div>
              <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={!!job} onClick={() => retry(p.id)}>Try again</button>
            </li>))}</ul>
        </section>
      )}

      <section className={s.card}>
        <div className={s.cardHead}><div><h2>Finished videos ({waiting.length})</h2><p>Edited and checked by Claude. Click a video to watch it, approve it or edit it.</p></div></div>
        {waiting.length === 0 ? <p className={s.empty}>No finished videos waiting.</p> : (
          <div className={s.libGrid}>
            {waiting.map(p => {
              const isOpen = openVid === p.id
              const cover = p.render?.videoPath ? `/api/atlas/ella/media?path=${encodeURIComponent(p.render.videoPath.replace(/final-(\d+)\.mp4$/, 'cover-$1.jpg'))}` : null
              return (
                <div key={p.id} className={`${s.libCard} ${isOpen ? s.libOpen : ''}`}>
                  <button type="button" className={s.libHead} onClick={() => setOpenVid(isOpen ? null : p.id)} aria-expanded={isOpen}>
                    {!isOpen && cover && (
                      <span className={s.asSeen}>
                        <span className={s.asReel}><img src={cover} alt="The cover as a Reel" loading="lazy" /><span className={s.asTag}>Reel</span></span>
                        <span className={s.asGrid}><img src={cover} alt="The cover in the profile grid" loading="lazy" /><span className={s.asTag}>Grid</span></span>
                      </span>
                    )}
                    <span className={s.libTop}><span className={`${s.pill} ${p.status === 'video_ready' ? s.pillOk : s.pillWarn}`}>{p.status === 'video_ready' ? 'Ready to approve' : 'Needs a look'}</span><span className={s.libLen}>{p.render ? `${Math.round(p.render.durationSec)}s` : ''}</span></span>
                    <span className={s.libHook}>{p.title ?? p.slug}</span>
                  </button>
                  {isOpen && <div className={s.libBody}>{review(p)}</div>}
                </div>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}

export const STEP_NAME: Record<string, string> = { voice: "Ella's voice", ella_scene: 'Ella talking', clip: 'AI clip', render: 'Render the video', qa: 'Quality check' }
const clock = (iso?: string) => (iso ? new Date(iso).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Australia/Sydney' }) : '-')
const took = (a?: string, b?: string) => (a && b ? `${Math.max(0, Math.round((Date.parse(b) - Date.parse(a)) / 1000))} s` : '-')

/** Every step of one video: what ran, when, how long, what it cost and any error. Downloads as a file. */
export function HistoryPanel({ title, slug, steps }: { title: string; slug: string; steps: EllaPageData['history'][string] }) {
  const total = steps.reduce((a, x) => a + (x.costUsd ?? 0), 0)
  const download = () => {
    const blob = new Blob([JSON.stringify({ title, slug, generatedAt: new Date().toISOString(), totalCostUsd: Number(total.toFixed(2)), steps }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `ella-history-${slug}.json`; a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return (
    <details className={s.more} style={{ marginTop: 10 }}>
      <summary>History of this video ({steps.length} steps, US${total.toFixed(2)})</summary>
      {steps.length === 0 ? <p className={s.note}>No steps recorded yet.</p> : (
        <>
          <table className={s.table}>
            <thead><tr><th>Step</th><th>Scene</th><th>Try</th><th>Started</th><th>Took</th><th>Cost</th><th>Result</th></tr></thead>
            <tbody>{steps.map((x, i) => (
              <tr key={i}><td>{STEP_NAME[x.kind] ?? x.kind}</td><td>{x.scene || '-'}</td><td>{x.attempt}</td><td>{clock(x.createdAt)}</td>
                <td>{x.status === 'submitted' || x.status === 'pending' ? 'running' : took(x.createdAt, x.updatedAt)}</td>
                <td>{x.costUsd == null ? '-' : `US$${x.costUsd.toFixed(2)}`}</td>
                <td>{x.error ? <span className={s.attn}>{x.error.slice(0, 120)}</span> : x.status}</td></tr>
            ))}</tbody>
          </table>
          <div className={s.row} style={{ marginTop: 8 }}><button type="button" className={s.btn} onClick={download}>Download the history (file)</button></div>
        </>
      )}
    </details>
  )
}
