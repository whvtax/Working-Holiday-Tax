/**
 * 18 Nov 2026, audit 3 (F2): the guarantee is for TFN returns we prepare. The
 * engine works this out from the whole conversation, but the approve-draft and
 * Autopilot paths did not, so a guarantee written while the customer was TFN
 * only could go out after they said they had ABN or foreign income. Every path
 * that calls policyGuard uses this one rule.
 */
import { hasAbnIncome } from './abn-income';
import { hasForeignIncome } from './foreign-income';
import { alreadyLodged } from './already-checked';

export function guaranteeBarredFor(customerTexts: Array<string | null | undefined>): boolean {
  return hasForeignIncome(customerTexts)
    || hasAbnIncome(customerTexts)
    || alreadyLodged(customerTexts);
}
