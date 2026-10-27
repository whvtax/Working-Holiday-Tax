# Coding standards

## TypeScript
- `strict: true` stays on. No `any`, `@ts-ignore`, `@ts-expect-error` or non-null `!` to
  silence the compiler; fix the type.
- Types at boundaries: parse untrusted input into typed objects in one place
  (`src/lib/validate.ts`, `intake-validate.ts`) and pass typed values inward.

## Structure
- UI in `src/components`, pages in `src/app`, business logic in `src/lib`, data access in
  the store modules. A component never talks to Supabase directly.
- Server-only modules (anything reading secrets or using the service role) are never
  imported by a client component.
- Server components by default. `'use client'` only for real interactivity, kept small.
- One component, one job. Extract when a piece is reused or a file passes about 300 lines,
  not before.

## Dependencies
- No new dependency without a written reason (problem, alternatives, size, maintenance,
  licence) in the PR or commit message. Prefer the platform and existing code.
- Pin versions in `package-lock.json`; run `npm audit` after every change.

## Style
- ESLint (`eslint-config-next`) with zero warnings in `src`. Formatting follows the
  existing code; no mass reformatting commits mixed with logic changes.
- Descriptive names. Comments explain why, not what.
- User-facing copy follows the brand rules in CLAUDE.md.

## Errors
- Never swallow errors. Log server-side without personal data or secrets, return a safe
  message to the user, and fail closed on anything security-related.

## Git
- Small, meaningful commits on a feature branch; message says what and why.
- Never force-push, rewrite published history or discard uncommitted work without approval.
- Secrets and `.env*` files are never committed (see `.gitignore`).

## Quality gate (a change is done only when)
1. It does what the requirement says, verified in a real browser where it has UI.
2. `npx tsc --noEmit`, `npx eslint src --quiet` and `npx jest` pass.
3. Relevant Playwright journeys pass at 390, 768 and 1440 px.
4. Security implications reviewed (SECURITY_CHECKLIST.md); no known critical issue left.
5. The report states what was implemented, what was tested, what was not, and known
   limitations.
