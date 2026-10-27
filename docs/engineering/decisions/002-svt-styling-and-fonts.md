# 002: SVT styling with CSS Modules and self-hosted font files

Date: 26 Oct 2026. Status: accepted (milestone 2).

## Context
WHT styles with Tailwind 3, whose config scans all of `src/`. SVT must look and ship
separately (brand separation), and the locked design is a small, exact token set.
WHT gets its fonts from `next/font/google`, which needs the network at build time (hence
`scripts/build-offline.sh`, which stubs them, so local builds cannot show the real
typography).

## Decision
- SVT components use CSS Modules plus CSS custom properties defined once in
  `src/app/(svt)/tokens.css`. No Tailwind classes in SVT code. Nothing of SVT ends up in
  WHT's CSS bundle, and the reverse.
- Fonts: the woff2 files for Be Vietnam Pro (400-700) and IBM Plex Mono (400-600), latin
  and vietnamese subsets, are committed under `public/svt-assets/fonts/5.3.0/`. They were
  copied from `@fontsource/be-vietnam-pro@5.3.0` and `@fontsource/ibm-plex-mono@5.3.0`
  (SIL OFL 1.1, no install scripts, no dependencies), with their licences and a
  `SHA256SUMS` file. `@font-face` rules with `unicode-range` are in
  `src/app/(svt)/fonts.css`. No new npm dependency.
- Chinese uses the system CJK fonts (PingFang SC, Noto Sans CJK SC, Microsoft YaHei). A
  CJK webfont would be several MB.
- Interactivity uses native elements first: `<details name>` for the FAQ (one open at a
  time, no JavaScript) and the menu; radio inputs for the price check. Client components
  only where state is shown (price check, payslip).

## Consequences
- The build is reproducible offline, and screenshots show the real fonts.
- Updating a font means replacing the folder (new version path) and the checksums.
- The path is versioned, so the files are cached as immutable.
