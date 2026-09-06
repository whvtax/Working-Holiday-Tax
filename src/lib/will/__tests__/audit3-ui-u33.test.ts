/**
 * Task ✕ and the full handoff reason were hover-only, so on a phone (no
 * hover) the dismiss button was invisible and the reason was clipped to 8
 * words with no way to see the rest (audit, 5 Sep). Same task set, same
 * wording, same actions: only what a coarse pointer can see changes.
 *
 * (Jo, 6 Sep: this file used to also pin the numbered quick-fill chips'
 * coarse-pointer caption — the chips themselves were removed entirely along
 * with their CSS, since Will already sends these automatically. Those two
 * assertions are gone; the task-list assertions below are unaffected.)
 */
import fs from 'fs';
import path from 'path';

describe('task list is usable on touch, not just on hover', () => {
  const css = fs.readFileSync(
    path.join(process.cwd(), 'src/app/(site)/crm/whatsapp/will-scoped.css'),
    'utf8'
  );

  const coarseBlockMatch = css.match(/@media\(hover:none\),\(pointer:coarse\)\{([\s\S]*?)\n\}/);

  it('has a coarse-pointer media block', () => {
    expect(coarseBlockMatch).toBeTruthy();
  });

  const coarseBlock = coarseBlockMatch ? coarseBlockMatch[1] : '';

  it('makes the task dismiss button visible without hover', () => {
    // base rule still hides it until hover, for mouse users
    expect(css).toMatch(/\.will-scope \.task:hover \.tdismiss\{opacity:1\}/);
    expect(coarseBlock).toMatch(/\.will-scope \.tdismiss\{opacity:1\}/);
  });

  it('lets the full handoff reason wrap instead of staying a clipped nowrap line', () => {
    expect(css).toMatch(/\.will-scope \.ttitle\{[^}]*white-space:nowrap/);
    expect(coarseBlock).toMatch(/\.will-scope \.ttitle\{white-space:normal\}/);
  });
});
