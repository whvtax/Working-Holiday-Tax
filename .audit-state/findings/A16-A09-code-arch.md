# A16 Code integrity / A09 Technical architecture and integration

Agent: A16 + A09 (one subagent, two sections). Baseline d9dbac0, branch svt-build. Read-only review of the
repo; tooling run from the repo without writing to it, except one transient throwaway Jest file (see
"Method note" at the end).

## Tool results (exact)

| Command | Result |
|---|---|
| `npx tsc --noEmit` | exit 0, no output (clean) |
| `npx eslint src` (no `--quiet`) | exit 0, **0 errors, 58 warnings** |
| `npx jest --ci` (full) | **337 suites passed, 4102 tests passed, 1 skipped, 0 failed**, 152 s |
| `.next` build log (`scratchpad/build-main.log`, 245 lines) | "Compiled successfully", 1109 static pages, no warnings other than the "Experiments (use with caution): globalNotFound, serverActions" banner. All SVT form routes prerendered: `/svt-site/tax-form`, `/svt-site/tax-form/residency`, `/svt-site/{zh,vi}/tax-form(/residency)`, `/svt-site/client-agreement`, `/svt-site/privacy`. |
| long-article index drift (generator logic replayed on a scratch copy) | en, zh, vi: **IN SYNC** with the committed `index.ts` |
| slug consistency (blog-en 23, long en 150, zh 150, vi 150, guides 10) | 0 duplicate slugs, 0 blog/long collisions, 0 guide/blog collisions, 0 zh/vi long keys without an EN article, zh/vi blog slug sets identical to EN |
| internal hrefs in `src/lib/svt/content/**` and `src/components/svt/**` vs `SVT_PAGES` | every href resolves to a page; the only non-SVT_PAGES targets are the deliberately noindex `/tax-form`, `/zh/tax-form`, `/vi/tax-form` |

ESLint warning breakdown (58, all in files that are not SVT-specific except where noted):

| Rule / message | Count | Files |
|---|---|---|
| React Compiler: setState synchronously within an effect | 25 | Dashboard.tsx (9), DashboardClient.tsx, FormClient.tsx:319, ResidencyDeclaration.tsx:127, ResidencyStep.tsx:198, LinkFormTask, MorningReport, LeadsTab, PartnersClient, PartnerDetailClient, InboundCheckClient, LoginClient, MobileLanguageBanner |
| React Compiler: cannot create components during render | 8 | DashboardClient.tsx, LanguageSwitcher.tsx |
| React Compiler: impure function during render | 7 | FormClient.tsx:285 (x2), :415, Dashboard.tsx (4) |
| `@next/next/no-location-assign-relative-destination` | 6 | Dashboard.tsx, ConnectClient.tsx |
| React Compiler: variable before declared | 4 | LanguageSwitcher.tsx |
| React Compiler: refs during render | 3 | FormClient.tsx:282, Dashboard.tsx (2) |
| `@next/next/no-html-link-for-pages` | 2 | **global-not-found.tsx:32** (intentional: no shared layout, `<a href="/">`), LanguageSwitcher |
| `@next/next/no-head-element` | 2 | **SvtDocument.tsx:16**, RootDocument.tsx:288 (both are root layouts where `<head>` is correct; the rule is a false positive for App Router root layouts) |
| Unused eslint-disable directive | 1 | brand-routing-26oct.test.ts |

None of the warnings is a correctness defect in SVT code paths; the FormClient/Residency* ones are
pre-existing WHT patterns that SVT now shares (see A16-6).

---

## Section A16: code integrity, broken and dead code

### A16-1  LOW  Unused exports in SVT code (dead code)

Files/lines (confirmed by grep across `src`, `scripts`, `e2e` including dynamic/string references;
none referenced outside the defining file):

- `src/components/svt/Type.tsx:12` `export const typeStyles = styles`
- `src/lib/svt/pages.ts:64` `SVT_NAV`, `:70` `SVT_GUIDE_LINKS` (locale-aware `navFor`/`guideLinksFor` are what is used)
- `src/lib/svt/content/guides-en.ts:554` `guideBySlug`
- `src/lib/svt/content/blog-en.ts` `articleBySlug`
- `src/lib/svt/jsonld.ts:49` `SVT_WEBSITE_REF` (used internally; only the `export` is dead)
- `src/components/svt/form-brand-svt.tsx:145` `SVT_FORM_BRAND` (used internally by `SvtFormProvider`; `export` is dead)
- `src/lib/svt/price-check.ts:34-35` `FEE_TFN`, `FEE_ABN` (used internally; `export` dead)
- Types only exported, never imported: `BlogBrowserLabels`, `SvtUi`, `SvtPage`, `PriceCheckResult`, `ImageFile`, `TopicId`.

Impact: none at runtime (tree-shaken in the client bundle; server-only otherwise). Maintenance noise.
Smallest fix: drop the `export` keyword on the internal-only ones; delete `typeStyles`, `SVT_NAV`,
`SVT_GUIDE_LINKS`, `guideBySlug`, `articleBySlug`. Verify: `npx tsc --noEmit` + `npx jest src/lib/svt`.
Unchanged acceptable: yes.

### A16-2  LOW  Dead i18n keys in `src/lib/svt/i18n.ts` (defined in all three locales, never read)

- `trust.supervision`, `trust.checkHint` (TrustStrip.tsx:7-11 reads only `aria`, `myGov`; the
  supervision sentence moved to the footer seal/alt per the comment at TrustStrip.tsx:4)
- `footer.supervision` (Footer.tsx reads `tagline, intro, askUs, sealAlt, guidesAria, learn, connect,
  email, copyright, about, clientAgreement, privacy`; never `supervision`)
- `footer.legalEnglishOnly` (optional key, never read)
- `guide.allQuestions`, `guide.readFullGuide`

No key is read that is missing in a locale: `UI` is typed `Record<SvtLocale, SvtUi>`, so tsc enforces
presence; confirmed clean by `tsc` exit 0.

Impact: none for customers. Risk is only that a reviewer believes the "Operates under the supervision
of a registered tax agent" footer line is rendered via `footer.supervision` when it is not (the
rendered supervision wording comes from the seal `alt`, the About guide, the contact FAQ, JSON-LD and
llms.txt, all verified by grep). Smallest fix: remove the six keys from `SvtUi` and the three locale
objects. Verify: tsc. Unchanged acceptable: yes.

### A16-3  LOW  Hard-coded English words inside the shared form on zh/vi (FormClient.tsx)

`src/app/(site)/tax-form/FormClient.tsx`:
- :212-213 `Tap to add files (max N)` / `Add more (n/N)` (MultiFileUpload has no `lang` prop)
- :694 `No`/`Yes` radio labels (Medicare), :707-712 `Single`/`Married`, :736 `Yes`/`No` (expenses)
- :768 placeholder `e.g. United Kingdom`, :774 `e.g. Instagram, TikTok, friend...`
- `src/lib/submit-tax-form.ts:196` `Upload failed for "<file>": <server error text>` and :270 the
  English fallback for a failed identity-document upload are shown to zh/vi users untranslated, and
  :196 surfaces raw server strings such as `rate_limited` or `File content does not match declared type`.

Evidence that this is partly deliberate: `form-brand-svt.tsx:91/120` `invoicesRequired` says
"改成 No" / "thành No". Impact: a Chinese or Vietnamese student sees English radio labels and English
upload-failure text on an otherwise native form; no functional effect. Smallest fix: add `yes`, `no`,
`single`, `married`, `tapToAdd`, `addMore`, `uploadFailed` to `FormExtraKey` + the ZH/VI maps in
`form-brand-svt.tsx` and read them via `T()`; in `submit-tax-form.ts` map upload failures to
`t('fileErrorGeneric')`/`t('tooMany')` instead of echoing `e.message`. Verify: Playwright on
`/zh/tax-form` with `SVT_FORMS_ENABLED=true`. Unchanged acceptable: yes for launch (cosmetic),
but it contradicts "Chinese and Vietnamese copy is written natively".

### A16-4  LOW  Residency-page copy still carries the "declared" audit string in English for zh/vi

`src/lib/submit-tax-form.ts:323-327`: the comment says the stored `declared` string "must stay
word-for-word identical to the on-screen wording"; for zh/vi the on-screen wording is
`declBefore + declCA + declAnd + declPP + declAfter` (form-brand-svt.tsx:107/136), but the record is
always `✓ I've read & agree to the Client Agreement & Privacy Policy.` Impact: the CRM note is an
English paraphrase, not the exact consent text shown. Smallest fix: build the string from the same
brand text keys, or note in the comment that it is the canonical English record. Verify: unit test
on `submitTaxForm` FormData for lang `zh`. Unchanged acceptable: yes.

### A16-5  INFO  `any` and an eslint-disable in shared form code (CLAUDE.md "no any")

- `FormClient.tsx:352` `setter: (x: any) => void` (snapshot restore helper)
- `FormClient.tsx:297` `// eslint-disable-line react-hooks/exhaustive-deps`

Pre-existing WHT code now shared with SVT. Smallest fix: `(x: never) => void` cast per setter, or
type `setIf` generically. Unchanged acceptable: yes.

### A16-6  INFO  React Compiler lint warnings on the shared form (setState in effect, refs in render)

`FormClient.tsx:282-286` (ref written during render for the funnel session id), `:319`,
`ResidencyDeclaration.tsx:127`, `ResidencyStep.tsx:198` (`useEffect(() => setHandoff(getTaxFormHandoff()), [])`).
These are the documented way of reading the in-memory hand-off after mount to avoid hydration
mismatch (comment at ResidencyDeclaration.tsx:125-126), so they are intentional. No behaviour defect;
they will become errors only if the React Compiler is turned on. Unchanged acceptable: yes.

### A16-7  INFO  Footer year frozen at build on fully static SVT pages

`src/components/svt/Footer.tsx:20` `new Date().getFullYear()` in a server component; the home, guide,
contact and legal pages are `○ (Static)` with no `revalidate` (build log), so "© 2026" stays until the
next deploy. Not a hydration issue (server component). The deadline logic (`src/lib/svt/deadline.ts`)
is only used on routes with `revalidate = 86400` (blog `[slug]` pages and llms.txt), so the
"deadline has passed" switch on 3 November works without a redeploy as designed. Unchanged acceptable:
yes.

### A16-8  Reviewed, no finding (A16 checklist items with a clean result)

- Orphaned routes: every file under `src/app/(svt*)/**` is reachable through `config/brand-routing.js`
  rewrites; `/svt-site/[slug]` uses `dynamicParams=false` so unknown slugs 404 (verified in blog-route.tsx
  and build log).
- `'use client'` components importing server-only modules: the three SVT client files
  (`form-brand-svt.tsx`, `PriceCheck.tsx`, `Payslip.tsx`) import only `brand-public`, `i18n`,
  `price-check`, `payslip`, `form-brand`; `images-server.ts` (node:fs) is imported by no client file.
- WHT identifiers in SVT bundles: `src/lib/constants.ts` (WHT number/email/GA id) is imported only by
  `form-brand-wht.tsx` and `RootDocument.tsx`; nothing under `svt/**` or the shared form modules
  imports it. `AGENT_*` come from `src/lib/agent.ts` (brand-neutral). The WHT strings in
  `ResidencyStep.tsx`/`ResidencyDeclaration.tsx` COPY objects that do ship in the SVT bundle are
  generic ("Working holiday maker"), never the brand name, domain or number (grep for
  `Working Holiday Tax|workingholidaytax|61424513998|0424 513 998` in all shared form files: 0 hits
  outside constants.ts).
- `console.log`/`console.debug`, `TODO/FIXME/HACK`, `@ts-ignore`: 0 in scope (only `console.error`
  in error paths).
- Hydration: `Analytics.tsx:44` normalises `/svt-site` so server (rewritten) and client (browser) paths
  produce identical output; the in-memory hand-off is read in effects only; `DOB_RANGE` is module-level
  but identical on both sides (date math in a fixed TZ per `dobInputRange`).
- `scripts/build-offline.sh`: only stubs fonts for the offline build and restores them (log lines 1 and
  245); not used in production.
- `src/lib/will/foreign-income.ts`, `later-plan.ts`, `instant-choice.ts`: pure functions, typed, no dead
  exports found by the grep sweep (their exports are used in engine.ts/tests).
- Unused CSS modules: every `*.module.css` under `src/components/svt` is imported (`Choice.module.css`
  by PriceCheck.tsx).

---

## Section A09: technical architecture and integration

### Data flow of an SVT submission (as implemented)

1. `src/app/(svt)/svt-site/tax-form/page.tsx:13-17`: `FORMS_ENABLED` read at **build** time; when false
   renders `SvtFormClosed`, else `SvtFormProvider` > `FormClient defaultLang`.
2. `FormClient.goToResidency` (:377-419): validates, stores payload + File objects in the in-memory
   singleton `setTaxFormHandoff` (lib/tax-form-handoff.ts), writes a TFN-free sessionStorage snapshot
   (`whv_taxform_return`), `router.push(brand.url(lang,'tax-residency'))` =
   `/zh/tax-form/residency` etc. (form-brand-svt.tsx:141,154-156).
3. `ResidencyStep` > `ResidencyDeclaration` read the hand-off after mount; the second option maps to
   `brand.residency.status === 'foreign'` (ResidencyDeclaration.tsx:154), so SVT never sends `whm`.
4. `submitTaxForm` (lib/submit-tax-form.ts): compresses, uploads bank + selfie sequentially with 3 tries
   to `/api/tax-form/upload?kind=`, then invoices (non-blocking), then POSTs FormData (URLs only) to
   `/api/tax-form`; `taxStatus` = "Foreign resident for tax purposes" / "Australian resident for tax purposes".
5. `/api/tax-form/upload/route.ts:130-131`: brand from `Host` -> `svt/tax-form/<kind>/...` in the
   PRIVATE bucket (`assertUploadsBucketPrivate`, :159).
6. `/api/tax-form/route.ts:23`: `brand = brandFromHost(host)`; rate limits; `validateIntake`;
   `findExistingClient(email, whatsapp, brand)` (brand-scoped); `createTask({... brand})`; then
   `brand==='svt' && svtLineEnabled()` -> `withBrand('svt', notifyFormReceived(...))`, else an audit row
   `svt_form_received`; WHT path unchanged.

### A09-1  MEDIUM  Build-time `SVT_FORMS_ENABLED` has no runtime counterpart in the API: a flag flip without a rebuild does nothing, and a rebuild with the flag changes three things at once

Evidence: the only reads are `process.env.SVT_FORMS_ENABLED` in the six page files (build time, e.g.
`(svt)/svt-site/tax-form/page.tsx:13`) and `config/brand-routing.js:40-41` (`svtApiAllowlist()` evaluated
when `next.config.js` loads, i.e. build time). `src/app/api/tax-form/route.ts:20-23` does **not** check the
flag; its comment relies on the rewrite allowlist. There is no runtime read anywhere (grep over the repo).

Consequences:
- Setting/unsetting the variable in the hosting dashboard has no effect until the next deploy; the
  DEPLOYMENT_CHECKLIST must say "redeploy" (NOT VERIFIED whether it does; out of my scope).
- Because pages and the allowlist are both baked at build, they cannot disagree inside one deployment,
  so the "pages read at build time, API at runtime" mismatch asked about **does not exist** in this code.
- But the closed state is enforced only by the rewrite (`/api/:path*` -> 404 on SVT hosts). If a future
  change moves the host rewrite or the allowlist (e.g. to `proxy.ts`), `/api/tax-form` on the SVT host
  opens silently with no second guard, and there is no server-side "forms are closed" answer for an
  SVT request. Defence in depth is one layer deep.

Smallest fix: in `/api/tax-form/route.ts` and `/upload/route.ts`, after `brandFromHost`, add
`if (brand === 'svt' && process.env.SVT_FORMS_ENABLED !== 'true') return 404/403` (runtime read; env
var is already present where the build runs). Verify: `e2e/brand-isolation.spec.ts` already asserts
the 404 with the flag off; add a route unit test with `host: studentvisatax.com.au` and the flag unset.
Unchanged acceptable: yes for this launch (the rewrite is tested: `brand-routing-26oct.test.ts`,
`e2e/brand-isolation.spec.ts`), but it should be on the backlog.

### A09-2  LOW  Brand is taken from `Host` only; correct, with one documented edge

`brandFromHost` (src/lib/brand.ts:65-69) treats anything not in `SVT_HOSTS` as WHT, never the body.
A WHT submission cannot be tagged SVT unless the request literally arrives on an SVT host, which
on Vercel requires the domain to be attached to the project (it is). An SVT page posts to relative
`/api/tax-form`, so it always hits the SVT host. Reverse mis-tag (SVT -> WHT) is only possible on a
host not in the list, which the rewrite would not serve SVT pages from in the first place.
Residual edge: `svt.localhost` is in `SVT_HOSTS` in production code (`config/brand-routing.js:27`); a
request to a production deployment with `Host: svt.localhost` is refused by the platform router
before Next sees it, as the comment states (NOT VERIFIED against the live platform, by design of this
audit). Unchanged acceptable: yes.

### A09-3  LOW  Upload errors are retried even when non-retryable, and the final message echoes raw server text

`src/lib/submit-tax-form.ts:189-200` retries any non-2xx three times with 800/1600 ms back-off,
including 400 (type/magic-byte rejection), 413 (platform body limit) and 429 (`rate_limited`). After
the third failure the user sees `Upload failed for "<name>": <data.error || status>` (:196), i.e.
English and sometimes an internal token (`rate_limited`), regardless of `lang`. 429 on the **final**
POST is translated (:344) but 429 on an upload is not. 413 is practically unreachable because
`MAX_UPLOAD_BYTES` is 4 MB client-side (compress-image.ts:29) against the server's 10 MB (upload
route :10) and the platform's limit, so the identity documents are capped before they leave the
browser; the server still returns a JSON 400 with `File too large (max 10MB)` for a direct POST,
which disagrees with the 4 MB the UI states (cosmetic; the client never sends >4 MB).

User-visible failure modes verified by reading the code:
- Network drop mid-upload of bank/selfie: 3 tries, then abort with English fallback text (:270), the
  hand-off and the uploaded files stay in memory, the user can press Submit again (already-stored
  files are re-uploaded; the first copies remain orphaned in the private bucket: no cleanup, LOW).
- Network drop on an invoice: silently skipped, named in the task note (`invoiceFailures`), submission
  succeeds. Good.
- 429 on `/api/tax-form`: translated `tooMany` (zh/vi via brand text). Good.
- 500 on `/api/tax-form`: `somethingWrong (ref xxxxxx)`, translated. Good.
- Tab discarded/hard refresh on the residency page: declaration renders nothing, `sessionLost` note
  with a hard link back; the TFN is re-entered (by design). Good.

Smallest fix: in `uploadOne`, stop retrying on `r.status === 400 || 413 || 429` and map them to
`t('fileErrorGeneric')` / `t('tooMany')`. Verify: unit test with a mocked `fetch` returning 429 once.
Unchanged acceptable: yes (rare path), but cheap to fix.

### A09-4  LOW  Will/Mia: `rebrandText` is case-sensitive for the bare brand name while `brandLeaks` is not

`src/lib/will/brand-voice.ts:55-56` replace only `Working Holiday Tax` and `working holiday tax`;
`brandLeaks` (:110) blocks `/working\s*holiday\s*tax\b/i`. A stored WHT text written as
"Working holiday tax" (sentence case, the project's own heading style) or "WORKING HOLIDAY TAX" would
not be rewritten for an SVT customer and would then be **blocked** at `postMessage`
(channel.ts:179-180): fail-safe (nothing leaks), but the student receives nothing and the failure
surfaces only as a task/`SendResult.error`. Today no such spelling exists in `src/lib/will/**` (grep:
0 hits), so this is latent. Smallest fix: make the two replacements one case-insensitive regex
`/working\s*holiday\s*tax/gi`. Verify: add a case to `brand-voice` tests. Unchanged acceptable: yes.

### A09-5  LOW  `rebrandText` rewrites WHT URLs 1:1 onto the SVT domain; two WHT-only paths would 404 on SVT

The WHT paths that occur in Will texts (`src/lib/will/**`, grep): `/tax-form` (49), `/client-agreement`
(7), `/privacy` (3), `/tax-residency` (2), `/de/tax-residency` (1, i18n.ts:842), `/ja/tax-residency`
(1, i18n.ts:843). All but the last two exist on SVT. The de/ja ones are inside the WHT "you selected
WHM" residency follow-up, which the engine never sends on SVT (`SVT_BLOCKED_KEYS`, engine.ts:374) and
whose `residency_whm` trigger cannot arise because the SVT form submits `foreign`, not `whm`
(ResidencyDeclaration.tsx:154). So unreachable today; a de/ja-speaking SVT customer could only hit it
via a scheduler template keyed on `taxStatus` containing "Working Holiday Maker", which the SVT form
never writes. Unchanged acceptable: yes. Note for the reviewer: the phone replacement at :59 maps to
`BRANDS.svt.phone`, which is still the placeholder `04123123123` (`brand-public.ts:17,20`,
`whatsappIsPlaceholder: true`); the launch check already fails on that flag.

### A09-6  Reviewed, no finding: brand resolution for Will/Mia

- Inbound: `webhook/route.ts:490,903` `brandForPhoneNumberId(phone_number_id)`; every handler runs
  inside `withBrand(brand, ...)` (:770, 798, 839, 874, 905). With no `SVT_WHATSAPP_PHONE_NUMBER_ID`
  the function returns exactly the old WHT filter (brand-context.ts:46-54).
- Store scoping: `store-supabase.ts:454,472` filter by `currentBrand()` only when `svtLineEnabled()`,
  so the brand column is never queried before migration 047 is needed.
- Outbound: every send to a customer goes through `deliverOut` (channel.ts:463, brand from
  `customer.brand`, the row, not the async context) or through `sendWhatsAppText/Template` with an
  explicit `customer.brand` (actions/route.ts:552-558, scheduler.ts:421-431). No call site in `src`
  sends without a brand (full list checked: actions/route.ts, service.ts, scheduler.ts, winback-auto.ts,
  channel.ts). `postMessage` refuses an SVT send when the SVT number is not configured rather than
  falling back to the WHT number (channel.ts:183-184) and blocks cross-brand marks (`brandLeaks`).
- Scheduler: `withBrand('wht', doProcess)` at the top and `enterBrand(await jobBrand(...))` per job
  (scheduler.ts:614,716); `jobBrand` returns `'wht'` until the SVT line exists (:621).
- Templates: `svtTemplateName` defaults to the `_svt` twin unless listed in `SVT_SHARED_TEMPLATES`
  (brand-voice.ts:141-144): safe default.
- Engine SVT blocks (engine.ts:374-396, 580-640, 915-935): residency quiz/referral keys dropped,
  DASP -> human task, zh/vi fixed texts from `svt-fixed-texts.ts` with `{{form}}` ->
  `studentvisatax.com.au/{zh|vi}/tax-form` (routes exist), free-text zh/vi held for approval.
- LLM prompts: `llm-transport.ts:15` uses `currentBrand()` and `rebrandPrompt` adds the SVT addendum.
- Conclusion: I found no path by which an SVT customer receives WHT text or vice versa, given the
  context is set at every entry point listed above. NOT VERIFIED: CRM UI direct sends that do not go
  through `/api/will/actions` (none found by grep for `sendWhatsApp*` / `deliverOut(` in `src/app`).

### A09-7  Reviewed, no finding: shared Analytics and root layouts

- `Analytics.tsx`: GA id passed by each root layout (`SvtDocument.tsx:27` uses
  `SVT_PUBLIC.gaMeasurementId`; `RootDocument.tsx:330` uses the WHT id). `/svt-site` prefix stripped
  (:44), untagged set `/tax-form`, `/zh/tax-form`, `/vi/tax-form` plus `/crm`, `/complete` (:45-46);
  prefix-match covers `/tax-form/residency`. The SVT shell links everywhere with plain `<a>` (no
  `next/link` in `src/components/svt`), so gtag is never carried by client navigation onto an
  untagged page; the only client-side navigations are form -> residency -> form, all untagged.
  `lib/analytics.ts` stores the AI-attribution source under the sessionStorage key `wht_ai_source`
  on both brands (name only, never shown; cosmetic).
- Root layouts: three SVT layouts import only `(svt)/fonts.css|tokens.css|svt.css`; WHT's
  `globals.css`, `next/font/google` and JSON-LD live in `RootDocument.tsx` only. `metadataBase` is
  per layout (`new URL(SVT_PUBLIC.siteUrl)`). `svt.css:3,10,21-25` carries its own reset, so the
  global reset the shared form injects in `<style>` (FormClient.tsx:864-865 `*, *::before, *::after
  {margin:0;padding:0}`) adds nothing new on SVT pages; `svt.css:62` hides the sticky WhatsApp button
  while `[data-svt-form]` is present. No leak found.
- CSP (`next.config.js:84-103`): `img-src 'self' data: blob:` covers the form's `URL.createObjectURL`
  previews; `connect-src 'self'` covers the two API routes; `script-src` allows gtag. Later header rule
  wins per key (:135), so SVT responses get `svtCsp`.
- `global-not-found.tsx`: server-only, host-switched colours/number, no cross-brand imports in the
  rendered output.

### A09-8  Reviewed, no finding: hand-off race conditions

`tax-form-handoff.ts` is a module singleton; `FormClient` restores and clears it in one effect
(:325-341) before the snapshot path; `ResidencyDeclaration` copies it into state once (:127) so the
2 h expiry (`getTaxFormHandoff`, :60) cannot interrupt an in-flight upload; `markTaxFormSubmitted`
clears the hand-off and `takeTaxFormSubmitted` is read-once (:75-85). Browser back from the residency
page restores step 2 with files. No race found; the known limitation (hard refresh loses files/TFN) is
handled with the `sessionLost` exit.

---

## Coverage

Reviewed in full: `FormClient.tsx`, `form-brand.tsx`, `form-brand-svt.tsx`, `ResidencyStep.tsx`,
`ResidencyDeclaration.tsx` (logic; styles skimmed), `submit-tax-form.ts`, `tax-form-handoff.ts`,
`agent.ts`, `constants.ts`, `Analytics.tsx`, `SvtDocument.tsx`, the three SVT root layouts, the six SVT
tax-form/residency pages, `SvtFormClosed.tsx`, `global-not-found.tsx`, `brand.ts`,
`config/brand-routing.js`, `will/brand-context.ts`, `will/brand-voice.ts`, `api/tax-form/route.ts`,
`api/tax-form/upload/route.ts`, `svt/deadline.ts`, `svt/pages/blog-route.tsx`, `long/library.ts` (first
80 lines), `long/en/index.ts`, `scripts/svt-long-index.mjs`, `svt/i18n.ts` (types + en block; zh/vi
values not read as prose), `svt.css` (global rules), `next.config.js` (headers/CSP/redirect sections).

Reviewed partially (grep and targeted reads): `will/engine.ts` (SVT blocks :370-400, :580-640,
:915-935 only), `will/channel.ts` (:160-200, :255-290, :325-350, :440-480), `will/scheduler.ts`,
`will/store-supabase.ts`, `api/will/webhook/route.ts`, `api/will/actions/route.ts` (call sites only),
`svt/svt-fixed-texts.ts` (keys), `RootDocument.tsx` (imports and Analytics line), `Footer.tsx`,
`TrustStrip.tsx`, `svt/brand-public.ts`, `lib/analytics.ts`, `proxy.ts` (matcher), `compress-image.ts`
(constant), `formStrings.ts` (error keys), `svt/pages.ts`, `svt/jsonld.ts`, `svt/price-check.ts`,
`svt/content/*` (structure/slugs via script, not prose), `will/foreign-income.ts`, `later-plan.ts`,
`instant-choice.ts` (export usage only), `scripts/build-offline.sh` (via build log).

Not reviewed: `FormStepper.tsx`, `FormLanguageToggle.tsx`, `form-brand-wht.tsx` (WHT-only), the
remaining SVT presentational components (`Header`, `Docket`, `GuidePage`, `HomePage`, `ChatThread`,
`Payslip`, `PriceCheck`, `ImageSlot`, `PagePhoto`, `LegalDocument`, `LanguageSwitch`, `BlogHub`,
`BlogBrowser`, `ContactPage`) beyond import and export checks, `svt/images*.ts`, `svt/llms.ts`,
`svt/seo.ts`, `svt/page-meta.ts`, `svt/payslip.ts` internals, `robots.txt`/`sitemap.xml` routes,
`src/lib/will/i18n.ts` prose, CRM UI components.

NOT VERIFIED: live behaviour of the SVT form (the local build has `SVT_FORMS_ENABLED` unset, so
`/tax-form` renders the closed notice; `e2e/svt-form.spec.ts` skips itself); platform-level Host
handling on Vercel; DEPLOYMENT_CHECKLIST wording about redeploying for the flag.

Method note (disclosure): to run the slug/href consistency check through the project's TypeScript path
aliases, I copied a throwaway test from the scratchpad into
`src/lib/svt/__tests__/zz-audit-tmp.test.ts`, ran `npx jest` on it, and deleted it in the same command
(`ls` confirmed removal). Nothing else under the repo was written. The script source remains at
`/tmp/claude-0/-home-claude/149f05ab-5b66-5250-8c45-a12d650349a2/scratchpad/a16/slugs.test.ts`; tool
logs at `.../scratchpad/a16/{tsc,eslint,jest}.log`.
