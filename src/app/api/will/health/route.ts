// Real health checks for the dashboard status dots: each component is
// actually exercised, not assumed. Red dot = something is truly broken.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore, getLastPersistError } from '@/lib/will/store';
import { policyGuard } from '@/lib/will/policy-guard';
import { verifyChannel, metaAppSecret, metaVerifyToken } from '@/lib/will/channel';
import { resolveAiMode } from '@/lib/will/mode';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!sessionValid()) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
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
    checks.store = { ok: !persistErr, detail: persistErr ? 'write error' : 'ok' };
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

  // REL-04: the Vercel cron authorizes /api/will/tick with CRON_SECRET. If it is
  // unset in production the cron silently 401s and the scheduler never runs, so
  // surface it as RED rather than letting follow-ups quietly stop.
  const cronSecretSet = !!(process.env.CRON_SECRET || process.env.WILL_CRON_SECRET);
  const cronNeeded = process.env.NODE_ENV === 'production';
  checks.cron = {
    ok: cronSecretSet || !cronNeeded,
    detail: cronSecretSet ? 'cron secret set' : (cronNeeded ? 'CRON_SECRET missing — scheduler cron will be rejected' : 'cron secret unset (dev)'),
  };

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
  });
}
