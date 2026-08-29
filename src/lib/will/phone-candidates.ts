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
 * The trunk-zero rule, in both directions, for the three markets this business
 * actually serves: Australia (61), Germany (49) and Japan (81). A person types
 * their national number with a leading trunk 0; WhatsApp gives it back with the
 * country code and no 0. Both spellings are generated so the CRM-to-Will lookup
 * matches regardless of which way a given record was written.
 *
 * SAFETY. Every candidate is an EXACT `wa_norm` match at the call site, not a
 * suffix match, and the caller treats two matching rows as no match at all
 * (see findCustomerByPhone). So an over-broad candidate that happens to collide
 * with a real id turns into a miss, never a wrong match, which is the correct
 * failure direction: a wrong match would open one customer's conversation under
 * another's name.
 *
 * Jo, 29 Aug: Germany and Japan are the growth markets, so their domestic
 * spellings have to resolve as cleanly as the Australian one already did.
 */
const TRUNK: { cc: string; nationalLen: number }[] = [
  { cc: '61', nationalLen: 9 },   // AU: 0 + 9  <-> 61 + 9   (typed "0412 345 678")
  { cc: '81', nationalLen: 10 },  // JP: 0 + 10 <-> 81 + 10  (typed "090 1234 5678")
  { cc: '49', nationalLen: 10 },  // DE: 0 + 10 <-> 49 + 10  (typed "0176 1234567")
  { cc: '49', nationalLen: 11 },  // DE: some mobile blocks run one digit longer
];

export function phoneCandidates(num: string | null | undefined): string[] {
  const norm = normalisePhone(num);
  if (!norm) return [];
  const out = [norm];

  for (const { cc, nationalLen } of TRUNK) {
    // "0<national>" (as typed) -> "<cc><national>" (as WhatsApp sends it)
    if (norm.startsWith('0') && norm.length === nationalLen + 1) {
      out.push(`${cc}${norm.slice(1)}`);
    }
    // "<cc><national>" -> "0<national>", for a record saved the other way round
    if (norm.startsWith(cc) && norm.length === cc.length + nationalLen) {
      out.push(`0${norm.slice(cc.length)}`);
    }
  }

  return [...new Set(out)];
}
