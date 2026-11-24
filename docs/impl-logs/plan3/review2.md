# Review 2: changes since 5e610ad (independent reviewer, 24 Nov 2026)

Scope: `git diff 5e610ad` (90 files) plus untracked files: /leaving-australia in 6 languages (incl. LeavingAustraliaPage.tsx),
payday-super-working-holiday in EN, DE, JA, FR/IT/ES (chunks/21.ts), new DE and JA guides, FR/IT/ES _dates.tsx,
SVT round 2 (en/zh/vi incl. batch-13-problems), breadcrumbs, GuideCta/MobileCta trust lines, Footer, sitemap, llms files.
Repo not edited.

Counts: High 0, Medium 2, Low 7.

## Checks that passed

- Dashes: no U+2013, U+2014, U+2015 or "——" in any added line or untracked file.
- Agent/accountant/lodge claims: no "we lodge/submit", Steuerberater, 税理士 (for us), new 代行, 会计/税务师, kế toán,
  comptable, commercialista, contador in new text. The JA home blurbs that said we apply for the DASP
  (「…正しい順序で一度に申請します」, 「帰国時にDASPを申請します」) were correctly replaced.
- No refund promises, no new prices (SVT "we confirm the price on WhatsApp" repeats existing wording, no figure),
  no AI/bot mentions, no cross brand (WHT never names SVT and vice versa; the one SVT title hit is in docs/DECEMBER_TITLE_PROPOSALS.md, not the site).
- Internal links: every markdown/href internal link in added WHT text resolves (script against EN/DE/JA/FR/IT/ES guide
  sets and app routes). On the leaving pages, guides missing in a language are dropped from lists or fall back to the EN
  guide with a "(in English)" note, as designed. FR/IT/ES chunk links like `/superannuation` are localised by
  src/lib/locale-blog.ts. SVT LONG_ALSO and related slugs all exist.
- JSON-LD on the six leaving pages: WebPage + FAQPage + BreadcrumbList only. publisher/isPartOf point to `/#business`
  and `/#website`, which RootDocument declares as Organization / WebSite. No LocalBusiness, ProfessionalService or
  AccountingService anywhere new. FAQ schema text equals visible FAQ text. hreflang map identical on all six pages and in the sitemap.
- Facts checked on ato.gov.au today (WebFetch):
  - About Payday Super: from 1 July 2026, received by the fund "within 7 business days after paying your employees";
    "qualifying earnings" = OTE + all commissions + salary sacrifice + other amounts; funds have 3 business days to
    allocate or return; SGC assessed by the ATO, interest compounding daily at GIC, administrative uplift; exceptions "such as for new employees".
  - Payment deadlines for Payday Super: 20 business days for a new employee's first contribution, a new fund, or a
    rehire; out-of-cycle payments due 7 business days after the next regular payday. All six payday guides match.
  - Payday Super easier to read: "You can see the amount of super for each pay on your payslip" (SVT and EN use it correctly).
  - DASP page: visa ceased (expired or cancelled), left Australia, no other active visa; start and save before leaving;
    generally paid within 28 days of a completed application; EFT AU account, AUD cheque, international transfer only
    for fund applications; ATO-held super only to an AU account in your name or cheque; transfer to ATO after 6 months
    or more since leaving and visa ceased; $5,000 or more: fund may require certified copies; 65% WHM rate; "check with
    your employer to confirm they have paid all the super they are required to" (supports the _dates.tsx row).
  - ATO-held super: "You can claim your super at any time" as a DASP.
  - Early lodgment: leaving permanently, no Australian-sourced income except interest/dividends/royalties, paper form,
    "Processing for early lodgments is 50 business days" (updated 15 Jun 2026).
  - Status of your tax return (updated 3 Nov 2026): 10 business days online, up to 30 calendar days manual, cancelled
    lodgment shown 24 to 48 hours. DE/JA status guides match.
  - DASP online help page: 30 minutes, 45 seconds, shared secret 1 to 20 characters and three attempts, Add application
    with fund ABN, DASPmail@ato.gov.au, submitted application cannot be changed, five statuses, 28 days, +61 2 6216 1111
    8am to 5pm AET, TIS +61 3 9268 8332. SVT batch-13-problems matches in full.
  - Unpaid super from your employer, amended assessment from data matching (21 days, SIC, review does not extend
    objection time), ATO media release (2026 deadline Monday 2 November 11:59 pm, used in the DE timeline guide).

## Medium

### M1. Super help text implies we send or submit the DASP claim (Jo: never say we lodge/submit)
"before anything is sent" presupposes that something is sent by us. ES is the clearest breach: "antes de enviar nada"
reads as "before we send anything".
- src/app/(site)/blog/data.ts:6817
  Text: "we find every fund under your TFN and check the claim with you before anything is sent."
  Fix: "we find every fund under your TFN and go through the claim with you, step by step."
- src/app/(fr)/fr/blog/chunks/21.ts:59
  Text: "nous vérifions la demande avec vous avant tout envoi."
  Fix: "nous vérifions la demande avec vous, étape par étape."
- src/app/(it)/it/blog/chunks/21.ts:59
  Text: "controlliamo la domanda con te prima che parta qualsiasi cosa."
  Fix: "controlliamo la domanda con te, passo dopo passo."
- src/app/(es)/es/blog/chunks/21.ts:59
  Text: "revisamos el reclamo contigo antes de enviar nada."
  Fix: "revisamos la solicitud contigo, paso a paso."
- Note (pre-existing, not in this diff, for Jo): IT GuideCta Super body "controlliamo la richiesta con te prima dell'invio"
  has the same problem.

### M2. Fact not on the cited ATO page
- src/app/(site)/blog/data.ts:3185
  Text: "…include them in your return and keep your workings; a statutory declaration is no longer needed ([income statement not tax ready](…))."
  Why: the cited ATO page (read today) says to estimate with the gross pay estimator and keep records showing how you
  worked out the figures; it says nothing about statutory declarations. The "after 31 July" lead-in is also not on that page.
  Fix: "Still not tax ready? The ATO says to speak to your employer, and if they cannot make it tax ready they need to give you a payment summary. If the business no longer exists, you estimate your income and tax withheld, include them in your return and keep records that show how you worked them out ([income statement not tax ready](…))."

## Low

### L1. "One DASP application for each fund" is not on the ATO page
The ATO says each fund makes a separate payment and that paper forms go one to each fund; it does not say the online
system needs a separate application per fund.
- src/app/(site)/leaving-australia/page.tsx:237 "Submit one DASP application for each fund."
  Fix: "Submit your DASP application. Each fund pays its part separately, generally within 28 days of a complete application."
- Same row: (de) :232 "Für jeden Fonds einen DASP-Antrag abschicken." → "Den DASP-Antrag abschicken. Jeder Fonds zahlt seinen Teil getrennt aus."
  (ja) :231 「ファンドごとにDASP申請を提出する。」→「DASP申請を提出する。支払いはファンドごとに別々です。」
  (fr) :232, (it) :233, (es) :232: same change ("Envoyer la demande de DASP ; chaque fund paie sa part séparément." /
  "Invia la domanda di DASP; ogni fondo paga la sua parte separatamente." / "Envía la solicitud de DASP; cada fondo paga su parte por separado.").
- The running text "Each fund is its own claim" (EN :211 and translations) is acceptable if softened to "Each fund pays separately".

### L2. Hero lead says no myGov is needed for the tax return, FAQ says myGov is needed to lodge yourself
- src/app/(site)/leaving-australia/page.tsx:151 "You do not need myGov for either" vs FAQ :95 "You need myGov only to lodge yourself on myTax".
  Fix: "With us you do not need myGov for either, and nothing is lost if you have already gone."
- Same in (de) :146 "Für beides brauchst du kein myGov" → "Mit uns brauchst du für beides kein myGov"; (ja) :145
  「どちらもmyGovは不要で」→「当社にご依頼いただく場合はどちらもmyGovは不要で」; check FR/IT/ES leads (:146/:147/:146).

### L3. JA payday guide widens the 20 business day exception
- src/app/(ja)/ja/blog/data.ts:10482 「新しく雇われた人の拠出や、新しいファンドへの最初の拠出は…20営業日以内」
  Why: ATO: only the FIRST contribution for a new employee (and rehires, new fund). As written, all of a new employee's contributions get 20 days.
  Fix: 「新しく雇われた人の最初の拠出、再雇用後の最初の拠出、新しいファンドへの最初の拠出は、給料日から20営業日以内にファンドに届けばよいことになっています。」

### L4. Unpaid super: ATO wording is "contact you if it can collect"
- src/app/(site)/blog/data.ts:6801 "tells you by letter or email whether it can collect"
  Fix: "contacts you by letter or email if it can collect, and pays what it collects into your super account with interest. Not every report leads to a collection."

### L5. 2025-26 deadline row ignores the 2026 weekend extension
- src/app/(fr)/fr/_dates.tsx:28, src/app/(it)/it/_dates.tsx:28, src/app/(es)/es/_dates.tsx:28 "Pour 2025-26, c’était le 31 octobre 2026" (and IT/ES equivalents).
  Why: 31 Oct 2026 was a Saturday; the ATO accepted self-lodged returns until 11:59 pm Monday 2 November (media release, 19 Oct 2026). Not wrong as the statutory date, but incomplete next to the DE/EN timeline guide that states the extension.
  Fix (FR): "Pour 2025-26, c’était le 31 octobre 2026 ; comme il tombait un samedi, l’ATO a accepté les déclarations jusqu’au lundi 2 novembre à 23 h 59."

### L6. DE payday guide cites Moneysmart, not an ATO/Home Affairs/Fair Work page
- src/app/(de)/de/blog/data.ts:10036, 10038, 10042 ("Moneysmart … rät", "Laut Moneysmart in dieser Reihenfolge").
  Why: IMPL_RULES lists ato.gov.au, homeaffairs, fairwork as sources. The same steps are on the ATO page "Unpaid super from your employer" (verified today).
  Fix: cite https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/unpaid-super-from-your-employer and write "Laut ATO in dieser Reihenfolge".

### L7. "Leave it to us" section titles on the leaving pages read as if we file everything, super included
- (site) :265 "Leave the paperwork with us"; (de) :260 "Den Papierkram übernehmen wir"; (ja) :259 「手続きは当社にお任せください」;
  (fr) :260 "Confiez-nous les démarches"; (it) :261 "Lascia a noi le pratiche"; (es) :260 "Déjanos los trámites a nosotros".
  Why: the body is compliant (we prepare the return, update the address, find funds and check the claim with you), but
  the heading promises we take over the procedures, which for super is what Jo ruled out. Borderline, not a breach.
  Fix: "How we can help" / "So helfen wir dir" / 「当社がお手伝いできること」 / "Comment nous pouvons vous aider" /
  "Come possiamo aiutarti" / "Cómo te ayudamos".

## Not flagged (checked, fine)
- 65% on the whole taxable component, 35/45 for other visas, $5,000 certified copies, NAT 7204/74880, 6 months, 28 days, 10/30/90 business days, 50 business days only for early lodgment.
- Trust lines in GuideCta/MobileCta use the approved sentences; Super variant correctly uses the supervision line.
- Breadcrumb position 2 now points to the money page with names matching each hub; JSON-LD and visible crumb agree.
- Footer "Leaving Australia" links resolve in all six languages; sitemap adds hreflang alternates for the hub only.
