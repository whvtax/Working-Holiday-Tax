import type { Guide } from './data';

// myGov problem set (plan 3, 24 November 2026). Spread into `guides` in data.ts.
// Facts: S/plan3/r11-mygov-problems.md and r16-facts.md (myGov, ATO, myID pages, checked November 2026).
export const mygovGuides: Guide[] = [
 // ─── Tax Return: myGov problem hub ─────────────────────────────────────────
 {
 slug: "mygov-problems-tax-return-super",
 title:
 "myGov not working? Fixes for your tax return and super",
 description:
 "Locked out of myGov, no SMS code abroad, can't link the ATO or myID won't take your passport? Each fix, and how to get your tax back without myGov.",
 category: "Tax Return",
 date: "24 November 2026",
 readTime: 5,
 body: `
You do not need a working myGov account to get your working holiday tax return done or to claim your super, and most myGov problems have an official fix. Nearly all of them come from one of two set ups: an account built around an Australian phone number, which stops working once the SIM lapses, or an account that only has secret questions, which the ATO never accepts.

## Which myGov problem do you have?

Four problems come up again and again after a working holiday. Each one has its own full guide with the official steps.

- **No SMS code, because your Australian number is gone.** myGov only sends the code to the mobile number on the account. The options that still work are in [myGov SMS code not arriving overseas](/blog/mygov-sms-code-not-received-overseas).
- **Account locked, or password forgotten.** [Locked out of myGov](/blog/mygov-account-locked-out) has the unlock steps, and when a new account is the quicker answer.
- **The ATO will not link, or asks questions you cannot answer.** [Can't link the ATO to myGov](/blog/cant-link-ato-to-mygov) lists what the ATO asks and what each error code means.
- **myID will not accept your passport.** [myID with a foreign passport](/blog/myid-foreign-passport-working-holiday) explains what your passport can and cannot verify.

## Why do so many working holiday makers get locked out?

Two rules on the ATO's own pages explain most of it. To use ATO online services through myGov, an SMS code only works with an Australian mobile number. And secret questions are not accepted for the ATO at all: if they are the only sign in option on your account, the ATO is unlinked from it.

So an account that worked perfectly in Melbourne can stop reaching the ATO the day your prepaid SIM lapses. The sign in options that do not depend on an Australian number are a passkey, an authenticator app, the myGov app and myID. The catch is that each of them has to be added while you can still sign in.

One option to leave out of your plans: myGov says its Code Generator app is no longer available to download and retires on 28 February 2027.

## What should you set up before you leave Australia?

If you are still in Australia, these steps take a few minutes now and are much harder to do from overseas.

1. Add a passkey or an authenticator app under Account settings, Sign in settings. myGov names Google Authenticator, Apple Passwords and 1Password as examples that work.
2. Check that the Australian Taxation Office shows under your linked services.
3. If you hold an Australian driver licence or a Medicare card, consider a Standard myID. myID cannot verify a temporary resident's visa from outside Australia, so this only works before you fly.
4. Keep one Australian bank account open, because the ATO pays tax refunds only into accounts located in Australia.
5. Write down your TFN somewhere that survives a lost phone.

## Who do you call?

For myGov sign in problems, the myGov helpdesk: 132 307 in Australia or +61 1300 169 468 from overseas, option 1. It is open 7 am to 10 pm on weekdays and 10 am to 5 pm on weekends, Australian time, and international charges may apply.

For linking and anything on your ATO record, the ATO: 13 28 61 in Australia, or +61 2 6216 1111 from overseas, 8 am to 5 pm Australian Eastern time, Monday to Friday. The Translating and Interpreting Service is on +61 3 9268 8332 if you would rather speak another language.

## Can you get your tax return done without myGov?

Yes. myGov is only needed if you lodge the return yourself in myTax. The ATO also accepts a return through a registered tax agent, or a paper return by post, and both work from outside Australia.

The ATO says most returns lodged online are processed within 10 business days, while a paper return may take up to 90 business days. The routes are compared in [tax return without myGov](/blog/tax-return-without-mygov).

## Can you claim your super without myGov?

Yes. The ATO's DASP online application asks for your personal details, an email address, your passport country and number and your fund's details. Your TFN is optional, and a myGov sign in is not on the list.

myGov only helps you see your super accounts before you leave. The claim itself is covered in [claim your super without myGov](/blog/claim-super-without-mygov), and the full process in how to [claim your superannuation after leaving Australia](/superannuation).

## Where do these facts come from?

From the myGov help pages on sign in, SMS codes and contacting myGov, the ATO pages on linking myGov and lodging from outside Australia, the ATO's help page for the DASP online application, and myID's own guidance on documents. All were checked in November 2026. Sign in options change, so if a screen looks different, the myGov help pages are the current word.

## Would you rather skip myGov altogether?

You do not need myGov for us to help. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Message us on WhatsApp with roughly where and when you worked, from Australia or from home. More on the [working holiday tax return](/tax-return).
 `,
 },

 // ─── Tax Return: no SMS code overseas ──────────────────────────────────────
 {
 slug: "mygov-sms-code-not-received-overseas",
 title:
 "myGov SMS code not arriving overseas: what to do",
 description:
 "No myGov code because your Australian number is gone? Why SMS codes fail abroad, the sign in options that work overseas and how to recover your account.",
 category: "Tax Return",
 date: "24 November 2026",
 readTime: 5,
 body: `
myGov only sends SMS codes to the mobile number registered on your account, so if your Australian SIM has been cancelled the code goes nowhere. If you still have the number, turn on international roaming; if not, sign in with the myGov app, a passkey or myID instead, and if none of those is set up, recover the account with a Strong myID or open a new myGov account.

## Why does the code not arrive?

myGov sends the code to the number on the account and nowhere else. Overseas, myGov says you have to use that same number, with international roaming turned on and a network your provider supports. A prepaid SIM that expired after you left will not receive it, however long you wait.

There is a second rule that matters for tax. For ATO online services, an SMS code only works with an Australian mobile number. The ATO recommends myID, a passkey or an authenticator to anyone who is overseas or does not have an Australian number. Both rules are on myGov's page on [using a code sent by SMS](https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms) and the ATO's page on [linking myGov to the ATO](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato).

## What should you check first if you still have the number?

myGov's own checklist, before you assume the account is broken:

- Reception, and flight mode switched off
- Roaming switched on for that Australian number
- Restart the phone
- Free storage space on the phone
- The blocked and spam folders
- Software updates for the phone

## Which sign in options work without your Australian number?

The myGov app, a passkey, an authenticator app and myID. None of them needs an SMS, and the ATO accepts a passkey, an authenticator and myID at Standard or Strong for its online services.

They all share one condition: they have to be set up while you can still sign in. If you are reading this in Australia with the number still active, add one now under Account settings, Sign in settings. myGov names Google Authenticator, Apple Passwords and 1Password as authenticators that work, and the phone's clock has to be right because the codes are time based.

One app not to rely on: myGov says the Code Generator app is no longer available to download and retires on 28 February 2027.

## What if you are already abroad and cannot sign in?

Then the order is fixed by what you set up earlier.

1. If you added the myGov app, a passkey or myID, use it from the sign in page.
2. If not, choose "I didn't get my code" and then "Continue with Digital ID". This recovery needs a Strong myID with the same name, date of birth and email as your myGov account, and a myID not already connected to another account.
3. If you have no Strong myID, which is the usual case on a working holiday visa, create a new myGov account and link your services to it again.

The steps for recovery are on myGov's page on [recovering your account with Digital ID](https://my.gov.au/en/about/help/digital-id/recover-your-account-using-digital-id). Your old email stays tied to the old account until the myGov helpdesk releases it: +61 1300 169 468 from overseas, option 1, through [myGov's contact page](https://my.gov.au/en/about/help/contact).

## Will a new myGov account reach the ATO?

Only once it is linked, and linking needs a sign in method the ATO accepts plus an identity check against your ATO records. That check asks about things like a recent payslip or your super account. What it asks, and what each error means, is in [can't link the ATO to myGov](/blog/cant-link-ato-to-mygov).

If the old account is not just missing codes but locked, the unlock steps come first: see [locked out of myGov](/blog/mygov-account-locked-out).

## Can you change the number to a foreign mobile?

myGov lets you edit the mobile number in Account settings, Contact details, once you are signed in. For tax that does not solve much, because the ATO accepts SMS codes only from an Australian mobile number. For your tax return and your super, a passkey or an authenticator is the realistic route.

## Does any of this stop your refund?

No. A missing code blocks one way of lodging, not what you are owed. Every other myGov problem and its fix is in the [myGov problems guide](/blog/mygov-problems-tax-return-super).

Sources: myGov help pages on SMS codes, sign in help, authenticators and Digital ID recovery, and the ATO page on linking myGov, checked November 2026.

## Would you rather skip myGov altogether?

You do not need myGov for us to help. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Message us on WhatsApp with roughly where and when you worked, from Australia or from home. More on the [working holiday tax return](/tax-return).
 `,
 },

 // ─── Tax Return: locked out ────────────────────────────────────────────────
 {
 slug: "mygov-account-locked-out",
 title:
 "Locked out of myGov: unlock, reset or start again",
 description:
 "myGov account locked, password forgotten or secret questions lost? The official unlock steps, recovering with myID, and when a new account is the answer.",
 category: "Tax Return",
 date: "24 November 2026",
 readTime: 5,
 body: `
A locked myGov account is unlocked on the sign in page with your username, your current password, a security code and your secret question. myGov locks an account after too many wrong sign in attempts, and until it is unlocked, Digital ID, passkeys and the myGov app will not get you in either.

## How do you unlock a locked myGov account?

myGov sets out four steps, and they all happen on the normal sign in page.

1. Enter your username and current password.
2. Select "Unlock your account now".
3. Enter the security code and answer your secret question.
4. Enter and confirm a new password, then select Confirm.

The unlock asks for a security code, so it only works if you can still receive the code myGov sends. The steps are on myGov's [sign in help page](https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help), which is also where myGov posts changes.

## Forgot your password or username?

These are separate from a lock, and both are fixed from the sign in page.

- **Forgot password:** enter your sign in details, choose where the code goes, enter it and set a new password.
- **Forgot username:** enter your email and myGov emails you the username. A myGov username is two letters followed by six numbers.
- **Email or mobile no longer accepted as a username:** after unusual activity myGov may turn these off, and you then sign in with the username itself.

If the code for a reset goes to an Australian number you no longer have, the problem is really the SMS code, and the options in [myGov SMS code not arriving overseas](/blog/mygov-sms-code-not-received-overseas) apply.

## Forgot your secret questions?

Then sign in with something that does not use them: myID, a passkey or the myGov app, if you set one up. Secret questions are worth replacing anyway. The ATO does not accept them for its online services, and if they are the only sign in option on an account, the ATO is unlinked from it.

## When is a new account the faster route?

When the account stays locked and you cannot answer the questions, or you cannot receive the code. myGov's answer in that case is to create a new account and link your services again.

There is a recovery route first, through Digital ID, but it needs a Strong myID with the same name, date of birth and email as the old account, and it does not work while the account is locked. Most working holiday makers do not hold a Strong myID, so for them the new account is usually the realistic answer. The ATO sets out both routes on its page on [when you can't sign in to myGov](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account).

## Why can't you reuse your email on the new account?

Because it is still tied to the old one. The myGov helpdesk can release it.

- In Australia: 132 307, option 1
- From overseas: +61 1300 169 468, option 1
- Hours: 7 am to 10 pm on weekdays, 10 am to 5 pm on weekends, Australian time, closed on national public holidays

International charges may apply. The numbers are on [myGov's contact page](https://my.gov.au/en/about/help/contact).

## What happens to your tax records?

They stay where they are. Your tax record is held by the ATO, not by myGov, so once a new account is linked to the ATO, ATO online services show the same record. Linking needs an ATO approved sign in method and an identity check against your records; [can't link the ATO to myGov](/blog/cant-link-ato-to-mygov) covers what the ATO asks.

## Can a scam lock you out?

It can be part of it. The ATO's help page for online services says some sign in problems can be connected to a data breach or to protective measures on a record, and asks you to contact it. Never give your myGov password to anyone, including someone offering to fix the account for you; [protecting your TFN](/blog/tfn-security-protect-from-fraud) lists the warning signs.

Other myGov problems and their fixes are collected in the [myGov problems guide](/blog/mygov-problems-tax-return-super).

Sources: myGov sign in help and contact pages, and the ATO page on when you can't sign in to myGov, checked November 2026.

## Would you rather skip myGov altogether?

You do not need myGov for us to help. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Message us on WhatsApp with roughly where and when you worked, from Australia or from home. More on the [working holiday tax return](/tax-return).
 `,
 },

 // ─── Tax Return: ATO will not link ─────────────────────────────────────────
 {
 slug: "cant-link-ato-to-mygov",
 title:
 "Can't link the ATO to myGov? Errors and fixes",
 description:
 "Linking the ATO to myGov fails with questions you can't answer or an error code? What the ATO asks, what each error means and what to do when it won't link.",
 category: "Tax Return",
 date: "24 November 2026",
 readTime: 5,
 body: `
The ATO links to myGov only after you prove your identity, either with myID at Standard or Strong or by answering questions drawn from your ATO records, such as a payslip, a super account or a bank account that received a refund. If you cannot answer them, or an error code stops you, the ATO tells you what to do next, and for some error codes that means contacting it on 13 28 61, or +61 2 6216 1111 from overseas.

## Which sign in methods does the ATO accept?

Four, and the choice matters before you even start linking.

- myID at Standard or Strong
- A passkey
- An authenticator app
- An SMS code sent to an Australian mobile number

Secret questions are not on the list. If they are the only sign in option on your myGov account, the ATO is unlinked, and an error such as OVK.001 means the method you used is not supported. The rules are on the ATO page on [creating a myGov account and linking it to the ATO](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato).

## What does the ATO ask?

Questions built from what it already holds about you. You do not have to answer every topic, but skipping all of them counts as a failed attempt.

The topics that fit a working holiday maker best:

- Your most recent payslip
- An active super account
- A bank account that received an ATO refund or earned interest in the last 2 years
- A notice of assessment from the last 5 years
- The receipt reference from your TFN application
- Your travel document, if you applied for your TFN as a temporary visitor in the last 4 years

In your first year in Australia there may be no notice of assessment or refund yet, so a payslip, your super account and your passport usually do the work. The full list is on the ATO page on [information you need to link myGov to the ATO](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato/information-you-need-to-link-mygov-to-the-ato).

## What do the error codes mean?

The ATO groups them like this, and each group has a different fix.

- **IDD.002, IDD.004, IDD.006:** your details do not match. Check your TFN (9 digits, no spaces), your name and your address. If you have only one name, it goes in Family name.
- **NOA.002, BANKACC.002, SUPERACC.002, TVLDOC.002:** an answer did not match. Check the format you typed it in.
- **LCK.001 to LCK.005:** too many attempts. Wait until the date and time shown, then try again.
- **OVK.001:** the sign in method is not supported. Sign in with myID, or contact the ATO.
- **IDD.003, ICI.001, OVK.002:** the record cannot be linked online. Contact the ATO.
- **A927.06, a proxy error or session expired:** wait one hour, close every browser window and start again.
- **Error 001:** check your device meets the minimum system requirements, or try another device or later. **Error 002:** an ad blocker, browser add on or anti-virus software is blocking the page; allow ato.gov.au or try another browser.

The current list is on the ATO's [help and support page for online services](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/help-and-support-for-online-services-individuals).

## Does a Standard myID make linking easier?

The ATO says a Standard myID can simplify the linking process, because the identity check is already done. Whether you can reach Standard with a foreign passport depends on your other documents; see [myID with a foreign passport](/blog/myid-foreign-passport-working-holiday).

## What if the ATO does not appear in myGov?

Go to View and link services. If the ATO shows as linked but will not open, select Unlink, wait, then Link again.

## Who do you call when it still will not link?

The ATO on 13 28 61 in Australia, 8 am to 6 pm on weekdays, or +61 2 6216 1111 from overseas, 8 am to 5 pm Australian Eastern time, Monday to Friday. The overseas line is in English; the Translating and Interpreting Service on +61 3 9268 8332 can connect you in another language.

If you are trying to link only to lodge a return, a failed link does not have to stop it. [Tax return without myGov](/blog/tax-return-without-mygov) compares the other routes, and the rest of the myGov fixes are in the [myGov problems guide](/blog/mygov-problems-tax-return-super).

Sources: ATO pages on linking myGov, the information you need to link, and help and support for online services, checked November 2026.

## Would you rather skip myGov altogether?

You do not need myGov for us to help. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Message us on WhatsApp with roughly where and when you worked, from Australia or from home. More on the [working holiday tax return](/tax-return).
 `,
 },

 // ─── Tax Return: myID with a foreign passport ──────────────────────────────
 {
 slug: "myid-foreign-passport-working-holiday",
 title:
 "myID with a foreign passport: what it can reach",
 description:
 "Setting up myID on a working holiday visa? Your foreign passport counts once, through your visa. What Standard and Strong need, and what it means for the ATO.",
 category: "Tax Return",
 date: "24 November 2026",
 readTime: 5,
 body: `
myID uses your foreign passport only to check your Australian visa, and that counts as one document. A Standard myID needs two, so you also need an Australian driver licence or a Medicare card; with the visa alone you stay at Basic, which reaches only limited services.

## What is myID, and why does it matter for tax?

myID is the Australian Government's Digital ID app. It proves who you are once, at a set strength, and services such as myGov and the ATO then accept that proof instead of asking again. The ATO accepts myID at Standard or Strong to sign in to its online services, and myID is not tied to a phone number, so it keeps working if you change numbers or go overseas.

That makes it the most useful sign in for a working holiday maker, but only if you can get it to Standard.

## What does your foreign passport count for?

myID lists the documents it can verify. A foreign passport is not on the list as a passport. It is used to look up your Australian visa, and the visa is what counts.

So the passport you travel on is one document, never two. The full list is on myID's page on [verifying your ID](https://www.myid.gov.au/verifying-your-id-in-myid).

## What gets you to Standard?

Any two documents from myID's list. For most working holiday makers the realistic pairs are:

- Your visa, through your foreign passport, plus an Australian driver licence
- Your visa, through your foreign passport, plus a Medicare card, which myID accepts once one other document is verified
- An ImmiCard, if you hold one, with one of the above

Verifying only one document leaves you at Basic. If you hold a Medicare card through a reciprocal health care agreement, see [countries with a Medicare agreement](/blog/countries-with-medicare-agreement-australia) for which nationalities qualify. myID's [set up page](https://www.myid.gov.au/set-up) explains the strengths in full.

## Can you reach Strong?

Strong adds a photo check, and myID matches your photo against an Australian document: an Australian passport, or a Western Australian driver licence. A foreign passport cannot be used for it, so most working holiday makers cannot reach Strong.

That matters for one specific reason. Recovering a myGov account through Digital ID needs a Strong myID with the same name, date of birth and email as the account. Without Strong, a locked or unreachable account is recovered by opening a new one, as set out in [locked out of myGov](/blog/mygov-account-locked-out). The recovery rule is on myGov's page on [recovering your account with Digital ID](https://my.gov.au/en/about/help/digital-id/recover-your-account-using-digital-id).

## Can you set it up after you leave Australia?

Not with your visa. myID says a temporary resident who is outside Australia cannot verify their visa in myID, and the same applies to a visa that has expired, been cancelled or been reissued. If myID is part of your plan, set it up and reach Standard before you fly.

## What does Standard do for the ATO?

Two things. You can sign in to ATO online services with it from anywhere, without an SMS code. And the ATO says a Standard myID can simplify linking myGov to the ATO, because your identity is already verified.

## What if you cannot reach Standard?

Then use another ATO approved sign in, a passkey or an authenticator app, and link the ATO through its identity questions about your records. What those questions cover is in [can't link the ATO to myGov](/blog/cant-link-ato-to-mygov). Or skip myGov altogether, below.

The other sign in problems and their fixes are in the [myGov problems guide](/blog/mygov-problems-tax-return-super).

Sources: myID pages on setting up and verifying your ID, the myGov page on Digital ID recovery, and the ATO pages on myID and linking myGov, checked November 2026.

## Would you rather skip myGov altogether?

You do not need myGov for us to help. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Message us on WhatsApp with roughly where and when you worked, from Australia or from home. More on the [working holiday tax return](/tax-return).
 `,
 },

 // ─── Tax Return: tax return without myGov ──────────────────────────────────
 {
 slug: "tax-return-without-mygov",
 title:
 "Tax return without myGov: the ways that still work",
 description:
 "No myGov access after a working holiday? You can still lodge on paper from overseas, or have a registered tax agent prepare it. What each route involves.",
 category: "Tax Return",
 date: "24 November 2026",
 readTime: 5,
 body: `
You only need myGov to lodge your own return online in myTax. The ATO accepts two other routes, a registered tax agent or a paper return by post, and both work from outside Australia. What you still need on every route is your TFN, the details of where you worked, and an Australian bank account for any refund.

## Why is myGov the usual route?

Because myTax sits inside ATO online services, and the ATO says lodging online from outside Australia needs a myGov account with an active link to the ATO. If the code goes to an old number, the account is locked or the link fails, that route is closed until it is fixed.

None of that changes what you are owed. It only closes one door. The ATO lists the alternatives on its page on [lodging your tax return from outside Australia](https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia).

## Which routes do not need myGov?

Three ways to lodge exist, and only the first needs myGov.

- **myTax online:** you, through myGov linked to the ATO.
- **A registered tax agent:** they work through their own agent channel, so you do not sign in to myGov at all. Only registered tax agents may charge to prepare and lodge a return.
- **A paper return:** you complete it yourself and post it, from Australia or from overseas.

## How does a paper return work from overseas?

1. Order the paper tax return pack from the ATO, online or by phone.
2. Fill it in with the income from every employer, as shown on your income statements or payslips.
3. Post it from overseas to GPO Box 9845, SYDNEY NSW 2001 AUSTRALIA.

The hard part is usually the figures, not the form. Without myGov you cannot open your income statements yourself, so you work from payslips and anything your employers sent. Our [past years guide](/blog/past-years-tax-returns-working-holiday) explains where those figures come from.

## How much slower is paper?

Much slower. The ATO says most returns lodged online are processed within 10 business days, while a paper return may take up to 90 business days, and up to 7 weeks just to show in its systems. The figures are on the ATO page on [tracking the progress of your tax return](https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return).

Leaving Australia for good before 30 June, with no more Australian income to come, is a separate case. If you lodge an early return yourself before the end of the financial year, it has to be on the paper form, and the ATO quotes 50 business days for those.

## Where does a refund go without myGov?

To an Australian bank account, on every route. The ATO pays tax refunds only into accounts located in Australia, so keep one open until the refund has arrived. If yours is already closed, the Reserve Bank returns the refund to the ATO, which reissues it to new account details or, if there are none, by cheque. The ATO says it holds some cheque refunds for up to 90 days while it asks for bank details.

## Does fixing myGov make sense instead?

Sometimes. If you are still in Australia with your number, add a passkey or an authenticator now; the steps are in [myGov SMS code not arriving overseas](/blog/mygov-sms-code-not-received-overseas). If you are home and the account is locked or tied to a dead SIM, recovery needs a Strong myID or a new account, and a new account still has to pass the ATO's identity check. At that point another route is often simply faster. The full list of fixes is in the [myGov problems guide](/blog/mygov-problems-tax-return-super).

Your super is a separate claim with its own rules, and it does not need myGov either: see [claim your super without myGov](/blog/claim-super-without-mygov).

Sources: ATO pages on how to lodge your tax return, lodging from outside Australia, paper returns and tracking your return, checked November 2026.

## Would you rather skip myGov altogether?

You do not need myGov for us to help. We deal with the ATO directly, and your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Message us on WhatsApp with roughly where and when you worked, from Australia or from home. More on the [working holiday tax return](/tax-return).
 `,
 },

 // ─── Super: claim super without myGov ──────────────────────────────────────
 {
 slug: "claim-super-without-mygov",
 title:
 "Claim your super without myGov: DASP from overseas",
 description:
 "You don't need myGov to claim your super after a working holiday. How the free DASP online application works with your passport, TFN and fund details.",
 category: "Super",
 date: "24 November 2026",
 readTime: 5,
 body: `
You do not need myGov to claim your super after a working holiday. The ATO's free DASP online application asks for your personal details, an email address, your passport country and number and your fund's details, and your TFN is optional, so a locked myGov account or an old Australian number does not block the claim.

## What does the DASP online application ask for?

The ATO's help page for the online application lists it:

- Your name, date of birth and other personal details
- An email address
- Your passport country and passport number
- The details of each super account, including the fund's ABN
- Your TFN, if you have it

A myGov sign in is not on that list. Type your passport details exactly as they appear on the passport, because the system uses them to recognise you, and different details let you start a new application but not see an existing one. The list is on the ATO's [help with the DASP online application](https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system).

## Where does myGov come in at all?

Only in finding your super. With myGov linked to the ATO you can see every account in your name, including super already moved to the ATO. That is useful before you leave, but the claim does not depend on it.

To get back into a saved application you use a secret question and answer you set yourself, not an SMS code. You get three attempts; a forgotten answer means phoning the ATO.

## How do you find your funds without myGov?

Give the application your TFN and it searches for accounts held in your name. Without a TFN you enter each account yourself.

- Each employer paid into one fund, usually printed on your payslips.
- If a fund you know you had does not appear, choose "Add application" and start one with that fund's ABN. The system can look the ABN up from the fund's name.
- Super a fund has already passed to the ATO shows as "Payment of unclaimed superannuation money", "Superannuation guarantee" or "Superannuation holding accounts reserve" instead of a fund name.

More on tracking every account down is in [how to find lost super](/blog/how-to-find-lost-superannuation). If the TFN is lost too, [how to find a lost TFN](/blog/how-to-find-lost-tfn) explains the ATO's routes.

## When can you submit it?

Once you have left Australia, your visa has expired or been cancelled, and you hold no other active Australian visa. You can start and save the application while still in Australia and submit it after you fly.

The system checks your visa status itself. If it says your visa is still active, check it in VEVO; if the visa details it shows are wrong, the ATO says not to submit online and to email DASPmail@ato.gov.au. The eligibility rules are on the ATO's [DASP page](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp).

## What if the balance is $5,000 or more?

The fund may want certified copies of your ID, which is much easier to arrange while you are still in Australia. A paper claim of $5,000 or more also needs a Certification of Immigration Status from Home Affairs, which has a fee; online claims are checked with Home Affairs automatically. [DASP documents](/blog/dasp-documents-required) lists what each case needs.

## How is the money paid?

The ATO says a DASP is generally paid within 28 days of a completed application. A fund pays to an Australian bank account, by Australian dollar cheque, or by international transfer if that fund offers it. Super already held by the ATO is paid only to an Australian account in your name or by cheque.

## Can you phone instead?

Yes. From overseas call the ATO on +61 2 6216 1111, 8 am to 5 pm Australian Eastern time, Monday to Friday, and ask for 13 10 20. A registered tax agent can also apply for you with your written authority. If your myGov problem is about your tax return rather than your super, see [tax return without myGov](/blog/tax-return-without-mygov) or the [myGov problems guide](/blog/mygov-problems-tax-return-super).

Sources: ATO DASP page and help with the DASP online application, checked November 2026.

## Would you rather not do the claim yourself?

You do not need myGov for us to help with your super. We prepare each application and chase the fund that goes quiet, and we deal with the ATO directly. Working Holiday Tax operates under the supervision of a registered tax agent, and if we also do your tax return, it is reviewed and signed off by a registered tax agent before it is lodged with the ATO. Message us on WhatsApp with the names of the places you worked and roughly when. More on how to [claim your superannuation after leaving Australia](/superannuation).
 `,
 },
];
