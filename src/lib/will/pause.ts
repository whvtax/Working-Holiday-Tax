/**
 * Who is paused right now (Jo, 20 Nov).
 *
 *   will_paused  "Pause Will" on Will's screen: stops only Will (WHT customers).
 *   mia_paused   "Pause Mia" on Mia's screen: stops only Mia (SVT customers).
 *   kill_switch  "Pause all" in Control: stops both.
 *
 * Read inside the brand context of the customer being served (brand-context).
 */
import type { Store } from './store';
import type { Brand } from '@/lib/brand';
import { currentBrand } from './brand-context';

export const WILL_PAUSED_SETTING = 'will_paused';
export const MIA_PAUSED_SETTING = 'mia_paused';

export function pauseSettingFor(brand: Brand): string {
  return brand === 'svt' ? MIA_PAUSED_SETTING : WILL_PAUSED_SETTING;
}

/** Is this brand paused (its own switch or Pause all)? */
export async function brandPaused(store: Pick<Store, 'getSetting'>, brand: Brand): Promise<boolean> {
  if ((await store.getSetting('kill_switch').catch(() => false)) === true) return true;
  return (await store.getSetting(pauseSettingFor(brand)).catch(() => false)) === true;
}

/** Is the brand of the customer being served right now paused? */
export async function pausedNow(store: Pick<Store, 'getSetting'>): Promise<boolean> {
  return brandPaused(store, currentBrand());
}
