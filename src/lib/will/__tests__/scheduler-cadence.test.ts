/**
 * The follow-up cadence must default to REAL timing with no configuration.
 *
 * Jo, 29 Aug (aiming for 5,000 customers a year): the old default was DEMO
 * unless one undocumented env var was set, so a dropped or misspelled
 * FOLLOWUP_MODE silently fired the whole cadence in seconds, at 3am, and
 * auto-closed leads in a minute. These pin the inverted, safe-by-default rule.
 */
import { schedulerConfig } from '@/lib/will/config';

const save = { ...process.env };
afterEach(() => { process.env = { ...save }; });

describe('follow-up cadence defaults', () => {
  it('is REAL when nothing is set', () => {
    delete process.env.FOLLOWUP_MODE;
    delete process.env.FOLLOWUP_STEPS;
    const c = schedulerConfig();
    expect(c.enforceQuietHours).toBe(true);
    expect(c.prePayment[0]).toBe(24 * 3600); // 24h, not 40s
    expect(c.autoCloseAfterFinal).toBe(7 * 86400);
  });

  it('is still REAL if someone leaves the old FOLLOWUP_MODE=real value', () => {
    process.env.FOLLOWUP_MODE = 'real';
    expect(schedulerConfig().enforceQuietHours).toBe(true);
  });

  it('opts into DEMO explicitly outside production', () => {
    (process.env as Record<string,string>).NODE_ENV = 'development';
    process.env.FOLLOWUP_MODE = 'demo';
    const c = schedulerConfig();
    expect(c.enforceQuietHours).toBe(false);
    expect(c.prePayment[0]).toBe(40);
  });

  it('refuses demo timing in production', () => {
    (process.env as Record<string,string>).NODE_ENV = 'production';
    process.env.FOLLOWUP_MODE = 'demo';
    delete process.env.FOLLOWUP_ALLOW_DEMO_IN_PROD;
    expect(() => schedulerConfig()).toThrow(/demo/i);
  });

  it('FOLLOWUP_STEPS still overrides for tests', () => {
    (process.env as Record<string,string>).NODE_ENV = 'test';
    process.env.FOLLOWUP_STEPS = '1,2,3';
    expect(schedulerConfig().prePayment).toEqual([1, 2, 3]);
  });
});
