# SVT shape for the 4 new guides (agent G -> agent H), 24 Nov 2026

The 4 SVT guides are LONG ARTICLES (src/lib/svt/content/long/), not guides-en.ts / blog-en.ts entries.
So H does NOT touch guides-zh.ts, guides-vi.ts, blog-zh.ts or blog-vi.ts for them (checkTexts would fail on a slug
that is not in GUIDES_EN / BLOG_EN: "not in English").

## Where G puts English
src/lib/svt/content/long/en/batch-13-problems.ts, export `LONG_EN_13: readonly LongArticle[]`, added by G to the
LONG_EN spread in long/en/index.ts. Related lists in long/en/links.ts (LONG_ALSO) by G. Slug, category, dates
(published/updated '2026-11-24') and sources come from the English entry; a zh/vi text renders only when the EN twin exists.

## Where H puts zh and vi (H owns these files)
- src/lib/svt/content/long/zh/batch-13-problems.ts:
  ```ts
  import type { LongText } from '../types'
  export const LONG_ZH_13: Readonly<Record<string, LongText>> = { '<slug>': { title, description, answer, body, faq }, ... }
  ```
  then add `import { LONG_ZH_13 } from './batch-13-problems'` and `...LONG_ZH_13` at the END of the LONG_ZH spread in
  long/zh/index.ts (file says "generated", but there is no script in the repo; edit by hand).
- src/lib/svt/content/long/vi/batch-13-problems.ts: same with `LONG_VI_13`, long/vi/index.ts.

## LongText fields (src/lib/svt/content/long/types.ts), all required
| field | rule |
|---|---|
| title | H1 and <title>. Keep short (zh about 15 to 28 chars, vi up to 60). |
| description | meta description and lead. |
| answer | 1 to 2 sentences, the direct answer (shown first in a box). |
| body | Markdown subset only: paragraphs split by a blank line, "## Heading" lines, "- item" lists, **bold**. NO links, NO HTML, NO backticks, NO `${`. At least 3 "## " sections (test). Intro paragraph(s) before the first "##" are fine. |
| faq | ReadonlyArray<{ q, a }>. Use the SAME COUNT as English (3 for every slug below). |

Tests that run on zh/vi long texts: long-articles-27oct.test.ts (no dash of any kind incl. "——", no "backpacker" / Working
Holiday Tax, no "AI"/chatbot, no refund promise, no "students ... are residents for tax", no backtick or "<tag", text
exists only for an EN slug, title/description/answer/body truthy, parseBody(body) >= 3 sections).

## The 4 slugs (exact), category, English title, H2 order (mirror the order; native wording, not word for word)
1. `mygov-sms-code-overseas-international-students` (Tax return)
   EN title: "No myGov code after leaving Australia? Options for students"
   H2s: Why does the myGov code stop arriving after I leave? / What should I check first? / Which sign in options
   work without my Australian number? / What if I am already home and cannot sign in? / Can I change my myGov number
   to an overseas mobile? / Do I need myGov for my tax return or my super? / You do not need myGov for us to help
   FAQ (3): new account loses records? / overseas number for codes? / is my super lost?
2. `cant-link-ato-mygov-international-students` (Tax return)
   EN title: "Can't link the ATO to myGov? A guide for students"
   H2s: Which sign in methods does the ATO accept? / What questions does the ATO ask to link? / What do the
   linking error codes mean? / The ATO does not show in myGov. What now? / Who can I call from overseas? /
   Do I need the link to lodge or claim my super? / You do not need myGov for us to help
   FAQ (3): first year with no notice of assessment? / skipping questions? / secret questions?
3. `claim-super-without-mygov-international-students` (Super)
   EN title: "Claim your super without myGov after studying"
   H2s: What does the DASP online application ask for? / When can I submit it? / Where does myGov come in at all?
   / What if the visa screen is wrong? / How is the super paid? / Can someone else claim for me? / Would you rather
   not do the claim yourself?
   FAQ (3): need myGov? / still on a 485 or bridging visa? / paid to an overseas account?
4. `tax-refund-closed-australian-bank-account-international-students` (Tax return)
   EN title: "Closed your Australian bank account? Refund and super"
   H2s: Can the ATO pay my refund into an overseas account? / What happens if my refund went to my closed
   account? / How do I give the ATO new bank details from overseas? / What about my super? / An example / Before you
   close your account: a checklist / Getting your return right from overseas
   FAQ (3): bank in home country? / is my refund lost? / super into overseas account?

## Facts (only these; r16 verified, plus r08 F8 / r11 1.1 URLs)
- SMS codes go to the registered number; overseas: same number, roaming on. A new number must be updated inside the
  account first. Options: myGov app, passkey, Digital ID; else new account and relink; helpdesk can release the email.
  myGov helpdesk +61 1300 169 468 option 1 from overseas (r11 F4).
- For the ATO: sign in with myID (Standard or Strong), passkey, authenticator, or SMS to an Australian mobile; secret
  questions not accepted (r11 F9).
- Linking questions come from ATO records; skipping all = failed attempt; "if you can't confirm your identity online,
  we will let you know what to do next" (r11 F10). ATO from overseas +61 2 6216 1111, 8 am to 5 pm Mon to Fri AET.
- DASP online: personal details, email, passport country and number, fund details; TFN optional; cannot submit while a
  temporary visa is active; wrong visa screen: do not submit, email DASPmail@ato.gov.au; free; a registered tax agent
  can be nominated. Fund: EFT to an Australian account, some funds international transfer (fees/conversion may
  apply); super already held by the ATO only to an Australian account in your name or by cheque.
- Refund only into an Australian account. Closed account: returned via the Reserve Bank (up to 10 days), reissued to
  new details or by cheque; since January 2025 some cheque refunds held up to 90 days while the ATO asks for bank details.
- Most online returns processed within 10 business days; paper up to 90 business days (never "12" or "50").
NEVER: Code Generator app as a fix (retires 28 Feb 2027), phoning the ATO for a "linking code", myID Strong with a
foreign passport, a refund into an overseas account, that we fix/reset/access myGov, that we lodge.

## Closing section (approved wording that already exists in our zh/vi files; do not invent)
zh: 在注册税务代理人的监督下运营 / 在提交给 ATO 之前，由注册税务代理人审核并签字确认 (grep home-zh.ts, services-zh.ts).
vi: Hoạt động dưới sự giám sát của một đại lý thuế đã đăng ký / được một đại lý thuế đã đăng ký xem xét và ký duyệt
trước khi nộp cho ATO (grep home-vi.ts, services-vi.ts). Plus "we deal with the ATO directly", "we never ask for your
myGov password" and WhatsApp in the existing zh/vi wording. Super guide: only what /superannuation (services-zh/vi.ts)
already says about our service.

## URGENT for H: zh/vi FACT FIXES in files H owns (G does not edit them). G changes the English twins now.
TEST COUPLING: blog-en.ts `how-long-does-a-tax-refund-take` short.facts figures change from 12/30/50 to 10/30/90.
checkTexts ("short answer figures differ") then FAILS until blog-zh.ts line ~113 and blog-vi.ts line ~114 short.facts
figures are also 10 / 30 / 90 (labels free). Please change them in the same pass. G keeps the deadline post's short.facts
figures unchanged ("11:59 pm", "$1,820"), so that post has no figure coupling; only the words change.
Sources: https://ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return
(10 business days online, up to 30 calendar days manual, up to 90 business days paper);
https://www.ato.gov.au/media-centre/the-final-countdown-ato-reminds-taxpayers-to-lodge-now (31 Oct 2026 Saturday, self-lodgers until 11:59 pm local time Monday 2 November).
Wording per r16 P1 / r14 P1-1, P1-2 (ready zh/vi sentences there). Lines (24 Nov grep):
- 12 -> 10 business days and paper 50 -> 90 (drop "大约 10 周" / "khoảng 10 tuần"; "两周半" / "hai tuần rưỡi" -> 两周 / hai tuần):
  zh: blog-zh.ts 85 (description), 87, 91, 93, 109, 110 (q: 超过 10 天), 113 (short answer, mark '10 个工作日', figures);
      long/zh batch-01 579; batch-04 649, 671, 672, 679, 681, 683, 742; batch-11 488, 539.
  vi: blog-vi.ts 86 (description), 92, 94, 110, 111, 114 (short); long/vi batch-01 585; batch-04 638, 660, 661, 668, 670,
      672, 731; batch-11 490, 537.
  (home-zh.ts 92 and home-vi.ts 91 are G's files: G fixes them.)
- 31 October 2026 deadline -> Saturday, accepted until 11:59 pm local time Monday 2 November 2026:
  zh: blog-zh.ts 573, 603 (short answer text; keep figures); long/zh batch-09 748, 827, 882.
  vi: blog-vi.ts 574, 604; long/vi batch-09 744, 818, 823, 859.
  (deadline.ts DEADLINE_PASSED_NOTE zh/vi is G's file: G fixes it.)
- Closed bank account wording (r16 I2, I3, E9): G fixes the EN twins in long/en batch-04 tax-refund-delays-international-students
  (body "Delay 4" paragraph: "the payment cannot be made" -> returned via the Reserve Bank, up to 10 days, reissued to new
  Australian details or by cheque, some cheques held up to 90 days since January 2025; FAQ "My Australian bank account is
  closed...") and batch-02 (DASP several funds paragraph "or decide which overseas account you will use" -> only if the fund
  offers an international transfer; ATO-held super only to an Australian account in your name or by cheque).
  H: please mirror these in long/zh and long/vi batch-04 (same article, "Delay 4" paragraph and that FAQ) and batch-02 (same
  paragraph). Source: https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds
  and the ATO DASP page.

## Existing approved translations found (grep, 24 Nov) for the closing section
- "We deal with the ATO directly": not on SVT zh/vi pages yet. Existing approved translation in
  src/lib/will/instant-choice.ts MYGOV_REASSURANCE: zh "我们会直接和 ATO 处理所有事情" (G uses "我们直接和 ATO 沟通处理" style
  only if you prefer; G's home-zh FAQ uses "我们会直接和 ATO 处理"); vi "Bên mình làm việc trực tiếp với ATO" (site register: G uses
  "Chúng tôi làm việc trực tiếp với ATO").
- "We never ask for your myGov password": zh "我们绝不会索要你的 myGov 密码。" (guides-zh.ts 310); vi "Chúng tôi không bao giờ hỏi
  mật khẩu myGov của bạn." (guides-vi.ts 311).
- Sign-off: zh "在提交给 ATO 之前，由注册税务代理人审核并签字确认"; vi "được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO"
  (every "đại lý thuế" sentence must match the approved regex in i18n-rules-26oct.test.ts).
