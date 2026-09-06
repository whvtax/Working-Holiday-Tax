/**
 * Overview assistant Move card carries the same safety as the stage badge
 * (audit, 5 Sep).
 *
 * approveProposal used to send set_state with force:true for every
 * move_stage proposal, so one click on a card could put a PAID customer back
 * into a sales stage (or straight to PAID) with no second look, while the
 * chat-header badge asks first and only forces an out-of-order move. Both
 * screens now compute force from TRANSITIONS and ask the identical question
 * before a forced move of a paid customer into a sales stage.
 */
import fs from 'fs';
import path from 'path';

const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');

const approveBody = (() => {
  const start = src.indexOf('const approveProposal = useCallback(');
  const end = src.indexOf('const renderProposalCard', start);
  return src.slice(start, end);
})();

describe('assistant Move card (approveProposal)', () => {
  it('no longer forces every move_stage proposal', () => {
    expect(approveBody).not.toContain('force: true }');
    expect(approveBody).toMatch(/force = !nextStates\.includes\(p\.toState\)/);
    expect(approveBody).toMatch(/TRANSITIONS\[cust\.state\]/);
    expect(approveBody).toMatch(/action: 'set_state', customerId: p\.customerId, state: p\.toState, force \}/);
  });

  it('asks the same paid-to-sales question the stage badge asks', () => {
    const question = 'has PAID. Moving them back to ${stageLabelOf(';
    const occurrences = src.split(question).length - 1;
    expect(occurrences).toBe(2);
    expect(approveBody).toContain(question);
    expect(approveBody).toMatch(/if \(force && cust\.paid && SALES\.includes\(p\.toState\)/);
    expect(approveBody).toMatch(/SALES = \['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING'\]/);
  });

  it('is rebuilt when the customer list changes, so the check reads the current stage', () => {
    expect(approveBody).toMatch(/\}, \[asstDone, asstRunning, asstEdit, refresh, data\.customers\]\);/);
  });
});
