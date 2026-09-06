// confirmed[59]: the actions route was already switched to
// afterHumanReplyIndexed (see audit3-actions-u3.test.ts), but the webhook
// route's phone-echo path (every message a staff member sends from the
// WhatsApp app itself) still imported the whole-table afterHumanReply, so
// it kept paying for a full will_tasks scan (up to 5,000 OPEN rows + 500
// recent) on every echo. Switched to the same indexed variant the actions
// route uses (audit3, 5 Sep). Source-shape assertion because the webhook
// route's own test suite mocks the store at module level without a
// getCustomerByWaId, so the echo branch never actually runs there.
import fsp from 'fs/promises';
import path from 'path';

describe('webhook route: same indexed-tasks fix as the actions route (confirmed[59])', () => {
  it('imports afterHumanReplyIndexed, not the whole-table afterHumanReply', async () => {
    const src = await fsp.readFile(path.join(__dirname, '..', '..', '..', 'app', 'api', 'will', 'webhook', 'route.ts'), 'utf8');
    expect(src).toMatch(/afterHumanReplyIndexed as afterHumanReply/);
    expect(src).not.toMatch(/import \{ afterHumanReply \} from '@\/lib\/will\/after-reply'/);
  });
});
