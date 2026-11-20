/** Jo, 18 Nov: the 6-hour form reminder is Will only (free text), never a Meta template. */
import fs from 'fs';
import path from 'path';
import { APPROVED } from '@/lib/will/approved-messages';

const s = fs.readFileSync(path.join(__dirname, '..', 'scheduler.ts'), 'utf8');

it('wording is Jo\'s', () => {
  expect(APPROVED.followups_form.h6).toBe('Hi {{1}}😊\nDid you get a chance to fill out the form yet?');
});
it('goes without a template, and is skipped when the window has closed', () => {
  // 18 Nov (VERIFY-18nov item 3): no promised-day check-back any more, so no exception for it.
  expect(s).toMatch(/const willOnly = template\.key === 'fu_form_6h';/);
  expect(s).toMatch(/follow_up_skipped_will_only_window_closed/);
  expect(s).toMatch(/const waTemplate = textOnly \|\| willOnly \? undefined :/);
  expect(s).toMatch(/const meta = textOnly \|\| willOnly \? \{\} : \{ waTemplate \};/);
});
