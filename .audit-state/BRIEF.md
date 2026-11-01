# Production readiness audit: shared brief for every agent

Repo: /home/claude/work/whvtax (branch svt-build). Baseline commit: d9dbac0. READ ONLY: no agent edits
any file under the repo except its own findings file in `.audit-state/findings/`. Do not run
`git commit`, `git checkout`, builds, or anything that writes outside `.audit-state/` and the
scratchpad. Do not print secret values. Do not query live production systems. Do not use real
customer data.

## What is being audited

Two brands in one Next.js 16 codebase:
- Working Holiday Tax (WHT, live, audience visa 417/462, en/de/ja): host default, routes under
  `src/app/(site)`, `(de)`, `(ja)`.
- Student Visa Tax (SVT, NEW, audience visa 500/485, en/zh/vi): routes under
  `src/app/(svt)/svt-site`, `(svt-zh)/svt-site/zh`, `(svt-vi)/svt-site/vi`. Served only on the SVT
  hosts via `config/brand-routing.js` rewrites. Content in `src/lib/svt/content/**` (long articles in
  `content/long/{en,zh,vi}`), components in `src/components/svt/**`, i18n in `src/lib/svt/i18n.ts`.
- Shared: tax form (`src/app/(site)/tax-form/FormClient.tsx` + `src/components/ui/Residency*.tsx`,
  branded through `src/components/ui/form-brand*.tsx` and `src/components/svt/form-brand-svt.tsx`),
  API routes under `src/app/api/**`, the WhatsApp assistant Will/Mia in `src/lib/will/**`
  (SVT specifics: `svt-fixed-texts.ts`, `brand-voice.ts`, SVT blocks in `engine.ts`), CRM, DB
  (`src/lib/db.ts`, `src/lib/will/store*`, migrations), uploads (`src/lib/upload.ts`).
- Security headers/CSP in `next.config.js` (svtCsp) and `src/proxy.ts`.
- Legal text once in `src/lib/legal/legal-text.ts`, per-brand details in `src/lib/legal/brands.ts`.
- Rules the project lives by: `CLAUDE.md`, `docs/engineering/SECURITY_CHECKLIST.md`,
  `docs/engineering/DEPLOYMENT_CHECKLIST.md`, `docs/engineering/decisions/*`.

Primary focus: SVT and everything it touches. WHT-only code that SVT never touches is out of scope
except to confirm it is unchanged/unbroken by the shared changes.

## Local test server

A production build of the baseline is running: WHT at http://localhost:3100, SVT at
http://svt.localhost:3100 (zh at /zh/..., vi at /vi/...). The machine has NO internet: stub
googletagmanager/google-analytics requests in Playwright (route them to an empty 200). The SVT
tax form is CLOSED in this build (SVT_FORMS_ENABLED unset): /tax-form shows a "closed" notice; that
is expected. Playwright: `require('/home/claude/work/whvtax/node_modules/playwright')`, launch
chromium with `--host-resolver-rules=MAP svt.localhost 127.0.0.1`.

Existing tooling you may run (read-only): `npx tsc --noEmit`, `npx eslint src --quiet`,
`npx jest <path>`, `npx playwright test e2e/<spec>` (uses the running server on 3100), `npm audit`,
`npx semgrep` if installed (check first). Do not install anything.

## Hard rules of the business (a breach is a CRITICAL finding)

- Never "we are a registered tax agent" in any language. Only: "operates under the supervision of a
  registered tax agent" and "Reviewed and signed off by a registered tax agent before it is lodged
  with the ATO" (and the fixed DE/JA/ZH/VI renderings already in the code).
- Never promise a refund or an amount. SVT residency is always "may be"/"usually".
- Never mention AI or bots to customers.
- No em dash, en dash, horizontal bar or Chinese double dash anywhere customer-facing.
- Fees: $220 TFN, $385 with ABN (incl. GST). Guarantee wording fixed.
- Brands fully separate to customers: no SVT page/script/email/message names or links WHT and vice versa.
- Only NEXT_PUBLIC_* reaches the browser; no secrets in client bundles, logs, URLs.
- Uploads in the PRIVATE bucket; auth on every protected route and server action.

## The most important rule

This is an audit, not a redesign. Report only what you can evidence (file:line, screenshot path,
command output). For each finding give: id (AGENTPREFIX-n), severity (CRITICAL/HIGH/MEDIUM/LOW/INFO),
file(s)+lines, evidence, impact, the smallest fix, how to verify, and your own honest "is leaving
it unchanged acceptable?" answer. If a page/file is fine, list it as reviewed with no finding.
Zero findings is a valid result. Never pad. Never invent. Mark anything you could not check as
NOT VERIFIED with the reason.

## Output

Write your report as Markdown to `.audit-state/findings/<agent-id>.md` (create it; overwrite if it
exists) AND return the same content as your final message. Include a "Coverage" section listing
exactly which files/pages you reviewed in full, which partially, and which not at all.
