import {
  buildPaperwork, paperworkMessage, buildPaperworkMessage, classifyAttachment,
  acknowledgeAttachments, applyAttachments, PaperworkFacts,
} from '../paperwork-checklist';

const DASH = /[‒-―−⸺⸻﹘]/;
const base: PaperworkFacts = { lang: 'en', income: 'TFN', formComplete: true };

describe('buildPaperwork', () => {
  it('asks for everything for a fresh TFN customer, without ABN invoices', () => {
    expect(buildPaperwork(base)).toEqual(['id', 'bank_statement', 'income_statement', 'expenses', 'medicare']);
  });
  it('adds the form and ABN invoices when relevant', () => {
    const m = buildPaperwork({ ...base, income: 'TFN_ABN', formComplete: false });
    expect(m[0]).toBe('form');
    expect(m).toContain('abn_invoices');
  });
  it('drops what has arrived or was declared complete', () => {
    const m = buildPaperwork({ ...base, received: { id: 1, bank_statement: 2 }, declaredComplete: { income_statement: true }, expensesAnswered: true, medicareAnswered: true });
    expect(m).toEqual([]);
  });
  it('receipts count as the expenses answer', () => {
    expect(buildPaperwork({ ...base, received: { receipts: 3 } })).not.toContain('expenses');
  });
});

describe('paperworkMessage', () => {
  it('returns null when nothing is missing', () => {
    expect(paperworkMessage([], 'en')).toBeNull();
  });
  it('asks only for the missing items', () => {
    const msg = paperworkMessage(buildPaperwork({ ...base, received: { id: 1, bank_statement: 1, income_statement: 1 }, expensesAnswered: true }), 'en')!;
    expect(msg).toMatch(/Medicare/);
    expect(msg).not.toMatch(/passport|statement|payslips|receipts/i);
  });
  it('is clean in every language: no dashes, no refund promise, no residency conclusion, no AI', () => {
    for (const lang of ['en', 'de', 'ja']) {
      const msg = buildPaperworkMessage({ lang, income: 'TFN_ABN', formComplete: false })!;
      expect(msg).not.toMatch(DASH);
      expect(msg).not.toMatch(/refund will|you will get|guarantee|resident|tax.free|\bAI\b|\bbot\b/i);
      expect(msg).not.toMatch(/Erstattung wird|還付されます/);
      expect(msg.split('\n').filter((l) => /^\d\. /.test(l))).toHaveLength(7);
    }
  });
  it('mentions the closed bank account escape hatch and highlighting', () => {
    expect(buildPaperworkMessage(base)).toMatch(/highlight/);
    expect(buildPaperworkMessage(base)).toMatch(/closed/);
  });
  it('unknown languages fall back to English', () => {
    expect(buildPaperworkMessage({ ...base, lang: 'fr' })).toMatch(/I still need/);
  });
});

describe('classifyAttachment', () => {
  it('reads filenames and captions', () => {
    expect(classifyAttachment({ text: '📄 [Document: Passport.pdf]' }).kind).toBe('id');
    expect(classifyAttachment({ text: '📄 [Document: CommBank statement.pdf]' }).kind).toBe('bank_statement');
    expect(classifyAttachment({ text: '📷 [Photo] my payslip' }).kind).toBe('income_statement');
    expect(classifyAttachment({ text: '📄 [Document: Invoice 12.pdf]' }).kind).toBe('abn_invoices');
    expect(classifyAttachment({ text: '📷 [Photo] receipt for boots' }).kind).toBe('receipts');
  });
  it('a bare photo is unknown, never guessed', () => {
    expect(classifyAttachment({ text: '📷 [Photo]' }).kind).toBe('unknown');
  });
});

describe('acknowledgeAttachments', () => {
  it('names the file and lists only what is still missing', () => {
    const files = [{ text: '📄 [Document: passport.jpg]' }];
    const facts = applyAttachments(base, files);
    const msg = acknowledgeAttachments(files, buildPaperwork(facts), 'en')!;
    expect(msg).toMatch(/received your ID/);
    expect(msg).toMatch(/Still missing/);
    expect(msg).not.toMatch(/photo page/);
    expect(msg).not.toMatch(/got it all/i);
  });
  it('counts repeats and admits when a photo cannot be identified', () => {
    const files = [{ text: '📷 [Photo]' }, { text: '📷 [Photo]' }, { text: '📷 [Photo] receipt' }];
    const msg = acknowledgeAttachments(files, [], 'en')!;
    expect(msg).toMatch(/2 x a file/);
    expect(msg).toMatch(/cannot tell/);
    expect(msg).not.toMatch(/covers everything/);
  });
  it('says everything is covered only when nothing is missing', () => {
    const files = [{ text: '📄 [Document: receipt.pdf]' }];
    expect(acknowledgeAttachments(files, [], 'en')).toMatch(/covers everything/);
  });
  it('is dash free in de and ja', () => {
    for (const lang of ['de', 'ja']) {
      const msg = acknowledgeAttachments([{ text: '📷 [Photo]' }], ['medicare'], lang)!;
      expect(msg).not.toMatch(DASH);
    }
  });
});
