// First-run seed: the demo customers (so the pipeline is populated)
// and the approved message library.
import { randomUUID } from 'crypto';
import { CustomerRow, TemplateRow } from './store';
import { demoCustomers } from './demo-data';
import { APPROVED } from './approved-messages';

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
  ];
}
