'use client'
import { useState } from 'react'

export interface AccItem { question: string; answer: string }

export function Accordion({ items }: { items: AccItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      {items.map((item, i) => {
        const contentId = `acc-body-${i}`
        const triggerId   = `acc-trigger-${i}`
        const isOpen = open === i
        return (
          <div key={i} className="border-b border-border first:border-t">
            {/* H4: proper aria-controls/id pairing; H5: aria-expanded as string */}
            <button
              type="button"
              id={triggerId}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="w-full flex items-center justify-between gap-3 py-3.5 text-left text-[13px] font-medium text-ink transition-colors hover:text-forest-500"
            >
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className={`w-6 h-6 rounded-full border border-border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-forest-500 border-forest-500 rotate-45' : ''}`}
              >
                {/* A plus when closed. The rotate-45 on the wrapper turns it
                    into a cross when open, which is the state people expect. */}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1v8M1 5h8" stroke={isOpen ? '#fff' : '#0B5240'} strokeWidth="1.3" strokeLinecap="round" />
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
                  clamp a bare text node, so without it the panel never closes. */}
              <div className="acc-inner text-[15px] text-body leading-[1.65]">
                {item.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
