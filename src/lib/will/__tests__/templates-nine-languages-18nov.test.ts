/**
 * Decision 018 (Jo, 18 Nov): every message Will and Mia send from a fixed text exists in all nine
 * languages, exactly as the translators wrote it, for both brands, and the customer gets their own
 * language. Synthetic names only; nothing here sends a message.
 */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import fs from 'fs';
import path from 'path';
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { withBrand } from '@/lib/will/brand-context';
import { TEMPLATE_TRANSLATIONS } from '@/lib/will/template-translations.generated';
import * as I from '@/lib/will/i18n';
import { LANGS, type Lang } from '@/lib/will/i18n';
import { APPROVED, OPENING_MSG, PRICES_MSG, PRICES_FOREIGN_MSG, EXPENSES_INTAKE_MSG, EXPENSES_DONE_MSG, openingMessage } from '@/lib/will/approved-messages';
import { REFUND_CHECKIN_MSG, REVIEW_ASK_SHORT_MSG, REFUND_NOT_YET_MSG, refundCheckinTemplateKey } from '@/lib/will/review-asks';
import {
  PRICE_FLOW_STEPS, PRICE_FLOW_STEPS_TFN, PRICE_FLOW_STEPS_TFN_ABN, PRICE_FLOW_STEPS_TFN_FOREIGN, PRICE_FLOW_STEPS_TFN_ABN_FOREIGN,
  priceFlowSteps, priceFlowPaymentDetails, priceFlowAmountFrom, priceFlowAsksForDetails, saysYesToPaymentDetails, PRICE_FLOW_PAYMENT_DETAILS_TEXT,
} from '@/lib/will/price-flow-variant';
import { policyGuard } from '@/lib/will/policy-guard';
import { rebrandText, brandLeaks } from '@/lib/will/brand-voice';
import { EXPECTED_META_TEMPLATES, ownLinkButton, splitFormLinkForButton, RESIDENCY_LINK_RE } from '@/lib/will/channel';
import { looksLikePaymentConfirmation, hasWorkingFormLink } from '@/lib/will/payment-confirmation';
import { systemMessageKind } from '@/lib/will/system-message-guard';
import { customerOwesTax, formSubmittedInChat, paymentConfirmedInChat, lodgedAfterSignatureNotice, systemMessageProvesPastLeadStage } from '@/lib/will/followup-gate-30oct';
import { seedTemplates } from '@/lib/will/seed';
import { freeTextFamilies } from '@/lib/will/template-free-text';

const ROOT = path.join(__dirname, '..', '..', '..', '..');
const DIR = path.join(ROOT, 'docs/engineering/templates-i18n');
const OTHERS = ['de', 'ja', 'es', 'fr', 'it', 'pt', 'zh', 'vi'] as const;
const SOURCE = JSON.parse(fs.readFileSync(path.join(DIR, 'SOURCE.json'), 'utf8')) as Record<string, { en: string }>;
const FILES = Object.fromEntries(OTHERS.map((l) => [l, JSON.parse(fs.readFileSync(path.join(DIR, `${l}.json`), 'utf8'))])) as Record<string, Record<string, string>>;
const DASH = /[‒-―−⸺⸻﹘]|——/;

/** Every SOURCE.json key and the code table that sends it (English locked, translations verbatim). */
const TABLES: Record<string, Record<Lang, string>> = {
  FORM_RECEIVED_MSG: I.FORM_RECEIVED_MSG, PRE_PAYMENT_CHECK_MSG: I.PRE_PAYMENT_CHECK_MSG, NO_REFUND_CASES_MSG: I.NO_REFUND_CASES_MSG,
  COUPLE_MSG: I.COUPLE_MSG, BANK_DOCUMENT_MSG: I.BANK_DOCUMENT_MSG, OWN_ACCOUNT_MSG: I.OWN_ACCOUNT_MSG, REFUND_CHANCE_MSG: I.REFUND_CHANCE_MSG,
  PAYMENT_LINK_OFFER: I.PAYMENT_LINK_MSG.offer, PAYMENT_LINK_NAME: I.PAYMENT_LINK_MSG.name, PAYMENT_LINK_READY: I.PAYMENT_LINK_MSG.ready,
  MEDICARE_CANT_HELP_MSG: I.MEDICARE_CANT_HELP_MSG, NO_DASP_MSG: I.NO_DASP_MSG, NOT_OUR_PRICE_MSG: I.NOT_OUR_PRICE_MSG,
  PAYMENT_RECEIVED_MSG: I.PAYMENT_RECEIVED_MSG, HANDOFF_HOLDING_MSG: I.HANDOFF_HOLDING_MSG, HANDOFF_BUMP_MSG: I.HANDOFF_BUMP_MSG,
  DOCUMENTS_RECEIVED_MSG: I.DOCUMENTS_RECEIVED_MSG, REQUEST_ABN_MSG: I.REQUEST_ABN_MSG, MEDICARE_MSG: I.MEDICARE_MSG,
  ESTIMATE_INVOICE_MSG: I.ESTIMATE_INVOICE_MSG, ESTIMATE_PAYABLE_MSG: I.ESTIMATE_PAYABLE_MSG, SIGNATURE_MSG: I.SIGNATURE_MSG,
  LODGED_CONFIRMATION_MSG: I.LODGED_CONFIRMATION_MSG, LODGED_PAYABLE_MSG: I.LODGED_PAYABLE_MSG, RESIDENCY_CHECK_MSG: I.RESIDENCY_CHECK_MSG,
  EXPENSES_INTAKE_MSG, EXPENSES_DONE_MSG, REFUND_CHECKIN_MSG, REVIEW_ASK_SHORT_MSG, REFUND_NOT_YET_MSG,
  'FOLLOWUP_MSG.fu_pre_24h': I.FOLLOWUP_MSG.fu_pre_24h, 'FOLLOWUP_MSG.fu_pre_3d': I.FOLLOWUP_MSG.fu_pre_3d,
  'FOLLOWUP_MSG.fu_price_sent': I.FOLLOWUP_MSG.fu_price_sent, 'FOLLOWUP_MSG.fu_form_6h': I.FOLLOWUP_MSG.fu_form_6h,
  'FOLLOWUP_MSG.fu_sig_24h': I.FOLLOWUP_MSG.fu_sig_24h,
  'APPROVED.opening': OPENING_MSG, 'APPROVED.prices': PRICES_MSG, 'APPROVED.prices_foreign': PRICES_FOREIGN_MSG,
  PRICE_FLOW_STEPS_TFN: PRICE_FLOW_STEPS.TFN, PRICE_FLOW_STEPS_TFN_ABN: PRICE_FLOW_STEPS.TFN_ABN,
  PRICE_FLOW_STEPS_TFN_FOREIGN: PRICE_FLOW_STEPS.TFN_FOREIGN, PRICE_FLOW_STEPS_TFN_ABN_FOREIGN: PRICE_FLOW_STEPS.TFN_ABN_FOREIGN,
  PRICE_FLOW_PAYMENT_DETAILS: PRICE_FLOW_PAYMENT_DETAILS_TEXT,
};
/** Tables whose links are put into the customer's language (Jo, 18 Nov). */
const LOCALIZED_LINKS = new Set(['PAYMENT_RECEIVED_MSG', 'RESIDENCY_CHECK_MSG']);

describe('the translations are in the code exactly as the translators wrote them', () => {
  it('the generated module matches the translators\' files (run scripts/build-template-translations.mjs after any change)', () => {
    for (const key of Object.keys(SOURCE)) for (const l of OTHERS) {
      expect((TEMPLATE_TRANSLATIONS as Record<string, Record<string, string>>)[key][l]).toBe(FILES[l][key]);
    }
  });

  it('every SOURCE.json key has a table in the code, and the English in the code is the locked English', () => {
    expect(Object.keys(TABLES).sort()).toEqual(Object.keys(SOURCE).sort());
    for (const [key, table] of Object.entries(TABLES)) expect(table.en).toBe(SOURCE[key].en);
  });

  it.each(Object.keys(SOURCE))('%s: all nine languages, verbatim (links in the customer\'s language where Jo asked)', (key) => {
    const table = TABLES[key];
    expect(Object.keys(table).sort()).toEqual([...LANGS].sort());
    for (const l of OTHERS) {
      const want = LOCALIZED_LINKS.has(key) ? I.localizeOwnLinks(FILES[l][key], l) : FILES[l][key];
      expect(table[l]).toBe(want);
    }
  });

  it('no table has an em or en dash in any language', () => {
    for (const table of Object.values(TABLES)) for (const t of Object.values(table)) expect(t).not.toMatch(DASH);
    for (const l of LANGS) for (const a of [220, 385, 330, 495] as const) expect(priceFlowPaymentDetails(a, l)).not.toMatch(DASH);
  });

  it('prices are only $220 $385 $330 $495 $440 (and the $300 receipts line), in every language', () => {
    for (const table of Object.values(TABLES)) for (const t of Object.values(table)) {
      for (const m of t.match(/\$\s?\d[\d,.]*\d|\$\s?\d/g) ?? []) expect(['$220', '$385', '$330', '$495', '$440', '$300']).toContain(m.replace(/\s/g, ''));
    }
  });

  it('the guarantee appears only where the English has it (domestic TFN steps)', () => {
    const tfnParas = PRICE_FLOW_STEPS_TFN.split('\n\n').length;
    for (const l of LANGS) {
      expect(PRICE_FLOW_STEPS.TFN[l].split('\n\n')).toHaveLength(tfnParas);
      for (const k of ['TFN_ABN', 'TFN_FOREIGN', 'TFN_ABN_FOREIGN'] as const) expect(PRICE_FLOW_STEPS[k][l].split('\n\n')).toHaveLength(tfnParas - 1);
    }
  });

  it('never mentions AI, bots or a registered tax agent claim', () => {
    for (const table of Object.values(TABLES)) for (const t of Object.values(table)) {
      expect(t).not.toMatch(/\bAI\b/);
      expect(t).not.toMatch(/\bbot\b|chatbot|ボット|机器人|人工智能|registered tax agent|Steuerberater|税理士|注册税务|đại lý thuế đã đăng ký/i);
    }
  });

  it('the removed messages are not reintroduced in the new languages', () => {
    for (const k of ['fu_form_3d', 'fu_form_7d', 'fu_sig_3d', 'fu_sig_7d'] as const) {
      expect((I.FOLLOWUP_MSG[k] as Record<string, string | undefined>).zh).toBeUndefined();
      expect((I.FOLLOWUP_MSG[k] as Record<string, string | undefined>).vi).toBeUndefined();
    }
    expect(I.HANDOFF_APOLOGY_MSG.zh).toBeUndefined();
    expect(I.LODGED_NEUTRAL_MSG.es).toBeUndefined();
  });
});

describe('lookups: own language for the nine, English only for an unknown one', () => {
  it.each(OTHERS)('%s', (l) => {
    expect(I.formReceivedMessage(l)).toBe(I.FORM_RECEIVED_MSG[l]);
    expect(I.medicareCantHelpMessage(l)).toBe(I.MEDICARE_CANT_HELP_MSG[l]);
    expect(I.coupleMessage(l)).toBe(I.COUPLE_MSG[l]);
    expect(I.followUpMessage('fu_sig_24h', l)).toBe(I.FOLLOWUP_MSG.fu_sig_24h[l]);
    expect(openingMessage(l)).toBe(OPENING_MSG[l]);
  });
  it('an unknown language gets English (or null where the caller decides)', () => {
    expect(I.formReceivedMessage('xx')).toBe(I.FORM_RECEIVED_MSG.en);
    expect(I.signatureMessage(null)).toBe(I.SIGNATURE_MSG.en);
    expect(I.noDaspMessage('ko')).toBeNull();
    expect(I.followUpMessage('fu_pre_24h', 'ko')).toBeNull();
  });
  it('the opening takes the first name in every language', () => {
    expect(openingMessage('en', 'Sam')).toMatch(/^Hey Sam! Happy to help😊/);
    expect(openingMessage('ja', 'Aya')).toMatch(/^こんにちは、Ayaさん！/);
    expect(openingMessage('es', 'Ana')).toMatch(/^¡Hola, Ana!/); // Jo, 18 Nov: the vocative comma
    expect(openingMessage('zh', 'Lin')).toMatch(/^嗨 Lin！/);
    expect(openingMessage('vi', 'Lan')).toMatch(/^Chào Lan!/);
    expect(openingMessage('de', 'Lena')).toMatch(/^Hey Lena! Gerne helfe ich dir😊/);
  });
});

describe('price flow B in every language', () => {
  it.each(LANGS)('%s: steps per track with the right amount, the closing question recognised, details with the amount', (l) => {
    for (const [track, foreign, amount] of [['TFN', false, 220], ['TFN_ABN', false, 385], ['TFN', true, 330], ['TFN_ABN', true, 495]] as const) {
      const steps = priceFlowSteps(track, foreign, l);
      expect(steps).toContain(`$${amount}`);
      expect(steps).not.toMatch(/062692|81049952/);
      expect(priceFlowAsksForDetails(steps)).toBe(true);
      expect(priceFlowAmountFrom(steps)).toBe(amount);
      const details = priceFlowPaymentDetails(amount, l);
      expect(details).toContain(`$${amount}`);
      expect(details).toMatch(/062692/);
      expect(details).toMatch(/81049952/);
      expect(details).not.toContain('{AMOUNT}');
    }
  });

  it('the Japanese details keep the full-width colons, and the amount parser reads them', () => {
    expect(priceFlowPaymentDetails(385, 'ja')).toContain('金額：$385');
    expect(priceFlowAmountFrom(PRICE_FLOW_STEPS.TFN_ABN.ja)).toBe(385);
    expect(priceFlowAmountFrom('1. ＄４９５をお支払いいただきます。')).toBe(495);
    expect(priceFlowPaymentDetails(495, 'zh')).toContain('Amount: $495');
  });

  it('the English closing question, old and new wording, is still recognised; ordinary text is not', () => {
    expect(priceFlowAsksForDetails(PRICE_FLOW_STEPS_TFN)).toBe(true);
    expect(priceFlowAsksForDetails('...\n\nWant me to send the payment details?')).toBe(true);
    expect(priceFlowAsksForDetails('How can I help?')).toBe(false);
    for (const s of [PRICE_FLOW_STEPS_TFN_ABN, PRICE_FLOW_STEPS_TFN_FOREIGN, PRICE_FLOW_STEPS_TFN_ABN_FOREIGN]) expect(priceFlowAsksForDetails(s)).toBe(true);
  });

  it('a yes in every language counts; a question, a no or a long message does not', () => {
    for (const y of ['yes', 'Yes please!', 'ok', 'ja', 'Ja gerne', 'はい', 'お願いします', 'sí', 'si', 'claro', 'oui', "d'accord", 'sì', 'va bene', 'sim', 'pode mandar', '好的', '是的', '可以', 'có', 'vâng', 'được']) {
      expect([y, saysYesToPaymentDetails(y)]).toEqual([y, true]);
    }
    for (const n of ['no', 'nein', 'いいえ', 'no gracias', 'non', 'não', '不用', 'không', 'si pago hoy, cuándo empiezan', 'yes but how long does it take?', '可以吗？']) {
      expect([n, saysYesToPaymentDetails(n)]).toEqual([n, false]);
    }
  });
});

describe('Meta template names per language (base for English, <base>_<lang> for the others)', () => {
  const names = new Set(EXPECTED_META_TEMPLATES.map((t) => t.name));
  const helpers: [string, (l: string) => string][] = [
    ['form_received', (l) => I.formReceivedTemplateKey(l)], ['req_abn', I.requestAbnTemplateKey], ['handoff_holding', I.handoffHoldingTemplateKey],
    ['payment_received', I.paymentReceivedTemplateKey], ['medicare', I.medicareTemplateKey], ['signature', I.signatureTemplateKey],
    ['lodged_confirmation', I.lodgedConfirmationTemplateKey], ['lodged_payable', I.lodgedPayableTemplateKey],
    ['estimate_invoice', I.estimateInvoiceTemplateKey], ['estimate_payable', I.estimatePayableTemplateKey],
    ['refund_checkin', refundCheckinTemplateKey], ['residency_check', I.residencyCheckTemplateKey],
    ['fu_pre_24h', (l) => I.followUpTemplateName('fu_pre_24h', l)], ['fu_pre_3d', (l) => I.followUpTemplateName('fu_pre_3d', l)],
    ['fu_price_sent', (l) => I.followUpTemplateName('fu_price_sent', l)], ['fu_sig_24h', (l) => I.followUpTemplateName('fu_sig_24h', l)],
  ];
  it.each(helpers.map(([b]) => b))('%s has a name per language and every one is on the health list', (base) => {
    const fn = helpers.find(([b]) => b === base)![1];
    for (const l of LANGS) {
      const name = fn(l);
      if (base === 'form_received') expect(name).toBe(`form_received_${l}`); // existing names kept: form_received_en
      else expect(name).toBe(l === 'en' ? base : `${base}_${l}`);
      expect(names.has(name)).toBe(true);
    }
  });
  it('existing names are unchanged', () => {
    for (const n of ['fu_price_sent_de', 'fu_price_sent_ja', 'form_received_en', 'payment_received', 'payment_received_de', 'medicare_ja', 'residency_check', 'refund_checkin_de', 'estimate_invoice']) {
      expect(names.has(n)).toBe(true);
    }
  });
});

describe('the policy guard lets every translation through in the context it is sent in', () => {
  const PAID = /FORM_RECEIVED|PAYMENT_RECEIVED|DOCUMENTS|REQUEST_ABN|MEDICARE_MSG|ESTIMATE|SIGNATURE|LODGED|RESIDENCY|EXPENSES|REFUND_CHECKIN|REVIEW_ASK|REFUND_NOT_YET|fu_form|fu_sig|MEDICARE_CANT|BANK_DOCUMENT|OWN_ACCOUNT/;
  const NO_GUARANTEE = /TFN_ABN|FOREIGN/;
  it.each(Object.keys(SOURCE))('%s', (key) => {
    const paid = PAID.test(key);
    const state = key.startsWith('ESTIMATE') ? 'UNDER_REVIEW' : /^(LODGED|REFUND|REVIEW)/.test(key) ? 'LODGED' : key.includes('fu_sig') || key === 'SIGNATURE_MSG' ? 'SIGNATURE_PENDING' : paid ? 'FORM_PENDING' : 'PRICE_SENT';
    for (const l of LANGS) {
      let text = TABLES[key][l].replace(/\{\{1\}\}/g, key === 'REVIEW_ASK_SHORT_MSG' ? 'https://g.page/r/CaWt4kV0UmY-EBM/review' : 'Sam').replace(/\{\{AMOUNT\}\}/g, '$1,234');
      if (key === 'PRICE_FLOW_PAYMENT_DETAILS') text = priceFlowPaymentDetails(385, l);
      for (const isApprovedTemplate of [true, false]) {
        const v = policyGuard(text, {
          state, paid, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
          isApprovedTemplate, estimateFromTeam: key.startsWith('ESTIMATE') ? 123400 : null, guaranteeBarred: NO_GUARANTEE.test(key),
        } as never);
        expect([key, l, isApprovedTemplate, v.violations]).toEqual([key, l, isApprovedTemplate, []]);
      }
    }
  });
});

describe('both brands: SVT text is rebranded on the way out, in every language', () => {
  it.each(Object.keys(SOURCE))('%s carries no WHT mark once rebranded for Mia', (key) => {
    for (const l of LANGS) {
      const out = rebrandText(TABLES[key][l].replace('{{1}}', 'https://g.page/r/CaWt4kV0UmY-EBM/review'), 'svt');
      expect([key, l, brandLeaks(out, 'svt')]).toEqual([key, l, []]);
      expect(brandLeaks(TABLES[key][l], 'wht')).toEqual([]);
    }
  });
  it('the form and residency links go to the student site in the customer\'s language', () => {
    expect(rebrandText(I.PAYMENT_RECEIVED_MSG.de, 'svt')).toContain('https://studentvisatax.com.au/de/jhd7hp9xd');
    expect(rebrandText(I.PAYMENT_RECEIVED_MSG.zh, 'svt')).toContain('https://studentvisatax.com.au/zh/jhd7hp9xd');
    expect(rebrandText(I.PAYMENT_RECEIVED_MSG.en, 'svt')).toContain('https://studentvisatax.com.au/jhd7hp9xd');
    expect(rebrandText(I.RESIDENCY_CHECK_MSG.vi, 'svt')).toContain('https://studentvisatax.com.au/vi/jhd7hp9xd/w3rp42fav');
  });
});

describe('links in the customer\'s language, and the buttons still find them', () => {
  it.each(LANGS)('%s', (l) => {
    const pay = I.PAYMENT_RECEIVED_MSG[l];
    expect(pay).toContain(l === 'en' ? 'https://workingholidaytax.com.au/start' : `https://workingholidaytax.com.au/${l}/start`);
    expect(hasWorkingFormLink(pay)).toBe(true);
    expect(splitFormLinkForButton(pay)?.url).toBe(l === 'en' ? 'https://workingholidaytax.com.au/start' : `https://workingholidaytax.com.au/${l}/start`);
    expect(ownLinkButton(rebrandText(pay, 'svt'), l)?.url).toMatch(/^https:\/\/studentvisatax\.com\.au\/(?:[a-z]{2}\/)?jhd7hp9xd$/);
    const res = I.RESIDENCY_CHECK_MSG[l];
    expect(res).toContain(l === 'en' ? 'workingholidaytax.com.au/y8vwp4bf7' : `workingholidaytax.com.au/${l}/y8vwp4bf7`);
    expect(RESIDENCY_LINK_RE.test(res)).toBe(true);
    const svtBtn = ownLinkButton(rebrandText(res, 'svt'), l);
    expect(svtBtn?.url).toMatch(/jhd7hp9xd\/w3rp42fav$/);
    expect(svtBtn?.label).not.toBe('Start here');
    expect(I.residencyPersonalLink(l, 'k1')).toBe(`https://workingholidaytax.com.au${l === 'en' ? '' : `/${l}`}/y8vwp4bf7?k=k1`);
  });
});

describe('detection of our own messages works in every language', () => {
  const out = (body: string) => ({ direction: 'OUT' as const, status: 'SENT', author: 'AI', body, meta: {}, createdAt: new Date().toISOString() });
  it.each(LANGS)('%s', (l) => {
    expect(looksLikePaymentConfirmation(I.PAYMENT_RECEIVED_MSG[l])).toBe(true);
    expect(systemMessageKind(I.PAYMENT_RECEIVED_MSG[l])).toBe('payment_received');
    expect(systemMessageKind(I.FORM_RECEIVED_MSG[l])).toBe('questionnaire_received');
    expect(paymentConfirmedInChat([out(I.PAYMENT_RECEIVED_MSG[l])] as never)).toBe(true);
    expect(formSubmittedInChat([out(I.FORM_RECEIVED_MSG[l])] as never)).toBe(true);
    expect(customerOwesTax({ outcome: null, estimatedRefundCents: null }, [out(I.LODGED_PAYABLE_MSG[l])] as never)).toBe(true);
    expect(customerOwesTax({ outcome: null, estimatedRefundCents: null }, [out(I.ESTIMATE_PAYABLE_MSG[l].replace('{{AMOUNT}}', '$1,234'))] as never)).toBe(true);
    expect(customerOwesTax({ outcome: null, estimatedRefundCents: null }, [out(I.LODGED_CONFIRMATION_MSG[l])] as never)).toBe(false);
    expect(lodgedAfterSignatureNotice([out(I.SIGNATURE_MSG[l]), out(I.LODGED_CONFIRMATION_MSG[l])] as never)).toBe(true);
    expect(systemMessageProvesPastLeadStage(out(I.SIGNATURE_MSG[l]) as never)).toBe(true);
    expect(systemMessageProvesPastLeadStage(out(PRICE_FLOW_STEPS.TFN[l]) as never)).toBe(false);
  });
  it('no pre-payment fixed text reads as tax payable', () => {
    for (const t of [...Object.values(I.COUPLE_MSG), ...Object.values(PRICES_MSG), ...Object.values(I.PAYMENT_LINK_MSG.offer), ...Object.values(PRICE_FLOW_PAYMENT_DETAILS_TEXT)]) {
      expect(customerOwesTax({ outcome: null, estimatedRefundCents: null }, [out(t)] as never)).toBe(false);
    }
  });
});

describe('the Message Library and the Templates tab have every language', () => {
  const rows = seedTemplates();
  const keys = new Set(rows.map((r) => r.key));
  it('every translated family is seeded in all nine languages under its Library key', () => {
    for (const l of LANGS) {
      for (const k of [I.formReceivedTemplateKey(l), I.paymentReceivedTemplateKey(l), I.requestAbnTemplateKey(l), I.medicareTemplateKey(l),
        I.signatureTemplateKey(l), I.lodgedConfirmationTemplateKey(l), I.lodgedPayableTemplateKey(l), I.estimateInvoiceTemplateKey(l),
        I.estimatePayableTemplateKey(l), I.handoffHoldingTemplateKey(l), I.documentsReceivedTemplateKey(l), refundCheckinTemplateKey(l),
        I.residencyCheckTemplateKey(l), I.followUpTemplateName('fu_pre_24h', l), I.followUpTemplateName('fu_price_sent', l),
        I.metaTemplateName('opening', l), I.metaTemplateName('prices', l), I.metaTemplateName('price_flow_tfn', l), l === 'en' ? 'obj_16' : `obj_16_${l}`,
        `review_ask_short_${l}`, I.metaTemplateName('refund_not_yet', l), I.metaTemplateName('no_dasp', l), I.metaTemplateName('bank_document', l)]) {
        expect([l, k, keys.has(k)]).toEqual([l, k, true]);
      }
    }
    expect(rows.find((r) => r.key === 'medicare_vi')?.body).toBe(I.MEDICARE_MSG.vi);
    expect(rows.find((r) => r.key === 'opening_ja')?.body).toBe(OPENING_MSG.ja);
    expect(rows.find((r) => r.key === 'price_flow_payment_details_zh')?.body).toBe(priceFlowPaymentDetails(220, 'zh'));
  });
  it('the Templates tab groups English and its eight translations into one family', () => {
    const fams = freeTextFamilies(rows);
    for (const fam of ['form_received', 'payment_received', 'opening', 'prices', 'review_ask_short', 'medicare', 'no_dasp', 'price_flow_tfn']) {
      const f = fams.find((x) => x.family === fam);
      expect([fam, Object.keys(f?.byLang ?? {}).sort()]).toEqual([fam, [...LANGS].sort()]);
    }
  });
});

describe('Will and Mia are one product: every fixed text in the customer\'s own language, on both brands', () => {
  const input = (text: string, lang: string | null, history?: { role: 'assistant' | 'customer'; text: string }[]): EngineInput => ({
    ctx: { name: 'Sam', state: 'PRICE_SENT' as const, income: null, paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang, knowledge: [], decisionMode: 'will' },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: history ?? [{ role: 'assistant', text: 'x' }, { role: 'customer', text }],
    mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
  } as unknown as EngineInput);
  beforeEach(() => { process.env.SVT_WHATSAPP_PHONE_NUMBER_ID = 'SVT_ID'; (decide as jest.Mock).mockReset(); });
  afterEach(() => { delete process.env.SVT_WHATSAPP_PHONE_NUMBER_ID; });

  const cases: [string, 'wht' | 'svt', Lang, string][] = [
    ['a German student (Mia)', 'svt', 'de', 'Kann ich meine Super beanspruchen?'],
    ['a Japanese student (Mia)', 'svt', 'ja', 'スーパーアニュエーションの申請はできますか'],
    ['a Chinese backpacker (Will)', 'wht', 'zh', '我可以申请退休金吗'],
    ['a Vietnamese backpacker (Will)', 'wht', 'vi', 'Mình có thể rút super không?'],
  ];
  it.each(cases)('%s gets the DASP, couple and payment link texts in their language', async (_who, brand, lang, text) => {
    for (const [key, want] of [['no_dasp', I.NO_DASP_MSG[lang]], ['couple', I.COUPLE_MSG[lang]], ['payment_link_offer', I.PAYMENT_LINK_MSG.offer[lang]], ['own_account', I.OWN_ACCOUNT_MSG[lang]]] as const) {
      (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: key, confidence: 0.9, reply_text: 'x' });
      const out = await withBrand(brand, () => runEngine(input(text, lang)));
      // The couple answer may lose its fee paragraph when the message asked something else (stripMenuAndBank).
      if (key === 'couple') expect(out.replyText?.startsWith(want.split('\n\n')[0])).toBe(true);
      else expect([key, out.replyText]).toEqual([key, want]);
      expect(out.kind).not.toBe('human_task');
      // A fixed text the engine shortened is no longer the fixed text, so in Chinese or Vietnamese it waits for a person.
      if (key !== 'couple') expect(out.kind).not.toBe('pending_approval');
    }
  });
  it.each(cases)('%s gets the opening question in their language when the draft jumped to the bank details', async (_who, brand, lang, text) => {
    (decide as jest.Mock).mockResolvedValue({ action: 'reply', confidence: 0.9, reply_text: 'BSB: 062692\nAccount: 81049952' });
    const out = await withBrand(brand, () => runEngine({ ...input(text, lang, [{ role: 'customer', text }]), ctx: { ...input(text, lang).ctx, state: 'NEW_LEAD' } } as EngineInput));
    expect(out.replyText).toBe(openingMessage(lang, 'Sam'));
  });
  it('the zh/vi fixed texts that only Mia had (thanks, later) now reach a WHT customer too', async () => {
    (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'later_plan', confidence: 0.9, reply_text: 'x' });
    const out = await withBrand('wht', () => runEngine({ ...input('Tối nay mình điền nhé', 'vi'), ctx: { ...input('', 'vi').ctx, state: 'PAID', paid: true } } as EngineInput));
    expect(out.replyText).toContain('https://workingholidaytax.com.au/vi/start');
  });
});

describe('the language blocks no longer restrict a language to one brand', () => {
  it.each(['de', 'ja', 'es', 'fr', 'it', 'pt', 'zh', 'vi'])('%s', (l) => {
    const md = fs.readFileSync(path.join(ROOT, 'docs/engineering/language-blocks', `${l}.md`), 'utf8');
    expect(md).toMatch(/both brands/);
    expect(md).not.toMatch(/WHT only|SVT only|SVT line only|is not answered in Japanese|has no German wording|outside this block|for the SVT line only/);
  });
});

it('APPROVED still carries the locked English opening and prices', () => {
  expect(OPENING_MSG.en).toBe(APPROVED.opening);
  expect(PRICES_MSG.en).toBe(APPROVED.prices);
  expect(PRICES_FOREIGN_MSG.en).toBe(APPROVED.prices_foreign);
});
