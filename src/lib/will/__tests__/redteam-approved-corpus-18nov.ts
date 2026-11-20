/**
 * Every fixed customer text Will and Mia can send, in all nine languages, with
 * the placeholders filled the way the send paths fill them. Used by the
 * 18 Nov red team to prove that a guard change never blocks approved wording
 * (redteam-injection-18nov.test.ts). Data builder only, not a test file.
 * Synthetic name and links only; nothing here sends anything.
 */
import { TEMPLATE_TRANSLATIONS } from '@/lib/will/template-translations.generated';
import * as I from '@/lib/will/i18n';
import { LANGS } from '@/lib/will/i18n';
import {
  APPROVED, OPENING_MSG, PRICES_MSG, PRICES_FOREIGN_MSG, EXPENSES_INTAKE_MSG, EXPENSES_DONE_MSG, openingMessage,
} from '@/lib/will/approved-messages';
import { REFUND_CHECKIN_MSG, REVIEW_ASK_SHORT_MSG, REFUND_NOT_YET_MSG, MAPS_REVIEW_LINK, SVT_REVIEW_LINK } from '@/lib/will/review-asks';
import { PRICE_FLOW_STEPS, priceFlowPaymentDetails, priceFlowSteps } from '@/lib/will/price-flow-variant';
import { ACCOUNT_NAME_MSG } from '@/lib/will/account-name';
import { SVT_FIXED_TEXTS } from '@/lib/will/svt-fixed-texts';
import { FREE_ADVICE_BOUNDARY } from '@/lib/will/free-advice-seeker';
import { PARTIAL_HOLD_LINE } from '@/lib/will/engine';
import { APPROVED_KEYS, renderApproved } from '@/lib/will/will-decides';
import { ALL_STATES } from '@/lib/will/state-machine';
import { rebrandText } from '@/lib/will/brand-voice';

function collect(v: unknown, out: string[]): void {
  if (typeof v === 'string') out.push(v);
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => collect(x, out));
}

/** Fill the placeholders the way the send paths do (a name, an amount, our links). */
export function fillLikeSendPath(t: string): string {
  return t
    .replace(/\{\{\s*1\s*\}\}/g, 'Alex')
    .replace(/\{\{\s*2\s*\}\}/g, 'https://in.xero.com/abcDEF123')
    .replace(/\{\{name\}\}/g, 'Alex')
    .replace(/\{\{n\}\}/g, '3')
    .replace(/\{\{form\}\}/g, 'https://workingholidaytax.com.au/start')
    .replace(/\{\{AMOUNT\}\}/g, '$1,234')
    // The price flow's raw payment-details table: priceFlowPaymentDetails() fills it with the fee.
    .replace(/\{AMOUNT\}/g, '220')
    .replace(/\{\{INVOICE_LINK\}\}/g, 'https://in.xero.com/abcDEF123')
    .replace(/\{\{REVIEW_LINK\}\}/g, MAPS_REVIEW_LINK)
    .replace(/\{\{DOCUMENT\}\}/g, 'payslip')
    .replace(/\{\{BSB\}\}/g, '062692')
    .replace(/\{\{ACCOUNT\}\}/g, '81049952');
}

/** The approved corpus as the WHT brand sends it, and the same rebranded for SVT. */
export function approvedCorpus(): { wht: string[]; svt: string[] } {
  const raw: string[] = [];
  collect(APPROVED, raw);
  collect(I.SYSTEM_MESSAGE_FAMILIES, raw);
  collect(TEMPLATE_TRANSLATIONS, raw);
  collect({ OPENING_MSG, PRICES_MSG, PRICES_FOREIGN_MSG, EXPENSES_INTAKE_MSG, EXPENSES_DONE_MSG, ACCOUNT_NAME_MSG }, raw);
  collect({ REFUND_CHECKIN_MSG, REVIEW_ASK_SHORT_MSG, REFUND_NOT_YET_MSG, PRICE_FLOW_STEPS }, raw);
  collect({ RESIDENCY: I.RESIDENCY_CHECK_MSG, FOLLOWUP: I.FOLLOWUP_MSG, LODGED_NEUTRAL: I.LODGED_NEUTRAL_MSG }, raw);
  collect(SVT_FIXED_TEXTS, raw);
  collect(PARTIAL_HOLD_LINE, raw);
  raw.push(FREE_ADVICE_BOUNDARY);
  for (const l of LANGS) {
    for (const amount of [220, 385, 330, 495] as const) raw.push(priceFlowPaymentDetails(amount, l));
    for (const track of ['TFN', 'TFN_ABN'] as const) for (const foreign of [false, true]) raw.push(priceFlowSteps(track, foreign, l));
    raw.push(openingMessage(l, 'Alex'), openingMessage(l, null));
    for (const key of APPROVED_KEYS) {
      for (const state of ALL_STATES) {
        for (const firstContact of [true, false]) {
          for (const foreign of [false, true]) {
            for (const priceFlowNew of [false, true]) {
              const r = renderApproved(key, {
                state, lang: l, firstName: 'Alex', firstContact, lastWillText: 'Thanks!', foreign,
                priceAlreadySent: !firstContact, priceFlowNew,
              });
              if (r) raw.push(r);
            }
          }
        }
      }
    }
  }
  const wht = [...new Set(raw.map(fillLikeSendPath).filter((t) => t.trim()))];
  const svt = [...new Set(raw.map(fillLikeSendPath).map((t) => rebrandText(t.replace(MAPS_REVIEW_LINK, SVT_REVIEW_LINK), 'svt')).filter((t) => t.trim()))];
  return { wht, svt };
}
