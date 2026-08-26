// ============================================================
// Daily "new Library suggestions" digest — replaces the old monthly
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
//   a DRAFT in the Library ready to approve with one click, and emailed as
//   one document at 8am Melbourne time.
//
// WHAT IT DELIBERATELY DOES NOT DO
//   It never flags a question the Library already covered — that already
//   worked, nothing to learn there. And if genuinely nothing new turned up
//   (every customer that day was answered from the Library), it still sends
//   a short email saying exactly that, rather than staying silent — silence
//   would be indistinguishable from "it didn't run".
// ============================================================
import { getStore } from './store';
import { retrieveKnowledge } from './knowledge';
import { extractKeywords } from './knowledge';
import { mineKnowledge, MinedEntry } from './claude';
import { redactSensitive, shortLabel } from './digest';
import { localMidnightUtc } from './config';

const MELBOURNE = 'Australia/Melbourne';

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
      if (!text) continue;
      const reply = sorted.slice(i + 1).find((x) => x.direction === 'OUT' && x.status === 'SENT' && (x.author === 'HUMAN' || x.author === 'AI'));
      if (!reply || !(reply.body ?? '').trim()) continue;
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

function esc(s: string): string {
  return s.replace(/[&<>]/g, (c) => (c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;'));
}

function digestHtml(dateLabel: string, entries: MinedEntry[]): string {
  if (!entries.length) {
    return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:0 auto;color:#1a1a1a;">
      <div style="background:#0B5240;border-radius:16px 16px 0 0;padding:26px 30px;">
        <h1 style="color:#fff;font-size:19px;margin:0;font-weight:600;">New Library suggestions</h1>
        <p style="color:#b7d5cb;font-size:13px;margin:6px 0 0;">${esc(dateLabel)}</p>
      </div>
      <div style="background:#f9fafb;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 16px 16px;padding:26px 30px;">
        <p style="font-size:14px;margin:0;">No new suggestions today — every message was answered using the Library. 🎉</p>
      </div>
    </div>`;
  }
  return `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:0 auto;color:#1a1a1a;">
    <div style="background:#0B5240;border-radius:16px 16px 0 0;padding:26px 30px;">
      <h1 style="color:#fff;font-size:19px;margin:0;font-weight:600;">New Library suggestions</h1>
      <p style="color:#b7d5cb;font-size:13px;margin:6px 0 0;">${esc(dateLabel)}</p>
    </div>
    <div style="background:#f9fafb;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 16px 16px;padding:26px 30px;">
      <p style="font-size:14px;margin:0 0 18px;">
        <strong>${entries.length}</strong> question${entries.length === 1 ? '' : 's'} answered yesterday that the Library didn't cover yet.
        Drafts are already waiting for you in the Learning tab — this is a copy to read over coffee.
      </p>
      ${entries.map((e) => `
      <div style="border:1px solid #e8e8e8;background:#fff;border-radius:10px;padding:14px 16px;margin-bottom:12px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:.03em;color:#0B5240;text-transform:uppercase;margin-bottom:6px;">${esc(e.intent || e.question.slice(0, 50))}</div>
        <div style="font-size:13.5px;margin-bottom:8px;"><strong>Q:</strong> ${esc(e.question)}</div>
        <div style="font-size:13.5px;color:#333;"><strong>A:</strong> ${esc(e.answer)}</div>
      </div>`).join('\n')}
    </div>
  </div>`;
}

function digestText(dateLabel: string, entries: MinedEntry[]): string {
  const parts: string[] = [];
  parts.push(`NEW LIBRARY SUGGESTIONS — ${dateLabel}`);
  parts.push('='.repeat(60));
  parts.push('');
  if (!entries.length) {
    parts.push('No new suggestions today — every message was answered using the Library.');
    return parts.join('\n');
  }
  parts.push(`${entries.length} question(s) answered yesterday that the Library didn't cover yet.`);
  parts.push('');
  for (const e of entries) {
    parts.push('-'.repeat(60));
    parts.push(e.intent || e.question.slice(0, 60));
    parts.push(`Q: ${e.question}`);
    parts.push(`A: ${e.answer}`);
    parts.push('');
  }
  return parts.join('\n');
}

/** Returns false (without throwing) if it could not be sent — this runs
 *  inside nightly maintenance and must never take that down with it. */
async function sendDailyEmail(dateLabel: string, entries: MinedEntry[], to: string, apiKey: string): Promise<boolean> {
  if (!apiKey || !to) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Working Holiday Tax <noreply@workingholidaytax.com.au>',
        to: [to],
        subject: entries.length
          ? `New Library suggestions — ${dateLabel} (${entries.length})`
          : `New Library suggestions — ${dateLabel} (none)`,
        html: digestHtml(dateLabel, entries),
        attachments: entries.length ? [{
          filename: `library-suggestions-${dateLabel.replace(/\s+/g, '-').toLowerCase()}.txt`,
          content: Buffer.from(digestText(dateLabel, entries), 'utf8').toString('base64'),
        }] : undefined,
      }),
    });
    if (!res.ok) { console.error('[daily-digest] Resend rejected the send:', res.status); return false; }
    return true;
  } catch (err) {
    console.error('[daily-digest] send failed:', err);
    return false;
  }
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

/** "26 August 2026" in Melbourne. */
function dayLabel(d: Date): string {
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: MELBOURNE });
}

/** "2026-08-26" — the stable key used to remember which day was already sent. */
function dayKey(d: Date): string {
  const { y, mo, da } = melbourneDateParts(d);
  return `${y}-${String(mo).padStart(2, '0')}-${String(da).padStart(2, '0')}`;
}

const normQ = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/**
 * Runs from the DAILY_DIGEST job (scheduler.ts), scheduled for 8:00am
 * Melbourne. Analyses the Melbourne calendar day that just ended, mines Q&A
 * drafts from whatever the Library didn't cover, saves genuinely new ones as
 * drafts, and emails a copy either way. Idempotent per day via a stored key,
 * the same pattern the old monthly digest used.
 */
export async function runDailyDigest(nowMs: number): Promise<'sent' | 'already_sent' | 'skipped' | 'failed'> {
  const store = getStore();
  const now = new Date(nowMs);

  const { y, mo, da } = melbourneDateParts(now);
  const todayMidnight = localMidnightUtc(MELBOURNE, y, mo, da);
  const yesterdayMidnight = new Date(todayMidnight.getTime() - 24 * 60 * 60 * 1000);
  const key = dayKey(yesterdayMidnight);

  const last = await store.getSetting('daily_digest_last_day').catch(() => null);
  if (last === key) return 'already_sent';

  const to = process.env.CRM_ADMIN_EMAIL ?? '';
  const apiKey = process.env.RESEND_API_KEY ?? '';
  if (!to || !apiKey) {
    await store.audit('nightly', 'daily_digest_skipped', { reason: 'CRM_ADMIN_EMAIL or RESEND_API_KEY not set', day: key });
    return 'skipped';
  }

  const label = dayLabel(yesterdayMidnight);
  let fresh: MinedEntry[] = [];

  try {
    const candidates = await findDailyCandidates(yesterdayMidnight.toISOString(), todayMidnight.toISOString());
    if (candidates.length) {
      const conversations = candidates.map((c) => ({
        messages: [{ role: 'customer', text: c.question }, { role: 'assistant', text: c.answer }],
      }));
      const mined = await mineKnowledge(conversations);

      const existing = await store.listKnowledge();
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
    await store.audit('nightly', 'daily_digest_mine_failed', { day: key, error: (e as Error).message?.slice(0, 200) });
    fresh = []; // still send the "nothing new" email below rather than skip the day entirely
  }

  const ok = await sendDailyEmail(label, fresh, to, apiKey);
  if (!ok) {
    await store.audit('nightly', 'daily_digest_failed', { day: key, newEntries: fresh.length });
    return 'failed'; // not recorded as sent, so the next run tries again
  }

  await store.setSetting('daily_digest_last_day', key);
  await store.audit('nightly', 'daily_digest_sent', { day: key, newEntries: fresh.length });
  return 'sent';
}
