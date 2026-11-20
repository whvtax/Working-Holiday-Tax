// First-run seed: the demo customers (so the pipeline is populated)
// and the approved message library.
//
// LIBRARY COVERAGE RULE (Jo, 26 Aug): every message body Will can put in front
// of a customer must appear here, so it is visible and editable in the Library.
// That includes the ones that used to be written inline in a route or a helper:
// the estimate + invoice message, the lodged confirmation, the "questionnaire
// received" confirmation in each language, and the proposed replies attached to
// a handoff task. `src/lib/will/__tests__/template-coverage.test.ts` fails if a
// sendable body exists that is not seeded here, so the rule cannot quietly rot.
import { randomUUID } from 'crypto';
import { CustomerRow, TemplateRow, Store } from './store';
import { demoCustomers } from './demo-data';
import { APPROVED } from './approved-messages';
import { KNOWLEDGE_SEED } from './knowledge-seed';
import {
  LANGS, type Lang, metaTemplateName, followUpTemplateName, FOLLOWUP_MSG,
  ESTIMATE_PAYABLE_MSG, estimatePayableTemplateKey, LODGED_PAYABLE_MSG, lodgedPayableTemplateKey, FORM_RECEIVED_MSG, formReceivedTemplateKey,
  REVIEW_REQUEST_MSG, reviewRequestTemplateKey, REQUEST_ABN_MSG, requestAbnTemplateKey, HANDOFF_HOLDING_MSG, handoffHoldingTemplateKey, HANDOFF_BUMP_MSG,
  PAYMENT_RECEIVED_MSG, paymentReceivedTemplateKey, MEDICARE_MSG, medicareTemplateKey, ESTIMATE_INVOICE_MSG, estimateInvoiceTemplateKey,
  SIGNATURE_MSG, signatureTemplateKey, LODGED_CONFIRMATION_MSG, lodgedConfirmationTemplateKey, DOCUMENTS_RECEIVED_MSG, documentsReceivedTemplateKey,
  NO_REFUND_CASES_MSG, COUPLE_MSG, PRE_PAYMENT_CHECK_MSG, BANK_DOCUMENT_MSG, OWN_ACCOUNT_MSG, REFUND_CHANCE_MSG, NOT_OUR_PRICE_MSG, NO_DASP_MSG,
  PAYMENT_LINK_MSG, MEDICARE_CANT_HELP_MSG, RESIDENCY_CHECK_MSG, residencyCheckTemplateKey,
} from './i18n';
import { OPENING_MSG, PRICES_MSG, PRICES_FOREIGN_MSG, EXPENSES_INTAKE_MSG, EXPENSES_DONE_MSG } from './approved-messages';
import { REFUND_CHECKIN_MSG, REVIEW_ASK_SHORT_MSG, REFUND_NOT_YET_MSG, refundCheckinTemplateKey } from './review-asks';
import { PRICE_FLOW_STEPS, priceFlowPaymentDetails } from './price-flow-variant';

const hoursAgo = (h: number) => new Date(Date.now() - h * 3600e3).toISOString();
const parseAge = (t: string): number => {
  const n = parseFloat(t);
  if (t.endsWith('m')) return n / 60;
  if (t.endsWith('h')) return n;
  if (t.endsWith('d')) return n * 24;
  return 1;
};

export function seedCustomers(): CustomerRow[] {
  return demoCustomers.map((c, i) => ({
    id: randomUUID(),
    waId: `+61 4${String(11 + i).padStart(2, '0')} ${String(230 + i * 7).padStart(3, '0')} ${String(118 + i * 13).padStart(3, '0')}`,
    name: c.name,
    flag: c.flag,
    state: c.state,
    income: c.inc,
    paid: !['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING', 'NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT', 'FINAL'].includes(c.state),
    formComplete: ['FORM_COMPLETE', 'DOCUMENTS_COMPLETE', 'UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW', 'SIGNATURE_PENDING', 'SIGNED', 'LODGED', 'COMPLETED'].includes(c.state),
    missingDocs: [],
    aiPaused: false,
    isLegacy: false,
    botOwned: true,
    optedOut: false,
    estimatedRefundCents: null,
    outcome: null,
    lastCustomerMsgAt: hoursAgo(parseAge(c.time)),
    previousState: null,
    stateChangedAt: hoursAgo(parseAge(c.time)),
    lastMessagePreview: c.msg ?? null,
    lastMessageDirection: (c.unread ? 'IN' : 'OUT') as 'IN' | 'OUT',
    unread: !!c.unread,
    unreadCount: c.unread ? 1 : 0,
    lastMessageAt: hoursAgo(parseAge(c.time)),
    lang: null,
    createdAt: hoursAgo(parseAge(c.time) + 48),
  }));
}

export function seedTemplates(): TemplateRow[] {
  const t = (key: string, category: string, title: string, body: string, requiresMeta = false): TemplateRow => ({
    id: randomUUID(), key, category, title, body, requiresMeta, versions: 1, updatedAt: new Date().toISOString(),
  });
  const o = APPROVED.objections;
  // One row per language (decision 018): `all` includes English, `others` the eight translations
  // of a family whose English row is listed on its own.
  const all = (table: Record<Lang, string>, key: (l: Lang) => string, category: string, title: string, requiresMeta = false) =>
    LANGS.map((l) => t(key(l), category, `${title} · ${LANG_LABELS[l]}`, table[l], requiresMeta));
  const others = (table: Record<Lang, string>, key: (l: Lang) => string, category: string, title: string, requiresMeta = false) =>
    LANGS.filter((l) => l !== 'en').map((l) => t(key(l), category, `${title} · ${LANG_LABELS[l]}`, table[l], requiresMeta));
  return [
    t('opening', 'Opening & Qualification', 'Opening message', APPROVED.opening),
    ...others(OPENING_MSG, (l) => metaTemplateName('opening', l), 'Opening & Qualification', 'Opening message'),
    t('prices', 'Opening & Qualification', 'The two prices (only for a direct price question)', APPROVED.prices),
    ...others(PRICES_MSG, (l) => metaTemplateName('prices', l), 'Opening & Qualification', 'The two prices (only for a direct price question)'),
    t('price_tfn', 'Pricing', 'Price: TFN only ($220)', APPROVED.price_tfn),
    t('price_tfn_abn', 'Pricing', 'Price: TFN + ABN ($385)', APPROVED.price_tfn_abn),
    t('price_tfn_review', 'Pricing', 'Price: review of already-lodged return, TFN ($330)', APPROVED.price_tfn_review),
    t('price_tfn_foreign', 'Pricing', 'Price: TFN with foreign income ($330)', APPROVED.price_tfn_foreign),
    t('price_tfn_abn_foreign', 'Pricing', 'Price: TFN + ABN with foreign income ($495)', APPROVED.price_tfn_abn_foreign),
    t('prices_foreign', 'Pricing', 'Both prices with foreign income ($330 / $495)', APPROVED.prices_foreign),
    ...others(PRICES_FOREIGN_MSG, (l) => metaTemplateName('prices_foreign', l), 'Pricing', 'Both prices with foreign income ($330 / $495)'),
    t('price_tfn_abn_review', 'Pricing', 'Price: review of already-lodged return, TFN + ABN ($440)', APPROVED.price_tfn_abn_review),
    t('obj_1', 'Objections', '#1 Refund amount before paying', o.o1_refund_before_pay),
    t('obj_2', 'Objections', '#2 Why pay before knowing', o.o2_why_pay_first),
    t('obj_3', 'Objections', '#3 Thought the check was free', o.o3_thought_free),
    t('obj_4', 'Objections', '#4 "I\'ll just use myGov"', o.o4_mygov),
    t('obj_5', 'Objections', '#5 Too expensive', o.o5_too_expensive),
    t('obj_6', 'Objections', '#6 Pay after refund', o.o6_pay_after_refund),
    t('obj_7', 'Objections', '#7 Professional question pre-payment', o.o7_professional_question),
    t('obj_8', 'Objections', '#8 "My return is simple"', o.o8_simple_return),
    t('obj_9', 'Objections', '#9 What if no refund', o.o9_no_refund),
    t('obj_10a', 'Objections', '#10a Why not an accountant', o.o10a_why_not_accountant),
    t('obj_10b', 'Objections', '#10b Found someone cheaper', o.o10b_found_cheaper),
    t('obj_11', 'Objections', '#11 Need to think about it', o.o11_think_about_it),
    t('obj_12', 'Objections', '#12 Ask partner first', o.o12_ask_partner),
    t('obj_13', 'Objections', '#13 Just one question', o.o13_one_question),
    t('obj_14', 'Objections', '#14 Check eligibility first', o.o14_check_eligible_first),
    t('obj_15', 'Objections', '#15 In what cases is there no refund', o.o15_when_no_refund),
    t('obj_16', 'Objections', '#16 A couple asking together', o.o16_couple),
    // 18 Nov (decision 018): every follow-up in all nine languages. Library key = Meta
    // template name: the base key for English, <key>_<lang> for the other eight.
    t('fu_pre_24h', 'Follow-ups', 'Pre-payment · 24h', APPROVED.followups_pre_payment.h24, true),
    ...others(FOLLOWUP_MSG.fu_pre_24h, (l) => followUpTemplateName('fu_pre_24h', l), 'Follow-ups', 'Pre-payment · 24h', true),
    t('fu_pre_3d', 'Follow-ups', 'Pre-payment · 3d', APPROVED.followups_pre_payment.d3, true),
    ...others(FOLLOWUP_MSG.fu_pre_3d, (l) => followUpTemplateName('fu_pre_3d', l), 'Follow-ups', 'Pre-payment · 3d', true),
    t('fu_price_sent', 'Follow-ups', 'Pre-payment · they already have the bank details', APPROVED.followups_pre_payment.priceSent, true),
    ...others(FOLLOWUP_MSG.fu_price_sent, (l) => followUpTemplateName('fu_price_sent', l), 'Follow-ups', 'Pre-payment · they already have the bank details', true),
    t('fu_form_6h', 'Follow-ups', 'Form · 6h', APPROVED.followups_form.h6, true),
    ...others(FOLLOWUP_MSG.fu_form_6h, (l) => followUpTemplateName('fu_form_6h', l), 'Follow-ups', 'Form · 6h', true),
    t('fu_sig_24h', 'Follow-ups', 'Signature · 24h', APPROVED.followups_signature.h24, true),
    ...others(FOLLOWUP_MSG.fu_sig_24h, (l) => followUpTemplateName('fu_sig_24h', l), 'Follow-ups', 'Signature · 24h', true),

    // The two-message price flow (Jo, 18 Nov: the standard for every language). Message 1 per
    // track, then message 2 (payment details, shown here with the TFN amount; the code fills
    // $220 / $385 / $330 / $495 at send time).
    ...all(PRICE_FLOW_STEPS.TFN, (l) => metaTemplateName('price_flow_tfn', l), 'Pricing', 'Price flow 1 of 2: TFN steps ($220)'),
    ...all(PRICE_FLOW_STEPS.TFN_ABN, (l) => metaTemplateName('price_flow_tfn_abn', l), 'Pricing', 'Price flow 1 of 2: TFN + ABN steps ($385)'),
    ...all(PRICE_FLOW_STEPS.TFN_FOREIGN, (l) => metaTemplateName('price_flow_tfn_foreign', l), 'Pricing', 'Price flow 1 of 2: TFN with foreign income ($330)'),
    ...all(PRICE_FLOW_STEPS.TFN_ABN_FOREIGN, (l) => metaTemplateName('price_flow_tfn_abn_foreign', l), 'Pricing', 'Price flow 1 of 2: TFN + ABN with foreign income ($495)'),
    ...all(Object.fromEntries(LANGS.map((l) => [l, priceFlowPaymentDetails(220, l)])) as Record<Lang, string>, (l) => metaTemplateName('price_flow_payment_details', l), 'Pricing', 'Price flow 2 of 2: payment details after the yes'),

    t('payment_received', 'Post-payment & Service', 'Payment received + form link', APPROVED.payment_received),
    // The same confirmation per language (4 Sep). It is the one automatic
    // message that lands at the moment the customer has just parted with money.
    ...others(PAYMENT_RECEIVED_MSG, paymentReceivedTemplateKey, 'Post-payment & Service', 'Payment received + form link'),
    t('req_abn', 'Post-payment & Service', 'Request ABN detail', APPROVED.request_abn_detail),
    ...others(REQUEST_ABN_MSG, requestAbnTemplateKey, 'Post-payment & Service', 'Request ABN detail'),
    t('req_expenses', 'Post-payment & Service', 'Request expense receipts', APPROVED.request_expenses),
    t('expenses_intake_a', 'Post-payment & Service', 'Expenses intake 1 of 4 (send 1 to 4 together)', APPROVED.expenses.intake_a),
    t('expenses_intake_b', 'Post-payment & Service', 'Expenses intake 2 of 4', APPROVED.expenses.intake_b),
    t('expenses_intake_c', 'Post-payment & Service', 'Expenses intake 3 of 4', APPROVED.expenses.intake_c),
    t('expenses_intake_d', 'Post-payment & Service', 'Expenses intake 4 of 4', APPROVED.expenses.intake_d),
    // The whole intake in one message, in the other eight languages (the English is the four parts above).
    ...others(EXPENSES_INTAKE_MSG, (l) => metaTemplateName('expenses_intake', l), 'Post-payment & Service', 'Expenses intake (one message)'),
    t('expenses_done', 'Post-payment & Service', 'Expenses collected', APPROVED.expenses.done),
    ...others(EXPENSES_DONE_MSG, (l) => metaTemplateName('expenses_done', l), 'Post-payment & Service', 'Expenses collected'),
    t('req_doc', 'Post-payment & Service', 'Request missing document', APPROVED.request_missing_doc),
    t('medicare', 'Post-payment & Service', 'Medicare exemption guide', APPROVED.medicare_exemption),
    ...others(MEDICARE_MSG, medicareTemplateKey, 'Post-payment & Service', 'Medicare exemption guide'),
    ...all(MEDICARE_CANT_HELP_MSG, (l) => metaTemplateName('medicare_cant_help', l), 'Post-payment & Service', 'Medicare exemption did not work'),
    ...all(RESIDENCY_CHECK_MSG, residencyCheckTemplateKey, 'Post-payment & Service', 'Residency double-check (Working Holiday Maker ticked)'),
    t('signature', 'Post-payment & Service', 'Ready for signature', APPROVED.signature_ready),
    ...others(SIGNATURE_MSG, signatureTemplateKey, 'Post-payment & Service', 'Ready for signature'),
    // 18 Nov (VERIFY-18nov item 2): the older 'estimate' and 'lodged' rows are gone. They were not
    // the locked texts, and 'lodged' promised a refund that a customer who owes tax would also
    // have received if a person picked it. The locked texts are estimate_invoice / estimate_payable
    // and lodged_confirmation / lodged_payable below.
    t('legitimacy', 'FAQ · Operational', 'Is this legit / registered?', APPROVED.legitimacy),

    // ── Previously code-only. Same text, now editable. ──
    // Sent by the "Send Estimate" button. {{AMOUNT}} is filled from what the team types.
    t('estimate_invoice', 'Post-payment & Service', 'Estimate + invoice ("Send Estimate" button)', APPROVED.estimate_invoice),
    ...others(ESTIMATE_INVOICE_MSG, estimateInvoiceTemplateKey, 'Post-payment & Service', 'Estimate + invoice ("Send Estimate" button)'),
    // Sent by the "Mark Lodged" button.
    t('lodged_confirmation', 'Post-payment & Service', 'Lodged confirmation ("Mark Lodged" button)', APPROVED.lodged_confirmation),
    ...others(LODGED_CONFIRMATION_MSG, lodgedConfirmationTemplateKey, 'Post-payment & Service', 'Lodged confirmation ("Mark Lodged" button)'),
    // Jo, 1 Oct: the "tax payable" variants (estimate wording and lodged wording).
    ...all(ESTIMATE_PAYABLE_MSG, estimatePayableTemplateKey, 'Post-payment & Service', 'Estimate, amount payable ("Send Estimate" with Tax payable)'),
    ...all(LODGED_PAYABLE_MSG, lodgedPayableTemplateKey, 'Post-payment & Service', 'Lodged confirmation, tax payable ("Mark Lodged" when outcome is payable)'),
    // The Google review request (older wording, no longer sent): kept in its old languages.
    ...(Object.keys(REVIEW_REQUEST_MSG) as Lang[]).map((lang) =>
      t(reviewRequestTemplateKey(lang), 'Post-payment & Service', `Google review request (older wording, no longer sent) · ${LANG_LABELS[lang]}`, REVIEW_REQUEST_MSG[lang] ?? REVIEW_REQUEST_MSG.en)),
    // Jo, 9 Nov: the review flow is two messages only. The check-in goes out 14 days after
    // lodgement (Meta template refund_checkin_{lang}); the ask with the link goes out only after
    // the customer says "yes", as text.
    ...all(REFUND_CHECKIN_MSG, refundCheckinTemplateKey, 'Post-payment & Service', 'Has your refund landed? ({{1}} first name)', true),
    ...all(Object.fromEntries(LANGS.map((l) => [l, REVIEW_ASK_SHORT_MSG[l].replace('{{1}}', 'https://g.page/r/CaWt4kV0UmY-EBM/review')])) as Record<Lang, string>,
      (l) => `review_ask_short_${l}`, 'Post-payment & Service', 'Google review ask after "yes" (text, no template)'),
    ...all(REFUND_NOT_YET_MSG, (l) => metaTemplateName('refund_not_yet', l), 'Post-payment & Service', 'Refund not arrived yet (reply to the check-in)'),

    // The questionnaire-received confirmation, one entry per language.
    ...all(FORM_RECEIVED_MSG, formReceivedTemplateKey, 'Automatic confirmations', 'Questionnaire received'),

    // The fixed answers Will picks by key (will-decides.ts), in all nine languages.
    ...others(NO_REFUND_CASES_MSG, (l) => metaTemplateName('obj_15', l), 'Objections', '#15 In what cases is there no refund'),
    ...others(COUPLE_MSG, (l) => metaTemplateName('obj_16', l), 'Objections', '#16 A couple asking together'),
    ...all(PRE_PAYMENT_CHECK_MSG, (l) => metaTemplateName('pre_payment_check', l), 'Objections', 'Professional question before payment (one line)'),
    ...all(BANK_DOCUMENT_MSG, (l) => metaTemplateName('bank_document', l), 'FAQ · Operational', 'The bank document is required'),
    ...all(OWN_ACCOUNT_MSG, (l) => metaTemplateName('own_account', l), 'FAQ · Operational', 'The account must be in their own name'),
    ...all(REFUND_CHANCE_MSG, (l) => metaTemplateName('refund_chance', l), 'FAQ · Operational', 'How likely is a refund (before payment)'),
    ...all(NOT_OUR_PRICE_MSG, (l) => metaTemplateName('not_our_price', l), 'Pricing', 'A price that is not ours'),
    ...all(NO_DASP_MSG, (l) => metaTemplateName('no_dasp', l), 'FAQ · Operational', 'Super (DASP) not available'),
    ...all(PAYMENT_LINK_MSG.offer, (l) => metaTemplateName('payment_link_offer', l), 'Pricing', 'Card payment link · offer'),
    ...all(PAYMENT_LINK_MSG.name, (l) => metaTemplateName('payment_link_name', l), 'Pricing', 'Card payment link · ask the full name'),
    ...all(PAYMENT_LINK_MSG.ready, (l) => metaTemplateName('payment_link_ready', l), 'Pricing', 'Card payment link · name received'),

    // The reply proposed on a handoff task. A draft for a person, but "Send
    // Reply" transmits it word for word, so it is a sendable message.
    t('handoff_holding', 'Handoff suggestions', 'Handoff · holding reply (guard blocked, budget, stale draft)', APPROVED.handoff.holding),
    ...others(HANDOFF_HOLDING_MSG, handoffHoldingTemplateKey, 'Handoff suggestions', 'Handoff · holding reply'),
    // The bump Will sends on his own while a handoff stays unanswered (Will only, free text).
    ...all(HANDOFF_BUMP_MSG, (l) => metaTemplateName('handoff_bump', l), 'Handoff suggestions', 'Handoff · still waiting after 23h'),
    t('handoff_attachment', 'Handoff suggestions', 'Handoff · customer sent a file Will cannot read', APPROVED.handoff.attachment),
    t('handoff_unreadable', 'Handoff suggestions', 'Handoff · voice note or unreadable message', APPROVED.handoff.unreadable),
    t('handoff_revoked', 'Handoff suggestions', 'Handoff · customer deleted their message before it could be read', APPROVED.handoff.revoked),
    t('handoff_returning_customer', 'Handoff suggestions', 'Handoff · a previous customer wrote in again', APPROVED.handoff.returning_customer),
    t('handoff_many_questions', 'Handoff suggestions', 'Handoff · more than 3 messages before paying', APPROVED.handoff.many_questions),
    t('handoff_documents_after_payment', 'Handoff suggestions', 'Handoff · paid customer sent their documents', APPROVED.handoff.documents_after_payment),
    ...others(DOCUMENTS_RECEIVED_MSG, documentsReceivedTemplateKey, 'Handoff suggestions', 'Handoff · paid customer sent their documents'),
  ];
}

const LANG_LABELS: Record<Lang, string> = {
  en: 'English', de: 'German', ja: 'Japanese', es: 'Spanish',
  fr: 'French', it: 'Italian', pt: 'Portuguese', zh: 'Chinese', vi: 'Vietnamese',
};

/** Bumped whenever seedTemplates() gains an entry that existing installs need.
 *  Stored under the `templates_backfill` setting once applied. */
// Bump this whenever new Library rows are added in code, or an existing install
// never receives them (audit, 4 Sep: req_abn_<lang> was added on 3 Sep and the
// version was not bumped, so no live install ever got those rows).
export const TEMPLATE_BACKFILL_VERSION = '2026-11-18-nine-languages';

/**
 * Add any seeded template whose `key` is missing from the Library.
 *
 * The Library is only ever seeded when the table is completely EMPTY, so a
 * template added to seedTemplates() after the first deploy would never reach a
 * live install. This closes that gap exactly once, recorded under a setting, so
 * a template the owner deliberately deletes afterwards is never resurrected on
 * the next boot. Best-effort: it must never take a request or a tick down.
 */
export async function backfillMissingTemplates(
  store: Pick<Store, 'listTemplates' | 'addTemplate' | 'getSetting' | 'setSetting'>,
): Promise<string[]> {
  try {
    if ((await store.getSetting('templates_backfill')) === TEMPLATE_BACKFILL_VERSION) return [];
    const existing = await store.listTemplates();
    // An empty Library is a fresh install: the normal seed path handles it, and
    // running here as well would duplicate every entry.
    if (existing.length === 0) return [];
    const have = new Set(existing.map((t) => t.key));
    const added: string[] = [];
    for (const t of seedTemplates()) {
      if (have.has(t.key)) continue;
      await store.addTemplate({ key: t.key, category: t.category, title: t.title, body: t.body });
      added.push(t.key);
    }
    await store.setSetting('templates_backfill', TEMPLATE_BACKFILL_VERSION);
    return added;
  } catch {
    return []; // retried on the next tick; never breaks the caller
  }
}

/**
 * Template keys that USED to be seeded from the code but have since been retired
 * (e.g. the two-step-model templates removed when the two-step pricing was
 * reverted, 3 Sep 2026). "Sync library from file" DELETES these from the DB so a
 * retired template does not linger as an orphan in the Library. Only keys listed
 * here are ever deleted; a template the owner added by hand (any key that is
 * neither seeded nor listed here) is never touched. When you retire a seeded
 * template, remove it from seedTemplates() and add its key here.
 */
export const OBSOLETE_TEMPLATE_KEYS: readonly string[] = [
  // Two-step payment model, reverted 3 Sep 2026 (back to the single-fee model).
  'payment_details', 'lodgement_details', 'lodgement_received',
  'fu_lodge_24h', 'fu_lodge_3d', 'fu_lodge_7d',
  // 18 Nov (VERIFY-18nov item 2): older estimate and lodged wording, not the locked texts. The
  // lodged one promised a refund whatever the outcome. Sync deletes them from a live Library.
  'estimate', 'lodged',
];

/**
 * Bring the DB template Library in line with the code.
 *
 * The message templates (opening, prices, objections, follow-ups) live in
 * will_templates, seeded once from approved-messages.ts. A deploy changes the
 * code but never the DB, and the plain seed path only ADDS missing keys, so an
 * edit to the wording of a template that already exists in the DB (e.g. a
 * shorter opening) never reaches Will on its own. This is the templates twin of
 * the knowledge "Sync library from file" flow: for every seeded key it UPDATES
 * the DB body when it differs from the code and ADDS a missing key. It also
 * DELETES any template whose key is in OBSOLETE_TEMPLATE_KEYS, so a retired
 * template is cleaned out instead of lingering. A template whose key is neither
 * seeded nor listed as obsolete (something the owner added by hand) is never
 * touched. Matched by `key`, so a retitled or recategorised entry still syncs.
 */
export async function syncTemplatesFromCode(
  store: Pick<Store, 'listTemplates' | 'updateTemplate' | 'addTemplate' | 'deleteTemplate'>,
): Promise<{ updated: number; added: number; removed: number; keys: string[] }> {
  const existing = await store.listTemplates();
  const byKey = new Map(existing.map((t) => [t.key, t]));
  let updated = 0, added = 0, removed = 0;
  const keys: string[] = [];
  const seedKeys = new Set(seedTemplates().map((t) => t.key));
  for (const t of seedTemplates()) {
    const hit = byKey.get(t.key);
    if (hit) {
      if (hit.body !== t.body) {
        await store.updateTemplate(hit.id, t.body);
        updated++;
        keys.push(t.key);
      }
    } else {
      await store.addTemplate({ key: t.key, category: t.category, title: t.title, body: t.body });
      added++;
      keys.push(t.key);
    }
  }
  // Delete retired templates that still linger in the DB. Guarded so a key that
  // is somehow both seeded and listed obsolete is never deleted.
  const obsolete = new Set(OBSOLETE_TEMPLATE_KEYS);
  for (const t of existing) {
    if (obsolete.has(t.key) && !seedKeys.has(t.key)) {
      await store.deleteTemplate(t.id);
      removed++;
      keys.push(t.key);
    }
  }
  return { updated, added, removed, keys };
}

/**
 * The answers pack, in the Library, without anybody having to do anything.
 *
 * WHAT WAS WRONG (Jo, 28 Aug). The curated question-and-answer pack lived in
 * knowledge-seed.ts and reached a live install only if somebody POSTed
 * `import_starter`, which nothing in the dashboard ever did. So the pack could
 * be written, reviewed, shipped, and still be invisible to Will forever. It
 * was, until today.
 *
 * Jo's point, and he is right: the Library is one thing. A message he can send
 * and an answer Will can look up are the same kind of object to the person
 * using this, and neither of them should need a button, a concept, or an
 * explanation. So this runs on the tick beside backfillMissingTemplates and
 * the pack is simply there.
 *
 * VERSIONED, NOT ONCE-ONLY. The marker carries the size of the pack, so adding
 * entries later lands them on the next tick instead of being locked out by a
 * "already done" flag. Matching by question text means an answer Jo has since
 * edited is never overwritten and a deleted one does come back, which is the
 * right way round: the pack is the floor, his edits sit on top.
 */
/** 21 Oct: answers Jo changed in the pack. The backfill above only ADDS a
 *  question the Library does not hold, so an edited answer to an existing
 *  question would never reach Will. Each fix updates the one row with that
 *  question, once (marker), and leaves any other edit Jo made by hand alone. */
const KNOWLEDGE_FIXES: { question: string; answer: string }[] = [
  // 25 Oct (Jo): no super (DASP) service at the moment.
  {
    question: 'Can you help me claim my superannuation (DASP)?',
    answer: 'Sorry, our superannuation (DASP) service isn\'t available at the moment, but we\'re happy to take care of your tax return.',
  },
  {
    question: "Can I claim my superannuation back while I'm still in Australia / before my visa ends?",
    answer: 'Sorry, our superannuation (DASP) service isn\'t available at the moment, but we\'re happy to take care of your tax return.',
  },
  {
    question: 'Can I set up a payment plan with the ATO for the amount I owe?',
    answer: 'The ATO offers payment plans once the payment request has been issued, and we will go through the options with you here in the chat. Within 14 days of lodging you will receive an email from the ATO with the payment request and how to pay. If it has not arrived, message us here and we will send it to you directly. \u{1F60A}',
  },
];
/** Later fixes, each batch applied once after the ones before it, so an
 *  earlier batch never re-runs over an answer Jo has since edited by hand. */
const LATER_FIXES: { marker: string; fixes: { question: string; answer: string }[] }[] = [
  { marker: 'fix-27oct', fixes: [
    // 27 Oct (Jo: deadline questions always get a yes). Date-free on purpose:
    // the 31 October detail lives in the playbook, which knows today's date.
    {
      question: 'Is there a deadline for paying and getting my tax return lodged?',
      answer: "It's not too late, we can still lodge it for you 😊 Returns lodged by a registered tax agent usually have more time than lodging yourself. The sooner we start, the better.",
    },
  ] },
];

/** 30 Oct (Jo, second batch): the Library answers changed by the decisions of
 *  that day (guarantee, 7 days, review $330 / $440, DASP, expenses, owes tax),
 *  pushed once into rows that already exist. The text comes from the seed, so
 *  there is one copy of the wording. Matched by question like every fix. */
const FIX_30OCT_B_INTENTS = [
  'already started or lodged the return myself', 'review or amend a return already lodged', 'pricing',
  'worked across two financial years, two returns and two fees', 'customer asks for a refund of our fee',
  'status of the refund of our fee', 'super claim', 'superannuation while still in Australia',
  'when does the tax owed have to be paid', 'ATO payment plan for tax owed',
  'when the ATO notice of assessment or email arrives after lodging', 'owes tax after lodgement is it ready to pay',
  'car expenses for work claim', 'claim travel to work tolls fuel', 'claim work clothing footwear laundry',
  'work-related expenses', 'work expenses intake after payment', 'work expenses intake after payment (German)',
  'work expenses intake after payment (Japanese)', 'what can i claim before paying',
  'what can i claim before paying (German)', 'what can i claim before paying (Japanese)',
  'car trips home to work or between sites', 'expenses mentioned after ticking no expenses',
];
function fixesFromSeed(intents: string[]): { question: string; answer: string }[] {
  const out: { question: string; answer: string }[] = [];
  for (const intent of intents) {
    const e = KNOWLEDGE_SEED.find((k) => k.intent === intent);
    if (e) out.push({ question: e.question, answer: e.answer });
  }
  return out;
}
LATER_FIXES.push({ marker: 'fix-30oct-b', fixes: fixesFromSeed(FIX_30OCT_B_INTENTS) });

/** 2 Nov (Jo): whenever a customer cannot get through the IHI / Medicare
 *  Entitlement Statement step at Services Australia, Will answers with Jo's
 *  wording: we can't help with it, we can continue without the exemption, and
 *  the levy then stays on the return. Pushed once into the existing row. */
LATER_FIXES.push({
  marker: 'fix-2nov-ihi',
  fixes: fixesFromSeed(['IHI or Medicare Entitlement Statement trouble (do not troubleshoot)']),
});

export async function applyKnowledgeFixes(
  store: Pick<Store, 'listKnowledge' | 'updateKnowledge' | 'getSetting' | 'setSetting'>,
): Promise<number> {
  try {
    const batches = [{ marker: 'fix-25oct', fixes: KNOWLEDGE_FIXES }, ...LATER_FIXES];
    const done = await store.getSetting('knowledge_fix');
    const from = batches.findIndex((b) => b.marker === done) + 1;
    if (from >= batches.length) return 0;
    const rows = await store.listKnowledge();
    let fixed = 0;
    for (const batch of batches.slice(from)) {
      for (const fix of batch.fixes) {
        const want = fix.question.trim().toLowerCase();
        for (const row of rows) {
          if ((row.question || '').trim().toLowerCase() !== want) continue;
          if (row.answer === fix.answer) continue;
          await store.updateKnowledge(row.id, { answer: fix.answer });
          fixed++;
        }
      }
      await store.setSetting('knowledge_fix', batch.marker);
    }
    return fixed;
  } catch {
    return 0;
  }
}

/** Decision 004: the seed's brand tags (brand:wht / brand:svt) were added after
 *  the pack was loaded into production, and the backfill only adds missing
 *  questions. This merges the seed's brand tags into the matching rows, once
 *  per set of tags, keeping every other tag Jo set (final review, 27 Oct).
 *  It must run before the SVT line is turned on. */
export async function applyBrandTags(
  store: Pick<Store, 'listKnowledge' | 'updateKnowledge' | 'getSetting' | 'setSetting'>,
): Promise<number> {
  try {
    const tagged = KNOWLEDGE_SEED.filter((e) => (e.tags ?? []).some((t) => t.startsWith('brand:')));
    const marker = `brand-tags-${tagged.length}`;
    if ((await store.getSetting('knowledge_brand_tags')) === marker) return 0;
    const rows = await store.listKnowledge();
    let fixed = 0;
    for (const e of tagged) {
      const want = e.question.trim().toLowerCase();
      const brandTags = (e.tags ?? []).filter((t) => t.startsWith('brand:'));
      for (const row of rows) {
        if ((row.question || '').trim().toLowerCase() !== want) continue;
        const tags = row.tags ?? [];
        const missing = brandTags.filter((t) => !tags.includes(t));
        if (!missing.length) continue;
        await store.updateKnowledge(row.id, { tags: [...tags, ...missing] });
        fixed++;
      }
    }
    await store.setSetting('knowledge_brand_tags', marker);
    return fixed;
  } catch {
    return 0; // retried on the next tick
  }
}

export async function backfillKnowledgePack(
  store: Pick<Store, 'listKnowledge' | 'addKnowledge' | 'getSetting' | 'setSetting'>,
): Promise<number> {
  try {
    const marker = `pack-${KNOWLEDGE_SEED.length}`;
    if ((await store.getSetting('knowledge_backfill')) === marker) return 0;
    const existing = await store.listKnowledge();
    const have = new Set(existing.map((k) => (k.question || '').trim().toLowerCase()));
    let added = 0;
    for (const e of KNOWLEDGE_SEED) {
      const q = e.question.trim();
      if (have.has(q.toLowerCase())) continue;
      await store.addKnowledge({
        intent: e.intent || q.slice(0, 60),
        question: q,
        examples: e.examples ?? [],
        answer: e.answer,
        keywords: e.keywords ?? [],
        tags: e.tags ?? [],
        lang: e.lang || 'en',
        weight: 1,
        // Active, not draft. A draft is invisible to the engine (knowledge.ts
        // reads status='active'), so importing as draft would put the answers
        // on the screen and still leave Will unable to use them, which is the
        // exact failure this function exists to end.
        status: 'active',
        source: 'mined',
      });
      have.add(q.toLowerCase());
      added++;
    }
    await store.setSetting('knowledge_backfill', marker);
    return added;
  } catch {
    return 0; // retried on the next tick; never breaks the caller
  }
}
