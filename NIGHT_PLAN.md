# Overnight run — plan and checkpoint

Started 27 Aug 2026, 00:15 AEST. Jo is asleep; this file is the handover.
It is also the checkpoint the 4-hour wake-up reads, so **keep it current** —
update the status column the moment a phase finishes, not at the end.

## The rule for tonight

Jo is not awake to review anything, so the split is:

- **Audit freely.** Reading code and writing findings changes nothing and
  carries no risk. Both kits run in full.
- **Fix only what is unambiguous.** A fix goes in tonight only if it is
  objectively correct (a missing `await`, an unescaped value, a dead file, a
  wrong `hreflang`), and only if `npx tsc --noEmit` and `npx jest` stay green
  after it.
- **Leave judgement for the morning.** Anything that changes behaviour, copy,
  pricing, tax content, customer messaging, or a design decision Jo would have
  an opinion about gets written up with a recommendation — not applied. A tax
  practice is not a codebase to improvise on at 3am.
- **The three red lines from the design kit hold absolutely**, in audits and in
  fixes alike: never touch the "Reviewed and signed off by a registered tax
  agent" wording; never imply the business itself is a registered tax agent;
  never alter substantive tax explanation content.
- **Deliver after every phase.** A zip goes to Jo's conversation as each phase
  completes, so if this container is reclaimed mid-run the work already landed.

## Phases

| # | Phase | Status | Output |
|---|---|---|---|
| 0 | Install both kits, restore deps, set the 4h chain | **done** | `.claude/` with 10 agents + 2 commands |
| 1 | Code audit — 5 agents in parallel (security, performance, dead code, resilience, architecture) | **done** | `AUDIT_REPORT_2026-08-27.md` |
| 2 | Design/SEO/mobile audit — 5 agents in parallel | **done** | `DESIGN_SEO_MOBILE_AUDIT_2026-08-27.md` |
| 3 | Triage: APPLY / RECOMMEND | **done** | folded into the two reports + MORNING_BRIEF |
| 4 | Apply the APPLY set, verifying after each batch | **done** | code changes + green tsc/jest |
| 5 | Final package and morning summary | **done** | zip + `MORNING_BRIEF.md` |

## Baseline before any change tonight

Recorded so a regression is provable rather than argued about:

- `npx tsc --noEmit` — clean
- `npx jest` — 23 suites, 498 tests, all passing
- `npx next build` — compiles (in this sandbox only with `next/font` stubbed,
  since it cannot reach fonts.googleapis.com; that is a network limit here, not
  a code fault)
- Files: 385 in the delivered zip, `package.json` / `package-lock.json` /
  `.data/store.json` byte-identical to Jo's original upload

## Assumptions made without asking

Recorded here rather than guessed at silently.

1. Both audit kits are meant to run against the **whole** project, not just the
   admin work from earlier this evening.
2. The reports go in the project root, matching the filenames the two commands
   specify.
3. The evening's design work (crm-design.css, Shell.tsx, Inter, the contrast
   fix) is current and correct, and auditors should treat it as the baseline
   rather than flagging the pre-existing state it replaced.
4. `AUDIT_REPORT.md` already exists in the repo from an earlier round. Tonight's
   report gets a dated filename so nothing is overwritten, and the security
   agent is told to regression-check the old findings rather than re-report
   them blind.

## Log

- **00:15** — Phase 0 done. Both kits installed to `.claude/` (10 agents,
  2 commands, no filename collisions). Dependencies restored. 4-hour wake-up
  chain armed via send_later.
- **01:40** — Phase 1 done. All five code auditors returned in full; none failed or
  returned partial. 0 CRITICAL, 21 HIGH, 31 MEDIUM, 27 LOW, and **zero security
  regressions** — every previously-documented fix was re-verified in current code
  and is still in place. `AUDIT_REPORT_2026-08-27.md` written.

  Three items escalated for Jo rather than touched, all recorded in the report:
  the WHM submission block that was fully built and never wired to any form; the
  duplicated `isNdaCountry` whose live copy misses every Japanese katakana
  country name; and `SecurityNotice`, a component worked to WCAG 2.2.1 that is
  rendered nowhere. Each has two opposite readings and nothing in the repo
  decides between them — deleting any of them destroys the evidence.

  The night's fix list is rows 1–9 of the action plan: all rated S, all
  objectively correct, none requiring a business judgement.

---

## Jo's instructions, sent at ~02:40 before going to sleep

Seven requests plus one blanket authorisation. Recorded verbatim in intent so
nothing is lost if this session is replaced.

| # | Request | Where |
|---|---|---|
| J1 | Add the Jerusalem photo he sent to the CRM login screen, with the login fields **above** it | `/crm` |
| J2 | A monthly page that **resets on the 1st** — so July's conversion rate, then August's, and so on, kept as history | Will → Insights |
| J3 | Check whether the Knowledge Base card is still relevant. His reasoning: Will now emails him the day's conversations and the library answers get derived from those. **If he is right, remove it.** | Will → Learning |
| J4 | Replace the "Regenerate report" button with a **page of scheduled follow-ups** — everyone who is going to receive one, whatever the topic, always current | Will → Insights |
| J5 | **Delete the WHM submission block entirely.** | This answers escalation #1 from Phase 1 |
| J6 | **Every message template Will can send must appear in the Library.** He marked this "super important" | Will → Library |
| J7 | "תתקן את כל מה שאתה מוצא" — fix everything you find | blanket |

### How J7 changes tonight's rule

The original rule was *fix only what is unambiguous*. Jo has now explicitly
authorised fixing what the audits found, so the line moves — but it does not
disappear. The revised rule:

- **Now in scope:** every HIGH and MEDIUM finding whose fix is mechanical and
  verifiable — a missing `await`, a missing `limit`, a swallowed error, a
  missing timeout, a wrong number in an error message, an unlocalised string,
  a touch target under 44px. These get applied, with `tsc` and `jest` green
  after each batch.
- **Still out of scope:** anything that changes what a customer is *told* or
  *charged*, any tax content, any wording behind the three red lines, and any
  finding where the audit itself said two readings are possible and the repo
  does not decide between them. J5 was exactly such an item and Jo has now
  decided it — so it is in. `isNdaCountry` and `SecurityNotice` are not, and
  stay on the morning list.

A blanket "fix everything" is permission, not omniscience. Where a fix needs a
fact only Jo has, it waits for Jo.

## Second burst from Jo, ~03:10, still asleep after

| # | Request | Where |
|---|---|---|
| J8 | Handoff-reasons card — "isn't this redundant too?" | Will → Insights |
| J9 | **Decision Log should be a different thing.** Every time Will raised an urgent task or needed a human: show the action, the client, their WhatsApp number, **why** it went to a human, and **how to stop it happening again** so Will can handle it next time | Will → Insights |
| J10 | System & Costs: drop "Customers" and "Open tasks". Add **what Claude has cost so far** if possible. And every system fault must appear there in enough detail that a screenshot is diagnosable | Will → Insights |
| J11 | "Awaiting your approval (0)" → keep only the number | Will → Tasks |
| J12 | Chat list: real WhatsApp has no separator lines. **And it shows a draft Will proposed as though it were sent**, even when Jo refused it | Will → Chats |
| J13 | Remove the "LAST REFUND" column | CRM → Clients |
| J14 | Task detail should fit with no scroll — trim the empty grey top and bottom | CRM → task detail |
| J15 | **New:** for every lead that never became a paying client, analyse as an expert and write why it did not convert and what should have been done differently. A report, somewhere in the system | new |
| J16 | Copy: *"Everything waiting on you, in one place. Will drafted a suggested answer for each one."* → *"Everything that needs your attention, in one place."* | Will → Tasks |
| J17 | **A zip ready to deploy to production in the morning** | deliverable |

J12's second half is the serious one: a draft that was never approved must never
read as a sent message in the chat list. That is not a styling bug — it is the
list telling Jo something untrue about what his customer received.

- **05:20** — Phases 2–5 done. Both audits written. All 17 mechanical fixes
  applied. All 17 of Jo's requests handled, three of them by declining and
  explaining rather than complying: the Knowledge Base card (his premise was
  wrong — the daily email cannot approve a draft), the handoff card (reframed,
  not deleted), and the Claude cost figure (shown as a flagged estimate, since
  only call counts exist and inventing a dollar number would be worse than
  showing none).

  Tests 498 → 688. tsc clean. Production build compiles. Two migrations for Jo
  to run: 030 (repairs chat previews polluted by unsent drafts) and 031 (lost-
  lead analysis storage).

  Left for Jo, unchanged and documented: `isNdaCountry`, `SecurityNotice`, and
  the refund-amount regex. Each needs a fact only he has.

## 04:15 check-in — phase 6 added

All five planned phases were already done at 05:20 UTC and the production zip is
delivered. The chain woke on schedule, the container is intact, and Jo does not
wake for a few hours.

Adding **Phase 6**: the three S-rated SEO findings from the design audit that
were left undone *for time*, not for judgement. Each is mechanical, verifiable,
and sits squarely inside J7 ("fix everything you find"):

| | Finding | Why it is safe to do unattended |
|---|---|---|
| S1 | `LanguageSwitcher` renders its links only after a click, so there is **not one HTML link between the three language trees** — 334 de/ja pages are discoverable by sitemap alone | Rendering links that already exist, always. No content, wording or routing decision. |
| S6 | Blog category filters are `<button>`, so the hub links to 9 guides out of 141 and to zero category pages — 396 pages with no crawl path from navigation | The category routes already exist and already render. This gives them an anchor. |
| S3 | `CORPUS_REVISED` is defined in all three blog data files and **never read**, so 282 translations from August 2026 declare `dateModified` = July 2024 | Wiring up a constant the author already wrote for exactly this. |

These matter commercially: the marketing site is the revenue channel, and all
three suppress how much of it Google can find. None of them touches tax content,
customer wording, or the three red lines.

Everything still out of scope stays out: `isNdaCountry`, `SecurityNotice`, the
refund-amount regex. Those wait for Jo.

- **06:30** — Phase 6 done. All three S-rated SEO fixes applied and verified
  against served HTML rather than reasoned about: alternate-language anchors now
  exist pre-JS on every page (334 de/ja pages gain a crawl path), all six blog
  category hubs have real anchors in all three languages (`abn` and `medicare`
  had none at all before), and 423 guides now carry a truthful `dateModified`
  and `lastmod` instead of claiming July 2024.

  tsc clean · 694 tests · `next build` succeeded, 541 static pages.
  Zip v2 delivered, superseding the 05:20 one.

  **Chain stopped here.** Every planned phase is complete, the deliverable is in
  Jo's hands, and the only work left needs a decision from him. A wake-up at
  08:30 would have nothing to do but say so.
