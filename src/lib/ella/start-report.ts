/**
 * Starts with no video (Jo, Nov 22). Every press of Start that did not end with a
 * video in Ready to post is listed on the Learning tab, and each one downloads a
 * detailed PDF: where it stopped, why, and every log line, step, check and setting
 * behind it. Jo sends the PDF to Claude in chat and the code is fixed from it.
 *
 * One Start runs from the press of Start (the `request:write_script` log line) to
 * the next press, or to now. Its video is the blog drawn in that window (the
 * `claim` line), or any production named in the window's log lines.
 * Nothing here changes Ella: it only reads.
 */
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib'
import type { AuditRow, EllaRepo, ProductionDetail, ProductionStatus } from './store'
import type { StudioState } from './script/studio'
import type { Step } from './video/steps'
import { studioKey } from './stage1'
import { sanitize } from './trace'

export const START_ACTION = 'request:write_script'
const DONE: ProductionStatus[] = ['video_ready', 'scheduled', 'published']
const ACTIVE: ProductionStatus[] = ['drawn', 'scripting', 'script_ready', 'approved', 'producing']
/** The log lines that say what happened to a Start (enough to list it; the PDF reads every line). */
const KEY_ACTIONS = [
  START_ACTION, 'claim', 'script_ready', 'script_gave_up', 'script_error', 'production_started', 'production_failed', 'video_rendered',
  'voice_too_short', 'stop_all', 'reset_all', 'action:cancel', 'action:approve_video', 'request:client_end', 'tick:error', 'tick_error',
  'failed:write_script', 'failed:continue_script', 'failed:make_video', 'step:failed', 'step:error',
]
/** The report's own requests are left out of the report. */
const OWN = /^(request|response|failed):(start_runs|start_run_pdf|learning_report)$/

export type StartOutcome = 'video' | 'failed' | 'running'
export interface StartRun {
  /** The id of the Start's log line. */
  id: number
  at: string
  /** The next Start, or null when this is the latest one. */
  until: string | null
  outcome: StartOutcome
  productionId: string | null
  title: string | null
  status: ProductionStatus | null
  /** Where it stopped, in a few words. */
  where: string
  /** The main reason, in one line. */
  reason: string
  spentUsd: number
}

type Repo = Pick<EllaRepo, 'auditRange' | 'auditList' | 'production' | 'settings' | 'list' | 'dashboard'>

/** Log lines in a window. Falls back to the latest 1000 lines when migration 057 has not been run. */
async function rowsIn(repo: Repo, from: string, to: string | null, actions?: string[]): Promise<{ rows: AuditRow[]; partial: boolean }> {
  try {
    return { rows: await repo.auditRange(from, to, { actions, limit: 20000 }), partial: false }
  } catch {
    const all = (await repo.auditList(1000)).slice().reverse()
    const f = Date.parse(from), t = to ? Date.parse(to) : Infinity
    return { rows: all.filter(r => { const x = Date.parse(r.at); return x >= f && x < t && (!actions || actions.includes(r.action)) }), partial: true }
  }
}

const str = (x: unknown) => (typeof x === 'string' ? x : x == null ? '' : JSON.stringify(x))
const pidOf = (r: AuditRow): string | null => {
  const d = r.detail ?? {}
  const body = (d.body ?? {}) as Record<string, unknown>
  const v = d.productionId ?? d.production_id ?? body.productionId
  return typeof v === 'string' && v ? v : null
}

/** The production a Start made: the blog it drew, else the first production its log names. */
function productionOf(rows: AuditRow[]): string | null {
  const claim = rows.find(r => r.action === 'claim')
  if (claim) return pidOf(claim)
  for (const r of rows) { const p = pidOf(r); if (p) return p }
  return null
}

/** Where it stopped and why, from what is saved now plus the window's log lines. */
function diagnose(rows: AuditRow[], p: ProductionDetail | null, st: StudioState | null, steps: Step[]): { where: string; reason: string; findings: string[] } {
  const findings: string[] = []
  const stop = rows.find(r => r.action === 'stop_all' || r.action === 'action:cancel' || r.action === 'reset_all')
  if (stop) findings.push(`Stopped by Jo at ${stop.at} (${stop.action}).`)
  if (!p) {
    findings.push('No blog was drawn for this Start, so no script was started.')
    const end = rows.filter(r => r.action === 'request:client_end').map(r => str(r.detail.reason)).filter(Boolean)
    if (end.length) findings.push(`The browser loop ended: ${end.join(' | ')}`)
  }
  if (p?.note) findings.push(`Note saved on the video: ${p.note}`)
  // Script stage.
  const failedStages = (st?.log ?? []).filter(l => !l.ok)
  for (const l of failedStages) findings.push(`Script stage "${l.phase}" did not pass at ${l.at}: ${l.note}`)
  if (st?.current) findings.push(`Script stage "${st.current.phase}" was still running (started ${st.current.at}) when the log ends.`)
  const issues = (p?.script?.issues ?? []) as Array<Record<string, unknown>>
  if (p?.script && !p.script.passed) for (const i of issues) findings.push(`Script check failed: ${str(i.code ?? i.rule ?? i.id)} ${str(i.message ?? i.detail ?? i.note ?? (typeof i === 'string' ? i : ''))}`.trim())
  for (const r of rows.filter(r => ['script_gave_up', 'script_error'].includes(r.action))) findings.push(`${r.action} at ${r.at}: ${str(r.detail.reason ?? r.detail.error)}`)
  // Video stage.
  for (const s of steps.filter(s => s.status === 'failed')) findings.push(`Video step ${s.kind}${s.scene ? ` scene ${s.scene}` : ''} failed (try ${s.attempt}): ${s.error ?? 'no error saved'}`)
  for (const r of rows.filter(r => ['production_failed', 'voice_too_short', 'step:error', 'step:failed'].includes(r.action))) findings.push(`${r.action} at ${r.at}: ${str(r.detail.error ?? r.detail)}`)
  const qa = ((p?.render?.qa ?? []) as Array<{ scene?: number | null; problem?: string; severity?: string }>)
  if (p?.render && !p.render.qaPassed) for (const q of qa) findings.push(`Quality check ${q.severity ?? ''}${q.scene ? ` scene ${q.scene}` : ''}: ${q.problem ?? str(q)}`)
  // Server and browser.
  for (const r of rows.filter(r => r.action.startsWith('failed:') || r.action === 'tick:error' || r.action === 'tick_error')) findings.push(`${r.action} at ${r.at}: ${str(r.detail.error ?? r.detail)}`)
  for (const r of rows.filter(r => r.action.startsWith('response:') && Number(r.detail.status) >= 400)) findings.push(`${r.action} answered HTTP ${r.detail.status} at ${r.at}`)
  if (p) for (const r of rows.filter(r => r.action === 'request:client_end')) findings.push(`The browser loop ended at ${r.at}: ${str(r.detail.reason)}`)
  const last = rows.filter(r => !OWN.test(r.action)).at(-1)
  if (last) findings.push(`Last log line of this Start: ${last.at} ${last.action}.`)

  // The short answer for the list.
  let where = 'Before the script'
  if (p) {
    if (['drawn', 'scripting', 'needs_jo', 'script_ready'].includes(p.status)) where = st ? `Script: ${st.current?.phase ?? st.phase}` : 'Script'
    else if (['approved', 'producing', 'video_needs_jo'].includes(p.status)) {
      const bad = steps.find(s => s.status === 'failed')
      where = bad ? `Video: ${bad.kind}${bad.scene ? ` scene ${bad.scene}` : ''}` : p.status === 'video_needs_jo' ? 'Video: quality check' : 'Video'
    } else if (p.status === 'cancelled') where = st && !p.script?.passed ? `Cancelled during the script (${st.phase})` : p.scriptVersion ? 'Cancelled during the video' : 'Cancelled during the script'
    else if (DONE.includes(p.status)) where = 'Ready to post'
  }
  // The cause comes before its effect: a saved error or failed check is the reason; "no blog drawn" or "loop ended" only when nothing else is saved.
  const real = findings.filter(f => !f.startsWith('Last log line'))
  const cause = real.find(f => /^(Note saved|Script stage|Script check failed|script_|Video step|production_failed|voice_too_short|step:|Quality check|failed:|tick)/.test(f) || / answered HTTP /.test(f))
  const reason = (stop ? `Stopped by Jo (${stop.action})` : cause ?? real[0]) ?? 'No error was saved. The log ends without one (see the timeline).'
  return { where, reason, findings }
}

async function studioOf(repo: Repo, id: string): Promise<StudioState | null> {
  try { return ((await repo.settings([studioKey(id)]))[studioKey(id)] as StudioState | null) ?? null } catch { return null }
}
async function stepsOf(repo: Repo, p: ProductionDetail | null): Promise<Step[]> {
  if (!p?.scriptVersion) return []
  try { return await repo.list(p.id, p.scriptVersion) } catch { return [] }
}

/** Every Start of the last `days` days, newest first, with its outcome. */
export async function listStartRuns(repo: Repo, days = 30, now = Date.now()): Promise<{ runs: StartRun[]; partial: boolean }> {
  const from = new Date(now - days * 86400_000).toISOString()
  const { rows, partial } = await rowsIn(repo, from, null, KEY_ACTIONS)
  const starts = rows.filter(r => r.action === START_ACTION)
  const runs: StartRun[] = []
  for (let i = 0; i < starts.length; i++) {
    const s = starts[i]
    const until = starts[i + 1]?.at ?? null
    const win = rows.filter(r => r.at >= s.at && (!until || r.at < until))
    const pid = productionOf(win)
    const p = pid ? await repo.production(pid).catch(() => null) : null
    const st = p ? await studioOf(repo, p.id) : null
    const steps = await stepsOf(repo, p)
    const { where, reason } = diagnose(win, p, st, steps)
    const stopped = win.some(r => ['stop_all', 'action:cancel', 'reset_all'].includes(r.action))
    const fresh = now - Date.parse(s.at) < 20 * 60_000
    const outcome: StartOutcome = p && DONE.includes(p.status) ? 'video'
      : !until && !stopped && ((p && ACTIVE.includes(p.status)) || (!p && fresh)) ? 'running' : 'failed'
    runs.push({ id: s.id, at: s.at, until, outcome, productionId: p?.id ?? pid, title: p?.title ?? p?.slug ?? null, status: p?.status ?? null, where, reason, spentUsd: p?.spentUsd ?? 0 })
  }
  return { runs: runs.reverse(), partial }
}

// ── The PDF ────────────────────────────────────────────────────────────────
/** pdf-lib's built-in fonts write Latin-1 only; everything else becomes a plain stand-in. */
function plain(s: string): string {
  return s
    .replace(/[\u2018\u2019\u201A\u2032]/g, "'").replace(/[\u201C\u201D\u201E\u2033]/g, '"').replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/\u2026/g, '...').replace(/\u2022/g, '*').replace(/\u00B7/g, '-').replace(/\u00A0/g, ' ').replace(/\t/g, '  ').replace(/\r/g, '')
    .replace(/[^\x20-\x7E\n\u00A1-\u00FF]/g, '?')
}

class Writer {
  doc!: PDFDocument
  page!: PDFPage
  y = 0
  fonts!: { body: PDFFont; bold: PDFFont; mono: PDFFont }
  readonly W = 595.28; readonly H = 841.89; readonly M = 40
  static async make() {
    const w = new Writer()
    w.doc = await PDFDocument.create()
    w.fonts = { body: await w.doc.embedFont(StandardFonts.Helvetica), bold: await w.doc.embedFont(StandardFonts.HelveticaBold), mono: await w.doc.embedFont(StandardFonts.Courier) }
    w.newPage()
    return w
  }
  newPage() { this.page = this.doc.addPage([this.W, this.H]); this.y = this.H - this.M }
  private room(h: number) { if (this.y - h < this.M) this.newPage() }
  /** Lines that fit the width; long words are cut. */
  private wrap(text: string, font: PDFFont, size: number, width: number): string[] {
    const fits = (s: string) => font.widthOfTextAtSize(s, size) <= width
    const out: string[] = []
    for (const para of plain(text).split('\n')) {
      if (fits(para)) { out.push(para); continue }
      let line = ''
      for (const word of para.split(/(?<= )/)) {
        if (fits(line + word)) { line += word; continue }
        if (line.trim()) out.push(line.trimEnd())
        line = ''
        let w = word
        while (!fits(w)) {
          let lo = 1, hi = w.length
          while (lo < hi) { const mid = Math.ceil((lo + hi) / 2); if (fits(w.slice(0, mid))) lo = mid; else hi = mid - 1 }
          out.push(w.slice(0, lo)); w = w.slice(lo)
        }
        line = w
      }
      out.push(line.trimEnd())
    }
    return out
  }
  text(t: string, o: { size?: number; font?: 'body' | 'bold' | 'mono'; color?: [number, number, number]; indent?: number; gap?: number } = {}) {
    const size = o.size ?? 9.5, font = this.fonts[o.font ?? 'body'], x = this.M + (o.indent ?? 0)
    const lh = size * 1.3
    for (const line of this.wrap(t, font, size, this.W - this.M - x)) {
      this.room(lh)
      this.page.drawText(line, { x, y: this.y - size, size, font, color: rgb(...(o.color ?? [0.1, 0.1, 0.1])) })
      this.y -= lh
    }
    this.y -= o.gap ?? 2
  }
  h1(t: string) { this.room(40); this.text(t, { size: 16, font: 'bold', gap: 6 }) }
  h2(t: string) { this.room(36); this.y -= 6; this.text(t, { size: 12.5, font: 'bold', gap: 4 }); this.page.drawLine({ start: { x: this.M, y: this.y + 2 }, end: { x: this.W - this.M, y: this.y + 2 }, thickness: 0.5, color: rgb(0.8, 0.8, 0.8) }); this.y -= 4 }
  kv(k: string, v: string) { this.text(`${k}: ${v}`, { indent: 0 }) }
  json(v: unknown, max = 8000, compact = false) {
    let s = (compact ? JSON.stringify(v) : JSON.stringify(v, null, 2)) ?? 'null'
    if (s.length > max) s = `${s.slice(0, max)}\n... (${s.length - max} more characters cut from this block)`
    this.text(s, { font: 'mono', size: 6.8, indent: 8, color: [0.25, 0.25, 0.25], gap: 4 })
  }
  async bytes() {
    const pages = this.doc.getPages()
    pages.forEach((pg, i) => pg.drawText(`Page ${i + 1} of ${pages.length}`, { x: this.W - this.M - 70, y: 20, size: 7.5, font: this.fonts.body, color: rgb(0.5, 0.5, 0.5) }))
    return this.doc.save()
  }
}

const mins = (a: string, b: string) => { const s = Math.max(0, Math.round((Date.parse(b) - Date.parse(a)) / 1000)); return `${Math.floor(s / 60)} min ${s % 60} s` }

/** The full PDF for one Start. */
export async function startRunPdf(repo: Repo, startId: number, opts: { version: string; now?: number; config?: unknown } = { version: '' }): Promise<{ filename: string; base64: string; outcome: StartOutcome }> {
  const now = opts.now ?? Date.now()
  const { runs, partial: listPartial } = await listStartRuns(repo, 60, now)
  const run = runs.find(r => r.id === startId)
  if (!run) throw new Error('This Start is not in the log of the last 60 days')
  const { rows: all, partial } = await rowsIn(repo, run.at, run.until)
  const rows = all.filter(r => !OWN.test(r.action))
  const p = run.productionId ? await repo.production(run.productionId).catch(() => null) : null
  const st = p ? await studioOf(repo, p.id) : null
  const steps = await stepsOf(repo, p)
  const { where, reason, findings } = diagnose(rows, p, st, steps)
  const dash = await repo.dashboard().catch(() => null)
  const end = run.until ?? rows.at(-1)?.at ?? new Date(now).toISOString()

  const w = await Writer.make()
  w.h1('Ella: a Start that did not end in a video')
  w.text(`Made ${new Date(now).toISOString()} · code ${opts.version}`, { size: 8, color: [0.45, 0.45, 0.45], gap: 8 })

  w.h2('1. Summary')
  w.kv('Start pressed', run.at)
  w.kv('Window ends', run.until ? `${run.until} (the next Start)` : `now, ${new Date(now).toISOString()}`)
  w.kv('Last log line', `${rows.at(-1)?.at ?? '-'} (${mins(run.at, end)} after Start)`)
  w.kv('Outcome', run.outcome === 'running' ? 'still running' : run.outcome === 'video' ? 'a video reached Ready to post' : 'no video')
  w.kv('Blog', p ? `${p.title ?? '-'} (${p.slug}, ${p.pillar})` : 'none drawn')
  w.kv('Production id', p?.id ?? run.productionId ?? '-')
  w.kv('Status now', p?.status ?? '-')
  w.kv('Where it stopped', where)
  w.kv('Main reason', reason)
  w.kv('Spent at HeyGen', `US$${(p?.spentUsd ?? 0).toFixed(2)}`)
  w.kv('Log lines in this Start', String(rows.length))
  if (partial || listPartial) w.text('Note: migration 057 has not been run, so only the latest 1000 log lines could be read. Older lines of this Start may be missing.', { color: [0.7, 0.1, 0.1] })

  w.h2('2. Everything that went wrong, in order found')
  if (findings.length) findings.forEach((f, i) => w.text(`${i + 1}. ${f}`, { indent: 4 }))
  else w.text('No error, failed check or failed step was saved for this Start.')

  w.h2('3. Script studio')
  if (!st) w.text(p ? 'No studio state is saved for this video (cleared, or never started).' : 'No script was started.')
  else {
    w.kv('Phase now', st.phase); w.kv('Started', st.startedAt); w.kv('Updated', st.updatedAt)
    w.kv('Fixes used', String(st.rewrites)); w.kv('Failures', String(st.failures)); w.kv('Restarts', String(st.restarts ?? 0))
    w.kv('Template / series', `${st.template ?? '-'} / ${st.series ?? '-'}`)
    if (st.current) w.kv('Running now', `${st.current.phase} since ${st.current.at}`)
    w.text('Stage log:', { font: 'bold', gap: 2 })
    for (const l of st.log) w.text(`${l.at}  ${l.ok ? 'OK  ' : 'FAIL'}  ${l.phase} (${l.seconds}s): ${l.note}`, { font: 'mono', size: 7.2, indent: 6 })
    if (st.judgeTake) { w.text('Judge:', { font: 'bold' }); w.json(st.judgeTake) }
    if (st.drafts?.length) { w.text('Drafts (with their check results):', { font: 'bold' }); w.json(st.drafts, 20000) }
    if (st.advocate) { w.text("Devil's advocate:", { font: 'bold' }); w.json(st.advocate) }
    if (st.research) { w.text('Research:', { font: 'bold' }); w.json(st.research, 12000) }
  }

  w.h2('4. Saved script and its checks')
  if (!p?.script) w.text('No script was saved.')
  else {
    w.kv('Version', String(p.script.version)); w.kv('Passed the automatic checks', p.script.passed ? 'yes' : 'no')
    w.text('Issues:', { font: 'bold' }); w.json(p.script.issues)
    w.text('Script:', { font: 'bold' }); w.json(p.script.script, 20000)
  }

  w.h2('5. Video steps (HeyGen, render, quality check)')
  if (!steps.length) w.text('No video step was started.')
  for (const s of steps) {
    w.text(`${s.kind}${s.scene ? ` scene ${s.scene}` : ''} · try ${s.attempt} · ${s.status} · US$${Number(s.costUsd ?? 0).toFixed(2)} · job ${s.providerJobId ?? '-'}`, { font: 'bold', size: 8.5 })
    w.json(sanitize(s), 5000)
  }
  if (p?.render) { w.text('Render and quality check:', { font: 'bold' }); w.json(sanitize(p.render), 12000) }
  if (p?.posts?.length) { w.text('Posts:', { font: 'bold' }); w.json(p.posts) }

  w.h2('6. Alerts open now')
  const alerts = dash?.alerts ?? []
  if (!alerts.length) w.text('None.')
  for (const a of alerts) w.text(`${a.createdAt}  [${a.kind}] ${a.message}`, { size: 8.5, indent: 4 })

  w.h2('7. Settings now (keys and tokens removed)')
  w.json(sanitize(opts.config ?? {}), 12000)

  w.h2(`8. Full timeline: every log line of this Start (${rows.length})`)
  for (const r of rows) {
    const bad = r.action.startsWith('failed:') || /error|failed|gave_up/.test(r.action) || (r.action.startsWith('response:') && Number(r.detail.status) >= 400)
    w.text(`#${r.id}  ${r.at}  +${mins(run.at, r.at)}  ${r.actor}  ${r.action}`, { font: 'bold', size: 7.8, color: bad ? [0.75, 0.1, 0.1] : [0.1, 0.1, 0.1], gap: 0 })
    if (r.detail && Object.keys(r.detail).length) w.json(r.detail, 6000, true)
  }

  const bytes = await w.bytes()
  const stamp = run.at.slice(0, 16).replace(/[:T]/g, '-')
  return { filename: `ella-start-${stamp}${p ? `-${p.slug}` : ''}.pdf`.slice(0, 120), base64: Buffer.from(bytes).toString('base64'), outcome: run.outcome }
}
