export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { brandFromHost } from '@/lib/brand'
import { getRateLimitIp } from '@/lib/get-ip'
import { isRateLimited } from '@/lib/rate-limit'
import { crossSiteFormReason } from '@/lib/public-form-guard'
import { verifyFormToken, formTokenUsedKey } from '@/lib/will/form-token'
import { getStore } from '@/lib/will/store'
import { findOpenTaxTaskByWhatsapp, setTaskTaxStatus } from '@/lib/db'
import { safeErr } from '@/lib/log-safe'

/**
 * The residency correction link (Jo, 3 Nov): a customer who needs to change their
 * tax-residency answer opens a one-time link (made from the CRM) and answers that
 * one question again. Nothing else on their record can be changed from here.
 */
export async function POST(req: NextRequest) {
  try {
    if (crossSiteFormReason(req)) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 })
    if (await isRateLimited(getRateLimitIp(req), 'tax-form-fix', 20)) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }
    if (brandFromHost(req.headers.get('host')) !== 'wht') return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })

    const body = await req.json().catch(() => null) as { k?: unknown; status?: unknown } | null
    const tok = verifyFormToken(typeof body?.k === 'string' ? body.k : null, 'wht')
    if (!tok.ok || tok.claims.purpose !== 'fix') return NextResponse.json({ ok: false, error: 'invalid_link' }, { status: 403 })
    if (body?.status !== 'resident' && body?.status !== 'whm') return NextResponse.json({ ok: false, error: 'invalid_status' }, { status: 400 })

    const store = getStore()
    if (await store.getSetting(formTokenUsedKey(tok.claims.nonce)).catch(() => null)) {
      return NextResponse.json({ ok: false, error: 'link_used' }, { status: 409 })
    }
    const customer = await store.getCustomerById(tok.claims.customerId).catch(() => null)
    const task = customer?.waId ? await findOpenTaxTaskByWhatsapp(customer.waId) : null
    if (!customer || !task) return NextResponse.json({ ok: false, error: 'nothing_to_correct' }, { status: 404 })

    const saved = await setTaskTaxStatus(task.id, body.status)
    if (!saved) return NextResponse.json({ ok: false, error: 'nothing_to_correct' }, { status: 404 })
    await store.setSetting(formTokenUsedKey(tok.claims.nonce), Date.now())
      .catch((e: unknown) => console.error('[tax-form/fix] could not mark the link used:', safeErr(e)))
    await store.audit('system', 'residency_corrected', { customerId: customer.id, taskId: task.id, status: body.status }).catch(() => undefined)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[tax-form/fix] failed:', safeErr(err))
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
