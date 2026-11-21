/**
 * Claude the editor (Jo, Nov 21). Two passes, both cheap and both optional:
 *   1. Before rendering: Claude reads the script, the real timing and the
 *      default cut, then decides per scene whether to punch in and what the
 *      on-screen headline says (or none, to keep the face clear).
 *   2. After rendering: if the visual check finds a problem in a scene,
 *      Claude gets the problems, changes the edit and the video is rendered
 *      again, once. Rendering is local, so this costs no HeyGen money.
 * Code still guards every choice: a headline must be short and pass the
 * compliance word list, a zoom is 1.0 or 1.1 on Ella scenes only, and a card
 * scene keeps its card. If Claude fails or answers badly, the default edit is
 * used, so the editor can never stop a video.
 */
import type { EditPlan } from './compose'
import type { JsonTool, Llm } from '../script/llm'
import { BANNED } from '../script/rules'
import { shotOf, type Scene } from '../script/types'

export interface EditDecision { scene: number; zoom: number; move?: 'push' | 'none'; headline: string; why: string }
export interface EditorReply { decisions: EditDecision[]; summary: string }
export interface EditorResult extends EditorReply { model: string; inputTokens: number; outputTokens: number }
export interface VideoEditor {
  plan(input: { plan: EditPlan; scenes: readonly Scene[]; problems?: string[] }): Promise<EditorResult>
}

const str = { type: 'string' }
export const EDITOR_TOOL: JsonTool = {
  name: 'ella_edit',
  description: 'Edit decisions for one short vertical video.',
  schema: {
    type: 'object', additionalProperties: false, required: ['decisions', 'summary'],
    properties: {
      decisions: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['scene', 'zoom', 'headline', 'why'],
        properties: { scene: { type: 'number' }, zoom: { type: 'number', enum: [1, 1.1] }, move: { type: 'string', enum: ['push', 'none'] }, headline: str, why: str } } },
      summary: str,
    },
  },
}

export const EDITOR_RULES = `You are a senior short-form video editor (Reels and TikTok, retention first) cutting a video for Ella, a calm presenter who explains Australian student tax to international students in 30 to 40 second vertical videos.
How a professional edits this kind of video:
- The first frame stops the scroll: a strong headline on the hook, Ella close and clear.
- Something changes on screen every 2 to 4 seconds (a cut, a punch-in, a slow push-in, a card, a clip) so the eye never rests too long; never two identical-looking frames in a row.
- Punch-ins (1.1) land on the key word of a line, the answer, or a turn ("but"); slow push-ins ("push") on calm explanation and on cards, so still frames breathe.
- The payoff gets the strongest frame; the closing line is clean, steady and uncluttered, so the ending feels final.
- The only text on screen is the spoken captions at the bottom (and the cards); never a second line of text on top.
You do not change the words, the timing or the order of scenes. You decide, per scene:
- zoom: 1.1 is a gentle punch-in on an Ella scene, used to stress a key line and to refresh the picture after a long Ella stretch. At most 3 punch-ins, never two Ella scenes in a row, never on the hook. Use 1 for every card and clip scene.
- move: "push" is a slow push-in over the scene (Ella or card scenes); "none" keeps the frame still. Clips keep "none".
- headline: always "" (Jo: the only text on screen is the spoken captions at the bottom, plus the cards).
- why: a few words on your choice.
Good editing: the hook frame is strong and clean, the payoff gets the best frame, nothing feels busy.
summary: one sentence on the edit.
BRAND RULES (drawn by code, you cannot change them, edit within them): white, ink #12161F and lime #D6FF3D only; lime is only a highlighter behind ink text or text on ink, never lime text on white. Font Be Vietnam Pro, bold. Spoken captions at the bottom, white on ink, the stressed word in lime. Cards: white page, ink text, title on lime. Headlines and cards stay inside x 120 to 860, y 270 to 1220; spoken captions sit low, at y 1440, clear of her face and above the TikTok and Reels buttons. No AI label on the video. No logos, no prices, no em or en dashes. Calm and clean: a few strong words beat a busy screen.`

export class ClaudeEditor implements VideoEditor {
  constructor(private llm: Llm) {}
  async plan(input: { plan: EditPlan; scenes: readonly Scene[]; problems?: string[] }): Promise<EditorResult> {
    const rows = input.plan.scenes.map(e => {
      const sc = input.scenes.find(x => x.scene === e.scene)
      return { scene: e.scene, shot: e.shot ?? 'ella', seconds: `${e.start.toFixed(1)}-${e.end.toFixed(1)}`, voice: sc?.voice ?? '', emphasis: sc?.emphasis ?? '', defaultHeadline: e.headline, defaultZoom: e.zoom ?? 1, card: e.graphic ?? null }
    })
    const user = [
      'SCENES (the default cut):', JSON.stringify(rows, null, 1),
      ...(input.problems?.length ? ['', 'THE FINISHED VIDEO WAS CHECKED AND HAS THESE PROBLEMS. Change the edit to fix every one you can (for example drop a headline that covers the face):', ...input.problems.map(p => `- ${p}`)] : []),
      '', 'Return one decision for every scene.',
    ].join('\n')
    const r = await this.llm.complete(EDITOR_RULES, user, { jsonTool: EDITOR_TOOL, effort: 'low' })
    const j = JSON.parse(r.text) as EditorReply
    if (!Array.isArray(j.decisions)) throw new Error('The editor gave no decisions')
    return { ...j, model: r.model, inputTokens: r.inputTokens, outputTokens: r.outputTokens }
  }
}

const words = (t: string) => t.trim().split(/\s+/).filter(Boolean)

/** Applies Claude's decisions to the default edit, keeping only safe ones. */
export function applyEdit(plan: EditPlan, scenes: readonly Scene[], d: readonly EditDecision[]): EditPlan {
  let punches = 0
  const out = plan.scenes.map((e, i) => {
    const x = d.find(k => Number(k.scene) === e.scene)
    if (!x) return e
    const sc = scenes.find(s => s.scene === e.scene)
    const isElla = (e.shot ?? (sc ? shotOf(sc) : 'ella')) === 'ella'
    const prev = i > 0 ? plan.scenes[i - 1] : null
    let zoom = 1
    if (isElla && i > 0 && Number(x.zoom) > 1 && punches < 3 && !(prev && (prev.shot ?? 'ella') === 'ella' && d.find(k => k.scene === prev.scene && Number(k.zoom) > 1))) { zoom = 1.1; punches++ }
    let headline = e.headline, headlineHighlight = e.headlineHighlight
    if (!e.graphic && typeof x.headline === 'string' && x.headline.trim() === '') {
      const h = x.headline.trim()
      const ok = h === '' || (words(h).length <= 5 && !BANNED.some(b => b.re.test(h)) && !/\$|refund/i.test(h)
        // A hedged scene keeps its hedge on screen.
        && (!sc || !/\b(usually|may|can|some)\b/i.test(sc.onScreen) || /\b(usually|may|can|some)\b/i.test(h)))
      if (ok) {
        headline = h
        const hw = new Set(words(h.toLowerCase()).map(w => w.replace(/[^a-z0-9$]/g, '')))
        headlineHighlight = e.headlineHighlight.filter(w => hw.has(w.toLowerCase().replace(/[^a-z0-9$]/g, '')))
      }
    }
    const canMove = isElla || !!e.graphic
    const move = canMove ? (x.move === 'push' ? 'push' as const : x.move === 'none' ? undefined : e.move) : undefined
    return { ...e, zoom: isElla ? zoom : e.zoom, move, headline, headlineHighlight }
  })
  return { ...plan, scenes: out }
}
