import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

// Explicitly allow AI crawlers and search engines.
// Pages disallowed are admin/form endpoints that should not be indexed.
const DISALLOWED_PATHS = [
  '/crm',
  '/crm/',
  '/api/',
  '/tax-form',
  '/tfn-form',
  '/abn-form',
  '/super-form',
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
