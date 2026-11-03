# Round 2: sec2-api-svt (route handlers, brand isolation, SSRF, CORS, methods, leaks)

Reviewer: sec2-api-svt. 2 Nov 2026. Tree: /home/claude/work/whvtax-redesign (FINAL7, with round 1 fixes and other round 2 agents editing in parallel).
Method: static trace, jest (local only), and live probes with curl against a local `next dev` on 127.0.0.1 with forged Host headers and `--path-as-is`. No production system, no real data, no secrets read, no external network request made (the one probe that would have called Featurable, /api/google-reviews, was skipped).

Builds on `parts/sec-api-logic.md` (F-1 to F-16) and `12-final-devils-advocate-review.md`; those are not repeated.

## 1. Re-inventory

51 route handlers under `src/app/api` (grep of `route.ts`), 3 under `src/app/(svt)/svt-site` (`robots.txt`, `sitemap.xml`, `llms.txt`, static metadata), `src/app/robots.ts`, `src/app/sitemap.ts`. Server actions: none (`grep "use server"` finds nothing; a forged `Next-Action` POST returned 409, no action exists). `experimental.serverActions.bodySizeLimit: 15mb` in next.config.js is therefore dead config (Info).

Classification (pinned by test `api-handler-inventory-round2.test.ts`, which compares exported methods per route):

| Class | Routes (methods) |
|---|---|
| Public by design (10) | abn-form POST, tfn-form POST, super-form POST, tax-form POST, tax-form/upload POST, analytics/funnel POST, google-reviews GET, crm/login POST, crm/verify-otp POST, crm/logout POST (revokes only with a valid session) |
| Webhook (1) | will/webhook GET (verify token, constant time), POST (HMAC before JSON.parse) |
| Cron or session (1) | will/tick GET |
| CRM session (22 route files) | crm/clients, clients/[id] (GET PATCH DELETE), clients/[id]/notes, referral, referral-payment, tax-returns (POST DELETE), clients/search, file, leads (GET POST), partners and partners/[id], seed (dev switch first, then session), stats, tasks and tasks/[id], version |
| Will, session (21 route files) | actions, audit, chats, export, followups, health, insights/monthly, knowledge (GET POST), link, media/[id], messages, mine, morning, report, search, seed, state, system, version, whatsapp/connect, whatsapp/inbound-check |

Result: every non-public handler checks the session (or cron secret) before it reads the body, the params, the store or the database, and answers 401. No handler exports OPTIONS or HEAD. No mass assignment found in CRM bodies (`clients/[id]` PATCH builds its own allow-listed fields; `updateClient` coerces and length-caps each field).

Weakness in the round 1 control, closed: `api-route-auth-inventory.test.ts` passes a route if an auth marker appears anywhere in the file, so a gated GET hid an ungated newly added DELETE. Proved by mutation: removing the auth line from `crm/partners/[id]` DELETE passes the old test and fails the new one (restored afterwards).

## 2. Findings

| ID | Sev | Status | Title |
|---|---|---|---|
| API2-01 | Medium (conditional on ingress) | Confirmed live, FIXED | Trailing-dot Host (`studentvisatax.com.au.`) was routed as WHT |
| API2-02 | Low to Medium (conditional) | Confirmed live, FIXED | Any host not literally listed (subdomain, wildcard DNS, future domain) was WHT with /crm, Will and cron |
| API2-03 | Low | Confirmed live, FIXED (SVT side); WHT side proposed | `/_next/image` on the SVT host served WHT photographs; optimizer accepts any `*.supabase.co` |
| API2-04 | Low | Suspected, FIXED | WhatsApp bearer token sent to whatever URL Meta's JSON names (media download, template paging) |
| API2-05 | Info | Confirmed, FIXED | Round 1 auth inventory test too weak (file level) |
| API2-06 | Low | Confirmed, not fixed | Malformed body to the public form routes returns 500, not 400 |
| API2-07 | Info | Confirmed, not fixed | Staff and cron routes return raw error text |
| API2-08 | Info | Confirmed OK | No open redirect, no header-driven brand, no CORS, no SSRF from user input |
| API2-09 | Info | Informational | `svt.localhost` is an SVT host in production builds |

### API2-01 Trailing-dot Host (Medium if the ingress forwards it, otherwise Low)
Evidence: `config/brand-routing.js` `svtHostPattern` (before the fix: exact host list, no optional dot). Live, against the config as it stood before the fix:
`Host: studentvisatax.com.au.` GET /crm 200 (WHT CRM login page), /api/will/tick 401 JSON from the Will handler, /api/will/webhook 403 from the webhook handler, /api/crm/login 405, /api/tax-form 405, /de 200 (German WHT page), /llms-full.txt 200 ("Working Holiday Tax - expanded content index"), /manifest.json 200 (WHT manifest). The same paths on `Host: studentvisatax.com.au` were all 404.
Attack path: a visitor (or a crawler, or a link with a trailing dot, which browsers send verbatim) requests the SVT domain in absolute form. The router sees a non-SVT host, so the whole WHT site, /crm, Will and the cron endpoint are served under the student brand's domain, which breaks the "SVT never reaches WHT or /crm" rule and shows WHT branding on the SVT domain.
Impact: brand leak and extra attack surface on the SVT domain; data stays behind the same auth, so no data disclosure. Whether Vercel normalises the trailing dot before it reaches the app could not be tested here (see section 5), hence "conditional".
Fix: the pattern now ends `\.?` (applied concurrently by sec2-forms-uploads, who found it independently; I reproduced it live before and verified it after) and `brandFromHost` strips one trailing dot. Re-probe after the fix: /crm, /api/will/tick, /de, /llms-full.txt all 404 on `studentvisatax.com.au.`.
Test: `brand-isolation-round2.test.ts` (host spellings with trailing dot, with and without port, upper case). Mutation run: with the dot removed the file reports failures.
Residual: none in code.

### API2-02 Unlisted hosts fall through to WHT (Low to Medium, conditional)
Evidence: live, `Host: sub.studentvisatax.com.au`, `crm.studentvisatax.com.au`, `app.studentvisatax.com.au` all returned 200 for /crm (WHT CRM login). `brandFromHost` returned `wht` for them as well, so handlers agreed with the router (consistent, but wrong).
Attack path: not an attacker action. If DNS or Vercel ever sends another name under the student domain to this project (a wildcard record, a `staging.` or `www2.` added for a campaign, a forgotten test domain), it silently serves WHT plus /crm on the SVT domain. Default is fail-open for the live brand by design ("Anything that is not an SVT host is WHT"), which is right for unknown hosts in general but wrong for names the owner registered under the SVT domain.
Fix (applied): new `SVT_REGISTRABLE_DOMAIN = 'studentvisatax.com.au'`; the router pattern and `brandFromHost` treat the domain and every subdomain of it as SVT. Lookalikes stay WHT (`evil-studentvisatax.com.au`, `studentvisatax.com.au.evil.com`, `x` + domain). Re-probed live: subdomains now 404 on /crm, lookalikes unchanged.
Compatibility: the three listed hosts behave exactly as before; WHT hosts cannot match because the match is anchored.
Test: same file ("host classification": router and `brandFromHost` must agree for 11 SVT and 16 WHT spellings).
Residual: a domain for SVT that is NOT under studentvisatax.com.au still needs adding to `SVT_HOSTS` (documented in the file).

### API2-03 Image optimizer (Low)
Evidence: live, `Host: studentvisatax.com.au` GET `/_next/image?url=%2Fwht-assets%2Fimg%2FIMG-W01-desktop.webp&w=640&q=75` returned 200 with JPEG bytes, a WHT photograph served from the SVT domain. The catch-all rewrite deliberately leaves `/_next/` alone, and the optimizer reads `/public` itself. `next.config.js` `images.remotePatterns` also allows `**.supabase.co` and `**.supabase.in`, so the optimizer will fetch and re-encode a public object of ANY Supabase project (an open image proxy, bandwidth and compute on our Vercel bill); only the "internal response" error shape was observed here because no network request was made.
Nothing in `src` imports `next/image` and `_next/image` appears nowhere in code, so no page of either brand calls it.
Fix applied (SVT side): rewrite rule 1b closes `/_next/image` on SVT hosts. Re-probed: 404 on SVT, 200 unchanged on WHT.
Proposed (WHT side, not applied because it edits `next.config.js` for the live brand): set `images: { remotePatterns: [], formats: [...] }` or pin `remotePatterns` to the project's own hostname, and confirm in the Vercel logs that `/_next/image` has zero traffic first.
Test: "the image optimizer is closed on SVT hosts" in `brand-isolation-round2.test.ts`.

### API2-04 Bearer token follows Meta-supplied URLs (Low, suspected)
Evidence: `src/lib/will/channel.ts` `fetchWaMedia` fetched `info.url` from the Graph lookup with `Authorization: Bearer <WhatsApp token>`, and `verifyTemplates` followed `paging.next` with the token. The media id comes from the HMAC-verified webhook and Meta is trusted, so this needs a compromised or misbehaving upstream (or a TLS-intercepting proxy) before it matters. It is the only server-side fetch in the codebase whose URL is not a source constant.
Impact if triggered: the long-lived WhatsApp access token sent to an attacker host, or a request to an internal address (169.254.169.254 and the like).
Fix (applied): new `src/lib/will/meta-url.ts`. The media URL must be https, have no credentials, no port other than 443, no IP literal in any common spelling, no single-label or `.local`/`.internal` host; the token is attached only to Meta hosts (`fbsbx.com`, `facebook.com`, `fbcdn.net`, `whatsapp.net`, `whatsapp.com`, `facebook.net`). A safe non-Meta host is still downloaded, without the token, so a CDN change cannot silently drop a customer's passport photo. `paging.next` is followed only when it is `https://graph.facebook.com`.
Test: `src/lib/will/__tests__/meta-outbound-url-round2.test.ts` (37 tests, mocked fetch, synthetic token): hostile URLs make no request, Meta host gets the token, non-Meta host does not.
Residual: DNS names that resolve to private addresses are not detectable in code; low value because the URL source is Meta.

### API2-05 Inventory test strength (Info)
Fixed by `api-handler-inventory-round2.test.ts` (pins methods per route, checks auth precedes body, params, store and database use in every gated handler, public list pinned, webhook HMAC before parse, no `Access-Control-*`, no `.stack`, no environment in a response, public routes do not echo caught error messages).

### API2-06 Malformed body on public forms returns 500 (Low)
Evidence: live, `POST /api/abn-form` with `Content-Type: application/json` and body `{}` returned `500 {"ok":false,"error":"submission_failed"}`; `req.formData()` throws and the catch maps everything to 500. tfn-form and super-form share the shape. `analytics/funnel` correctly returns 400 `invalid_event`.
Impact: no leak (generic text). A scanner or broken client produces 5xx noise that can mask a real outage in monitoring and counts against availability metrics.
Fix not applied: needs a 400 branch before the generic catch in three routes; no security gain, small product-visible change in status code (the front end treats any non-ok as failure). Patch: wrap `await req.formData()` in try/catch and return `400 {ok:false,error:'invalid_request'}`.

### API2-07 Raw error text on staff and cron routes (Info)
`will/actions` (`detail: message`), `will/tick` (`detail: String(e)`), `will/chats` and `will/search` (`message.slice(0,200)`), `will/seed` (`error.message`), `crm/leads` (`detail`), `will/whatsapp/connect` (Meta's error text), `will/health` (check details, including whether secrets are configured). All behind the session or cron secret, so staff-only exposure; the CRM UI shows them for debugging. Not changed. If a staff account is ever phished, these reveal table names and provider messages; trim to a code plus a log reference at the next maintenance pass.

### API2-08 Checked and clean
- Open redirect: no `redirect()` or `NextResponse.redirect` takes input; the 308 for `//evil.com`, `/\evil.com`, `///evil.com`, `/guides//evil.com` goes to the same origin path (`/evil.com`), and `/%2F%2Fevil.com` is a 404. `?next=`, `?returnTo=`, `?redirect=` are ignored.
- Host spoofing: `X-Forwarded-Host`, `X-Host`, `X-Original-Host`, `Forwarded: host=`, `X-Forwarded-Server` did not change routing in either direction (WHT stayed WHT, SVT stayed SVT). Absolute-URI request line with a different Host: Host wins. Odd Host values (`a, b`, `a@b`, `a/`, `a?x`, `a%2f`, percent or space) fall to WHT consistently in router and handler (no divergence). Source test: no file under `src` reads those headers; every `brandFromHost` call is fed `headers.get('host')`.
- Path tricks on WHT hosts toward the SVT tree: `/svt-site`, `/svt-assets/*` with encoded characters (`%73vt-site`, `svt-site%2Fzh`, `%2fsvt-site`), upper case, `//`, dot segments, `;a=1`, `%00`, trailing slash: all 404 or a same-origin 308 that then 404s. SVT host to WHT: `/%61pi/will/tick`, `/api%2Fwill%2Ftick`, `/API/will/tick`, `/CRM`, `//crm`, `/./api/...`, `/x/../api/...`, `/de`, `/wht-assets/...`: all 404.
- `SVT_API_ALLOWLIST`: default empty; `=== 'true'` exact match (`yes`, `1`, `TRUE` do not enable); when on, only `/api/tax-form` and `/api/tax-form/upload` are reachable, `/api/tax-form/`, `/api/tax-form/x`, `/api/tax-formx` are blocked; the two route handlers also refuse an SVT host while the flag is off (second lock, `tax-form/route.ts:24`, `upload/route.ts:97`). Tested for every route in the file system with the flag on and off.
- Cron and Will from an SVT host: closed by the same rule (tested for `/api/will/tick`, `/api/will/webhook`, and the whole `/api` inventory). Note the webhook and the Vercel cron must therefore keep targeting the WHT host; see section 5.
- CORS: no `Access-Control-*` anywhere (source, next.config.js, vercel.json); a preflight `OPTIONS` with a foreign Origin got 204 and no allow-origin header. `Cross-Origin-Resource-Policy: same-origin` is set.
- Methods: unsupported methods answer 405 (live matrix on the first 20 routes, 401 or 405 for every anonymous call; `HEAD` on a GET route is gated like GET). The remaining routes were verified by the per-handler source test, because the dev server died mid-matrix.
- SSRF: the only fetches with a non-constant URL are API2-04 (fixed) and the CRM file route, which validates the host but downloads through the Supabase SDK by object path, so no outbound request is made to the supplied URL.
- Request smuggling via `x-middleware-subrequest`: sent against `/api/will/state`, still 401 (Next 16.4.3; the proxy only sets a CSP in any case).

### API2-09 `svt.localhost` (Info)
It is in `SVT_HOSTS` in every build. A request carrying that Host to production would only narrow what the caller sees (SVT pages, no /crm, no API), and Vercel does not route unknown Host values to the project, so there is no privilege gain.

## 3. Changes made

| File | Change |
|---|---|
| `config/brand-routing.js` | `SVT_REGISTRABLE_DOMAIN`; host pattern matches the domain and its subdomains (API2-02); rule 1b closes `/_next/image` on SVT hosts (API2-03). The trailing-dot `\.?` was added by sec2-forms-uploads in parallel. |
| `config/brand-routing.d.ts` | type for the new export |
| `src/lib/brand.ts` | `brandFromHost` accepts SVT subdomains (the trailing-dot strip is the parallel edit) |
| `src/lib/will/meta-url.ts` (new), `src/lib/will/channel.ts` | outbound URL rules for Meta-supplied URLs (API2-04) |

Tests added (all new files):
- `src/lib/__tests__/brand-isolation-round2.test.ts`: 56 tests. Enumerates every page and route from `src/app` and asserts none is reachable from any SVT host spelling (flag off, and flag on except the two form routes); the SVT tree and SVT assets are 404 on every other host; router and `brandFromHost` agree on 27 host spellings; forwarded-host headers are never read.
- `src/lib/__tests__/api-handler-inventory-round2.test.ts`: 108 tests (per-handler auth order, method pinning, public list, webhook order, no CORS, no stack, no echo of caught errors).
- `src/lib/will/__tests__/meta-outbound-url-round2.test.ts`: 37 tests.

Mutation checks: reverting the host pattern or the image rule makes 13 isolation tests fail; deleting the auth line of one DELETE handler fails the inventory test. Both restored.

## 4. Verification

- Live probes: `next dev -p 3199 -H 127.0.0.1`, curl with forged Host, before and after each router change. Final state: trailing-dot and subdomain hosts 404 on /crm, /api/will/tick, /de, /llms-full.txt; `/_next/image` 404 on SVT and 200 on WHT; `studentvisatax.com.au` root 200 (SVT home).
- `npx tsc --noEmit`: one error, not in my files: `src/lib/__tests__/supabase-schema-guards.test.ts(98,25) TS6133 'i' is declared but never read` (another agent's new test). My files compile.
- `npx eslint` on the changed and new files: clean (`--quiet`).
- jest: the three new files pass (56 + 108 + 37). Wider run `npx jest src/lib src/app/api __tests__`: 405 of 410 suites, 5345 of 5353 tests pass. Five suites failed, none touching my changes: four SVT content suites (`long-articles-27oct`, `i18n-rules-26oct`, `content-rules-26oct`, `library-26oct`: article word count and meta description length, i.e. SVT copy being edited by another agent at the time) and `will/thanks-send-chain-29oct`, which passes when run alone (25 of 25), so it is load or timing flakiness in a rate-limit-timeout path.

## 5. Could not assess (needs infrastructure, dashboards, git history)

- Whether Vercel normalises a trailing-dot Host or forwards it; which domains and wildcard DNS records are attached to the Vercel project (decides how real API2-01 and API2-02 are). Check the project Domains page and DNS zone for `studentvisatax.com.au`.
- Whether Vercel strips client-sent `X-Forwarded-Host`, `X-Real-IP` (affects every per-IP limit, see sec-api-logic section 6) and `x-middleware-subrequest` on the edge.
- Which hostname the Vercel cron and the Meta webhook subscription call: if either is configured with the SVT domain it is now 404 by design. Both must use the WHT production host.
- Vercel logs for `/_next/image` traffic and for 5xx on the public forms (API2-06).
- Production `next start` behaviour of the new rule (verified on `next dev` and with Next's own matchers in jest; the 26 Oct note says rewrites behaved identically on `next start`, but I did not rebuild 540 pages).
- Git history (the tree has none) for earlier secrets or removed routes.
- Supabase RLS and bucket policy.

## 6. Residual risk

Brand isolation is now enforced by default-deny plus an exhaustive file-system test, but it still depends on the platform delivering the real Host. Unknown hosts remain WHT by design. The Meta URL check cannot see DNS rebinding. API2-06 and API2-07 are left as noise and hygiene items.
