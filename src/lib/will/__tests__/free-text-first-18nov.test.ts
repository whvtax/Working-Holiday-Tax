/**
 * Jo's standing rule (18 Nov): before any paid Meta template, Will checks whether
 * the same words can go free inside the 24-hour window. deliverOut does that only
 * when the caller says the body IS the template's wording (fallbackToText: true).
 *
 * This scans every WhatsApp template object literal ({ name, params, ... }) in
 * src/lib/will and src/app/api/will. Each must carry `fallbackToText: true`,
 * unless it is built ONLY when the window is closed (`send.outsideWindow ? {...}`),
 * which is whitelisted explicitly below. Decision 018.
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.join(__dirname, '..', '..', '..', '..');
const DIRS = ['src/lib/will', 'src/app/api/will'];

function files(dir: string): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === '__tests__' || e.name === 'evals') continue;
      out.push(...files(rel));
    } else if (/\.tsx?$/.test(e.name) && !e.name.endsWith('.generated.ts')) out.push(rel);
  }
  return out;
}

/** Template literals built only outside the window, by file and the name expression they use. */
const OUTSIDE_WINDOW_ONLY: ReadonlyArray<[string, string]> = [
  ['src/app/api/will/actions/route.ts', 'name: sigKey'],
  ['src/app/api/will/actions/route.ts', 'name: lodgedKey'],
];

type Found = { file: string; line: number; literal: string; before: string };
function templateLiterals(): Found[] {
  const found: Found[] = [];
  for (const f of DIRS.flatMap(files)) {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const m of src.matchAll(/\{\s*name:[^{}]*?\bparams:[^{}]*?\}/g)) {
      const literal = m[0];
      // EXPECTED_META_TEMPLATES rows ({ name, params: 1, optional }) describe templates, they do not send one.
      if (/\boptional:/.test(literal)) continue;
      // Type declarations ({ name: string; params: string[] }) are not literals.
      if (/\bname:\s*string\b/.test(literal)) continue;
      found.push({ file: f, line: src.slice(0, m.index).split('\n').length, literal, before: src.slice(Math.max(0, (m.index ?? 0) - 120), m.index) });
    }
  }
  return found;
}

describe('free text first: every Meta template the code builds may go as free text inside the window', () => {
  const all = templateLiterals();

  it('finds the send paths (the scan is not empty)', () => {
    expect(all.length).toBeGreaterThan(10);
  });

  it('each template literal sets fallbackToText: true, or is built only outside the window (whitelisted)', () => {
    const offenders = all.filter((t) => {
      if (/fallbackToText:\s*true\b/.test(t.literal)) return false;
      const whitelisted = OUTSIDE_WINDOW_ONLY.some(([file, name]) => file === t.file && t.literal.includes(name));
      return !(whitelisted && /outsideWindow\s*\?\s*$/.test(t.before));
    }).map((t) => `${t.file}:${t.line} ${t.literal.replace(/\s+/g, ' ').slice(0, 120)}`);
    expect(offenders).toEqual([]);
  });

  it('the whitelisted ones really are built only when the window is closed', () => {
    for (const [file, name] of OUTSIDE_WINDOW_ONLY) {
      const hit = all.find((t) => t.file === file && t.literal.includes(name));
      expect(hit).toBeDefined();
      expect(hit!.before).toMatch(/outsideWindow\s*\?\s*$/);
    }
  });

  it('the two known gaps of 18 Nov are closed (payment received in service.ts, send_followup in actions)', () => {
    const service = fs.readFileSync(path.join(ROOT, 'src/lib/will/service.ts'), 'utf8');
    expect(service).toMatch(/waTemplate: \{ name: paymentReceivedTemplateKey\(metaTemplateLang\(customer\.lang\)\), params: \[\], lang: customer\.lang, fallbackToText: true \}/);
    const actions = fs.readFileSync(path.join(ROOT, 'src/app/api/will/actions/route.ts'), 'utf8');
    expect(actions).toMatch(/const waTemplate = \{ name: sendKey, params: \[firstName\], lang: customer\.lang, fallbackToText: true \}/);
  });
});
