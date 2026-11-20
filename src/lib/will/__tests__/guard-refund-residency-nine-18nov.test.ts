/**
 * VERIFY-18nov, open item 1 (closed 18 Nov): a refund promised without a figure, and a residency
 * or Medicare determination, are refused in all nine languages the way English refuses them.
 * Every approved fixed text, in every language, is run through the same rules to prove none of
 * them is now caught. Synthetic sentences only; nothing here sends a message.
 */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { withBrand } from '@/lib/will/brand-context';
import { policyGuard, rules18NovHit, promisesRefund, uncoveredLanguage, GUARD_COVERED_LANGS } from '@/lib/will/policy-guard';
import { APPROVED, OPENING_MSG, PRICES_MSG, PRICES_FOREIGN_MSG, EXPENSES_INTAKE_MSG, EXPENSES_DONE_MSG, AGENT_PHRASES } from '@/lib/will/approved-messages';
import * as I from '@/lib/will/i18n';
import { LANGS } from '@/lib/will/i18n';
import { TEMPLATE_TRANSLATIONS } from '@/lib/will/template-translations.generated';
import { SVT_FIXED_TEXTS } from '@/lib/will/svt-fixed-texts';
import { APPROVED_ES } from '@/lib/will/approved-es';
import { APPROVED_FR } from '@/lib/will/approved-fr';
import { APPROVED_IT } from '@/lib/will/approved-it';
import { APPROVED_PT } from '@/lib/will/approved-pt';
import { PRICE_FLOW_STEPS, PRICE_FLOW_PAYMENT_DETAILS_TEXT, priceFlowPaymentDetails } from '@/lib/will/price-flow-variant';
import { withMygovReassurance, priceMessageIn, reviewMessageIn, firstContactPriceMessage, priceMessageFor } from '@/lib/will/instant-choice';
import { REFUND_CHECKIN_MSG, REVIEW_ASK_SHORT_MSG, REFUND_NOT_YET_MSG } from '@/lib/will/review-asks';
import { ACCOUNT_NAME_MSG } from '@/lib/will/account-name';
import { seedTemplates } from '@/lib/will/seed';

const base = { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null };
const UNPAID = { ...base, state: 'PRICE_SENT', paid: false } as never;
const PAID = { ...base, state: 'FORM_PENDING', paid: true } as never;
const v = (t: string, ctx = UNPAID) => policyGuard(t, ctx).violations;

const REFUND_PROMISES: Record<string, string[]> = {
  en: ["You'll definitely get a refund.", 'You will get money back.', 'You are guaranteed a refund.', 'Guaranteed refund for you!'],
  de: ['Du bekommst auf jeden Fall eine Rückerstattung.', 'Du wirst sicher Geld zurückbekommen.', 'Eine Rückerstattung ist garantiert.', 'Sie erhalten garantiert eine Steuererstattung.'],
  ja: ['必ず還付が受けられます。', '確実にお金が戻ってきます。', '還付は保証されています。'],
  es: ['Definitivamente recibirás un reembolso.', 'Vas a recuperar dinero seguro.', 'Te garantizamos un reembolso.', 'Vas a recibir una devolución.'],
  fr: ['Tu vas certainement recevoir un remboursement.', "Vous allez récupérer de l'argent, c'est sûr.", 'Un remboursement est garanti.', 'Tu recevras un remboursement.'],
  it: ['Riceverai sicuramente un rimborso.', 'Ti garantiamo un rimborso.', 'Avrai di sicuro dei soldi indietro.'],
  pt: ['Você definitivamente vai receber uma restituição.', 'Com certeza vais receber dinheiro de volta.', 'O reembolso é garantido.', 'Você vai receber um reembolso.'],
  zh: ['你一定会拿到退税。', '你肯定能拿回钱。', '保证退税。', '你会拿到退税。'],
  vi: ['Bạn chắc chắn sẽ được hoàn thuế.', 'Bạn sẽ nhận lại tiền.', 'Đảm bảo hoàn thuế.', 'Bạn sẽ được hoàn thuế.'],
};
const DETERMINATIONS: Record<string, string[]> = {
  en: ['You are an Australian tax resident.', "You don't have to pay the Medicare levy.", 'You are exempt from the Medicare levy.'],
  de: ['Du bist australischer Steuerresident.', 'Du bist steuerlich ansässig in Australien.', 'Du musst die Medicare-Abgabe nicht zahlen.', 'Du zahlst keine Medicare Levy.'],
  ja: ['あなたはオーストラリアの税務上の居住者です。', 'あなたは非居住者です。', 'メディケア税を支払う必要はありません。', 'メディケアレビーは免除されます。'],
  es: ['Eres residente fiscal australiano.', 'No tienes que pagar el Medicare levy.', 'No necesitas pagar el Medicare levy.'],
  fr: ['Tu es résident fiscal australien.', "Tu n'as pas à payer le Medicare levy.", 'Vous êtes exonéré du Medicare levy.'],
  it: ['Sei residente fiscale australiano.', 'Non devi pagare il Medicare levy.', 'Sei esente dal Medicare levy.'],
  pt: ['Você é residente fiscal australiano.', 'Você não precisa pagar o Medicare levy.', 'Você está isento do Medicare levy.'],
  zh: ['你是澳洲税务居民。', '你属于澳洲税务居民。', '你不需要缴纳Medicare税。', '你可以免除Medicare levy。'],
  vi: ['Bạn là người cư trú thuế Úc.', 'Bạn không phải là cư dân thuế Úc.', 'Bạn không phải đóng thuế Medicare.', 'Bạn được miễn Medicare levy.'],
};

describe('a figure-free refund promise is refused in all nine languages, before and after payment', () => {
  it('covers all nine languages with at least two sentences each', () => {
    expect(Object.keys(REFUND_PROMISES).sort()).toEqual([...LANGS].sort());
    for (const l of LANGS) expect(REFUND_PROMISES[l].length).toBeGreaterThanOrEqual(2);
  });
  it.each(LANGS)('%s', (l) => {
    for (const s of REFUND_PROMISES[l]) {
      expect([s, v(s)]).toEqual([s, expect.arrayContaining(['TAX_DETERMINATION'])]);
      expect([s, v(s, PAID)]).toEqual([s, expect.arrayContaining(['TAX_DETERMINATION'])]);
    }
  });
});

describe('a residency or Medicare determination is refused before payment in all nine languages', () => {
  it('covers all nine languages with at least two sentences each', () => {
    for (const l of LANGS) expect(DETERMINATIONS[l].length).toBeGreaterThanOrEqual(2);
  });
  it.each(LANGS)('%s', (l) => {
    for (const s of DETERMINATIONS[l]) expect([s, v(s)]).toEqual([s, expect.arrayContaining(['TAX_DETERMINATION'])]);
  });
});

describe('describing what we check, and the process after lodging, still passes', () => {
  it.each([
    ['en', "We'll check whether you get a refund."],
    ['de', 'Ob du eine Rückerstattung bekommst, prüfen wir in der Durchsicht.'],
    ['de', 'Deine Rückerstattung sollte innerhalb von 14 Werktagen ankommen.'],
    ['ja', '還付があるかどうかは、確認後にお伝えします。'],
    ['es', 'Revisamos si vas a recibir un reembolso.'],
    ['fr', 'Nous vérifions si tu vas recevoir un remboursement.'],
    ['fr', 'Ton remboursement arrive sur ton compte bancaire.'],
    ['it', 'Controlliamo se riceverai un rimborso.'],
    ['pt', 'Verificamos se você vai receber uma restituição.'],
    ['zh', '我们会检查你是否能拿到退税。'],
    ['vi', 'Bên mình sẽ kiểm tra xem bạn có được hoàn thuế không.'],
    ['vi', 'Bên mình sẽ kiểm tra xem bạn là người cư trú thuế hay không.'],
  ])('%s: %s', (_l, s) => {
    expect(v(s)).not.toContain('TAX_DETERMINATION');
    expect(promisesRefund(s)).toBe(false);
  });
});

describe('Chinese and Vietnamese have the other rules too (DIY, discount, hedge, non-refundable)', () => {
  it.each([
    ['你可以自己申报，一步一步来。', 'DIY_INSTRUCTIONS'], ['Bạn có thể tự khai thuế, làm từng bước.', 'DIY_INSTRUCTIONS'],
    ['我们可以给你打折。', 'PRICE_NEGOTIATION'], ['Bên mình có thể giảm giá cho bạn.', 'PRICE_NEGOTIATION'],
    ['好问题！这取决于你的个人情况。', 'PRE_PAYMENT_HEDGE'], ['Câu hỏi hay! Cái này tùy vào trường hợp của bạn.', 'PRE_PAYMENT_HEDGE'],
    ['我们的费用不退款。', 'NON_REFUNDABLE_WORDING'], ['Phí của bên mình không được hoàn lại.', 'NON_REFUNDABLE_WORDING'],
  ])('%s', (s, code) => {
    expect(v(s)).toContain(code);
  });
  it('the reassurance "you don\'t need to lodge it yourself" passes', () => {
    expect(v('你不需要自己申报，我们会处理。')).not.toContain('DIY_INSTRUCTIONS');
    expect(v('Bạn không cần tự khai thuế, bên mình lo hết.')).not.toContain('DIY_INSTRUCTIONS');
  });
});

// ---------- every approved fixed text, every language ----------
const collect = (val: unknown, path: string, out: [string, string][]) => {
  if (typeof val === 'string') out.push([path, val]);
  else if (val && typeof val === 'object') for (const [k, x] of Object.entries(val)) collect(x, `${path}.${k}`, out);
};
const fill = (t: string) => t.replace(/\{\{(?:name|1)\}\}/g, 'Sam').replace(/\{\{AMOUNT\}\}/g, '$1,234')
  .replace(/\{\{form\}\}/g, 'https://workingholidaytax.com.au/start').replace(/\{AMOUNT\}/g, '220');
function allFixedTexts(): [string, string][] {
  const all: [string, string][] = [];
  collect({ APPROVED, OPENING_MSG, PRICES_MSG, PRICES_FOREIGN_MSG, EXPENSES_INTAKE_MSG, EXPENSES_DONE_MSG, AGENT_PHRASES }, 'approved-messages', all);
  collect(I, 'i18n', all);
  collect(TEMPLATE_TRANSLATIONS, 'template-translations', all);
  collect(SVT_FIXED_TEXTS, 'svt-fixed-texts', all);
  collect({ APPROVED_ES, APPROVED_FR, APPROVED_IT, APPROVED_PT }, 'approved-lang', all);
  collect({ PRICE_FLOW_STEPS, PRICE_FLOW_PAYMENT_DETAILS_TEXT }, 'price-flow-variant', all);
  collect({ REFUND_CHECKIN_MSG, REVIEW_ASK_SHORT_MSG, REFUND_NOT_YET_MSG, ACCOUNT_NAME_MSG }, 'review-asks', all);
  for (const l of LANGS) {
    all.push([`instant-choice.mygov.${l}`, withMygovReassurance('', ['how do I link myGov?'], l)]);
    for (const a of [220, 385, 330, 495] as const) all.push([`price-flow-variant.details.${a}.${l}`, priceFlowPaymentDetails(a, l)]);
  }
  for (const l of ['de', 'ja'] as const) for (const t of ['TFN', 'TFN_ABN'] as const) for (const first of [true, false]) {
    all.push([`instant-choice.price.${l}.${t}.${first}`, priceMessageIn(l, t, first, 'Sam')]);
    all.push([`instant-choice.review.${l}.${t}`, reviewMessageIn(l, 'Sam', t)]);
  }
  for (const t of ['TFN', 'TFN_ABN'] as const) for (const f of [false, true]) {
    all.push([`instant-choice.firstContact.${t}.${f}`, firstContactPriceMessage(t, 'Sam', f)]);
    all.push([`instant-choice.priceFor.${t}.${f}`, priceMessageFor(t, f)]);
  }
  for (const r of seedTemplates()) all.push([`library.${r.key}`, r.body]);
  return all.map(([p, t]) => [p, fill(t)]);
}
// The Medicare exemption script is sent only AFTER the form (MEDICARE_MSG, Library medicare_<lang>).
// Before payment it is refused in every language, English included (PRE_PAYMENT_MEDICARE_SCRIPT).
const MEDICARE_SCRIPT_ONLY_AFTER_PAYMENT = /MEDICARE_MSG|library\.medicare_(?:zh|vi)$/;

describe('no approved fixed text, in any language, is caught by the 18 Nov rules', () => {
  const all = allFixedTexts();
  it('the corpus is the whole set (i18n tables, translations, instant-choice, svt, approved-<lang>, price flow, Library)', () => {
    expect(all.length).toBeGreaterThan(1500);
  });
  it('sentence by sentence, the new rules match nothing', () => {
    const hits: string[] = [];
    for (const [p, t] of all) for (const s of t.split(/\n+|(?<=[.!?。！？])\s*/)) {
      const h = rules18NovHit(s).filter((x) => !(x === 'ZH_VI_MEDICARE_SCRIPT' && MEDICARE_SCRIPT_ONLY_AFTER_PAYMENT.test(p)));
      if (h.length) hits.push(`${p}: ${h.join(',')}: ${s}`);
    }
    expect(hits).toEqual([]);
  });
  it('whole texts through policyGuard: never a determination, DIY or discount, paid or not', () => {
    const bad: string[] = [];
    for (const [p, t] of all) {
      for (const ctx of [UNPAID, PAID]) {
        const out = policyGuard(t, { ...(ctx as object), estimateFromTeam: 123400 } as never).violations;
        const hit = out.filter((x) => ['TAX_DETERMINATION', 'DIY_INSTRUCTIONS', 'PRICE_NEGOTIATION'].includes(x));
        if (hit.length) bad.push(`${p}: ${hit.join(',')}`);
      }
      const paidOut = policyGuard(t, PAID).violations.filter((x) => ['PRE_PAYMENT_HEDGE', 'NON_REFUNDABLE_WORDING', 'PRE_PAYMENT_MEDICARE_SCRIPT'].includes(x));
      if (paidOut.length) bad.push(`${p}: ${paidOut.join(',')}`);
    }
    expect(bad).toEqual([]);
  });
  it('the Medicare message goes through in Chinese and Vietnamese in the context it is sent in (after the form)', () => {
    for (const l of ['zh', 'vi'] as const) {
      expect(policyGuard(I.MEDICARE_MSG[l], { ...(PAID as object), isApprovedTemplate: true } as never).violations).toEqual([]);
      expect(policyGuard(I.MEDICARE_MSG[l], PAID).violations).toEqual([]);
    }
  });
});

describe('free replies wait for a person only in a language the guard does not cover', () => {
  it('all nine languages are covered now', () => {
    expect([...GUARD_COVERED_LANGS].sort()).toEqual([...LANGS].sort());
    for (const t of ['你好，我们看一下你的情况。', 'Chào bạn, bên mình xem giúp bạn nhé.', 'Hallo, wir schauen uns das an.', 'こんにちは']) expect(uncoveredLanguage(t)).toBeNull();
  });
  it('Korean, Thai, Arabic, Russian, Hindi or Hebrew is not covered', () => {
    for (const t of ['안녕하세요', 'สวัสดี', 'مرحبا', 'Привет', 'नमस्ते', 'שלום']) expect(uncoveredLanguage(t)).not.toBeNull();
  });

  const input = (text: string, reply: string): EngineInput => {
    (decide as jest.Mock).mockResolvedValue({ action: 'reply', confidence: 0.9, reply_text: reply });
    return {
      ctx: { name: 'Sam', state: 'PRICE_SENT' as const, income: null, paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: null, knowledge: [], decisionMode: 'will' },
      guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
      history: [{ role: 'assistant', text: 'Hi' }, { role: 'customer', text }],
      mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
    } as unknown as EngineInput;
  };
  beforeEach(() => (decide as jest.Mock).mockReset());
  it('a Korean chat on Autopilot waits for approval', async () => {
    const out = await withBrand('wht', () => runEngine(input('세금 환급 질문이 있어요', 'Thanks, our team will look at it.')));
    expect(out.kind).toBe('pending_approval');
  });
  it('a refund promise in Vietnamese never goes out on Autopilot', async () => {
    const out = await withBrand('svt', () => runEngine(input('Mình có được hoàn thuế không?', 'Bạn chắc chắn sẽ được hoàn thuế.')));
    expect(out.kind === 'queued' && /chắc chắn sẽ được hoàn thuế/.test(out.replyText ?? '')).toBe(false);
  });
});
