/**
 * Which brand the current piece of work belongs to (decision 004).
 *
 * Set once where work starts for a customer (an inbound message, a job) and
 * read deep inside without passing a parameter through every function. Not
 * set = 'wht', which is exactly how Will behaved before there were two brands.
 */
import { AsyncLocalStorage } from 'node:async_hooks'
import type { Brand } from '@/lib/brand'
import { isBrand } from '@/lib/brand'

const als = new AsyncLocalStorage<Brand>()

export function withBrand<T>(brand: Brand | null | undefined, fn: () => Promise<T>): Promise<T> {
  return als.run(isBrand(brand) ? brand : 'wht', fn)
}

/** Set the brand for the rest of the current async flow. Only for a loop
 *  that handles one customer per iteration and is itself inside withBrand,
 *  so the setting can never escape to the caller (scheduler.doProcess). */
export function enterBrand(brand: Brand | null | undefined): void {
  als.enterWith(isBrand(brand) ? brand : 'wht')
}

export function currentBrand(): Brand {
  return als.getStore() ?? 'wht'
}

/** The SVT WhatsApp line is configured. Until it is, there are no SVT
 *  customers, so lookups need no brand filter (and must not use one: the
 *  brand column only exists after migration 047). */
export function svtLineEnabled(env: Record<string, string | undefined> = process.env): boolean {
  return !!env.SVT_WHATSAPP_PHONE_NUMBER_ID
}

/** The SVT number id, or undefined while the line is not set up. */
export function svtPhoneNumberId(env: Record<string, string | undefined> = process.env): string | undefined {
  return env.SVT_WHATSAPP_PHONE_NUMBER_ID || undefined
}

/**
 * Which brand an inbound delivery belongs to, from the number it arrived on.
 * null = not one of our numbers: drop it (unchanged rule for WHT). With no
 * SVT id configured this returns exactly what the old filter did.
 */
export function brandForPhoneNumberId(
  arrivedOn: string | undefined | null,
  whtPhoneId: string | undefined,
  svtPhoneId: string | undefined = svtPhoneNumberId(),
): Brand | null {
  if (arrivedOn && svtPhoneId && arrivedOn === svtPhoneId) return 'svt'
  if (whtPhoneId && arrivedOn && arrivedOn !== whtPhoneId) return null
  return 'wht'
}
