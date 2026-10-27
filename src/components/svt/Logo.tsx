/**
 * The Student Visa Tax mark: a receipt (two lines and a lime price row)
 * wearing a graduation cap. Locked design. No letters, no tick, never a
 * coloured background behind it, and the cap is never lime.
 */
interface LogoProps {
  /** 'ink' on light backgrounds, 'mist' on the ink footer. */
  tone?: 'ink' | 'mist'
  size?: number
  /** Decorative when the brand name is printed next to it. */
  decorative?: boolean
  title?: string
}

export function Logo({ tone = 'ink', size = 32, decorative = false, title = 'Student Visa Tax' }: LogoProps) {
  const body = tone === 'ink' ? 'var(--svt-ink)' : 'var(--svt-mist)'
  const cut = tone === 'ink' ? 'var(--svt-paper)' : 'var(--svt-ink)'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      {...(decorative ? { 'aria-hidden': true, focusable: false } : { role: 'img', 'aria-label': title })}
    >
      <polygon points="12,19 36,19 36,40 32,45.5 28,40 24,45.5 20,40 16,45.5 12,40" fill={body} />
      <rect x="16" y="23" width="16" height="2.4" fill={cut} />
      <rect x="16" y="27.6" width="10" height="2.4" fill={cut} />
      <rect x="15" y="32.2" width="18" height="5" fill="var(--svt-lime)" />
      <polygon points="24,3 46,11.5 24,20 2,11.5" fill={body} />
    </svg>
  )
}
