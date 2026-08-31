/**
 * Reading an image is best-effort: any failure returns null so the caller falls
 * back to the existing "a person should look at this" handoff. Here we prove the
 * keyless case (no ANTHROPIC_API_KEY) returns null rather than throwing, which is
 * what keeps the media path safe in every environment.
 */
import { describeAttachment } from '@/lib/will/claude';

describe('describeAttachment', () => {
  const prev = process.env.ANTHROPIC_API_KEY;
  afterAll(() => { if (prev === undefined) delete process.env.ANTHROPIC_API_KEY; else process.env.ANTHROPIC_API_KEY = prev; });

  it('returns null with no API key (falls back to the human handoff)', async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const out = await describeAttachment(new ArrayBuffer(8), 'image/jpeg');
    expect(out).toBeNull();
  });

  it('returns null for an unsupported file type', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key';
    const out = await describeAttachment(new ArrayBuffer(8), 'audio/ogg');
    expect(out).toBeNull();
  });
});
