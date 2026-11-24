// POST /api/atlas/ella/action: one decision Jo makes on the Ella screen in Atlas
// (approve a video, redo a scene, approve a promotion, save settings...).
// Requires the CRM session; cross-site calls are refused by the proxy guard.
import { NextResponse } from 'next/server'
import { sessionValid } from '@/lib/will/auth'
import { act, tick, type EllaAction } from '@/lib/ella/run'
import { ellaServices } from '@/lib/ella/services'
import { START_AT_KEY } from '@/lib/ella/stop'
import { trace } from '@/lib/ella/trace'

/** The code version, printed on every Start report (see CHANGELOG-ella.md). */
const ELLA_CODE_VERSION = 'v58'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// Vercel Pro allows 800 s; a render plus HeyGen waits fits inside it.
export const maxDuration = 800

const KINDS = new Set(['client_end', 'approve_script', 'cancel', 'approve_video', 'redo_scene', 'retry_video', 'publish_now', 'reschedule_video', 'discard_video', 'mark_posted', 'approve_ad',
  'reject_ad', 'pause_ad', 'resume_ad', 'save_config', 'resolve_alert', 'release_slug', 'start_over_blogs', 'run_now', 'write_script', 'continue_script', 'make_video', 'edit_video', 'learning_report', 'stop_all', 'start_runs', 'start_run_pdf'])

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  let body: { kind?: string } & Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 }) }
  if (!body || typeof body.kind !== 'string' || !KINDS.has(body.kind)) return NextResponse.json({ ok: false, error: 'unknown_action' }, { status: 400 })
  // The Log tab (Jo, Nov 22): every request and its answer is written down, failures included.
  const t0 = Date.now()
  let svc: ReturnType<typeof ellaServices> | null = null
  try {
    svc = ellaServices()
    await trace(svc.repo, 'web', `request:${body.kind}`, { body })
    const res = await dispatch(svc, body as { kind: string } & Record<string, unknown>)
    await trace(svc.repo, 'web', `response:${body.kind}`, { status: res.status, ms: Date.now() - t0 })
    return res
  } catch (e) {
    const error = String((e as Error)?.message ?? e).slice(0, 300)
    if (svc) await trace(svc.repo, 'web', `failed:${body.kind}`, { error, ms: Date.now() - t0 })
    return NextResponse.json({ ok: false, error }, { status: 500 })
  }
}

async function dispatch(svc: ReturnType<typeof ellaServices>, body: { kind: string } & Record<string, unknown>): Promise<NextResponse> {
  {
    // The browser's note of why its run loop ended: the request itself is the log line (Jo, Nov 22).
    if (body.kind === 'client_end') return NextResponse.json({ ok: true })
    // A Start from Jo: scheduled work may run again, and runs started before a Stop stay stopped.
    if (['write_script', 'make_video', 'run_now'].includes(body.kind)) await svc.repo.setSettings({ [START_AT_KEY]: Date.now() })
    if (body.kind === 'run_now') return NextResponse.json({ ok: true, detail: await tick(svc, { force: true }) })
    const pid = typeof body.productionId === 'string' ? body.productionId : undefined
    if (body.kind === 'write_script') return NextResponse.json({ ok: true, detail: await tick(svc, { force: true, only: 'script', newScript: true }) })
    if (body.kind === 'continue_script') return NextResponse.json({ ok: true, detail: await tick(svc, { force: true, only: 'script', productionId: pid }) })
    if (body.kind === 'make_video') {
      // A script Jo has not approved yet is approved by this button; then the video run starts.
      if (pid) {
        const p = await svc.repo.production(pid)
        if (p && ['script_ready', 'needs_jo'].includes(p.status)) {
          const r = await act(svc, { kind: 'approve_script', productionId: pid })
          if (!r.ok) return NextResponse.json(r, { status: 422 })
        }
      }
      return NextResponse.json({ ok: true, detail: await tick(svc, { force: true, only: 'video', productionId: pid }) })
    }
    // Learning tab (Jo, Nov 22): every Start that did not end in a video, and a detailed PDF for each one. Read only.
    if (body.kind === 'start_runs') {
      const { listStartRuns } = await import('@/lib/ella/start-report')
      return NextResponse.json({ ok: true, detail: await listStartRuns(svc.repo, 30) })
    }
    if (body.kind === 'start_run_pdf') {
      const id = Number(body.startId)
      if (!Number.isFinite(id)) return NextResponse.json({ ok: false, error: 'startId is missing' }, { status: 400 })
      const { startRunPdf } = await import('@/lib/ella/start-report')
      const { loadConfig } = await import('@/lib/ella/run')
      const config = await loadConfig(svc.repo).catch(() => null)
      return NextResponse.json({ ok: true, detail: await startRunPdf(svc.repo, id, { version: ELLA_CODE_VERSION, config }) })
    }
    if (body.kind === 'learning_report') {
      const { buildLearningReport } = await import('@/lib/ella/report')
      return NextResponse.json({ ok: true, detail: await buildLearningReport(svc) })
    }
    const r = await act(svc, body as unknown as EllaAction)
    // An edit is rendered at once (only the edit runs again; nothing is paid again at HeyGen).
    if (r.ok && body.kind === 'edit_video' && pid) return NextResponse.json({ ok: true, detail: await tick(svc, { force: true, only: 'video', productionId: pid }) })
    return NextResponse.json(r, { status: r.ok ? 200 : 422 })
  }
}
