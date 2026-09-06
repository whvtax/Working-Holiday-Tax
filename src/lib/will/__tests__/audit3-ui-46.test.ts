/**
 * Chat-panel "Send for Signature" / "Mark Lodged": one send per click
 * (audit, 5 Sep).
 *
 * The button is rendered from chatSel.state, which only changes after
 * refresh() resolves, and the server has no stage gate for send_signature or
 * send_lodged. So during the multi-second send the button stayed clickable
 * and a second click + confirm sent the notice to the customer twice and
 * re-armed the signature cadence. Now both buttons share an in-flight guard
 * (ref + state) and grey out with "…" while busy, like the CRM card's
 * sigBusy. Wording and server behaviour unchanged.
 */
import fs from 'fs';
import path from 'path';

const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');

function section(startMarker: string, endMarker: string): string {
  const a = src.indexOf(startMarker);
  expect(a).toBeGreaterThan(-1);
  const b = src.indexOf(endMarker, a);
  expect(b).toBeGreaterThan(a);
  return src.slice(a, b);
}

describe('chat-panel stage actions are single-shot while in flight', () => {
  const helper = section('const runStageAction = async', 'const [, setClock]');

  it('runStageAction refuses a second call while one is in flight and releases the guard in finally', () => {
    expect(helper).toContain('if (stageActionRef.current) return;');
    expect(helper).toContain('stageActionRef.current = customerId;');
    expect(helper).toContain('setStageActionBusy(customerId);');
    expect(helper).toMatch(/finally \{\s*stageActionRef\.current = null;\s*setStageActionBusy\(null\);/);
    // The button only disappears once refresh() has swapped the state, so
    // the busy window must cover the refresh, not just the send.
    expect(helper).toContain('await refresh();');
  });

  it('both buttons are disabled and show "…" while busy, and the old inline act() calls are gone', () => {
    const sig = section('showSendForSignature(chatSel.state) && (', '✍️ Send for Signature');
    const lodged = section('showMarkLodged(chatSel.state) && (', '✅ Mark Lodged');
    for (const b of [sig, lodged]) {
      expect(b).toContain('disabled={stageActionBusy === chatSel.id}');
      expect(b).toContain('if (stageActionRef.current) return;');
      expect(b).toContain("stageActionBusy === chatSel.id ? '…'");
      expect(b).not.toContain("await act({ action: 'send_");
    }
    expect(sig).toContain("runStageAction('send_signature', chatSel.id, 'Sent, moved to Signature ✓')");
    expect(lodged).toContain("runStageAction('send_lodged', chatSel.id, 'Sent, moved to Completed ✓')");
  });

  it('keeps the confirm wording exactly as before', () => {
    expect(src).toContain('Send the "ready for signature" message to ${phoneOf(chatSel.waId)} and move them to Signature?');
    expect(src).toContain('Send the "lodged successfully" message to ${phoneOf(chatSel.waId)} and move them to Completed?');
  });
});
