# Infrastructure report: WILL MIA ATLAS

Evidence: `vercel.json`, `.vercelignore`, `.github/workflows/ci.yml`, `.github/dependabot.yml`, `scripts/package-release.cjs`. Dashboard settings were not available, so every dashboard item is NOT VERIFIED.

## Verified in repository
- **Release packaging is an allowlist.** `scripts/package-release.cjs` builds a zip from named folders only, and refuses to ship if it finds `.env` files, `node_modules`, `.next`, `.git`, `.data`, keys, certificates, database dumps, symlinks, credential-shaped strings, or TFNs next to a TFN word. Last check: 1,398 files, clean.
- **CI is read-only.** `permissions: contents: read`. Triggers are `pull_request` and `push` on `main`. `pull_request_target` is not used. The workflow sends no code outside GitHub.
- **CI installs without lifecycle scripts.** `npm ci --ignore-scripts`.
- **CI runs the checks.** TypeScript, lint, Jest, `npm audit --omit=dev --audit-level=high`, and the release check in source profile.
- **Vercel ignore file exists** (`.vercelignore`), keeping local state out of deployments.
- **Security headers** are set in `next.config.js` for CRM paths and the public site.

## Findings
- **INFRA-1 (Low, verified): third-party actions pinned by tag, not commit.** `actions/checkout@v4` and `actions/setup-node@v4`. The workflow's own comment says to pin to a full commit SHA. Not changed in this pass: the SHA lookup needs GitHub access, and this session had none. Guessing a SHA would be wrong. Recorded as WMA-11.
- **INFRA-2 (NOT VERIFIED): Vercel environment scope.** Whether production secrets are limited to Production, and whether Preview deployments get the production database key. This is the most important dashboard check in this area.
- **INFRA-3 (NOT VERIFIED): deployment protection** on preview URLs and branch protection on `main`.
- **INFRA-4 (NOT VERIFIED): backups.** Supabase backup schedule and restore test. The incident runbook asks for this and it is not evidenced.

## Checklist (owner, dashboards only, read-only)
1. Vercel → Settings → Environment Variables: confirm secrets are not exposed to Preview.
2. Vercel → Deployment Protection: enable for previews.
3. GitHub → Settings → Branches: protect `main`, require review and CI.
4. GitHub → Settings → Actions: restrict to GitHub-owned actions plus the pinned ones.
5. Supabase → Database → Backups: confirm the schedule and run one restore test on a separate project.
