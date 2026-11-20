# System inventory: WILL MIA ATLAS (17 Nov 2026)

Evidence: repository on disk only. Not a git repository, so no commit SHA was recorded (NOT VERIFIED).

## Components

| Component | Location | Evidence | Status |
|---|---|---|---|
| Next.js app (App Router), Next 16.4.6, React 19 | `src/app`, `next.config.js` | package.json, source | Available |
| Public websites (WHT, SVT, multilingual) | `src/app/(site)`, `(svt)`, `(ja)`, `(de)`, `(es)`, `(fr)` | 185 page files | Available |
| CRM (owner login, OTP, dashboard) | `src/app/(site)/crm`, `src/app/api/crm` | 25 API routes | Available |
| Will (WhatsApp assistant engine) | `src/lib/will`, `src/app/api/will`, `src/components/will` | 106 lib files in will/mia/atlas combined; 65 API routes total | Available |
| Mia (SVT pipeline screen) | `src/lib/mia`, `src/app/api/mia` (10 routes), `src/components/mia` | source | Available |
| Atlas (AI question and proposal screen) | `src/lib/atlas`, `src/app/api/atlas` (2 routes), `src/components/atlas` | source | Available |
| Tax forms (public) | `src/app/api/tax-form*`, `abn-form`, `tfn-form`, `super-form` | source | Available |
| Database | Supabase Postgres, 51 migrations | `supabase/migrations` | Live config NOT VERIFIED |
| File storage | Supabase Storage bucket `uploads` | `src/lib/upload.ts`, `supabase.ts` | Bucket visibility NOT VERIFIED (code checks at runtime) |
| WhatsApp Cloud API | `src/lib/will/channel.ts`, webhook route | source | Live config NOT VERIFIED |
| Email | Resend (`RESEND_API_KEY`) | source | Live config NOT VERIFIED |
| AI model calls | Anthropic (`src/lib/will/claude.ts`, `src/lib/atlas/ask.ts`) | source | Live config NOT VERIFIED |
| Rate limit and lockout store | Redis (`REDIS_URL`) | `src/lib/rate-limit.ts`, `crm-store.ts` | Live config NOT VERIFIED |
| Hosting | Vercel | `vercel.json`, `.vercelignore` | Dashboard NOT VERIFIED |
| Source control and CI | GitHub Actions `ci.yml` | `.github/workflows/ci.yml` | Repo settings NOT VERIFIED |
| Dependency updates | Dependabot | `.github/dependabot.yml` | Enabled state NOT VERIFIED |

## Scale (counted from the repository)
- Source files in `src` (non-test): about 214,000 lines of TypeScript and TSX. Three blog data files account for about 28,000 of them.
- Test files: 479 suites.
- Largest engine files: `src/lib/will/knowledge-seed.ts` (4,654 lines), `src/lib/will/service.ts` (3,207), `src/components/will/Dashboard.tsx` (2,834), `src/app/(site)/crm/dashboard/DashboardClient.tsx` (2,730).

## Authentication providers and privileged accounts
- Only one staff account, the owner, signs in to the CRM, via email OTP (`crm/login`, `crm/verify-otp`). The owner's email is set in configuration.
- Sessions are signed tokens (HMAC-SHA256, `JWT_SECRET`), 8-hour lifetime, with revocation through Redis.
- No other user roles exist in code. The Supabase service role is used by the server only.

## Not inventoried (no access)
- Supabase Auth settings (if any), storage policies, realtime, Edge Functions (none found in the repo).
- Vercel environment variable scopes and preview deployment settings.
- GitHub branch protection and secrets.
