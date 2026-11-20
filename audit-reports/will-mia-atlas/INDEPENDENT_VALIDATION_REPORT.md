# Independent validation report: WILL MIA ATLAS

This report re-checks the earlier conclusions. The same reviewer wrote the earlier work, so this is a second reading of the code, not an independent party. A third-party penetration test is still recommended.

## Re-checks

| Finding | First view | Re-check result | Final status |
|---|---|---|---|
| WMA-01 Mia not in cross-site guard | Medium (scanner said High) | Confirmed in code; session and strict cookie reduce risk | Medium, FIXED |
| WMA-02 Will seed overwrite | Medium | Seed sync is the intended way to push wording. Session-only protection. Audit now added | Medium, audit added, gate NOT added (decision) |
| WMA-03 public-URL uploads | Medium | Re-read: `getPublicUrl` only builds a reference. `assertUploadsBucketPrivate` refuses a public bucket before upload. Files read only via session route | Low |
| WMA-04 Next advisory | Medium | Confirmed by npm audit; fixed | FIXED |
| WMA-05 partner code random | Low | Confirmed; fixed | FIXED |
| WMA-06 raw error in seed | Low | Confirmed; fixed | FIXED |
| Scanner: seed route High | High | False positive: CRM seed is gated; rule tuned | Closed by tuning |
| Scanner: `Math.random` in back-off | Medium | False positive: sleep timing only; rule tuned | Closed by tuning |
| Scanner: `===` on state labels | Medium | False positive; rule tuned | Closed by tuning |
| Scanner: fetch in Meta paging | Medium | False positive: `isGraphPagingUrl` check exists | Accepted with reason |
| Scanner: OTP message logging | Medium | False positive: text says email delivery failed; no address logged | Accepted with reason |
| Atlas action path | Not yet assessed | Human Approve click required; actions limited to three kinds | Low, accepted (WMA-12) |
| JSON-LD serialisation | Not yet assessed | Static content only; no escaping of `</script>` | Low (WMA-10), not changed |
| CI action tags | Not yet assessed | Confirmed; SHA lookup not possible without GitHub access | Low (WMA-11), open |
| Unreferenced components | Not yet assessed | Text search only; removal not done | Low (WMA-13), open |

## Where the earlier work was wrong
- The first reading of WMA-03 was incomplete. The re-read changed its severity. Recorded in SECURITY_FINDINGS.md.
- The first scanner run reported two false High findings. Both were checked and the rules were tuned.

## Remaining uncertainty
- Live settings (Supabase RLS, bucket visibility, Vercel scopes, GitHub protection) were not available.
- The production build was not completed here.
- No browser or live webhook test was run.

## Confidence
- High confidence in the code-level findings listed above, because each was read in source.
- Low confidence in anything about the live system. Those items are NOT VERIFIED, and are not treated as passing.
