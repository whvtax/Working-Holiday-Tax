// POST /api/atlas/ella/action: one decision Jo makes on the Ella screen in Atlas
// (approve a video, redo a scene, approve a promotion, save settings...).
// Requires the CRM session; cross-site calls are refused by the proxy guard.
import { NextResponse } from 'next/server'
import { sessionValid } from '@/lib/will/auth'
import { act, tick, type EllaAction } from '@/lib/ella/run'
import { ellaServices } from '@/lib/ella/services'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// Vercel Pro allows 800 s; a render plus HeyGen waits fits inside it.
export const maxDuration = 800

const KINDS = new Set(['approve_script', 'cancel', 'approve_video', 'redo_scene', 'retry_video', 'publish_now', 'mark_posted', 'approve_ad',
  'reject_ad', 'pause_ad', 'resume_ad', 'save_config', 'resolve_alert', 'release_slug', 'run_now', 'write_script', 'continue_script', 'make_video'])

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  let body: { kind?: string } & Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 }) }
  if (!body || typeof body.kind !== 'string' || !KINDS.has(body.kind)) return NextResponse.json({ ok: false, error: 'unknown_action' }, { status: 400 })
  try {
    const svc = ellaServices()
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
    const r = await act(svc, body as unknown as EllaAction)
    return NextResponse.json(r, { status: r.ok ? 200 : 422 })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String((e as Error)?.message ?? e).slice(0, 300) }, { status: 500 })
  }
}
