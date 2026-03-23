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
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 2l6 6M8 2l-6 6" stroke={isOpen ? '#fff' : '#0B5240'} strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              id={contentId}
              role="region"
              aria-labelledby={triggerId}
              className={`acc-body text-[12.5px] font-light text-muted leading-[1.65] ${isOpen ? 'open' : ''}`}
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
