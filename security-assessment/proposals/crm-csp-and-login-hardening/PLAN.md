# Proposal: tighter CRM CSP, global login throttle, Meta media host allow-list

Status: NOT applied. Each item changes behaviour that can only be fully proven in a browser or against production config.

## 1. CRM-only CSP (AUTH2-10, defence in depth)
The nonce CSP on /crm (src/proxy.ts buildCsp) still carries public-site allowances. If an XSS sink is ever introduced into the CRM, `connect-src https://*.supabase.co` and `img-src https://*.supabase.co` let script send customer data to ANY Supabase project (including an attacker's), and the GA, Resend and googletagmanager entries are never used by the CRM (Analytics.tsx skips /crm; the CRM browser code never calls Resend or Supabase directly).
Patch: patch.diff in this folder. Verify in a real browser before release (Playwright, staging): login, dashboard, client file preview (image and PDF via blob), Will chat with a photo, /crm/whatsapp/connect (Facebook popup). Roll out first with `Content-Security-Policy-Report-Only` using the existing csp-report-only mechanism.

## 2. Global login failure throttle (AUTH2-08)
Lockout is per IP (/64 for IPv6). A botnet gets 3 guesses per IP per 30 minutes against one shared password. Add a global counter `crm_fail_global` (INCR, 1 hour window); above 30 failures, do not lock the owner out (that is the DoS the per-IP design avoids) but (a) email Jo once per hour and (b) require the correct password AND add a 2 second delay. Needs product choice on the delay, so not applied.

## 3. fetchWaMedia host allow-list (AUTH2-12, defence in depth)
src/lib/will/channel.ts sends the WhatsApp bearer token to whatever `url` Meta's lookup returns. Require `https:` and a host ending in `.fbsbx.com`, `.facebook.com`, `.fbcdn.net` or `.whatsapp.net`; refuse otherwise. Not applied because an unexpected Meta CDN host would break attachment viewing; check the hosts seen in production logs first.

## 4. JWT_SECRET minimum length (AUTH2-09)
Code now logs an error when JWT_SECRET is under 32 characters. After Jo confirms the production value is long and random, change the log to a throw in `jwtSecret()` (crm-store.ts) so a weak secret cannot start.
