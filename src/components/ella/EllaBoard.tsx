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
    const j: Job = { kind, productionId, start: Date.now(), runs: 0, last: '' }
    setJob(j)
    try {
      for (let i = 0; i < 14; i++) {
        let res: Response
        try { res = await fetch('/api/atlas/ella/action', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }) }
        catch { fail(`${label(kind)}: the connection to the server dropped. Ella carries on in the background; refresh in a minute.`); break }
        router.refresh()
        if (res.status === 502 || res.status === 504) { setJob(x => x && { ...x, runs: i + 1, last: 'The server took its full 5 minutes; carrying on from the saved work' }); body = next(kind, body); continue }
        const r = await res.json().catch(() => ({ ok: false, error: `No readable answer (HTTP ${res.status})` })) as
          { ok: boolean; error?: string; detail?: { more?: boolean; steps?: Array<{ step: string; ok: boolean; detail: string }> } }
        if (!r.ok) { fail(`${label(kind)} failed: ${r.error ?? 'no reason given'}`); break }
        const steps = r.detail?.steps ?? []
        const failed = steps.filter(x => !x.ok)
        const said = (failed.length ? failed : steps).map(x => x.detail).filter(Boolean).join(' · ')
        if (failed.length) { fail(`${label(kind)} failed: ${said}`); break }
        if (!r.detail?.more) { toast({ text: said || 'Done', err: false }); break }
        setJob(x => x && { ...x, runs: i + 1, last: said })
        body = next(kind, body)
        // HeyGen needs time between checks; scripts go straight on.
        if (kind === 'make_video') await new Promise(ok => setTimeout(ok, 8000))
      }
    } finally {
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
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const video = job.kind === 'make_video'
  const item = video
    ? d.board.videos.find(v => v.id === job.productionId) ?? d.board.videos[0]
    : d.board.scripts.find(x => x.id === job.productionId) ?? d.board.scripts[0]
  const pct = item?.pct ?? 1
  const title = item?.title ?? (video ? 'Starting the video' : 'Drawing a blog')
  const stage = !item ? 'Starting' : 'label' in item ? `Next: ${item.label} · stage ${Math.min(item.stagesDone + 1, item.stagesPlanned)} of ${item.stagesPlanned}` : `${item.done} of ${item.total} steps done · US$${item.spentUsd.toFixed(2)} so far`
  return (
    <div className={s.runner} role="status" aria-live="polite">
      <span className={s.spinner} aria-hidden="true" />
      <div className={s.runProgMain}>
        <div className={s.runProgHead}><strong>{video ? 'Stage 2 · Making the video' : 'Stage 1 · Writing the script'}: {title}</strong><span>{pct}% · {mmss(now - job.start)}</span></div>
        <div className={s.bar}><div className={s.barFill} style={{ width: `${pct}%` }} /></div>
        <span className={s.tileSub}>{stage}{job.last ? ` · ${job.last}` : ''}. You can switch tabs; keep this page open until it ends.</span>
      </div>
    </div>
  )
}

// ── Stage 1: scripts ──────────────────────────────────────────────────────
const SCRIPT_STEPS = ['Research', 'Writing', 'Review'] as const

export function ScriptsBoard({ d, job, start, review }: { d: EllaPageData; job: Job | null; start: (k: JobKind, id?: string) => void; review: (p: ProductionDetail) => React.ReactNode }) {
  const waiting = d.reviews.filter(p => p.status === 'script_ready' || p.status === 'needs_jo')
  const approved = d.dashboard.queue.filter(q => q.status === 'approved')
  const libLeft = d.dashboard.library.total - d.dashboard.library.used
  return (
    <>
      <section className={s.card}>
        <div className={s.cardHead}>
          <div><h2>Stage 1 · Scripts</h2><p>Each script goes through research, writing and a strict review, and is rewritten until it passes. {libLeft} blogs left to draw.</p></div>
          <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={!!job || d.board.scripts.length > 0} onClick={() => start('write_script')}>Write a new script</button>
        </div>
        {d.board.scripts.length === 0 ? <p className={s.empty}>No script is being written. Press “Write a new script” to draw a blog.</p> : d.board.scripts.map(x => (
          <div key={x.id} className={s.stageCard}>
            <div className={s.runProgHead}><strong>{x.title}</strong><span>{x.pct}%</span></div>
            <div className={s.bar}><div className={s.barFill} style={{ width: `${x.pct}%` }} /></div>
            <ol className={s.stepper}>
              {SCRIPT_STEPS.map((label, i) => {
                const doneN = x.log.filter(l => l.ok).length
                const state = doneN > i ? s.stepDone : doneN === i ? s.stepNow : ''
                return <li key={label} className={state}>{label}</li>
              })}
              {Array.from({ length: Math.max(0, (x.stagesPlanned - 3) / 2) }, (_, k) => (
                <li key={`rw${k}`} className={x.log.filter(l => l.ok).length > 3 + 2 * k ? s.stepDone : s.stepNow}>Rewrite {k + 1}</li>
              ))}
            </ol>
            {x.log.length > 0 && (
              <table className={s.table}><thead><tr><th>Stage</th><th>Result</th><th>Time</th></tr></thead><tbody>
                {x.log.map((l, i) => <tr key={i}><td>{l.phase}</td><td className={l.ok ? '' : s.attn}>{l.note}</td><td>{l.seconds}s</td></tr>)}
              </tbody></table>
            )}
            <div className={s.row} style={{ marginTop: 10 }}>
              <button type="button" className={s.btn} disabled={!!job} onClick={() => start('continue_script', x.id)}>Continue</button>
              <span className={s.itemSub}>Next: {x.label}. Saved after every stage, so nothing is lost if a run stops.</span>
            </div>
          </div>
        ))}
      </section>

      {waiting.length > 0 && <h3 className={s.groupHead}>Waiting for you ({waiting.length})</h3>}
      {waiting.map(p => <div key={p.id}>{review(p)}</div>)}

      {approved.length > 0 && (
        <section className={s.card}>
          <div className={s.cardHead}><h2>Approved, waiting for a video</h2><p>Making a video spends money, so it starts only when you press the button.</p></div>
          <ul className={s.list}>{approved.map(q => (
            <li key={q.id} className={s.item}>
              <div className={s.itemMain}><span className={s.itemTitle}>{q.title ?? q.slug}</span><span className={s.itemSub}>{q.pillar}{q.hookType ? ` · ${q.hookType}` : ''}</span></div>
              <button type="button" className={`${s.btn} ${s.btnMain}`} disabled={!!job} onClick={() => start('make_video', q.id)}>Make video</button>
            </li>))}</ul>
        </section>
      )}
    </>
  )
}

// ── Stage 2: videos ───────────────────────────────────────────────────────
export function VideosBoard({ d, job, start, review }: { d: EllaPageData; job: Job | null; start: (k: JobKind, id?: string) => void; review: (p: ProductionDetail) => React.ReactNode }) {
  const making = d.board.videos.filter(v => d.dashboard.queue.find(q => q.id === v.id)?.status === 'producing')
  const waiting = d.reviews.filter(p => p.status === 'video_ready' || p.status === 'video_needs_jo')
  return (
    <>
      <section className={s.card}>
        <div className={s.cardHead}><div><h2>Stage 2 · Videos in production</h2><p>Voice, Ella talking, the video clips, editing, then a quality check. Every finished step is saved and never paid for twice.</p></div></div>
        {making.length === 0 ? <p className={s.empty}>No video is being made. Approve a script in Stage 1 and press “Make video”.</p> : making.map(v => (
          <div key={v.id} className={s.stageCard}>
            <div className={s.runProgHead}><strong>{v.title}</strong><span>{v.pct}% · US${v.spentUsd.toFixed(2)}</span></div>
            <div className={s.bar}><div className={s.barFill} style={{ width: `${v.pct}%` }} /></div>
            <ul className={s.stepList}>
              {v.steps.map((st, i) => (
                <li key={i} className={st.status === 'done' ? s.stepDone : st.status === 'working' ? s.stepNow : st.status === 'failed' ? s.stepFail : ''}>
                  <span className={s.stepDot} aria-hidden="true" />{st.label}<span className={s.itemSub}>{st.status === 'done' ? 'done' : st.status === 'working' ? 'in progress' : st.status === 'failed' ? 'failed' : 'waiting'}</span>
                </li>))}
            </ul>
            <div className={s.row} style={{ marginTop: 10 }}>
              <button type="button" className={s.btn} disabled={!!job} onClick={() => start('make_video', v.id)}>Continue</button>
              <span className={s.itemSub}>{v.done} of {v.total} steps done.</span>
            </div>
          </div>
        ))}
      </section>
      {waiting.length > 0 && <h3 className={s.groupHead}>Waiting for you ({waiting.length})</h3>}
      {waiting.map(p => <div key={p.id}>{review(p)}</div>)}
    </>
  )
}
