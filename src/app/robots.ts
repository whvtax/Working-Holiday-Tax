import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

// Explicitly allow AI crawlers and search engines.
// Pages disallowed are admin/form endpoints that should not be indexed.
const DISALLOWED_PATHS = [
  '/crm',
  '/crm/',
  '/api/',
  // THE FORM PATHS ARE DELIBERATELY NOT LISTED HERE.
  //
  // They each carry `robots: { index: false }` in their layout, and the two
  // controls cancel each other out: a crawler blocked by Disallow never fetches
  // the page, so it never reads the noindex. Meanwhile partner referral links
  // (crm/partners) publish `/tax-form?ref=CODE` on other people's sites, and an
  // external link to a blocked URL is precisely what produces a URL-only entry
  // in the index. Letting the crawler in to read "noindex" is what actually
  // keeps them out of results.
  //
  // /crm, /api/ and /tax-residency stay below, because for those the goal is to
  // block crawling itself, not to de-index.
  // The residency assessment is a step of the tax form. It already carries
  // noindex, but noindex only stops a page being listed: the crawler still
  // reads it. The questions on it are the assessment method, so the AI
  // crawlers enumerated below are kept out of the content as well as the index.
  '/tax-residency',
  '/de/tax-residency',
  '/ja/tax-residency',
]

// Major AI crawlers (OpenAI, Anthropic, Perplexity, Google, Microsoft, Meta, Apple, ByteDance).
// Listed explicitly so each receives the same allow/disallow rules and shows up clearly in logs.
const AI_USER_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'Bingbot',
  'CCBot',
  'FacebookBot',
  'Meta-ExternalAgent',
  'Applebot',
  'Applebot-Extended',
  'Bytespider',
  'YouBot',
  'DuckAssistBot',
  'Amazonbot',
  'Cohere-AI',
  'Diffbot',
  'ImagesiftBot',
  'Omgilibot',
  'Omgili',
  'Webzio-Extended',
]

export default function robots(): MetadataRoute.Robots {
  const baseRules = {
    userAgent: '*',
    allow: '/',
    disallow: DISALLOWED_PATHS,
  }

  const aiRules = AI_USER_AGENTS.map(ua => ({
    userAgent: ua,
    allow: '/',
    disallow: DISALLOWED_PATHS,
  }))

  return {
    rules: [baseRules, ...aiRules],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/sitemap-llms.xml`],
    host: SITE_URL,
  }
}
