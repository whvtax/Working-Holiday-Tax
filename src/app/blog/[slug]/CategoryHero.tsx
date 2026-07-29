import { type Category, getCategoryColor } from '../data'

/**
 * Decorative card/hero visual for a blog article.
 *
 * Shows a large emoji chosen to match what the specific article is about, on a
 * soft category-tinted background — warmer and more readable than an abstract
 * illustration, and consistent with the emoji cards on /expenses.
 *
 * The emoji is looked up by slug, so it is stable, intentional and easy to
 * change: edit ARTICLE_EMOJI below. Anything not listed falls back to a
 * sensible per-category default. Sizing uses container query units so the
 * same component works on small cards and on the large article hero.
 */

const ARTICLE_EMOJI: Record<string, string> = {
  'what-is-a-tfn': '🆔',
  'how-to-apply-for-a-tfn': '🆔',
  'how-long-does-it-take-to-get-a-tfn': '⏳',
  'can-you-start-work-without-a-tfn': '🕐',
  'what-happens-without-your-tfn': '⚠️',
  'tfn-vs-abn-difference': '🔀',
  'apply-for-tfn-before-arriving': '✈️',
  'tfn-application-delayed': '⏳',
  'do-you-need-new-tfn-second-visa': '🔁',
  'how-to-find-lost-tfn': '🔎',
  'what-is-an-abn': '💼',
  'how-to-register-for-an-abn': '📋',
  'farm-work-and-abns': '🌾',
  'employee-vs-contractor-australia': '🔀',
  'can-you-have-tfn-and-abn': '🔗',
  'how-to-cancel-your-abn': '🗑️',
  'gst-and-abn-for-working-holiday-makers': '🔟',
  'how-does-australian-tax-year-work': '📅',
  'backpacker-tax-rate-australia': '📊',
  'how-to-lodge-tax-return-working-holiday': '📝',
  'what-is-payg-payment-summary': '📄',
  'tax-deductions-working-holiday-makers': '🧮',
  'do-you-need-to-lodge-tax-return-short-stay': '⏱️',
  'how-to-lodge-tax-return-from-overseas': '✈️',
  'what-is-a-tax-agent': '🎓',
  'how-does-payg-withholding-work': '🔁',
  'australian-financial-year-dates': '📅',
  'cash-in-hand-tax-return': '💵',
  'what-is-superannuation': '🏦',
  'how-much-super-should-employer-pay': '🧮',
  'what-is-dasp-super-withdrawal': '🏦',
  'how-to-apply-for-super-back': '🏦',
  'how-long-does-dasp-take': '⏳',
  'tax-on-super-withdrawal-backpacker': '💵',
  'what-happens-to-unclaimed-super': '📦',
  'can-you-withdraw-super-in-australia': '🔒',
  'how-to-find-lost-superannuation': '🔎',
  'how-to-choose-super-fund': '🎯',
  'minimum-wage-australia-2026-27': '💲',
  'how-many-hours-can-you-work-on-whv': '⏱️',
  'penalty-rates-australia': '🌙',
  'can-your-employer-pay-you-cash-in-hand': '💵',
  'fair-work-act-working-holiday-makers': '⚖️',
  'employer-not-paying-correctly': '⚠️',
  'leave-entitlements-working-holiday-visa': '🌴',
  'what-is-a-tax-invoice': '🧾',
  'can-you-work-for-multiple-employers': '👥',
  'full-time-part-time-casual-australia': '🗂️',
  'what-is-medicare-working-holiday-makers': '🏥',
  'countries-with-medicare-agreement-australia': '🌍',
  'medicare-levy-working-holiday-makers': '🩺',
  'tax-file-number-declaration-form': '📝',
  'what-does-tax-withheld-mean-payslip': '🔍',
  'what-is-an-income-statement': '📄',
  'what-is-the-ato': '🏛️',
  'gross-pay-vs-net-pay-australia': '➗',
  'do-working-holiday-makers-pay-tax-on-tips': '🪙',
  'tax-obligations-after-leaving-australia': '✈️',
  'tax-residency-working-holiday-makers': '🏠',
  'how-to-update-address-with-ato': '📍',
  'what-is-a-tax-refund-australia': '💰',
  'how-long-does-tax-refund-take-australia': '⏳',
  'super-for-casual-and-part-time-workers': '🧾',
  'employer-asking-you-to-work-more-than-visa-allows': '🚩',
  'farm-work-rights-working-holiday-australia': '🌾',
  'what-is-superannuation-guarantee-charge': '⚠️',
  'tfn-reference-number-before-tfn-arrives': '🔢',
  'tax-free-threshold-working-holiday-visa': '🚧',
  'white-card-australia-working-holiday': '🦺',
  'rsa-certificate-australia-working-holiday': '🍺',
  'wwcc-working-with-children-check-australia': '🧒',
  'public-holidays-australia-working-holiday': '🎉',
  'casual-shift-cancellation-rules-australia': '📵',
  'six-month-employer-rule-working-holiday-visa': '📆',
  'opening-bank-account-australia-working-holiday': '🏧',
  'trs-tourist-refund-scheme-australia': '🛫',
  'transferring-money-overseas-australia-tax': '🌐',
  'vehicle-logbook-abn-working-holiday': '🚗',
  'small-business-tax-offset-working-holiday-abn': '🏪',
  'sole-trader-vs-company-australia-working-holiday': '🏛️',
  'profit-loss-vs-personal-services-income-australia': '📊',
  'low-income-tax-offset-working-holiday': '📉',
  'appealing-ato-decision-australia': '⚖️',
  'amending-tax-return-australia': '✏️',
  'ato-payment-plan-tax-debt-australia': '💳',
  'piece-rates-farm-work-working-holiday': '🧺',
  'labour-hire-agencies-working-holiday-australia': '🤝',
  'how-to-read-a-payslip-australia-working-holiday': '🧾',
  'wage-theft-working-holiday-australia': '🚨',
  'backpacker-tax-history-australia': '📜',
  'how-to-check-super-balance-working-holiday': '📱',
  'tfn-application-rejected': '❌',
  'tfn-identity-documents-required': '🛂',
  'tfn-security-protect-from-fraud': '🔐',
  'who-can-ask-for-your-tfn': '🔐',
  'tfn-australian-address-no-fixed-address': '📮',
  'abn-invoicing-requirements-australia': '🧾',
  'abn-deductions-business-expenses': '🧾',
  'uber-doordash-rideshare-abn-working-holiday': '🛵',
  'tax-return-without-tfn-australia': '🆘',
  'multiple-jobs-tax-return-working-holiday': '👥',
  'second-third-year-visa-tax-implications': '🛂',
  'dasp-documents-required': '📑',
  'dasp-tax-rate-65-percent-explained': '✂️',
  'super-multiple-funds-consolidation': '🔗',
  'dasp-rejected-what-to-do': '🚫',
  'super-employer-not-paying-what-to-do': '⚠️',
  'super-stapling-rule-australia': '📎',
  'workplace-injury-working-holiday-rights': '🩹',
  'unfair-dismissal-working-holiday-australia': '⚖️',
  'bullying-harassment-workplace-working-holiday': '🛡️',
  'unpaid-trial-shifts-australia-legal': '🚫',
  'uniform-laundry-deductions-illegal-australia': '👕',
  'uk-medicare-reciprocal-agreement-australia': '🇬🇧',
  'german-european-health-insurance-australia-working-holiday': '🇩🇪',
  'private-health-insurance-working-holiday-australia': '🏥',
  'emergency-medical-care-working-holiday-no-medicare': '🚑',
  'travel-insurance-vs-health-insurance-working-holiday': '🧳',
  'hospitality-award-working-holiday-makers': '🍽️',
  'horticulture-award-working-holiday-makers': '🌾',
  'restaurant-industry-award-working-holiday': '🍝',
  'award-classifications-working-holiday-australia': '📚',
  'late-tax-return-penalty-working-holiday': '⏰',
  'understating-income-ato-penalty-working-holiday': '🚨',
  'tools-equipment-under-300-instant-deduction-whv': '🔧',
  '1000-dollar-instant-deduction-rule-2026': '⚡',
  'bicycle-motorcycle-vehicle-deductions-working-holiday': '🚲',
  'dasp-vs-leaving-super-in-australia-pros-cons': '⚖️',
  'fruit-picking-jobs-working-holiday-australia': '🍓',
  'farm-hand-jobs-working-holiday-australia': '🚜',
  'bartender-jobs-working-holiday-australia': '🍸',
  'barista-coffee-shop-working-holiday-australia': '☕',
  'waiter-waitress-working-holiday-australia': '🍽️',
  'kitchen-hand-working-holiday-australia': '🔪',
  'construction-laborer-working-holiday-australia': '🏗️',
  'uber-eats-delivery-rider-working-holiday-australia': '🛵',
  'uber-driver-working-holiday-australia': '🚗',
  'ski-resort-jobs-working-holiday-australia': '🎿',
  'supermarket-work-coles-woolworths-working-holiday': '🛒',
  'station-hand-cattle-station-working-holiday-australia': '🐄',
  'super-rate-12-percent-2025-2026-increase': '📈',
  'bringing-money-into-australia-10000-reporting-threshold': '💼',
  'ato-tax-debt-failure-to-pay-penalty-australia': '⚠️',
  'tax-back-australia-working-holiday': '💰',
  'average-tax-refund-working-holiday': '📊',
  'best-way-to-claim-super-leaving-australia': '🏦',
  'working-holiday-visa-tax-guide-417-462': '🛂',
  'diy-tax-return-vs-tax-agent-working-holiday': '⚖️',
  'tfn': '🆔',
  'abn': '💼',
  'tax-return': '💰',
  'super': '🏦',
  'work-rights': '⚖️',
  'medicare-and-other': '🏥',
}

const CATEGORY_FALLBACK: Record<Category, string> = {
  'TFN': '\u{1F194}',
  'ABN': '\u{1F4BC}',
  'Tax Return': '\u{1F4B0}',
  'Super': '\u{1F3E6}',
  'Work Rights': '\u2696\uFE0F',
  'Medicare & Other': '\u{1F3E5}',
}

const CATEGORY_LABEL: Record<Category, string> = {
  'TFN': 'TFN',
  'ABN': 'ABN',
  'Tax Return': 'Tax Return',
  'Super': 'Superannuation',
  'Work Rights': 'Work Rights',
  'Medicare & Other': 'Medicare & More',
}

export default function CategoryHero({
  category,
  title,
  slug,
  variant = 'card',
}: {
  category: Category
  title: string
  slug?: string
  /** 'card' = tinted panel used on blog cards. 'badge' = just the emoji in a circle. */
  variant?: 'card' | 'badge'
}) {
  const colors = getCategoryColor(category)
  const emoji = (slug && ARTICLE_EMOJI[slug]) || CATEGORY_FALLBACK[category] || '\u{1F4C4}'

  if (variant === 'badge') {
    return (
      <div
        role="img"
        aria-label={`${CATEGORY_LABEL[category]}: ${title}`}
        style={{
          width: '132px',
          height: '132px',
          maxWidth: '100%',
          margin: '0 auto',
          borderRadius: '50%',
          background: '#ffffff',
          border: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '58px',
          lineHeight: 1,
        }}
      >
        <span aria-hidden="true" style={{ filter: 'drop-shadow(0 2px 4px rgba(8,15,13,0.10))' }}>
          {emoji}
        </span>
      </div>
    )
  }


  return (
    <div
      className="category-hero-image"
      role="img"
      aria-label={`${CATEGORY_LABEL[category]}: ${title}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 'inherit',
        background: `radial-gradient(120% 120% at 50% 0%, #ffffff 0%, ${colors.bg} 72%)`,
        borderBottom: `1px solid ${colors.border}`,
        containerType: 'size',
        fontSize: '52px',
      }}
    >
      {/* Soft dotted texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${colors.text} 1px, transparent 1px)`,
          backgroundSize: '18px 18px',
          opacity: 0.08,
        }}
      />

      {/* Halo behind the emoji */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 'min(62cqh, 148px)',
          aspectRatio: '1',
          borderRadius: '50%',
          background: '#ffffff',
          opacity: 0.72,
          boxShadow: `0 0 0 1px ${colors.border}`,
        }}
      />

      <span
        aria-hidden="true"
        style={{
          position: 'relative',
          fontSize: 'min(40cqh, 96px)',
          lineHeight: 1,
          filter: 'drop-shadow(0 2px 4px rgba(8,15,13,0.10))',
        }}
      >
        {emoji}
      </span>

      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '14px',
          bottom: '10px',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: colors.text,
          opacity: 0.55,
        }}
      >
        {CATEGORY_LABEL[category]}
      </span>
    </div>
  )
}
