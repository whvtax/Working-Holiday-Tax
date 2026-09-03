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

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const id = (await params).id;
  if (!ID_RE.test(id)) return NextResponse.json({ ok: false, error: 'bad id' }, { status: 400 });

  const res = await fetchWaMedia(id);
  if (!res.ok) return NextResponse.json({ ok: false, error: res.error }, { status: res.status });

  // The MIME type is whatever the customer's phone declared. Anything that a
  // browser would EXECUTE at this origin (an SVG with a <script>, an HTML
  // "document", XML) must not render inline behind the CRM session cookie:
  // audit, 3 Sep, a customer-sent .svg opened full size could POST to
  // /api/will/actions as Jo. Raster images and PDFs render inline; everything
  // else is a download, and the response is sandboxed either way.
  const mime = (res.mime || '').split(';')[0].trim().toLowerCase();
  const inlineOk = /^image\/(jpeg|jpg|png|gif|webp|heic|heif|bmp)$/.test(mime) || mime === 'application/pdf';
  const disposition = inlineOk ? 'inline' : 'attachment';
  return new NextResponse(res.body, {
    headers: {
      'content-type': inlineOk ? mime : 'application/octet-stream',
      'content-length': String(res.body.byteLength),
      'content-disposition': `${disposition}; filename="attachment-${id.slice(0, 24)}"`,
      // Private, because this is one customer's document behind a staff login,
      // but cached for the session so scrolling a thread does not re-download
      // every photo from Meta.
      'cache-control': 'private, max-age=3600',
      'x-content-type-options': 'nosniff',
      // Even an inline PDF or image gets no script, no same-origin: a crafted
      // file cannot reach the CRM's cookies or its API.
      'content-security-policy': "sandbox; default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'",
    },
  });
}
