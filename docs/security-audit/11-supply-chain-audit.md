# 11. Supply chain audit

Sources: `units/INFRA-02-report.md` (dependency backlog, F08), INFRA-01, REST-01, DEBATE-1 and DEBATE-4.

## VERIFIED FACTS

- `npm audit --omit=dev` was run once earlier in the session and reported 0 known vulnerabilities at that time. Treat this as a point-in-time note, not a guarantee. It was not used as evidence for any finding, and it does not cover development dependencies.
- No advisory source (OSV, GitHub advisories) was consulted by the reviewers. No network was used for findings.
- `package.json` was read in full. `package-lock.json` (11,339 lines) was searched, not read: lockfileVersion 3; 778 packages, all resolved from registry.npmjs.org over https; 778 integrity values, none sha1; no git, http, file or link source; no `.npmrc` at the root.
- Install scripts: three packages carry one, all development only (`fsevents` twice, `unrs-resolver`). `package.json` defines no install lifecycle script.
- `node_modules/` was not inventoried or reviewed. About 750 transitive packages were not listed or reviewed.

## Direct dependencies (from INFRA-02; versions as resolved in the lockfile)

Runtime:

| package | range | resolved | note |
|---|---|---|---|
| @supabase/supabase-js | ^2.45.4 | 2.106.0 | |
| heic-convert | ^2.1.0 | 2.1.0 | parses customer-supplied files |
| libphonenumber-js | ^1.13.11 | 1.13.11 | |
| next | ^16.4.6 | 16.4.6 | |
| pdf-lib | 1.17.1 (exact) | 1.17.1 | parses customer-supplied files; exact pin |
| react, react-dom | ^19.2.8 | 19.2.8 | |
| redis | ^4.7.0 | 4.7.1 | |

Development: @playwright/test 1.56.0, @testing-library/jest-dom 6.9.1, @testing-library/react 16.3.3, @types/heic-convert 2.1.1, @types/jest 30.0.0, @types/node 20.19.41, @types/react 19.2.18, @types/react-dom 19.2.5, autoprefixer 10.5.0, axe-core 4.11.4, eslint 9.39.5, eslint-config-next 16.4.3, jest 30.4.2, jest-environment-jsdom 30.4.1, postcss 8.5.26, tailwindcss 3.4.19, ts-jest 29.4.9, typescript 5.9.3.

## STATIC ANALYSIS CONCLUSIONS

- Build pipeline: CI workflow has read-only permissions, uses `pull_request` (not `pull_request_target`), pins actions by commit hash, does not persist credentials, references no secret and installs with `--ignore-scripts`. Dependabot covers npm and GitHub Actions weekly, nothing auto-merged.
- Production install on Vercel is `npm ci`, which runs lifecycle scripts; CI uses `--ignore-scripts` (INFRA-02-F08, accepted as hygiene).
- No `engines` field; CI pins Node 22 while `@types/node` is 20. The Node version on Vercel is a project setting that was not inspected.
- Release packager: allowlist, refuses symlinks, verifies the archive listing; neither profile includes tooling or audit folders. The "source" profile ships `docs/` whole (owner's choice, REST-01-F01 row).
- Third-party scripts in the browser: Google Analytics (consent-gated) and the Facebook SDK on the WhatsApp connect screen only (required by Meta's embedded signup). Fonts are self-hosted for Student Visa Tax.
- Developer tooling: `.mcp.json` fetches a pinned package at run time with the prompt suppressed (accepted, REST-01-F05). `.claude/` holds 348 vendored files; nothing runs by itself. Three compiled `.pyc` files there were not opened and are still present (R213, open).
- Vendored code under `.claude/` was scan-reviewed only.

## Findings

| topic | status | row |
|---|---|---|
| Image optimizer allowed every Supabase project host | FIXED (remote patterns emptied) | INFRA-01-F07 / INFRA-02-F04 row |
| Secret scanner name list | OPEN | R053 |
| Audit folders missing from ignore files | FIXED | R052, REST-01-F01 row |
| Three `.pyc` files | OPEN (skipped) | R213 |
| MCP package fetched at run time | ACCEPTED | REST-01-F05 row |
| Build and dependency hygiene (grouped) | ACCEPTED | INFRA-02-F08 row |

## Backlog for external advisory checks (needs network; NOT done in this audit)

1. Run `npm audit` including development dependencies, and an OSV or GitHub advisory query over the full lockfile. Record the date and the result.
2. Check `heic-convert` 2.1.0 and its decoder dependencies, and `pdf-lib` 1.17.1, first. They parse files supplied by customers. `pdf-lib` is an exact pin, so an update will not arrive on its own.
3. Check `next` 16.4.6, `react` 19.2.8, `@supabase/supabase-js` 2.106.0 and `redis` 4.7.1 against current advisories.
4. Verify that the two GitHub Action commit hashes in `.github/workflows/ci.yml` match the upstream tags named in the comments.
5. Check the pinned MCP package version and its dependency tree, or install it as a development dependency so the lockfile pins it.
6. Confirm the Node version configured on Vercel and add an `engines` field to match.
7. Consider `npm ci --ignore-scripts` on Vercel after a preview build proves it works.
8. Repeat items 1 to 3 on a schedule; a clean result on one day says nothing about the next.

## UNVERIFIED ASSUMPTIONS

- That the installed `node_modules` matches the lockfile.
- That the registry packages are what their integrity values say (not re-computed).

## NOT TESTED

- No dependency was scanned as part of the findings. No build was produced: the production build could not be verified in this environment because Google Fonts was unreachable.
