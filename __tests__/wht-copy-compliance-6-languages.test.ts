/**
 * Working Holiday Tax public copy, all six languages: the business is never
 * described as a tax agent and a refund is never promised.
 *
 * 5 Nov 2026: the ATO address guide said "our tax agent team" in EN, DE, FR,
 * IT and ES (it reached Google through the Article abstract in JSON-LD, with
 * about 7,700 impressions in three months). The only allowed wording is the
 * approved sentence ("Reviewed and signed off by a registered tax agent ...")
 * and its approved translations, which describe someone else, not us.
 *
 * Reads the source files as text, so it covers pages, guide bodies, titles,
 * descriptions and anything that ends up in JSON-LD.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOTS = ['(site)', '(de)', '(ja)', '(fr)', '(it)', '(es)'].map((g) => join(__dirname, '..', 'src', 'app', g))

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) return name === 'crm' || name === '__tests__' ? [] : files(p)
    return /\.(ts|tsx)$/.test(name) ? [p] : []
  })
}

// Code comments may name the rule itself ("never say we are a tax agent").
const stripComments = (s: string) => s.replace(/^\s*(\/\/|\*|\/\*).*$/gm, '')

const AGENT_CLAIM = new RegExp([
  String.raw`\b(we are|we're|we act as|as your) (a |an )?(registered )?tax agents?\b`,
  String.raw`\bour (registered )?tax agents?\b`,
  String.raw`tax[ -]agent[ -]team`,
  String.raw`unsere[rn]? (registrierte[rn]? )?(Steuerberater|Steueragent|Tax[ -]Agent)`,
  String.raw`wir sind (ein |eine )?(registrierte[rn]? )?(Steuerberater|Steueragent|Tax Agent)`,
  String.raw`(当社|私たち|弊社)(は|の)(登録)?税理士`,
  String.raw`税理士事務所です`,
  String.raw`nous sommes (un |des )?(agents? fiscaux?|agent fiscal|experts?-comptables?)`,
  String.raw`notre équipe d.agents`,
  String.raw`nos agents fiscaux`,
  String.raw`siamo (un |degli )?(agent[ei] fiscal[ei]|commercialist[ai])`,
  String.raw`nostro team di (tax )?agent`,
  String.raw`i nostri agenti`,
  String.raw`somos (un |unos )?(agentes? (fiscal|tributari)|contador)`,
  String.raw`nuestro equipo de agentes`,
  String.raw`nuestros agentes`,
].join('|'), 'i')

const REFUND_PROMISE = new RegExp([
  'guaranteed refund',
  String.raw`you will (get|receive) (a |your )?refund`,
  'refund of at least',
  String.raw`garantierte (Rück)?erstattung`,
  '必ず(還付|戻)',
  '確実に(還付|戻)',
  'remboursement garanti',
  'rimborso garantit',
  String.raw`devoluci[oó]n garantizad`,
  'reembolso garantizad',
].join('|'), 'i')

describe('WHT public copy in six languages', () => {
  const all = ROOTS.flatMap(files)

  it('scans the guide data of every language', () => {
    expect(all.length).toBeGreaterThan(100)
    for (const g of ['(fr)', '(it)', '(es)']) expect(all.some((f) => f.includes(g) && f.includes('chunks'))).toBe(true)
  })

  it('never describes the business as a tax agent', () => {
    const hits = all.flatMap((f) => {
      const m = stripComments(readFileSync(f, 'utf8')).match(new RegExp(`.{0,50}(${AGENT_CLAIM.source}).{0,30}`, 'gi'))
      return m ? m.map((x) => `${f.split('src/app/')[1]}: ${x}`) : []
    })
    expect(hits).toEqual([])
  })

  it('never promises a refund', () => {
    const hits = all.flatMap((f) => {
      const m = stripComments(readFileSync(f, 'utf8')).match(new RegExp(`.{0,50}(${REFUND_PROMISE.source}).{0,30}`, 'gi'))
      return m ? m.map((x) => `${f.split('src/app/')[1]}: ${x}`) : []
    })
    expect(hits).toEqual([])
  })
})
