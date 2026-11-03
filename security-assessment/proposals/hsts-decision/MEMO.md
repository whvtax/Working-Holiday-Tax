# HSTS decision memo (sec2-frontend)

Current header on every WHT and SVT response (both brands, /crm included): `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (next.config.js `securityHeaders`).

## What each token commits us to

- `max-age=63072000` (2 years): a browser that has seen it once refuses plain HTTP to the exact host for 2 years. A mistake here cannot be undone quickly; lowering max-age only helps after each browser revisits.
- `includeSubDomains`: the same for every subdomain of each apex, including ones that never serve this app (`mail.`, `status.`, `help.`, an email click-tracking host, a Vercel alias on the custom domain, a legacy host). Any of those without a valid certificate becomes unreachable in browsers that saw the header. The repo references only `www.` subdomains, but DNS is not visible to me.
- `preload`: a signal that we agree to be on the browser preload list. It does nothing until someone submits the domain at hstspreload.org. Once listed, removal takes months across browser releases.

## What I could not determine

DNS zone for either domain; whether either domain has been submitted; whether Resend click tracking or any marketing tool uses a branded subdomain. The Vercel edge may also add its own HSTS.

## Recommendation

1. Owner checks hstspreload.org status for both apexes and lists every DNS record that can answer on 80/443.
2. If either domain is already preloaded, change nothing.
3. If neither is, and any subdomain is not HTTPS-clean, drop `preload` and `includeSubDomains` now (`max-age=31536000`) and re-add them after the inventory. Dropping costs nothing: the apex is still HTTPS-only for the first visitors via Vercel redirects.
4. If the inventory is clean, keep the header as is and submit to the preload list deliberately, SVT and WHT as separate decisions. Brand separation applies: do not reference one brand's domain from the other's configuration.

Severity: Low (Medium only if a subdomain is HTTP-only). Not changed in the tree because it is an owner decision with an unobservable blast radius.
