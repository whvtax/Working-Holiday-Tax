# Code quality and dead code report: WILL MIA ATLAS

Method: for every non-test file under `src/lib` and `src/components`, search the whole repo (`src`, `scripts`, `__tests__`, `e2e`) for the file's base name. Files with no reference anywhere are candidates. Candidates are not removed without review.

## Cleanup candidates (no textual reference found)

| File | Evidence | Dynamic-use check | Removal risk | Recommendation |
|---|---|---|---|---|
| `src/components/ui/NextStep.tsx` | no reference in src, scripts, tests, e2e | Next.js resolves pages and layouts by path, not by name. A component file is not loaded by convention | Low | Remove after your approval |
| `src/components/ui/PageHeader.tsx` | no reference anywhere | same | Low | Remove after your approval |
| `src/components/will/CostCards.tsx` | no reference anywhere | same | Low | Remove after your approval |

Not removed in this pass. The brief says never to delete code automatically, and the checks above are text-based. A check on the built output is still needed.

## Other observations (verified)
- **CQ-1: Large files with mixed responsibilities.** `src/lib/will/service.ts` (3,207 lines) and `knowledge-seed.ts` (4,654 lines, data). The service file is the engine core. Splitting it is a maintainability project, not a security fix.
- **CQ-2: Test files inside `src`.** 479 test suites, placed next to the code or in `__tests__`. The deploy zip includes the whole `src` folder, so test files ship in it. The release check still passes because the tests contain only synthetic values. Moving tests out of `src` would shrink the zip; this is a tidy-up, not a risk.
- **CQ-3: Two "unused" marks in the scripted pass were false positives.** The audit script's earlier rules flagged `seed` routes and `Math.random` in back-off code; both were reviewed and are correct.

## Not performed
- Unhandled promise search, `any` usage count, circular dependency analysis, and error-boundary coverage. These need a typed analysis pass (for example `tsc` with strict flags, or `madge`), which was not run in this pass.
