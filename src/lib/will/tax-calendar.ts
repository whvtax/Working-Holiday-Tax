// ============================================================
// TODAY'S DATE AND THE LODGEABLE YEAR, COMPUTED, NEVER REMEMBERED (11 Oct).
//
// Full audit, decision 7: the model has no clock. Jase (26 Aug 2026) was told
// "FY25-26 hasn't finished yet"; Anika, who worked in 2026, was told her return
// was 2023-24; marie (1 Oct) got "that year runs until 30 June 2026". Every
// prompt now carries the real date in Melbourne and which financial year can
// be lodged, computed here from the clock.
// ============================================================

const TZ = 'Australia/Melbourne';

function melbourneParts(now: Date): { y: number; m: number; d: number } {
  const f = new Intl.DateTimeFormat('en-AU', { timeZone: TZ, year: 'numeric', month: 'numeric', day: 'numeric' });
  const p = Object.fromEntries(f.formatToParts(now).map((x) => [x.type, x.value]));
  return { y: Number(p.year), m: Number(p.month), d: Number(p.day) };
}

export interface TaxCalendar {
  /** "11 October 2026" */
  today: string;
  /** "2025-26": the most recent financial year that has ended. */
  lodgeableYear: string;
  /** "1 July 2025 to 30 June 2026" */
  lodgeableSpan: string;
  /** "2026-27": the year currently running. */
  currentYear: string;
  /** "30 June 2027" */
  currentYearEnds: string;
}

export function taxCalendar(now: Date = new Date()): TaxCalendar {
  const { y, m, d } = melbourneParts(now);
  // The Australian financial year runs 1 July to 30 June. From 1 July the
  // year that just ended is lodgeable; the running year ends next 30 June.
  const endedYearEnd = m >= 7 ? y : y - 1;            // FY ending 30 June of this calendar year
  const fy = (endY: number) => `${endY - 1}-${String(endY).slice(2)}`;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return {
    today: `${d} ${months[m - 1]} ${y}`,
    lodgeableYear: fy(endedYearEnd),
    lodgeableSpan: `1 July ${endedYearEnd - 1} to 30 June ${endedYearEnd}`,
    currentYear: fy(endedYearEnd + 1),
    currentYearEnds: `30 June ${endedYearEnd + 1}`,
  };
}

/** The line that goes into every prompt. */
export function taxCalendarLine(now: Date = new Date()): string {
  const c = taxCalendar(now);
  return `Today is ${c.today} (Melbourne). The most recent financial year that can be lodged is ${c.lodgeableYear} (${c.lodgeableSpan}); it has ENDED. Work since 1 July ${c.currentYear.slice(0, 4)} belongs to the ${c.currentYear} return, which can only be lodged after ${c.currentYearEnds}. Never say a year that has ended has not finished, and never name a tax year from memory: use these.`;
}

/** The Library answer for "which year is my return", computed the same way. */
export function whichYearAnswer(now: Date = new Date()): string {
  const c = taxCalendar(now);
  return `The tax year runs 1 July to 30 June. Right now we can lodge your ${c.lodgeableYear} return (${c.lodgeableSpan}). Anything you earn from 1 July ${c.currentYear.slice(0, 4)} goes into next year's return, after ${c.currentYearEnds}.`;
}
