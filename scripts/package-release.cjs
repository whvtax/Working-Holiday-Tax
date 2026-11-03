#!/usr/bin/env node
'use strict'
/**
 * Build a release zip from an ALLOWLIST, then refuse to ship it if anything dangerous is inside.
 *
 * Why: the project is handed over as a zip, and zip ignores .gitignore. A plain "zip -r ." would take
 * .env.local, .data/store.json (customer records and the WhatsApp token when Supabase is absent),
 * .audit-state, .claude, node_modules and .next with it.
 *
 * Usage:
 *   node scripts/package-release.cjs --out ../whvtax-release.zip [--profile deploy|source] [--root DIR] [--force]
 *   node scripts/package-release.cjs --check-only              # scan the allowlisted files, write nothing
 *
 * Profiles
 *   deploy (default): what Vercel needs to build and run, plus the lockfile and the env template.
 *   source: deploy plus tests, e2e, docs, scripts and the engineering notes, for handing the project over.
 *
 * Fails (exit 1, nothing written) when any allowlisted file or folder contains:
 *   .env files (except .env.example), node_modules, .next, .git, .data, key/cert files, credential files,
 *   database dumps, symlinks, credential-shaped strings, or a checksum-valid TFN next to a TFN word.
 * Findings are reported as file:line and TYPE only; matched values are never printed.
 * Exit codes: 0 ok, 1 refused (findings), 2 usage or environment error.
 */
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const { scanText, forbiddenReason, JUNK, scanBinaryForPem } = require('./lib/secret-scan.cjs')

const DEPLOY = [
  'src', 'public', 'config', 'supabase',
  'package.json', 'package-lock.json', 'next.config.js', 'next-env.d.ts', 'tsconfig.json',
  'tailwind.config.js', 'postcss.config.js', 'eslint.config.mjs', 'jest.config.js', 'vercel.json',
  '.vercelignore', '.gitignore', '.env.example', '.github',
]
const SOURCE_EXTRA = [
  '__tests__', 'e2e', 'docs', 'scripts', 'playwright.config.ts',
  'README.md', 'CLAUDE.md', 'AGENTS.md', 'PROJECT_HANDOFF.md',
]
const TEXT_EXT = /\.(?:[cm]?[jt]sx?|json|md|mdx|txt|ya?ml|html?|css|svg|sql|sh|py|toml|env|example|csv|xml|webmanifest|gitignore|vercelignore)$/i
const MAX_TEXT_BYTES = 3_000_000

function parseArgs(argv) {
  const a = { profile: 'deploy', root: path.resolve(__dirname, '..'), out: null, checkOnly: false, force: false }
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i]
    if (k === '--out') a.out = argv[++i]
    else if (k === '--profile') a.profile = argv[++i]
    else if (k === '--root') a.root = path.resolve(argv[++i])
    else if (k === '--check-only') a.checkOnly = true
    else if (k === '--force') a.force = true
    else return { error: `unknown argument ${k}` }
  }
  if (!['deploy', 'source'].includes(a.profile)) return { error: 'profile must be deploy or source' }
  if (!a.checkOnly && !a.out) return { error: 'missing --out <file.zip> (or use --check-only)' }
  return a
}

function plan(root, profile) {
  const entries = profile === 'source' ? [...DEPLOY, ...SOURCE_EXTRA] : DEPLOY
  const files = []
  const findings = []
  const walk = (rel) => {
    const abs = path.join(root, rel)
    let st
    try { st = fs.lstatSync(abs) } catch { return }
    const base = path.basename(rel)
    if (JUNK(base)) return
    const reason = forbiddenReason(base)
    if (reason) { findings.push({ file: rel, line: 0, type: `forbidden-${reason}` }); return }
    if (st.isSymbolicLink()) { findings.push({ file: rel, line: 0, type: 'symlink' }); return }
    if (st.isDirectory()) {
      for (const e of fs.readdirSync(abs).sort()) walk(path.posix.join(rel.split(path.sep).join('/'), e))
      return
    }
    if (!st.isFile()) { findings.push({ file: rel, line: 0, type: 'special-file' }); return }
    files.push({ rel: rel.split(path.sep).join('/'), size: st.size })
  }
  for (const e of entries) walk(e)
  return { files, findings }
}

function scanFiles(root, files) {
  const findings = []
  for (const f of files) {
    const abs = path.join(root, f.rel)
    const isText = TEXT_EXT.test(f.rel) || path.basename(f.rel).startsWith('.')
    if (!fs.existsSync(abs)) continue // vanished since the walk (an editor temp file): nothing to ship
    if (isText && f.size <= MAX_TEXT_BYTES) {
      const text = fs.readFileSync(abs, 'utf8')
      for (const h of scanText(text)) findings.push({ file: f.rel, line: h.line, type: h.type })
    } else if (isText) {
      findings.push({ file: f.rel, line: 0, type: 'text-file-too-large-to-scan' })
    } else if (f.size <= 20_000_000) {
      if (scanBinaryForPem(fs.readFileSync(abs))) findings.push({ file: f.rel, line: 0, type: 'private-key-block' })
    }
  }
  return findings
}

function report(findings) {
  for (const f of findings) process.stderr.write(`REFUSED ${f.file}${f.line ? ':' + f.line : ''} ${f.type}\n`)
}

function main() {
  const a = parseArgs(process.argv.slice(2))
  if (a.error) { process.stderr.write(`${a.error}\n`); return 2 }
  if (!fs.existsSync(path.join(a.root, 'package.json'))) { process.stderr.write('root has no package.json\n'); return 2 }

  const { files, findings: planFindings } = plan(a.root, a.profile)
  const findings = [...planFindings, ...scanFiles(a.root, files)]
  if (findings.length) { report(findings); process.stderr.write(`${findings.length} finding(s). No zip written.\n`); return 1 }
  if (files.length === 0) { process.stderr.write('nothing to package\n'); return 2 }
  if (a.checkOnly) { process.stdout.write(`OK ${files.length} files would be packaged (profile ${a.profile}). Nothing written.\n`); return 0 }

  const out = path.resolve(a.out)
  if (out.startsWith(a.root + path.sep)) {
    const rel = path.relative(a.root, out).split(path.sep).join('/')
    if (files.some((f) => f.rel === rel || rel.startsWith(f.rel + '/'))) { process.stderr.write('output path is inside the allowlisted tree\n'); return 2 }
  }
  if (fs.existsSync(out) && !a.force) { process.stderr.write('output exists; pass --force to replace it\n'); return 2 }

  const tmp = `${out}.partial`
  try { fs.rmSync(tmp, { force: true }) } catch { /* ignore */ }
  const list = files.map((f) => f.rel).join('\n') + '\n'
  const z = spawnSync('zip', ['-X', '-q', tmp, '-@'], { cwd: a.root, input: list, encoding: 'utf8' })
  if (z.status !== 0) { fs.rmSync(tmp, { force: true }); process.stderr.write('zip failed\n'); return 2 }

  // Verify the archive itself, not just the plan: list it and re-apply the name rules.
  const ls = spawnSync('unzip', ['-Z1', tmp], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  if (ls.status !== 0) { fs.rmSync(tmp, { force: true }); process.stderr.write('could not list the zip\n'); return 2 }
  const inZip = ls.stdout.split('\n').filter(Boolean).filter((n) => !n.endsWith('/'))
  const bad = []
  for (const n of inZip) for (const seg of n.split('/')) { const r = forbiddenReason(seg); if (r) bad.push({ file: n, line: 0, type: `forbidden-${r}` }) }
  const planned = new Set(files.map((f) => f.rel))
  for (const n of inZip) if (!planned.has(n)) bad.push({ file: n, line: 0, type: 'not-in-plan' })
  if (inZip.length !== files.length) bad.push({ file: '(archive)', line: 0, type: 'file-count-mismatch' })
  if (bad.length) { fs.rmSync(tmp, { force: true }); report(bad); process.stderr.write('Archive verification failed. No zip written.\n'); return 1 }

  fs.renameSync(tmp, out)
  process.stdout.write(`OK wrote ${path.basename(out)}: ${inZip.length} files (profile ${a.profile}), scanned clean.\n`)
  return 0
}

process.exitCode = main()
