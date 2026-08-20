// Why didn't that message reach Will?
//
// Inbound has several places where a message is dropped ON PURPOSE and silently:
// a wrong app secret (401 before anything is parsed), a phone-number-id that
// doesn't match, the fresh-start timestamp cutoff, the returning-contact list,
// and the flood limits. Every one of them is correct behaviour, and every one of
// them looks identical from the outside: nothing appears in the CRM.
//
// This endpoint answers the question directly, in the browser, so nobody has to
// open a SQL console and guess which filter fired. Read-only, admin-only.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore, AuditRow } from '@/lib/will/store';
import { metaAppSecret, metaVerifyToken, resolveWaCreds, waPhoneNumberId } from '@/lib/will/channel';

export const dynamic = 'force-dynamic';

/** Audit actions that describe something happening on the inbound path. */
const INBOUND_ACTIONS = new Set([
  'inbound_received',
  'inbound_signature_rejected',
  'returning_contact_skipped',
  'inbound_rate_limited',
  'inbound_error',
]);

function cutoffTs(): number {
  const v = Number(process.env.WILL_MIN_MESSAGE_TS || 0);
  return Number.isFinite(v) ? v : 0;
}

export async function GET(req: Request) {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

  const store = getStore();
  const url = new URL(req.url);
  const askedAbout = (url.searchParams.get('number') || '').replace(/\D/g, '');

  const { phoneId, token, source } = await resolveWaCreds();
  const cutoff = cutoffTs();

  const config = {
    phoneNumberId: phoneId ?? null,
    phoneNumberIdSource: source,
    envPhoneNumberId: waPhoneNumberId() ?? null,
    appSecretSet: !!metaAppSecret(),
    verifyTokenSet: !!metaVerifyToken(),
    sendTokenSet: !!token,
    cutoffTs: cutoff || null,
    cutoffIso: cutoff ? new Date(cutoff * 1000).toISOString() : null,
    cutoffInFuture: cutoff > Math.floor(Date.now() / 1000),
  };

  // Does the fresh-start table actually exist? If migration 027 was never run,
  // isBlockedContact throws on every inbound message, the webhook catches it,
  // releases the idempotency claim, and the message is lost — while everything
  // else in the app looks perfectly healthy.
  let blockTable: { ok: boolean; detail: string } = { ok: true, detail: 'reachable' };
  try {
    await store.isBlockedContact('0000000000');
  } catch (e) {
    blockTable = {
      ok: false,
      detail: `will_known_contacts is not reachable (${(e as Error).message?.slice(0, 120)}) — run migration 027. Every inbound message is being dropped by this.`,
    };
  }

  // Is the number the caller asked about on the blocked list?
  let askedBlocked: boolean | null = null;
  if (askedAbout) {
    try { askedBlocked = await store.isBlockedContact(askedAbout); } catch { askedBlocked = null; }
  }

  let audit: AuditRow[] = [];
  try { audit = await store.listAudit(300); } catch { /* leave empty */ }
  const inbound = audit.filter((a) => INBOUND_ACTIONS.has(a.action));
  const lastReceived = inbound.find((a) => a.action === 'inbound_received') ?? null;
  const sigRejected = inbound.filter((a) => a.action === 'inbound_signature_rejected');
  const skipped = inbound.filter((a) => a.action === 'returning_contact_skipped');
  const errors = inbound.filter((a) => a.action === 'inbound_error');

  // ---- Turn all of that into plain sentences --------------------------------
  const findings: string[] = [];
  const nextSteps: string[] = [];

  if (!config.appSecretSet) {
    findings.push('META_APP_SECRET is not set. Every inbound webhook is rejected with 401 before it is even parsed — this alone stops all inbound.');
    nextSteps.push('Set META_APP_SECRET in Vercel to the App Secret of app 1388978866435944 and redeploy.');
  }
  if (!config.verifyTokenSet) {
    findings.push('META_VERIFY_TOKEN is not set — Meta cannot (re)verify the webhook subscription.');
  }
  if (!blockTable.ok) {
    findings.push(blockTable.detail);
    nextSteps.push('Run supabase/migrations/027_will_known_contacts.sql in the Supabase SQL editor.');
  }
  if (config.cutoffInFuture) {
    findings.push(`WILL_MIN_MESSAGE_TS is set to ${config.cutoffIso}, which is in the FUTURE — every inbound message is being dropped as "too old".`);
    nextSteps.push('Lower WILL_MIN_MESSAGE_TS, or unset it entirely.');
  }

  if (!lastReceived) {
    findings.push('No inbound webhook has been recorded at all. Either nothing has arrived since this diagnostic was deployed, or Meta is not delivering to this URL.');
    nextSteps.push('Send yourself a WhatsApp message and reload this page. If still nothing, re-check the Webhooks configuration on the Meta app — the callback URL must be https://workingholidaytax.com.au/api/will/webhook and the "messages" field must be subscribed.');
  } else {
    const d = (lastReceived.detail ?? {}) as Record<string, unknown>;
    findings.push(`Last webhook received ${lastReceived.at} — WABA ${String(d.wabaId ?? 'unknown')}, number ${String(d.displayPhoneNumber ?? 'unknown')}, phone id ${String(d.phoneNumberId ?? 'unknown')}, ${String(d.messageCount ?? 0)} message(s).`);
    if (d.phoneIdMatches === false) {
      findings.push(`That payload's phone number id (${String(d.phoneNumberId)}) does NOT match ours (${String(d.ourPhoneId)}), so its messages were discarded.`);
      nextSteps.push(`Set WHATSAPP_PHONE_NUMBER_ID to ${String(d.phoneNumberId)} — that is the id Meta is actually delivering on.`);
    }
    if (d.hasHistory === true) {
      findings.push('That payload was a coexistence history sync (old chats), which is intentionally ignored.');
    }
    if (d.statusesOnly === true) {
      findings.push('That payload contained only delivery statuses, not messages — normal, nothing to process.');
    }
  }

  if (sigRejected.length) {
    findings.push(`${sigRejected.length} webhook(s) were rejected for a bad signature. That means META_APP_SECRET does not match the Meta app that is sending — inbound cannot work until it does.`);
    nextSteps.push('Compare META_APP_SECRET in Vercel with App Dashboard → Settings → Basic → App Secret for app 1388978866435944.');
  }
  if (skipped.length) {
    findings.push(`${skipped.length} message(s) were dropped because the sender is on the returning-contact list (the fresh-start filter).`);
    nextSteps.push('If someone you consider a NEW customer is being dropped, they were in Will when RESET_WILL_FRESH_START.sql ran — most likely pulled in by the coexistence history sync. Delete just that number from will_known_contacts.');
  }
  if (errors.length) {
    findings.push(`${errors.length} inbound message(s) hit an error while processing: ${String(((errors[0].detail ?? {}) as { error?: string }).error ?? 'unknown')}`);
  }
  if (askedAbout) {
    findings.push(askedBlocked === null
      ? `Could not check whether ${askedAbout} is blocked.`
      : askedBlocked
        ? `${askedAbout} IS on the returning-contact list — its messages are being dropped on purpose.`
        : `${askedAbout} is NOT on the returning-contact list, so the fresh-start filter is not what stopped it.`);
  }

  if (!nextSteps.length) nextSteps.push('Nothing conclusive. Send a test message and reload — the newest webhook line will show exactly what arrived.');

  return NextResponse.json({
    ok: true,
    config,
    blockTable,
    askedAbout: askedAbout || null,
    askedBlocked,
    counts: {
      inboundAuditLines: inbound.length,
      signatureRejections: sigRejected.length,
      returningSkipped: skipped.length,
      errors: errors.length,
    },
    recent: inbound.slice(0, 25),
    findings,
    nextSteps,
  });
}
