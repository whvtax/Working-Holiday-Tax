# Do not load Google Analytics on the WHT questionnaire pages (sec2-frontend, FE2-09)

Evidence: `src/components/layout/RootDocument.tsx:354` renders `<Analytics measurementId=... />` with no `untagged` list. `src/components/layout/Analytics.tsx` only skips /crm and /complete. The SVT root passes `untagged={FORM_PATHS}` (`src/components/svt/SvtDocument.tsx:27`), so the two brands are inconsistent and WHT is the weaker one.

Impact: gtag.js (a script Google can change at any time, trusted by the CSP) runs in the same origin and DOM as the form where the TFN, passport selfie, bank statement and address are entered. gtag also sends `page_location` with the query string (`/start?ref=CODE`, utm values) to Google, and GA4 enhanced measurement can emit form_start/form_submit events. It does not read field values, so this is exposure of trust and metadata, not a known leak. Severity Low, Informational on data. The funnel is already measured first-party by `/api/analytics/funnel`.

Why a proposal: it removes GA page_view data for the form step, which marketing may use.

Patch (apply with a jest test mirroring the SVT one):

```diff
--- a/src/components/layout/RootDocument.tsx
+++ b/src/components/layout/RootDocument.tsx
-        <Analytics measurementId={GA_MEASUREMENT_ID} />
+        <Analytics measurementId={GA_MEASUREMENT_ID} untagged={WHT_FORM_PATHS} />
```

with, in the same file (slugs from `config/form-paths.js`):

```ts
import formPaths from '../../../config/form-paths'
const slugs = Object.values(formPaths.WHT) as string[]
const WHT_FORM_PATHS = ['', '/de', '/ja', '/fr', '/it', '/es'].flatMap((p) => slugs.map((s) => `${p}/${s}`))
```

Note Analytics unmounts the tag only when navigating inside the SPA; a hard load of a form URL never loads gtag because the component returns null on that path. Soft navigation from a guide to the form leaves an already-loaded gtag in memory, so also call `gtag('consent','update')` denied is NOT needed; accept it, or force a full navigation for the CTA links. Verify in a browser with the Network tab on /start (hard load: no googletagmanager request).
