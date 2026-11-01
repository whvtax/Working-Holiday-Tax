# Resume instructions

Baseline commit: d9dbac0 (branch svt-build, /home/claude/work/whvtax). Local server: `npx next start -p 3100` from the repo (build with `bash scripts/build-offline.sh` first if .next is missing).

Phases: 1 inventory (done: review-ledger.json) -> 2 specialist agents (see agent-status.json; each writes findings/<name>.md) -> 3 devil's advocate (findings/A10-devil.md) -> 4 CEO decisions (decisions.json) -> 5 fixes + targeted tests -> 6 clean-room build, full tests, quality gates (gates.json) -> 7 release zip + sha256 -> 8 report. progress.json holds the current phase.

On resume: read progress.json; if phase is COMPLETE do nothing. Otherwise check which findings files exist; re-run only the missing agents; never restart finished phases. Any source change after baseline invalidates the relevant tests: re-run them.
