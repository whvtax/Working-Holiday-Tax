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
import { FORM_RECEIVED_MSG, formReceivedTemplateKey, REVIEW_REQUEST_MSG, reviewRequestTemplateKey, REQUEST_ABN_MSG, requestAbnTemplateKey, Lang } from './i18n';

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
    // The same three questions in the other six languages, so a German or
    // Japanese ABN customer is not asked in English right after being thanked
    // in their own language (audit, 3 Sep).
    ...(Object.keys(REQUEST_ABN_MSG) as Lang[]).filter((l) => l !== 'en').map((lang) =>
      t(requestAbnTemplateKey(lang), 'Post-payment & Service', `Request ABN detail · ${LANG_LABELS[lang]}`, REQUEST_ABN_MSG[lang])),
    t('req_expenses', 'Post-payment & Service', 'Request expense receipts', APPROVED.request_expenses),
    t('req_doc', 'Post-payment & Service', 'Request missing document', APPROVED.request_missing_doc),
    t('medicare', 'Post-payment & Service', 'Medicare exemption guide', APPROVED.medicare_exemption),
    t('estimate', 'Post-payment & Service', 'Estimate ready', APPROVED.estimate_ready),
    t('signature', 'Post-payment & Service', 'Ready for signature', APPROVED.signature_ready),
    t('lodged', 'Post-payment & Service', 'Lodged confirmation (older wording)', APPROVED.lodged),
    t('legitimacy', 'FAQ · Operational', 'Is this legit / registered?', APPROVED.legitimacy),

    // ── Previously code-only. Same text, now editable. ──
    // Sent by the "Send Estimate + Invoice" button. {{AMOUNT}} and
    // {{INVOICE_LINK}} are filled from what the team types in that dialog.
    t('estimate_invoice', 'Post-payment & Service', 'Estimate + invoice ("Send Estimate" button)', APPROVED.estimate_invoice),
    // Sent by the "Mark Lodged" button.
    t('lodged_confirmation', 'Post-payment & Service', 'Lodged confirmation ("Mark Lodged" button)', APPROVED.lodged_confirmation),
    // The Google review request, sent 1 hour after lodgement by the REVIEW_REQUEST
    // job, one entry per language (the scheduler picks the customer's language and
    // falls back to English), same shape as the questionnaire confirmation.
    ...(Object.keys(REVIEW_REQUEST_MSG) as Lang[]).map((lang) =>
      t(reviewRequestTemplateKey(lang), 'Post-payment & Service', `Google review request (1h after lodged) · ${LANG_LABELS[lang]}`, REVIEW_REQUEST_MSG[lang])),

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
    t('handoff_documents_after_payment', 'Handoff suggestions', 'Handoff · paid customer sent their documents', APPROVED.handoff.documents_after_payment),
  ];
}

const LANG_LABELS: Record<Lang, string> = {
  en: 'English', de: 'German', ja: 'Japanese', es: 'Spanish',
  fr: 'French', it: 'Italian', pt: 'Portuguese',
};

/** Bumped whenever seedTemplates() gains an entry that existing installs need.
 *  Stored under the `templates_backfill` setting once applied. */
export const TEMPLATE_BACKFILL_VERSION = '2026-08-31-review-request';

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
