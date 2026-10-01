// ============================================================
// "I'll fill it in on Wednesday" means: do not remind me before Wednesday.
//
// 1 Oct (72-hour audit, Laura +353 87): she wrote "I'm up north until Tuesday,
// I will fill in Wednesday", Will answered "Wednesday works perfectly", and the
// scheduler then sent her the 6-hour and the 3-day form reminders, both
// before Wednesday. A date the customer names is a promise we accepted; the
// cadence has to honour it.
//
// This reads such a date out of a customer message, deterministically, in
// the languages Will speaks (English fully; German, Spanish, French, Italian,
// Portuguese and Japanese for the common words). It deliberately answers
// null for anything it is not sure about: a missed date costs one reminder a
// customer did not want; a wrong date silences reminders somebody needed.
// ============================================================

const WEEKDAYS: Record<string, number> = {
  sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6,
  sonntag: 0, montag: 1, dienstag: 2, mittwoch: 3, donnerstag: 4, freitag: 5, samstag: 6,
  domingo: 0, lunes: 1, martes: 2, miércoles: 3, miercoles: 3, jueves: 4, viernes: 5, sábado: 6, sabado: 6,
  dimanche: 0, lundi: 1, mardi: 2, mercredi: 3, jeudi: 4, vendredi: 5, samedi: 6,
  domenica: 0, lunedì: 1, lunedi: 1, martedì: 2, martedi: 2, mercoledì: 3, mercoledi: 3, giovedì: 4, giovedi: 4, venerdì: 5, venerdi: 5, sabato: 6,
  'segunda-feira': 1, segunda: 1, 'terça-feira': 2, terça: 2, 'quarta-feira': 3, quarta: 3, 'quinta-feira': 4, quinta: 4, 'sexta-feira': 5, sexta: 5, sábado_pt: 6,
};

const DAY_MS = 24 * 3600 * 1000;

/** The cue that the date is about THEIR doing something later (not a question
 *  about our timing). Kept loose on purpose: "Wednesday" alone, in a chat at
 *  Form Pending, is almost always "I'll do it Wednesday". */
const FUTURE_CUE = /\b(?:i(?:'| wi)?ll|i will|i can|i'm going to|gonna|will do|will fill|will send|will complete|do it|fill (?:it )?(?:in|out)|send (?:it|them)|get to it|mache ich|schicke ich|fülle ich|lo hago|lo envío|lo haré|je le ferai|je l'enverrai|lo faccio|lo invio|faço|envio)\b|します|送ります|書きます/i;

/**
 * When did the customer say they would do it? Returns the ISO time until
 * which reminders should stay quiet (the promised day, end of day in UTC,
 * plus a 12-hour grace), or null when no date is named.
 */
export function promisedUntil(text: string, now: Date = new Date()): string | null {
  const t = (text ?? '').toLowerCase();
  if (!t.trim()) return null;
  const endOfDay = (d: Date) => { const e = new Date(d); e.setUTCHours(23, 59, 59, 999); return e; };
  const grace = (d: Date) => new Date(endOfDay(d).getTime() + 12 * 3600 * 1000).toISOString();

  // "in 2 days", "in a few days", "in 3 Tagen", "en 2 días", "dans 3 jours"
  const inDays = t.match(/\b(?:in|en|dans|tra|fra|em)\s+(\d{1,2}|a few|ein paar|unos|quelques|qualche|alguns)\s+(?:days?|tagen?|d[ií]as?|jours?|giorni|dias)\b/);
  if (inDays) {
    const n = /\d/.test(inDays[1]) ? Number(inDays[1]) : 3;
    if (n >= 1 && n <= 30) return grace(new Date(now.getTime() + n * DAY_MS));
  }
  // tomorrow / morgen / mañana / demain / domani / amanhã / 明日
  if (/\b(?:tomorrow|tmrw|tmr|morgen|mañana|manana|demain|domani|amanhã|amanha)\b|明日/.test(t)) return grace(new Date(now.getTime() + DAY_MS));
  // tonight / later today / heute abend / esta noche / ce soir / stasera / hoje à noite / 今夜 / 今日中
  if (/\b(?:tonight|later today|this evening|heute abend|heute noch|esta noche|ce soir|stasera|hoje)\b|今夜|今日中/.test(t)) return grace(now);
  // next week / nächste woche / la semana que viene / la semaine prochaine / la prossima settimana / próxima semana / 来週
  if (/\b(?:next week|nächste woche|naechste woche|la semana que viene|la próxima semana|la proxima semana|la semaine prochaine|la prossima settimana|próxima semana|proxima semana)\b|来週/.test(t)) return grace(new Date(now.getTime() + 7 * DAY_MS));
  // this weekend / am wochenende / este fin de semana / ce week-end / questo fine settimana / fim de semana / 週末
  if (/\b(?:this weekend|on the weekend|at the weekend|am wochenende|este fin de semana|el fin de semana|ce week-?end|questo fine settimana|(?:este|no) fim de semana)\b|週末/.test(t)) {
    const d = new Date(now); const toSunday = (7 - d.getUTCDay()) % 7 || 7; d.setTime(d.getTime() + toSunday * DAY_MS); return grace(d);
  }
  // a weekday name, with a future cue somewhere in the message (or a bare
  // "Wednesday" as the whole answer); the LAST weekday named wins, because
  // "away until Tuesday, I'll do it Wednesday" is about Wednesday. A message
  // in the past tense ("I started on a Monday") is not a promise.
  if (/\b(?:started|was|were|did|had|last|ago)\b/.test(t)) return null;
  let best: { pos: number; dow: number } | null = null;
  for (const [name, dow] of Object.entries(WEEKDAYS)) {
    const key = name.replace('_pt', '');
    const m = new RegExp(`(?:^|[^\\p{L}])(${key.replace('-', '[- ]?')})(?:$|[^\\p{L}])`, 'u').exec(t);
    if (!m) continue;
    const pos = m.index;
    if (!best || pos > best.pos) best = { pos, dow };
  }
  if (best && (FUTURE_CUE.test(t) || t.trim().length <= 40)) {
    const d = new Date(now); const ahead = (best.dow - d.getUTCDay() + 7) % 7 || 7; d.setTime(d.getTime() + ahead * DAY_MS);
    return grace(d);
  }
  return null;
}

export const formPromisedKey = (customerId: string) => `form_promised_until:${customerId}`;
