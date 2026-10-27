# Working Holiday Tax / Student Visa Tax: project rules for Claude

Two brands, one codebase: Working Holiday Tax (backpackers, live) and Student Visa Tax
(international students, being planned). Shared backend: CRM, tax form, uploads, Will
(the WhatsApp assistant), cron. Read `PROJECT_HANDOFF.md` for how the system works and
`docs/engineering/` before any significant change.

## Non-negotiables

- Security first. Follow `docs/engineering/SECURITY_CHECKLIST.md`. Customer data, TFNs,
  passports and uploaded documents are the most sensitive things in this system.
- Never expose secrets in client code, logs, URLs or commits. Only `NEXT_PUBLIC_*` vars may
  reach the browser, and none of them may be secret.
- Validate every untrusted input on the server. Enforce auth on every protected route and
  server action. Uploads stay in the PRIVATE bucket.
- No destructive operations (deleting data, dropping tables, force-pushing, rewriting
  history, rotating production secrets) without Jo's explicit approval.
- Production data never goes into development or tests. No mock data in production.
- Architecture before code: significant features need a short plan in
  `docs/engineering/decisions/` first.

## Brand and legal wording (both brands)

- The brands are fully separate to customers (Jo, 26 Oct): no page, link, email, WhatsApp
  message, invoice, form, meta tag, analytics property or social profile of one brand
  mentions or links to the other. Sharing happens only behind the scenes (code, CRM, Will).

- Never write "we are a registered tax agent" or similar. Use only:
  "operates under the supervision of a registered tax agent" and
  "Reviewed and signed off by a registered tax agent before it is lodged with the ATO".
- Never mention AI or bots to customers. Never promise a refund.
- No AI-style dashes, ever, in any language, in content or design (Jo, 26 Oct): no em dash (—),
  en dash (–), horizontal bar or Chinese double dash (——). If a dash is needed, use the plain
  hyphen (-). Tested for SVT text; Will's replies pass through `stripDashes`.
- Fees: $220 TFN, $385 with ABN (incl. GST). Guarantee: if the refund is less than the
  fee, we refund the difference after the Notice of Assessment; no refund or tax owed
  means the full fee applies.
- Client Agreement and Privacy Policy text lives once in `src/lib/legal/legal-text.ts`;
  only the brand name, domain and contacts change per brand.
- Chinese and Vietnamese copy is written natively, never machine-translated line by line.

## Engineering standards (details in docs/engineering/CODING_STANDARDS.md)

- TypeScript strict. No `any` to silence errors, no `@ts-ignore`, no disabled lint rules
  to pass a build.
- Keep UI, business logic (`src/lib`), server code (route handlers, server actions) and
  data access (`src/lib/will/store*`, `src/lib/db.ts`) separate. Server-only modules
  never import into client components.
- Small, focused, reusable components. No new dependency without a written reason.
- Before calling anything done: `npx tsc --noEmit`, `npx eslint src --quiet`,
  `npx jest`, plus a real-browser check (Playwright MCP) for UI changes.

## Design (details in docs/engineering/DESIGN_CHECKLIST.md)

- Premium, brand-specific, never a generic AI template: no stock card grids, gradient
  washes, oversized radii, scroll-reveal on everything, or emoji icons.
- Headings and buttons in sentence case (overrides the web-design-guidelines skill's
  Title Case rule).
- Mobile first. Verify desktop, tablet and phone screenshots before finishing.
- Student Visa Tax locked design: docket on white, ink #12161F, lime #D6FF3D as a
  highlighter only, pale lime #F5FAE3, Be Vietnam Pro + IBM Plex Mono, receipt-with-cap
  logo. Reference: the "Student Visa Tax: final design" canvas.

## Completion policy

Report work in four buckets: implemented, tested successfully, not tested, known
limitations/risks. Never invent test results. Never claim something is secure without
evidence (scan output, test, or review).

## Tools in this project

Vetted, pinned skills live in `.claude/skills` (see `.claude/VENDORED.md`). Playwright MCP
is configured in `.mcp.json`. Semgrep is used for static analysis. Do not install new
skills, plugins or packages without reviewing their code first.
