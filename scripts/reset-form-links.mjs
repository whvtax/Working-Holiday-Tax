#!/usr/bin/env node
// Reset every questionnaire link (Jo, 29 Oct). Usage:
//   node scripts/reset-form-links.mjs --set=tax-form=start --apply   (one chosen slug only)
//   node scripts/reset-form-links.mjs            dry run: prints what would change
//   node scripts/reset-form-links.mjs --apply    does it
// Old slugs are read from config/form-paths.js. New ones are random. After
// --apply the old paths no longer exist, next.config.js sends them to the
// "this link opens after payment" page, and the full old -> new list is
// printed for Meta. Run tsc, eslint and jest afterwards.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const apply = process.argv.includes('--apply')
const cur = require(path.join(root, 'config/form-paths.js'))
const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789'
const token = () => Array.from(crypto.randomBytes(9), (b) => ALPHABET[b % ALPHABET.length]).join('')

// --set tax-form=start  changes ONLY the named WHT page to a chosen readable
// slug (repeat for more pages); every other slug stays as it is.
const sets = Object.fromEntries(process.argv.filter((a) => a.startsWith('--set=')).map((a) => a.slice(6).split('=')))
const next = { WHT: {}, SVT: {} }
if (Object.keys(sets).length) {
  for (const k of Object.keys(sets)) {
    if (!(k in cur.WHT)) { console.error('unknown WHT page:', k); process.exit(1) }
    if (!/^[a-z0-9-]{3,40}$/.test(sets[k])) { console.error('bad slug:', sets[k]); process.exit(1) }
  }
  Object.assign(next.WHT, cur.WHT, sets)
  Object.assign(next.SVT, cur.SVT)
} else {
  for (const k of Object.keys(cur.WHT)) next.WHT[k] = token()
  for (const k of Object.keys(cur.SVT)) next.SVT[k] = token()
}

const TEXT_EXT = /\.(ts|tsx|js|mjs|cjs|json|md|css|txt|sql|html|yml|yaml)$/
const SKIP = /(^|\/)(node_modules|\.next|\.data|\.git|\.audit-state|coverage|test-results|playwright-report)(\/|$)/
const isSvtFile = (p) => /svt/i.test(p)
// Line by line: a line that names SVT (or its domain) uses the SVT slugs, so a
// file that holds both brands (Will's brand voice, the isolation tests) is
// handled correctly. Lines that name both brands need a hand check.
const isSvtLine = (rel, line) => /svt|studentvisatax/i.test(line) || (isSvtFile(rel) && !/workingholidaytax|\bwht\b/i.test(line))

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    const rel = path.relative(root, full)
    if (SKIP.test(rel)) continue
    if (e.isDirectory()) walk(full, out)
    else if (TEXT_EXT.test(e.name) && rel !== 'config/form-paths.js' && !rel.startsWith('scripts/reset-form-links')) out.push(rel)
  }
  return out
}

// A slug is a link only when it follows a quote, backtick, "(", "=", a domain,
// "}" (${SITE_URL}) or a locale segment, and is not the start of a longer word.
// Storage object paths such as 'uploads/tax-form/invoices' and the API routes
// '/api/tax-form' never match: they follow a word, not one of those.
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const LEAD = String.raw`(["'\`(=]|\.au|\.com|\}|\/(?:de|ja|zh|vi))`
const linkRe = (slug, extraNot = '') => new RegExp(`${LEAD}\\/${esc(slug)}(?![\\w-]${extraNot})`, 'g')
const escRe = (slug) => new RegExp(String.raw`\\\/${esc(slug)}(?![\w-]|\\\/(?:invoices|selfie|bank))`, 'g') // regex literals: \/tax-form
const STORAGE = String.raw`|\/(?:invoices|selfie|bank)\b`

function rewriteLine(rel, line) {
  let t = line
  // imports that reach into a form folder, e.g. '@/app/(site)/tax-form/FormClient'
  for (const k of Object.keys(cur.WHT)) t = t.replace(new RegExp(`(\\(site\\)\\/)${esc(cur.WHT[k])}(?=\\/)`, 'g'), `$1${next.WHT[k]}`)
  if (isSvtLine(rel, line)) {
    t = t.replace(new RegExp(`${LEAD}\\/${esc(cur.SVT.form)}\\/${esc(cur.SVT.residency)}(?![\\w-])`, 'g'), `$1/${next.SVT.form}/${next.SVT.residency}`)
    t = t.replace(new RegExp(`${LEAD}\\/${esc(cur.SVT.form)}(?![\\w-]${STORAGE})`, 'g'), `$1/${next.SVT.form}`)
    t = t.replace(escRe(cur.SVT.form), `\\/${next.SVT.form}`)
  } else {
    for (const k of Object.keys(cur.WHT)) {
      t = t.replace(new RegExp(`${LEAD}\\/${esc(cur.WHT[k])}(?![\\w-]${STORAGE})`, 'g'), `$1/${next.WHT[k]}`)
      t = t.replace(escRe(cur.WHT[k]), `\\/${next.WHT[k]}`)
    }
  }
  return t
}
const rewrite = (rel, text) => text.split('\n').map((l) => rewriteLine(rel, l)).join('\n')

const changes = []
for (const rel of walk(root)) {
  const full = path.join(root, rel)
  const before = fs.readFileSync(full, 'utf8')
  const after = rewrite(rel, before)
  if (after !== before) {
    changes.push(rel)
    if (apply) fs.writeFileSync(full, after)
  }
}

// Folder renames. WHT: (site)/x, (de)/de/x, (ja)/ja/x. SVT: the form folder
// and, inside the English one, the residency folder.
const renames = []
for (const k of Object.keys(cur.WHT)) {
  for (const base of ['src/app/(site)', 'src/app/(de)/de', 'src/app/(ja)/ja']) {
    renames.push([`${base}/${cur.WHT[k]}`, `${base}/${next.WHT[k]}`])
  }
}
for (const base of ['src/app/(svt)/svt-site', 'src/app/(svt-zh)/svt-site/zh', 'src/app/(svt-vi)/svt-site/vi']) {
  renames.push([`${base}/${cur.SVT.form}/${cur.SVT.residency}`, `${base}/${cur.SVT.form}/${next.SVT.residency}`])
  renames.push([`${base}/${cur.SVT.form}`, `${base}/${next.SVT.form}`])
}
for (const [a, b] of renames) {
  if (!fs.existsSync(path.join(root, a))) { console.log('  (no folder)', a); continue }
  console.log(apply ? 'rename' : 'would rename', a, '->', b)
  if (apply) fs.renameSync(path.join(root, a), path.join(root, b))
}
console.log(`${apply ? 'rewrote' : 'would rewrite'} ${changes.length} files`)
if (!apply) console.log(changes.join('\n'))

if (apply) {
  const reg = fs.readFileSync(path.join(root, 'config/form-paths.js'), 'utf8')
  const out = reg
    .replace(/const WHT = \{[\s\S]*?\n\}/, `const WHT = {\n${Object.entries(next.WHT).map(([k, v]) => `  '${k}': '${v}',`).join('\n')}\n}`)
    .replace(/const RETIRED = \[[^\]]*\]/, `const RETIRED = [${[...new Set([...cur.RETIRED, ...Object.keys(cur.WHT).filter((k) => cur.WHT[k] !== next.WHT[k]).map((k) => cur.WHT[k])])].map((v) => `'${v}'`).join(', ')}]`)
    .replace(/const SVT = \{[^\n]*\}/, `const SVT = { form: '${next.SVT.form}', residency: '${next.SVT.residency}' }`)
  fs.writeFileSync(path.join(root, 'config/form-paths.js'), out)
}

console.log('\nOLD -> NEW (paste into Meta)')
const SITE = 'https://workingholidaytax.com.au'
for (const k of Object.keys(cur.WHT)) {
  for (const loc of ['', '/de', '/ja']) console.log(`${SITE}${loc}/${cur.WHT[k]}  ->  ${SITE}${loc}/${next.WHT[k]}`)
}
const SV = 'https://studentvisatax.com.au'
for (const loc of ['', '/zh', '/vi']) console.log(`${SV}${loc}/${cur.SVT.form}  ->  ${SV}${loc}/${next.SVT.form}`)
console.log(`${SV}/${cur.SVT.form}/${cur.SVT.residency}  ->  ${SV}/${next.SVT.form}/${next.SVT.residency}`)
