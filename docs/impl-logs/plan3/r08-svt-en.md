# r08 svt-en: Student Visa Tax English, tax return and super (24 Nov 2026)

Scope: studentvisatax.com.au English: home (tax return page), /superannuation hub, the tax and super guides for 500/485
holders, students who graduate and leave, DASP. Code read: /home/claude/v68/base20 (v69 zip, Phase 1 applied).
Data: S/gsc24/svt (Queries.csv, Pages.csv, 3 months to 21 Nov). Web: SERPs and official pages fetched 24 Nov.
Note: the shared web search budget ran out near the end of this research. Facts I could not verify are listed in
section 3 and kept out of the proposed text.

## 1. Findings

F1 (fact) The SVT English buyer pages sit far down: home 28 impr @34.5 (7 clicks plus 3 on http://), /superannuation 212
@84.7 (0 clicks), /leaving-australia 15 @37.8, /blog/lodge-from-overseas 5 @49.8. The head queries are far off too:
"international student tax return" 13 @51.2, "student tax return" 8 @55.3, "tax on departing australia superannuation
payment" 148 @91.3, "departing australia superannuation payment" 18 @79.9, "leaving australia" 4 @78.8,
"australian tax return from overseas" 5 @49.8 (Queries.csv, Pages.csv).

F2 (fact) The English pages that do well are specific answers, not head-term pages:
student-visa-tax-guide-500-485 84 @7.3 (4 clicks), tax-after-leaving-australia-international-students 23 @6.0 (1 click),
student-to-graduate-visa-485-tax 30 @6.9, lodging-tax-return-after-going-home-students 20 @9.8, dasp-tax-rate 17 @5.8,
how-long-does-dasp-take 6 @7.7, "dasp processing time" 2 @9.5 (Pages.csv, Queries.csv). This is the same pattern Jo
describes for TFN: we win on specific questions.

F3 (fact, SERP 24 Nov) "international student tax return australia": page 1 is Torrens, IDP, Switch Living, RMIT,
H&R Block (two pages), studyaustralia.gov.au, internationalstudent.com, insiderguides, studymelbourne (two pages),
Taxback, austaxai. University, government and big brand pages: not winnable soon for a 4 week old domain (inference).

F4 (fact, SERP 24 Nov) "can't sign in to myGov after leaving Australia no Australian phone number code" and "tax return
after leaving australia international student can't access mygov": every result is a community.ato.gov.au thread, plus
the ATO pages "lodge your tax return before leaving Australia", "returning to your home country" and "living overseas
and remaining an Australian tax resident". No student site, university, IDP, H&R Block or austaxai page answers it.

F5 (fact) Competitors fetched do not cover myGov problems: austaxai.com.au/visa/graduate (H2s: residency, rates,
deductions, FAQ, sources, "estimate your refund"; "doesn't mention myGov at all"); studymelbourne.vic.gov.au
/working/tax-and-superannuation (TFN, super, lodging, Medicare exemption, leaving; DASP not named, myGov only as
"register with MyGov" for a Tax Help booking). austaxai does have visa landing pages (/visa/student, /visa/graduate)
and a topic hub, the shape SVT already has with student-visa-tax-guide-500-485 and student-to-graduate-visa-485-tax.

F6 (fact, code) SVT has no page about myGov problems. The only text is one short H2 inside
lodging-tax-return-after-going-home-students (long/en/batch-01.ts, "If you cannot get into your ATO account from
overseas", 3 sentences) and one bullet in blog-en.ts lodge-from-overseas ("Your myGov sign-in: the ATO says to update
your sign-in settings"). No page says the DASP online application does not need myGov, and none covers a closed
Australian bank account after leaving (bank-account-and-tax-international-students only says "keep it open").

F7 (fact, code) Already covered, so not proposed again: DASP rates, timing, documents, declined claims, unclaimed super,
lost super, several funds, employer not paying (11 FAQs on /superannuation after Phase 1), 485 switch, residency
"may be" wording, lodging from overseas, tax after leaving, home answer block and late-years item.

F8 (fact, official) The facts the new pages need, with sources:
- myGov SMS codes overseas need the same registered number with roaming on; a new number must be updated in the
  account before it can be used; without the old number "you can sign in to myGov using Digital ID or create a new
  myGov account"; the helpdesk "can release your email address".
  https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-a-code-sent-by-sms
- Before travel "you may need to make changes to how you sign in"; app, passkey, Digital ID or secret questions need no
  change. https://my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas
- No code: you may be able to sign in with Digital ID, a passkey or the myGov app; locked account: email with unique
  username, "Unlock your account now" steps, no Digital ID/passkey/app until unlocked, otherwise new account and relink.
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help
- "To lodge online you need a myGov account with an active link to the ATO"; other ways from outside Australia:
  registered tax agent, paper, before leaving, a friend or family member (power of attorney if they sign); "have an
  Australian bank account you can use to receive any refund amounts".
  https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia
- Linking questions are "based on information the ATO already has about you" (bank, super account, notice of
  assessment, Centrelink payment summary, dividend statement); skipping all counts as a failed attempt; if identity
  cannot be confirmed online, the ATO tells you what to do next.
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato/information-you-need-to-link-mygov-to-the-ato
- DASP online application asks for personal details, email, passport country and number, fund details; TFN optional
  (it then finds your accounts); cannot submit while a temporary visa is active; check VEVO; if the visa screen is
  wrong, do not submit, email DASPmail@ato.gov.au; overseas phone +61 2 6216 1111, 8:00 am to 5:00 pm Mon to Fri AET,
  ask for 13 10 20. https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system
- DASP: free online system; a registered tax agent can be nominated; fund payments by EFT to an Australian account, some
  funds offer international money transfer (fees or currency conversion may apply); ATO-held super only by EFT to an
  Australian account in your name or by cheque. https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp
- "We can only pay refunds into an Australian bank account"; update bank details in ATO online services through myGov
  or the ATO app, or by phone (you or a nominated representative).
  https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details
- Refund to a closed account is "returned to us by the Reserve Bank of Australia" (up to 10 days); reissued to updated
  details, otherwise by cheque; "From January 2025 we have started holding some cheque refunds for up to 90 days while
  we ask for bank details". https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds
- Students: a course of 6 months or more, "you may be an Australian resident for tax purposes".
  https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia

F9 (inference) GSC shows no SVT query with "mygov" yet (WHT shows only "mygovold" 46 @8.6, navigational). The case for
problem guides rests on F4 and F5 (weak SERPs) and on Jo's TFN experience, not on measured SVT demand. Expect small
volumes; the gain is clicks at positions 3 to 8 and an answer AI engines can cite, where today they cite ATO threads.

## 2. Proposals

Code facts for the implementer: a new English long article goes in a new file
src/lib/svt/content/long/en/batch-13-problems.ts (export LONG_EN_13, add it to the LONG_EN spread in long/en/index.ts).
It then gets /blog/<slug>, the sitemap and the money links (home and /superannuation, from moneyLinks() in
long/library.ts) automatically. English only until zh/vi texts exist (longLocales). Tests in
src/lib/svt/__tests__/long-articles-27oct.test.ts: body at least 600 words and 4 sections, at least 2 FAQs, sources only
*.gov.au (my.gov.au passes), title at most 80 (brief: 60), description 80 to 200 (brief: 120 to 160), and no "we are a
tax agent", no "students are residents", no dash or backtick. Bodies hold no links: links go in long/en/links.ts
LONG_ALSO. Use `${ATO}` and a plain 'https://my.gov.au/...' string in sources, like the other batches.

### P1-1 New guide: myGov after leaving Australia (the core problem page)
File: long/en/batch-13-problems.ts (new). Category 'Tax return'.
- slug: mygov-sign-in-after-leaving-australia-students
- title (47): Can't sign in to myGov after leaving Australia?
- description (149): Lost your Australian number and the myGov code stopped coming? The official sign-in fixes, and how to lodge
  your return or claim super without myGov.
- answer: If your myGov codes went to an Australian mobile number you no longer have, myGov says you may be able to
  sign in with Digital ID, a passkey or the myGov app instead, or create a new account and link your services again.
  You only need myGov to lodge online yourself, and the ATO's DASP online application does not list a myGov sign-in.
- body (845 words, ready to paste; each "##" is a question H2):

```
Many students set up myGov with an Australian mobile number. When the course ends and that SIM is cancelled, the sign-in code goes to a number nobody reads any more. This guide covers what myGov itself says you can do, and the two jobs that do not need myGov at all: your last tax return and your super.

## Why does the myGov code stop arriving after I leave?

myGov sends the SMS code to the mobile number registered in your account. myGov says that to get codes overseas you must use that same number, with international roaming turned on, on a network that works with your provider. Once the Australian SIM is cancelled, the code cannot reach you.

A new overseas number does not fix this by itself. myGov says you need to update your number in your account before you can use it for codes, and you can only do that while you can still sign in.

## What sign-in options does myGov give if the code never comes?

myGov's help pages list these options:

- **Digital ID, a passkey or the myGov app.** If you set one of these up, myGov says you may be able to sign in with it instead of an SMS code.
- **The myGov Code Generator app.** If you already use it, your codes come from the app, not by SMS.
- **A new myGov account.** If you can no longer reach your old number, myGov says you can create a new account and link your services again. The myGov helpdesk can release your old email address if you want to use it again.

If you are still in Australia, myGov suggests changing how you sign in before you travel. It is the easiest moment to fix this.

## My myGov account is locked. What now?

myGov may lock an account after the sign-in details are entered wrongly too many times. It then emails your registered address with your unique username.

To unlock it, myGov says you sign in with that username and your current password, select "Unlock your account now", enter your security code, answer your secret question and set a new password. While the account is locked you cannot use Digital ID, a passkey or the myGov app. If you still cannot get in, myGov says you will need to create a new account and relink your services.

## Will I lose my tax records with a new myGov account?

No. Your income statements, notices and super details are held by the ATO, not by myGov. When you link a new myGov account to the ATO, the ATO asks questions based on information it already has about you, such as bank account, super account or notice of assessment details. You can skip a question you are not sure about, but skipping all of them counts as a failed attempt.

## Do I need myGov to lodge my tax return from overseas?

Only if you lodge online yourself. The ATO says that to lodge online you need a myGov account with an active link to the ATO. It also lists other ways to lodge from outside Australia: through a registered tax agent, on paper, or by a friend or family member, who needs a power of attorney if they sign the return for you.

Whichever way you lodge, the ATO says it can only pay refunds into an Australian bank account. Keep yours open until any refund has arrived.

## Do I need myGov to claim my super?

The ATO lists what its DASP online application asks for: your personal details, your email address, your passport country and number, and your super fund details. A myGov sign-in is not on that list. Your TFN is optional; if you give it, the system searches for your super accounts for you.

You can start the application in Australia, but you can only submit it once you have left and your visa has ended. The DASP online application is free. For super questions from overseas, the ATO gives +61 2 6216 1111, 8:00 am to 5:00 pm Monday to Friday, Australian Eastern time; ask to be transferred to 13 10 20.

## Checklist if you are locked out

- Try Digital ID, a passkey, the myGov app or the Code Generator app, if you set one up.
- If your account is locked, use the unlock steps with your unique username.
- If nothing works, create a new myGov account and link the ATO again.
- Keep an Australian bank account open for any refund.
- For your super, use the DASP online application; the ATO does not list a myGov sign-in for it.

## You do not need myGov to work with us

You do not need myGov to have your return done with us. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. We never ask for your myGov password. Wherever you are now, you can message Student Visa Tax on WhatsApp.
```
- faq:
  - Can I change my myGov mobile number to an overseas number? / Only from inside your account. myGov says you update
    the number in your account settings before you can use it for codes. If you can no longer sign in, the options are
    Digital ID, a passkey, the myGov app or a new account.
  - Will a new myGov account lose my tax records? / No. Your records are held by the ATO. When you link the new account,
    the ATO asks questions based on information it already has about you.
  - Is my super lost if I cannot sign in to myGov? / No. The ATO's DASP online application does not list a myGov
    sign-in. If you do not claim, your fund sends the super to the ATO after you leave and your visa ends, and it can
    still be claimed. (6 months rule: DASP page above.)
- sources: my.gov.au "Use a code sent by SMS", "Accessing myGov while overseas", "myGov sign in help"; ATO "Lodge your
  tax return from outside Australia", "Information you need to link myGov to the ATO", "Help with the DASP online
  application system", "Update your financial institution details" (URLs in F8).
- related (long/en/links.ts LONG_ALSO): 'mygov-sign-in-after-leaving-australia-students':
  ['blog/lodging-tax-return-after-going-home-students', 'blog/closed-australian-bank-account-refund-super-students',
  'blog/dasp-documents-checklist-international-students']. Money links home and /superannuation come first
  automatically (body mentions DASP and leaving Australia; check the rendered related list shows both).
- CTA: the last section above (approved wording).
Measure: GSC page filter on the slug and query filter "mygov", 28 days after deploy; page indexed in URL Inspection.

### P1-2 Add to /superannuation hub and home (add only, nothing frozen is touched)
File: src/lib/svt/content/services-en.ts, SUPERANNUATION_HUB_EN.faq (11 now; append 3; FAQPage schema follows):
- Do I need myGov to claim my super? / No myGov sign-in is listed for the ATO's DASP online application. It asks for
  your personal details, email address, passport details and super fund details, and your TFN is optional. You submit
  it once you have left Australia and your visa has ended.
- Can my super be paid into an overseas bank account? / Ask your fund. The ATO says some funds offer an international
  money transfer, but not all, and fees or currency conversion may apply. Super the ATO already holds is paid only into
  an Australian bank account in your name, or by cheque.
- My visa still shows as active in the DASP application. What do I do? / You can start and save the application, but
  the ATO says you cannot submit it while a temporary visa is active. Check your visa status in VEVO. If the visa
  information shown is wrong, the ATO says not to submit and to email DASPmail@ato.gov.au.
Sources (add): the DASP help page and DASP page in F8.
related (same file): add 'blog/mygov-sign-in-after-leaving-australia-students' after 'home'.
File: src/lib/svt/content/home-en.ts, faq.items (9 now; append 1):
- I have left Australia and cannot sign in to myGov. Can I still lodge? / Yes. You do not need myGov to work with us.
  We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is
  lodged with the ATO. myGov is only needed if you lodge online yourself, and the ATO pays any refund into an
  Australian bank account.
(Source: ATO lodge from outside Australia, F8.) Measure: home and /superannuation CTR in the 7 Dec and January reads.

### P1-3 New guide: closed Australian bank account (refund and super)
File: long/en/batch-13-problems.ts. Category 'Tax return' (body mentions DASP, so it also links /superannuation).
- slug: closed-australian-bank-account-refund-super-students
- title (53): Closed your Australian bank account? Refund and super
- description (153): Closed your Australian bank account before your refund or super arrived? What the ATO does with the
  money and how to give new bank details from overseas.
- answer: The ATO can only pay tax refunds into an Australian bank account. If a refund goes to an account you have
  closed, the Reserve Bank returns it to the ATO, which pays it again to new details you give or, without them, by
  cheque. Super from your fund may be paid by international transfer if your fund offers it.
- body H2s and ready answers (expand to 600+ words with the worked example below, no amounts):
  - (intro) Many students close their bank account in their last week in Australia. Your tax return is lodged after
    30 June and any super claim after your visa ends, so the money can arrive after the account is gone. Here is what
    happens and what you can still do.
  - ## Can the ATO pay my refund into an overseas account? / No. The ATO says it can only pay refunds into an
    Australian bank account. If you have not closed yours yet, keep it open until any refund has arrived.
  - ## What happens if my refund was paid to my closed account? / The ATO says a refund paid to a closed account is
    returned by the Reserve Bank of Australia, which can take up to 10 days. If you have given new bank details, the
    ATO pays it again to that account. If not, it reissues the refund by cheque, and since January 2025 it has held
    some cheque refunds for up to 90 days while it asks for bank details.
  - ## How do I give the ATO new bank details from overseas? / The ATO says you can update them in ATO online services
    through myGov or the ATO app, or by phone: you, or a nominated representative, can call and answer questions to
    confirm your identity. Have your TFN ready. From overseas the ATO gives +61 2 6216 1111, 8:00 am to 5:00 pm Monday
    to Friday, Australian Eastern time; ask to be transferred to 13 10 20. If myGov does not work any more, our guide
    on signing in after leaving explains the options (text only; the link goes in related).
  - ## What about my super? / Your fund pays a DASP. The ATO recommends keeping an Australian account open; some funds
    offer an international money transfer, but not all, and fees or currency conversion may apply. Super already
    transferred to the ATO is paid only by EFT to an Australian bank account in your name, or by cheque.
  - ## A worked example / Minh closed her account in her last week, lodged her return after 30 June from Hanoi and
    gave the old account number. The refund came back to the ATO from the Reserve Bank; she then gave new Australian
    account details by phone... (implementer: keep it to the ATO steps above, no dollar figures).
  - ## Before you close an account: a checklist / keep it open until the refund and any super are paid; note your
    BSB and account number; check which account the ATO holds before you lodge.
  - ## Getting your return right from overseas / Tell us early if your Australian account is closed. We deal with the
    ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the
    ATO. You can message Student Visa Tax on WhatsApp.
- faq: "Will the ATO send my refund to a bank in my home country?" (No; Australian account only; returned refunds are
  reissued to new details or by cheque.) "Can I reopen an Australian bank account from overseas?" (Do not answer from
  memory: banks' rules, not official; leave this FAQ out unless a bank source is accepted.) Use instead: "Is my refund
  lost if my account is closed?" (No; the ATO says it is returned and reissued.)
- sources: ATO missing tax return refunds; ATO update your financial institution details; ATO DASP page; ATO DASP help
  page (F8).
- LONG_ALSO: 'closed-australian-bank-account-refund-super-students': ['blog/bank-account-and-tax-international-students',
  'blog/mygov-sign-in-after-leaving-australia-students']; and add 'blog/closed-australian-bank-account-refund-super-students'
  to a new entry 'bank-account-and-tax-international-students': ['blog/closed-australian-bank-account-refund-super-students'].

### P2-1 Point the leaving and super pages at the two new guides
- long/en/links.ts LONG_ALSO: 'lodging-tax-return-after-going-home-students': put
  'blog/mygov-sign-in-after-leaving-australia-students' first (keeps lodge-from-overseas and tax-after-leaving);
  'tax-after-leaving-australia-international-students': add 'blog/mygov-sign-in-after-leaving-australia-students';
  'dasp-documents-checklist-international-students': add the myGov guide. relatedOf() caps at 6 (money 2, service 1,
  then LONG_ALSO), so LONG_ALSO entries beyond the third are dropped: keep each list at 3 or fewer.
- blog-en.ts lodge-from-overseas related: add 'blog/mygov-sign-in-after-leaving-australia-students' after 'home'.
- guides-en.ts leaving-australia related: add both new guides.
- long/en/batch-01.ts lodging-tax-return-after-going-home-students, H2 "If you cannot get into your ATO account from
  overseas": append (existing H2 text unchanged): "myGov says you may be able to sign in with Digital ID, a passkey or
  the myGov app instead of an SMS code, or create a new myGov account and link your services again. Your super is
  separate: the ATO's DASP online application does not list a myGov sign-in." (sources already on my.gov.au pages; add
  'https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help' to its sources).

### P2-2 "Graduating this summer" section on /leaving-australia (plan B5, not yet built)
File: guides-en.ts, leaving-australia sections, new section after 'before' (id 'graduating'):
- title: Graduating this summer? What to do before you fly
- p: If you move to a 485 graduate visa, your TFN, super and the way you lodge stay the same, and you cannot claim your
  super while you hold any active visa, including a 485 or a bridging visa. If you are going home, these steps make
  the next year easier.
- list: "Check how you sign in to myGov: myGov says you may need to change it before you travel, because SMS codes go
  to your registered Australian number." / "Keep your Australian bank account open: the ATO can only pay refunds into
  an Australian account." / "Update your address and email with the ATO." / "Note each super fund and member number
  for your DASP, which you submit once you have left and your visa has ended."
- Residency, if mentioned at all: "If your course was 6 months or longer, you may have been a resident for tax
  purposes; the ATO makes the final decision." (ATO studying in Australia, F8.)
Sources (add): my.gov.au accessing myGov while overseas; ATO update financial institution details; ATO DASP.
Timing: before mid December (end of semester); title and description of the page stay frozen.

### P2-3 New guide: myGov will not link to the ATO (only after two facts are verified)
- slug: cant-link-mygov-to-ato-international-students
- title (49): Can't link myGov to the ATO? Options for students
- description (143): myGov will not link to the ATO, or the identity questions fail? What the ATO asks, what to do when
  you cannot answer, and the ways to lodge without myGov.
- H2s: Why does the ATO ask me questions to link? (questions based on what the ATO already holds; examples) / What if
  I cannot answer them? (skip one, but skipping all is a failed attempt; the ATO tells you what to do next) / Can I use
  myID with a foreign passport? (UNVERIFIED, see section 3) / Can I phone the ATO for a linking code? (UNVERIFIED) /
  Do I need the link to lodge or claim super? (same facts as P1-1) / closing CTA as P1-1.
- Why P2: the verified facts alone do not fill 600 words without padding. Build it only once the myID and linking code
  facts are checked on myid.gov.au and ato.gov.au. Otherwise keep this content as the P1-1 H2 "Will I lose my tax
  records with a new myGov account?".

### P3-1 zh and vi versions of P1-1 and P1-3
Write natively (not translated) once the English pages show impressions: zh "离开澳洲后登录不了 myGov", vi "không đăng
nhập được myGov sau khi rời Úc". Same facts and sources; zh never 会计/税务师 for us, vi never kế toán; residency
"có thể"/"可能". Add to long/zh and long/vi with the same slugs.

### P3-2 Do not spend effort on DASP head terms now
/superannuation is @84.7 for DASP head terms against the ATO and the funds (F1). The page already answers them; let
the problem guides and the FAQ additions build links into it instead of rewriting it.

## 3. What NOT to do
- No SVT /tax-return page: the home owns that intent (a13 R5); add home FAQ only (P1-2).
- No new DASP how-to guide: "How to apply for DASP online: step by step" (dasp-documents-and-timing, 279 impr) and
  dasp-documents-checklist own it; dasp-rejected owns declined claims and the active visa case. The new FAQ in P1-2 is
  a short answer that sends readers into the hub, not a new URL.
- No new 485 or residency guide: student-to-graduate-visa-485-tax (30 @6.9) and student-visa-tax-guide-500-485
  (84 @7.3) own it. Keep "may be"/"usually"; the test regex rejects "students ... are residents for tax".
- Not verified, so keep OUT of all text: that myGov accepts an overseas mobile number for SMS codes (my.gov.au only
  describes roaming on the registered number); the myGov helpdesk phone number from overseas; whether myID accepts a
  foreign passport; an ATO "linking code" by phone; that a registered tax agent can update your bank details (the ATO
  page does not say so); any bank's rules on reopening accounts from overseas.
- Never say we fix, reset or access the student's myGov, that we lodge, or "our registered tax agent". Approved only:
  "We deal with the ATO directly", "reviewed and signed off by a registered tax agent before it is lodged with the
  ATO", "We never ask for your myGov password". No refund amounts or promises; no prices beyond the existing $220/$385.
- No dashes (the "Can't" apostrophe is fine; check U+2019 is not pasted as a dash), no AI mention, no Working Holiday
  Tax mention. If WHT gets its own myGov guide (other reports), write the SVT one with this different structure and
  student examples; do not copy sentences across brands.
- Do not change titles, descriptions or H1 of the home, /superannuation, /leaving-australia or any existing guide
  (frozen until the December measurement). Add FAQ items and sections below the opening only.
- Do not add links inside article bodies (renderer has none); use LONG_ALSO and related arrays, and keep each
  LONG_ALSO list at 3 or fewer so they survive the cap of 6.
- Do not target "dasp licen*" or "417 visa super claim" (287 noise impressions; 417 is the other brand's audience).
