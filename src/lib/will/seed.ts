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
import { FORM_RECEIVED_MSG, formReceivedTemplateKey, Lang } from './i18n';

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
    paid: !['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING', 'NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(c.state),
    formComplete: ['FORM_COMPLETE', 'DOCUMENTS_COMPLETE', 'UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW', 'SIGNATURE_PENDING', 'SIGNED', 'LODGED', 'COMPLETED'].includes(c.state),
    missingDocs: [],
    aiPaused: false,
    isLegacy: false,
    botOwned: true,
    optedOut: false,
    estimatedRefundCents: null,
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
  return [
    t('opening', 'Opening & Qualification', 'Opening message', APPROVED.opening),
    t('price_tfn', 'Pricing', 'Price: TFN only ($220)', APPROVED.price_tfn),
    t('price_tfn_abn', 'Pricing', 'Price: TFN + ABN ($385)', APPROVED.price_tfn_abn),
    t('price_tfn_review', 'Pricing', 'Price: review of already-lodged return, TFN ($220, no guarantee)', APPROVED.price_tfn_review),
    t('price_tfn_abn_review', 'Pricing', 'Price: review of already-lodged return, TFN + ABN ($385, no guarantee)', APPROVED.price_tfn_abn_review),
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
    t('fu_pre_24h', 'Follow-ups', 'Pre-payment · 24h', APPROVED.followups_pre_payment.h24, true),
    t('fu_pre_3d', 'Follow-ups', 'Pre-payment · 3d', APPROVED.followups_pre_payment.d3, true),
    t('fu_pre_7d', 'Follow-ups', 'Pre-payment · 7d (final)', APPROVED.followups_pre_payment.d7, true),
    t('fu_form_6h', 'Follow-ups', 'Form · 6h', APPROVED.followups_form.h6, true),
    t('fu_form_3d', 'Follow-ups', 'Form · 3d', APPROVED.followups_form.d3, true),
    t('fu_form_7d', 'Follow-ups', 'Form · 7d', APPROVED.followups_form.d7, true),
    t('fu_sig_24h', 'Follow-ups', 'Signature · 24h', APPROVED.followups_signature.h24, true),
    t('fu_sig_3d', 'Follow-ups', 'Signature · 3d', APPROVED.followups_signature.d3, true),
    t('fu_sig_7d', 'Follow-ups', 'Signature · 7d', APPROVED.followups_signature.d7, true),
    t('payment_received', 'Post-payment & Service', 'Payment received + form link', APPROVED.payment_received),
    t('req_abn', 'Post-payment & Service', 'Request ABN detail', APPROVED.request_abn_detail),
    t('req_expenses', 'Post-payment & Service', 'Request expense receipts', APPROVED.request_expenses),
    t('req_doc', 'Post-payment & Service', 'Request missing document', APPROVED.request_missing_doc),
    t('medicare', 'Post-payment & Service', 'Medicare exemption guide', APPROVED.medicare_exemption),
    t('estimate', 'Post-payment & Service', 'Estimate ready', APPROVED.estimate_ready),
    t('signature', 'Post-payment & Service', 'Ready for signature', APPROVED.signature_ready),
    t('lodged', 'Post-payment & Service', 'Lodged + Google review', APPROVED.lodged),
    t('legitimacy', 'FAQ · Operational', 'Is this legit / registered?', APPROVED.legitimacy),

    // ── Previously code-only. Same text, now editable. ──
    // Sent by the "Send Estimate + Invoice" button. {{AMOUNT}} and
    // {{INVOICE_LINK}} are filled from what the team types in that dialog.
    t('estimate_invoice', 'Post-payment & Service', 'Estimate + invoice ("Send Estimate" button)', APPROVED.estimate_invoice),
    // Sent by the "Mark Lodged" button.
    t('lodged_confirmation', 'Post-payment & Service', 'Lodged confirmation ("Mark Lodged" button)', APPROVED.lodged_confirmation),

    // The questionnaire-received confirmation, one entry per language the
    // scheduler can send it in. Will picks the row matching the customer's
    // detected language and falls back to English.
    ...(Object.keys(FORM_RECEIVED_MSG) as Lang[]).map((lang) =>
      t(formReceivedTemplateKey(lang), 'Automatic confirmations', `Questionnaire received · ${LANG_LABELS[lang]}`, FORM_RECEIVED_MSG[lang])),

    // The reply proposed on a handoff task. A draft for a person, but "Send
    // Reply" transmits it word for word, so it is a sendable message.
    t('handoff_holding', 'Handoff suggestions', 'Handoff · holding reply (guard blocked, budget, stale draft)', APPROVED.handoff.holding),
    t('handoff_attachment', 'Handoff suggestions', 'Handoff · customer sent a file Will cannot read', APPROVED.handoff.attachment),
    t('handoff_unreadable', 'Handoff suggestions', 'Handoff · voice note or unreadable message', APPROVED.handoff.unreadable),
    t('handoff_returning_customer', 'Handoff suggestions', 'Handoff · a previous customer wrote in again', APPROVED.handoff.returning_customer),
    t('handoff_many_questions', 'Handoff suggestions', 'Handoff · more than 3 messages before paying', APPROVED.handoff.many_questions),
  ];
}

const LANG_LABELS: Record<Lang, string> = {
  en: 'English', de: 'German', ja: 'Japanese', es: 'Spanish',
  fr: 'French', it: 'Italian', pt: 'Portuguese',
};

/** Bumped whenever seedTemplates() gains an entry that existing installs need.
 *  Stored under the `templates_backfill` setting once applied. */
export const TEMPLATE_BACKFILL_VERSION = '2026-08-26-library-coverage';

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
