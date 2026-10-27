# Testing strategy

## Layers
| Layer | Tool | What | Where |
|---|---|---|---|
| Unit | Jest (existing) | Business logic: validation, pricing, guarantee maths, Will decisions, brand resolution, legal text | `src/**/__tests__` |
| Integration | Jest with route handlers and an in-memory store | Form submit, upload, CRM read/write, webhook signature, cron auth, brand tagging | `src/app/api/**/__tests__` |
| End to end | Playwright (`@playwright/test` 1.56.0, pinned to the installed browser) | Critical journeys in a real browser at 390, 768, 1440 px | `e2e/` |
| Accessibility | axe-core inside Playwright | WCAG 2.2 AA on every page template | `e2e/a11y.spec.ts` |
| Performance | Lighthouse CI on preview builds | LCP, CLS, INP, JS weight on mobile | CI |
| Security | npm audit, Semgrep, insecure-defaults, manual review | Dependencies, code patterns, configuration | CI + release checklist |
| Visual | Playwright screenshots + Playwright MCP review | Generic-looking sections, spacing, overflow, long Vietnamese strings | Per milestone |

## Critical journeys (Playwright)
1. SVT home: price visible, WhatsApp link correct for SVT, language switch to /zh and /vi.
2. Price check: each visa and work choice gives the right price and message text.
3. Tax form: complete submission with a test upload, confirmation shown, record tagged `svt`.
4. Host isolation: WHT URLs return 404 on the SVT host and the reverse.
5. CRM: login with OTP, see the SVT badge, open an upload through the CRM file route, logout.
6. Error and loading states: network failure on submit, oversized upload, invalid fields.

## Rules
- Tests never use production data or production secrets.
- A failing test is fixed before new features are added.
- Bugs get a regression test before the fix (systematic-debugging, test-driven-development
  skills).
- Results are reported as they are; nothing is called tested that was not run.

## Running the end-to-end tests
```
bash scripts/build-offline.sh   # production build; the routing lives in its manifest
npm run test:e2e                # starts `next start` on port 3100 (E2E_PORT to change)
```
WHT is `localhost`, SVT is `svt.localhost`. Stop any old `next start` on the port first:
Playwright reuses a running server, and a server started before the build serves the old
routes.
