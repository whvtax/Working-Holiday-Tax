/** Jo, 25 Oct: Anthropic billing email, "your prompt cache hit rate is low". */
import fs from 'fs';
import path from 'path';
import { costUsd, usageFromResponse } from '@/lib/will/ai-usage';

const src = (f: string) => fs.readFileSync(path.join(process.cwd(), 'src/lib/will', f), 'utf8');

it('the playbook and the second check are both cached for an hour', () => {
  expect(src('claude.ts')).toContain("{ type: 'text', text: stable, cache_control: { type: 'ephemeral', ttl: '1h' } }");
  expect(src('reviewer.ts')).toContain("system: [{ type: 'text', text: reviewSystem(), cache_control: { type: 'ephemeral', ttl: '1h' } }]");
});

it('a 1-hour cache write is costed at 2x input', () => {
  const u = usageFromResponse({ usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 1_000_000, cache_read_input_tokens: 0, cache_creation: { ephemeral_1h_input_tokens: 1_000_000 } } });
  expect(u.cacheWrite1h).toBe(1_000_000);
  expect(costUsd('claude-sonnet-4-5', u)).toBe(6);
  expect(costUsd('claude-sonnet-4-5', { input: 0, output: 0, cacheWrite: 1_000_000, cacheRead: 0 })).toBe(3.75);
});
