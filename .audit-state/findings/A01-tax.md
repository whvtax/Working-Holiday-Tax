# A01: Australian tax compliance review of Student Visa Tax customer-facing English text

Agent: A01 (senior Australian tax compliance reviewer). Baseline d9dbac0, branch svt-build. Read-only review.
Applicable income year for every page unless the text says otherwise: 2025-26 (1 July 2025 to 30 June 2026),
lodged from July 2026. Pages about pay rates speak of 1 July 2026 onwards (2026-27).

Method: every file in scope read in full from source (no sampling), numbers, dates, rates, thresholds and
deadlines checked line by line against my own knowledge of the ITAA 1936/1997, TAA 1953, SGAA 1992, Fair Work Act
2009 and ATO/FWO guidance, plus the project's own fact register `docs/content/svt-facts-2026-10.md`
(read-only, used to see what the authors verified against which ATO page and when). The machine has no
internet. Anything that depends on a source dated after my knowledge (mid 2026) or that I could not confirm
is marked UNVERIFIED, not compliant. Nothing was invented; where I was unsure I say so.

Severity scale: CRITICAL (business hard rule broken) / HIGH (incorrect statement that can mislead a
customer on tax or on who we are) / MEDIUM (inconsistent or unhedged, or unverified figure with real
exposure) / LOW / INFO.

Zero CRITICAL findings. The two registration sentences are the only ways the agent is described; the TPB
number 26233096 and the agent name (The Accounting Academy Services Pty Limited) are shown in the footer,
trust strip, About page and llms.txt; no "we are a registered tax agent" exists anywhere in SVT text or in
the shared Will/Mia texts (grep of `src/` for registration wording, 27 Oct). No em/en dashes seen in the
English text read. No AI/bot mention. Residency is consistently "may be"/"usually".

---

## Findings

### A01-1  HIGH  DASP 65% rate misdescribed for students with a past 417/462 visa (contradicts ATO, the site's own guides and the fact register)

Files/lines:
- `src/lib/svt/content/long/en/batch-08.ts:286` (answer), `:296`, `:319-331` (mixed-history example: $4,000 at 65% + $6,000 at 35%, "different rates can apply to different parts of the payment"), `:359` (FAQ "only for super from contributions made while on a 417 or 462 visa").
- `src/lib/svt/content/long/en/batch-11.ts:785` ("If part of your super came from work while you held a 417 or 462 visa, that part is taxed at 65%") and `:800` (FAQ, same).
- `src/lib/svt/content/long/en/batch-10.ts:288` ("A higher rate of 65% applies only to super from contributions made while you held a 417 or 462 visa") - ambiguous, reads as apportionment.

Original statement: see above. Income year: any (DASP rule in force since 1 July 2017).
Status: INCORRECT. Authority: ATO "Departing Australia superannuation payment (DASP)", DASP WHM tax rate;
Superannuation (Departing Australia Superannuation Payments Tax) Act 2007 s5 as amended 2016: if the
DASP includes any amount attributable to super contributions made while the person held a 417/462 visa,
the 65% rate applies to the whole payment (both taxed and untaxed elements), not only to the WHM part.
The site says this correctly elsewhere: `guides-en.ts:490` ("the ATO applies 65% to the whole amount"),
`batch-02.ts:565-571` (whole payment, $6,500 withheld on $10,000), and the fact register row D2.
Impact: a former WHM student reading batch-08/11 expects roughly $4,700 tax on $10,000 and receives
$3,500 net; the site contradicts itself across pages that llms.txt feeds to answer engines.
Smallest fix: in batch-08 rewrite the answer, the "When does the 65% rate apply" section, the Sofia example
($10,000 x 65% = $6,500 tax, $3,500 paid) and the FAQ to say the 65% rate applies to the entire payment
from that fund if it includes any WHM-period super; same one-sentence fix at batch-11:785 and :800 and
batch-10:288 ("applies to the whole payment if it includes super from a 417 or 462 period").
Verify: grep `65%` in long/en and confirm every instance says "whole/entire payment"; re-run the content tests.
Leave unchanged? No. It is a wrong tax rate statement on a page whose title is "usually 35%, not 65%".

### A01-2  HIGH  Shared objection text tells SVT customers "we focus specifically on Working Holiday Makers ... backpackers"

File: `src/lib/will/approved-messages.ts:129` (`o10a_why_not_accountant`). Used in `src/lib/will/playbook.ts:66-110`
(embedded in the model prompt as an approved answer) and seeded as Library entry `obj_10a` (`seed.ts:82`),
which the team can send verbatim.
Evidence: `brand-voice.ts` PROMPT_REPLACEMENTS only rewrite the exact strings "Working Holiday Makers (backpackers)"
(with parentheses) and "for backpackers"; o10a contains "Working Holiday Makers and deal" and "backpackers run into",
so neither rule matches. TEXT_REPLACEMENTS (customer path) never touch these words, and `brandLeaks` only
blocks "Working Holiday Tax", the WHT domain and phone. So the sentence can reach an SVT customer unchanged.
Status: INCORRECT for SVT (describes the business as a WHM specialist). Also a brand-separation smell
(hard rule: brands fully separate), though the other brand's name is not used, so not CRITICAL.
Smallest fix: add replacements `[/Working Holiday Makers\b/g, 'international students and graduates']` and
`[/\bbackpackers\b/gi, 'international students']` to TEXT_REPLACEMENTS (so both prompt and Library sends are
covered), and add "working holiday maker"/"backpacker" to the svt LEAKS list so a slip is blocked. Add a unit test
that `rebrandText(APPROVED.objections.o10a_why_not_accountant,'svt')` contains neither word.
Verify: run the brand-voice tests. Leave unchanged? No.

### A01-3  HIGH  Medicare exemption message invites lodging with the exemption before the Medicare Entitlement Statement exists

File: `src/lib/will/approved-messages.ts:255-259` (`medicare_exemption`, also Meta template `medicare`, sent by the
system after the form; `channel.ts:720`, `i18n.ts:556`): "Once you've submitted your application, send me a
screenshot and we'll include the exemption in your tax return."
Status: INCORRECT as a process statement for SVT. Authority: ATO "Medicare levy exemption: not entitled to
Medicare benefits" ("you need to get an MES ... before you lodge"; M3 in the fact register), and the site's own
pages: `guides-en.ts:239` note "The ATO says you must wait for your MES before you lodge", repeated in
`blog-en.ts:155, 956`, `batch-01.ts:654`, `batch-03.ts:811`, `batch-09.ts` etc.
Impact: the WhatsApp flow promises to claim an exemption on the strength of an application screenshot, which is
exactly what the website tells students not to do; if Services Australia refuses, the return is wrong and must be
amended (the message's last line concedes this). For students (unlike most WHMs) the exemption is the normal case,
so this message goes to most SVT customers.
Smallest fix (SVT twin only, WHT unchanged): "Once Services Australia sends you the statement, send us a copy and
we include the exemption in your return. We wait for the statement before anything is lodged." Keep the last
sentence. If a `medicare_svt` Meta twin is created, use that wording.
Leave unchanged? No for SVT; the site and the chat currently say opposite things.

### A01-4  MEDIUM  Lodgement messages promise a refund "within 14 business days"

File: `src/lib/will/approved-messages.ts:280` (`lodged`) and `:314-315` (`lodged_confirmation`, Meta template):
"Your refund should arrive in your bank account within 14 business days."
Status: OUTDATED/unhedged. The ATO's published standard is "most online returns within 2 weeks (12 business
days)", and processing can take 30 calendar days with a manual check (stated correctly in `blog-en.ts:145-147`).
The brief allows only hedged wording ("usually 2 to 4 weeks"). It also presumes a refund; a payable variant
exists (`lodgedPayableTemplateKey`), so the risk is the figure, not the branch.
Smallest fix (SVT twin): "Any refund usually arrives in your bank account within 2 to 4 weeks, once the ATO
has processed it." Verify: template text at Meta matches.
Leave unchanged? Tolerable short term (it says "should"), but it is the one time-promise in the whole SVT flow.

### A01-5  MEDIUM  Website guarantee is unconditional; the WhatsApp rules withhold it for ABN and foreign-income customers

Files: `home-en.ts:25-35` ("If your refund is smaller than our fee, we pay you the difference ... If there is no
refund, or you owe tax, the full fee applies"), `guides-en.ts:82-90` (pricing guarantee, same, follows the $385
ABN price with no carve-out), `llms.ts:35`. Versus `approved-messages.ts:59-65, 67-92` (price_tfn_abn carries no
guarantee; $330/$495 foreign-income prices) and `playbook.ts:435` ("NOT FOR ABN INCOME ... never mention it").
Status: INCONSISTENT (business terms, not tax law). Impact: an SVT customer who read the pricing page is told
in writing the guarantee applies to any return, then on WhatsApp is told (if they ask) that with ABN income the
fee is fixed whatever the result; a $385 customer with a $200 refund has a written promise of $185 back. Also the
site says "Two prices" while Will can quote $330/$495 for foreign income.
Smallest fix: either add one sentence to home/pricing/llms ("The guarantee applies to returns with TFN jobs only;
with ABN or foreign income the fee is fixed") or keep the guarantee for all SVT returns and tell Mia so in the
SVT addendum. Jo's decision; the hard rule only fixes the wording of the guarantee, not its scope.
Leave unchanged? Not advisable: the pricing page is the customer's contract-level statement.

### A01-6  MEDIUM (UNVERIFIED)  "$1,000 standard deduction from 2026-27" stated as settled law on ~15 pages

Files: `blog-en.ts:394, 413`; `batch-01.ts:858`; `batch-08.ts:1076`; `batch-10.ts:60-74, 99-178` (whole article
`standard-deduction-1000-international-students`), `:240-242, 567, 842, 938`; `batch-12-deductions.ts:92-94, 184,
272-274, 362, 458, 555, 651, 743, 936, 1035, 1132`.
Status: UNVERIFIED. The measure (standard deduction of up to $1,000 for resident individuals with labour income,
replacing the $300/$150 substantiation thresholds, from 2026-27) was announced by the Treasurer in August 2025.
I cannot confirm from my own knowledge that it received Royal Assent, or the final design details the articles
state as "the ATO says" (cap at labour income, exclusions for union fees, tax agent fees, donations; written
evidence for all expenses above the standard amount; foreign residents excluded). The fact register (row W5)
cites an ATO page "Standard deduction for work related expenses (updated 14 Sep 2026), read 27 Oct", which would
settle it if that page exists as described.
Risk if not enacted: a full article and a dozen paragraphs describe a non-existent rule. Risk if enacted: none.
Smallest fix: one person opens the cited ATO URL; if the page says "proposed"/"subject to passage", add "the
government has announced" in the standard-deduction article and the one-liners. Otherwise close as VERIFIED.
Also the articles correctly say it does not apply to 2025-26 returns, which is the live return; exposure is low.

### A01-7  MEDIUM (UNVERIFIED)  Penalty unit "$364 from 1 July 2026", maximum "$1,820"

Files: `blog-en.ts:947, 973` ("can reach $1,820"); `batch-09.ts:819-820, 838-846, 861, 891-892` (the article
states "The ATO says the penalty unit amount is $364 for infringements on or after 1 July 2026 ... from 7 November
2024 to 30 June 2026, it was $330"); `batch-09.ts:964`.
Status: the $330 figure from 7 Nov 2024 is VERIFIED CORRECT (Crimes Act 1914 s4AA as amended). The $364
figure depends on the triennial CPI indexation due 1 July 2026 and is after my knowledge; it is internally
consistent (5 x $364 = $1,820) but it is NOT in the fact register (row X2 records the 28-day/5-unit rule only,
with no dollar value). UNVERIFIED. Authority: Crimes Act 1914 s4AA; TAA 1953 Sch 1 s286-80; ATO "Penalty units".
Smallest fix: confirm against the ATO "Penalty units" page and add a row to the register; if the unit differs,
the three dollar figures ($364, $728 ... $1,820) and the blog "facts" box need one edit each.
The surrounding rule (1 unit per 28 days or part, max 5 units, generally not applied to an isolated late
return, warning first, remission on request) is VERIFIED CORRECT.

### A01-8  LOW (UNVERIFIED)  National minimum wage $26.44 / $1,004.90 with awards up 4.75%

Files: `blog-en.ts:1057-1100`; `llms.ts:47`; `batch-02.ts:886-983`; `batch-03.ts:113, 208, 286`; many job articles.
Status: after my knowledge; UNVERIFIED. Internal check: the 2025-26 NMW was $24.95; $24.95 x 1.0475 = $26.14, so
$26.44 implies about a 6.0% NMW rise alongside a 4.75% award rise. The FWC has usually moved both by the same
percentage, so the pair is unusual though not impossible. The register (F5) cites the FWO media release of
1 July 2026, read 26 Oct. Recommend a 2-minute re-read of that release to confirm both numbers. Casual loading
arithmetic ($33.05) and all worked examples are arithmetically correct from $26.44.

### A01-9  LOW  Foreign resident without a TFN: "47% still applies" is wrong (45%)

File: `batch-00.ts:470-472` FAQ: "I am a foreign resident for tax purposes. Does the 47% still apply? Yes".
Status: INCORRECT. Authority: ATO "Tax file number and withholding declarations" / PAYG withholding where
no TFN quoted: 47% (top rate plus 2% Medicare levy) for residents, 45% for foreign residents (no levy).
The generic phrasing "top rate plus the Medicare levy" on ~20 other lines is acceptable as a simplification.
Fix: "Foreign residents are taxed at 45% without a TFN (no Medicare levy); residents 47%." Leave unchanged? Acceptable
but easy to fix.

### A01-10  LOW  TPB seal alt text reads as a registration claim by Student Visa Tax

Files: `src/lib/svt/i18n.ts:82` (`sealAlt: 'Tax Practitioners Board registered, Tax Agent Number {tpb}'`),
rendered by `src/components/svt/Footer.tsx:32` next to the supervision sentence; `form-brand-svt.tsx:157`
(same image on the form). Chinese/Vietnamese alts are the same shape.
Status: not one of the two allowed sentences; a screen reader hears "Tax Practitioners Board registered, Tax Agent
Number 26233096" with no agent name. Whether a supervised, non-registered entity may display the TPB registered
symbol at all is a TPB terms-of-use question I cannot verify offline (UNVERIFIED); WHT does the same today.
Fix: `'Registered tax agent symbol of {agent}, Tax Agent Number {tpb}'` (and zh/vi equivalents). Leave unchanged?
Low risk, but it is the one place the word "registered" is not attached to the agent.

### A01-11  LOW  Mia's prompt still carries WHT-only rules that the SVT addendum does not fully override

Files: `src/lib/will/brand-voice.ts:74-84` (addendum) versus `src/lib/will/playbook.ts:136, 170-171, 214`
(residency quiz ending "you count as a Working Holiday Maker for tax"), `:163, 534` ("we do not offer a super
service at the moment" vs addendum "say we can help with it, and hand it to the team"), `:488` ("mistakes
backpackers make"), and `approved-messages.ts:122` (o3: "We previously offered a free eligibility check", untrue
for a new brand).
Status: INCONSISTENT. The addendum says it overrides WHM-only rules and names the quiz, but the DASP rule is not
WHM-only, so two contradictory instructions stand. Tax content of the addendum itself is VERIFIED CORRECT
(6-month rule hedged, MES via myGov from 1 July and wait before lodging, $385 for ABN, no DASP price).
Fix: add to the addendum: "Super (DASP): ignore any rule above that says we do not offer it." Add
`for backpackers`-style replacements for "backpackers make". Consider excluding o3 for SVT.
Leave unchanged? Acceptable for launch if monitored; the addendum is appended last and models usually honour it.

### A01-12  LOW (UNVERIFIED)  "To use the agent's later date you must be on the client list by 31 October. That date does not move to Monday."

Files: `blog-en.ts:939`, `deadline.ts:24-25`, `llms.ts` via deadlineFact.
Status: the "contact a registered agent before 31 October" rule is VERIFIED CORRECT (ATO lodgment program). Whether
the next-business-day convention also applies to being added to an agent's client list when 31 Oct is a Saturday is
UNVERIFIED either way; the page takes the conservative position, which protects the customer. No change needed; if
kept, the phrase could be softened to "do not rely on the Monday".
The core deadline fact is VERIFIED: 31 Oct 2026 is a Saturday (checked), so self-lodgers have until Monday 2 Nov 2026
under the ATO's weekend rule; `SELF_LODGE_DEADLINE_MS` correctly uses end of day Perth time.

### A01-13  LOW (UNVERIFIED)  Four-year amendment period for sole traders from 2024-25

Files: `blog-en.ts:884`, `batch-06.ts:249, 618, 632`.
Status: a 2-to-4-year extension for small business entities applying to 2024-25 and later assessments was
legislated in my knowledge window, but I am not certain of the commencement year stated; UNVERIFIED. The 2-year
rule for individuals is VERIFIED CORRECT (ITAA 1936 s170(1) item 1).

### A01-14  LOW (UNVERIFIED)  "credit cards will no longer be accepted after 30 June 2027" (ATO payments)

File: `batch-06.ts:722`. Not in the register; after my knowledge. UNVERIFIED. Low exposure.

### A01-15  INFO  Minor process simplifications

- `guides-en.ts:234`, many articles: "MES applications open on 1 July". Services Australia accepts applications at
  any time; a statement requested before 30 June only covers the period to the request date. The wording "for the
  year that just ended" makes it true in practice. No change needed.
- `batch-00.ts:1088, 1130`: ABN manual review "up to 28 days". ABR text I recall is "within 20 business days". UNVERIFIED.
- `batch-00.ts:1068`: "The ATO says you cannot apply for an ABN without a TFN". Sole traders can request a TFN inside
  the ABN application in some cases; for foreign passport holders the separate online TFN application is the realistic
  path, so the practical advice stands. UNVERIFIED nuance.
- `ContactPage.tsx:42` "Lodging through us does not involve your myGov at all" is true of lodgement, but the MES the
  guides tell students to get is applied for through myGov (`guides-en.ts:235`). Consider "You do not need myGov to
  lodge with us; you may still use it for your Medicare Entitlement Statement".
- `batch-02.ts:471`, `batch-10.ts:320`: "eligibility check about 45 seconds, application about 30 minutes": register S6
  cites the ATO help page (updated 11 Oct 2024); plausible, harmless.
- `blog-en.ts:236`, `guides-en.ts:267`: "The ATO says processing can take up to 8 weeks" (MES). The 8 weeks is Services
  Australia's figure repeated on the ATO page; attribution acceptable.

---

## Verified correct (summary by topic; every instance read)

- Residency for students: consistently "an overseas student enrolled in a course of 6 months or more may be an
  Australian resident for tax purposes", never presented as the legal test; the four form criteria
  (`form-brand-svt.tsx:17-23`) are framed as "usually matter most" and mirror the resides/183-day factors; the
  foreign-resident confirm text (`:31`) is correct (no $18,200 threshold, no LITO, tax from the first dollar).
  485 holders: "may be a resident, checked each year" - correct. Temporary resident foreign-income exemption
  (s768-910 ITAA 1997) correctly described as "most foreign income not taxed, Australian income declared".
- 2025-26 resident rates: nil to $18,200; 16% to $45,000; 30% to $135,000; 37% to $190,000; 45% above. Foreign
  residents 30% from $1 to $135,000, 37% to $190,000 ($40,500 base), 45% above ($60,850 base). All worked
  examples re-computed: $20,000 -> $288 (LITO to nil); $21,000 -> $448; $24,000 -> $928/$228; $25,000 -> $1,088;
  $26,000 -> $1,248/$548; $27,000 -> $1,408/$708; $28,000 -> $1,568/$868; $30,000 -> $1,888/$1,188 vs $9,000;
  $40,000 -> $3,488, LITO $575, $2,913, levy $800; $42,000 -> $3,808/$475/$3,333; $50,000 -> $5,788; $55,000 ->
  $7,288/$175/$7,113. All correct.
- Part-year tax-free threshold: $13,464 + $4,736 x months/12, ATO example 17 April -> $14,648. Correct.
- LITO: $700 to $37,500; minus 5c per $ to $45,000 ($325); minus 1.5c per $ to $66,667; non-refundable; residents only. Correct.
- Medicare levy 2% for residents; foreign residents exempt (category 1); exemption for those not entitled needs an MES
  from Services Australia, new MES each year, dependants must also be exempt, OSHC is not Medicare; RHCA student list
  (UK, Sweden, Netherlands, Belgium, Slovenia, Italy, NZ; not Norway, Finland, Malta, Ireland) matches privatehealth.gov.au;
  OSHC medicine caps $50/$500/$1,000 and no extras match. Correct.
- No-TFN withholding 47% for residents after 28 days, 28-day TFN issue standard, TFN for life, receipt ID, no second
  application; Client Identity Support Centre 1800 467 033 (8am-6pm AEST Mon-Fri); scam check 1800 008 540;
  IDCARE 1800 595 160. Correct.
- Two jobs: claim threshold from one payer (or each if certain total < $18,200); new declaration; ask employer to
  withhold more. Correct.
- ABN: entitlement only for an enterprise, not employees; employer may not require an ABN; free via ABR; no-ABN
  withholding 47% unless payment $75 or less; GST registration at $75,000 turnover within 21 days; ride-sourcing GST
  from first trip, food delivery not; cancel ABN within 28 days of ceasing, GST cancels with it, same ABN on return;
  SERR reporting from 1 July 2023 (ride-sourcing) and 1 July 2024 (others), twice yearly; PSI 80% rule and results
  test; small business income tax offset 16%, $1,000 cap, $5m turnover, examples ($302, $384, $360) correct; company
  tax 25%/30%. Correct.
- Deductions: three rules; $300 immediate deduction and set rule; $300 substantiation threshold (car excluded) and
  $150 laundry exception for 2025-26; laundry $1/50c per load; conventional clothing (black trousers/white shirt) not
  deductible; occupation-specific chef pants; initial licence/RSA/White Card/first WWCC not deductible, renewals
  deductible; WWCC rules as per ATO page; phone 4-week record, $50 no-records threshold; tax agent fee deductible in
  year paid; self-education "sufficient connection" test; vaccinations, grooming, fines, relocation private;
  home-to-work travel private, bulky tools exception conditions; records 5 years from lodgment. Correct.
- Car expenses: cents per km 88c for 2025-26 (VERIFIED to my knowledge: the Commissioner kept 88c for 2025-26), 5,000 km
  cap, cars only (not motorcycles, not >1 tonne or 9+ passengers); logbook 12 continuous weeks, valid 5 years. Correct.
- Super: SG 12% from 1 July 2025; casuals and temporary residents eligible; under-18s only >30 hours/week; labour-only
  contractors; stapled funds from 1 Nov 2021; Payday Super from 1 July 2026 (7 business days, 20 for a new employee's
  first payment, "qualifying earnings", new SGC with 60% administrative uplift and 25% choice loading capped at $1,200,
  no SGC statement, notice to pay 28 days) matches the Treasury Laws Amendment (Payday Superannuation) Act 2025 as I know it.
  Report unpaid super tool. Correct.
- DASP (apart from A01-1): eligibility (temporary visa other than 405/410, visa ceased, left Australia, no other active
  visa incl. 485, not citizen/PR/NZ); 35% taxed element, 45% untaxed, nil tax-free component for non-WHM; not assessable
  income; free online system; 28-day service standard; start before leaving, submit after; unclaimed super to the ATO 6
  months after departure/visa end, still claimable; paper claims need certified copies, Certification of Immigration
  Status for $5,000+. Correct.
- Lodgment: 1 July to 30 June; income statements "Tax ready" by 14 July, employer may finalise later, non-STP employers
  give a payment summary by 14 July and within 14 days on request when leaving; 31 Oct self-lodger deadline, Monday
  2 Nov 2026 for 2025-26; agent program needs engagement by 31 Oct; prior-year return outstanding at 30 June -> 31 Oct;
  early lodgment only on paper when leaving permanently; lodge from overseas (myTax/agent/paper, update myGov sign-in,
  Australian bank account for refunds); processing 12 business days / 30 calendar days manual / 50 business days
  paper; non-lodgment advice (not if foreign resident with Australian income or active ABN); Tax Help about $70,000 and
  not for business income. Correct.
- Amendments and objections: individuals 2 years from day after NOA; multiple amendments allowed; objection 2 years (4
  for some), 60 days for amended assessments/penalties; Dispute Assist; ART/Federal Court. Shortfall penalties
  25/50/75% with 20% uplift and voluntary disclosure reduction. GIC daily compounding, quarterly rate, non-deductible from
  1 July 2025. Payment plans online up to $200,000. ATO offsets refunds against debts. Correct.
- Fair Work facts: visa holders have the same rights, visa not cancelled for seeking help, 13 13 94, TIS 13 14 50; pay
  slips within 1 working day with required contents; unpaid trial rules; casual loading 25% (NMW); annual leave 4 weeks,
  personal leave 10 days, casual 2 days unpaid carer's leave and 10 days paid FDV leave; casual conversion/employee choice
  (6 months/12 months small business); unfair dismissal 21 days, 6/12 months, small business <15; Horticulture Award piece
  rate guarantee from 28 April 2022, 15% above hourly, piecework record, Level 1 max 3 months; Clerks Award 3-hour minimum
  engagement example; labour hire protected rates (3-month exclusion); Hospitality Award breakage deduction limits;
  intentional underpayment criminal from 1 Jan 2025. Correct.
- Other: TRS rules ($300 one ABN, 60 days, 1/11 GST, name on $1,000+ invoices, 30 min cut-off, 60-day payment);
  AUSTRAC $10,000 cash declaration and structuring; bank interest 10% non-resident withholding, TFN withholding at the
  highest marginal rate; tips and cash assessable; 000/112. Correct.
- Fees and guarantee wording: $220 / $385 incl. GST everywhere (home, pricing, i18n ctaPrice, contact, llms, batch-11
  diy article); guarantee sentences match the fixed wording; "we confirm your price before you pay"; no refund amounts
  promised; estimates described as estimates. Correct (see A01-5 for scope).

---

## Coverage

Read in full, line by line:
- `src/lib/svt/content/home-en.ts`, `guides-en.ts` (all 10 guides), `blog-en.ts` (all 22 articles)
- `src/lib/svt/content/long/en/index.ts`, `batch-00.ts` to `batch-11.ts`, `batch-12-deductions.ts` (all long
  articles: 12+11+10+11+10+10+10+10+10+11+11+9+11 = 136 articles in these files; the brief's "~148" presumably counts
  the 22 short articles differently; every article present was read)
- `src/components/svt/form-brand-svt.tsx` (EN_RES and the English overrides; zh/vi strings seen but not assessed)
- `src/components/svt/pages/ContactPage.tsx` (en; zh/vi seen, not assessed)
- `src/lib/svt/i18n.ts` (en strings; zh/vi seen), `src/lib/svt/llms.ts`, `src/lib/svt/deadline.ts`
- `src/lib/will/brand-voice.ts` (whole file incl. SVT_PROMPT_ADDENDUM), `src/lib/will/approved-messages.ts` (whole file)

Read partially (for context only): `src/lib/will/playbook.ts` (grep hits for WHM/Medicare/DASP/residency rules),
`src/lib/will/seed.ts`, `src/lib/will/claude.ts`, `src/lib/will/suggest.ts`, `src/lib/will/channel.ts`,
`src/lib/will/i18n.ts` (grep hits), `src/lib/agent.ts`, `src/components/svt/Footer.tsx:32`,
`docs/content/svt-facts-2026-10.md` (rows cited above).

Not read (out of my scope by the task brief): `src/lib/will/svt-fixed-texts.ts` (zh/vi), `home-zh/vi.ts`,
`guides-zh/vi.ts`, `blog-zh/vi.ts`, `long/zh`, `long/vi`, legal texts, the rendered pages in the browser (no
Playwright run; findings are from source).

Not verifiable offline (listed above as UNVERIFIED): penalty unit from 1 July 2026, 2026 NMW/award figures, the
2026-27 standard deduction's enactment and final design, 4-year sole-trader amendment commencement, ATO credit card
end date, TPB symbol usage terms for a supervised entity, ABR manual processing time.
