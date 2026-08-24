/**
 * Lightweight fuzzy search for blog articles.
 * No external dependencies; tuned for short documents (titles + descriptions).
 *
 * Scoring:
 *   - Exact phrase match in title: highest score
 *   - Exact phrase match in description/category: high score
 *   - All query terms present (word boundaries): medium score
 *   - Fuzzy match (small edit distance) per word: lower score
 *   - Common synonyms expanded automatically (super/superannuation, tax/tax return, etc.)
 *
 * Returns articles sorted by relevance; filters out non-matches.
 */

import type { Guide } from './data'

// Synonym map - bidirectional expansion. Helps match "super" → "superannuation" etc.
const SYNONYMS: Record<string, string[]> = {
  super: ['superannuation'],
  superannuation: ['super'],
  tfn: ['tax file number'],
  'tax file number': ['tfn'],
  abn: ['australian business number'],
  'australian business number': ['abn'],
  whm: ['working holiday', 'working holiday maker', 'backpacker'],
  'working holiday': ['whm', 'backpacker'],
  backpacker: ['whm', 'working holiday'],
  visa: ['417', '462'],
  '417': ['working holiday visa', 'visa'],
  '462': ['work and holiday visa', 'visa'],
  dasp: ['departing australia superannuation payment', 'super refund'],
  refund: ['return', 'tax back'],
  return: ['refund', 'lodgement'],
  ato: ['australian taxation office', 'tax office'],
  payslip: ['pay slip', 'wages'],
  wages: ['pay', 'salary', 'income'],
  medicare: ['health insurance', 'health levy'],
  levy: ['tax', 'charge'],
}

/**
 * Damerau-Levenshtein edit distance, capped at maxDist for efficiency.
 * Returns Infinity if distance > maxDist.
 */
function editDistance(a: string, b: string, maxDist = 2): number {
  if (Math.abs(a.length - b.length) > maxDist) return Infinity
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length

  const dp: number[][] = []
  for (let i = 0; i <= a.length; i++) {
    dp[i] = [i]
  }
  for (let j = 0; j <= b.length; j++) {
    dp[0][j] = j
  }

  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      )
      // Transposition
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1)
      }
      if (dp[i][j] < rowMin) rowMin = dp[i][j]
    }
    if (rowMin > maxDist) return Infinity
  }
  return dp[a.length][b.length]
}

/** Expand a token using the synonym map (returns original + synonyms). */
function expandWithSynonyms(token: string): string[] {
  const expanded = [token]
  const syn = SYNONYMS[token]
  if (syn) expanded.push(...syn)
  return expanded
}

/** Normalize text for matching: lowercase, strip punctuation, collapse whitespace. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Score a single article against a query.
 * Returns 0 if no match, positive number otherwise (higher is better).
 */
// Scores on title, description and category only, so it never needed the
// article body and works fine on the lighter card type.
function scoreArticle(article: Omit<Guide, 'body'>, queryRaw: string): number {
  const query = normalize(queryRaw)
  if (!query) return 0

  const titleN = normalize(article.title)
  const descN = normalize(article.description)
  const catN = normalize(article.category)
  const combinedN = `${titleN} ${descN} ${catN}`

  let score = 0

  // 1. Exact phrase match boost
  if (titleN.includes(query)) score += 100
  else if (descN.includes(query)) score += 50
  else if (catN.includes(query)) score += 40

  // 2. Per-word matching with synonyms and fuzzy
  const queryWords = query.split(' ').filter(w => w.length > 1)
  const titleWords = new Set(titleN.split(' '))
  const combinedWords = combinedN.split(' ')

  let wordsMatched = 0
  for (const qw of queryWords) {
    const expansions = expandWithSynonyms(qw)
    let matched = false
    for (const exp of expansions) {
      // Multi-word expansion (e.g., "tax file number") - check substring
      if (exp.includes(' ')) {
        if (combinedN.includes(exp)) {
          score += 20
          matched = true
          break
        }
        continue
      }
      // Exact word match in title
      if (titleWords.has(exp)) {
        score += 15
        matched = true
        break
      }
      // Substring match anywhere
      if (combinedN.includes(exp)) {
        score += 8
        matched = true
        break
      }
      // Fuzzy match on individual words (for typos)
      if (exp.length >= 4) {
        for (const cw of combinedWords) {
          if (cw.length < 3) continue
          const dist = editDistance(exp, cw, 2)
          if (dist <= 1) {
            score += 5
            matched = true
            break
          } else if (dist === 2 && exp.length >= 6) {
            score += 2
            matched = true
            break
          }
        }
        if (matched) break
      }
    }
    if (matched) wordsMatched++
  }

  // Bonus if all query words matched
  if (queryWords.length > 0 && wordsMatched === queryWords.length) {
    score += 25
  }
  // Penalty if very few words matched on multi-word queries
  if (queryWords.length > 1 && wordsMatched < queryWords.length / 2) {
    score = Math.max(0, score - 10)
  }

  return score
}

/**
 * Run a fuzzy search across all articles.
 * Returns articles sorted by relevance (highest score first), filtered to score > 0.
 */
export function fuzzySearch<T extends Omit<Guide, 'body'>>(articles: T[], query: string): T[] {
  if (!query.trim()) return articles

  const scored = articles
    .map(article => ({ article, score: scoreArticle(article, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.map(({ article }) => article)
}
