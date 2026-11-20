# REST-01 report

Unit: non-application files. Method set by the coordinator for this unit: inventory by directory, then pattern scans (grep) whose output shows file, line and match TYPE only. Files were NOT read line by line unless the table says so. No secret, phone number, name or other personal value is reproduced here.

Totals: 755 files in scope. 82 binary files (not opened as text). 18 files read in full or in the stated ranges. All remaining text files were covered by the pattern scans only.

## Coverage

| path | files | how covered | status |
|---|---|---|---|
| .claude/ | 348 (211 md, 37 csv, 34 py, 26 json, 15 mdx, 5 yaml, 5 svg, 3 pyc, 2 sh, 2 sarif, others) | Read in full: settings.json, VENDORED.md, vendor-marketplace/.claude-plugin/marketplace.json, plugins/insecure-defaults/.claude-plugin/plugin.json. Front matter only: 3 commands, 10 agents, plugin command audit.md. Grep for network, process execution, env reads, install commands in every .py/.sh/.js/.ts. All files: secret and personal-data scans. 3 .pyc not opened | PARTIALLY_REVIEWED |
| .audit-state/ | 17 (12 md, 5 json) | Secret and personal-data scans; key names of review-ledger.json | PARTIALLY_REVIEWED (grep only) |
| .data/store.json | 1 (7,327 lines) | Top-level keys, record counts, key names, value SHAPES (digits and letters masked) | PARTIALLY_REVIEWED (structure only, by instruction) |
| .mcp.json | 1 (8 lines) | Read in full | REVIEWED |
| audit-output/ | 20 (16 md, 4 json) | Scans; parts/sec-supply-secrets.md lines 23, 24, 38, 170 | PARTIALLY_REVIEWED (grep only) |
| audit-reports/ | 23 (22 md, 1 json) | Scans | PARTIALLY_REVIEWED (grep only) |
| security-assessment/ | 30 (24 md, 3 patch, 1 diff, 1 txt, 1 ts) | Scans; proposals/form-completion-token/completion-token-wiring.test.ts.txt lines 5, 22, 29 (masked) | PARTIALLY_REVIEWED (grep only) |
| marketing/ | 23 (20 png, 1 html, 1 mjs, 1 md) | Scans; render.mjs imports and calls; DESIGN-SPEC.md headings; class names of stories.html. 20 PNG not opened | PARTIALLY_REVIEWED |
| docs/ except docs/security-audit/ | 197 (141 md, 55 json, 1 txt) | Scans; what-customers-ask.md lines 1-53 (truncated at 170-220 columns); FORM_LINKS_RESET_29OCT.md lines 1-42 | PARTIALLY_REVIEWED (grep only for the rest) |
| public/ | 89 (78 image, font or icon files; 11 others) | Every non-image file listed and scanned; manifest.json read (first 30 lines); 3 SVG scanned for script content; images scanned for metadata markers as bytes | PARTIALLY_REVIEWED |
| README.md | 21 lines | 1-21 | REVIEWED |
| AGENTS.md | 9 lines | 1-9 | REVIEWED |
| CLAUDE.md | 86 lines | 1-86 | REVIEWED |
| CHANGES-MIA-17NOV.md | 65 lines | 1-65 (long lines truncated at 260 columns) | REVIEWED |
| PROJECT_HANDOFF.md | 271 lines | 157-161, 205-216, plus scans | PARTIALLY_REVIEWED |
| package-lock.json | 1 | grep only, by instruction | PARTIALLY_REVIEWED |

Files opened outside the unit to judge a finding: scripts/package-release.cjs (1-144, full), config/brand-routing.js (60-125), .gitignore and .vercelignore (full), next.config.js and src/proxy.ts (grep of matching lines only), src/lib/will/store-file.ts (grep), package.json (full).

Binary files, listed, not opened as text:
- public/: 32 webp, 20 png, 21 woff2, 1 jpg (assets/about/team-office.jpg), 1 ico. Folders: public root 5, assets 2, assets/about 1, assets/og 6, email 5, svt-assets/fonts/5.3.0 14, svt-assets/img 15, svt-assets/og 3, wht-assets/fonts 7, wht-assets/img 17.
- marketing/review-stories/output/: 20 png (story-00-cover to story-19-cta).
- .claude/skills/ui-ux-pro-max/scripts/__pycache__/: 3 pyc.

## Directory table

Release zip columns come from scripts/package-release.cjs:29-38. "deploy" is the default profile; "source" adds tests, e2e, docs, scripts and four root documents.

| directory or file | files | contains secrets | contains personal data | in deploy zip | in source zip | recommendation |
|---|---|---|---|---|---|---|
| .claude/ | 348 | no (only vendored teaching examples of default credentials in plugins/insecure-defaults/references) | no (vendor contact addresses and example.com only) | no | no | Keep out of deploys. Delete the 3 pyc files (F06) |
| .audit-state/ | 17 | no | no (business number and placeholders only) | no | no | Holds security findings. Add to .gitignore (F01) |
| .data/ | 1 | no (settings object is empty, no token-shaped string) | synthetic only: 24 demo customer records with name and phone (F02) | no (also a forbidden name in the script) | no | Delete the file from any copy that leaves this machine |
| .mcp.json | 1 | no | no | no | no | See F05 |
| audit-output/ | 20 | no | no | no | no | Add to .gitignore (F01) |
| audit-reports/ | 23 | no | no | no | no | Add to .gitignore and .vercelignore (F01) |
| security-assessment/ | 30 | no (one synthetic test value for FORM_TOKEN_SECRET in a proposed test, line 5) | no (dummy phone and example.invalid address) | no | no | Add to .gitignore (F01) |
| marketing/ | 23 | no | yes: display names and text of public Google reviews, in stories.html and 18 rendered cards; business WhatsApp number (F07) | no | no | Add to .vercelignore |
| docs/ (except security-audit) | 197 | no credentials. Questionnaire addresses in FORM_LINKS_RESET_29OCT.md (F04) | none matched by pattern. what-customers-ask.md and will_knowledge_seed.json are derived from real chats (F08) | no | YES | Exclude docs/security-audit, docs/engineering/audits and FORM_LINKS_RESET from the source profile, or accept in writing |
| public/ | 89 | no (IndexNow key file is public by design) | no | YES | YES | No change needed |
| README.md, CLAUDE.md, AGENTS.md | 3 | no | owner first name; public ABN and Tax Agent Number | no | YES | none |
| PROJECT_HANDOFF.md | 1 | no credentials. Two Meta account identifiers (F03) | business number once | no | YES | Replace the two identifier values with the variable names |
| CHANGES-MIA-17NOV.md | 1 | no | owner first name | no | no | none. Not in .vercelignore (F01) |
| package-lock.json | 1 | no | no | YES | YES | none |

## Findings

### REST-01-F01: Security reports and audit working files are not excluded from git or from a folder deploy, and the "source" zip ships docs/ whole
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE (the gaps in the ignore files and the allowlist); REQUIRES_RUNTIME_VALIDATION (whether these files have ever reached a remote or a Vercel build)
- CWE: CWE-538
- Files and lines: .gitignore:1-41 (no entry for .audit-state, audit-output, audit-reports, security-assessment, marketing, .claude, .mcp.json); .vercelignore:6-24 (lists .audit-state, .claude, .mcp.json, security-assessment, audit-output, but not audit-reports, marketing, docs, CHANGES-MIA-17NOV.md, PROJECT_HANDOFF.md); scripts/package-release.cjs:35-38 (SOURCE_EXTRA includes 'docs').
- Evidence: audit-reports/will-mia-atlas/ holds 23 files such as SECURITY_FINDINGS.md, AUTH_SECURITY_REPORT.md, SUPABASE_SECURITY_REPORT.md and findings.json. docs/ holds docs/security-audit/ (this audit's unit reports) and docs/engineering/audits/ (6 files). README.md:18 says deploys happen by pushing to main. The .vercelignore comment at lines 4-5 states docs, marketing, scripts, supabase and e2e were left in on purpose, but audit-reports is not mentioned and appears to have been missed.
- Root cause: the ignore lists were written before audit-reports/ and docs/security-audit/ existed, and the source profile takes the docs folder without a sub-allowlist.
- Attack prerequisites: read access to the git remote, to the Vercel build source, or to a "source" handover zip.
- Impact: a reader gets a map of unfixed weaknesses with file and line numbers. No credential is exposed by this alone.
- Recommended fix: add audit-reports, audit-output, security-assessment, .audit-state and docs/security-audit to .gitignore; add audit-reports, marketing, docs and CHANGES-MIA-17NOV.md to .vercelignore; in package-release.cjs skip docs/security-audit and docs/engineering/audits in the source profile.
- Regression test: a jest test that reads .vercelignore and .gitignore and fails when a top-level directory whose name matches /audit|security-assessment/ is absent; a test that runs plan() for the source profile and asserts no path starts with docs/security-audit/.
- Limits of this verification: there is no .git directory in this copy, so what is tracked or pushed could not be checked. Vercel project settings were not seen.

### REST-01-F02: .data/store.json is present with 24 customer-shaped records (synthetic)
- Severity: INFORMATIONAL
- Confidence: high that the data is synthetic
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: .data/store.json:2 (customers), :652-653, :654 (templates), :2166-2169, :2170 (audit), :7327.
- Evidence: top-level keys and counts: customers 24; messages 0; tasks 0; templates 151; history 0; jobs 0; knowledge 0; settings empty object; audit 364 (303 data_read by actor "access", 61 crm_session_started by actor "auth"); processed 0. Each customer record has waId and name beside each other. The names are the demo set in src/lib/will/demo-data.ts; the numbers step by a fixed amount; 120 audit IPs are in the 203.0.113.x documentation range and 183 are "unknown". No token-shaped string and no key containing token, secret or password. Template bodies at lines 680-740 carry the business's own BSB and account, which also appear in 84 source files, so they are the published payment details and not a customer's.
- Root cause: local development fallback store (src/lib/will/store-file.ts:39).
- Attack prerequisites: none; this is a note.
- Impact: none found. The folder is covered by .gitignore:16, .vercelignore:6 and the release script's forbidden names.
- Recommended fix: none required. Delete the file before copying the project folder by any route other than package-release.cjs.
- Regression test: existing release-script refusal of .data.
- Limits of this verification: record values were examined by shape only, except customer rows, which one command printed truncated to 30 columns by mistake; that output was not copied anywhere. The synthetic numbers sit in the real Australian mobile range; whether any is assigned to a subscriber was not checked.

### REST-01-F03: Production Meta identifiers written in PROJECT_HANDOFF.md
- Severity: INFORMATIONAL
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-200
- Files and lines: PROJECT_HANDOFF.md:211 (value in brackets after WHATSAPP_PHONE_NUMBER_ID), :212 (value in brackets after WHATSAPP_WABA_ID).
- Evidence: two 15-digit identifiers. The first also appears in 4 test files under src/lib/will/__tests__/. Neither is a credential; both need WHATSAPP_TOKEN to be used.
- Root cause: convenience note for the handover.
- Attack prerequisites: the source zip or the repository.
- Impact: small help to someone who already holds a stolen token, or to a social-engineering attempt against Meta support.
- Recommended fix: keep only the variable names in the document.
- Regression test: add a "15-digit number next to a WHATSAPP_ variable name" rule to scripts/lib/secret-scan.cjs if wanted.
- Limits of this verification: I did not confirm the values are the live ones.

### REST-01-F04: Current unguessable questionnaire addresses are listed in a document that ships in the source zip
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-540
- Files and lines: docs/FORM_LINKS_RESET_29OCT.md:13-27 (table of old and new addresses for both brands).
- Evidence: line 3 says every questionnaire page "now has a random address". The table then gives the new random path segments for the residency step, TFN, ABN and super forms (WHT) and the SVT form and its second step. Line 7 says the same values live in config/form-paths.js, which is in the deploy allowlist.
- Root cause: operational note kept beside the code.
- Attack prerequisites: the source zip, the repository, or any page that links to these paths.
- Impact: a random path is obscurity, not access control. Anyone holding this document can open the form pages without paying. Whether that matters depends on the server-side token check on those pages, which is outside this unit.
- Recommended fix: treat the paths as public and rely on the signed form token; or remove the table from docs/ once Meta is updated.
- Regression test: covered by whichever unit owns the form-token check (unpaid request to a slug path must not accept a submission).
- Limits of this verification: I did not open config/form-paths.js or the form routes. security-assessment/proposals/ga-off-form-pages/PLAN.md mentions the same subject; I did not check whether it repeats the values.

### REST-01-F05: Project MCP server is fetched and run from npm with the prompt suppressed
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-494
- Files and lines: .mcp.json:3-6.
- Evidence: command "npx" with "-y" and a package pinned to an exact version, flags --headless and --isolated. A version pin is not an integrity hash, and the package's own dependencies are not locked.
- Root cause: standard way to declare an MCP server.
- Attack prerequisites: compromise of that package version's dependency tree on npm, and a developer who approves the project MCP server.
- Impact: code execution on the developer machine, which holds the project and possibly .env.local. Not a production path: the file is in neither zip profile and is in .vercelignore:9.
- Recommended fix: accept, or install the package as a devDependency so package-lock.json pins the whole tree with integrity values and point .mcp.json at the local binary.
- Regression test: n/a.
- Limits of this verification: static only.

### REST-01-F06: Three compiled Python files sit beside vendored skill scripts
- Severity: INFORMATIONAL
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-829
- Files and lines: .claude/skills/ui-ux-pro-max/scripts/__pycache__/core.cpython-313.pyc, design_system.cpython-313.pyc, reasoning_contract.cpython-313.pyc.
- Evidence: created 26 Oct 05:55; the .py sources are dated 26 Oct 05:47, so they look like the by-product of a local run. .claude/VENDORED.md says every vendored file was read before installation; bytecode cannot be read that way, and Python loads it in place of the source when the header matches.
- Root cause: __pycache__ is not ignored.
- Attack prerequisites: someone able to replace a .pyc in the working copy.
- Impact: unreviewed code would run the next time the skill's search script is used.
- Recommended fix: delete the folder and add __pycache__/ and *.pyc to .gitignore.
- Regression test: release or CI check that no *.pyc exists under .claude.
- Limits of this verification: the files were not opened or decompiled.

### REST-01-F07: Marketing folder holds reviewers' names and review text
- Severity: INFORMATIONAL
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: marketing/review-stories/stories.html (reviews array; name fields per DESIGN-SPEC.md:38-39), marketing/review-stories/output/story-01-0.png to story-18-17.png, marketing/review-stories/DESIGN-SPEC.md:3.
- Evidence: the spec calls them "our real Google reviews". The HTML also carries the business WhatsApp number at line 206 (same number as in src/components/layout/RootDocument.tsx, so public).
- Root cause: source material for Instagram stories.
- Impact: low; the reviews are already public on Google. The folder is in neither zip profile but is not in .vercelignore or .gitignore.
- Recommended fix: add marketing to .vercelignore.
- Regression test: n/a.
- Limits of this verification: the PNG files were not viewed, and the names in the array were not listed or counted.

### REST-01-F08: Two documents are derived from real customer chats; no identifier found by pattern
- Severity: INFORMATIONAL
- Confidence: low
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: docs/what-customers-ask.md:3 ("37 chats"); docs/will_knowledge_seed.json (252 lines).
- Evidence: what-customers-ask.md is a summary by theme; it has 9 short quoted phrases, no digit run of 6 or more and no email address. will_knowledge_seed.json matched none of the phone, email, TFN or bank patterns.
- Impact: none shown.
- Recommended fix: none, unless a manual read finds a customer's name.
- Limits of this verification: personal names cannot be found reliably by pattern, and will_knowledge_seed.json was not read line by line.

## Checked and found sound

- No match in any scoped text file for: Anthropic keys, Meta access tokens, JWTs (including Supabase service role), new-style Supabase keys, AWS key ids, Google API keys and OAuth secrets, Resend keys, Stripe, GitHub, Slack and Vercel tokens, private key blocks, bearer tokens, or URLs with embedded user and password. Each pattern was tested against a synthetic sample first.
- Connection strings: 3 matches, all documentation examples (.claude/vendor-marketplace/plugins/insecure-defaults/references/default-credentials.md:41; security-assessment/parts/sec-supply-secrets.md:170 and its byte-identical copy in audit-output/parts/).
- Env-style assignment with a value: one, a synthetic test value (security-assessment/proposals/form-completion-token/completion-token-wiring.test.ts.txt:5).
- 64-character hex strings in .audit-state/review-ledger.json (1,307) are all under the key "sha256" (file checksums). public/svt-assets/fonts/5.3.0/SHA256SUMS likewise.
- Australian phone numbers outside .data: 4 distinct mobile-shaped values. One is the public business number, one is the documented SVT placeholder, two are test dummies also used in src tests. The other matches were a book identifier in a URL and font-catalogue numbers.
- Email addresses outside .claude: 2 distinct, one on the SVT business domain and one on example.invalid. Inside .claude: vendor and example addresses only.
- TFN-shaped numbers: the standard test TFN (6 occurrences, labelled as such); every other 9-digit match is a phone number already counted. BSB and account matches are the business's own payment details (present in 56 to 84 source files).
- No exported chat transcript: no WhatsApp export header or timestamped message line in any scoped file. No customer name beside a phone number outside .data/store.json.
- No Supabase project host, Vercel project or team id, or *.vercel.app address in the scoped documents. No tokenised form link.
- .claude/settings.json:1-13 holds only a directory marketplace and one enabled plugin. No "hooks" block, no "permissions" block, no bypass setting anywhere under .claude. No MCP auto-enable setting.
- .claude commands (3) and agents (10): prompts only. Agents declare tools Read, Grep, Glob, Bash. Two agents suggest running npm test --listTests and npm audit; nothing runs by itself.
- Code that can execute under .claude, all on request only: skills/systematic-debugging/find-polluter.sh (runs npm test), skills/tob-semgrep/scripts/run-scans.sh (semgrep with metrics off; removes only its own work folders), skills/webapp-testing/scripts/with_server.py (starts a local server), skills/tob-supply-chain-risk-auditor/scripts/sources.py (calls OSV, npm, PyPI, deps.dev, Scorecard, Go proxy and GitHub APIs, as VENDORED.md states), vendor-marketplace/plugins/insecure-defaults/workflows/audit.js (no network call, no env read, no process spawn found).
- public/: the 11 non-image files are llms.txt, llms-full.txt, sitemap-llms.xml, manifest.json, the IndexNow key file (32 bytes; must be public; referenced by scripts/indexnow.mjs), four font licence texts, SHA256SUMS and an empty .gitkeep. None contains an email, a phone number, an internal path (/crm, /api, /admin, /atlas, /login), localhost or a preview address. All links are on the WHT domain and none names the other brand. The 3 SVG files have no script, event handler or external reference. No image has EXIF, GPS or XMP marker bytes.
- WHT-only public files on the SVT host: config/brand-routing.js:94-99 rewrites every SVT-host path outside /_next, /svt-assets and the API allowlist into the SVT tree, and :85 closes the image optimiser there. Static reading only.
- package-lock.json: lockfileVersion 3; 778 packages, 778 resolved entries, all on registry.npmjs.org over https; 778 integrity values, none sha1; no git, http, file or link source; no bundled package. Install scripts: 3 packages, all dev only (fsevents 2.3.3 optional, playwright's nested fsevents 2.3.2 optional, unrs-resolver 1.11.1).
- scripts/package-release.cjs:29-38: neither profile includes .claude, .audit-state, .data, .mcp.json, audit-output, audit-reports, security-assessment, marketing or CHANGES-MIA-17NOV.md. The archive is re-listed and checked against the plan (:128-137).
- No symlink in any scoped directory.

## Open questions

1. Is this folder, or was it ever, a git repository pushed to a remote? If yes, which of the folders in F01 are tracked?
2. Does production deploy from git, from `vercel deploy` in the folder, or from the release zip? F01 matters only for the first two.
3. Are the two identifiers in PROJECT_HANDOFF.md:211-212 the live ones?
4. Do the form pages behind the random addresses enforce a signed token for every brand and step? (F04; another unit's scope.)
5. Does marketing/review-stories show any reviewer who asked for a review to be removed? Not checkable here.
6. public/assets/about/team-office.jpg and the 20 story PNG files were not viewed; a person should confirm they show only what is meant to be public.
7. Not done because the method for this unit was scan-based: a line-by-line read of the 141 docs markdown files, 55 docs json files, the audit and assessment reports, and the vendored skill texts.
