# 12. Cloud infrastructure

Sources: INFRA-01, INFRA-02, LIB-01, LIB-02, REST-01, DEBATE-1. Rows (Rnnn) refer to file 19.

## VERIFIED FACTS

- Only files in the repository were read: `next.config.js`, `vercel.json`, `config/*`, `.github/*`, `.vercelignore`, `.gitignore`, `src/proxy.ts`, migrations and scripts.
- NOT inspected: Vercel project settings and environment variables, Supabase project settings, Meta app and WhatsApp Business settings, Redis, the email provider, DNS, Google Analytics.
- The production build was not verified in this environment (Google Fonts unreachable).

## STATIC ANALYSIS CONCLUSIONS

### Hosting configuration (as written in the repository)

| control | setting read | location |
|---|---|---|
| Security headers on non-CRM paths | `X-Frame-Options: DENY`, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `nosniff`, strict referrer policy, restrictive permissions policy, same-origin resource policy | `next.config.js:40-61` |
| CRM and Atlas | per-request nonce CSP with `strict-dynamic` from the proxy; `noindex`; `private, no-store` | `src/proxy.ts:27-52`; `next.config.js:119-122, 150-154` |
| API responses | `noindex`, `no-store` | `vercel.json:19-32` |
| `unsafe-eval` | development only | `next.config.js:26, 92` |
| Source maps | browser source maps not enabled (Next default) | `next.config.js` |
| Powered-by header | off; type errors fail the build | `next.config.js:128, 133` |
| Redirects and rewrites | fixed same-site destinations; none to an external origin | `next.config.js:231-331` |
| Brand host routing | grouped, anchored host pattern incl. subdomains and trailing dot; default-deny on Student Visa Tax hosts; image optimizer closed there | `config/brand-routing.js:46-104` |
| Cron | two jobs, both check the cron secret first, 60 s limit | `vercel.json:9-18` |
| CI | read-only token, pinned actions, no secrets | `.github/workflows/ci.yml` |
| Deploy upload | `.vercelignore` excludes env files, local data, tooling and audit folders; `docs`, `scripts`, `supabase`, `marketing`, `e2e` are uploaded to the build by design (not served) | `.vercelignore` |

### Findings

| topic | status | rows |
|---|---|---|
| `/atlas` may receive the static public CSP as well as the nonce CSP | OPEN: check the response headers on production | R051 |
| Enforced public CSP wider than needed; tighter policy exists as report-only, off by default | OPEN: run report-only on a preview, then promote | R046 |
| Image optimizer remote hosts | FIXED | INFRA-01-F07 row |
| HSTS without `includeSubDomains` | OPEN: confirm all subdomains are HTTPS first | R058 |
| RLS, grants and private-bucket lockdown only in migration 049 | OPEN | R048 |
| Field encryption keys, form-token enforcement, alert switches are environment settings | OPEN | R029, R008, R130 |
| Rate limiter needs Redis 7 (`EXPIRE NX`); older versions make limits per instance | OPEN: confirm the version | R038 |
| WhatsApp credentials may live only in the settings table; without them sends are skipped silently | OPEN: confirm environment variables | R067 |
| Client IP from edge headers | ACCEPTED (platform guarantee) | R032 |
| Audit folders in deploy upload and git | FIXED in the ignore files | R052, REST-01-F01 row |
| Student Visa Tax shares the Working Holiday Tax WhatsApp number | OPEN: Meta action before launch | R201 |
| Google Analytics history-change page views could carry the form token | OPEN: GA4 setting | R157 |

### Owner checklist for settings this audit could not see

1. Vercel production variables present (names only): the secrets listed in file 10, `FIELD_ENC_KEYS`, `FIELD_ENC_ACTIVE`, `FORM_TOKEN_ENFORCE`, the four `SECURITY_ALERT_*` switches, admin email. Absent: `WILL_ALLOW_MOCK_BRAIN`, `SEED_ENABLED`.
2. Preview deployments do not share production secrets or the production database.
3. Supabase: RLS on every table, `uploads` bucket private, no anonymous key in any client bundle, check queries of 049 kept.
4. Meta: webhook subscribed only to this app, app secret rotated if ever exposed, separate number for Student Visa Tax.
5. Redis version and persistence; email provider domain authentication.
6. Access to Vercel, Supabase, Meta and the admin mailbox protected by a second factor, with the smallest number of people.

## HYPOTHESES

- If both CSP headers reach the browser on `/atlas`, the stricter one still applies (browsers enforce all policies), so the effect would be none. Unconfirmed.

## UNVERIFIED ASSUMPTIONS

- That Vercel deploys from the source this audit read, with the Node version the CI uses.
- That logs on the hosting platform are retained and access-controlled appropriately.

## NOT TESTED

- No header was fetched from a deployment. No cron run was observed. No infrastructure setting was read.
