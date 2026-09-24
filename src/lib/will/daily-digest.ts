// ============================================================
// Nightly "new Library suggestions" mining — replaces the old monthly
// "what customers wrote" email per the owner's request.
//
// WHAT IT IS FOR
//   Every night, for the Melbourne calendar day that just ended: find every
//   customer question that got an actual reply (from the owner or Will)
//   which the Library had nothing relevant to offer for — using the exact
//   same retrieveKnowledge() lookup the live engine itself uses, so "not in
//   the Library" means precisely what it would have meant live, never a
//   guess. Each such pair is turned into a polished Question/Answer entry by
//   the same mining model used for historical conversation uploads, saved as
//   a DRAFT in the Library ready to approve with one click.
//
// WHAT IT DELIBERATELY DOES NOT DO
//   It never flags a question the Library already covered — that already
//   worked, nothing to learn there. Jo, 17 Sep: it also used to email a copy
//   at 8am (Resend); removed on his instruction, since the drafts already sit
//   in the Learning tab and he reviews them on his own schedule there — the
//   email was pure duplication of what the tab already shows.
// ============================================================
import { getStore } from './store';
import { retrieveKnowledge } from './knowledge';
import { extractKeywords } from './knowledge';
import { mineKnowledge, MinedEntry } from './claude';
import { redactSensitive, shortLabel } from './digest';
import { localMidnightUtc } from './config';
import { APPROVED } from './approved-messages';
import {
  FORM_RECEIVED_MSG, REVIEW_REQUEST_MSG, PROFESSIONAL_QUESTION_MSG, PAYMENT_RECEIVED_MSG,
  HANDOFF_HOLDING_MSG, DOCUMENTS_RECEIVED_MSG, REQUEST_ABN_MSG, MEDICARE_MSG,
  ESTIMATE_INVOICE_MSG, SIGNATURE_MSG, LODGED_CONFIRMATION_MSG,
} from './i18n';

const MELBOURNE = 'Australia/Melbourne';

// ── WHAT IS NOT WORTH MINING (Jo, 24 Sep) ──────────────────────────────────
// 100 drafts piled up in the Learning tab and most of them were the same
// thing: "Option 1" / a payment screenshot / "yes please" followed by the
// approved price message or the payment-received message, mined into yet
// another "payment_details" or "next_steps_after_payment". Nothing was
// learned from any of them, because the reply was a script Will already has.
// Three filters, all before the model is even called:

/** A customer message that is not a question: a media placeholder, a reaction,
 *  or a one-word acknowledgement. There is no question to learn an answer to. */
export function isTrivialCustomerText(text: string): boolean {
  const t = (text || '').trim();
  if (!t) return true;
  if (/^[📷📎🎤🎥📄🎵🗑️]/u.test(t)) return true;
  if (/^\[?(?:photo|image|document|video|audio|sticker|voice|message)\b/i.test(t)) return true;
  if (/reacted to your message/i.test(t)) return true;
  if (/open whatsapp to view/i.test(t)) return true;
  if (t.length < 4) return true;
  // "yes", "ok", "option 1", "thanks", "done", "sure", "paid", in a few languages
  if (/^(?:yes|yes please|yeah|yep|ok(?:ay)?|sure|sounds good|thanks?|thank you|thx|no thanks|done|paid|sent|option ?[12](?: please)?|[12]|tfn|abn|tfn ?\+ ?abn|great|perfect|cool|good|no|nope|ja|nein|danke|si|sí|gracias|oui|merci|non|hai|はい|いいえ|ありがとう(?:ございます)?)[\s!.:)😊👍]*$/iu.test(t)) return true;
  return false;
}

const norm = (s: string) => (s || '').toLowerCase().replace(/https?:\S+/g, ' ').replace(/\{\{\d+\}\}/g, ' ').replace(/[^a-z0-9à-ÿ\u3040-\u30ff\u4e00-\u9fff]+/gi, ' ').trim();

function flattenApproved(): string[] {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === 'string') out.push(v);
    else if (v && typeof v === 'object') for (const x of Object.values(v as Record<string, unknown>)) walk(x);
  };
  walk(APPROVED);
  for (const m of [FORM_RECEIVED_MSG, REVIEW_REQUEST_MSG, PROFESSIONAL_QUESTION_MSG, PAYMENT_RECEIVED_MSG,
    HANDOFF_HOLDING_MSG, DOCUMENTS_RECEIVED_MSG, REQUEST_ABN_MSG, MEDICARE_MSG, ESTIMATE_INVOICE_MSG,
    SIGNATURE_MSG, LODGED_CONFIRMATION_MSG]) walk(m);
  return out;
}

/** The distinctive part of each approved message: everything after its first
 *  line (the first line carries the greeting / name / amount and varies), or
 *  the whole thing when it is one line. Only signatures long enough to be
 *  unmistakable are kept. */
let approvedSignatures: string[] | null = null;
function signatures(): string[] {
  if (approvedSignatures) return approvedSignatures;
  const sigs: string[] = [];
  for (const body of flattenApproved()) {
    const lines = body.split('\n').map((l) => l.trim()).filter(Boolean);
    const core = lines.length > 1 ? lines.slice(1).join(' ') : body;
    const n = norm(core);
    // 40 characters of Latin text, or 15 of Japanese, is unmistakable
    if (n.length >= 40 || (n.length >= 15 && /[\u3040-\u30ff\u4e00-\u9fff]/.test(n))) sigs.push(n);
    // the price messages: the bank block alone is a signature too
    if (/account name/i.test(body)) sigs.push(norm('Account Name: The Accounting Academy BSB: 062692 Account Number: 81049952'));
  }
  approvedSignatures = [...new Set(sigs)];
  return approvedSignatures;
}

/** True when the reply that went out IS one of the approved messages (or the
 *  Library-edited copy of one): the opening, a price message, the payment
 *  confirmation, the form link. A script is not something to learn from. */
export function isApprovedScriptReply(reply: string): boolean {
  const r = norm(reply);
  if (!r) return true;
  for (const sig of signatures()) {
    if (r.includes(sig) || sig.includes(r)) return true;
  }
  // The payment-received family in every wording: form link + "get back to you"
  if (/workingholidaytax\.com\.au\/tax-form/i.test(reply) && /(?:payment|paid|received|thank|zahlung|pago|paiement|pagamento|お支払い|入金)/i.test(reply)) return true;
  return false;
}


export interface DigestCandidate {
  question: string;
  answer: string;
  answeredBy: 'HUMAN' | 'AI';
  customerLabel: string;
}

/** Every customer question in [startIso, endIso) that got a real reply and
 *  had nothing relevant in the Library at the time — grouped per customer so
 *  a reply is only ever paired with the question it actually answered. */
export async function findDailyCandidates(startIso: string, endIso: string): Promise<DigestCandidate[]> {
  const store = getStore();
  const msgs = await store.listMessagesBetween(startIso, endIso);

  const byCustomer = new Map<string, typeof msgs>();
  for (const m of msgs) {
    if (!byCustomer.has(m.customerId)) byCustomer.set(m.customerId, []);
    byCustomer.get(m.customerId)!.push(m);
  }

  const candidates: DigestCandidate[] = [];
  for (const list of byCustomer.values()) {
    const sorted = [...list].sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
    for (let i = 0; i < sorted.length; i++) {
      const m = sorted[i];
      if (m.direction !== 'IN') continue;
      const text = (m.body ?? '').trim();
      if (!text || isTrivialCustomerText(text)) continue; // a photo, a reaction, "option 1": no question here
      const reply = sorted.slice(i + 1).find((x) => x.direction === 'OUT' && x.status === 'SENT' && (x.author === 'HUMAN' || x.author === 'AI'));
      if (!reply || !(reply.body ?? '').trim()) continue;
      if (isApprovedScriptReply(reply.body ?? '')) continue; // the answer was a script Will already has
      const hits = await retrieveKnowledge(text).catch(() => []);
      if (hits.length > 0) continue; // already covered — nothing new to learn here
      candidates.push({
        question: redactSensitive(text),
        answer: redactSensitive(reply.body ?? ''),
        answeredBy: reply.author as 'HUMAN' | 'AI',
        customerLabel: shortLabel(m.customerName, m.waId ?? m.customerId),
      });
    }
  }
  return candidates;
}

function melbourneDateParts(d: Date): { y: number; mo: number; da: number } {
  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: MELBOURNE,
  }).formatToParts(d);
  return {
    y: Number(parts.find((p) => p.type === 'year')?.value ?? '2000'),
    mo: Number(parts.find((p) => p.type === 'month')?.value ?? '01'),
    da: Number(parts.find((p) => p.type === 'day')?.value ?? '01'),
  };
}

/** "2026-08-26" — the stable key used to remember which day was already mined. */
function dayKey(d: Date): string {
  const { y, mo, da } = melbourneDateParts(d);
  return `${y}-${String(mo).padStart(2, '0')}-${String(da).padStart(2, '0')}`;
}

const normQ = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/**
 * Runs from the DAILY_DIGEST job (scheduler.ts), scheduled for 8:00am
 * Melbourne. Analyses the Melbourne calendar day that just ended, mines Q&A
 * drafts from whatever the Library didn't cover, and saves genuinely new ones
 * as drafts in the Learning tab. Idempotent per day via a stored key, the
 * same pattern the old monthly digest used.
 *
 * Jo, 17 Sep: this used to also email a copy at 8am (Resend). Removed on his
 * instruction — the drafts already land in the Learning tab and he reviews
 * them there on his own schedule, so the email was pure duplication. Mining
 * itself, the dedup against what already exists, and the daily idempotency
 * key are all unchanged.
 */
export async function runDailyDigest(nowMs: number): Promise<'mined' | 'already_run' | 'failed'> {
  const store = getStore();
  const now = new Date(nowMs);

  const { y, mo, da } = melbourneDateParts(now);
  const todayMidnight = localMidnightUtc(MELBOURNE, y, mo, da);
  const yesterdayMidnight = new Date(todayMidnight.getTime() - 24 * 60 * 60 * 1000);
  const key = dayKey(yesterdayMidnight);

  const last = await store.getSetting('daily_digest_last_day').catch(() => null);
  if (last === key) return 'already_run';

  let fresh: MinedEntry[] = [];
  try {
    const candidates = await findDailyCandidates(yesterdayMidnight.toISOString(), todayMidnight.toISOString());
    if (candidates.length) {
      const conversations = candidates.map((c) => ({
        messages: [{ role: 'customer', text: c.question }, { role: 'assistant', text: c.answer }],
      }));
      // The model is handed every question the Library already holds, active
      // AND draft, and told not to produce a variant of any of them. A
      // keyword score cannot tell "how do I pay?" from "what are the payment
      // details?" reliably in either direction (tried, 24 Sep: it matched
      // "TFN only price" to "help registering an ABN"); the model can.
      const existing = await store.listKnowledge();
      const mined = await mineKnowledge(conversations, existing.map((e) => `${e.intent}: ${e.question}`));

      const seen = new Set(existing.map((e) => normQ(e.question)));
      for (const e of mined) {
        const k = normQ(e.question);
        if (!k || seen.has(k)) continue;
        seen.add(k);
        await store.addKnowledge({
          intent: e.intent || e.question.slice(0, 60),
          question: e.question, examples: e.examples, answer: e.answer,
          keywords: e.keywords.length ? e.keywords : extractKeywords(`${e.question} ${e.examples.join(' ')}`),
          tags: e.tags, lang: e.lang || 'en', weight: 1, status: 'draft', source: 'mined',
        });
        fresh.push(e);
      }
    }
  } catch (e) {
    // Same behaviour as before: a mining crash is recorded (and shows on the
    // System Faults panel) but does not leave the day retrying forever — the
    // day key is still written, exactly as it always was when the run
    // continued on to a "nothing new" send. Only the send itself is gone.
    await store.audit('nightly', 'daily_digest_mine_failed', { day: key, error: (e as Error).message?.slice(0, 200) });
    await store.setSetting('daily_digest_last_day', key);
    return 'failed';
  }

  await store.setSetting('daily_digest_last_day', key);
  await store.audit('nightly', 'daily_digest_mined', { day: key, newEntries: fresh.length });
  return 'mined';
}
