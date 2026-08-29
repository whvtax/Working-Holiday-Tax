// ============================================================
// The same phone number, written the two ways this business actually sees it.
//
// THE BUG THIS FIXES. The CRM stores whatever the customer typed into the form;
// Will stores what WhatsApp gave us. WhatsApp always gives a country code
// ("61412345678"). An Australian typing their own number almost always writes
// "0412 345 678". Reduced to digits those are two different strings, and
// nothing anywhere converted the leading trunk zero, so the CRM's "open this
// customer's WhatsApp thread" lookup returned nothing for exactly the people
// most likely to be customers.
//
// The store's doc comment names "0412 345 678" as its first example of an input
// that should match. It did not.
//
// WHY THE NORMALISER ITSELF IS NOT TOUCHED. `normPhone` has to stay byte-
// identical to the SQL function crm_norm_phone(), because Postgres computes the
// indexed `wa_norm` column with it and a trigger matches on it. Changing one
// side would silently break the other. So the widening happens at LOOKUP time
// instead: the stored value is unchanged, and the search simply asks for both
// spellings of the same number.
// ============================================================

/** Digits only, leading international "00" dropped, too short rejected.
 *  Mirrors crm_norm_phone() exactly. Do not diverge from it. */
export function normalisePhone(num: string | null | undefined): string | null {
  let d = (num ?? '').replace(/\D/g, '');
  if (!d) return null;
  if (d.startsWith('00')) d = d.slice(2);
  return d.length < 7 ? null : d;
}

/**
 * Every normalised spelling that could be this number, most likely first.
 *
 * Deliberately narrow: only the Australian trunk-zero rule, in both directions,
 * because that is the one real ambiguity in this business. It does not attempt
 * to guess at other countries' trunk prefixes, since a wrong match here opens
 * one customer's conversation under another customer's name.
 */
export function phoneCandidates(num: string | null | undefined): string[] {
  const norm = normalisePhone(num);
  if (!norm) return [];
  const out = [norm];

  // "0412345678" (as typed into the form) -> "61412345678" (as WhatsApp sends it)
  if (norm.startsWith('0') && norm.length === 10) out.push(`61${norm.slice(1)}`);
  // "61412345678" -> "0412345678", for a record saved the other way round
  if (norm.startsWith('61') && norm.length === 11) out.push(`0${norm.slice(2)}`);

  return [...new Set(out)];
}
