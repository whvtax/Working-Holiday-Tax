// Ella's wardrobe: the approved reference photos, one per look, that HeyGen
// animates for the Ella take. The list lives in code (not in the saved
// settings) so a new photo goes live with the next deploy.
//
// Jo, 25 Nov: every video gets a different look, drawn at random. Rule in code:
//   - never the same look twice in a row
//   - a full cycle: the look is drawn only from looks not yet used in this cycle;
//     when every look has had a turn, a new cycle starts
//   - once a video has a look it keeps it (later runs, scene redos, re-renders).
//
// To add a look: put the photo in assets/character/ as a JPEG (quality 92, 1080 x 1912;
// face to camera, no text or logos) and add one line below. Nothing else changes.

export interface EllaLook {
  id: string
  /** Where the photo is kept in Ella's media store. */
  path: string
  /** File name in src/lib/ella/assets/character/. */
  file: string
  /** What she wears, for people reading the code and the log. */
  label: string
}

export const ELLA_LOOKS: readonly EllaLook[] = [
  { id: 'L1', path: 'looks/ella-master.png', file: 'ella-master.png', label: 'Cream V-neck sweater over a light blue collar, hair down' },
  { id: 'L2', path: 'looks/ella-L2.jpg', file: 'ella-L2.jpg', label: 'Olive overshirt over a white T-shirt, hair down' },
  { id: 'L3', path: 'looks/ella-L3.jpg', file: 'ella-L3.jpg', label: 'Navy sweater with a white collar, low ponytail' },
  { id: 'L4', path: 'looks/ella-L4.jpg', file: 'ella-L4.jpg', label: 'White shirt, standing at the desk, half-up hair' },
  { id: 'L5', path: 'looks/ella-L5.jpg', file: 'ella-L5.jpg', label: 'Sage green cardigan over a cream top, window on the right' },
  { id: 'L6', path: 'looks/ella-L6.jpg', file: 'ella-L6.jpg', label: 'Denim shirt at the desk, low bun' },
  { id: 'L7', path: 'looks/ella-L7.jpg', file: 'ella-L7.jpg', label: 'Grey quarter-zip sweater, evening light' },
  { id: 'L8', path: 'looks/ella-L8.jpg', file: 'ella-L8.jpg', label: 'Cream blazer over a black top' },
  { id: 'L9', path: 'looks/ella-L9.jpg', file: 'ella-L9.jpg', label: 'Camel turtleneck, standing by the window, ponytail' },
  { id: 'L10', path: 'looks/ella-L10.jpg', file: 'ella-L10.jpg', label: 'Sky blue blouse, hair down' },
  { id: 'L11', path: 'looks/ella-L11.jpg', file: 'ella-L11.jpg', label: 'Burgundy V-neck sweater, soft curls' },
  { id: 'L12', path: 'looks/ella-L12.jpg', file: 'ella-L12.jpg', label: 'Beige knit vest over a white shirt, hair down' },
  { id: 'L13', path: 'looks/ella-L13.jpg', file: 'ella-L13.jpg', label: 'Black cardigan over a white T-shirt, low ponytail' },
  { id: 'L14', path: 'looks/ella-L14.jpg', file: 'ella-L14.jpg', label: 'Dusty pink sweater at the desk, half-up hair' },
  { id: 'L15', path: 'looks/ella-L15.jpg', file: 'ella-L15.jpg', label: 'White linen shirt, standing by the shelves' },
  { id: 'L16', path: 'looks/ella-L16.jpg', file: 'ella-L16.jpg', label: 'Mustard cardigan, side braid' },
  { id: 'L17', path: 'looks/ella-L17.jpg', file: 'ella-L17.jpg', label: 'Light grey blazer over a navy top, low bun' },
  { id: 'L18', path: 'looks/ella-L18.jpg', file: 'ella-L18.jpg', label: 'Navy and white striped top at the desk' },
  { id: 'L19', path: 'looks/ella-L19.jpg', file: 'ella-L19.jpg', label: 'Bottle green sweater at the desk, high ponytail' },
  { id: 'L20', path: 'looks/ella-L20.jpg', file: 'ella-L20.jpg', label: 'Denim jacket over a stone knit dress' },
  { id: 'L21', path: 'looks/ella-L21.jpg', file: 'ella-L21.jpg', label: 'Chocolate brown knit polo, low ponytail' },
  { id: 'L23', path: 'looks/ella-L23.jpg', file: 'ella-L23.jpg', label: 'Olive shirt dress, standing at the desk' },
  { id: 'L25', path: 'looks/ella-L25.jpg', file: 'ella-L25.jpg', label: 'Beige trench over a black sweater, by the window' },
  { id: 'L26', path: 'looks/ella-L26.jpg', file: 'ella-L26.jpg', label: 'Mint satin blouse, braid' },
  { id: 'L27', path: 'looks/ella-L27.jpg', file: 'ella-L27.jpg', label: 'Chambray shirt in the kitchen' },
  { id: 'L29', path: 'looks/ella-L29.jpg', file: 'ella-L29.jpg', label: 'Khaki overshirt over a white T-shirt' },
  { id: 'L30', path: 'looks/ella-L30.jpg', file: 'ella-L30.jpg', label: 'Charcoal turtleneck by the hallway bookcase, high bun' },
  { id: 'L31', path: 'looks/ella-L31.jpg', file: 'ella-L31.jpg', label: 'Terracotta cardigan in the coffee corner, side braid' },
  { id: 'L32', path: 'looks/ella-L32.jpg', file: 'ella-L32.jpg', label: 'Cobalt blue sweater by the cork board' },
  { id: 'L33', path: 'looks/ella-L33.jpg', file: 'ella-L33.jpg', label: 'White ribbed top at the round dining table' },
  { id: 'L35', path: 'looks/ella-L35.jpg', file: 'ella-L35.jpg', label: 'Pale yellow cardigan in the reading armchair' },
  { id: 'L36', path: 'looks/ella-L36.jpg', file: 'ella-L36.jpg', label: 'Sand linen blazer at the standing desk' },
  { id: 'L37', path: 'looks/ella-L37.jpg', file: 'ella-L37.jpg', label: 'Blue V-neck sweater on the stairs, low bun' },
  { id: 'L38', path: 'looks/ella-L38.jpg', file: 'ella-L38.jpg', label: 'Sage shirt in the laundry, high ponytail' },
  { id: 'L39', path: 'looks/ella-L39.jpg', file: 'ella-L39.jpg', label: 'White short-sleeve shirt in the garden' },
  { id: 'L41', path: 'looks/ella-L41.jpg', file: 'ella-L41.jpg', label: 'Forest green cardigan in the mustard armchair' },
  { id: 'L42', path: 'looks/ella-L42.jpg', file: 'ella-L42.jpg', label: 'Grey sweater with a white collar, side braid' },
  { id: 'L43', path: 'looks/ella-L43.jpg', file: 'ella-L43.jpg', label: 'Navy knit polo at the kitchen table, green tiles' },
  { id: 'L44', path: 'looks/ella-L44.jpg', file: 'ella-L44.jpg', label: 'Cream blouse with a navy scarf, by the shutters' },
  { id: 'L45', path: 'looks/ella-L45.jpg', file: 'ella-L45.jpg', label: 'Camel sweater on the living room rug' },
  { id: 'L46', path: 'looks/ella-L46.jpg', file: 'ella-L46.jpg', label: 'White cardigan by the green study wall' },
  { id: 'L47', path: 'looks/ella-L47.jpg', file: 'ella-L47.jpg', label: 'Blush pink shirt on the window seat, high bun' },
  { id: 'L48', path: 'looks/ella-L48.jpg', file: 'ella-L48.jpg', label: 'Denim shirt in the kitchen, low ponytail' },
  { id: 'L50', path: 'looks/ella-L50.jpg', file: 'ella-L50.jpg', label: 'Sky blue sweater by the garden doors' },
  { id: 'L51', path: 'looks/ella-L51.jpg', file: 'ella-L51.jpg', label: 'Charcoal sweater on the round pouf, low bun' },
  { id: 'L52', path: 'looks/ella-L52.jpg', file: 'ella-L52.jpg', label: 'Olive knit vest in the sunroom, side braid' },
  { id: 'L53', path: 'looks/ella-L53.jpg', file: 'ella-L53.jpg', label: 'Ivory turtleneck in the leather armchair, evening' },
  { id: 'L54', path: 'looks/ella-L54.jpg', file: 'ella-L54.jpg', label: 'Navy cardigan with a white collar in the hallway' },
  { id: 'L55', path: 'looks/ella-L55.jpg', file: 'ella-L55.jpg', label: 'Taupe sweater at the table, city window' },
  { id: 'L56', path: 'looks/ella-L56.jpg', file: 'ella-L56.jpg', label: 'Sage sweater by the cube shelves' },
  { id: 'L57', path: 'looks/ella-L57.jpg', file: 'ella-L57.jpg', label: 'Coral cardigan in the rattan chair' },
  { id: 'L58', path: 'looks/ella-L58.jpg', file: 'ella-L58.jpg', label: 'Navy V-neck by the whiteboard, high ponytail' },
  { id: 'L59', path: 'looks/ella-L59.jpg', file: 'ella-L59.jpg', label: 'Cream cable cardigan on the emerald sofa' },
  { id: 'L60', path: 'looks/ella-L60.jpg', file: 'ella-L60.jpg', label: 'Camel cardigan in the charcoal kitchen' },
  { id: 'L62', path: 'looks/ella-L62.jpg', file: 'ella-L62.jpg', label: 'Beige trench by the front door' },
  { id: 'L64', path: 'looks/ella-L64.jpg', file: 'ella-L64.jpg', label: 'Grey cardigan by the blue curtains, high bun' },
  { id: 'L65', path: 'looks/ella-L65.jpg', file: 'ella-L65.jpg', label: 'Cream turtleneck by the fireplace' },
  { id: 'L66', path: 'looks/ella-L66.jpg', file: 'ella-L66.jpg', label: 'White linen shirt on the balcony' },
  { id: 'L67', path: 'looks/ella-L67.jpg', file: 'ella-L67.jpg', label: 'Pale blue blouse on the veranda' },
  { id: 'L68', path: 'looks/ella-L68.jpg', file: 'ella-L68.jpg', label: 'Striped shirt dress by the bookshelf' },
  { id: 'L69', path: 'looks/ella-L69.jpg', file: 'ella-L69.jpg', label: 'Mint knit top on the sofa' },
  { id: 'L70', path: 'looks/ella-L70.jpg', file: 'ella-L70.jpg', label: 'Lemon blouse by the desk' },
  { id: 'L71', path: 'looks/ella-L71.jpg', file: 'ella-L71.jpg', label: 'Denim jacket over a sky blue dress, side braid' },
  { id: 'L73', path: 'looks/ella-L73.jpg', file: 'ella-L73.jpg', label: 'Peach blouse at the white desk' },
  { id: 'L74', path: 'looks/ella-L74.jpg', file: 'ella-L74.jpg', label: 'Navy knit top by the shutters' },
  { id: 'L75', path: 'looks/ella-L75.jpg', file: 'ella-L75.jpg', label: 'Light olive linen shirt at the dining table' },
  { id: 'L76', path: 'looks/ella-L76.jpg', file: 'ella-L76.jpg', label: 'Sage midi dress by the white stairs, high bun' },
  { id: 'L77', path: 'looks/ella-L77.jpg', file: 'ella-L77.jpg', label: 'White top and navy skirt under the pergola' },
  { id: 'L78', path: 'looks/ella-L78.jpg', file: 'ella-L78.jpg', label: 'Powder blue vest in the blue kitchen' },
  { id: 'L79', path: 'looks/ella-L79.jpg', file: 'ella-L79.jpg', label: 'Cream knit polo in the hanging chair' },
  { id: 'L80', path: 'looks/ella-L80.jpg', file: 'ella-L80.jpg', label: 'White shirt by the terracotta wall, side braid' },
  { id: 'L81', path: 'looks/ella-L81.jpg', file: 'ella-L81.jpg', label: 'Lilac knit top by the herb window' },
  { id: 'L82', path: 'looks/ella-L82.jpg', file: 'ella-L82.jpg', label: 'Cream short-sleeve blazer over a blue top' },
  { id: 'L83', path: 'looks/ella-L83.jpg', file: 'ella-L83.jpg', label: 'Blue-grey top at the desk by the arched window, high bun' },
  { id: 'L84', path: 'looks/ella-L84.jpg', file: 'ella-L84.jpg', label: 'Mustard shirt dress by the sideboard' },
  { id: 'L87', path: 'looks/ella-L87.jpg', file: 'ella-L87.jpg', label: 'Forest green blouse at the terracotta kitchen' },
]

/** Saved in ella_settings under LOOK_ROTATION_KEY. */
export interface LookRotation {
  /** Look given to each video, by production id. */
  assigned: Record<string, string>
  /** Looks in the order they were given out, oldest first. */
  history: string[]
  /** Looks already used in the current cycle. */
  cycle: string[]
}

export const LOOK_ROTATION_KEY = 'look_rotation'
const KEEP_ASSIGNED = 200
const KEEP_HISTORY = 400

export function readRotation(raw: unknown): LookRotation {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Partial<LookRotation>
  const assigned = r.assigned && typeof r.assigned === 'object' && !Array.isArray(r.assigned) ? { ...r.assigned } : {}
  const strings = (x: unknown) => (Array.isArray(x) ? x.filter((v): v is string => typeof v === 'string') : [])
  return { assigned, history: strings(r.history), cycle: strings(r.cycle) }
}

/**
 * The next look: drawn at random from the looks not yet used in this cycle, never the last one.
 * When the cycle is used up, a new cycle starts (still never the last one).
 */
export function nextLook(ids: readonly string[], rotation: Pick<LookRotation, 'history' | 'cycle'>, rng: () => number = Math.random): { lookId: string; cycle: string[] } {
  if (!ids.length) throw new Error('No Ella looks configured')
  const last = rotation.history[rotation.history.length - 1]
  if (ids.length === 1) return { lookId: ids[0], cycle: [] }
  const used = new Set(rotation.cycle.filter(id => ids.includes(id)))
  let pool = ids.filter(id => !used.has(id) && id !== last)
  let cycle = [...used]
  if (!pool.length) { pool = ids.filter(id => id !== last); cycle = [] }
  const lookId = pool[Math.min(pool.length - 1, Math.floor(rng() * pool.length))]
  return { lookId, cycle: [...cycle, lookId] }
}

/**
 * The look for one video. A video that already has a look keeps it; otherwise the next
 * look in the cycle is given and recorded. Returns the (possibly unchanged) rotation.
 */
export function assignLook(ids: readonly string[], rotation: LookRotation, productionId: string, rng: () => number = Math.random): { lookId: string; rotation: LookRotation; changed: boolean } {
  const kept = rotation.assigned[productionId]
  if (kept && ids.includes(kept)) return { lookId: kept, rotation, changed: false }
  const { lookId, cycle } = nextLook(ids, rotation, rng)
  const assignedEntries = Object.entries({ ...rotation.assigned, [productionId]: lookId }).slice(-KEEP_ASSIGNED)
  return {
    lookId,
    rotation: { assigned: Object.fromEntries(assignedEntries), history: [...rotation.history, lookId].slice(-KEEP_HISTORY), cycle },
    changed: true,
  }
}

export function lookFile(path: string): string {
  return ELLA_LOOKS.find(l => l.path === path)?.file ?? 'ella-master.png'
}
