import { stageFacts, agoLabel } from '@/lib/will/service';
import { buildSystemPrompt } from '@/lib/will/playbook';

const NOW = new Date('2026-11-01T02:00:00Z').getTime();
const day = (n: number) => new Date(NOW - n * 86400000).toISOString();

describe('stageFacts: the dated milestones Will answers status questions from', () => {
  it('lists only what happened, and says plainly when the form has not arrived', () => {
    const f = stageFacts([{ to: 'PAID', createdAt: day(3) }], NOW);
    expect(f).toContain('payment confirmed 3 days ago');
    expect(f).toContain('tax form has NOT been received yet');
    expect(f).not.toMatch(/signature|signed|lodged/);
  });

  it('adds form, signature, signing and lodgement with the 14 day ATO email date', () => {
    const f = stageFacts([
      { to: 'PAID', createdAt: day(9) }, { to: 'FORM_COMPLETE', createdAt: day(8) },
      { to: 'SIGNATURE_PENDING', createdAt: day(2) }, { to: 'SIGNED', createdAt: day(1) }, { to: 'LODGED', createdAt: day(0) },
    ], NOW);
    expect(f).toContain('form was received 8 days ago');
    expect(f).toContain('sent to them for signature 2 days ago');
    expect(f).toContain('they signed yesterday');
    expect(f).toContain('lodged with the ATO today');
    expect(f).toContain('due by about 15 Nov');
    expect(f).not.toContain('NOT been received');
  });

  it('is empty for a lead with no milestones', () => {
    expect(stageFacts([{ to: 'PRICE_SENT', createdAt: day(1) }], NOW)).toBe('');
  });

  it('agoLabel survives a bad date', () => { expect(agoLabel('nope', NOW)).toBe('at an unknown time'); });
});

describe('playbook carries the status rules', () => {
  it('has the status block and no dashes', () => {
    const p = buildSystemPrompt({ name: 'Sam', state: 'PAID', income: 'TFN', paid: true, formComplete: false, missingDocs: [], estimatedRefundCents: null } as never);
    const all = `${p.stable}\n${p.dynamic}`;
    expect(all).toContain('STATUS QUESTIONS AFTER PAYMENT');
    expect(all).toContain('FACTS FROM OUR SYSTEM');
    const block = all.slice(all.indexOf('# STATUS QUESTIONS AFTER PAYMENT'), all.indexOf('[expenses_intake] (English', all.indexOf('# STATUS QUESTIONS AFTER PAYMENT')));
    expect(block.length).toBeGreaterThan(500);
    expect(block).not.toMatch(new RegExp('[\\u2013\\u2014\\u2015]'));
  });
});
