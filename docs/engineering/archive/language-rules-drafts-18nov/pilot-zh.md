# Pilot: Chinese (zh) replies for Mia on Student Visa Tax

Five realistic student messages, each with a reply written from `zh.md`, and a one-line self-check. Nothing was sent to any customer. The replies are drafts for review, not live text.

## P1. Plain question

Customer: 你好，我是国际学生，刚拿到 485 签证。你们是做什么的？

Reply:

你好！😊

我们是 Student Visa Tax，专门帮留学生和毕业生报税。我们会审核你的税务居民身份、Medicare 和抵扣项目，然后帮你准备并提交报税，确保你该拿的一样都不漏。

你现在是只在雇主那里拿工资，还是也有 ABN 的收入？

Self-check: no name guessed, greeting 你好 (D9), answer first, one question, no 您, no AI wording, no dash.

## P2. Price question (the student says ABN income)

Customer: 我在 Uber Eats 送外卖，报税要多少钱？

Reply:

你好！😊

看起来 TFN + ABN 这个方案最适合你：$385。我们会审核你的税务居民身份、Medicare 和抵扣项目，为你的 ABN 收入和支出另外做一份 business schedule（经营收支明细），然后帮你准备并提交报税，确保你该拿的一样都不漏。

BSB: 062692
Account: 81049952

付款后发个截图给我们，我们就马上开始！

Self-check: uses only the approved $385 text and bank lines, has no guarantee (ABN texts never carry it), and its greeting follows the no-name rule (the code still sends 嗨, see 14.1).

## P3. Payment claim

Customer: 我已经转账了，你看一下。

Reply:

谢谢你告诉我 😊

麻烦你把转账截图发给我们，我们就马上开始。

Self-check: does not say the payment has arrived (11.3), no greeting repeated, one 😊 at a line end.

## P4. Complaint

Customer: 你们怎么回这么慢？我等了三天了，都没人理我！

Reply:

很抱歉让你久等了。我已经把你的情况转给团队，他们会在这里直接回复你。

Self-check: no emoji (6.5), no time promised, no "我会查", handed to the team (11.2).

## P5. Yes-or-no question

Customer: 我只在澳洲打过两个月工，是不是不用报税？

Reply:

这个我们需要确认，要看你的税务居民身份和收入情况。审核会在付款后开始。

你是只在雇主那里拿工资，还是也有 ABN 的收入？

Self-check: no yes or no on a tax obligation (9.6), uses 这个我们需要确认, one question, no dash.

## Gaps the pilot found

G1. P1 and P2 open with 你好 because the student gave no name. The code's fixed opening gives 嗨！😊. Fixed in `zh.md` 4.1 and 14.1 (code not edited).
G2. A bare price question has no zh menu in code. Found while checking P2. Fixed by drafting the menu in `zh.md` 11.1 from approved figures only.
G3. A complaint (P4) and a payment claim (P3) have no zh text in code. Fixed by drafting 11.2 and 11.3 from the approved English meaning.
G4. P5 needed a rule for yes-or-no tax questions. The file already had one (9.6); the pilot confirmed it works.

Result: all five replies pass the self-checks in `zh.md`. Three gaps (G1 to G3) need code work before Chinese free text can leave the hold.
