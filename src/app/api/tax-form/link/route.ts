export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { brandFromHost } from '@/lib/brand'
import { getRateLimitIp } from '@/lib/get-ip'
import { isRateLimited } from '@/lib/rate-limit'
import { verifyFormToken, formTokenUsedKey } from '@/lib/will/form-token'
import { getStore } from '@/lib/will/store'
import { safeErr } from '@/lib/log-safe'

/**
 * What the questionnaire page needs to know about the link it was opened with
 * (?k=): is it a good link, has it already been used, and which number is the
 * chat. Only a token that verifies gets an answer about a customer; anything
 * else is "none", the same reply for forged, expired or missing tokens.
 * The number is shown read-only on the form. The server never trusts it coming
 * back: the submission takes the number from the token again.
 */
export async function GET(req: NextRequest) {
  try {
    if (await isRateLimited(getRateLimitIp(req), 'tax-form-link', 60)) {
      return NextResponse.json({ state: 'none' }, { status: 429, headers: { 'Cache-Control': 'no-store' } })
    }
    const brand = brandFromHost(req.headers.get('host'))
    const tok = brand === 'wht' ? verifyFormToken(req.nextUrl.searchParams.get('k'), 'wht') : null
    const none = NextResponse.json({ state: 'none' }, { headers: { 'Cache-Control': 'no-store' } })
    if (!tok || !tok.ok) return none
    const store = getStore()
    if (await store.getSetting(formTokenUsedKey(tok.claims.nonce)).catch(() => null)) {
      return NextResponse.json({ state: 'used', purpose: tok.claims.purpose }, { headers: { 'Cache-Control': 'no-store' } })
    }
    const customer = await store.getCustomerById(tok.claims.customerId).catch(() => null)
    if (!customer?.waId) return none
    return NextResponse.json(
      { state: 'ok', purpose: tok.claims.purpose, number: `+${customer.waId.replace(/\D/g, '')}` },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch (err) {
    console.error('[tax-form/link] failed:', safeErr(err))
    return NextResponse.json({ state: 'none' }, { headers: { 'Cache-Control': 'no-store' } })
  }
}
