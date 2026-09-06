/**
 * Send for Signature / Mark Lodged follow the pipeline group (audit, 5 Sep).
 *
 * The chat's "Send for Signature" button was gated on ESTIMATE_READY /
 * FINAL_REVIEW and "Mark Lodged" on SIGNATURE_PENDING only. Nothing moves a
 * customer to the first two states any more (the questionnaire lands them at
 * FORM_COMPLETE, send_estimate jumps straight to Signature) and the badge
 * menu's "Completed" lands on SIGNED, so the badge said Review / Completed and
 * the matching button was missing. The server accepts send_signature from any
 * stage and send_lodged from SIGNED, so the buttons now key off STAGE_GROUPS.
 */
import fs from 'fs';
import path from 'path';
import { showSendForSignature, showMarkLodged } from '@/components/will/Dashboard';
import { STAGE_GROUPS, CustomerState } from '@/lib/will/state-machine';

const ALL: CustomerState[] = STAGE_GROUPS.flatMap((g) => [...g.states]) as CustomerState[];

describe('showSendForSignature', () => {
  it('is shown for every state in the Review group and nowhere else', () => {
    const rev = STAGE_GROUPS.find((g) => g.id === 'rev')!.states as readonly CustomerState[];
    for (const s of ALL) expect([s, showSendForSignature(s)]).toEqual([s, rev.includes(s)]);
    // The states real customers actually sit in.
    expect(showSendForSignature('FORM_COMPLETE')).toBe(true);
    expect(showSendForSignature('ESTIMATE_READY')).toBe(true);
    expect(showSendForSignature('SIGNATURE_PENDING')).toBe(false);
    expect(showSendForSignature('FORM_PENDING')).toBe(false);
  });
});

describe('showMarkLodged', () => {
  it('is shown at Signature and at SIGNED, nowhere else', () => {
    for (const s of ALL) {
      expect([s, showMarkLodged(s)]).toEqual([s, s === 'SIGNATURE_PENDING' || s === 'SIGNED']);
    }
  });
});

describe('Dashboard wiring', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  it('the two chat buttons are gated on the group helpers, not on sub-states', () => {
    expect(src).toContain('{showSendForSignature(chatSel.state) && (');
    expect(src).toContain('{showMarkLodged(chatSel.state) && (');
    expect(src).not.toContain("(chatSel.state === 'ESTIMATE_READY' || chatSel.state === 'FINAL_REVIEW') && (");
    expect(src).not.toContain("{chatSel.state === 'SIGNATURE_PENDING' && (");
  });
  it('still calls the same two server actions', () => {
    // Both buttons now go through the shared runStageAction helper (a
    // double-click guard added the same day, audit3 actions lane), which
    // itself calls act({ action, customerId }) — same server call, same params.
    expect(src).toContain("runStageAction('send_signature', chatSel.id,");
    expect(src).toContain("runStageAction('send_lodged', chatSel.id,");
    expect(src).toContain('const r = await act({ action, customerId });');
  });
});
