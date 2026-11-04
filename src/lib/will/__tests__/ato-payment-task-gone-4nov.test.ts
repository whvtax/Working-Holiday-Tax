import { readFileSync, readdirSync, statSync } from 'fs';
import path from 'path';

// Jo, 4 Nov: "make 100 percent sure the ATO PAYMENT INSTRUCTIONS DUE task never comes back".
const root = path.join(process.cwd(), 'src');
function walk(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) { if (f !== '__tests__') walk(p, out); }
    else if (/\.(ts|tsx)$/.test(f)) out.push(p);
  }
  return out;
}

describe('no code can raise the ATO payment instructions task', () => {
  it('only the explanatory handoff-reasons table mentions the title', () => {
    const hits = walk(root).filter((p) => /ATO PAYMENT INSTRUCTIONS DUE/i.test(readFileSync(p, 'utf8')));
    expect(hits.map((p) => path.basename(p))).toEqual(['handoff-reasons.ts']);
  });

  it('the PAYABLE_FOLLOWUP job branch raises no task', () => {
    const src = readFileSync(path.join(root, 'lib/will/scheduler.ts'), 'utf8');
    const a = src.indexOf("if (job.kind === 'PAYABLE_FOLLOWUP')");
    const b = src.indexOf("if (job.kind === 'REFUND_CHECK')");
    const branch = src.slice(a, b);
    expect(branch).not.toMatch(/raiseOrUpdateTask|addTask\(/);
  });
});
