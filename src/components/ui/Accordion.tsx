'use client'
import { useState } from 'react'

export interface AccItem { question: string; answer: string }

export function Accordion({ items }: { items: AccItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item, i) => {
        const contentId = `acc-body-${i}`
        const triggerId   = `acc-trigger-${i}`
        const isOpen = open === i
        return (
          <div key={i} className="rounded-[10px] overflow-hidden" style={{ background: '#F2FAF7' }}>
            {/* H4: proper aria-controls/id pairing; H5: aria-expanded as string */}
            <button
              type="button"
              id={triggerId}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="w-full flex items-center justify-between gap-3 min-h-[52px] px-4 py-3.5 text-left text-[16px] font-semibold text-ink transition-colors hover:text-forest-500"
            >
              <span>{item.question}</span>
              {/* A plus when closed, a minus when open. */}
              <span aria-hidden="true" className="flex-shrink-0 flex items-center justify-center w-6 h-6 text-forest-500">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1.5 7h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  {!isOpen && <path d="M7 1.5v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
                </svg>
              </span>
            </button>
            {/* A closed panel is clamped to zero height by grid-template-rows
                and clipped, but it is still in the accessibility tree, so a
                screen reader read every answer on the page whether or not its
                question had been opened, and aria-expanded said otherwise.
                `inert` hides the closed panel from assistive tech and from the
                tab order without touching the height transition, which
                display:none or the hidden attribute would break. */}
            <div
              id={contentId}
              role="region"
              aria-labelledby={triggerId}
              className={`acc-body ${isOpen ? 'open' : ''}`}
              {...(!isOpen ? ({ inert: '' } as Record<string, string>) : {})}
            >
              {/* The inner element is required: grid-template-rows: 0fr cannot
                  clamp a bare text node, so without it the panel never closes.

                  An answer used to render as one text node, so a ninety word
                  answer arrived as an unbroken wall on a phone. A blank line in
                  the answer now becomes a paragraph break. Pages that build
                  FAQPage structured data still pass the raw string to it, so the
                  schema is unchanged. */}
              <div className="acc-inner"><div className="px-4 pb-4 text-[15px] text-body leading-[1.65]">
                {item.answer.split('\n\n').map((para, j) => (
                  <p key={j} style={j > 0 ? { marginTop: '12px' } : undefined}>{para}</p>
                ))}
              </div></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
