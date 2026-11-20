# Ella: the SVT social media system

Ella turns SVT blog articles into short vertical videos and runs the whole loop:
blog draw, script, video, quality check, Jo's approval, posting, numbers, learning and paid promotion.
Jo works in Atlas: **Social Media (SVT)** opens `/crm/atlas/social_svt`.

Nothing reaches the public without Jo approving the video. No promotion spends money without Jo approving it.

## Where things are

| Part | Path |
|---|---|
| Database (tables, functions, lockdown) | `supabase/migrations/051_ella.sql` |
| Scheduler run, Jo's actions | `src/lib/ella/run.ts` |
| Script rules and writer | `src/lib/ella/script/` (bible v1 in `bible.ts`) |
| Video: voice, timing, HeyGen, brand captions, render, QA | `src/lib/ella/video/` |
| Instagram, TikTok, Meta Ads | `src/lib/ella/publish/` |
| Learning and promotion rules | `src/lib/ella/learn.ts` |
| Atlas screen | `src/app/(site)/crm/atlas/social_svt/page.tsx`, `src/components/ella/` |
| API | `src/app/api/atlas/ella/` (action, media, tick, tiktok/connect, tiktok/callback) |
| Tests | `src/lib/ella/tests/` (`npm run test:ella`) |

Changes to existing files, all small: `next.config.js` (bundles ffmpeg, fonts and Ella's photo with two routes),
`package.json` and lock (two packages, two dev packages, one script), `src/lib/atlas/atlas-view.ts` (one line:
the SVT tile), and three site-wide guard tests that pin the API route inventory (Ella's routes added; the guards
themselves are unchanged). Nothing in Will or Mia changed.

**Automatic schedule: waiting for Jo.** The every-10-minutes run needs one cron line in `vercel.json`, and a test in
Will's folder pins the cron list, so it is kept as `ella-schedule-on.patch` for Jo to approve. Until then Ella runs
when Jo presses **Run now** in Atlas.

## Setup, in order

1. **Database.** Back up, then run `supabase/migrations/051_ella.sql` in the Supabase SQL editor.
2. **Storage.** Create a private bucket named `ella` (Public off).
3. **Vercel environment** (Jo sets these himself):
   - `ELLA_HEYGEN_API_KEY`: HeyGen API key (a separate SVT HeyGen account is recommended).
   - `ANTHROPIC_API_KEY` and `ELLA_SCRIPT_MODEL` (optional `ELLA_QA_MODEL`).
   - `ELLA_META_ACCESS_TOKEN`: Business Manager system user token with instagram_basic,
     instagram_content_publish, instagram_manage_insights, pages_read_engagement, pages_show_list and ads_management.
   - `ELLA_TIKTOK_CLIENT_KEY`, `ELLA_TIKTOK_CLIENT_SECRET`: TikTok developer app with Login Kit and Content Posting API;
     redirect URI `https://<domain>/api/atlas/ella/tiktok/callback`.
   - `ELLA_TOKEN_KEY`: 32 random bytes, base64 (`openssl rand -base64 32`).
   - `CRON_SECRET` already exists for Will; Ella's cron uses the same check.
   - Optional: `ELLA_PRICE_AVATAR_PER_SEC` (until the Avatar 6 price is measured), `ELLA_META_API_VERSION` (default v24.0),
     `ELLA_STORAGE_BUCKET` (default `ella`).
4. **Atlas, Ella, Settings:** voice id, Instagram account id, Facebook Page id, ad account id, SVT WhatsApp number,
   then Connect TikTok, then switch Ella on.
5. **Profiles:** paste the bio texts from the Account setup kit and upload the Ella profile image.

## Limits that stay on

- Video: monthly budget (default US$50) and a cap per video (default US$6), checked before every paid call.
  Every paid call is one row with an idempotency key, so a retry never pays twice.
- Promotion: created PAUSED; Meta's lifetime budget is the hard cap; Ella stops early on cost per WhatsApp chat,
  no chats, or the planned days; a monthly cap blocks new approvals.
- TikTok: posts by hand until TikTok audits the app (API posts would be private before that).
- One scheduler run at a time (database lock).

## Known open points

- HeyGen and Meta request shapes follow their documentation; the first real run is the first live check.
- Avatar 6 price per second is an estimate until measured.
- Meta may class tax services as financial services (special ad category); switch it in Settings if an ad is rejected.
- Rendering runs inside a Vercel function (up to 300 s). If a render ever takes longer, move it to a worker.
