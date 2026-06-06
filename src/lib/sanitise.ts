// Sanitise user input — trim, strip HTML, cap length
export function sanitiseField(value: unknown, maxLength = 500): string {
  if (value == null) return ''
  return String(value).trim().replace(/<[^>]*>/g, '').slice(0, maxLength)
}

export function sanitiseShort(value: unknown): string {
  return sanitiseField(value, 100)
}
