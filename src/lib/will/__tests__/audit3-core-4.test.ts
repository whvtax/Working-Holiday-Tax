/**
 * (audit, 5 Sep) The Decision Log classifier and the reason strings had drifted
 * apart: three RULES matched text nothing writes any more, and fifteen live
 * reasons (voice notes, failed sends, every payment task, the Medicare and
 * review holds) fell through to the FALLBACK, whose second sentence tells Jo
 * to add a Library answer. For a WhatsApp outage.
 *
 * The earlier test only passed because its list of "real" reasons was typed by
 * hand and went stale with the code. This one reads the literal `reason:`
 * strings straight out of the files that raise tasks, so a reason added or
 * reworded there without a matching rule fails here instead of on the card.
 */
import fs from 'node:fs';
import path from 'node:path';
import { explainHandoffReason, isTemplateShaped } from '@/lib/will/handoff-reasons';
import { documentDropReason } from '@/lib/will/document-drop';

const ROOT = path.resolve(__dirname, '..', '..', '..');
const RAISERS = [
  'lib/will/service.ts',
  'lib/will/engine.ts',
  'lib/will/scheduler.ts',
  'lib/will/channel.ts',
  'lib/will/store-supabase.ts',
  'app/api/will/actions/route.ts',
  'app/api/will/webhook/route.ts',
];

/** Every string literal written as a task's `reason:` in the files above, with
 *  each `${…}` interpolation stood in for by "X". The model's own task_reason
 *  values (claude.ts) are deliberately not here: those are the model describing
 *  a question it could not answer, which is exactly what the FALLBACK is for. */
function reasonsWrittenInSource(): [string, string][] {
  const out: [string, string][] = [];
  for (const rel of RAISERS) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    // A task object always lists `severity` straight after `reason`. Anything
    // with a statement in between (a `;`) is not a task literal.
    const re = /(?<![\w_])reason:\s*([\s\S]*?),\s*\n\s*severity:/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src))) {
      const seg = m[1];
      if (seg.includes(';')) {
        // Not a task; carry on from just past this `reason:` so the match does
        // not swallow the real ones that follow it.
        re.lastIndex = m.index + 'reason:'.length;
        continue;
      }
      // Interpolations first (one level of nesting is enough for these files),
      // so a template literal inside `${…}` does not split the outer one.
      const flat = seg.replace(/\$\{(?:[^{}]|\{[^{}]*\})*\}/g, 'X');
      const lits = flat.match(/'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g) ?? [];
      for (const lit of lits) {
        const text = lit.slice(1, -1).replace(/\\'/g, "'");
        // The model's own default reason (engine.ts) is the one string that
        // SHOULD read as an unanswered question, which is what the FALLBACK is.
        if (text.length > 12 && text !== 'Assistant requested handoff') out.push([rel, text]);
      }
    }
  }
  out.push(['lib/will/document-drop.ts', documentDropReason(1)]);
  out.push(['lib/will/document-drop.ts', documentDropReason(3)]);
  return out;
}

const REASONS = reasonsWrittenInSource();
/** How the report route groups a reason before the card sees it. */
const grouped = (r: string) => r.replace(/:.*$/, '').slice(0, 60);

describe('audit3 core 4: every task reason the code writes is classified', () => {
  it('found the reasons in source (the scanner itself still works)', () => {
    expect(REASONS.length).toBeGreaterThanOrEqual(20);
    const joined = REASONS.map(([, r]) => r).join('\n');
    expect(joined).toContain('Customer sent a voice note');
    expect(joined).toContain("Will's reply was not delivered");
    expect(joined).toContain('Customer confirmed payment');
  });

  it.each(REASONS)('%s: "%s" does not fall through to the Library advice', (_file, reason) => {
    for (const form of [reason, grouped(reason)]) {
      const e = explainHandoffReason(form);
      expect(e.kind).not.toBe('other');
      expect(isTemplateShaped(form)).toBe(false);
      expect(e.prevent.toLowerCase()).not.toMatch(/add (an? )?(approved )?(answer|template) to the library/);
      expect(e.prevent).not.toContain('To the Library');
    }
  });

  const PROPER_NOUNS = /^(Will|WhatsApp|Meta|Autopilot)\b/;
  it.each(REASONS)('%s: "%s" gives a because-clause that reads mid-sentence', (_file, reason) => {
    const { because } = explainHandoffReason(reason);
    if (!PROPER_NOUNS.test(because)) expect(because[0]).toBe(because[0].toLowerCase());
    expect(because.endsWith('.')).toBe(false);
  });

  it('maps each family to the kind the card treats it as', () => {
    const kind = (r: string) => explainHandoffReason(r).kind;
    expect(kind('Customer sent a voice note. Open WhatsApp to listen and reply.')).toBe('unreadable');
    expect(kind('WhatsApp delivered an event with no readable text (type=unknown). It may not be a message')).toBe('unreadable');
    expect(kind("Will's reply was not delivered")).toBe('delivery');
    expect(kind('WhatsApp did not deliver this message')).toBe('delivery');
    expect(kind('The Medicare exemption message was not delivered')).toBe('delivery');
    expect(kind('PAID, BUT THEY HAVE NOT BEEN TOLD. The payment was confirmed (a screenshot)')).toBe('delivery');
    expect(kind('A reply may not have reached this customer')).toBe('delivery');
    expect(kind('A scheduled follow up failed three times and has been given up on.')).toBe('delivery');
    expect(kind('Customer confirmed payment (a screenshot).')).toBe('system');
    expect(kind('They paid (a screenshot) and are moved to Paid, but Will is switched off')).toBe('system');
    expect(kind('Payment screenshot does not match')).toBe('system');
    expect(kind(documentDropReason(2))).toBe('system');
    expect(kind('The same message keeps arriving in this chat, so it is looping rather than progressing')).toBe('policy');
    expect(kind('Model proposed PRICE_SENT -> PAID but the customer did not report a payment; reply held')).toBe('guard');
    expect(kind('Medicare exemption message held by the Policy Guard')).toBe('guard');
    expect(kind('Review request held by the Policy Guard')).toBe('guard');
    expect(kind('Will could not answer this chat automatically (boom). Please reply by hand.')).toBe('capacity');
    expect(kind('A WhatsApp message could not be processed after 3 attempts and needs a manual reply. Error')).toBe('capacity');
  });

  it('the stuck-conversation clause quotes the real ceiling from service.ts', () => {
    const src = fs.readFileSync(path.join(ROOT, 'lib/will/service.ts'), 'utf8');
    expect(src).toMatch(/MAX_INBOUND_BEFORE_PAYMENT = 80\b/);
    const { because } = explainHandoffReason('Customer sent 81 messages before paying');
    expect(because).toContain('eighty');
    expect(because).not.toContain('twenty');
  });

  it('the three dead rules are gone, so their strings now read as unclassified', () => {
    for (const dead of ['Customer sent proof of payment', 'Customer sent a message Will cannot read', 'An existing chat sent a message']) {
      expect(explainHandoffReason(dead).kind).toBe('other');
    }
  });
});
