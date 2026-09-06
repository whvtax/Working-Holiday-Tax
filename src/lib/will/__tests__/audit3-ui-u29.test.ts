/**
 * On a phone (<=840px), the chat frame (.chatwrap) used to switch from a
 * grid to `height:auto`, which un-linked it from the real space
 * `.chats-view` gives it: the pane then sized itself off a guessed
 * `100dvh - 210px` formula that undercounted the header, the chat list and
 * the 1.277x admin zoom, so the composer sat below the fold on a short
 * phone and could not be reached (audit, 5 Sep — see the CSS comment at
 * the same rule). `.chatwrap` now stays a flex column stretched to
 * `height:100%` of its real parent, `.chatlist` keeps its fixed height,
 * and `.chatpane` simply takes whatever is left, so the composer is
 * always inside the visible frame regardless of phone height or zoom.
 */
import fs from 'fs';
import path from 'path';

describe('mobile chat pane fills the real available height instead of guessing it', () => {
  const css = fs.readFileSync(
    path.join(process.cwd(), 'src/app/(site)/crm/whatsapp/will-scoped.css'),
    'utf8'
  );

  const mobileBlockMatch = css.match(/@media\(max-width:840px\)\{([\s\S]*?)\n\}/);
  const mobileBlock = mobileBlockMatch ? mobileBlockMatch[1] : '';

  it('has a max-width:840px block containing the chat layout rules', () => {
    expect(mobileBlock).toContain('.chatwrap');
    expect(mobileBlock).toContain('.chatpane');
  });

  it('.chatwrap stretches to 100% of its parent instead of sizing to content (auto)', () => {
    expect(mobileBlock).toMatch(/\.will-scope \.chatwrap\{[^}]*height:100%/);
    expect(mobileBlock).not.toMatch(/\.will-scope \.chatwrap\{[^}]*height:auto/);
  });

  it('.chatwrap is a column flex so .chatlist and .chatpane stack and share its height', () => {
    expect(mobileBlock).toMatch(/\.will-scope \.chatwrap\{[^}]*display:flex[^}]*flex-direction:column/);
  });

  it('.chatlist keeps a fixed, non-growing height (flex:none)', () => {
    expect(mobileBlock).toMatch(/\.will-scope \.chatlist\{[^}]*flex:none[^}]*max-height:190px/);
  });

  it('.chatpane takes the remaining space instead of a guessed dvh formula', () => {
    expect(mobileBlock).toMatch(/\.will-scope \.chatpane\{[^}]*flex:1[^}]*min-height:0/);
    expect(mobileBlock).not.toMatch(/\.will-scope \.chatpane\{[^}]*calc\(100dvh/);
  });
});
