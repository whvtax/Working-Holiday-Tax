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

## Lessons (Nov 21)
- Tab memory: the open tab lived only in the page's memory, so a refresh could bring the address's tab back. The tab is now written into the address (?tab=...) on every click.
- Live progress: a script's current step is saved before its model call (`current`), so the board shows the real step and its running time. A step cut off by the server time limit is logged as interrupted and retried from the same step.
- Cancel: a cancelled script is not continued by a later run, and its status is not written back.
- Summary cards show five words per line, for display only; the script itself is unchanged.
- "Behind the scenes" shows only what HeyGen receives (visual panel, per-scene instructions). Research is not shown there: it is done in the back office.
- Visual panel: five experts now (adds a tax compliance and brand safety reviewer). Stage 2 states who does each step: HeyGen makes voice, Ella and clips; Claude edits and checks.
- Followers: Instagram and TikTok are two separate tiles, each with its own goal bar (10k).
- Overview: new tile 'Views, last 30 days' split into Instagram and TikTok (latest views per post from the metrics checks). Posts tile shows the count per platform.
- Bell: now opens an Activity log (last 15 steps, in plain words) next to any problems; it shows even when nothing is wrong.
- Tabs: every stage shows its count. Red = waiting for you (scripts and videos to check, ready posts to approve); grey = how many are in that stage.
- UX review (5 design agents: information, visual, task flow, accessibility, feedback). Done: Settings follows the header switch (it could save an old on/off value); confirmations before Send to HeyGen, Cancel video (shows the amount already spent), Post now and switching to Automatic; the Videos tab refreshes every 10 s while videos are made; "Waiting for you" opens its stage; the red badge is darker for contrast; "posts reported" shows how many posts have figures behind the views total.
- Not done yet (from the review): 4-column KPI grid with larger numbers, smaller phone previews, a type scale, labels on every settings field, one name per action across the screen, and a clearer note when the scheduler has not run.
- Video step stopped with "No readable answer (HTTP 500)": the server stopped part way (most likely out of memory while rendering). The screen now treats that like a time limit: it carries on from the saved step, and nothing is paid twice. vercel.json now gives the Ella action and tick routes 3008 MB of memory and 800 s. Deploy needs the Vercel plan to allow that memory.
- Waiting for HeyGen: a run now waits up to about 4 minutes inside itself (checks every 20 s) before it hands over to the next scheduled run. Each HeyGen step used to cost one full 5-minute schedule gap.
- A stopped server (no readable answer) carries on from the saved step.
- Still to build: a history panel per video showing every step with its time and cost, and a button to download the full history.
