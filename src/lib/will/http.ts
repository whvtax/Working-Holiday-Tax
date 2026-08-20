// Shared request helpers: bounded JSON body parsing (H9 — reject oversized
// bodies before buffering the whole thing into memory).
const MAX_BODY_BYTES = 64 * 1024; // 64 KB is ample for any action/message

export type ReadJsonResult<T> = { value: T } | { error: string; code: number };

export async function readJson<T>(req: Request): Promise<ReadJsonResult<T>> {
  const len = req.headers.get('content-length');
  if (len && Number(len) > MAX_BODY_BYTES) return { error: 'request body too large', code: 413 };
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return { error: 'request body too large', code: 413 };
  try {
    return { value: JSON.parse(raw) as T };
  } catch {
    return { error: 'bad json', code: 400 };
  }
}
