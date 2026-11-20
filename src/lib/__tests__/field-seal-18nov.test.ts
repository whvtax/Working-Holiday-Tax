/** Jo, 18 Nov: TFN and bank details are sealed at rest. Legacy plaintext still reads. */
import crypto from 'crypto';
import { sealField, openField } from '@/lib/field-seal';

const K1 = crypto.randomBytes(32).toString('base64');
const K2 = crypto.randomBytes(32).toString('base64');
const IDX = crypto.randomBytes(32).toString('base64');

const saved = { ...process.env };
beforeEach(() => {
  process.env.FIELD_ENC_KEYS = `k1:${K1},k2:${K2}`;
  process.env.FIELD_ENC_ACTIVE = 'k2';
  process.env.FIELD_INDEX_KEY = IDX;
});
afterEach(() => { process.env = { ...saved }; });

describe('sealField / openField', () => {
  it('round-trips a TFN for its own row', () => {
    const sealed = sealField('123 456 782', 'tfn', 'TASK-1');
    expect(sealed).toMatch(/^enc1:k2:/);
    expect(sealed).not.toContain('456');
    expect(openField(sealed, 'tfn', 'TASK-1')).toBe('123 456 782');
  });

  it('a value copied to another row does not open', () => {
    const sealed = sealField('123 456 782', 'tfn', 'TASK-1');
    expect(openField(sealed, 'tfn', 'TASK-2')).toBe('');
  });

  it('a value copied to another column does not open', () => {
    const sealed = sealField('BSB 062-692', 'bank_details', 'TASK-1');
    expect(openField(sealed, 'tfn', 'TASK-1')).toBe('');
  });

  it('legacy plaintext rows still read as they are', () => {
    expect(openField('123 456 782', 'tfn', 'TASK-OLD')).toBe('123 456 782');
    expect(openField('', 'tfn', 'TASK-OLD')).toBe('');
    expect(openField(null, 'bank_details', 'TASK-OLD')).toBe('');
  });

  it('without keys, values are stored as before', () => {
    delete process.env.FIELD_ENC_KEYS;
    delete process.env.FIELD_ENC_ACTIVE;
    expect(sealField('123 456 782', 'tfn', 'TASK-1')).toBe('123 456 782');
  });
});
