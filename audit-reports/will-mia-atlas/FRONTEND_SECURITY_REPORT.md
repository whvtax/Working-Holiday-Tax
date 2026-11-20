# Frontend and browser security report: WILL MIA ATLAS

## Controls verified in code
- **Content Security Policy.** The public site has a static CSP in `next.config.js`. The CRM paths (`/crm`, `/atlas`) use a nonce-based CSP in `src/proxy.ts`, with `'strict-dynamic'`, `object-src 'none'`, `frame-ancestors 'none'`, and `base-uri 'self'`.
- **Private headers on CRM.** `crmHeaders` and `crmPrivateHeaders` are applied to `/crm`, `/atlas`, and their subpaths.
- **No secrets in the browser bundle.** The only `NEXT_PUBLIC_` variables found are public identifiers. The scripted pass flagged none.
- **No service key in client code.** No `'use client'` file references the service role.
- **Browser storage.** The owner's CRM session is an httpOnly cookie, not in storage. `localStorage` is used for a banner flag and for an activity timer (`crm/layout.tsx`). Analytics consent uses `localStorage`. The tax form keeps a snapshot in `sessionStorage` for hard refresh. That snapshot may contain customer form text until it is cleared on submit.
- **Mia and Atlas render text, not HTML.** No `dangerouslySetInnerHTML` appears in `components/mia`, `components/atlas`, or `components/will`.

## Findings
- **FE-1 (Low, verified): JSON-LD serialisation.** About 100 pages place `JSON.stringify(...)` inside `<script type="application/ld+json">` with `dangerouslySetInnerHTML`. `JSON.stringify` does not escape `</script>`. The inputs are static site content, so this is not exploitable today. It becomes a risk if a schema field ever carries user text. Fix: replace `<` with `<` in the serialised output. Not changed in this pass because it touches the whole public site and has no current exposure. Recorded as WMA-10.
- **FE-2 (Info): `GuideArticle` inline rendering.** `renderInline` builds HTML for guide text. The render-inline module escapes `<` and `>` and allows only `/`, `#`, `https:` and `mailto:` links (earlier change). Static content only.
- **FE-3 (Info): `unsafe-inline` in styles and in the public CSP.** This is documented in `proxy.ts` as a trade-off for the prerendered pages.

## Not verified
- Browser behaviour, real CSP violations, and third-party script behaviour were not tested in a browser. Chrome tooling was not run in this pass.
- Source maps: no `productionBrowserSourceMaps` setting was found, so Next.js defaults to off in production. This is inferred, not checked in the built output.
