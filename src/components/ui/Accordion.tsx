'use client'
import { useState } from 'react'

export interface AccItem { question: string; answer: string }

export function Accordion({ items }: { items: AccItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="max-w-2xl">
      {items.map((item, i) => (
        <div key={i} className="border-b border-border first:border-t">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between gap-4 py-5 text-left text-[15px] font-medium text-ink transition-colors hover:text-forest-500"
          >
            <span>{item.question}</span>
            <span className={`w-7 h-7 rounded-full border border-border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open === i ? 'bg-forest-500 border-forest-500 rotate-45' : ''}`}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 2l6 6M8 2l-6 6" stroke={open === i ? '#fff' : '#0B5240'} strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          <div className={`acc-body text-[14px] font-light text-muted leading-relaxed ${open === i ? 'open' : ''}`}>
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  )
}
