# Performance report: WILL MIA ATLAS

## Measurements
- **None taken.** The production build cannot finish in this sandbox (Google Fonts is unreachable). Bundle sizes, Core Web Vitals, and API latency therefore have no measured baseline. Per the brief, no percentage improvement is claimed.

## Static findings (code reading, unmeasured)
- **PERF-1: Mia pipeline paging.** `MIA_PAGE_MAX` is 1,000. The pipeline route reads up to that limit and groups in memory. Fine for current volumes. Above about 1,000 SVT customers, the screen shows `truncated: true`, which is the intended behaviour rather than silent loss.
- **PERF-2: Chats list paging.** `/api/mia/chats` caps `limit` at 100 and pages by offset. Offset paging gets slower on large tables. Acceptable at current scale.
- **PERF-3: Large client components.** `DashboardClient.tsx` (2,730 lines) and `Will Dashboard.tsx` (2,834 lines) are large. They are loaded on the owner's screens only, so public visitors do not pay for them. Splitting would help maintainability more than speed.
- **PERF-4: Large static data files.** Three blog data files are about 9,000 to 10,000 lines each. They are generated static content. Their effect on the public bundle depends on how Next splits them, which was not measured.
- **PERF-5: Serverless cold starts.** Not measured.
- **PERF-6: Repeated template verification.** The Meta template check caches results with a TTL (`TEMPLATE_VERIFY_TTL_MS`). Good.

## Target metrics (to set after a measured baseline)
- Owner dashboard first paint on a mobile connection.
- `/api/mia/pipeline` p95 latency with the current customer count.
- Public blog page LCP.

## Method for a real baseline (next step)
1. Build on a Vercel preview (where fonts are reachable).
2. Record bundle sizes from the build output.
3. Measure the owner pages and the public pages with the same network profile, three runs each.
4. Only then propose optimisations, each with a before and after measurement.
