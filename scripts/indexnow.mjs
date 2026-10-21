#!/usr/bin/env node
/**
 * indexnow.mjs - tell Bing (and through it ChatGPT Search and Copilot), Yandex,
 * Seznam and Naver that pages changed, instead of waiting for a recrawl.
 *
 * Google does not use IndexNow; it reads sitemap.xml as before.
 *
 * The key file is public/843b75167189fadc1e22ed25b84c7134.txt and must stay deployed: the search engines
 * fetch it to prove the ping came from the site owner.
 *
 * Run AFTER a deploy is live:
 *   node scripts/indexnow.mjs                 every URL in the live sitemap.xml
 *   node scripts/indexnow.mjs /blog/a /de/b   only the paths given
 *
 * Plain Node 18+, no dependencies.
 */
const SITE = 'https://workingholidaytax.com.au'
const HOST = 'workingholidaytax.com.au'
const KEY = '843b75167189fadc1e22ed25b84c7134'

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
}

async function main() {
  const args = process.argv.slice(2)
  const urls = args.length ? args.map((p) => (p.startsWith('http') ? p : SITE + p)) : await sitemapUrls()
  if (!urls.length) throw new Error('no URLs to submit')
  // The protocol accepts up to 10,000 URLs per request.
  for (let i = 0; i < urls.length; i += 10000) {
    const urlList = urls.slice(i, i + 10000)
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
    })
    // 200 and 202 both mean accepted. 403 means the key file is not reachable.
    console.log(`[indexnow] ${urlList.length} URLs -> HTTP ${res.status}`)
    if (res.status >= 400) process.exitCode = 1
  }
}

main().catch((e) => { console.error('[indexnow] FAILED:', e.message); process.exit(1) })
