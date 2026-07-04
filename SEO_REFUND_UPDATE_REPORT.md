# Working Holiday Tax — SEO Update Report for the Tax Refund Service

**Date:** May 28, 2026
**Goal:** rank the site first on Google and AI search engines for keywords related to WHV tax refunds
**Principle:** **no promised amounts** ("average $X" etc.) — avoided entirely for regulatory reasons (TPB/ATO) and professional liability

---

## What changed (15 page files + 3 layouts = 21 files total)

### Root Layouts (set default meta tags for the entire site)
1. `src/app/layout.tsx` — New title: "Working Holiday Tax Refund Australia - WHV Tax Return Specialists"
2. `src/app/de/layout.tsx` — New title: "Steuerrückerstattung Australien für Working Holiday Maker | WHV Steuer"
3. `src/app/ja/layout.tsx` — New title: "オーストラリア タックスリターン 還付金 - ワーキングホリデー専門"

### Homepages
4. `src/app/page.tsx` — new keywords around "tax refund"
5. `src/app/de/page.tsx` — "Steuerrückerstattung" as the central keyword
6. `src/app/ja/page.tsx` — "タックスリターン 還付金" as the central keyword

### Tax-Return service pages (the most critical page)
7. `src/app/tax-return/page.tsx`
8. `src/app/de/tax-return/page.tsx`
9. `src/app/ja/tax-return/page.tsx`

### Calculator pages (high-intent traffic)
10. `src/app/calculator/page.tsx` — "Working Holiday Tax Refund Calculator"
11. `src/app/de/calculator/page.tsx` — "Steuerrückerstattung Rechner"
12. `src/app/ja/calculator/page.tsx` — "タックスリターン 還付金 計算機"

### Blog index pages (entry points to all 143 articles)
13. `src/app/blog/page.tsx`
14. `src/app/de/blog/page.tsx`
15. `src/app/ja/blog/page.tsx`

### TFN pages (funnel pages → tax-return)
16. `src/app/tfn/page.tsx`
17. `src/app/de/tfn/page.tsx`
18. `src/app/ja/tfn/page.tsx`

### Superannuation pages (DASP = literally a "super refund")
19. `src/app/superannuation/page.tsx` — "Super Refund DASP"
20. `src/app/de/superannuation/page.tsx` — "Super-Rückerstattung (DASP)"
21. `src/app/ja/superannuation/page.tsx` — "スーパー返金（DASP）"

---

## Main keywords added

### English (~70 new keywords around refund)
- working holiday tax refund (Australia)
- WHV tax refund
- backpacker tax refund
- tax refund 417 visa / 462 visa
- claim tax back Australia
- how much tax refund will I get Australia working holiday
- tax refund estimate / calculator
- Australian tax refund working holiday
- tax back Australia backpacker

### Deutsch (~60 new keywords)
- Steuerrückerstattung Australien
- Steuerrückerstattung Working Holiday / Backpacker
- Steuer zurückholen Australien
- Steuerrückerstattung 417 / 462 Visum
- wie bekomme ich Steuern zurück Australien
- Steuerrückerstattung Rechner Australien
- Backpacker Steuer zurück
- WHV Steuerrückerstattung

### 日本語 (~70 new keywords)
- オーストラリア タックスリターン 還付金
- ワーキングホリデー 税金 還付
- ワーホリ 還付金 いくら
- 417ビザ / 462ビザ タックスリターン 還付
- オーストラリア 税金 戻ってくる / 取り戻す
- バックパッカー 税還付 オーストラリア
- タックスリターン 還付金 計算

---

## Principles I kept to

### 1. **No promised amounts**
No sentence like "average $2,600" was added in any meta tag I edited. Statements are phrased generically:
- "Get your Australian tax refund as a Working Holiday Maker" ✓
- "Hol dir deine Steuerrückerstattung in Australien" ✓
- "オーストラリアのタックスリターンで還付金を受け取り" ✓

These are correct, accurate phrasings, and **do not commit to a specific amount**.

### 2. **Didn't touch original content**
On `/tax-return` (English, German, Japanese) there's an original UI component of yours showing "Average refund $2,800" — **this was originally on your site and I did not touch it**. If you'd like this removed too (along with the German and Japanese versions), tell me explicitly in your next message.

### 3. **Language quality preserved**
All keywords added in German were written in natural German (Steuerrückerstattung, Steuer zurückholen). All keywords in Japanese were written in natural katakana/kanji (還付金, 取り戻す). No machine translations.

### 4. **Technical: hreflang and canonical**
Fixed: all `alternates.languages` now include `ja` too (some of the earlier files were missing Japanese).

### 5. **TypeScript syntax**
All 21 files passed a clean TypeScript syntax check.

---

## Why this will help Google and AI Search

1. **Search engines**: the new keywords directly match the search intent for "tax refund" — customized meta-title and description snippets will appear in the SERP.
2. **AI search (Perplexity, ChatGPT search, Gemini)**: these LLMs base answers on meta tags, JSON-LD, and page content. Now if a user asks "how do I get a tax refund on a working holiday visa in Australia" — the chance your site gets cited is significantly higher.
3. **All without spam**: I did not add keywords into the readable page text — only into meta tags (title, description, keywords, openGraph, twitter), exactly where that's legitimate.

---

## What I did not touch (per your previous instructions)

- **The blog content itself** — 143 posts × 3 languages, each already has quality Markdown body content. I didn't add words there, to avoid harming the natural quality of the writing.
- **The original "$2,800" content already on the site** — didn't touch it, per your instruction.
- **Form pages** (tfn-form, tax-form, etc.) — these are `noindex` by default (not tagged for Google), so SEO isn't relevant there.

---

**Status: ready to launch. Send the zip to deploy.**
