/**
 * Chat composer sizing and the AI toggle's honesty (audit, 5 Sep).
 *
 * The compose box has rows={1} and used to grow only inside onChange, so a
 * Quick-fill template dropped in with setComposer showed as a one-line strip
 * the operator had to scroll inside to read, and the ➤ click path never
 * shrank the box back after a send (only the Enter path did). Now the box is
 * fitted from an effect on the composer value, which covers typing, quick-fill
 * and both send paths with one piece of code.
 *
 * The Will Active/Paused toggle toasted success without reading the reply, so
 * a refused toggle showed the wrong status until the next poll.
 *
 * Dashboard is a large client component, so this pins the wiring by source
 * shape.
 */
import fs from 'fs';
import path from 'path';

const src = fs.readFileSync(
  path.join(process.cwd(), 'src/components/will/Dashboard.tsx'),
  'utf8',
);

function between(start: string, end: string): string {
  const a = src.indexOf(start);
  expect(a).toBeGreaterThan(-1);
  const b = src.indexOf(end, a);
  expect(b).toBeGreaterThan(a);
  return src.slice(a, b);
}

describe('chat composer fits its text on every path', () => {
  it('has a ref and a fitComposer helper capped at 140px', () => {
    expect(src).toContain('const composerRef = useRef<HTMLTextAreaElement>(null);');
    const helper = between('const fitComposer = () => {', '};');
    expect(helper).toContain("el.style.height = 'auto'");
    expect(helper).toContain("Math.min(el.scrollHeight, 140) + 'px'");
  });

  it('re-fits whenever the composer value changes (typing, quick-fill, send)', () => {
    expect(src).toContain('useEffect(() => { fitComposer(); }, [composer]);');
  });

  it('the textarea carries the ref and no longer sizes itself only in onChange', () => {
    const box = between('<div className="composer">', '</div>');
    expect(box).toContain('ref={composerRef}');
    expect(box).toContain('onChange={(e) => setComposer(e.target.value)}');
    expect(box).not.toContain('el.style.height');
  });

  it('both send paths clear the composer on success so the effect shrinks the box', () => {
    const box = between('<div className="composer">', '</div>');
    const clears = box.match(/if \(sent\) setComposer\(''\)/g) ?? [];
    expect(clears.length).toBe(2);
  });

  // Jo, 6 Sep: the numbered "1 2 3 4" Quick-fill chips (className="chipbtn
  // qsnum") that this used to pin were removed entirely — Will already
  // sends these automatically, so the manual chip had no use case left.
});

describe('Will Active/Paused toggle reports what the server did', () => {
  it('reads the reply and toasts the error when the toggle is refused', () => {
    const toggle = between("const r = await act({ action: 'toggle_ai'", '<span className="lbl">');
    expect(toggle).toContain("if (r?.ok === false) { say(`❌ ${r.error ?? 'could not change'}`); refresh(); return; }");
  });

  it('keeps the same success wording as before', () => {
    expect(src).toContain('`${ASSISTANT_NAME} resumed from current state` : `${ASSISTANT_NAME} paused, you have the wheel`');
  });
});
