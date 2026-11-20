# Supply chain report: WILL MIA ATLAS

## Dependencies (production, `npm audit --omit=dev`, run 17 Nov 2026)
- Before this pass: 1 moderate (`next` 16.3.0 to 16.4.4).
- After the fix (`next` ^16.4.6): 0 vulnerabilities at every level.
- Direct production dependencies: `@supabase/supabase-js`, `heic-convert`, `libphonenumber-js`, `next`, `pdf-lib` (pinned 1.17.1), `react`, `react-dom`, `redis`.
- Lockfile: `package-lock.json` present and updated by the upgrade.

## Findings
- **SC-1 (Fixed): Next.js advisory.** See WMA-04.
- **SC-2 (Low, verified): `npm ls` reports two extraneous packages** (`@emnapi/runtime`, `@img/sharp-wasm32`) present in `node_modules` but not in the lockfile. They are not in the release zip (node_modules is excluded). No action for the release. A clean `npm ci` clears them.
- **SC-3 (Low, verified): `pdf-lib` is pinned exactly** (1.17.1) while others use ranges. This is a deliberate choice that is not recorded in a comment. Keep, or record the reason.
- **SC-4 (Low, verified): CI actions pinned by tag, not SHA.** See INFRA-1 and WMA-11.
- **SC-5 (Info): Dependabot is configured** (`.github/dependabot.yml`). Whether alerts are enabled in GitHub is NOT VERIFIED.
- **SC-6 (Info): install scripts are disabled in CI** (`npm ci --ignore-scripts`). Two dev-only packages (`fsevents`, `unrs-resolver`) need native binaries. If lint fails on a missing binary, the CI comment says to drop the flag on that step.

## Secrets in source history
- The folder is not a git repository, so history cannot be checked here. NOT VERIFIED. The scripted pass found no secret-shaped values in the current files, and the release packaging check refuses secret-shaped strings.

## SBOM
- No SBOM is generated. This is a gap for later. `npm sbom` can produce one from the lockfile without network access.
