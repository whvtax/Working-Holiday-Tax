# 21. Coverage ledger

Operation Iron Fortress, 18 Nov 2026. Built from the Coverage tables of the unit reports in `units/` and the unit file lists (`*-files.txt`). Line counts are the counts in the lists at audit time.

## How to read this

- REVIEWED: the unit report says every line of the file was read.
- PARTIALLY_REVIEWED: only stated ranges, test titles, or pattern-search hits were seen.
- NOT_STARTED: covered by a pattern search (grep) only. No line was read in sequence.
- BLOCKED: not opened (binary).
- A file counts as fully reviewed if at least one unit read all of it. For long content files that means the READ units, whose line ranges together cover the whole file.

## Totals (VERIFIED FACTS, counted from the tables)

| measure | files | lines |
|---|---|---|
| Inventoried at audit time (distinct) | 2,113 | not counted for the scan-only part |
| of which application, config, script, migration and test files in unit lists | 1,361 | 281,603 |
| of which non-application files (REST-01 scope) | 755 | not counted |
| (3 files appear in both groups) | | |
| Relevant source files (unit lists without tests) | 856 | 238,506 |
| Test files | 505 | 43,097 |
| Fully reviewed | 881 | 220,455 |
| - source files read in full by a code or content unit | 645 | 105,380 |
| - content files completed line by line by READ-01..21 | 132 | 105,726 |
| - test files read in full | 104 | 9,349 |
| Partially reviewed | 414 | 47,597 |
| - test files (titles only, or part) | 399 | 33,748 |
| - content files (short ranges plus pattern search) | 14 | 2,510 |
| - `package-lock.json` (grep only) | 1 | 11,339 |
| Not reviewed line by line (pattern search only) | 64 | 13,551 |
| Blocked (binary test fixtures) | 2 | 0 |
| REST-01 scope: read in full | 5 | 189 |
| REST-01 scope: scan only or structure only | 750 | not counted |
| Generated or vendor, inventoried | 349 | `.claude/` 348 files (vendored tooling), `package-lock.json` |
| Not inventoried | - | `node_modules/` (515 top-level entries), build output (none present) |

Inspected-line figure (lines in files read in full):

- All unit-list files: 220,455 of 281,603 lines (78%). Without `package-lock.json`: 220,455 of 270,264 (82%).
- Source files without tests and without the lockfile: 211,106 of 227,167 lines (93%).
- Test files: 9,349 of 43,097 lines (22%), plus 155 lines read in part (TESTS-01). The rest was read by test titles only.
- The READ units read 114,426 assigned lines in 146 files. 8,700 of those lines are in files a CONTENT unit had already read in full.
- Lines read inside partially reviewed files are not added, because the tables do not give an exact figure for every file.

What these figures do not mean: a line that was read was read once, by one reviewer, statically. Reading is not proof of absence of defects.

## Honest gaps

1. 64 content files (13,551 lines), all under 300 lines, were never read in sequence. They are small page files (about, contact, legal wrappers, category pages, layouts, expense sub-pages) in the German, Spanish, French, Italian and Japanese trees. They were pattern-searched for script, HTML, links, emails, phone shapes, prices and guarantee wording (CONTENT-06).
2. 14 further content files (2,510 lines) were read only in short ranges.
3. 399 of 505 test files were read by titles only. Statements about what those tests prove rest on titles and targeted searches, not on the assertions.
4. REST-01 was scan-based by instruction: 141 markdown and 55 JSON files under `docs/`, earlier audit folders, vendored skill texts and the marketing folder were not read line by line. 82 binary files (images, fonts, 3 `.pyc`) were not opened.
5. `package-lock.json` was searched, not read. Transitive packages (about 750) were not listed or reviewed.
6. `node_modules/` was not inventoried or reviewed.
7. Three files in the current tree are in no unit list: `next-env.d.ts`, `tsconfig.tsbuildinfo` (both generated) and `src/lib/will/__tests__/audit-fixes-18nov.test.ts` (added with the fixes, after the audit).
8. Code changed by the 18 Nov fixes was not re-audited by a full unit pass. The debate pass opened the changed lines; this report set checked the presence of each FIX_NOW replacement text by search (see file 19, note 3).
9. 17 files in the lists no longer exist: the TFN and ABN application form pages (English, German, Japanese), their two API routes and one test. They were read at audit time and deleted on 18 Nov at the owner's request.

## Per-unit table

Status columns are the unit's own Coverage table. "Later completed" shows where another unit closed a gap.

| unit | scope | files | lines | REVIEWED | PARTIALLY_REVIEWED | NOT_STARTED / BLOCKED | note |
|---|---|---|---|---|---|---|---|
| API-01 | webhook, actions, tax-form, export, health, knowledge, verify-otp | 8 | 4,000 | 8 | 0 | 0 | |
| API-02 | all other API routes | 57 | 3,539 | 57 | 0 | 0 | 3 routes since deleted |
| WILL-01 | `service.ts`, `channel.ts` | 2 | 4,198 | 2 | 0 | 0 | |
| WILL-02 | scheduler, store, i18n, meta-url | 4 | 4,200 | 4 | 0 | 0 | |
| WILL-03 | engine, policy guard, claude, close-lead | 4 | 4,197 | 4 | 0 | 0 | |
| WILL-04 | stores, playbook, handoff reasons, system report | 5 | 4,194 | 5 | 0 | 0 | |
| WILL-05 | form link, payment proof, reviewer, digest and others | 12 | 4,200 | 12 | 0 | 0 | |
| WILL-06 | Will support modules | 21 | 4,199 | 21 | 0 | 0 | |
| WILL-07 | Will small modules (lists WILL-07 and WILL-08) | 56 | 4,296 | 56 | 0 | 0 | WILL-08 list (4 files, 104 lines) has no report of its own; its files are rows in WILL-07 |
| WILLDATA-01 | knowledge seed, generated language rules | 2 | 4,666 | 2 | 0 | 0 | |
| LIB-01 | auth, db, upload, rate limit, crypto, atlas ask | 17 | 4,195 | 17 | 0 | 0 | |
| LIB-02 | small library modules | 37 | 2,293 | 37 | 0 | 0 | |
| INFRA-01 | migrations, scripts, config, ignore files | 43 | 4,863 | 43 | 0 | 0 | four list entries showed 0 lines; real counts used |
| INFRA-02 | migrations, CI, config, package files | 44 | 12,718 | 43 | 1 | 0 | partial = `package-lock.json` (11,339 lines, grep only) |
| UI-01 | Will dashboard and three large components | 4 | 4,499 | 4 | 0 | 0 | |
| UI-02 | components | 12 | 4,500 | 12 | 0 | 0 | |
| UI-03 | components | 39 | 4,500 | 39 | 0 | 0 | |
| UI-04 | components | 88 | 2,507 | 88 | 0 | 0 | |
| SITE-01 | CRM dashboard client, connect, form client | 5 | 5,000 | 5 | 0 | 0 | |
| SITE-02 | site pages and blog shell | 9 | 4,998 | 9 | 0 | 0 | |
| SITE-03 | site pages, form clients, proxy | 16 | 4,998 | 16 | 0 | 0 | |
| SITE-04 | site pages, CRM page gates | 46 | 4,084 | 46 | 0 | 0 | |
| SVTAPP-01 | Student Visa Tax app routes and helpers | 53 | 4,737 | 53 | 0 | 0 | |
| CONTENT-01 | large article data (pattern scan first) | 5 | 22,000 | 3 | 2 | 0 | later completed by READ units |
| CONTENT-02 | article data | 15 | 21,998 | 3 | 12 | 0 | later completed by READ units |
| CONTENT-03 | article data | 25 | 21,994 | 1 | 24 | 0 | later completed by READ units |
| CONTENT-04 | pages and article chunks | 40 | 21,997 | 6 | 34 | 0 | later completed by READ units |
| CONTENT-05 | pages and article chunks | 50 | 21,997 | 5 | 45 | 0 | later completed by READ units |
| CONTENT-06 | small pages (lists CONTENT-06 and CONTENT-07) | 140 | 23,362 | 47 | 16 | 77 NOT_STARTED | 15 completed later by READ units; 14 remain partial and 64 remain pattern-search only. CONTENT-07 list has no report of its own |
| READ-01..06 | line-by-line reading, 2 files each | 12 | 33,235 | 12 | 0 | 0 | assigned ranges, all read |
| READ-07..13 | line-by-line reading | 43 | 38,608 | 43 | 0 | 0 | assigned ranges, all read |
| READ-14..21 | line-by-line reading | 94 | 42,583 | 94 | 0 | 0 | assigned ranges, all read |
| TESTS-01 | tests | 132 | 22,000 | 23 (5,063 lines) | 107 | 2 BLOCKED | 104 by titles only, 3 in part |
| TESTS-02 | tests | 373 | 21,097 | 81 (4,286 lines) | 292 | 0 | titles only |
| REST-01 | non-application files | 755 | n/a | 5 | 750 | 0 | scan-based; 82 binaries not opened |

READ file counts add to 149 because three very long files were split between two READ units; 146 distinct files.

## Content coverage rule applied

- Content files of 300 lines or more: pattern-scanned by CONTENT-01..06 (about 10 to 15 percent read in sequence), then every line read by READ-01..21. Result: all 132 such files that a CONTENT unit had not finished are now REVIEWED. No content file of 300 lines or more is left partial.
- Content files under 300 lines: covered only by the CONTENT units' statuses (47 REVIEWED in CONTENT-06, 14 PARTIALLY_REVIEWED, 64 NOT_STARTED).

## NOT TESTED

Nothing in this ledger was executed. No file was covered by running code, tests or a scanner.
