'use client'
import { useEffect, useId, useRef, useState } from 'react'
import { FORM_LANGS, type AnyFormLang } from '@/lib/formStrings'
import { FORM_LANG_HTML, FORM_LANG_NAMES } from '@/lib/form-lang'

/**
 * Language picker shown in the top corner of each form (decision 017).
 *
 * One small button that shows the current language by name and opens a list
 * of the languages, each written in its own language. No flags: a flag is a
 * country, not a language, and nine of them were the loudest thing on the
 * card. The row of text links this replaces did not fit nine languages on a
 * 360px screen.
 *
 * Only the interface language changes; nothing typed is lost, and what is
 * submitted to the CRM stays as the client typed it.
 *
 * Keyboard: the button opens the list (Enter, Space, ArrowDown, ArrowUp);
 * arrows, Home and End move; Enter or Space chooses; Escape or Tab closes;
 * focus returns to the button.
 */
export function FormLanguageToggle<L extends AnyFormLang = AnyFormLang>({ lang, onChange, langs, label = 'Language' }: {
  lang: L
  onChange: (l: L) => void
  /** Which languages to offer. Default: all nine. */
  langs?: readonly L[]
  /** The word "Language" in the current language, for screen readers. */
  label?: string
}) {
  const list = (langs ?? (FORM_LANGS as readonly AnyFormLang[])) as readonly L[]
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const optRefs = useRef<Array<HTMLDivElement | null>>([])
  const listId = useId()

  const close = (returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) btnRef.current?.focus()
  }
  const openAt = (i: number) => { setActive(Math.max(0, i)); setOpen(true) }
  const choose = (l: L) => { onChange(l); close(true) }

  // Focus follows the active row while the list is open.
  useEffect(() => { if (open) optRefs.current[active]?.focus() }, [open, active])

  // A tap or click anywhere else closes the list.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
    }
  }, [open])

  const onButtonKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      openAt(list.indexOf(lang))
    } else if (e.key === 'Escape' && open) {
      e.preventDefault()
      close(true)
    }
  }

  const onListKey = (e: React.KeyboardEvent) => {
    const last = list.length - 1
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true) }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => (i >= last ? 0 : i + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(i => (i <= 0 ? last : i - 1)) }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0) }
    else if (e.key === 'End') { e.preventDefault(); setActive(last) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(list[active]) }
    else if (e.key === 'Tab') { setOpen(false) }
  }

  return (
    <div className="flang" ref={wrapRef}>
      <style>{styles}</style>
      <button
        ref={btnRef}
        type="button"
        className="flang-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`${label}: ${FORM_LANG_NAMES[lang]}`}
        onClick={() => (open ? close(false) : openAt(list.indexOf(lang)))}
        onKeyDown={onButtonKey}
      >
        <span lang={FORM_LANG_HTML[lang]}>{FORM_LANG_NAMES[lang]}</span>
        <svg className={`flang-chev${open ? ' is-open' : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div id={listId} className="flang-list" role="listbox" aria-label={label} onKeyDown={onListKey}>
          {list.map((code, i) => (
            <div
              key={code}
              ref={el => { optRefs.current[i] = el }}
              role="option"
              aria-selected={code === lang}
              tabIndex={i === active ? 0 : -1}
              lang={FORM_LANG_HTML[code]}
              className={`flang-opt${code === lang ? ' is-current' : ''}`}
              onClick={() => choose(code)}
              onMouseEnter={() => setActive(i)}
            >
              <span>{FORM_LANG_NAMES[code]}</span>
              {code === lang && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = `
  /* Right-aligned in the top corner of the card. The list hangs from the
     button's right edge, so it can never run off a narrow screen. */
  .flang { position: relative; display: flex; justify-content: flex-end; margin: -8px -2px 6px; }
  /* 44px tall: the WCAG 2.5.5 target size, on a control whose text is small. */
  .flang-btn { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 10px; font-size: 13px; font-weight: 600; font-family: inherit; color: var(--f-muted, #525A57); background: none; border: none; border-radius: 10px; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .flang-btn:hover, .flang-btn[aria-expanded="true"] { color: var(--f-brand, #0B5240); }
  .flang-btn:focus-visible { outline: 2px solid var(--f-brand, #0B5240); outline-offset: 1px; }
  .flang-chev { flex-shrink: 0; }
  .flang-chev.is-open { transform: rotate(180deg); }
  /* Never wider than a 360px screen minus the page gutters; scrolls inside
     itself on a short screen instead of pushing the page sideways. */
  .flang-list { position: absolute; top: calc(100% + 2px); right: 0; z-index: 30; width: 200px; max-width: calc(100vw - 48px); max-height: min(420px, 70vh); overflow-y: auto; overscroll-behavior: contain; padding: 6px; text-align: left; background: #fff; border: 1px solid var(--f-line, #DCE0DE); border-radius: 14px; box-shadow: 0 8px 28px rgba(var(--f-brand-rgb, 11,82,64), 0.14); }
  .flang-opt { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 44px; padding: 0 12px; font-size: 15px; font-weight: 500; color: var(--f-ink, #0F1A16); border-radius: 9px; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .flang-opt:hover, .flang-opt:focus { background: var(--f-tint, #F2FAF7); outline: none; }
  .flang-opt:focus-visible { outline: 2px solid var(--f-brand, #0B5240); outline-offset: -2px; }
  .flang-opt.is-current { color: var(--f-brand, #0B5240); font-weight: 700; }
`
