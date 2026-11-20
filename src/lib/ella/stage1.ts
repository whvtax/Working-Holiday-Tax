/**
 * Stage 1, end to end: sync the library, draw one unused blog, write its
 * script, store the result. Bible section 14. Nothing is filmed, generated
 * or published here.
 */
import type { SourceArticle } from './library'
import { pillarWeights, recentKeyTerms, toRegistry } from './registry'
import { generateScript, type EngineResult } from './script/engine'
import type { Llm } from './script/llm'
import { BIBLE_VERSION, LIMITS } from './script/rules'
import type { EllaStore } from './store'

export interface Stage1Settings {
  bible: string
  ellaLooks: string[]
  /** One variable only; none until 10 episodes are logged (bible s17 step 1). */
  testChange?: string
  agentSignoffConfirmed: boolean
  allowPrice: boolean
  learnings?: string
  actor?: string
}

export type Stage1Outcome =
  | { status: 'library_empty' }
  | { status: 'script_ready' | 'needs_jo'; productionId: string; slug: string; scriptVersion: number; result: EngineResult }

export async function runStage1(deps: { store: EllaStore; library: readonly SourceArticle[]; llm: Llm }, s: Stage1Settings): Promise<Stage1Outcome> {
  const { store, library, llm } = deps
  const actor = s.actor ?? 'ella-stage1'

  // 1. Sync at the start of every job (idempotent).
  await store.syncRegistry(toRegistry(library))

  // 2. Draw with pillar weights and the recent key term filter.
  const recent = await store.recentProductions(LIMITS.keyTermLookback)
  const claim = await store.claimBlog(pillarWeights(recent.map(r => r.pillar)), recentKeyTerms(recent), actor)
  if (!claim) return { status: 'library_empty' }

  const article = library.find(a => a.slug === claim.slug)
  if (!article) throw new Error(`Claimed slug ${claim.slug} is not in the library`)
  await store.setStatus(claim.productionId, 'scripting')

  // 3 to 9. Write and check the script.
  const testChange = recent.length >= 10 ? (s.testChange ?? 'none') : 'none (fewer than 10 episodes logged)'
  let result: EngineResult
  try {
    result = await generateScript({
      bible: s.bible,
      article,
      pillar: claim.pillar,
      ellaLooks: s.ellaLooks,
      testChange,
      recentKeyTerms: recentKeyTerms(recent),
      learnings: s.learnings,
      ctx: {
        articleText: article.text,
        articleCategory: article.category,
        previousHookType: recent.find(r => r.hookType)?.hookType ?? null,
        recentCtaTypes: recent.map(r => r.ctaType).filter((x): x is string => !!x),
        agentSignoffConfirmed: s.agentSignoffConfirmed,
        allowPrice: s.allowPrice,
        // Bible 7a: flow rules only warn until 10 real scripts exist, then they block.
        flowStrict: recent.filter(r => r.hookType).length >= 10,
      },
    }, llm)
  } catch (err) {
    // The slug stays claimed: retrying happens inside the same production.
    await store.setStatus(claim.productionId, 'needs_jo')
    await store.audit(actor, 'script_error', { productionId: claim.productionId, error: String(err) })
    throw err
  }

  for (const u of result.usage)
    await store.logUsage({ productionId: claim.productionId, feature: 'video_script', ...u })

  // 10. Store with the bible version; wait for Jo either way.
  const scriptVersion = await store.saveScript({
    productionId: claim.productionId, bibleVersion: BIBLE_VERSION,
    script: result.draft, issues: result.issues, passed: result.passed, attempts: result.attempts,
  })
  const status = result.passed ? 'script_ready' : 'needs_jo'
  await store.setStatus(claim.productionId, status, {
    keyTerm: result.draft?.keyTerm, hookType: result.draft?.hookType, ctaType: result.draft?.ctaType, scriptVersion,
  })
  return { status, productionId: claim.productionId, slug: claim.slug, scriptVersion, result }
}
