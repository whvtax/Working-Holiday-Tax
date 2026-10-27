# Student Visa Tax: pre-launch report (M9, 26 Oct 2026, branch svt-build, local production build)

## Tested successfully (evidence)
- Accessibility: axe-core 4.11.4, WCAG 2.0/2.1/2.2 A+AA and best practice, every page in the
  SVT sitemap plus the form (105 pages) at 390, 768 and 1440 px: 0 violations
  (`e2e/svt-a11y.spec.ts`, runs with the e2e suite). Fixed on the way: sticky WhatsApp bar
  is an aside landmark; source links 24px targets; scroll padding for the fixed bar.
- Lighthouse 13.5.0 mobile (simulated throttling), local `next start`:

  | Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
  |---|---|---|---|---|---|---|---|
  | / | 93 | 100 | 100 | 100 | 2.6 s | 0 | 210 ms |
  | /zh | 94 | 100 | 100 | 100 | 2.9 s | 0 | 100 ms |
  | /vi | 94 | 100 | 100 | 100 | 2.9 s | 0 | 80 ms |
  | /pricing | 94 | 100 | 100 | 100 | 2.6 s | 0 | 200 ms |
  | /tax-residency | 96 | 100 | 100 | 100 | 2.5 s | 0 | 90 ms |
  | /blog | 93 | 100 | 100 | 100 | 2.4 s | 0 | 260 ms |
  | /blog/tfn-declaration-two-jobs | 97 | 100 | 100 | 100 | 2.4 s | 0 | 130 ms |
  | /zh/blog/how-much-super-employer-pays | 97 | 100 | 100 | 100 | 2.3 s | 0 | 130 ms |
  | /vi/medicare | 90 | 100 | 100 | 100 | 2.3 s | 0 | 360 ms |
  | /tax-form | 95 | 100 | 100 | 58 (noindex on purpose; description added after) | 2.6 s | 0 | 140 ms |
- npm audit, production dependencies: 0 vulnerabilities. Dev tooling: 3 moderate (accepted in M0).
- Secrets: no keys or tokens in the branch diff or `.next/static` (env var NAMES appear in CRM
  help text only); no `.env` file tracked except `.env.example`.
- Headers on the SVT host: CSP, HSTS (preload), X-Frame-Options DENY, nosniff, referrer and
  permissions policies present. Every WHT API, the CRM and Will routes answer 404 on the SVT host;
  the form APIs stay 404 until `SVT_FORMS_ENABLED=true`.
- Static analysis: the Semgrep registry is blocked from this workspace, so a local ruleset ran on
  the 95 changed source files (dynamic code, child_process, innerHTML, open redirect, server env
  vars in client components). Findings: 3 x JSON-LD via dangerouslySetInnerHTML (static content,
  escaped by `jsonLd()`: safe), 6 x Math.random for retry jitter (not security). No real issue.
- Brand separation, rendered: 104 SVT and 506 WHT sitemap pages plus forms carry no em/en dash;
  e2e checks no WHT mention or asset on SVT pages.
- Full suites: tsc, eslint, Jest 3,370 tests, Playwright 147 tests (390/768/1440).

## Not tested
- Real devices (only Chromium emulation). Lighthouse on the Vercel preview (do at launch).
- The full Semgrep registry rules (p/typescript, p/react, p/nextjs, p/secrets): run them from a
  machine that can reach semgrep.dev before launch.
- Native-speaker review of zh and vi (agent-reviewed only).

## Known limitations / risks
- CSP allows inline scripts ('unsafe-inline'); nonces are not on (Next inline bootstrap).
- Minimum wage article waits for the 2026 figure (Fair Work blocks automated reading).
- Migration 047, the SVT WhatsApp number and Meta template twins are launch steps.
