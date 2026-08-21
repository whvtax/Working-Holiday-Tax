// WhatsApp Embedded Signup — server side.
//
// Two ways in, both admin-only, both end with working credentials stored in the
// DB (no redeploy needed):
//   1) { code, phoneNumberId, wabaId }  — the Embedded Signup popup returns an
//      authorization code; we exchange it (with the app secret) for a business
//      access token scoped to the REAL number the owner selected.
//   2) { token, phoneNumberId }         — manual paste fallback (e.g. a token
//      from the Graph API Explorer), stored as-is.
//
// After storing, we verify the pair against Meta so the caller gets an instant
// yes/no instead of discovering failure on the first customer send.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { metaAppSecret, saveWaCreds } from '@/lib/will/channel';

export const dynamic = 'force-dynamic';

const GRAPH = process.env.WHATSAPP_GRAPH_VERSION || 'v21.0';
const APP_ID = process.env.META_APP_ID || process.env.NEXT_PUBLIC_META_APP_ID || '1388978866435944';

/**
 * Graph GET.
 *
 * SECRETS GO IN THE HEADER, NOT THE QUERY STRING. These calls previously passed
 * META_APP_SECRET and the business access token as `?access_token=...` query
 * parameters, which puts live credentials into proxy logs, Meta's own access
 * logs, and any fetch error string that gets printed. channel.ts already does
 * this correctly with an Authorization header; this route did not.
 */
async function graphGet(
  path: string,
  token?: string,
): Promise<{ ok: boolean; data: Record<string, unknown> }> {
  const res = await fetch(`https://graph.facebook.com/${GRAPH}/${path}`, {
    cache: 'no-store',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  const data = await res.json().catch(() => ({} as Record<string, unknown>));
  return { ok: res.ok, data };
}

export async function POST(req: Request) {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

  let body: { code?: string; token?: string; phoneNumberId?: string; wabaId?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 }); }

  const secret = metaAppSecret();
  let token = (body.token || '').trim();
  const wabaId = (body.wabaId || '').trim() || undefined;
  let phoneId = (body.phoneNumberId || '').trim();

  // 1) Exchange an Embedded Signup authorization code for a business token.
  if (!token && body.code) {
    if (!secret) return NextResponse.json({ ok: false, error: 'META_APP_SECRET is not configured on the server' }, { status: 400 });
    // POST with a form body: the app secret must not travel in a URL.
    const ex = await (async () => {
      const res = await fetch(`https://graph.facebook.com/${GRAPH}/oauth/access_token`, {
        method: 'POST',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ client_id: APP_ID, client_secret: secret, code: body.code!.trim() }).toString(),
      });
      const data = await res.json().catch(() => ({} as Record<string, unknown>));
      return { ok: res.ok, data };
    })();
    if (!ex.ok || !ex.data.access_token) {
      const err = (ex.data as { error?: { message?: string } }).error;
      return NextResponse.json({ ok: false, error: `code exchange failed: ${err?.message ?? 'unknown'}` }, { status: 400 });
    }
    token = String(ex.data.access_token);
  }

  if (!token) return NextResponse.json({ ok: false, error: 'no token or code provided' }, { status: 400 });

  // If we were given a WABA but no phone id, look the phone id up from the WABA.
  if (!phoneId && wabaId) {
    const pn = await graphGet(`${wabaId}/phone_numbers`, token);
    const first = ((pn.data as { data?: { id?: string }[] }).data ?? [])[0];
    if (first?.id) phoneId = String(first.id);
  }

  if (!phoneId) return NextResponse.json({ ok: false, error: 'no phone number id (pass phoneNumberId or a wabaId we can look it up from)' }, { status: 400 });

  // Best-effort: subscribe the app to the WABA so webhooks keep flowing. Never
  // fail the connect over this — inbound may already be wired via coexistence.
  if (wabaId) {
    try {
      await fetch(`https://graph.facebook.com/${GRAPH}/${wabaId}/subscribed_apps`, {
        method: 'POST', cache: 'no-store', headers: { Authorization: `Bearer ${token}` },
      });
    } catch { /* ignore */ }
  }

  // Verify the pair actually works before we celebrate.
  const check = await graphGet(`${phoneId}?fields=display_phone_number,verified_name`, token);
  if (!check.ok) {
    const err = (check.data as { error?: { message?: string } }).error;
    return NextResponse.json({ ok: false, error: `Meta rejected this token+number: ${err?.message ?? 'unknown'}`, phoneNumberId: phoneId }, { status: 400 });
  }

  await saveWaCreds(token, phoneId, wabaId);
  const num = (check.data as { display_phone_number?: string }).display_phone_number || 'connected';
  return NextResponse.json({ ok: true, phoneNumberId: phoneId, displayPhoneNumber: num });
}
