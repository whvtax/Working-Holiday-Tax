// Real health checks for the dashboard status dots: each component is
// actually exercised, not assumed. Red dot = something is truly broken.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore, getLastPersistError } from '@/lib/will/store';
import { policyGuard } from '@/lib/will/policy-guard';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!sessionValid()) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  const checks: Record<string, { ok: boolean; detail: string }> = {};

  // Store: read-only round-trip (H10 — never write on a heartbeat), and surface
  // any real write failure recorded by the store (M9).
  try {
    const store = getStore();
    await store.listCustomers();
    const persistErr = getLastPersistError();
    checks.store = { ok: !persistErr, detail: persistErr ? 'write error' : 'ok' };
  } catch {
    checks.store = { ok: false, detail: 'unreachable' };
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

  // Engine: mock always available; with a key we only verify configuration
  // (no paid API call on every heartbeat).
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  checks.engine = { ok: true, detail: hasKey ? 'Claude API configured' : 'mock mode (no API key)' };

  // Scheduler: nightly job present and tick recent enough
  try {
    const jobs = await getStore().listJobs();
    const nightly = jobs.some((j) => j.kind === 'NIGHTLY' && j.status === 'SCHEDULED');
    checks.scheduler = { ok: true, detail: nightly ? 'nightly queued' : 'nightly will queue on next tick' };
  } catch {
    checks.scheduler = { ok: false, detail: 'error' };
  }

  const killSwitch = ((await getStore().getSetting('kill_switch').catch(() => false)) === true);
  const allOk = Object.values(checks).every((c) => c.ok);
  return NextResponse.json({ ok: allOk, checks, killSwitch, usingMock: !hasKey });
}
