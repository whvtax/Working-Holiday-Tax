/**
 * Stage 1, end to end: sync the library, draw one unused blog, write its
 * script, store the result. Bible section 14. Nothing is filmed, generated
 * or published here.
 */
import type { SourceArticle } from './library'
import { pillarWeights, recentKeyTerms, toRegistry } from './registry'
import { advanceStudio, newStudio, studioOutcome, STUDIO_STAGES_LABEL, type StudioOutcome, type StudioState } from './script/studio'
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
  /** Epoch ms the script writer must finish by. */
  deadline?: number
}

export type Stage1Outcome =
  | { status: 'library_empty' }
  | { status: 'scripting'; productionId: string; slug: string; phase: string }
  | { status: 'script_ready' | 'needs_jo'; productionId: string; slug: string; scriptVersion: number; result: StudioOutcome }

/** Where a script in progress is saved between runs. */
export const studioKey = (productionId: string) => `script_work:${productionId}`

type Deps = { store: EllaStore; library: readonly SourceArticle[]; llm: Llm; now?: () => number }

/** Draws one blog and starts its script in the studio. */
export async function runStage1(deps: Deps, s: Stage1Settings): Promise<Stage1Outcome> {
  const { store, library } = deps
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

  const state = newStudio({
    productionId: claim.productionId, slug: claim.slug, pillar: claim.pillar,
    recentKeyTerms: recentKeyTerms(recent),
    testChange: recent.length >= 10 ? (s.testChange ?? 'none') : 'none (fewer than 10 episodes logged)',
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
  }, new Date((deps.now ?? Date.now)()))
  await store.setSettings({ [studioKey(claim.productionId)]: state })
  return continueStudio(deps, state, s)
}

/** Runs the next studio stages for a script in progress, saves them, and finishes the script when it is done. */
export async function continueStudio(deps: Deps, state: StudioState, s: Stage1Settings): Promise<Stage1Outcome> {
  const { store, library, llm } = deps
  const actor = s.actor ?? 'ella-stage1'
  const article = library.find(a => a.slug === state.slug)
  if (!article) throw new Error(`Slug ${state.slug} is not in the library`)

  let next: StudioState = state
  try {
    const r = await advanceStudio({ state, article, settings: { bible: s.bible, ellaLooks: s.ellaLooks, learnings: s.learnings }, llm, deadline: s.deadline, now: deps.now })
    next = r.state
    for (const u of r.usage) await store.logUsage({ productionId: state.productionId, feature: 'video_script', ...u })
  } catch (err) {
    // A failed call counts as a failed stage; the studio stops after 3 in a row.
    next = structuredClone(state)
    next.log.push({ phase: next.phase, at: new Date().toISOString(), seconds: 0, ok: false, note: `Model call failed: ${String((err as Error)?.message ?? err).slice(0, 300)}` })
    next.updatedAt = new Date((deps.now ?? Date.now)()).toISOString()
    if (++next.failures >= 3) next.phase = 'done'
    await store.audit(actor, 'script_error', { productionId: state.productionId, error: String(err).slice(0, 500) })
  }
  await store.setSettings({ [studioKey(state.productionId)]: next })
  // Keep the production fresh so it is never treated as stuck while work goes on.
  if (next.phase !== 'done') {
    await store.setStatus(state.productionId, 'scripting')
    return { status: 'scripting', productionId: state.productionId, slug: state.slug, phase: STUDIO_STAGES_LABEL[next.phase] }
  }

  // Done: store the best draft with its research, review and work log; Jo approves either way.
  const result = studioOutcome(next)
  const scriptVersion = await store.saveScript({
    productionId: state.productionId, bibleVersion: BIBLE_VERSION,
    script: result.draft, issues: result.issues, passed: result.passed, attempts: result.attempts,
  })
  const status = result.passed ? 'script_ready' : 'needs_jo'
  await store.setStatus(state.productionId, status, {
    keyTerm: result.draft?.keyTerm, hookType: result.draft?.hookType, ctaType: result.draft?.ctaType, scriptVersion,
  })
  return { status, productionId: state.productionId, slug: state.slug, scriptVersion, result }
}
