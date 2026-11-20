/** @jest-environment jsdom */
/**
 * The language picker (decision 017): one button showing the current language,
 * a list of nine languages each in its own language, keyboard accessible.
 */
import fs from 'node:fs'
import path from 'node:path'
import { useState } from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FormLanguageToggle } from '../FormLanguageToggle'
import type { AnyFormLang } from '@/lib/formStrings'

const NAMES = ['English', 'Deutsch', '日本語', 'Español', 'Français', 'Italiano', 'Português', '中文', 'Tiếng Việt']

function Harness({ start = 'en' as AnyFormLang, onPick }: { start?: AnyFormLang; onPick?: (l: AnyFormLang) => void }) {
  const [lang, setLang] = useState<AnyFormLang>(start)
  return <FormLanguageToggle lang={lang} onChange={(l) => { setLang(l); onPick?.(l) }} label="Language" />
}

describe('FormLanguageToggle', () => {
  it('shows one button with the current language name; the list is closed', () => {
    render(<Harness start="de" />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveTextContent('Deutsch')
    expect(btn).toHaveAttribute('aria-haspopup', 'listbox')
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    expect(btn).toHaveAttribute('aria-label', 'Language: Deutsch')
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('opens a list of the nine languages, each written in its own language, current one selected', () => {
    render(<Harness start="ja" />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
    const options = within(screen.getByRole('listbox')).getAllByRole('option')
    expect(options.map((o) => o.textContent)).toEqual(NAMES)
    expect(options.filter((o) => o.getAttribute('aria-selected') === 'true').map((o) => o.textContent)).toEqual(['日本語'])
    expect(options[6]).toHaveAttribute('lang', 'pt-BR')
    // Focus moved to the selected row.
    expect(document.activeElement).toBe(options[2])
  })

  it('choosing a language calls onChange, closes the list and returns focus to the button', () => {
    const picked: string[] = []
    render(<Harness onPick={(l) => picked.push(l)} />)
    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    fireEvent.click(screen.getByText('Tiếng Việt'))
    expect(picked).toEqual(['vi'])
    expect(screen.queryByRole('listbox')).toBeNull()
    expect(btn).toHaveTextContent('Tiếng Việt')
    expect(document.activeElement).toBe(btn)
  })

  it('Escape closes the list without changing the language and returns focus to the button', () => {
    const picked: string[] = []
    render(<Harness start="es" onPick={(l) => picked.push(l)} />)
    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Escape' })
    expect(screen.queryByRole('listbox')).toBeNull()
    expect(picked).toEqual([])
    expect(btn).toHaveTextContent('Español')
    expect(document.activeElement).toBe(btn)
  })

  it('works from the keyboard: ArrowDown opens, arrows move with wrap-around, Home and End jump, Enter chooses', () => {
    const picked: string[] = []
    render(<Harness start="en" onPick={(l) => picked.push(l)} />)
    const btn = screen.getByRole('button')
    btn.focus()
    fireEvent.keyDown(btn, { key: 'ArrowDown' })
    const list = screen.getByRole('listbox')
    const options = within(list).getAllByRole('option')
    expect(document.activeElement).toBe(options[0])
    fireEvent.keyDown(list, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(options[1])
    fireEvent.keyDown(list, { key: 'ArrowUp' })
    fireEvent.keyDown(list, { key: 'ArrowUp' })
    expect(document.activeElement).toBe(options[8])
    fireEvent.keyDown(list, { key: 'Home' })
    expect(document.activeElement).toBe(options[0])
    fireEvent.keyDown(list, { key: 'End' })
    expect(document.activeElement).toBe(options[8])
    fireEvent.keyDown(list, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(options[0])
    fireEvent.keyDown(list, { key: 'ArrowDown' })
    fireEvent.keyDown(list, { key: 'ArrowDown' })
    fireEvent.keyDown(list, { key: 'ArrowDown' })
    fireEvent.keyDown(list, { key: 'Enter' })
    expect(picked).toEqual(['es'])
    expect(document.activeElement).toBe(btn)
  })

  it('a tap outside closes the list', () => {
    render(<div><Harness /><p>outside</p></div>)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    fireEvent.mouseDown(screen.getByText('outside'))
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('can be limited to fewer languages (the super form has three)', () => {
    render(<FormLanguageToggle lang="en" onChange={() => {}} langs={['en', 'de', 'ja']} />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual(['English', 'Deutsch', '日本語'])
  })

  it('is sized for a phone: 44px targets, fits 360px, uses the form colour variables, no flags', () => {
    const src = fs.readFileSync(path.join(__dirname, '..', 'FormLanguageToggle.tsx'), 'utf8')
    const css = src.slice(src.indexOf('const styles'))
    expect(css).toMatch(/\.flang-btn \{[^}]*min-height: 44px/)
    expect(css).toMatch(/\.flang-opt \{[^}]*min-height: 44px/)
    // 200px wide at most and never wider than the screen minus the gutters: fits 360px with no sideways scroll.
    expect(css).toMatch(/\.flang-list \{[^}]*width: 200px; max-width: calc\(100vw - 48px\)/)
    expect(css).toMatch(/\.flang-list \{[^}]*right: 0/)
    expect(css).toContain('var(--f-brand, #0B5240)')
    expect(css).toContain('var(--f-muted, #525A57)')
    expect(src).not.toMatch(/[\u{1F1E6}-\u{1F1FF}]/u)
    expect(src).not.toMatch(/<img|flag-icon|\.svg['"]|\.png['"]/)
  })

  it('the tax form shows the picker on step 1 with the translated label', () => {
    const form = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'app', '(site)', 'start', 'FormClient.tsx'), 'utf8')
    expect(form).toContain("<FormLanguageToggle lang={lang} onChange={setLang} label={T('langPicker')} />")
  })
})
