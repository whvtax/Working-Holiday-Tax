/**
 * A place in Sydney CBD on every Instagram Reel (Jo, Nov 23): tagged by Instagram itself (location_id),
 * never written in the caption, and a different place picked at random each time.
 *
 * Instagram tags a place by the ID of a Facebook Page that has a location. The IDs come from:
 *   1. Settings ("Instagram places", Facebook Page IDs, comma separated), when Jo sets them; else
 *   2. Ella's own search: the Meta Pages search for well-known CBD places, keeping only Pages whose
 *      map point is inside the CBD. The list found is saved for 30 days.
 * If neither gives a place, the Reel is posted without one and one alert says why. A place never
 * stops a post: if Instagram refuses it, the Reel is posted again without a place.
 */
import type { MetaGraph } from './meta'

export const PLACES_KEY = 'ig_places'
const KEEP_DAYS = 30

/** Well-known places inside Sydney CBD, searched by name. */
export const CBD_SEARCHES = [
  'Sydney Town Hall', 'Martin Place Sydney', 'Hyde Park Sydney', 'Queen Victoria Building', 'Circular Quay',
  'Pitt Street Mall', 'Wynyard Sydney', 'Barangaroo', 'The Rocks Sydney', 'Sydney CBD', 'George Street Sydney', 'Museum station Sydney',
]
/** The CBD on the map: from Central to Circular Quay, Darling Harbour's edge to the Domain. */
export const CBD_BOX = { south: -33.8845, north: -33.8555, west: 151.198, east: 151.2165 }

export interface Place { id: string; name: string }
export interface PlacesStore { settings(keys: string[]): Promise<Record<string, unknown>>; setSettings(v: Record<string, unknown>): Promise<void> }

export const inCbd = (lat: number, lng: number) => lat >= CBD_BOX.south && lat <= CBD_BOX.north && lng >= CBD_BOX.west && lng <= CBD_BOX.east

/** IDs typed in Settings: digits only, comma or space separated. */
export const parseIds = (raw: string | undefined) => [...new Set(String(raw ?? '').split(/[\s,]+/).map(x => x.replace(/\D/g, '')).filter(x => x.length >= 5))]

/** Searches Meta for CBD places. Throws when the token may not search Pages. */
export async function searchCbdPlaces(graph: Pick<MetaGraph, 'get'>): Promise<Place[]> {
  const found = new Map<string, Place>()
  let lastError: unknown = null, ok = 0
  for (const q of CBD_SEARCHES) {
    try {
      const r = await graph.get<{ data?: Array<{ id: string; name?: string; location?: { latitude?: number; longitude?: number } }> }>('pages/search', { q, fields: 'id,name,location', limit: '10' })
      ok++
      for (const p of r.data ?? []) {
        const lat = Number(p.location?.latitude), lng = Number(p.location?.longitude)
        if (p.id && Number.isFinite(lat) && Number.isFinite(lng) && inCbd(lat, lng)) found.set(p.id, { id: p.id, name: p.name ?? q })
      }
    } catch (e) { lastError = e }
  }
  if (!ok && lastError) throw lastError
  return [...found.values()]
}

/** Every place Ella may tag: Settings first, else the saved search (redone after 30 days). */
export async function cbdPlaces(store: PlacesStore, graph: Pick<MetaGraph, 'get'>, settingsIds: string | undefined, now: number): Promise<{ places: Place[]; error?: string }> {
  const typed = parseIds(settingsIds)
  if (typed.length) return { places: typed.map(id => ({ id, name: `Page ${id}` })) }
  const saved = (await store.settings([PLACES_KEY]))[PLACES_KEY] as { at: number; places: Place[] } | undefined
  if (saved?.places?.length && now - saved.at < KEEP_DAYS * 86400_000) return { places: saved.places }
  try {
    const places = await searchCbdPlaces(graph)
    if (places.length) await store.setSettings({ [PLACES_KEY]: { at: now, places } })
    return places.length ? { places } : { places: [], error: 'the Meta search found no Page with a map point inside Sydney CBD' }
  } catch (e) {
    return { places: [], error: String((e as Error)?.message ?? e).slice(0, 300) }
  }
}

/**
 * Creates the Reel with the place; if Instagram refuses the place, creates it again without one.
 * Returns the container and the place that was kept (null when none).
 */
export async function createWithPlace(
  create: (locationId?: string) => Promise<string>, place: Place | null, onRefused: (error: string) => Promise<void>,
): Promise<{ containerId: string; place: Place | null }> {
  if (!place) return { containerId: await create(), place: null }
  try { return { containerId: await create(place.id), place } } catch (e) {
    await onRefused(String((e as Error)?.message ?? e).slice(0, 300))
    return { containerId: await create(), place: null }
  }
}

/** One place at random. */
export const pickPlace = (places: Place[], rand: () => number = Math.random): Place | null => (places.length ? places[Math.floor(rand() * places.length) % places.length] : null)
