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

## Latest changes (22 Nov 2026)

What changed:
- Removed the "Needs attention" block and the "Edit with Claude", "Change scenes yourself" and "Behind the scenes" blocks from the video view. The bell in the header now holds the problems and clears them when handled.
- One timeline per video: each stage shows its start time and how long it took. The duplicate step table is gone.
- At most 5 seconds of Ella in a row before an AI clip (a blocking check in the script validator, and in the writer's rules).
- Five reviewers now read the final script words and caption on every script (hook, tax accuracy, plain English, caption search, brand and tone). Their verdicts show on the script card. They report only; Jo still approves.
- Learning tab: "Download this week's problems" makes one file with every error and failed step from the last 7 days.
- Instagram: a Story is posted with each Reel (best effort). The Facebook Page copy runs only when the Page ID is set, so leave it empty while Accounts Center shares posts to Facebook.
- Instagram posts no longer carry the AI flag per post. The account is marked as AI in Instagram's own settings.
- Account IDs can come from Vercel (ELLA_IG_USER_ID, ELLA_AD_ACCOUNT_ID, and ELLA_FB_PAGE_ID later). Values saved in Settings win.

After deploy, check:
1. Vercel: ELLA_META_ACCESS_TOKEN set for Production, then Redeploy.
2. Ella Settings: the Meta status shows connected.
3. One video in Manual: Reel, Story and the Facebook Page (if Accounts Center sharing is on) all appear.
4. The learning file downloads from the Learning tab.

## v36 (22 Nov 2026)

What changed:
- Studio: draft A and draft B must differ in hook, approach and order. One judge picks the winner and writes what the fixer takes from the other draft. The fixer changes only the points it was given. Caption step is SEO keyword research.
- Five text reviewers removed. One devil's advocate agent writes notes to the Learning tab only.
- Claude's video edit and the second edit pass are removed. Subtitles stay exactly as they are. The board row is now "Render the video".
- Fix limit stays at 4. Up to 6 AI video clips.
- One video at a time: a second video waits for the first.
- Stop (red button and Cancel) stops all work: running productions, studio stages and new blogs. Nothing runs after a Stop until Start is pressed.
- Start keeps running until it is stopped or the work is done. There is no cap on the number of videos; the HeyGen balance is the only budget.
- "Reset everything" (Overview) clears the system and all blogs so the system starts from zero.
- Timing: when a script's times run longer than its words at the real speaking rate, the times are shortened. The words are never changed.
- Prompt caching is on for the writer's system prompt.

Checks run (all Ella suites pass): timing and stop rules, studio engine, board and run flow, database, video (including the end-to-end render, run alone with a 15-minute budget), HeyGen client, library, validator, learning. Type check clean.
Not tested: a real HeyGen run with real money.

Before deploy:
1. Run migrations 053, 054 and 055 in Supabase, in order (skip any already run). 055 adds the alert clearing used by Reset.
2. Deploy, then open Ella Overview and press "Reset everything" once to start from zero.

Open decision: the word budget in the script bible (60 to 65 words for 30 seconds, planned at 125 words per minute) does not match the measured speaking rate of about 190 to 209 words per minute. At the measured rate, that budget gives a voice under the 29-second minimum. Not changed in v36; needs a decision before the next script run.

## v37 (22 Nov 2026, after v36)

What changed:
- New **Log** tab: the whole audit trail, newest first (the latest 300 lines). Every line opens to show its full detail. It records:
  - every action request and its answer (including failures), from the buttons and the scheduler;
  - every scheduler run (start, result, and any error), with the steps it ran;
  - every video step (voice, Ella's take, each AI clip, render, quality check): its status, attempt, cost and error;
  - every studio stage (research, draft A, draft B, judge, fix, panel, direction, keywords, devil's advocate) with its outcome and reason.
  - Not yet in the log: the raw prompts and the raw model replies. The studio stage lines carry the reason and the outcome.
- Keys, tokens and passwords are removed before a line is written.
- The Start card shows the script stages and one HeyGen point after them (the voice, Ella's take and the AI clips together). Render, quality check and ready to post show on the Videos board.
- The duplicate stage line in the top progress bar is gone.
- "Reset everything" is removed from the Start card. Its action is still in the code and can be removed later.

After deploy, check:
1. Run migration **056** in Supabase (after 051-055). Without it the Log tab shows nothing new, but the page still loads.
2. Open the Log tab, press Start once, and check that the lines appear in order.

## v46 (22 Nov 2026, after v45)

What changed (studio, script writing):
- Each draft (A and B) is checked as soon as it is written. If it breaks a rule, the editor fixes it on the spot, up to two tries per draft. A fix is kept only if it is not worse on the checks. Then the judge sees the draft.
- The checker's rules are in the writer's and the fixer's instructions from the start: hook, promise, clarity, sendable, cta, flow, and accuracy (every claim keeps its hedge and is in the research).
- The final review gate is removed. A script no longer goes back to the fixer because a review score is under 4 or because the judge noted an accuracy problem. Only the automatic code checks (validate.ts) decide pass or fail, as before.
- The judge still compares A and B and picks the winner, and its notes are still stored with the script. They do not block it.
- Stored script issues no longer include the judge's review notes and accuracy notes. Only the automatic checks are listed as issues.

Risk to watch: accuracy is now checked by the writer's rules only, not by a separate reviewer. If wrong or overstated claims reach videos, the next step is a single accuracy check on the final script, not the old gate.

Checks run: studio engine suite 19/19; run flow suite 28/28 (final code); tsc clean.

After deploy: no migration needed. Watch the Log tab for studio:stage lines "Draft A" and "Draft B" with "automatic checks all passed" or the problems found.

## v47 (22 Nov 2026, after v46)

What changed (hook rule):
- The hook check no longer needs words like "student", "visa" or "Australia". It checks for direct address: "you" or "your" in the hook.
- The check is a warning, not a block. A hook without "you" is flagged in the log but does not stop the script.
- The writer is told the same thing: the hook speaks straight to the viewer with "you" or "your", and names their situation.
- The worked example now opens with "Are you on an A-B-N?" (it used to fail the hook check), and its sync word is "on".

Checks run: validator suite 39/39; studio engine suite 19/19; tsc clean.

After deploy: no migration needed. Look for hook.audience warnings in the Log tab on new scripts.

## v48 (22 Nov 2026, after v47)

What changed (the pipeline runs to Ready to post):
- Start is the approval to spend. A script that passes every automatic check goes on to the video by itself, and a video that passes every check goes to Ready to post by itself, in the same run.
- The run ends only when the video is in Ready to post. It stops early only for Stop, or when a check fails and waits for Jo's decision (an alert is raised).
- The "approve automatically" switch is no longer a choice: the code always runs the pipeline to Ready to post. The "Send to HeyGen" button is hidden because nothing waits for it.
- The browser loop continues after "Video next" and "Waiting on scenes", and stops after "Approved automatically".
- The run tests are updated to this flow (end to end, board, cancel, retry, caption and storage tests). The end-to-end slot dates are corrected: the first free slot after the video is ready (Tue 19:30 Sydney).

Checks run: run flow suite 28/28 (final code); studio engine suite 19/19 and validator suite 39/39 (run before this change, not affected by it); tsc clean.

After deploy: no migration. Press Start once and check that the Log shows script_ready, then make_video, then approve_video, and that the video lands in Ready to post.

## v49 (22 Nov 2026, after v48)

What changed (Start button):
- While a script or video is already in the pipeline, Start stays on screen but is grey and cannot be clicked. Hovering it says why.
- "In the pipeline" means a script being written or a video being made (the same items Stop cancels), or a run going in this browser. So Stop or Cancel always frees Start again.
- Before this, Start was hidden only while this browser's own loop ran. After a refresh, or while the scheduler carried the work on, it showed black and clickable.

Checks run: tsc clean; ESLint on the changed file. Screen change only: no logic, test or migration change.

After deploy: no migration. Press Start once and check that it turns grey at once and stays grey until the video is in Ready to post (or until Stop).

## v50 (22 Nov 2026, after v49)

What changed (the "since Start" clock):
- The clock now moves every second whenever a script or video is being made. Before, it ticked only while this browser's own loop ran; after a refresh, or while the scheduler carried the work on, it moved only when the page refreshed (every 20 s).

Checks run: tsc clean; ESLint on the changed file (no new warnings). Screen change only: no logic, test or migration change.

After deploy: no migration. Press Start, refresh the page, and check that the clock still moves second by second.

## v51 (22 Nov 2026, after v50)

What changed (Learning tab: Starts with no video):
- New card at the top of the Learning tab: "Starts with no video". It lists every press of Start in the last 30 days that did not end with a video in Ready to post, with the time, the blog, where it stopped and why.
- Each row has "Download PDF". The PDF holds: a summary (Start time, last log line, blog, status, where it stopped, main reason, money spent); every problem found, in order; the script studio (every stage with OK or FAIL and its note, the drafts with their checks, the judge, the advocate, the research); the saved script and its check issues; every video step (HeyGen, render, quality check) with its error and cost; open alerts; the settings (keys and tokens removed); and the full timeline: every log line of that Start with its full detail, failures in red.
- One Start runs from the press of Start to the next press (or now). Its video is the blog drawn in that window. A Start that is still running is not listed; a Start stopped by Stop or Cancel is listed, with "Stopped by Jo" as the reason.
- The main reason is the saved error or failed check (for example a failed step or a server error). "No blog was drawn" or "the browser loop ended" is used only when nothing else was saved.
- Read only: nothing here changes Ella. Two new read-only actions: start_runs and start_run_pdf.

Checks run: new suite start-report 3/3 (failed script, video made, stopped, still running, no blog drawn, without migration 057, keys kept out of the PDF); database suite 6/6; tsc clean; ESLint 0 errors (no new warnings). A sample PDF was made and checked by eye. Not run here: the site's Jest inventory tests (their setup file is not in this copy); the route's list of action names changed, not its exports.

After deploy:
1. Run migration **057** in Supabase (after 051-056). It adds a time-range read of the log and an index. Without it the card still works, but reads only the latest 1000 log lines and says so in red.
2. Open the Learning tab: the card lists failed Starts. Press "Download PDF" on one and check that the file opens.

## v52 (22 Nov 2026, after v51)

The bug (from Jo's Log, 22 Nov, 11:21 pm): the scheduler finished the script, approved it ("Video next"), and in the same run said "produce: Ella is switched off". In Manual the scheduler only carried on a video already in production, never an approved script. When the browser loop had ended (page refreshed or closed, or the connection dropped), nothing ever started the video. Every run after that said "Ella is switched off".

What changed:
- The scheduler now makes the video of a script approved by a Start, also in Manual. After a Stop it starts nothing ("Stopped: press Start to go on"). A run that already spent over 60 s on the script leaves the video to the next run (the server limit is 800 s).
- Browser loop: when the server is cut off part way (502, 504, or an unreadable 500, for example out of memory while rendering), the loop now goes on with the call in hand. Before, after the handoff to the video it went back to "continue the script", found no script and ended with the video half made.
- One pipeline from Start to Ready to post (Jo): the Start card no longer drops the item when the script is done. It goes on showing the same item through HeyGen, render, quality check and Ready to post. A finished video that did not reach Ready to post stays on the card in red with "Send to Ready to post" and "Cancel".
- Start stays grey for the whole pipeline: script written, script approved, video being made, or a finished video still outside Ready to post. The "since Start" clock runs for the same span.
- Stop (and Cancel) now also cancel a script that is approved or ready and waiting for its video, so the next Start begins clean. A finished video (money already spent) is not cancelled by Stop: it waits on the Start card for Jo.
- TEMPORARY: the Ready to post card has "Send N ready videos to Ready to post". It moves every finished video still waiting into Ready to post, each in the next free slot. Remove it once the pipeline does this every time.

Checks run (final code, one suite after the other): run flow 29/29 (new test: in Manual, a script the scheduler finishes after a Start goes on to its video, and after a Stop it waits); stop 5/5; start-report 3/3; database 6/6; studio engine 19/19; validator 39/39; tsc clean; ESLint 0 errors (4 old warnings, none new).

After deploy: no migration (057 from v51 still needed if not run yet).
1. The script already approved ("Farm hand work on a student visa") is picked up by the next scheduled run (within 5 minutes), as long as Stop was not pressed after it. Watch the Log for produce lines that are no longer "Ella is switched off".
2. Ready to post: press "Send 2 ready videos to Ready to post" once.
3. Press Start once: the card stays on the screen from the script to Ready to post, and Start stays grey all the way.

## v53 (23 Nov 2026, after v52)

What changed:
- Removed the temporary "Send N ready videos to Ready to post" button from the Ready to post card (Jo used it once). A finished video that did not reach Ready to post still shows on the Start card with its own "Send to Ready to post" and "Cancel".

Checks run: tsc clean; ESLint 0 errors (no new warnings). Screen change only: no logic, test or migration change.

After deploy: no migration.

## v54 (23 Nov 2026, after v53)

What changed (video previews on the screen):
- The video file was always right: 1080 x 1920, upright, for TikTok and Instagram. Only the preview on the screen was wrong. In "Ready and scheduled" the player stretched to the full row width and cropped the upright video into a wide strip, and the caption was squeezed to one word per line.
- Every video preview (Ready and scheduled, Posted) is now upright 9:16, 300 px high, never cropped. In a row, the video keeps its own width and the caption gets the rest.

Checks run: tsc clean; the row was rendered in a headless browser and checked by eye. Screen change only: no logic, test or migration change.

After deploy: no migration. Open Ready to post: the video shows upright next to its caption.

## v55 (23 Nov 2026, after v54)

What changed:
- **Lip sync.** In every Ella scene after the first, her lips ran about 0.25 s ahead of the voice. The dissolve between scenes started the next scene half a dissolve (0.25 s) before its own second. Proven by a new test: a mark at 5.000 s in her take showed at 4.767 s. Now each scene comes in exactly at its second, and the dissolve runs over the first half second of it.
- **Lip sync lock.** Before the cut, Ella measures where the voice sits inside her HeyGen take (the take's own sound against the voice file, 10 ms steps, first 30 s) and cuts her scenes that much later. It is used only when the match is clear; a take without sound gives 0. Every video writes a "take_sync" line in the Log with the seconds found and the confidence.
- The take's clock is reset to 0 before it is cut, so a file that starts a few frames in cannot shift her scenes.
- **Ready to post, simplified (Jo).** One row per video: the video, its one caption with hashtags, and three buttons: Download, Publish now, Schedule. Schedule opens a date and time and moves every waiting post of that video to it (new action reschedule_video; a time in the past is refused). The "Post these by hand" block, the checklist, the link field and "I posted it" are gone; for TikTok by hand use Download and the caption. The tab count is one per video, grey (nothing waits for Jo there).

- **Location on every Instagram Reel (Jo).** New setting: "Instagram location on every Reel" (Settings), or ELLA_IG_LOCATION_ID in Vercel; Settings win. It takes the Facebook Page ID of a place (for example Sydney CBD) and is sent as location_id when the Reel is created. Empty: no location. Stories get none (Instagram does not allow a location on API Stories). TikTok: its posting API has no location field, so on TikTok the place is added by hand when posting.
- Test fix: the video suite still expected the worked example's old hook ("Getting paid"); since v47 it opens with "Are you on an A-B-N?". The test now checks the current hook. It was failing before this version too.

Checks run (final code, one suite after the other): run flow 30/30 (new: Schedule moves a whole video; every Reel carries the location); video 13/13 (full render); sync 2/2 (new: the lock finds a 0.3 s offset to within 0.02 s; a mark in her take lands on its exact second after a dissolve, where the old code put it 0.233 s early); stop 5/5; start-report 3/3; database 6/6; studio engine 19/19; validator 39/39; HeyGen client 4/4; tsc clean; ESLint 0 errors (4 old warnings, none new).

After deploy: no migration.
1. Settings: paste the Facebook Page ID of the place into "Instagram location on every Reel" and save.
2. Watch the Log for "take_sync" on the next video, and watch her lips in the first scenes after a dissolve.

## v56 (23 Nov 2026, after v55)

What changed:
- **Sydney CBD on every post, Instagram and TikTok (Jo).** The code writes the line "📍 Sydney CBD" in every caption, after the text and before the "not tax advice" note and the hashtags. It is added once, even when a caption is finished again. This works on both platforms with no ID and nothing by hand. (TikTok's posting API has no location field, so the caption line is the way to show the place there.)
- The real Instagram location tag (v55) stays optional: it works only once the Facebook Page ID of the place is set in Settings.

Checks run: new caption suite 1/1; studio engine 19/19; validator 39/39; run flow 30/30; tsc clean.

After deploy: no migration. New captions show "📍 Sydney CBD". Videos already waiting in Ready to post keep their caption as it was saved.

## v57 (23 Nov 2026, after v56)

What changed:
- Buttons: a link styled as a button (Download, Download cover image) was taller than the buttons next to it (its padding came on top of the minimum height). All buttons are now the same height.

## v58 (23 Nov 2026, built on the v57 zip Jo uploaded)

That zip was v56 plus one change made outside this chat: the TikTok connect return now shows a plain "TikTok connected" page instead of going back into Atlas (the CRM cookie is SameSite=Strict, so Atlas would ask for sign-in again). It is kept as it is. The v57 button fix was missing from it and is applied again here.

What changed:
- **No place written in the caption.** The "📍 Sydney CBD" line from v56 is removed (Jo: tag the place, never write it). A caption that still has the line loses it when finished.
- **A random Sydney CBD place tagged on every Instagram Reel, by Instagram itself** (location_id). Where the places come from:
  1. Settings, "Instagram places": Facebook Page IDs, comma separated, when Jo sets them; else
  2. Ella's own search: the Meta Pages search for 12 well-known CBD places (Town Hall, Martin Place, Hyde Park, QVB, Circular Quay, Pitt Street Mall, Wynyard, Barangaroo, The Rocks...), keeping only Pages whose map point is inside the CBD. The list is saved for 30 days.
  One place is picked at random per Reel and written to the Log ("ig_place"). A place never blocks a post: if Instagram refuses it, the Reel is created again without one ("ig_place_refused"), and later tries go without a place. If the Meta token may not search Pages and no IDs are set, Reels go out without a place and one alert says what to do. TikTok: its posting API has no place field, so TikTok posts carry no place.
- **Caption length: 40 to 50 words** (the words Ella writes; the note, hashtags and emojis are not counted). The caption team is told the range; if its caption is out of range it gets one more try with the count, and the try closer to the range is kept. The checks warn ("caption.words") but never block the video.
- **Ready to post shows the cover** next to the video, each named (Video, Cover).
- **The cover never hides her face (Jo).** The title was already drawn low; now a fixed face line (y 1000 of 1920, below her chin even at the closest punch-in) is enforced in code: the title always starts below it, and nothing but the series tab (above her forehead) is drawn above it. A new test draws every layout with the longest title and checks no pixel changes in the face area.
- Studio test model: its caption is now 46 words (inside the new range).

Checks run (final code, one suite after the other): captions 2/2 (new); places 5/5 (new: only CBD map points, saved 30 days, Settings win, a refused place never blocks the Reel); cover 1/1 (new); studio engine 20/20 (new: the length retry); validator 39/39; run flow 30/30; video 13/13 (full render); sync 2/2; stop 5/5; start-report 3/3; database 6/6; HeyGen client 4/4; tsc clean; ESLint 0 errors (4 old warnings, none new). A real cover was drawn from Ella's image and checked by eye.

After deploy: no migration.
1. Press Start. When the video reaches Ready to post, check the cover next to it and a caption of 40 to 50 words with no place line.
2. When it posts on Instagram, the Log shows "ig_place" with the place, or an alert says the token may not search Pages. In that case paste a few Facebook Page IDs of CBD places in Settings, "Instagram places".

## v65 (23 Nov 2026, built on the v64 zip)

What changed:
- **No series tab on the cover (Jo).** The "MYTH OR FACT" style tab at the top left of the cover is no longer drawn. The series still sets where the title sits. The tag inside the video itself is unchanged.
- **Full stop on the cover title (Jo).** A title with a question and then a statement ("Flying with cash? Declare it") now ends with a full stop. A title that is one question stays as it is.
- **Cancel on Ready to post (Jo).** A fourth button next to Download, Publish now and Schedule. After a confirm, it cancels that video's posts, removes it from Ready to post and returns its blog to the draw. Unlike the other Cancel buttons it stops nothing else: other work keeps running. Refused if part of the video is already posted or posting. New action discard_video. The files stay in the private storage bucket.
- **Emojis in captions (Jo).** The video in Ready to post had the writer's own caption, because the caption team's caption was not used: the writer is never told about emojis, and the caption team's answer, when it could not be read, was dropped after one try. Now: an unreadable answer gets a second try, and a caption with fewer than 3 or more than 4 emojis gets one more try (like the 40 to 50 word rule; the try closer to both rules is kept). It never blocks the video.

Checks run: captions 3/3, cover 2/2, run flow 31/31 (new: Cancel on Ready to post cancels only that video and returns its blog), validator 39/39, studio engine 20/20, stop 5/5; tsc clean; ESLint 0 errors (4 old warnings, none new).

After deploy: no migration. Videos already in Ready to post keep their cover and caption; to remake one, use the new Cancel and press Start.

## v66 (23 Nov 2026, after v65)

What changed (Jo: no "MYTH OR FACT" anywhere):
- The series name is never drawn: not on the cover (v65), not on the graphic cards inside the video (a myth_fact card no longer has the "MYTH OR FACT" label pill; other cards keep theirs), and the unused series tag code is removed.
- A cover title that carries a series name is replaced by the safe title from the hook.
- The brand book the cover designer reads no longer asks for series tabs.
- The series stays as an internal name only (it picks the script template and the cover layout).
- Note: the "Video" box in Ready to post shows the cover as its poster, so a video made before v65 still shows the tab there until it is played.

Checks run: cover 3/3 (new: no series name in the title; the myth card draws without a label); tsc clean; ESLint 0 errors. Not run: the full video render suite (the change is drawing only).

After deploy: no migration. Videos already made keep their cover; use Cancel on Ready to post and Start to remake one.

## v67 (23 Nov 2026, after v66)

What changed (site, not Ella):
- The Student Visa Tax footer now shows the legal entity: "Student Visa Tax is a trading name of SIMPLE TAX SERVICES PTY LTD." Meta's business verification for the Student Visa Tax portfolio stalled because its crawler could not find the legal name on studentvisatax.com.au.

Checks run: tsc clean; SVT site tests 684/684.

After deploy: no migration. Open studentvisatax.com.au, check the footer line, then in Meta Security Center re-submit or appeal the business verification.
