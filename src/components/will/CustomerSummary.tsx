'use client';
// Control, Tasks tab (Jo, 20 Nov): next to every task, the customer at a glance.
// Short paragraphs in plain words, so one look says where the customer is.
// Read only; the chat itself lives on Will's or Mia's screen.
import type { CustomerRow } from '@/lib/will/store';

const ago = (iso: string | null | undefined): string | null => {
  if (!iso) return null;
  const ms = Date.now() - new Date(iso).getTime();
  if (!Number.isFinite(ms) || ms < 0) return null;
  const m = Math.floor(ms / 60000);
  if (m < 60) return m <= 1 ? 'just now' : `${m} minutes ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return h === 1 ? '1 hour ago' : `${h} hours ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? 'yesterday' : `${d} days ago`;
};
const days = (iso: string | null | undefined): number | null => {
  if (!iso) return null;
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  return Number.isFinite(d) && d >= 0 ? d : null;
};
const aud = (cents: number | null | undefined) =>
  cents == null ? null : `$${(cents / 100).toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

const LANGS: Record<string, string> = {
  en: 'English', de: 'German', ja: 'Japanese', es: 'Spanish', fr: 'French',
  it: 'Italian', pt: 'Portuguese', zh: 'Chinese', vi: 'Vietnamese', ko: 'Korean', th: 'Thai',
};

export interface CustomerSummaryProps {
  customer: CustomerRow | null | undefined;
  phone: string;
  stageLabel: string;
  stageColor: string;
  onOpen?: () => void;
}

export default function CustomerSummary({ customer: c, phone, stageLabel, stageColor, onOpen }: CustomerSummaryProps) {
  if (!c) {
    return (
      <aside className="csum" aria-label="Customer summary">
        <div className="csum-k">Customer</div>
        <p className="csum-p">No chat is linked to this task yet.</p>
      </aside>
    );
  }
  const mia = c.brand === 'svt';
  const who = mia ? 'Mia' : 'Will';
  const inStage = days(c.stateChangedAt);
  const lastIn = ago(c.lastCustomerMsgAt);
  const estimate = aud(c.estimatedRefundCents);
  const refund = aud(c.refundAmountCents);

  return (
    <aside className="csum" aria-label="Customer summary">
      <div className="csum-head">
        <b>{c.flag ? `${c.flag} ` : ''}{phone}</b>
        <span className="cstate" style={{ ['--sc' as string]: mia ? '#e87ba4' : '#1baf7a' }}>{who}</span>
      </div>
      {c.name && <div className="csum-name">{c.name}</div>}

      <div className="csum-k">Where they are</div>
      <p className="csum-p">
        <span className="cstate" style={{ ['--sc' as string]: stageColor }}>{stageLabel}</span>
        {inStage != null && <> for {inStage === 0 ? 'less than a day' : inStage === 1 ? '1 day' : `${inStage} days`}.</>}
      </p>

      <div className="csum-k">Money</div>
      <p className="csum-p">
        {c.paid ? 'Paid.' : 'Not paid yet.'}
        {estimate && <> Estimate: {c.outcome === 'PAYABLE' ? `owes ${estimate}` : `${estimate} refund`}.</>}
        {c.refundSentAt ? <> Refund sent {ago(c.refundSentAt)}{refund ? ` (${refund})` : ''}.</>
          : c.refundPromisedAt ? <> Refund expected, promised {ago(c.refundPromisedAt)}.</> : null}
      </p>

      <div className="csum-k">Paperwork</div>
      <p className="csum-p">
        {c.formComplete ? 'Questionnaire received.' : c.paid ? 'Questionnaire not received yet.' : 'Questionnaire comes after payment.'}
        {c.missingDocs?.length ? <> Still missing: {c.missingDocs.join(', ')}.</> : null}
      </p>

      <div className="csum-k">Last contact</div>
      <p className="csum-p">
        {lastIn ? <>Customer last wrote {lastIn}.</> : 'The customer has not written yet.'}
        {c.lastMessagePreview && (
          <span className="csum-quote">
            {c.lastMessageDirection === 'OUT' ? 'We said: ' : 'They said: '}&ldquo;{c.lastMessagePreview.slice(0, 140)}&rdquo;
          </span>
        )}
      </p>

      <div className="csum-k">{who}</div>
      <p className="csum-p">
        {c.optedOut ? 'The customer asked not to be messaged.' : c.aiPaused ? `${who} is paused on this chat; a person is answering.` : `${who} is active on this chat.`}
        {c.lang && LANGS[c.lang] ? <> Speaks {LANGS[c.lang]}.</> : null}
      </p>

      {onOpen && <button className="btn ghost" onClick={onOpen}>Open in {who} →</button>}
    </aside>
  );
}
