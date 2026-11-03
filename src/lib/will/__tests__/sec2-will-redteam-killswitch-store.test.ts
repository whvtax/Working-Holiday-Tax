/** Round 2 red team: a failing settings read must not silently turn the kill switch off. */
let result: { data: unknown; error: unknown } = { data: null, error: null };
jest.mock('@/lib/supabase', () => ({
  getSupabase: () => ({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => result }) }) }) }),
}));
import { SupabaseStore } from '@/lib/will/store-supabase';

describe('SupabaseStore.getSetting kill switch fail-safe', () => {
  const s = new SupabaseStore();
  it('a failed read of kill_switch reports ON', async () => {
    result = { data: null, error: { message: 'connection reset' } };
    expect(await s.getSetting('kill_switch')).toBe(true);
  });
  it('a failed read of any other key stays forgiving (undefined)', async () => {
    result = { data: null, error: { message: 'connection reset' } };
    expect(await s.getSetting('ai_mode')).toBeUndefined();
    expect(await s.getSetting('ai_daily_budget')).toBeUndefined();
  });
  it('a good read returns the stored value, false stays false', async () => {
    result = { data: { value: false }, error: null };
    expect(await s.getSetting('kill_switch')).toBe(false);
    result = { data: { value: true }, error: null };
    expect(await s.getSetting('kill_switch')).toBe(true);
  });
});
