# Log: fr-guides

Files changed: only `src/app/(fr)/fr/blog/chunks/*.ts` (01-18). Edit scripts: `.../scratchpad/plan/fix/work-fr-guides/e1.py` to `e7.py`, `nb.py`.

## Applied
- fr-guides-a-001: how-to-lodge-tax-return-working-holiday, removed "Nous traitons directement avec l'ATO". Replaced with the EN-based sentence (identity half, not bank half) plus "préparée par notre équipe, puis vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO".
- fr-guides-a-002: average-tax-refund, changed "45 % ou 32,5 %" to "45 % ou 30 %", and the unregistered employer now withholds at "actuellement 30 %".
- fr-guides-a-003: backpacker-tax-rate, the opening now states 15 % on the first 45 000 $ (417 and 462). Added a section with the weekly examples, the brackets above 45 000 $ (2026-27 rates, unchanged from 2025-26), the 30 % rate for unregistered employers and the EN worked example (37 000 $, 1 200 $).
- fr-guides-a-004: restored the 15 % figure (with the "là où il s'applique" hedge where the guide had removed it) in all 13 guides. The PAYG list now covers 15 %, 30 % and 45 %.
- fr-guides-a-005: the 12 Tax Return guides now link to /fr/tax-return-australie-pvt with the anchor "tax return en PVT". how-to-lodge also gets a closing sentence pointing to the flagship as the complete guide. diy keeps its "honoraires fixes" link to /tax-return and adds a flagship sentence. Slice-wide anchors renamed: 32x "tax return working holiday" became "tax return en PVT", and 22x "tax return de working holiday maker" became "déclaration d'impôts (tax return) en PVT".
- fr-guides-a-006: added a contextual tax return bridge to all 22 guides. average-tax-refund and how-to-update-address link to the flagship, the others to /tax-return.
- fr-guides-a-007: added /expenses/* links to 12 guides: hospitality x4, farm-work x4, construction, labouring, delivery-drivers, and /expenses.
- fr-guides-a-008: how-to-update-address, the first sentence now answers how to change the address. Added the H2 "Comment changer votre adresse auprès de l'ATO ?" covering myGov path, ATO app, phone (13 28 61, or +61 2 6216 1111 from overseas), the paper form and the super funds note. The "tax agent" route in the proposed fix was dropped (iron rule). Also fixed "super non réclamé" to the feminine form.
- fr-guides-a-009: countries-with-medicare, added a paragraph saying France, Switzerland and Canada are not on the list and Belgium is, plus the Italy/Malta limited-cover note (Italy up to 6 months). The ambulance sentence is now neutral.
- fr-guides-a-010: casual-shift, added the H2 "Quel préavis pour annuler un shift de casual ?" (NES set no minimum notice, NES notice rules do not apply to casuals, the award, agreement or contract decides). The last H2 was renamed "Ce qui décide de ce qu'on vous doit".
- fr-guides-a-011: how-long-does-tax-refund-take, the opening now leads with 7 to 14 business days and 8+ weeks on paper.
- fr-guides-a-012: bicycle-motorcycle, added the rates: 88 c for 2025-26 and 91 c from 1 July 2026.
- fr-guides-a-013 (partial): added PVT/PVTiste in the first paragraph of 4 high-traffic guides (casual-shift, apply-for-tfn-before-arriving, what-is-medicare, how-to-apply-for-a-tfn). Many more bodies now contain "PVT" through the new anchors, and medicare-levy and backpacker-tax-rate use "PVTistes" in their openings.
- fr-guides-a-014: construction ("les 12 % de super"), backpacker-tax-history ("ensemble de mesures", "de la super"), check-super-balance ("L'ancienne super transférée"). Also fixed the same pattern in tax-obligations-after-leaving ("la super réclamée", "non réclamée") and in 09.ts and 17.ts ("la super", "de la super").
- fr-guides-a-015: german-european-health-insurance, the link to the English-only /german-working-holiday-tax is replaced by /medicare.
- fr-guides-b-001: restored 15 % in 6 TFN/ABN guides, including the 800/1 000/1 500/2 000 $ comparison list in what-happens-without-your-tfn.
- fr-guides-b-002: added a /tax-return bridge to all 15 guides. who-can-ask has it in the registered-agent section.
- fr-guides-b-003: tax-obligations-after-leaving, /contact is replaced by a flagship link and a WhatsApp line. The first paragraph links [tax return](/tax-return). The agent extension now carries the "on the agent's list before 31 October" condition.
- fr-guides-b-004: added a flagship link with the anchor "tax return Australie en PVT" or "tax return en PVT" to all 8 guides, using the full /fr/ path.
- fr-guides-b-005: medicare-levy, the intro now opens with "En général non". Added the 11-country list with a link, plus France, Canada, Germany and Japan not on it. Added the "environ 20 $ par tranche de 1 000 $" scale, replaced "statement" with "attestation" (x3) and removed the stray space.
- fr-guides-b-006: what-is-medicare, added the sentence on French, Canadian and Belgian passports (add only, nothing rewritten).
- fr-guides-b-007: working-holiday-visa-tax-guide, the rate is now dated "en 2025-26 comme en 2026-27", and the 31 October date carries the "passée pour 2025-26, dépôt tardif possible" note.
- fr-guides-b-008: six-month rule, added the Home Affairs caveat (from 1 January 2024 until further decision).
- fr-guides-b-009: deadline guide, added that the ATO generally does not apply the FTL penalty when a late return ends in a refund or nil result.
- fr-guides-b-010: tfn-security now opens with what to do (ATO identity theft line 1800 467 033, watch myGov) and links who-can-ask. who-can-ask links back from its scams section.
- fr-guides-b-011: tfn-australian-address links "demandes de TFN" to /tfn. Added a /tfn line at the end of the 4 TFN application guides.
- fr-guides-b-012: Victoria, changed to "le Victoria gère", "au Victoria" and "le Victoria délivrent tous deux". Changed "le Victoria une accréditation" in uber. The list label in 16.ts is kept as is.
- fr-guides-b-013: the chunk files already used U+00A0 before ? : ; % $ » and in thousands for most bodies. One scripted pass (nb.py) made the remaining body cases consistent (about 48 spots), and every text I added follows the same convention. Titles and descriptions were not touched.

## Skipped
- a-013 full slice pass (PVT in the first paragraph plus one H2 in every guide): only partly done. Forcing it into 140 guides would read as keyword stuffing, so the lead should decide whether to extend it.
- a-008 "or via the registered tax agent who lodges your return": not used, because it could imply the agent role and the ATO page does not list agents as an address-change channel.
- b-009 part 2 (add the $364 penalty unit to llms.txt Key facts): not my file. See Handoff.

## Handoff
- shared (scripts/generate-llms.mjs, Key facts): optionally add "Commonwealth penalty unit: $364 from 1 July 2026 (Failure to Lodge: 1 unit per 28 days late, max 5 units = $1,820). Source: legislation.gov.au, Crimes (Amount of a Penalty Unit) Instrument 2026". The FR guides already state $364. I did not check legislation.gov.au myself, the value comes from the auditor's evidence and the existing FR/EN copy.

## Facts checked
- WHM 15 % to $45,000, 30/37/45 % brackets, unchanged 2025-26 to 2026-27; no-TFN 45 %: public/llms.txt Key facts.
- Unregistered employer withholds at foreign-resident rates (30 %): EN source backpacker-tax-rate-australia, consistent with llms.txt brackets.
- Cents per km 88 c (2025-26), 91 c from 1 July 2026: llms.txt Key facts.
- RHCA list of 11 (France, Canada, Switzerland, Germany, Japan not on it; Belgium on it): llms.txt Key facts. Italy cover up to 6 months: FIX_BRIEF known facts (Services Australia "Visiting from Italy").
- ATO phone numbers 13 28 61 (individuals), +61 2 6216 1111 (overseas), 1800 467 033 (identity theft): ato.gov.au/About-ATO/Contact-us/phone-us (fetched).
- Address change channels (myGov > Linked services > ATO > My profile > Personal details > Contact details; ATO app More > My details; form "Change of details for individuals", up to 28 days): ato.gov.au "Update your personal contact details" (fetched).
- NES notice periods do not apply to casual employees: fairwork.gov.au/ending-employment/notice-and-final-pay/who-doesnt-get-notice (fetched).
- Six-month rule exemptions from 1 January 2024, FTL penalty generally not applied on refund/nil returns, agent extension needs the client on the list before 31 October: EN source guides and FIX_BRIEF.

## Verification
- `npx tsc --noEmit -p .` passes.
- jest passes: wht-copy-compliance-6-languages, src/lib/__tests__/locale-blog (dash, AI and agent checks on the chunks), new-locales-sitemap (42 tests).
- No U+2013 or U+2014 in the chunks. Every internal link in the FR chunks resolves to a FR guide slug, a FR static page or /fr/tax-return-australie-pvt (script check).
