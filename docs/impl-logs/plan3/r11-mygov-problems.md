# r11 myGov and myID problems that block a tax return or a super claim (24 Nov 2026)

Scope: WHT (en, de, ja, fr, it, es) and SVT (en, zh, vi). Research only, no repo edits. Code read: /home/claude/v68/base20.
Limit hit: the shared WebSearch budget ran out after 6 SERP checks, so SERP evidence below is from those 6 searches
(the search tool's index, not a live Google check) plus Jo's 24 Nov observation. All facts were fetched with WebFetch.

## 1. Findings

### 1.1 Verified fact sheet (every proposed sentence below points to one of these IDs)
| ID | Fact (official) | URL |
|---|---|---|
| F1 | If you sign in with the myGov app, a passkey, Digital ID or secret questions, you "don't need to make any changes" before going overseas. If you use a code (SMS or Code Generator) you must be able to receive it overseas. To reuse your old email on a new account you contact myGov. | https://my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas |
| F2 | SMS codes go to the mobile number registered on the account. Overseas you must use that same number, "enable international roaming on your Australian mobile phone number registered to your myGov account" and connect to a network your provider supports. Number changed in Account settings, Contact details. | https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms |
| F3 | Sign in help: Forgot username (username is 2 letters and 6 numbers, emailed); Forgot password (enter sign in details, choose how to get a code, set new password); myGov may turn off email and mobile as usernames after unusual activity; SMS checklist (reception, flight mode off, restart, storage, spam folder, update); can't answer secret questions: use Digital ID, a passkey or the myGov app; locked after too many wrong attempts: enter username and current password, "Unlock your account now", security code and secret question, new password; until unlocked you can't use Digital ID, a passkey or the app; still stuck and not locked: recover with Digital ID; locked: create a new account and relink, contact the helpdesk to reuse your email. | https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help |
| F4 | myGov helpdesk: 132 307 option 1; from overseas +61 1300 169 468 option 1; Mon to Fri 7 am to 10 pm, Sat and Sun 10 am to 5 pm, Australian time; closed national public holidays; international charges may apply. | https://my.gov.au/en/about/help/contact |
| F5 | "The myGov Code Generator app is retiring on 28 February 2027." "It is no longer available to download from app stores." Switch to a code by SMS or an authenticator. Using it overseas needs an Australian mobile for SMS backup you can receive abroad. | https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-the-mygov-code-generator-app |
| F6 | Authenticator: examples Google Authenticator, Apple Passwords, 1Password; Microsoft Authenticator cannot be used (not SHA256). Account settings, Sign in settings, Authenticator, Manage, Add; scan QR or enter key. Only one authenticator; it replaces the Code Generator. Device must show correct local time. | https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-an-authenticator |
| F7 | ATO: can't sign in and no backup: recover with myID at Strong (name, date of birth, email must match), via "I didn't get my code" / "I can't access my app" / "I can't answer my question", then "Continue with Digital ID". Otherwise create a new myGov account and relink the ATO (helpdesk releases your email). Standard myID "can simplify the linking process". | https://ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account |
| F8 | Recovery with Digital ID needs a Strong myID, matching name, date of birth and email, and a myID not already connected. Password turned off: helpdesk turns it back on. No myID: new account. | https://my.gov.au/en/about/help/digital-id/recover-your-account-using-digital-id |
| F9 | To link or use ATO online services you sign in with myID (Strong or Standard), a passkey, an authenticator, or an SMS code "using an Australian mobile number". "You can't use Answer a secret question" for the ATO; if secret questions are your only option, the account is unlinked from the ATO. Overseas, no Australian mobile or poor reception: use myID, a passkey or an authenticator. | https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato |
| F10 | Linking identity questions draw on ATO records; you need not answer all; skipping all counts as a failed attempt. Options: bank account that received an ATO refund or earned interest (last 2 years), active super account, notice of assessment (last 5 years), PAYG payment summary (last 2 years), travel document (if TFN applied as temporary visitor, last 4 years), TFN application receipt reference, ATO refund amount (last 2 years), recent payslip, plus Centrelink, dividend, managed fund, payment plan items. "If you can't confirm your identity online, we will let you know what to do next." | https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato/information-you-need-to-link-mygov-to-the-ato |
| F11 | Linking errors: details don't match (IDD.002/004/006: check TFN, name, address; single name goes in Family name); OVK.001 sign in method not supported (use myID, or contact the ATO); NOA.002, TVLDOC.002, SUPERACC.002, BANKACC.002 etc. (format); LCK.001 to LCK.005 lockout (wait until the time shown); IDD.003, ICI.001, OVK.002 (can't link online, contact the ATO); can't find link (View and link services, Unlink, Link again); errors 001, 002 (ad blocker, add-ons), A927.06 / proxy / session expired (wait one hour, close all windows). | https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/help-and-support-for-online-services-individuals |
| F12 | myID: Basic gives limited access. Standard: any 2 of Australian passport, driver licence, birth certificate, "visa (using your foreign passport)", ImmiCard, citizenship certificate, plus Medicare card once one other is verified. Verifying one document leaves you at Basic. Strong: Australian identity documents and a photo check. | https://www.myid.gov.au/set-up ; https://www.myid.gov.au/basic |
| F13 | ATO individuals 13 28 61 (8 am to 6 pm Mon to Fri); outside Australia +61 2 6216 1111 (8 am to 5 pm AEDT Mon to Fri, English); TIS +61 3 9268 8332. | https://www.ato.gov.au/About-ATO/Contact-us/phone-us/ |
| F14 | Three ways to lodge: myTax online, a registered tax agent (only registered agents may charge), paper by mail. Online: most process in 10 business days. Paper: most refunds issue within 50 business days. | https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return |
| F15 | Paper return pack ordered online or by phone. From overseas post to GPO Box 9845, SYDNEY NSW 2001 AUSTRALIA. | https://www.ato.gov.au/Individuals/Your-tax-return/How-to-lodge-your-tax-return/Lodge-a-paper-tax-return/ |
| F16 | DASP: free online application; start in Australia, finish after leaving; paper NAT 7204 to the fund, NAT 74880 to the ATO for ATO-held super; a registered tax agent can act with written authority; myGov is mentioned only for FINDING super; $5,000 or more: fund may want certified ID; online system checks immigration status; you must have left and your visa must have ceased. | https://www.ato.gov.au/individuals/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/ |
| F17 | DASP online asks for personal details, email, passport country and number, fund details including ABN; TFN optional and lets the system search your accounts; you confirm the visa details it shows. | https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system |

NOT verified, keep out of text: an ATO "linking code" by phone (no current ATO page mentions it; only community threads and
thriday.com.au); whether myGov accepts a foreign mobile for SMS (ATO only says SMS for the ATO needs an Australian mobile, F9);
email change steps; whether myID can be set up from overseas or needs an Australian mobile; myID Strong with a foreign passport
(F12 only says "Australian identity documents"). The UK High Commission page still tells travellers to use the Code Generator
(https://uk.embassy.gov.au/lhlh/mygovhelp.html), now outdated by F5.

### 1.2 Problems, what blocks, the fix, the angle
| # | Problem | Blocks | Official fix | Our angle |
|---|---|---|---|---|
| 1 | Old Australian number gone, SMS code never arrives abroad | myGov sign in, ATO link (F9: SMS for the ATO needs an Australian mobile) | Roaming on the same AU number (F2); sign in with app, passkey or Digital ID (F3); Strong myID recovery (F7, F8); else new account (F3) | Biggest WHT case: after flying home the SIM is dead. No myGov needed with us |
| 2 | Locked account | Everything; Digital ID recovery is blocked while locked (F3) | Unlock flow needs password, code, secret question (F3); else new account, helpdesk releases email (F3, F7) | Same |
| 3 | Forgotten password / username | Sign in | Forgot password / Forgot username (F3); code needs working email or phone | Same |
| 4 | Secret questions forgotten, or only sign-in option | ATO access: secret questions are not accepted and the ATO gets unlinked (F9) | Digital ID, passkey, app (F3); add passkey or authenticator (F6, F9) | Many old WHM accounts were made with secret questions |
| 5 | Can't link the ATO (questions about past returns) | myTax, income statements, super search | F10 list; wait out LCK lockouts; contact ATO 13 28 61 / +61 2 6216 1111 (F11, F13) | First-year WHMs have no notice of assessment or refund yet, so fewer questions fit (inference from F10) |
| 6 | myID with a foreign passport | Standard needs 2 documents; a foreign passport only counts through the visa (F12) | Visa plus Australian driver licence or Medicare card (F12); otherwise Basic | Strong is out of reach without Australian documents (F12), so Strong recovery (F7, F8) is out too |
| 7 | myGov Code Generator app | Retires 28 Feb 2027, no download (F5); new phone = no app | Authenticator (not Microsoft) or SMS (F5, F6) | Time-bound, good for AI answers in Jan to Feb 2027 |
| 8 | Email change / duplicate account | New account cannot reuse the email until released (F1, F3, F7) | Helpdesk 132 307 / +61 1300 169 468 option 1 (F4) | Fold into guide 2 |
| 9 | ATO online services errors | Linking and myTax | Codes table (F11) | Fold into guide 3 |
| 10 | DASP thought to need myGov | Super claim | DASP online needs passport, fund details, TFN optional, no myGov (F16, F17) | Strongest "you don't need myGov" fact we have |

### 1.3 Demand and competition
- GSC (S/gsc24/wht/Queries.csv, svt/Queries.csv): no myGov-problem queries reach us today; only "mygovold" 46 impr pos 8.61,
  "mygovcar" 23 impr. FACT. Inference: we have no page on the topic, so Google has nothing to show us for.
- DE: /de/tax-return ran the title "Steuererklärung Australien ohne myGov" with 170 impr, 4 clicks (S/analysis/a14-deploy.md
  line 49). "Without myGov" intent exists in DE.
- SERP checks (6 searches, 24 Nov): "can't sign in locked out myGov": my.gov.au, ato.gov.au, community.ato.gov.au (4 threads),
  womenlovetech.com. "myGov SMS code not received overseas": my.gov.au (4), uk.embassy.gov.au (outdated advice), community.ato.gov.au
  (8 threads), servicesaustralia. "ATO linking code": community.ato.gov.au (9 threads), thriday.com.au, ato.gov.au Easy Read.
  "myID foreign passport visa": myid.gov.au, community.ato.gov.au (3), digitalidsystem.gov.au, wa.gov.au. "DASP without myGov":
  ato.gov.au only, palmscheme.gov.au. FACT for these lists. No tax refund company ranks on any of them. This matches the TFN
  pattern where we beat community.ato.gov.au threads (S/analysis/a16-serp-en.md line 48).
- Phrases to target (INFERENCE from SERP titles and community thread wording; no volumes available): "mygov sms code not
  received overseas", "mygov old phone number", "mygov verification code overseas", "locked out of mygov", "mygov account locked",
  "forgot mygov secret questions", "can't link ato to mygov", "ato linking code", "mygov link ato questions", "myid foreign
  passport", "myid visa", "mygov code generator not available", "tax return without mygov", "claim super without mygov".
  DE: "myGov Code kommt nicht", "myGov gesperrt", "Steuererklärung Australien ohne myGov". JA: "マイガブ ログインできない",
  "myGov SMS 届かない 海外". Verify these with the next search budget before titles go to translation.

### 1.4 Existing coverage (checked, no duplicates)
- No slug containing mygov, myid, linking or locked in EN (S/plan3/en_slugs.txt), DE, JA, FR, IT, ES (object keys in blog
  stores) or SVT (src/lib/svt/content/**). FACT.
- Partial mentions only: how-to-lodge-tax-return-working-holiday (data.ts l.1236 to 1240, "identity from overseas is harder"),
  how-to-find-lost-superannuation (l.2040), early-tax-return-leaving-australia (l.3472, 3480), tfn-security-protect-from-fraud
  (l.5870, "a dead Australian SIM locks you out"), past-years-tax-returns-working-holiday (l.7841). Same in DE (l.1502, 1639,
  9023, 9080) and JA (l.3915). These are the inbound link sources.
- Money pages: EN /tax-return has a myGov comparison (TWO_WAYS) but no FAQ "Do I need myGov?"; /superannuation has the MYGOV
  compare block but no FAQ on it (faqs l.124 to 180). SVT guides-en.ts already says "We never ask for your myGov password".
- Closest cannibalisation risk: how-to-lodge-tax-return-from-overseas (EN 168 impr pos 12.24, JA 146 impr). New guides are
  about ACCESS failures, not about lodging from abroad; they link to it, not the other way round on the same intent.

## 2. Proposals

### P1 (build now)
P1.1 EN hub + 5 guides in src/app/(site)/blog/data.ts (category "Tax Return" except guide 7 = "Super"; date 24 Nov 2026).
P1.2 One new FAQ on EN /tax-return (faqs array, after "Can I do my working holiday tax return myself?") and EN /superannuation
(after "Can I just claim my super myself?"). Text in 2.3. Add below existing content only; titles, H1 untouched.
P1.3 Inbound links (append one sentence, no change to openings): how-to-lodge-tax-return-working-holiday (end of the paragraph at
l.1240) to the hub; how-to-find-lost-superannuation (l.2040) to guide 7; early-tax-return-leaving-australia (after l.3480 list)
and tfn-security-protect-from-fraud (l.5870 item) to guide 1; past-years-tax-returns-working-holiday (l.7841 item) to guide 6.
Ready sentences in 2.4.

### P2
P2.1 Guides 4 (myID) and 5 (Code Generator) in EN. Guide 5 must carry the date and be reviewed after 28 Feb 2027.
P2.2 SVT set (2.5) and DE/JA localisation (2.6).
### P3
P3.1 FR/IT/ES localisation; P3.2 a short "ATO online services error codes" table section inside guide 3 is already included; a
separate errors guide is not worth it (thin, F11 is the only source).

### 2.1 Common closing CTA (WHT EN, approved wording; use as the last H2 of every guide below)
## Would you rather skip myGov altogether?
You do not need myGov for us to do your tax return. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Message us on WhatsApp with roughly where and when you worked, from Australia or from home. More on the [working holiday tax return](/tax-return).

(Guide 7 variant) ## Would you rather not do the claim yourself?
You do not need myGov for your super either. We prepare each DASP application with you and deal with the ATO directly, and if you also need a tax return, it is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Message us on WhatsApp. More on [claiming your super](/superannuation).

### 2.2 Ready EN text
Implementer note: (Fn) tags are source pointers for review. In the guide body turn the first mention per guide into an inline link to the Fn URL (as existing guides do, e.g. how-to-update-address-with-ato) and delete the rest. Answer-first openings below must stay the first paragraph.

**H. Hub** slug `mygov-problems-tax-return-super`
title: myGov not working? Fixes for your tax return and super (54)
seoTitle: same. description (148): Locked out of myGov, no SMS code abroad, can't link the ATO or myID won't take your passport? Every fix, and how to get your tax back without myGov.
Opening: Most myGov problems after a working holiday come down to one thing: the account was set up around an Australian phone number or secret questions, and neither works once you have gone home. Each problem below has an official fix, and each links to a full guide. You also do not need myGov at all to get a tax return done or to claim your super.
## Which myGov problem do you have?
- **No SMS code because your Australian number is gone.** The code only goes to the number on the account (F2). Fixes: [myGov SMS code not arriving overseas](/blog/mygov-sms-code-not-received-overseas).
- **Account locked, or password forgotten.** [Locked out of myGov](/blog/mygov-account-locked-out) has the unlock steps and when a new account is quicker.
- **The ATO will not link, or keeps asking questions you cannot answer.** [Can't link the ATO to myGov](/blog/cant-link-ato-to-mygov).
- **myID will not accept your passport.** [myID with a foreign passport](/blog/myid-foreign-passport-working-holiday).
- **The myGov Code Generator app is missing from your new phone.** [It is retiring](/blog/mygov-code-generator-app-retiring).
## Why do so many working holiday makers get locked out?
Two reasons, both on official pages. To use the ATO through myGov, an SMS code only works with an Australian mobile number, and secret questions are not accepted at all; an account that only has secret questions gets unlinked from the ATO (F9). The fixes that do not depend on an Australian number are a passkey, an authenticator app, the myGov app or myID (F1, F9).
## Who do you call?
myGov sign in problems: the myGov helpdesk on 132 307, or +61 1300 169 468 from overseas, option 1 (F4). Linking and ATO records: the ATO on 13 28 61, or +61 2 6216 1111 from overseas, 8 am to 5 pm AEDT on weekdays (F13).
## Can you get your tax return done without myGov?
Yes. myGov is only needed to lodge it yourself online. A return can also be prepared by a registered tax agent or sent on paper (F14). [Tax return without myGov](/blog/tax-return-without-mygov) compares the routes.
## Can you claim your super without myGov?
Yes. The ATO's DASP online application asks for your passport, fund details and, optionally, your TFN, not a myGov sign in (F16, F17). See [claim your super without myGov](/blog/claim-super-without-mygov-dasp).
+ CTA 2.1.

**1.** slug `mygov-sms-code-not-received-overseas`
title: myGov SMS code not arriving overseas: what to do (48). description (152): No myGov code because your Australian number is gone? Why SMS codes fail abroad, the sign in options that work overseas and how to recover your account.
Opening: myGov only sends SMS codes to the mobile number registered on your account, so if your Australian SIM is cancelled the code goes nowhere. If you still have the number, turn on international roaming; if not, sign in with the myGov app, a passkey or myID instead, and if none is set up, recover the account with a Strong myID or open a new one (F2, F3, F7).
## Why does the code not arrive?
myGov sends the 6 digit code to the number on the account. Overseas, the ATO and myGov say you must use that same number, with international roaming on and a network your provider supports (F2). A prepaid SIM that expired after you left will not receive it. For the ATO itself, SMS only works with an Australian mobile number (F9).
## What should you check first?
The myGov checklist: reception, flight mode off, restart the phone, free storage, the blocked and spam folders, software updates (F3).
## Which sign in options work without your Australian number?
The myGov app, a passkey, an authenticator app and myID (F1, F9). They have to be set up while you can still sign in, so if you are still in Australia, add one now under Account settings, Sign in settings (F6, F7).
## What if you are already abroad and cannot sign in?
- On the sign in page choose "I didn't get my code", then "Continue with Digital ID". This needs a Strong myID with the same name, date of birth and email as your myGov account (F7, F8).
- No Strong myID: create a new myGov account and link the ATO again. To reuse your email, the myGov helpdesk has to release it: +61 1300 169 468, option 1 (F3, F4).
- Linking the new account to the ATO then needs a non SMS option from F9 and the identity questions in [can't link the ATO](/blog/cant-link-ato-to-mygov).
## Can you change the number to a foreign mobile?
myGov lets you edit the number in Account settings, Contact details (F2), but the ATO accepts SMS codes only from an Australian mobile number (F9). For tax and super, a passkey or an authenticator is the realistic route.
Related: [hub](/blog/mygov-problems-tax-return-super), [lodging after you have left](/blog/how-to-lodge-tax-return-from-overseas). + CTA 2.1.

**2.** slug `mygov-account-locked-out`
title: Locked out of myGov: unlock, reset or start again (49). description (153): myGov account locked, password forgotten or secret questions lost? The official unlock steps, recovering with myID, and when a new account is the answer.
Opening: A myGov account locks after too many wrong sign in attempts, and myGov emails you your username. You unlock it on the sign in page with your username, current password, a security code and your secret question; until you do, Digital ID, passkeys and the myGov app will not work either (F3).
## How do you unlock a locked myGov account?
1. Enter your username and current password on the sign in page.
2. Select "Unlock your account now".
3. Enter the security code and answer your secret question.
4. Enter and confirm a new password, then Confirm (F3).
## Forgot your password or username?
Forgot password: enter your sign in details, choose where the code goes, enter it and set a new password. Forgot username: enter your email and myGov emails the username, 2 letters and 6 numbers (F3). If myGov turned off your email and mobile as usernames after unusual activity, sign in with that username instead (F3).
## Forgot your secret questions?
Sign in with myID, a passkey or the myGov app (F3). Secret questions are not accepted for the ATO anyway; if they are your only option, the ATO is unlinked (F9).
## When is a new account the faster route?
If the account stays locked and you cannot answer the questions, myGov says to create a new account and link your services again (F3). The old email stays tied to the old account until the helpdesk releases it: 132 307, or +61 1300 169 468 from overseas, option 1, weekdays 7 am to 10 pm and weekends 10 am to 5 pm Australian time (F4). Then link the ATO again ([how](/blog/cant-link-ato-to-mygov)).
## Can a scam lock you out?
Possibly: the ATO says "Unable to log in" can be linked to a data breach or protective measures, and to contact it (F11). Never give your myGov password to anyone; see [protecting your TFN](/blog/tfn-security-protect-from-fraud).
+ CTA 2.1.

**3.** slug `cant-link-ato-to-mygov`
title: Can't link the ATO to myGov? Errors and fixes (45). description (156): Linking the ATO to myGov fails with questions you can't answer or an error code? What the ATO asks, what each error means and what to do when it won't link.
Opening: The ATO links to myGov only after you prove your identity, either with myID at Standard or Strong or by answering questions drawn from your ATO records, such as a notice of assessment, a payslip or a bank account that received a refund. If you cannot answer them, or an error code stops you, the ATO tells you what to do next, which is usually a call on 13 28 61 or +61 2 6216 1111 from overseas (F9, F10, F13).
## Which sign in does the ATO accept?
myID (Standard or Strong), a passkey, an authenticator, or an SMS code to an Australian mobile. Not secret questions (F9).
## What does the ATO ask?
You do not have to answer every topic; skipping them all counts as a failed attempt (F10). Useful for a working holiday maker: your most recent payslip; a bank account that received an ATO refund in the last 2 years; an active super account; a notice of assessment from the last 5 years; your TFN application receipt reference; your travel document if you applied for your TFN as a temporary visitor in the last 4 years (F10). In your first year you may not have a notice of assessment or a refund yet, so the payslip and super account usually matter most.
## What do the error codes mean?
| Code | Meaning and fix (F11) |
|---|---|
| IDD.002, IDD.004, IDD.006 | Details do not match: check TFN (9 digits, no spaces), name and address. One name only goes in Family name. |
| NOA.002, BANKACC.002, SUPERACC.002, TVLDOC.002 | Your answer did not match: check the format. |
| LCK.001 to LCK.005 | Too many attempts: wait until the date and time shown. |
| OVK.001 | Sign in method not supported: sign in with myID, or contact the ATO. |
| IDD.003, ICI.001, OVK.002 | Cannot link online: contact the ATO. |
| A927.06, proxy error, session expired | Wait one hour, close every browser window, start again. |
## The ATO does not appear in myGov
Go to View and link services. If the ATO shows as linked, Unlink, wait, then Link again (F11).
## Who to call
ATO 13 28 61, or +61 2 6216 1111 from overseas, 8 am to 5 pm AEDT weekdays, in English; TIS +61 3 9268 8332 for another language (F13).
+ CTA 2.1.

**6.** slug `tax-return-without-mygov`
title: Tax return without myGov: the ways that still work (51). description (153): No myGov access after a working holiday? You can still lodge on paper from overseas, or have a registered tax agent prepare it. What each route involves.
Opening: You only need myGov to lodge your own return online through myTax. The ATO accepts two other routes: a registered tax agent, or a paper return by post, which you can send from overseas (F14, F15). Paper is slower: the ATO says most paper refunds issue within 50 business days, against about 10 for online returns (F14).
## Why is myGov the usual route?
myTax sits inside ATO online services, which you reach through myGov linked to the ATO (F9). If the link is broken, see the [hub](/blog/mygov-problems-tax-return-super).
## How does a paper return work from overseas?
Order the paper return pack online or by phone, complete it, and post it to GPO Box 9845, SYDNEY NSW 2001 AUSTRALIA (F15). You need every employer's income figures; the [past years guide](/blog/past-years-tax-returns-working-holiday) explains where they come from.
## How does a registered tax agent route work?
Only registered tax agents may charge to prepare and lodge a return (F14). An agent works from your ATO record through the agent channel, so you do not sign in to myGov (see [DIY or agent](/blog/diy-tax-return-vs-tax-agent-working-holiday)). Any refund still needs an account it can be paid into; [lodging after you have left](/blog/how-to-lodge-tax-return-from-overseas) covers the bank account side.
## Does fixing myGov make sense instead?
If you are still in Australia with your number, often yes: add a passkey or authenticator now (F6). If you are home and the account is locked or linked to a dead SIM, the recovery steps need a Strong myID or a new account (F7).
+ CTA 2.1.

**7.** slug `claim-super-without-mygov-dasp` (category "Super")
title: Claim your super without myGov: DASP from overseas (50). description (150): You don't need myGov to claim your super after a working holiday. How the free DASP online application works with your passport, TFN and fund details.
Opening: The ATO's DASP online application does not use myGov. You apply with your personal details, email, passport country and number and your fund's details, and adding your TFN lets the system find your super accounts for you (F17). It is free, can be started in Australia and finished after you leave, and checks your immigration status itself (F16).
## Where does myGov come in at all?
Only for finding super before you go: ATO online services or the ATO app show your accounts once myGov is linked (F16). The DASP online system does the same search with your TFN (F17), and our guide to [finding lost super](/blog/how-to-find-lost-superannuation) covers the rest.
## When can you apply?
Once you have left Australia, hold no other active Australian visa and your visa has ceased (F16). See [how long DASP takes](/blog/how-long-does-dasp-take).
## What if the balance is $5,000 or more?
The fund may want certified copies of your ID, and a paper claim may need a Certification of Immigration Status from Home Affairs, which has a fee (F16). [DASP documents](/blog/dasp-documents-required) lists them.
## Can someone else claim for you?
Yes. A registered tax agent can act with your written authority (F16).
+ CTA 2.1 (guide 7 variant).

**4. (P2)** slug `myid-foreign-passport-working-holiday`
title: myID with a foreign passport: what it can reach (47). description (158): Setting up myID on a working holiday visa? Your foreign passport counts once, through your visa. What Standard and Strong need, and what it means for the ATO.
Opening: myID only uses your foreign passport to check your Australian visa, and that counts as one document. Standard needs two, so you also need an Australian driver licence, an ImmiCard or a Medicare card; with the visa alone you stay at Basic, which reaches only limited services (F12). Strong needs Australian identity documents and a photo check (F12), so most working holiday makers cannot use myID to recover a locked myGov account (F7, F8).
## What gets you to Standard?
Visa (via the foreign passport) plus an Australian driver licence, or plus a Medicare card once the visa is verified (F12). If you hold a Medicare card through a reciprocal health care agreement, see [countries with a Medicare agreement](/blog/countries-with-medicare-agreement-australia).
## What does Standard do for the ATO?
The ATO accepts Standard or Strong to sign in and link, and says it can simplify linking (F7, F9).
## What if you cannot reach Standard?
Link the ATO with a passkey or authenticator and the identity questions ([how](/blog/cant-link-ato-to-mygov)), or skip myGov (CTA).
+ CTA 2.1.

**5. (P2)** slug `mygov-code-generator-app-retiring`
title: myGov Code Generator retiring: what to use instead (50). description (148): The myGov Code Generator app retires on 28 February 2027 and can no longer be downloaded. Which sign in options replace it, including from overseas.
Opening: myGov says the Code Generator app retires on 28 February 2027 and is no longer in the app stores, so a new phone cannot get it back (F5). Switch to an authenticator app such as Google Authenticator, Apple Passwords or 1Password (Microsoft Authenticator does not work with myGov) under Account settings, Sign in settings, Authenticator (F6).
## Why switch before you leave Australia?
The Code Generator overseas also needs an Australian mobile for SMS backup (F5). An authenticator does not use SMS; keep the phone's clock right because codes are time based (F6).
## Lost the phone with the app?
Use another option you set up (passkey, myGov app, myID), or follow the [locked out guide](/blog/mygov-account-locked-out) (F3).
+ CTA 2.1. Review after 28 Feb 2027 (rewrite to past tense).

### 2.3 FAQ additions to money pages (P1.2)
EN /tax-return: Q "Do I need a myGov account for my tax return?" A "No. myGov is only needed to lodge it yourself online. The ATO also accepts returns prepared by a registered tax agent and paper returns (F14 URL). We deal with the ATO directly, so you never sign in to myGov, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO." Link: /blog/mygov-problems-tax-return-super.
EN /superannuation: Q "Do I need myGov to claim my super?" A "No. The ATO's DASP online application asks for your passport, your fund's details and, if you have it, your TFN, not a myGov sign in (F17 URL). myGov only helps you see your funds before you leave." Link: /blog/claim-super-without-mygov-dasp.
(If the FAQ feeds FAQPage-like JSON-LD: the rules say Organization schema only, so keep it as visible text only.)

### 2.4 Inbound link sentences (P1.3, appended, openings untouched)
- how-to-lodge-tax-return-working-holiday, after l.1240: "If you are already stuck, our [myGov problems guide](/blog/mygov-problems-tax-return-super) lists each fix."
- how-to-find-lost-superannuation, after l.2040: "The DASP claim itself does not need myGov: see [claiming super without myGov](/blog/claim-super-without-mygov-dasp)."
- early-tax-return-leaving-australia, new list item after l.3480: "- A passkey or authenticator on myGov, because SMS codes need your Australian number ([why](/blog/mygov-sms-code-not-received-overseas))"
- tfn-security-protect-from-fraud l.5870 item: append " ([what to do](/blog/mygov-sms-code-not-received-overseas))".
- past-years-tax-returns-working-holiday l.7841 item: append " (if not, see [a tax return without myGov](/blog/tax-return-without-mygov))".

### 2.5 SVT (English text = WHT texts adapted, no links in body; related via long/en/links.ts LONG_ALSO; sources = F URLs)
Students differ: many stay on a 485 and keep an Australian SIM, but leave after study; a student visa holder verifies the visa
through the foreign passport for myID exactly as above (F12). CTA (no fees, unlike batch-11 l.857): "Student Visa Tax operates
under the supervision of a registered tax agent. We deal with the ATO directly, so you do not need myGov, and each return is
reviewed and signed off by a registered tax agent before it is lodged with the ATO. You can message Student Visa Tax on WhatsApp."
| SVT slug (new, unique) | category | title (en) | from WHT guide |
|---|---|---|---|
| mygov-problems-international-students | Tax return | myGov not working? Fixes for students' tax and super | Hub |
| mygov-sms-code-overseas-international-students | Tax return | No myGov code after leaving Australia: what students can do | 1 |
| cant-link-ato-mygov-international-students | Tax return | Can't link the ATO to myGov: a guide for students | 3 |
| myid-foreign-passport-international-students | Tax return | myID on a student visa: what your passport can verify | 4 |
| tax-return-without-mygov-international-students | Tax return | Tax return without myGov for international students | 6 |
| claim-super-without-mygov-international-students | Super | Claim your super without myGov after studying | 7 |
Related lists: each starts with 'home' then 'superannuation' (super one) per links.ts convention, then lodge-from-overseas,
lodging-tax-return-after-going-home-students, how-to-find-lost-super-international-students, past-years. zh and vi: write
natively all six (zh students heavy on myID and SMS issues; vi same set). answer field = the opening's first sentence.

### 2.6 WHT localisation map (same slugs as EN; DE du, FR vous, IT tu, ES tuteo; JA never 税理士 for us)
| Guide | de | ja | fr | it | es | Why |
|---|---|---|---|---|---|---|
| Hub | P2 | P2 | P3 | P3 | P3 | DE "ohne myGov" proven (a14 l.49); JA strongest guide market |
| 1 SMS overseas | P2 | P2 | P3 | P3 | P3 | Core post-departure problem in every market |
| 2 Locked out | P3 | P2 | no | no | no | JA readers search procedural detail; others covered by hub |
| 3 Can't link ATO | P2 | P2 | P3 | P3 | P3 | Community threads only in SERP |
| 4 myID passport | P3 | P3 | no | no | no | Smaller; hub covers it |
| 5 Code Generator | no | no | no | no | no | Time bound, EN only |
| 6 Without myGov | P2 | P2 | P3 | P3 | P3 | Money intent; FR/IT/ES link native flagships (/fr/tax-return-australie-pvt, /es/devolucion-impuestos-australia) |
| 7 Super without myGov | P2 | P2 | P3 | P3 | P3 | Strongest DASP angle; links /<l>/superannuation |
Money page FAQ (2.3) in all five languages: P2, beside the existing myGov compare blocks.

## 3. What NOT to do
- Do not write about a phone "linking code" or promise the ATO will link by phone: not on any current ATO page (1.1).
- Do not say a foreign mobile works for ATO SMS codes (F9 says Australian mobile), or that myID can reach Strong with a foreign passport (F12).
- Do not reuse the UK High Commission advice (Code Generator): outdated (F5).
- No "we lodge", "we are a tax agent", no refund amounts or timing promises (quote ATO's 10 and 50 business days as ATO figures only), no prices (SVT CTA drops the fee line), no dashes, no AI mentions, no SVT mention on WHT or reverse.
- Do not touch titles or descriptions of existing pages (frozen to 7 Dec) or the openings of frozen guides; P1.3 only appends.
- Do not create a new blog category for myGov (code change, thin category); use "Tax Return" and "Super".
- Do not retarget how-to-lodge-tax-return-from-overseas toward myGov access: new guides own access, it keeps lodging-from-abroad.
- Do not tell readers to share passwords; keep "a registered agent never needs your myGov password" consistent with existing pages.
- Guide 5 goes stale on 28 Feb 2027: add a calendar check, or skip it.
