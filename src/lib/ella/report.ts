/**
 * Stage 5 learning report (Jo, Nov 21). On request, a panel of Claude
 * analysts reads everything since the last report, each from one angle, and
 * one more writes the summary. Jo downloads the report and sends it to
 * Claude in chat, and the code is changed from it there; nothing here changes
 * Ella by itself. Downloading starts a new period, so every report covers only
 * what happened since the one before.
 *
 * What goes in: every post and its numbers at each checkpoint (views, reach,
 * likes, comments, shares, saves, average watch time, follows), and for every
 * video made in the period its script (hook, every line, shots, judge
 * scores, checks), the quality check of the finished video, and its cost.
 */
import type { EllaServices } from './run'
import type { ProductionDetail, PerformanceRow } from './store'
import type { Llm } from './script/llm'
import type { StudioState } from './script/studio'
import { studioKey } from './stage1'
import type { ScriptDraft } from './script/types'
import { shotOf } from './script/types'

export const REPORT_SINCE_KEY = 'learning_report_since'

export const ANALYSTS: Array<{ id: string; title: string; brief: string }> = [
  { id: 'script', title: 'Script and hook', brief: 'Hooks, the first 3 seconds, the one idea, the payoff, the call to action, word count and pace. Which hook types, templates and series hold viewers, get saves and sends, and which lose them. Quote the lines.' },
  { id: 'visuals', title: 'AI clips, cards and the edit', brief: 'The shot mix: how much Ella, how many AI clips and cards, punch-ins, on-screen text. Which mixes keep watch time, which look fake or busy. Use the quality-check findings.' },
  { id: 'ella', title: "Ella's delivery", brief: "Ella's voice and on-camera take: pace (words per minute per line), sentence length, natural flow, where viewers likely drop. Signs she sounds robotic or rushed." },
  { id: 'platforms', title: 'Instagram and TikTok data', brief: 'Every number the platforms gave: views, reach, average watch time against length, shares, saves, comments, follows; Instagram against TikTok; posting day and time; 72 h against 7 d against 28 d.' },
  { id: 'skeptic', title: "Devil's advocate", brief: 'Challenge the other conclusions: sample sizes, chance, confounders (posting time, topic, trend). Say which findings are solid, which are guesses, and what test would settle each one.' },
]

const n = (x: number | null | undefined) => (x == null ? '' : String(x))

function productionBlock(p: ProductionDetail): string {
  const d = p.script?.script as (ScriptDraft & { studio?: { review?: { scores?: Record<string, number> }; judgeTake?: { from: 'A' | 'B'; items: string[] }; captionNotes?: { keywords: string[]; why: string }; advocate?: { summary: string; risks: Array<{ where: string; risk: string; why: string }> } } }) | undefined
  if (!d) return `- ${p.title ?? p.slug}: no script`
  const total = d.scenes.length ? d.scenes[d.scenes.length - 1].end : 0
  const words = d.scenes.reduce((a, s) => a + s.voice.split(/\s+/).filter(Boolean).length, 0)
  const shots = d.scenes.map(s => shotOf(s))
  const lines = d.scenes.map(s => {
    const w = s.voice.split(/\s+/).filter(Boolean).length
    const wpm = s.end > s.start ? Math.round((w / (s.end - s.start)) * 60) : 0
    return `  ${s.scene}. [${shotOf(s)} ${s.start.toFixed(1)}-${s.end.toFixed(1)}s, ${wpm} wpm] "${s.voice}" | on screen: ${s.onScreen}`
  })
  const qa = ((p.render?.qa ?? []) as Array<{ scene: number | null; problem: string; severity: string }>).map(q => `${q.severity}${q.scene ? ` scene ${q.scene}` : ''}: ${q.problem}`)
  return [
    `### ${p.title ?? p.slug} (${p.slug})`,
    `Time from Start to ready video: ${p.render ? `${Math.round((Date.parse(p.render.createdAt) - Date.parse(p.createdAt)) / 60000)} min` : 'not ready yet'} (Start ${p.createdAt.slice(0, 16)})`,
    `Status ${p.status} · ${Math.round(total)} s · ${words} words · hook ${d.hookType} · CTA ${d.ctaType} · template ${d.template ?? '-'} · series ${d.series ?? '-'} · cost US$${p.spentUsd.toFixed(2)}`,
    `Shots: ${shots.filter(x => x === 'ella').length} Ella, ${shots.filter(x => x === 'clip').length} AI clips, ${shots.filter(x => x === 'graphic').length} cards`,
    `Judge scores: ${JSON.stringify(d.studio?.review?.scores ?? {})}`,
    `Judge took from the other draft: ${(d.studio?.judgeTake?.items ?? []).join(' | ') || 'nothing'}`,
    `Keyword research: ${d.studio?.captionNotes?.keywords?.join(', ') || 'not run'}`,
    `Devil's advocate: ${d.studio?.advocate ? `${d.studio.advocate.summary} ${d.studio.advocate.risks.map(r => `[${r.where}] ${r.risk} (${r.why})`).join(' ; ')}` : 'not run'}`,
    `Core message: ${d.coreMessage}`,
    ...lines,
    `Caption: ${d.captions.instagram.replace(/\n/g, ' / ')}`,
    `Quality check: ${qa.length ? qa.join('; ') : 'clean'}`,
  ].join('\n')
}

function metricsTable(rows: PerformanceRow[]): string {
  if (!rows.length) return 'No platform numbers yet.'
  const head = 'post | platform | published | checkpoint | length s | views | reach | avg watch s | likes | comments | shares | saves | follows | hook type | hook'
  return [head, head.replace(/[^|]/g, '-'), ...rows.map(r => [r.title ?? r.slug, r.platform, r.publishedAt.slice(0, 16), r.checkpoint ?? '', n(r.durationSec), n(r.views), n(r.reach),
    r.avgWatchMs == null ? '' : (r.avgWatchMs / 1000).toFixed(1), n(r.likes), n(r.comments), n(r.shares), n(r.saves), n(r.follows), r.hookType ?? '', (r.hook ?? '').replace(/\|/g, '/')].join(' | '))].join('\n')
}

/** Everything that went wrong or slowed down for one video: the script log (every stage, its time and note) and every failed step. */
async function problemsBlock(svc: EllaServices, p: ProductionDetail): Promise<string> {
  const key = studioKey(p.id)
  const st = (await svc.repo.settings([key]))[key] as StudioState | null | undefined
  const log = (st?.log ?? []).map(e => `  - ${e.at.slice(0, 19)} ${e.phase} ${e.ok ? 'ok' : 'FAILED'} (${e.seconds} s): ${e.note}`)
  const steps = await svc.repo.list(p.id, p.scriptVersion ?? 1).catch(() => [])
  const bad = steps.filter(x => x.status === 'failed' || x.error).map(x => `  - ${x.kind} scene ${x.scene} attempt ${x.attempt}: ${x.status}${x.error ? ` · ${x.error}` : ''}`)
  return [`### ${p.title ?? p.slug}`, ...(log.length ? ['Script log:', ...log] : ['Script log: none']), ...(bad.length ? ['Failed video steps:', ...bad] : ['Failed video steps: none'])].join('\n')
}

export async function buildLearningReport(svc: EllaServices, llm: Llm = svc.llm()): Promise<{ markdown: string; filename: string; since: string; until: string }> {
  const until = svc.now().toISOString()
  const since = String((await svc.repo.settings([REPORT_SINCE_KEY]))[REPORT_SINCE_KEY] ?? '2026-01-01T00:00:00.000Z')
  const perf = (await svc.repo.performance(500)).filter(r => r.publishedAt >= since)
  const dash = await svc.repo.dashboard()
  const ids = new Set<string>(dash.queue.map(q => q.id))
  for (const p of await svc.repo.posts()) if ((p.publishedAt ?? p.scheduledAt) >= since) ids.add(p.productionId)
  const prods = (await Promise.all([...ids].map(id => svc.repo.production(id)))).filter((x): x is ProductionDetail => !!x && x.createdAt >= since || !!x?.posts.some(p => (p.publishedAt ?? '') >= since))
  const data = [
    `Period: ${since.slice(0, 10)} to ${until.slice(0, 10)}`,
    '', '## Platform numbers', metricsTable(perf),
    '', '## Every video in the period', ...prods.map(productionBlock),
    '', '## Open alerts now', ...(dash.alerts.length ? dash.alerts.map(a => `- ${a.createdAt.slice(0, 16)} ${a.kind}: ${a.message}`) : ['None.']),
    '', '## Problems and timing per video', ...(await Promise.all(prods.map(p => problemsBlock(svc, p)))),
  ].join('\n')

  const system = 'You analyse short vertical videos for Student Visa Tax (an AI presenter, Ella, explains Australian tax to international students on Instagram Reels and TikTok). Be strict and concrete. Use only the data given; when data is thin, say so plainly. No em or en dashes. Write in English, in markdown, under 450 words.'
  const ask = (brief: string) => `${data}\n\nYOUR ANGLE: ${brief}\n\nWrite: 1) what the data shows, with numbers; 2) what to change in the system (script rules, shot mix, voice, editing, posting), each with how sure you are (high, medium, low) and why; 3) what to measure next.`
  const parts = await Promise.all(ANALYSTS.map(async a => {
    try { return { a, text: (await llm.complete(system, ask(a.brief), { effort: 'medium' })).text } } catch (e) { return { a, text: `This analyst failed: ${String((e as Error).message ?? e).slice(0, 200)}` } }
  }))
  let summary = ''
  try {
    summary = (await llm.complete(system, `${parts.map(p => `## ${p.a.title}\n${p.text}`).join('\n\n')}\n\nYOUR JOB: you are the lead. Merge the five analyses into one ranked list of at most 8 changes for the code, most valuable first. For each: the change, the evidence, how sure (high, medium, low). Then the 3 things to measure next. Drop anything the devil's advocate showed is a guess, or mark it as a test.`, { effort: 'medium' })).text
  } catch (e) { summary = `The summary failed: ${String((e as Error).message ?? e).slice(0, 200)}` }

  const markdown = [
    `# Ella learning report`, `${since.slice(0, 10)} to ${until.slice(0, 10)} · ${perf.length} platform readings · ${prods.length} videos`, '',
    'Send this file to Claude in chat; the code is changed from it there.', '',
    '## Summary: changes to make', summary, '',
    ...parts.flatMap(p => [`## ${p.a.title}`, p.text, '']),
    '---', '# Data the analysts used', data,
  ].join('\n')
  await svc.repo.setSettings({ [REPORT_SINCE_KEY]: until })
  await svc.repo.audit('ella', 'learning_report', { since, until, readings: perf.length, videos: prods.length })
  return { markdown, filename: `ella-learning-${until.slice(0, 10)}.md`, since, until }
}
