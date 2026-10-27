# 001: Host routing with next.config rewrites, not proxy.ts

Date: 26 Oct 2026. Status: accepted (milestone 1).

## Context
One app serves Working Holiday Tax and Student Visa Tax on two domains (ARCHITECTURE.md,
option A). Something has to send studentvisatax.com.au requests to the SVT pages and keep
each brand's pages off the other's domain.

ARCHITECTURE.md first proposed doing it in `proxy.ts`. But `proxy.ts` was narrowed to
`/crm` on purpose (29 Aug): running it on every path put an edge invocation in front of
~540 static pages for no benefit.

## Decision
Host-conditioned `beforeFiles` rewrites in `next.config.js`, built by
`config/brand-routing.js`:
- SVT host: `/x` → `/svt-site/x` (the SVT route group). `/_next`, `/svt-assets` and
  allow-listed API routes are left alone. Direct requests for `/svt-site` are a 404, so no
  page has two URLs.
- SVT host: every `/api` route is a 404 unless it is on `SVT_API_ALLOWLIST` (empty until
  milestone 4 adds server-side brand tagging).
- Other hosts: `/svt-site` and `/svt-assets` are a 404.
- All WHT redirects carry `missing: SVT host`.
- SVT responses get their own CSP (least privilege, no WHT domain).

`src/lib/brand.ts` (`brandFromHost`) reads the same host list for server code.

## Facts verified against Next 16.4.3 (and covered by tests)
- `has.value` is matched as `^value$`, so the host alternation is wrapped in `(?:...)`.
  Without the group, a host that only contains an SVT name would match.
- The host is matched lowercased and without the port.
- beforeFiles rewrites chain: each rule sees the path as rewritten by earlier rules. The
  catch-all therefore excludes its own output, and the "no direct /svt-site" rule comes
  first.
- Node's resolver does not resolve `*.localhost`; Chromium does. HTTP checks in e2e send a
  Host header instead.

## Alternatives
- `proxy.ts` on all paths: works, but brings back an invocation per page view.
- Two Vercel projects: rejected by Jo (one codebase, one Git, one Vercel).

## Consequences
- Pages stay static and CDN-served on both domains.
- Each new SVT API route must be added to the allowlist deliberately.
- Tests: `src/lib/__tests__/brand-routing-26oct.test.ts` (rules, using Next's own
  matchers) and `e2e/brand-isolation.spec.ts` (real build).
