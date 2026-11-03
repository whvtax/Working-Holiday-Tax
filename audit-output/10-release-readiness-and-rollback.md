# Release readiness and rollback

Release checklist: run `npx next build` in an environment with internet (fonts); deploy to a preview; open /sitemap.xml and check it is XML; click through 6 language homepages and the menu at 360px; open one CRM PDF; then promote. Re-submit sitemap.xml in Search Console afterwards.

Rollback: the previous locked build is whvtax-wht-6lang-FINAL6.zip. Redeploy it to restore the prior state. Security changes are isolated in the patch listed in security-assessment/12-final-devils-advocate-review.md; the optional Report-Only CSP is off unless CSP_REPORT_ONLY=true.

Blockers for launch: none confirmed Critical or High. Open items are listed in 00-executive-summary.md.
