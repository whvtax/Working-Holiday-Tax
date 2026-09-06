// Real health checks for the dashboard status dots: each component is
// actually exercised, not assumed. Red dot = something is truly broken.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore, getLastPersistError, clearLastPersistError } from '@/lib/will/store';
import { policyGuard } from '@/lib/will/policy-guard';
import { verifyChannel, verifyTemplates, metaAppSecret, metaVerifyToken } from '@/lib/will/channel';
import { resolveAiMode } from '@/lib/will/mode';
import { schedulerConfig } from '@/lib/will/config';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  const checks: Record<string, { ok: boolean; detail: string }> = {};

  // Store: read-only round-trip (H10 — never write on a heartbeat), and surface
  // any real write failure recorded by the store (M9).
  try {
    const store = getStore();
    // A REACHABILITY PROBE, NOT A TABLE DUMP.
    //
    // This used to call listCustomers(), which is select('*') with no limit and
    // an unindexed sort, purely to answer "is the store up?". The dashboard
    // polls this every 45 seconds per open tab, so the whole customer table went
    // over the wire roughly eighty times an hour to light three status dots.
    // countCustomers is a head-only count: same answer, none of the payload.
    await store.countCustomers();
    const persistErr = getLastPersistError();
    // (audit, 5 Sep) Used to be `'write error'` with no text, and the flag was
    // only ever cleared by a successful createCustomer — so a single stray
    // read error (not even a write) turned this dot red with no clue why, and
    // it stayed red on this instance until an unrelated customer signed up.
    // The round-trip just above IS a fresh reachability check, so a pass here
    // proves the store works right now; report the real error text once, then
    // clear it so the next poll is not stuck showing history as if it were live.
    checks.store = persistErr
      ? { ok: false, detail: `last error seen on this instance: ${persistErr}` }
      : { ok: true, detail: 'ok' };
    if (persistErr) clearLastPersistError();
  } catch {
    checks.store = { ok: false, detail: 'unreachable' };
  }

  // Schema: are the columns and tables the code writes to actually there?
  //
  // This is the check that would have caught the worst failure this system has
  // had. A deploy went out without its migrations, `last_message_at` did not
  // exist, and every attempt to create a NEW customer threw. The webhook caught
  // the error exactly as designed and dropped the message. 105 real leads were
  // lost, and every dot on this dashboard stayed green the whole time.
  try {
    const store = getStore();
    if (typeof store.schemaHealth === 'function') {
      const s = await store.schemaHealth();
      checks.schema = {
        ok: s.ok,
        detail: s.ok
          ? 'all migrations applied'
          : `MISSING: ${s.missing.join(', ')} — run the pending files in supabase/migrations. NEW CUSTOMERS ARE BEING DROPPED until you do.`,
      };
    } else {
      checks.schema = { ok: true, detail: 'not applicable (file store)' };
    }
  } catch {
    checks.schema = { ok: false, detail: 'schema check failed' };
  }

  // Guard: self-test, must block a known-bad message and pass a known-good one
  try {
    const badV = policyGuard('Special deal, only $50 for you!', {
      state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false,
      optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
      isApprovedTemplate: false, estimateFromTeam: null,
    });
    const goodV = policyGuard('Hey! How can I help you today?', {
      state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false,
      optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
      isApprovedTemplate: false, estimateFromTeam: null,
    });
    const ok = !badV.allowed && goodV.allowed;
    checks.guard = { ok, detail: ok ? 'self-test passed' : 'SELF-TEST FAILED' };
  } catch {
    checks.guard = { ok: false, detail: 'error' };
  }

  // Engine: with a key we verify configuration only, not reachability — a paid
  // API call on every 45-second heartbeat is not worth the bill.
  //
  // NO KEY IS NOW RED (27 Aug). This was hardcoded `ok: true`, with the detail
  // string quietly reading "mock mode (no API key)". That meant the one failure
  // this panel exists to prevent could happen entirely unseen: the key expires
  // or drops out of the environment, Will carries on answering real customers
  // from the deterministic mock brain, and every dot on the dashboard stays
  // green while it does. That is the exact shape of the missing-migration
  // outage that cost 105 leads.
  //
  // Same treatment the WhatsApp check already gives an unconfigured channel:
  // "not configured" is not fine, it is "this is not doing what you think it
  // is doing". In local development every dot goes red for the same honest
  // reason, which is not a price worth trading the truth for.
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  checks.engine = {
    ok: hasKey,
    detail: hasKey
      ? 'Claude API configured'
      : 'NO API KEY — replies are coming from the mock brain, not Claude',
  };

  // Scheduler: nightly job present and tick recent enough
  try {
    const store = getStore();
    const nightly = await store.hasScheduledNightly();
    // `ok` used to be the literal `true`, so this dot could only ever go red if
    // the existence query itself threw. Every way the scheduler can actually
    // die — an unguarded throw ahead of the loop, a hung send eating the
    // invocation, a cron that stopped firing — looked green. The only fact that
    // answers "is it alive" is when the loop last finished, so that is what is
    // checked. Three missed five-minute crons is the threshold.
    const raw = await store.getSetting('last_tick_at');
    const lastTick = Date.parse(typeof raw === 'string' ? raw : '');
    const fresh = Number.isFinite(lastTick) && Date.now() - lastTick < 15 * 60 * 1000;
    checks.scheduler = fresh
      ? { ok: true, detail: nightly ? 'nightly queued' : 'nightly will queue on next tick' }
      : {
        ok: false,
        detail: Number.isFinite(lastTick)
          ? `THE SCHEDULER HAS NOT RUN since ${new Date(lastTick).toISOString()}. No follow-ups are going out and Autopilot replies are stuck unsent.`
          : 'THE SCHEDULER HAS NOT RUN yet. No follow-ups are going out and Autopilot replies are stuck unsent.',
      };
  } catch {
    checks.scheduler = { ok: false, detail: 'error' };
  }

  // (audit, 5 Sep) The scheduler dot above only proves SOME authorised tick ran
  // recently, and the tick route accepts either a real Vercel cron secret or the
  // dashboard's own open-tab session — so that dot stayed green all day purely
  // from an operator's browser polling every 15s, even if the actual cron job
  // had stopped firing (wrong plan, rotated secret, removed vercel.json entry,
  // deploy protection). last_cron_tick_at is written by the tick route ONLY when
  // a cron secret (not a session) authorised the call, so this checks the real
  // schedule, independent of whether a tab happens to be open right now.
  try {
    const store = getStore();
    const rawCron = await store.getSetting('last_cron_tick_at');
    const lastCronTick = Date.parse(typeof rawCron === 'string' ? rawCron : '');
    const cronFresh = Number.isFinite(lastCronTick) && Date.now() - lastCronTick < 15 * 60 * 1000;
    // Only meaningful once a cron secret is actually configured (checks.cron
    // below already goes red with no secret at all) and only in production —
    // in dev nobody expects an external cron to be hitting this.
    const cronSecretConfigured = !!(process.env.CRON_SECRET || process.env.WILL_CRON_SECRET);
    checks.cronTick = {
      ok: !cronSecretConfigured || process.env.NODE_ENV !== 'production' || cronFresh,
      detail: cronFresh
        ? 'the Vercel cron itself has ticked recently'
        : Number.isFinite(lastCronTick)
          ? `THE VERCEL CRON HAS NOT RUN since ${new Date(lastCronTick).toISOString()} — the open dashboard tab is doing the scheduling; follow-ups will stop when it closes.`
          : (cronSecretConfigured && process.env.NODE_ENV === 'production'
            ? 'THE VERCEL CRON HAS NEVER RUN — the open dashboard tab is doing the scheduling; follow-ups will stop when it closes.'
            : 'not checked (no cron secret configured, or not production)'),
    };
  } catch {
    checks.cronTick = { ok: false, detail: 'error' };
  }

  // REL-04: the Vercel cron authorizes /api/will/tick with CRON_SECRET. If it is
  // unset in production the cron silently 401s and the scheduler never runs, so
  // surface it as RED rather than letting follow-ups quietly stop.
  const cronSecretSet = !!(process.env.CRON_SECRET || process.env.WILL_CRON_SECRET);
  const cronNeeded = process.env.NODE_ENV === 'production';
  checks.cron = {
    ok: cronSecretSet || !cronNeeded,
    detail: cronSecretSet ? 'cron secret set' : (cronNeeded ? 'CRON_SECRET missing — scheduler cron will be rejected' : 'cron secret unset (dev)'),
  };

  // Cadence: is the follow-up clock the real one, or the compressed demo clock?
  //
  // DEMO timing fires the whole cadence in seconds, at any hour, and auto-closes
  // a lead a minute after the final message. That is invisible on every other
  // dot, so it gets its own. Real timing is now the default and needs no env
  // var; this only ever goes red if someone deliberately switched demo on.
  try {
    const cadence = schedulerConfig();
    checks.cadence = {
      ok: cadence.enforceQuietHours,
      detail: cadence.enforceQuietHours
        ? 'real follow-up timing, quiet hours enforced'
        : 'DEMO TIMING IS ON — follow-ups fire in seconds, quiet hours off, leads auto-close in one minute. Unset FOLLOWUP_MODE/FOLLOWUP_STEPS.',
    };
  } catch (e) {
    // schedulerConfig throws if demo timing was requested in production.
    checks.cadence = { ok: false, detail: (e as Error).message.slice(0, 200) };
  }

  // WhatsApp channel: connected once the Cloud API credentials are set.
  // Not "broken" when unset — it just means Will is in test mode (nothing sends).
  // CONFIG-01: if we ARE live-sending but the inbound webhook secrets are unset,
  // inbound silently 401s/403s — surface that as RED, never green "test mode".
  // Truthful check: actually ask Meta whether the token + number work right now,
  // rather than trusting that the env vars merely exist. Green means Meta
  // confirmed the connection; red means it is set but not really working.
  const wa = await verifyChannel();
  const webhookSecretsSet = !!(metaAppSecret() && metaVerifyToken());
  if (!wa.configured) {
    checks.whatsapp = { ok: false, detail: 'TEST MODE — no credentials, messages are NOT being sent' };
  } else if (!wa.live) {
    checks.whatsapp = { ok: false, detail: `credentials set but NOT working: ${wa.detail}` };
  } else if (!webhookSecretsSet) {
    checks.whatsapp = { ok: false, detail: `sending verified but webhook secrets MISSING (META_APP_SECRET / META_VERIFY_TOKEN) — inbound will be rejected` };
  } else {
    checks.whatsapp = { ok: true, detail: `connected & ${wa.detail}` };
  }

  // Templates: do the ~20 Meta template names the code sends actually exist,
  // and are they approved with the right number of variables?
  //
  // (audit, 5 Sep) Until now nothing asked. The first sign that fu_form_3d was
  // never created, or that estimate_invoice was approved with one variable
  // instead of two, or that Meta paused fu_pre_24h, was a failed send to a
  // real customer at 7pm and a raw error task. This dot shows the gap first.
  // Only a problem that WILL fail a send goes red (a required template
  // missing, nothing approved, wrong variable count); a missing optional
  // template is sent as text inside the window by design and only shows in
  // the tooltip. Same 5 minute cache as the WhatsApp check. Sending is not
  // touched.
  let templates: Awaited<ReturnType<typeof verifyTemplates>> | null = null;
  if (wa.configured && wa.live) {
    try {
      templates = await verifyTemplates();
      checks.templates = { ok: templates.ok, detail: templates.detail };
    } catch (e) {
      checks.templates = { ok: false, detail: `template check failed: ${(e as Error).message.slice(0, 120)}` };
    }
  }

  const killSwitch = ((await getStore().getSetting('kill_switch').catch(() => false)) === true);
  // The dashboard used to show whichever mode was last clicked in that browser
  // tab, which was not necessarily the mode the system was actually in. It now
  // shows the stored truth, resolved by the same function every sender uses.
  const aiMode = resolveAiMode(await getStore().getSetting('ai_mode').catch(() => null));
  const allOk = Object.values(checks).every((c) => c.ok);
  return NextResponse.json({
    ok: allOk, checks, killSwitch, aiMode, usingMock: !hasKey,
    whatsappLive: wa.live && webhookSecretsSet,
    whatsappConfigured: wa.configured,
    whatsappDetail: checks.whatsapp.detail,
    templates: templates && {
      ok: templates.ok, checked: templates.checked, missing: templates.missing,
      missingOptional: templates.missingOptional, notApproved: templates.notApproved,
      paramMismatch: templates.paramMismatch, approvedLanguages: templates.approvedLanguages,
    },
  });
}
