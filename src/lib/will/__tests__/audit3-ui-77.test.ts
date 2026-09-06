/**
 * Customer-drawer quick reply (audit, 5 Sep).
 *
 * The drawer composer wiped the box before WhatsApp answered, so a refused
 * send (outside the 24h window, kill switch) left only a red toast and the
 * typed text was gone; the main composer had already been fixed to clear on
 * success only. Its label also said the reply "pauses Will", which manual_reply
 * stopped doing on 31 Aug. Source-shape test: the drawer now uses the same
 * clear-on-success pattern and the label matches the server.
 */
import fs from 'fs';
import path from 'path';

const src = fs.readFileSync(
  path.join(process.cwd(), 'src/components/will/Dashboard.tsx'),
  'utf8',
);

function drawerComposer(): string {
  const a = src.indexOf('Quick reply (sends now');
  expect(a).toBeGreaterThan(-1);
  const b = src.indexOf('<div className="mlabel">Journey</div>', a);
  expect(b).toBeGreaterThan(a);
  return src.slice(a, b);
}

describe('drawer quick reply', () => {
  it('only clears the box once the send succeeded, on Enter and on click', () => {
    const block = drawerComposer();
    const clearOnSuccess = block.match(/sendManual\(drawer\.id, drawerReply\)\.then\(\(sent\) => \{ if \(sent\) setDrawerReply\(''\); \}\)/g) ?? [];
    expect(clearOnSuccess).toHaveLength(2);
    // the old fire-and-wipe shape must be gone
    expect(block).not.toMatch(/sendManual\(drawer\.id, drawerReply\); setDrawerReply\(''\)/);
  });

  it('label says Will stays active, matching manual_reply on the server', () => {
    expect(src).not.toContain('pauses {ASSISTANT_NAME}');
    expect(src).toContain('Quick reply (sends now, {ASSISTANT_NAME} stays active)');
  });

  it('server manual_reply does not pause the assistant', () => {
    const route = fs.readFileSync(path.join(process.cwd(), 'src/app/api/will/actions/route.ts'), 'utf8');
    const a = route.indexOf("case 'manual_reply':");
    const b = route.indexOf('case ', a + 10);
    const block = route.slice(a, b);
    expect(block).toContain('NO LONGER pauses the assistant');
    expect(block).not.toMatch(/aiPaused:\s*true/);
  });
});
