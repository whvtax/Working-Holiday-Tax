// WHT logo mark (A2): a backpack with an amber highlighter flap line.
export function LogoMark({ size = 30, tone = 'forest' }: { size?: number; tone?: 'forest' | 'light' }) {
  const body = tone === 'light' ? '#FFFFFF' : '#0B5240'
  const detail = tone === 'light' ? '#0B5240' : '#FFFFFF'
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M19 9.5 C19 2.5 29 2.5 29 9.5" stroke={body} strokeWidth="3.2" strokeLinecap="round" />
      <rect x="6" y="30" width="6" height="9.5" rx="3" fill={body} />
      <rect x="36" y="30" width="6" height="9.5" rx="3" fill={body} />
      <path d="M10 21.5 C10 14 14.5 9 24 9 C33.5 9 38 14 38 21.5 V41 C38 43 36.5 44.5 34.5 44.5 H13.5 C11.5 44.5 10 43 10 41 Z" fill={body} />
      <path d="M12.6 22.6 Q24 29 35.4 22.6" stroke={tone === 'light' ? '#0B5240' : '#F2B632'} strokeWidth="3.2" strokeLinecap="round" />
      <rect x="15.5" y="31.5" width="17" height="9" rx="3" stroke={detail} strokeWidth="2.6" />
    </svg>
  )
}
