/**
 * Jo, 20 Nov: Will's screen shows WHT only, Mia's screen SVT only, Control
 * shows both. Every dashboard read takes an optional ?brand=wht|svt; no brand
 * (or anything else) means both, exactly as before.
 */
export type BrandParam = 'wht' | 'svt' | undefined;

export function brandParam(req?: Request): BrandParam {
  if (!req) return undefined;
  const b = new URL(req.url).searchParams.get('brand');
  return b === 'wht' || b === 'svt' ? b : undefined;
}

/** A customer row's brand; rows from before the brand column are WHT. */
export function rowBrand(row: { brand?: string | null } | null | undefined): 'wht' | 'svt' {
  return row?.brand === 'svt' ? 'svt' : 'wht';
}

/** A task raised for a Mia sender before a customer row existed carries this
 *  mark at the start of its name, so it lands on Mia's side (Jo, 20 Nov). */
export const MIA_TASK_MARK = '[Mia] ';
export function orphanTaskBrand(task: { customerName?: string | null }): 'wht' | 'svt' {
  return (task.customerName ?? '').startsWith(MIA_TASK_MARK) ? 'svt' : 'wht';
}
