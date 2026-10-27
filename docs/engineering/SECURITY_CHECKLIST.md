# Security checklist

Based on the OWASP Top 10 and ASVS level 2, applied to this system. Use it on every route,
server action and release. Tick with evidence (test, scan output or code reference).

## Input and output
- [ ] Every field from a request, webhook, form or upload is validated on the server
      (type, length, format, allowed values) before use.
- [ ] Output that includes customer-authored text (WhatsApp messages in the CRM) is escaped;
      no `dangerouslySetInnerHTML` except JSON-LD built from our own data with
      `JSON.stringify` and static CSS strings.
- [ ] SQL only through the Supabase client or parameterised queries; no string-built SQL.

## Authentication and authorisation
- [ ] Every `/api/crm/*` handler and CRM server action checks the session server-side.
- [ ] Session cookies: httpOnly, Secure, SameSite=Strict, short lifetime; OTP step enforced.
- [ ] Login and OTP endpoints are rate limited and lock out on repeated failure.
- [ ] Brand is derived on the server from the host, never trusted from the client.

## Customer data and documents
- [ ] Identity documents and uploads live in the PRIVATE bucket only; access only through
      the authenticated CRM file route (`/api/crm/file`), never by public URL.
- [ ] Upload checks: size limit, allowed types by content (not just extension), image
      re-encoding where applicable, randomised object names.
- [ ] TFNs, passport numbers and bank details never appear in logs, URLs, analytics or
      error messages.
- [ ] Production data is never copied to development, tests or fixtures.
- [ ] Retention and deletion follow the Privacy Policy.

## Secrets and configuration
- [ ] Secrets only in Vercel environment variables; nothing secret in `NEXT_PUBLIC_*`.
- [ ] Build output checked for leaked secrets before release (search `.next/static`).
- [ ] Least privilege: service-role key used only in server modules that need it.
- [ ] `.env*` files ignored by git; no secrets in commits or zips.

## Transport and headers
- [ ] HTTPS only, HSTS preload, `X-Frame-Options: DENY`, `frame-ancestors 'none'`.
- [ ] CSP: no new third-party origins without review; nonce CSP on `/crm`.
- [ ] Webhooks verify signatures (WhatsApp `X-Hub-Signature-256`); cron routes require
      `CRON_SECRET`.

## Abuse
- [ ] Public forms and webhooks rate limited per IP; bot protection that does not depend
      on Google services on `/zh`.
- [ ] Error responses never reveal stack traces or internal identifiers.

## Dependencies and code scanning
- [ ] `npm audit` shows no critical or high issues in production dependencies.
- [ ] Semgrep scan (security rulesets) with findings triaged.
- [ ] insecure-defaults audit (Trail of Bits) on new config and auth code.
- [ ] Supply-chain review before adding any dependency (tob-supply-chain-risk-auditor).

## Destructive operations
- [ ] Data deletion, migrations that drop or rewrite data, secret rotation and force
      pushes require Jo's explicit approval and a backup first.
