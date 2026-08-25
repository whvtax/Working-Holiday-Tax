// Serve one WhatsApp attachment to the dashboard.
//
// Meta does not hand out public links: a media id resolves to a short-lived URL
// that still needs the access token, so the browser cannot fetch it directly and
// the token must never leave the server. This route is the bridge — behind the
// CRM session, like every other Will route.
//
// Media only lives at Meta for 30 days. Past that the lookup 404s and the chat
// keeps showing the "[Photo]" line it already stored, which is the right
// outcome: the conversation stays readable even when the file is gone.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { fetchWaMedia } from '@/lib/will/channel';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/** Meta media ids are long digit strings; a couple of other id shapes exist, so
 *  this is a sanity check on the path segment rather than a strict format. */
const ID_RE = /^[A-Za-z0-9_=-]{5,256}$/;

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const id = params.id;
  if (!ID_RE.test(id)) return NextResponse.json({ ok: false, error: 'bad id' }, { status: 400 });

  const res = await fetchWaMedia(id);
  if (!res.ok) return NextResponse.json({ ok: false, error: res.error }, { status: res.status });

  return new NextResponse(res.body, {
    headers: {
      'content-type': res.mime,
      'content-length': String(res.body.byteLength),
      // Private, because this is one customer's document behind a staff login,
      // but cached for the session so scrolling a thread does not re-download
      // every photo from Meta.
      'cache-control': 'private, max-age=3600',
      // Documents are downloaded, images are rendered; inline lets the browser
      // decide, and stops a PDF from being treated as an attack surface.
      'x-content-type-options': 'nosniff',
    },
  });
}
