# Ella added to whvtax-release-18nov-v6

New (57 files): src/lib/ella/**, src/components/ella/**, src/app/api/atlas/ella/**,
src/app/(site)/crm/atlas/social_svt/page.tsx, supabase/migrations/051_ella.sql.

Changed (7 files, small):
- next.config.js: serverExternalPackages and outputFileTracingIncludes for two Ella routes.
- package.json, package-lock.json: @napi-rs/canvas, ffmpeg-static; dev: tsx, @electric-sql/pglite; script test:ella.
- src/lib/atlas/atlas-view.ts: the Social Media (SVT) tile line and connected flag.
- src/lib/__tests__/api-route-auth-inventory.test.ts, src/lib/__tests__/api-handler-inventory-round2.test.ts,
  src/app/api/crm/__tests__/round2-auth.test.ts: Ella's routes registered; the TikTok OAuth return listed as public
  with a new check that its signed state is verified first.

Not changed: anything in Will or Mia, vercel.json (see ella-schedule-on.patch).

Checks: typecheck clean; ESLint 0 errors (warnings identical to the original); Ella tests 73/73;
site Jest identical to the original (the same 7 files that already failed, no new failures);
next build passes (fonts stubbed offline in a throwaway copy only).

After deploy: run 051 in Supabase, create the private "ella" bucket, set the env keys (see src/lib/ella/README.md).
