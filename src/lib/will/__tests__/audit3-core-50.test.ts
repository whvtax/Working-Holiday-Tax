/**
 * (audit, 5 Sep) verifyChannel's health cache must not paint a working
 * WhatsApp channel as NOT WORKING for the full 5-minute TTL just because one
 * call to Meta timed out or hit a DNS blip. Sends do not consult this cache
 * (postMessage talks to Meta directly), so the only effect of trusting a
 * transient network failure here is a false "NOT WORKING, connect" pill that
 * cannot clear itself for 5 minutes. See channel.ts verifyChannel().
 */
describe('verifyChannel: a transient Meta timeout does not hide a working channel', () => {
  const savedToken = process.env.WHATSAPP_TOKEN;
  const savedPhone = process.env.WHATSAPP_PHONE_NUMBER_ID;

  beforeEach(() => {
    jest.resetModules();
    process.env.WHATSAPP_TOKEN = 'test-token';
    process.env.WHATSAPP_PHONE_NUMBER_ID = '123456';
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    if (savedToken !== undefined) process.env.WHATSAPP_TOKEN = savedToken; else delete process.env.WHATSAPP_TOKEN;
    if (savedPhone !== undefined) process.env.WHATSAPP_PHONE_NUMBER_ID = savedPhone; else delete process.env.WHATSAPP_PHONE_NUMBER_ID;
  });

  it('keeps reporting live after a previously-good check times out, and re-checks soon rather than in 5 minutes', async () => {
    const { verifyChannel } = require('@/lib/will/channel');

    let now = 1_000_000;
    jest.spyOn(Date, 'now').mockImplementation(() => now);

    // First check: Meta says the number is fine.
    const fetchMock = jest.spyOn(global, 'fetch' as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ display_phone_number: '+61 400 000 000' }),
    } as any);
    const first = await verifyChannel();
    expect(first.live).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Move past the 5-minute cache so the next call re-checks, and make that
    // re-check a network timeout rather than a rejection from Meta.
    now += 5 * 60_000 + 1;
    fetchMock.mockRejectedValueOnce(new Error('The operation was aborted'));
    const second = await verifyChannel();
    expect(second.live).toBe(true); // still live: a blip must not flip a working channel to red
    expect(second.detail).toMatch(/unreachable just now/i);

    // The blip is cached only briefly (30s), not the full 5 minutes: a check
    // a couple of seconds later must hit the network again, not serve a stale
    // cached answer either way.
    now += 31_000;
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ display_phone_number: '+61 400 000 000' }),
    } as any);
    const third = await verifyChannel();
    expect(third.live).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('reports not-live on a timeout when there is no prior good check to fall back on', async () => {
    const { verifyChannel } = require('@/lib/will/channel');

    jest.spyOn(Date, 'now').mockReturnValue(2_000_000);
    jest.spyOn(global, 'fetch' as any).mockRejectedValueOnce(new Error('timeout'));

    const result = await verifyChannel();
    expect(result.live).toBe(false);
    expect(result.detail).toMatch(/could not reach meta/i);
  });
});
