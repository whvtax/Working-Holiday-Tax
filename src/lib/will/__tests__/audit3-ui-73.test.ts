/**
 * CRM Done card: signature state is re-validated, not cached forever
 * (audit, 5 Sep).
 *
 * `sigFetched` was only ever added to, so /api/will/link ran once per task
 * for the life of the page. A "ready for signature" sent from the Will chat
 * panel left the card still offering "Send for Signature" (and pressing it
 * re-sent the notice), and one failed lookup hid both buttons until a full
 * reload. Now: failures are not cached, the cache empties on focus /
 * visibility (throttled) and when the version poll sees a change, and the
 * card re-reads the link before sending so nothing goes out twice. Wording
 * and server behaviour unchanged.
 */
import fs from 'fs';
import path from 'path';

const src = fs.readFileSync(
  path.join(process.cwd(), 'src/app/(site)/crm/dashboard/DashboardClient.tsx'),
  'utf8',
);

function section(startMarker: string, endMarker: string): string {
  const a = src.indexOf(startMarker);
  expect(a).toBeGreaterThan(-1);
  const b = src.indexOf(endMarker, a);
  expect(b).toBeGreaterThan(a);
  return src.slice(a, b);
}

describe('Done-card signature lookup cache is invalidated', () => {
  it('a failed lookup is not cached as "no customer"', () => {
    const eff = section('const pending = doneTasks.filter(t => t.whatsapp && !sigFetched.current.has(t.id))', 'async function sendSignatureFromCard');
    expect(eff).toContain('sigFetched.current.delete(t.id)');
    expect(eff).not.toContain('[t.id]: null }))');
    // the effect re-runs on the revalidation tick, not only when tasks change
    expect(eff).toContain('[doneTasks, sigTick]');
  });

  it('focus / visibility clear the cache and bump the tick, throttled', () => {
    const eff = section('const sigFetched = useRef<Set<string>>(new Set())', 'const taskMatchesSearch');
    expect(eff).toContain("window.addEventListener('focus', revalidate)");
    expect(eff).toContain("document.addEventListener('visibilitychange', revalidate)");
    expect(eff).toContain('sigFetched.current.clear()');
    expect(eff).toContain('setSigTick(n => n + 1)');
    expect(eff).toMatch(/Date\.now\(\) - lastRevalidate < \d+_?\d*\) return/);
  });

  it('the version poll clears the cache when the token changes', () => {
    const poll = section("fetch('/api/crm/version'", 'const sigFetched = useRef');
    expect(poll).toContain('if (changed) { sigFetched.current.clear();');
  });

  it('sendSignatureFromCard re-reads the link and skips the send when the notice already went out', () => {
    const fn = section('async function sendSignatureFromCard', 'async function markLodgedFromCard');
    const reread = fn.indexOf('/api/will/link?phone=');
    const send = fn.indexOf("action:'send_signature'");
    expect(reread).toBeGreaterThan(-1);
    expect(send).toBeGreaterThan(reread);
    expect(fn).toContain('fresh.signatureReadySent');
    expect(fn).toMatch(/setSigLinks\(prev => \(\{ \.\.\.prev, \[taskId\]: fresh \}\)\)\s*setSigBusy\(null\)\s*return/);
    // no new owner or customer facing wording
    expect(fn).toContain("alert(j?.error ?? 'Could not send the message')");
    expect(fn).toContain("alert('Could not reach the server. Nothing was sent.')");
  });

  it('button wording is unchanged', () => {
    expect(src).toContain("'✍️ Send for Signature'");
    expect(src).toContain("'✅ Mark Lodged'");
  });
});
