// ============================================================
// Sealing TFN and bank details at rest (18 Nov, Jo). Server-only.
//
// Wraps field-crypto.ts for the crm_tasks columns tfn and bank_details.
// The row id is the authenticated data, so a value copied to another row
// fails to decrypt.
//
// Rollout, safe by design:
//  - Keys set (FIELD_ENC_KEYS, FIELD_ENC_ACTIVE): new writes are encrypted.
//  - Keys not set: values are stored as before, with one warning in the log.
//    Nothing is lost while the keys are being set.
//  - Reads: a value that is not an enc1 envelope is returned as it is, so
//    rows written before the switch still read. Run
//    scripts/seal-legacy-task-fields.mjs once to encrypt them.
//  - A stored envelope that cannot be opened returns '' and is logged by
//    column and row id only, never the value.
// ============================================================
import { decryptField, encryptField, isEncrypted, keyRingFromEnv, FieldCryptoError } from './field-crypto';

const TABLE = 'crm_tasks';
let warnedNoKeys = false;

function ringOrNull(): ReturnType<typeof keyRingFromEnv> | null {
  try {
    return keyRingFromEnv();
  } catch (e) {
    if (e instanceof FieldCryptoError && e.reason === 'no_key') {
      if (!warnedNoKeys) {
        warnedNoKeys = true;
        console.warn('[field-seal] FIELD_ENC_KEYS / FIELD_ENC_ACTIVE not set: TFN and bank details are stored unencrypted');
      }
      return null;
    }
    throw e;
  }
}

/** The value to store for one sensitive column of one row. */
export function sealField(plain: string, column: 'tfn' | 'bank_details', rowId: string): string {
  if (!plain) return plain;
  const ring = ringOrNull();
  if (!ring) return plain;
  return encryptField(plain, { table: TABLE, column, rowId }, ring);
}

/** The value to show for one sensitive column of one row. */
export function openField(stored: unknown, column: 'tfn' | 'bank_details', rowId: string): string {
  if (typeof stored !== 'string' || stored === '') return '';
  if (!isEncrypted(stored)) return stored;
  try {
    const ring = keyRingFromEnv();
    return decryptField(stored, { table: TABLE, column, rowId }, ring);
  } catch {
    console.error(`[field-seal] could not open ${column} for row ${rowId}`);
    return '';
  }
}
