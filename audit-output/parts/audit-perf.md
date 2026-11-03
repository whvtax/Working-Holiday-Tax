# Gate 6: performance (audit-perf)

Basis: static analysis of source and public/. Production build could not run (Google Fonts unreachable), so no Lighthouse or field data. Lab numbers below come from Playwright against the DEV server (localhost:3200), unminified, no HTTP caching, GA blocked by the sandbox: they are indicative only and are NOT field data. The dev server went down during the audit (connection refused) so a second fold-position pass was not possible.

## Findings

| ID | Page/component | Lang | Sev | Conf | Evidence | Fix | Test | Residual risk | Status |
|---|---|---|---|---|---|---|---|---|---|
| P1 | PagePhoto on /calculator (all 6 locales) | all | Medium | Medium | Dev lab: LCP element was lazy IMG-W12 on mobile /calculator (5628 ms dev) and desktop /calculator. Component hard-coded loading="lazy" | APPLIED: optional `priority` prop (default off) on PagePhoto; calculator pages pass it (eager + fetchpriority high). No change to dimensions, so no CLS change | src/lib/__tests__/page-photo-priority.test.tsx (3 pass); tsc clean | Effect on real LCP not measured. Other inner pages (blog hub, tax-return) also showed the photo as LCP in dev but position varies by viewport, so left lazy | partially verified |
| P2 | next.config.js headers | all | Medium | Medium (Next default for public/ is max-age=0, from docs, not observed) | No Cache-Control rule for /wht-assets/img or /svt-assets/img; hero photos (230 KB mobile) revalidate each visit | APPLIED: public, max-age=86400, stale-while-revalidate=604800 for both img folders (not immutable because filenames are unversioned). Config loads (11 rules) | none (config only) | Replacing a photo in place can show the old one for up to a day | partially verified |
| P3 | IMG-W01-mobile.webp hero | all | Medium | High on size, Low on impact | 1448x891, 232 KB, shown at 350 CSS px wide (dev lab). LCP on home mobile. Larger than the desktop crop (199 KB) | PROPOSED: add a ~800w mobile variant and srcset/sizes on ImageSlot; re-encode W01 at lower quality. Needs new image files, so not done | - | Art-direction approval needed | not assessed (no before/after) |
| P4 | Inner photos IMG-W10..W22 | all | Low | High | 1536x1024, 27-95 KB (W19 95 KB, W16 61 KB), displayed ~350 px on phones; single size, no srcset | PROPOSED: 768w variants with srcset | - | - | verified (sizes), impact not measured |
| P5 | Fonts (RootDocument) | all | Low-Med | Low | 7 local woff2 files (4 Be Vietnam, 3 IBM Plex Mono), display swap, fallback stacks set. Dev lab font transfer 129 KB. next/font/local preloads declared files in production, which I could not observe | PROPOSED: check built HTML for preload links; consider preload:false for the 3 mono weights and dropping unused weights | - | Can't verify without build | not assessed |
| P6 | Noto Sans JP | ja | Low | Medium | next/font/google, weights 400/500/700, display swap, preload:false (late discovery, swap on first paint), unicode-range slices so Latin pages pay nothing. Dev lab CLS on /ja: 0 | none | - | JP text may reflow when the font arrives | verified (CLS 0 in dev only) |
| P7 | Blog hub client bundle | en | Medium | Low | BlogClient ('use client') imports `categories, categoryMeta` as values from blog/data.ts (753 KB, 9.4k lines, all guide bodies). Whether the bundler drops the unused `guides` export could not be verified without a build | PROPOSED: move Category types, categories, categoryMeta into a small module and re-export from data.ts; then check .next client chunks | - | A large risk if not tree-shaken; check with next build analyzer | not assessed |
| P8 | Third-party scripts | all | Info | High | Only GA4 (gtag via next/script afterInteractive, inline init afterInteractive). No Meta pixel, no other trackers in src. Analytics moved client-side so pages stay static | none | existing analytics tests | - | verified |
| P9 | Images and CLS | all | Info | High | All 4 public-page img tags (hero, band, PagePhoto, TPB seal, Nav) have width/height; hero is eager + fetchpriority high; others lazy. Dev lab CLS 0 to 0.0001 on 5 pages x 2 viewports | none | - | Dev lab only | verified (lab) |
| P10 | next/image not used | all | Info | High | Plain img + picture with desktop `source`; no AVIF/format negotiation, but files are already WebP | none proposed beyond P3/P4 | - | - | verified |
| P11 | Client JS | all | Info | Medium | 68 'use client' files in src overall; on public pages the client set is nav, footer, analytics, reveal observer, language banner, calculator and blog clients. No large client-only libraries (deps: supabase-js, libphonenumber-js, heic-convert, redis only; none on marketing pages by import). Dev lab shows 18 script requests (unminified) | none | - | Production bundle sizes unknown | partially verified |
| P12 | MobileLanguageBanner | de/ja/fr/it/es visitors | Low | Medium | position: fixed overlay injected after load by localStorage/navigator check, so it does not push content (CLS risk low). Not rendered in lab | none | - | - | partially verified |
| P13 | /assets/:path* immutable 1-year cache | all | Low | High | Applies to unversioned names (tpb-registered.png, about/team-office.jpg). A changed file would be stale for a year | PROPOSED: version the file names or use a shorter max-age | - | - | verified (config read) |
| P14 | Static files | all | Info | High | public/ is 4.7 MB; largest are llms-full.txt (311 KB, text) and sitemap-llms.xml; og-image.png 68 KB | none | - | - | verified |

## Dev lab figures (not field)
Mobile 390x844 DPR2, desktop 1366x800, cold dev server, warm-up not controlled. LCP (ms): / 2496 mobile, 4328 desktop; /ja 1708 mobile, 4864 desktop; /blog 2780 (H1) mobile, 7024 desktop; /tax-return 3440 mobile, 3420 desktop (H1); /calculator 5628 mobile, 5884 desktop. CLS 0 to 0.0001 everywhere. These are dominated by on-demand dev compilation and say nothing about production.

## Changes made
- src/components/wht/PagePhoto.tsx (priority prop)
- src/app/(site)/calculator/page.tsx, (de)/de, (ja)/ja, (fr)/fr, (it)/it, (es)/es calculator pages (pass priority)
- next.config.js (cache headers for img folders)
- src/lib/__tests__/page-photo-priority.test.tsx (new)
- tsc --noEmit clean; new jest test passes. Full jest, eslint and a browser re-check of the calculator not run.

## Not assessed
Production build output (chunk sizes, font preload tags, actual response headers), Lighthouse/field CWV, svt pages in depth, the second fold-position pass for the other inner pages (dev server stopped), GA behaviour (blocked in sandbox).
