import { type Category, getCategoryColor } from '../data'

/**
 * Renders a decorative SVG hero image based on the article's category.
 * Uses category colors for a cohesive look without needing actual photos.
 * Lightweight (inline SVG), accessible, no external requests, and looks distinct per category.
 */
export default function CategoryHero({ category, title }: { category: Category; title: string }) {
  const colors = getCategoryColor(category)

  // Each category gets a different visual motif to feel distinct
  const renderMotif = () => {
    switch (category) {
      case 'TFN':
        // Concentric rings - represent identity/numbers
        return (
          <>
            <circle cx="160" cy="100" r="80" fill="none" stroke={colors.border} strokeWidth="1.5" opacity="0.5" />
            <circle cx="160" cy="100" r="60" fill="none" stroke={colors.border} strokeWidth="1.5" opacity="0.7" />
            <circle cx="160" cy="100" r="40" fill="none" stroke={colors.text} strokeWidth="2" opacity="0.85" />
            <circle cx="160" cy="100" r="20" fill={colors.text} opacity="0.15" />
            <circle cx="160" cy="100" r="6" fill={colors.text} />
          </>
        )
      case 'ABN':
        // Geometric grid - represents business/structure
        return (
          <>
            <rect x="100" y="40" width="50" height="50" fill="none" stroke={colors.border} strokeWidth="1.5" rx="4" opacity="0.6" />
            <rect x="160" y="40" width="50" height="50" fill="none" stroke={colors.border} strokeWidth="1.5" rx="4" opacity="0.6" />
            <rect x="100" y="100" width="50" height="50" fill={colors.text} rx="4" opacity="0.85" />
            <rect x="160" y="100" width="50" height="50" fill="none" stroke={colors.text} strokeWidth="2" rx="4" />
            <rect x="220" y="100" width="50" height="50" fill="none" stroke={colors.border} strokeWidth="1.5" rx="4" opacity="0.5" />
            <rect x="160" y="160" width="50" height="50" fill="none" stroke={colors.border} strokeWidth="1.5" rx="4" opacity="0.6" />
          </>
        )
      case 'Tax Return':
        // Stacked documents - represents paperwork
        return (
          <>
            <rect x="110" y="60" width="100" height="120" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" rx="6" transform="rotate(-6 160 120)" />
            <rect x="120" y="50" width="100" height="120" fill="#fff" stroke={colors.text} strokeWidth="2" rx="6" />
            <line x1="135" y1="80" x2="200" y2="80" stroke={colors.text} strokeWidth="2" opacity="0.6" />
            <line x1="135" y1="100" x2="195" y2="100" stroke={colors.text} strokeWidth="1.5" opacity="0.4" />
            <line x1="135" y1="115" x2="180" y2="115" stroke={colors.text} strokeWidth="1.5" opacity="0.4" />
            <line x1="135" y1="140" x2="190" y2="140" stroke={colors.text} strokeWidth="1.5" opacity="0.3" />
            <line x1="135" y1="155" x2="170" y2="155" stroke={colors.text} strokeWidth="1.5" opacity="0.3" />
          </>
        )
      case 'Super':
        // Growing bars - represents accumulation
        return (
          <>
            <rect x="100" y="160" width="22" height="30" fill={colors.border} rx="3" opacity="0.6" />
            <rect x="130" y="140" width="22" height="50" fill={colors.border} rx="3" opacity="0.75" />
            <rect x="160" y="110" width="22" height="80" fill={colors.text} rx="3" opacity="0.9" />
            <rect x="190" y="80" width="22" height="110" fill={colors.text} rx="3" />
            <path d="M 105 155 Q 145 110 215 75" fill="none" stroke={colors.text} strokeWidth="2" strokeLinecap="round" opacity="0.7" strokeDasharray="3,3" />
            <circle cx="215" cy="75" r="4" fill={colors.text} />
          </>
        )
      case 'Work Rights':
        // Shield - represents protection
        return (
          <>
            <path
              d="M 160 50 L 220 80 L 220 130 Q 220 170 160 195 Q 100 170 100 130 L 100 80 Z"
              fill={colors.bg}
              stroke={colors.text}
              strokeWidth="2.5"
              opacity="0.9"
            />
            <path
              d="M 135 125 L 152 142 L 188 105"
              fill="none"
              stroke={colors.text}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )
      case 'Medicare & Other':
        // Plus/cross - represents health
        return (
          <>
            <circle cx="160" cy="120" r="65" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            <rect x="148" y="80" width="24" height="80" fill={colors.text} rx="6" />
            <rect x="120" y="108" width="80" height="24" fill={colors.text} rx="6" />
          </>
        )
    }
  }

  return (
    <div
      className="category-hero-image"
      role="img"
      aria-label={`Decorative illustration for ${category}`}
      style={{
        width: '100%',
        background: `linear-gradient(135deg, ${colors.bg} 0%, #fff 100%)`,
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
        position: 'relative',
      }}
    >
      <svg
        viewBox="0 0 320 240"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background dots pattern */}
        <defs>
          <pattern id={`dots-${category.replace(/\s|&/g, '')}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={colors.text} opacity="0.1" />
          </pattern>
        </defs>
        <rect width="320" height="240" fill={`url(#dots-${category.replace(/\s|&/g, '')})`} />

        {/* Category-specific motif */}
        {renderMotif()}

        {/* Category label */}
        <text
          x="20"
          y="225"
          fontSize="11"
          fontWeight="700"
          fill={colors.text}
          letterSpacing="2"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {category.toUpperCase()}
        </text>
      </svg>
    </div>
  )
}
