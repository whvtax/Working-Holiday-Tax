/** Jo, 18 Nov: the backfill script must write the same envelope the app reads. */
import crypto from 'crypto';
import { openField } from '@/lib/field-seal';

describe('backfill envelope matches field-seal', () => {
  it('a value sealed the way the script seals it opens in the app', () => {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    cipher.setAAD(Buffer.from(JSON.stringify(['crm_tasks', 'tfn', 'TASK-9']), 'utf8'));
    const ct = Buffer.concat([cipher.update('123 456 782', 'utf8'), cipher.final(), cipher.getAuthTag()]);
    const envelope = `enc1:k1:${iv.toString('base64url')}:${ct.toString('base64url')}`;
    process.env.FIELD_ENC_KEYS = `k1:${key.toString('base64')}`;
    process.env.FIELD_ENC_ACTIVE = 'k1';
    expect(openField(envelope, 'tfn', 'TASK-9')).toBe('123 456 782');
  });
});
