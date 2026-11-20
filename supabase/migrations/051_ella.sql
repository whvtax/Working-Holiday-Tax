-- ════════════════════════════════════════════════════════════════════════════
-- 051 - Ella: the Student Visa Tax video system (social media, SVT only).
--
-- DRAFT. NOT APPLIED. Back up the database, then run in the Supabase SQL editor.
--
-- Scope: creates only new tables and functions whose names start with ella_.
-- Reads, alters or writes no will_*, mia_*, crm_* or other existing object.
--
-- What it holds:
--   blog registry and draws without repeats, scripts, video steps (one row per
--   paid call, idempotent), finished renders, posts, metrics, paid promotion,
--   follower counts, settings, alerts, audit and AI usage.
-- Every app call goes through an ella_api_* function (jsonb in, jsonb out).
--
-- Security: RLS on with no policies (deny-all for anon and authenticated);
-- the server uses the service role. Functions pin search_path and are
-- executable by service_role only.
--
-- Storage: also create a PRIVATE bucket named "ella" (Storage, New bucket,
-- Public off). Videos are served to Atlas through a logged-in route only.
--
-- Rollback: DROP every ella_* table and function (listed by
--   SELECT 'drop table ' || tablename || ' cascade;' FROM pg_tables WHERE tablename LIKE 'ella\_%';).
--
-- Safe to run more than once.
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS ella_blog_registry (
  slug            text PRIMARY KEY,
  brand           text NOT NULL DEFAULT 'svt' CHECK (brand = 'svt'),
  kind            text NOT NULL CHECK (kind IN ('long', 'blog', 'guide')),
  title           text NOT NULL,
  category        text NOT NULL,
  pillar          text NOT NULL,
  content_hash    text NOT NULL,
  updated_on      date,
  excluded        boolean NOT NULL DEFAULT false,
  exclude_reason  text,
  in_library      boolean NOT NULL DEFAULT true,
  first_seen_at   timestamptz NOT NULL DEFAULT now(),
  last_synced_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ella_productions (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand                 text NOT NULL DEFAULT 'svt' CHECK (brand = 'svt'),
  slug                  text NOT NULL REFERENCES ella_blog_registry(slug),
  pillar                text NOT NULL,
  content_hash_at_claim text NOT NULL,
  key_term              text,
  hook_type             text,
  cta_type              text,
  status                text NOT NULL DEFAULT 'drawn'
                        CHECK (status IN ('drawn', 'scripting', 'script_ready', 'needs_jo', 'approved',
                          'producing', 'video_ready', 'video_needs_jo', 'scheduled', 'published', 'cancelled')),
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ella_productions_created_idx ON ella_productions (created_at DESC);

-- One live claim per slug, forever, unless Jo releases it. This unique key is
-- what makes two simultaneous draws unable to get the same blog.
CREATE TABLE IF NOT EXISTS ella_slug_claims (
  slug          text PRIMARY KEY REFERENCES ella_blog_registry(slug),
  production_id uuid NOT NULL REFERENCES ella_productions(id),
  claimed_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ella_scripts (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  production_id  uuid NOT NULL REFERENCES ella_productions(id),
  version        integer NOT NULL,
  bible_version  text NOT NULL,
  script         jsonb NOT NULL,
  issues         jsonb NOT NULL DEFAULT '[]'::jsonb,
  passed         boolean NOT NULL,
  attempts       integer NOT NULL,
  created_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (production_id, version)
);

CREATE TABLE IF NOT EXISTS ella_alerts (
  id          bigserial PRIMARY KEY,
  kind        text NOT NULL,
  dedupe_key  text NOT NULL UNIQUE,
  message     text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);

CREATE TABLE IF NOT EXISTS ella_audit (
  id     bigserial PRIMARY KEY,
  at     timestamptz NOT NULL DEFAULT now(),
  actor  text NOT NULL,
  action text NOT NULL,
  detail jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS ella_ai_usage (
  id            bigserial PRIMARY KEY,
  production_id uuid REFERENCES ella_productions(id),
  feature       text NOT NULL,
  model         text NOT NULL,
  input_tokens  integer NOT NULL DEFAULT 0,
  output_tokens integer NOT NULL DEFAULT 0,
  at            timestamptz NOT NULL DEFAULT now()
);

-- ── Sync: upsert every library article; mark vanished ones out of library ──
CREATE OR REPLACE FUNCTION ella_sync_registry(p_entries jsonb)
RETURNS integer
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
DECLARE n integer;
BEGIN
  INSERT INTO ella_blog_registry AS r
    (slug, kind, title, category, pillar, content_hash, updated_on, excluded, exclude_reason, in_library, last_synced_at)
  SELECT e->>'slug', e->>'kind', e->>'title', e->>'category', e->>'pillar', e->>'contentHash',
         NULLIF(e->>'updated', '')::date, COALESCE((e->>'excluded')::boolean, false), e->>'excludeReason', true, now()
  FROM jsonb_array_elements(p_entries) AS e
  ON CONFLICT (slug) DO UPDATE SET
    kind = EXCLUDED.kind, title = EXCLUDED.title, category = EXCLUDED.category, pillar = EXCLUDED.pillar,
    content_hash = EXCLUDED.content_hash, updated_on = EXCLUDED.updated_on, excluded = EXCLUDED.excluded,
    exclude_reason = EXCLUDED.exclude_reason, in_library = true, last_synced_at = now();
  GET DIAGNOSTICS n = ROW_COUNT;

  UPDATE ella_blog_registry SET in_library = false
  WHERE slug NOT IN (SELECT e->>'slug' FROM jsonb_array_elements(p_entries) AS e) AND in_library;

  RETURN n;
END $$;

-- ── Alerts: one row per event, never repeated (dedupe_key is unique) ────────
CREATE OR REPLACE FUNCTION ella_raise_alert(p_kind text, p_dedupe_key text, p_message text)
RETURNS boolean
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
DECLARE inserted integer;
BEGIN
  INSERT INTO ella_alerts (kind, dedupe_key, message) VALUES (p_kind, p_dedupe_key, p_message)
  ON CONFLICT (dedupe_key) DO NOTHING;
  GET DIAGNOSTICS inserted = ROW_COUNT;
  RETURN inserted = 1;
END $$;

-- ── Draw: weighted random eligible slug, claimed atomically ────────────────
-- p_pillar_weights: {"Work and income": 1.4, ...}; missing pillars weigh 1.
-- p_skip_key_terms is applied through the pillar/slug preference in the app;
-- here it skips slugs whose slug text contains a recently used key term, and
-- the filter is dropped when it would leave nothing.
-- Returns one row, or no row when the library is used up (and raises the
-- library_empty alert once per library size).
CREATE OR REPLACE FUNCTION ella_claim_blog(p_pillar_weights jsonb, p_skip_key_terms text[], p_actor text)
RETURNS TABLE (production_id uuid, slug text, pillar text)
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
#variable_conflict use_column
DECLARE
  attempt   integer;
  pick      ella_blog_registry%ROWTYPE;
  new_id    uuid;
  claimed   integer;
  use_skip  boolean := true;
  lib_size  integer;
BEGIN
  FOR attempt IN 1..5 LOOP
    SELECT r.* INTO pick
    FROM ella_blog_registry r
    WHERE r.in_library AND NOT r.excluded
      AND NOT EXISTS (SELECT 1 FROM ella_slug_claims c WHERE c.slug = r.slug)
      AND (NOT use_skip OR p_skip_key_terms IS NULL OR NOT EXISTS (
            SELECT 1 FROM unnest(p_skip_key_terms) t WHERE t <> '' AND r.slug ILIKE '%' || t || '%'))
    ORDER BY -ln(greatest(random(), 1e-12)) / greatest(COALESCE((p_pillar_weights ->> r.pillar)::numeric, 1), 0.0001)
    LIMIT 1;

    IF NOT FOUND THEN
      IF use_skip THEN
        use_skip := false;     -- drop the recent key term filter and retry
        CONTINUE;
      END IF;
      SELECT count(*) INTO lib_size FROM ella_blog_registry WHERE in_library AND NOT excluded;
      PERFORM ella_raise_alert('library_empty', 'library_empty:' || lib_size,
        'Content library used up. Add new articles or choose what to do next.');
      RETURN;
    END IF;

    INSERT INTO ella_productions (slug, pillar, content_hash_at_claim)
    VALUES (pick.slug, pick.pillar, pick.content_hash)
    RETURNING id INTO new_id;

    INSERT INTO ella_slug_claims (slug, production_id) VALUES (pick.slug, new_id)
    ON CONFLICT (slug) DO NOTHING;
    GET DIAGNOSTICS claimed = ROW_COUNT;

    IF claimed = 1 THEN
      INSERT INTO ella_audit (actor, action, detail)
      VALUES (p_actor, 'claim', jsonb_build_object('slug', pick.slug, 'production_id', new_id, 'attempt', attempt));
      production_id := new_id; slug := pick.slug; pillar := pick.pillar;
      RETURN NEXT;
      RETURN;
    END IF;

    -- Someone else claimed this slug a moment ago: discard and draw again.
    DELETE FROM ella_productions WHERE id = new_id;
  END LOOP;
  RETURN;
END $$;

-- ── Release: only Jo, only for a cancelled production; logged ──────────────
CREATE OR REPLACE FUNCTION ella_release_slug(p_slug text, p_actor text)
RETURNS boolean
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
DECLARE st text; pid uuid;
BEGIN
  SELECT p.status, p.id INTO st, pid
  FROM ella_slug_claims c JOIN ella_productions p ON p.id = c.production_id
  WHERE c.slug = p_slug;
  IF NOT FOUND OR st <> 'cancelled' THEN
    RETURN false;
  END IF;
  DELETE FROM ella_slug_claims WHERE slug = p_slug;
  INSERT INTO ella_audit (actor, action, detail)
  VALUES (p_actor, 'release', jsonb_build_object('slug', p_slug, 'production_id', pid));
  RETURN true;
END $$;


-- Productions: extra fields for review and publishing.
ALTER TABLE ella_productions ADD COLUMN IF NOT EXISTS script_version  integer;
ALTER TABLE ella_productions ADD COLUMN IF NOT EXISTS render_version  integer;
ALTER TABLE ella_productions ADD COLUMN IF NOT EXISTS approved_at     timestamptz;
ALTER TABLE ella_productions ADD COLUMN IF NOT EXISTS jo_note         text;

-- ════ Stage 2: video steps (one row per paid call) and finished renders ═════
CREATE TABLE IF NOT EXISTS ella_steps (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  production_id    uuid NOT NULL REFERENCES ella_productions(id),
  script_version   integer NOT NULL,
  kind             text NOT NULL CHECK (kind IN ('voice', 'ella_scene', 'clip', 'render', 'qa')),
  scene            integer NOT NULL DEFAULT 0,
  attempt          integer NOT NULL DEFAULT 1,
  status           text NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending', 'submitted', 'completed', 'failed', 'superseded')),
  provider_job_id  text,
  idempotency_key  text NOT NULL UNIQUE,
  input            jsonb NOT NULL DEFAULT '{}'::jsonb,
  output           jsonb NOT NULL DEFAULT '{}'::jsonb,
  cost_usd         numeric(10, 4),
  error            text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (production_id, script_version, kind, scene, attempt)
);
CREATE INDEX IF NOT EXISTS ella_steps_production_idx ON ella_steps (production_id, script_version);

CREATE TABLE IF NOT EXISTS ella_renders (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  production_id  uuid NOT NULL REFERENCES ella_productions(id),
  version        integer NOT NULL,
  script_version integer NOT NULL,
  video_path     text NOT NULL,
  edit_plan      jsonb NOT NULL,
  captions       jsonb NOT NULL,
  duration_sec   numeric(6, 2) NOT NULL,
  qa             jsonb NOT NULL DEFAULT '[]'::jsonb,
  qa_passed      boolean NOT NULL DEFAULT false,
  created_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (production_id, version)
);

-- ════ Stage 3: settings, posts, metrics, paid promotion, followers ═════════
CREATE TABLE IF NOT EXISTS ella_settings (
  key        text PRIMARY KEY,
  value      jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ella_posts (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  production_id    uuid NOT NULL REFERENCES ella_productions(id),
  render_version   integer NOT NULL,
  platform         text NOT NULL CHECK (platform IN ('instagram', 'tiktok')),
  mode             text NOT NULL CHECK (mode IN ('auto', 'manual')),
  status           text NOT NULL DEFAULT 'scheduled'
                   CHECK (status IN ('scheduled', 'publishing', 'published', 'manual_ready', 'failed', 'cancelled')),
  scheduled_at     timestamptz NOT NULL,
  published_at     timestamptz,
  caption          text NOT NULL,
  container_id     text,
  provider_post_id text,
  permalink        text,
  attempts         integer NOT NULL DEFAULT 0,
  error            text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (production_id, platform)
);
CREATE INDEX IF NOT EXISTS ella_posts_due_idx ON ella_posts (status, scheduled_at);

CREATE TABLE IF NOT EXISTS ella_metrics (
  id            bigserial PRIMARY KEY,
  post_id       uuid NOT NULL REFERENCES ella_posts(id),
  checkpoint    text NOT NULL CHECK (checkpoint IN ('1h', '24h', '72h', '7d', '28d')),
  captured_at   timestamptz NOT NULL DEFAULT now(),
  views         integer, reach integer, likes integer, comments integer,
  shares        integer, saves integer, avg_watch_ms integer, follows integer,
  raw           jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (post_id, checkpoint)
);

CREATE TABLE IF NOT EXISTS ella_ads (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id            uuid NOT NULL REFERENCES ella_posts(id),
  status             text NOT NULL DEFAULT 'proposed'
                     CHECK (status IN ('proposed', 'creating', 'ready_paused', 'active', 'paused', 'stopped', 'failed', 'rejected')),
  daily_budget_aud   numeric(10, 2) NOT NULL,
  total_cap_aud      numeric(10, 2) NOT NULL,
  max_cost_per_conversation_aud numeric(10, 2) NOT NULL,
  days               integer NOT NULL,
  reason             text,
  campaign_id text, adset_id text, creative_id text, ad_id text,
  spend_aud          numeric(10, 2) NOT NULL DEFAULT 0,
  conversations      integer NOT NULL DEFAULT 0,
  impressions        integer NOT NULL DEFAULT 0,
  approved_at        timestamptz,
  started_at         timestamptz,
  last_checked_at    timestamptz,
  stop_reason        text,
  error              text,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);
-- One live promotion per post.
CREATE UNIQUE INDEX IF NOT EXISTS ella_ads_one_live ON ella_ads (post_id)
  WHERE status IN ('proposed', 'creating', 'ready_paused', 'active', 'paused');

CREATE TABLE IF NOT EXISTS ella_followers (
  id        bigserial PRIMARY KEY,
  platform  text NOT NULL CHECK (platform IN ('instagram', 'tiktok')),
  day       date NOT NULL,
  followers integer NOT NULL,
  UNIQUE (platform, day)
);

-- ════ The API: every call from the app is one of these functions ══════════
-- Each takes one jsonb argument and returns jsonb, so the app has one code
-- path (supabase.rpc in production, the same SQL in tests).

CREATE OR REPLACE FUNCTION ella_api_sync_registry(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT to_jsonb(ella_sync_registry(p->'entries'))
$$;

CREATE OR REPLACE FUNCTION ella_api_claim_blog(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT COALESCE((SELECT jsonb_build_object('productionId', c.production_id, 'slug', c.slug, 'pillar', c.pillar)
    FROM ella_claim_blog(p->'weights',
      ARRAY(SELECT jsonb_array_elements_text(COALESCE(p->'skip', '[]'::jsonb))), p->>'actor') c LIMIT 1), 'null'::jsonb)
$$;

CREATE OR REPLACE FUNCTION ella_api_release_slug(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT to_jsonb(ella_release_slug(p->>'slug', p->>'actor'))
$$;

CREATE OR REPLACE FUNCTION ella_api_recent_productions(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT COALESCE(jsonb_agg(jsonb_build_object('slug', slug, 'pillar', pillar, 'keyTerm', key_term,
    'hookType', hook_type, 'ctaType', cta_type, 'createdAt', created_at) ORDER BY created_at DESC), '[]'::jsonb)
  FROM (SELECT * FROM ella_productions WHERE status <> 'cancelled' ORDER BY created_at DESC
        LIMIT COALESCE((p->>'limit')::int, 10)) x
$$;

CREATE OR REPLACE FUNCTION ella_api_set_status(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  UPDATE ella_productions SET status = p->>'status',
    key_term = COALESCE(p->>'keyTerm', key_term), hook_type = COALESCE(p->>'hookType', hook_type),
    cta_type = COALESCE(p->>'ctaType', cta_type),
    script_version = COALESCE((p->>'scriptVersion')::int, script_version),
    render_version = COALESCE((p->>'renderVersion')::int, render_version),
    approved_at = CASE WHEN p ? 'approvedAt' THEN (p->>'approvedAt')::timestamptz ELSE approved_at END,
    jo_note = CASE WHEN p ? 'note' THEN p->>'note' ELSE jo_note END,
    updated_at = now()
  WHERE id = (p->>'id')::uuid
  RETURNING to_jsonb(true)
$$;

CREATE OR REPLACE FUNCTION ella_api_save_script(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  INSERT INTO ella_scripts (production_id, version, bible_version, script, issues, passed, attempts)
  VALUES ((p->>'productionId')::uuid,
    COALESCE((SELECT max(version) FROM ella_scripts WHERE production_id = (p->>'productionId')::uuid), 0) + 1,
    p->>'bibleVersion', p->'script', COALESCE(p->'issues', '[]'::jsonb), (p->>'passed')::boolean, (p->>'attempts')::int)
  RETURNING to_jsonb(version)
$$;

CREATE OR REPLACE FUNCTION ella_api_log_usage(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  INSERT INTO ella_ai_usage (production_id, feature, model, input_tokens, output_tokens)
  VALUES (NULLIF(p->>'productionId', '')::uuid, p->>'feature', p->>'model',
    COALESCE((p->>'inputTokens')::int, 0), COALESCE((p->>'outputTokens')::int, 0))
  RETURNING to_jsonb(true)
$$;

CREATE OR REPLACE FUNCTION ella_api_audit(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  INSERT INTO ella_audit (actor, action, detail) VALUES (p->>'actor', p->>'action', COALESCE(p->'detail', '{}'::jsonb))
  RETURNING to_jsonb(true)
$$;

CREATE OR REPLACE FUNCTION ella_api_raise_alert(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT to_jsonb(ella_raise_alert(p->>'kind', p->>'dedupeKey', p->>'message'))
$$;

CREATE OR REPLACE FUNCTION ella_api_resolve_alert(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  WITH u AS (UPDATE ella_alerts SET resolved_at = now()
    WHERE resolved_at IS NULL AND (id = (p->>'id')::bigint
      OR (p->>'productionId' IS NOT NULL AND kind = 'review' AND dedupe_key LIKE '%:' || (p->>'productionId') || '%'))
    RETURNING 1)
  SELECT to_jsonb(count(*)) FROM u
$$;

-- Steps ───────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION ella_step_json(s ella_steps) RETURNS jsonb
LANGUAGE sql IMMUTABLE SET search_path = public, pg_temp AS $$
  SELECT jsonb_build_object('id', s.id, 'productionId', s.production_id, 'scriptVersion', s.script_version,
    'kind', s.kind, 'scene', s.scene, 'attempt', s.attempt, 'status', s.status, 'providerJobId', s.provider_job_id,
    'idempotencyKey', s.idempotency_key, 'input', s.input, 'output', s.output, 'costUsd', s.cost_usd, 'error', s.error)
$$;

CREATE OR REPLACE FUNCTION ella_api_step_current(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT COALESCE((SELECT ella_step_json(s) FROM ella_steps s
    WHERE s.production_id = (p->>'productionId')::uuid AND s.script_version = (p->>'scriptVersion')::int
      AND s.kind = p->>'kind' AND s.scene = (p->>'scene')::int AND s.status <> 'superseded'
    ORDER BY s.attempt DESC LIMIT 1), 'null'::jsonb)
$$;

CREATE OR REPLACE FUNCTION ella_api_step_start(p jsonb) RETURNS jsonb
LANGUAGE plpgsql SET search_path = public, pg_temp AS $$
DECLARE n int; k text; r ella_steps;
BEGIN
  SELECT COALESCE(max(attempt), 0) + 1 INTO n FROM ella_steps
  WHERE production_id = (p->>'productionId')::uuid AND script_version = (p->>'scriptVersion')::int
    AND kind = p->>'kind' AND scene = (p->>'scene')::int;
  k := format('ella:%s:v%s:%s:%s:a%s', p->>'productionId', p->>'scriptVersion', p->>'kind', p->>'scene', n);
  INSERT INTO ella_steps (production_id, script_version, kind, scene, attempt, idempotency_key, input)
  VALUES ((p->>'productionId')::uuid, (p->>'scriptVersion')::int, p->>'kind', (p->>'scene')::int, n, k, COALESCE(p->'input', '{}'::jsonb))
  ON CONFLICT (idempotency_key) DO UPDATE SET updated_at = ella_steps.updated_at
  RETURNING * INTO r;
  RETURN ella_step_json(r);
END $$;

CREATE OR REPLACE FUNCTION ella_api_step_update(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  UPDATE ella_steps SET status = COALESCE(p->>'status', status),
    provider_job_id = COALESCE(p->>'providerJobId', provider_job_id),
    output = COALESCE(p->'output', output), cost_usd = COALESCE((p->>'costUsd')::numeric, cost_usd),
    error = p->>'error', updated_at = now()
  WHERE id = (p->>'id')::uuid RETURNING to_jsonb(true)
$$;

CREATE OR REPLACE FUNCTION ella_api_step_supersede(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  WITH u AS (UPDATE ella_steps SET status = 'superseded', updated_at = now()
    WHERE production_id = (p->>'productionId')::uuid AND script_version = (p->>'scriptVersion')::int
      AND kind = p->>'kind' AND scene = (p->>'scene')::int AND status <> 'superseded' RETURNING 1)
  SELECT to_jsonb(count(*)) FROM u
$$;

CREATE OR REPLACE FUNCTION ella_api_steps_list(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT COALESCE(jsonb_agg(ella_step_json(s) ORDER BY s.kind, s.scene, s.attempt), '[]'::jsonb) FROM ella_steps s
  WHERE s.production_id = (p->>'productionId')::uuid AND s.script_version = (p->>'scriptVersion')::int
$$;

CREATE OR REPLACE FUNCTION ella_api_save_render(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  INSERT INTO ella_renders (production_id, version, script_version, video_path, edit_plan, captions, duration_sec, qa, qa_passed)
  VALUES ((p->>'productionId')::uuid,
    COALESCE((SELECT max(version) FROM ella_renders WHERE production_id = (p->>'productionId')::uuid), 0) + 1,
    (p->>'scriptVersion')::int, p->>'videoPath', p->'editPlan', p->'captions', (p->>'durationSec')::numeric,
    COALESCE(p->'qa', '[]'::jsonb), (p->>'qaPassed')::boolean)
  RETURNING to_jsonb(version)
$$;

-- Settings ────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION ella_api_settings_get(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT COALESCE(jsonb_object_agg(key, value), '{}'::jsonb) FROM ella_settings
  WHERE p->'keys' IS NULL OR key IN (SELECT jsonb_array_elements_text(p->'keys'))
$$;

CREATE OR REPLACE FUNCTION ella_api_settings_set(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  WITH u AS (INSERT INTO ella_settings (key, value, updated_at)
    SELECT e.key, e.value, now() FROM jsonb_each(p->'values') e
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now() RETURNING 1)
  SELECT to_jsonb(count(*)) FROM u
$$;

-- Productions by status (for the orchestrator) ──────────────────────────────
CREATE OR REPLACE FUNCTION ella_api_productions_in(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT COALESCE(jsonb_agg(jsonb_build_object('id', x.id, 'slug', x.slug, 'pillar', x.pillar, 'status', x.status,
    'scriptVersion', x.script_version, 'renderVersion', x.render_version, 'approvedAt', x.approved_at,
    'createdAt', x.created_at, 'updatedAt', x.updated_at) ORDER BY x.created_at), '[]'::jsonb)
  FROM ella_productions x WHERE x.status IN (SELECT jsonb_array_elements_text(p->'statuses'))
$$;

CREATE OR REPLACE FUNCTION ella_api_production(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT COALESCE((SELECT jsonb_build_object(
    'id', x.id, 'slug', x.slug, 'pillar', x.pillar, 'status', x.status, 'keyTerm', x.key_term,
    'hookType', x.hook_type, 'ctaType', x.cta_type, 'scriptVersion', x.script_version, 'renderVersion', x.render_version,
    'approvedAt', x.approved_at, 'note', x.jo_note, 'createdAt', x.created_at,
    'title', (SELECT title FROM ella_blog_registry b WHERE b.slug = x.slug),
    'script', (SELECT jsonb_build_object('version', s.version, 'script', s.script, 'issues', s.issues, 'passed', s.passed)
               FROM ella_scripts s WHERE s.production_id = x.id ORDER BY s.version DESC LIMIT 1),
    'render', (SELECT jsonb_build_object('version', r.version, 'scriptVersion', r.script_version, 'videoPath', r.video_path,
               'durationSec', r.duration_sec, 'qa', r.qa, 'qaPassed', r.qa_passed, 'captions', r.captions, 'createdAt', r.created_at)
               FROM ella_renders r WHERE r.production_id = x.id ORDER BY r.version DESC LIMIT 1),
    'posts', (SELECT COALESCE(jsonb_agg(jsonb_build_object('id', po.id, 'platform', po.platform, 'mode', po.mode,
               'status', po.status, 'scheduledAt', po.scheduled_at, 'publishedAt', po.published_at,
               'permalink', po.permalink, 'error', po.error)), '[]'::jsonb) FROM ella_posts po WHERE po.production_id = x.id),
    'spentUsd', (SELECT COALESCE(sum(cost_usd), 0) FROM ella_steps st WHERE st.production_id = x.id))
    FROM ella_productions x WHERE x.id = (p->>'id')::uuid), 'null'::jsonb)
$$;

-- Posts ───────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION ella_post_json(po ella_posts) RETURNS jsonb
LANGUAGE sql IMMUTABLE SET search_path = public, pg_temp AS $$
  SELECT jsonb_build_object('id', po.id, 'productionId', po.production_id, 'renderVersion', po.render_version,
    'platform', po.platform, 'mode', po.mode, 'status', po.status, 'scheduledAt', po.scheduled_at,
    'publishedAt', po.published_at, 'caption', po.caption, 'containerId', po.container_id,
    'providerPostId', po.provider_post_id, 'permalink', po.permalink, 'attempts', po.attempts, 'error', po.error)
$$;

CREATE OR REPLACE FUNCTION ella_api_post_upsert(p jsonb) RETURNS jsonb
LANGUAGE plpgsql SET search_path = public, pg_temp AS $$
DECLARE r ella_posts;
BEGIN
  INSERT INTO ella_posts (production_id, render_version, platform, mode, status, scheduled_at, caption)
  VALUES ((p->>'productionId')::uuid, (p->>'renderVersion')::int, p->>'platform', p->>'mode',
    COALESCE(p->>'status', 'scheduled'), (p->>'scheduledAt')::timestamptz, p->>'caption')
  ON CONFLICT (production_id, platform) DO UPDATE SET
    render_version = EXCLUDED.render_version, mode = EXCLUDED.mode, status = EXCLUDED.status,
    scheduled_at = EXCLUDED.scheduled_at, caption = EXCLUDED.caption, error = NULL, updated_at = now()
  WHERE ella_posts.status NOT IN ('published', 'publishing')
  RETURNING * INTO r;
  IF r.id IS NULL THEN
    SELECT * INTO r FROM ella_posts WHERE production_id = (p->>'productionId')::uuid AND platform = p->>'platform';
  END IF;
  RETURN ella_post_json(r);
END $$;

CREATE OR REPLACE FUNCTION ella_api_post_update(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  UPDATE ella_posts SET status = COALESCE(p->>'status', status),
    container_id = CASE WHEN (p->>'clearContainer')::boolean THEN NULL ELSE COALESCE(p->>'containerId', container_id) END,
    provider_post_id = COALESCE(p->>'providerPostId', provider_post_id),
    permalink = COALESCE(p->>'permalink', permalink),
    published_at = COALESCE((p->>'publishedAt')::timestamptz, published_at),
    scheduled_at = COALESCE((p->>'scheduledAt')::timestamptz, scheduled_at),
    attempts = attempts + COALESCE((p->>'addAttempt')::int, 0),
    error = CASE WHEN p ? 'error' THEN p->>'error' ELSE error END, updated_at = now()
  WHERE id = (p->>'id')::uuid RETURNING ella_post_json(ella_posts)
$$;

-- Claims posts to work on: scheduled and due, already handed to the platform
-- (polled until live), or stuck without a handle for 15 minutes.
CREATE OR REPLACE FUNCTION ella_api_posts_due(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  WITH due AS (
    SELECT id FROM ella_posts
    WHERE mode = 'auto' AND attempts < 5 AND (
         (status = 'scheduled' AND scheduled_at <= COALESCE((p->>'now')::timestamptz, now()))
      OR (status = 'publishing' AND container_id IS NOT NULL)
      OR (status = 'publishing' AND container_id IS NULL AND updated_at < COALESCE((p->>'now')::timestamptz, now()) - interval '15 minutes'))
    ORDER BY scheduled_at LIMIT COALESCE((p->>'limit')::int, 3) FOR UPDATE SKIP LOCKED),
  u AS (UPDATE ella_posts po SET status = 'publishing', updated_at = now() FROM due WHERE po.id = due.id RETURNING po.*)
  SELECT COALESCE(jsonb_agg(ella_post_json(u)), '[]'::jsonb) FROM u
$$;

-- One scheduler run at a time: takes the lock if free or older than p.staleSec.
CREATE OR REPLACE FUNCTION ella_api_lock(p jsonb) RETURNS jsonb
LANGUAGE plpgsql SET search_path = public, pg_temp AS $$
DECLARE got int;
BEGIN
  IF (p->>'release')::boolean THEN
    DELETE FROM ella_settings WHERE key = 'lock:' || (p->>'name') AND value->>'owner' = p->>'owner';
    RETURN to_jsonb(true);
  END IF;
  INSERT INTO ella_settings (key, value, updated_at)
  VALUES ('lock:' || (p->>'name'), jsonb_build_object('owner', p->>'owner'), now())
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
  WHERE ella_settings.updated_at < now() - make_interval(secs => COALESCE((p->>'staleSec')::int, 900));
  GET DIAGNOSTICS got = ROW_COUNT;
  RETURN to_jsonb(got = 1);
END $$;

CREATE OR REPLACE FUNCTION ella_api_posts_list(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT COALESCE(jsonb_agg(ella_post_json(po) || jsonb_build_object('slug', pr.slug, 'hookType', pr.hook_type,
    'ctaType', pr.cta_type, 'pillar', pr.pillar, 'title', b.title,
    'videoPath', (SELECT r.video_path FROM ella_renders r WHERE r.production_id = po.production_id AND r.version = po.render_version))
    ORDER BY po.scheduled_at DESC), '[]'::jsonb)
  FROM ella_posts po JOIN ella_productions pr ON pr.id = po.production_id
  LEFT JOIN ella_blog_registry b ON b.slug = pr.slug
  WHERE (p->'statuses' IS NULL OR po.status IN (SELECT jsonb_array_elements_text(p->'statuses')))
    AND (p->>'platform' IS NULL OR po.platform = p->>'platform')
$$;

-- Metrics ─────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION ella_api_metrics_due(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT COALESCE(jsonb_agg(jsonb_build_object('post', ella_post_json(po), 'checkpoint', c.cp)), '[]'::jsonb)
  FROM ella_posts po
  CROSS JOIN (VALUES ('1h', interval '1 hour'), ('24h', interval '24 hours'), ('72h', interval '72 hours'),
                     ('7d', interval '7 days'), ('28d', interval '28 days')) AS c(cp, age)
  WHERE po.status = 'published' AND po.provider_post_id IS NOT NULL
    AND po.published_at + c.age <= COALESCE((p->>'now')::timestamptz, now())
    AND po.published_at + c.age > COALESCE((p->>'now')::timestamptz, now()) - interval '3 days'
    AND NOT EXISTS (SELECT 1 FROM ella_metrics m WHERE m.post_id = po.id AND m.checkpoint = c.cp)
$$;

CREATE OR REPLACE FUNCTION ella_api_metrics_add(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  INSERT INTO ella_metrics (post_id, checkpoint, views, reach, likes, comments, shares, saves, avg_watch_ms, follows, raw)
  VALUES ((p->>'postId')::uuid, p->>'checkpoint', (p->>'views')::int, (p->>'reach')::int, (p->>'likes')::int,
    (p->>'comments')::int, (p->>'shares')::int, (p->>'saves')::int, (p->>'avgWatchMs')::int, (p->>'follows')::int,
    COALESCE(p->'raw', '{}'::jsonb))
  ON CONFLICT (post_id, checkpoint) DO NOTHING
  RETURNING to_jsonb(true)
$$;

-- The latest numbers per published post, with what the script tried.
CREATE OR REPLACE FUNCTION ella_api_performance(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT COALESCE(jsonb_agg(row ORDER BY (row->>'publishedAt') DESC), '[]'::jsonb) FROM (
    SELECT jsonb_build_object('postId', po.id, 'platform', po.platform, 'publishedAt', po.published_at,
      'permalink', po.permalink, 'slug', pr.slug, 'pillar', pr.pillar, 'hookType', pr.hook_type, 'ctaType', pr.cta_type,
      'keyTerm', pr.key_term, 'title', b.title,
      'hook', (SELECT s.script->'scenes'->0->>'voice' FROM ella_scripts s WHERE s.production_id = pr.id ORDER BY s.version DESC LIMIT 1),
      'checkpoint', m.checkpoint, 'views', m.views, 'reach', m.reach, 'likes', m.likes, 'comments', m.comments,
      'shares', m.shares, 'saves', m.saves, 'avgWatchMs', m.avg_watch_ms, 'follows', m.follows,
      'durationSec', (SELECT r.duration_sec FROM ella_renders r WHERE r.production_id = pr.id AND r.version = po.render_version)) AS row
    FROM ella_posts po JOIN ella_productions pr ON pr.id = po.production_id
    LEFT JOIN ella_blog_registry b ON b.slug = pr.slug
    LEFT JOIN LATERAL (SELECT * FROM ella_metrics m WHERE m.post_id = po.id ORDER BY m.captured_at DESC LIMIT 1) m ON true
    WHERE po.status = 'published'
    ORDER BY po.published_at DESC LIMIT COALESCE((p->>'limit')::int, 60)) t
$$;

-- Followers ───────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION ella_api_followers_add(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  INSERT INTO ella_followers (platform, day, followers) VALUES (p->>'platform', (p->>'day')::date, (p->>'followers')::int)
  ON CONFLICT (platform, day) DO UPDATE SET followers = EXCLUDED.followers RETURNING to_jsonb(true)
$$;

-- Paid promotion ──────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION ella_ad_json(a ella_ads) RETURNS jsonb
LANGUAGE sql IMMUTABLE SET search_path = public, pg_temp AS $$
  SELECT jsonb_build_object('id', a.id, 'postId', a.post_id, 'status', a.status, 'dailyBudgetAud', a.daily_budget_aud,
    'totalCapAud', a.total_cap_aud, 'maxCostPerConversationAud', a.max_cost_per_conversation_aud, 'days', a.days,
    'reason', a.reason, 'campaignId', a.campaign_id, 'adsetId', a.adset_id, 'creativeId', a.creative_id, 'adId', a.ad_id,
    'spendAud', a.spend_aud, 'conversations', a.conversations, 'impressions', a.impressions, 'approvedAt', a.approved_at,
    'startedAt', a.started_at, 'lastCheckedAt', a.last_checked_at, 'stopReason', a.stop_reason, 'error', a.error,
    'createdAt', a.created_at)
$$;

CREATE OR REPLACE FUNCTION ella_api_ad_propose(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  INSERT INTO ella_ads (post_id, daily_budget_aud, total_cap_aud, max_cost_per_conversation_aud, days, reason)
  VALUES ((p->>'postId')::uuid, (p->>'dailyBudgetAud')::numeric, (p->>'totalCapAud')::numeric,
    (p->>'maxCostPerConversationAud')::numeric, (p->>'days')::int, p->>'reason')
  ON CONFLICT DO NOTHING
  RETURNING ella_ad_json(ella_ads)
$$;

CREATE OR REPLACE FUNCTION ella_api_ad_update(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  UPDATE ella_ads SET status = COALESCE(p->>'status', status),
    campaign_id = COALESCE(p->>'campaignId', campaign_id), adset_id = COALESCE(p->>'adsetId', adset_id),
    creative_id = COALESCE(p->>'creativeId', creative_id), ad_id = COALESCE(p->>'adId', ad_id),
    spend_aud = COALESCE((p->>'spendAud')::numeric, spend_aud), conversations = COALESCE((p->>'conversations')::int, conversations),
    impressions = COALESCE((p->>'impressions')::int, impressions),
    approved_at = COALESCE((p->>'approvedAt')::timestamptz, approved_at),
    started_at = COALESCE((p->>'startedAt')::timestamptz, started_at),
    last_checked_at = COALESCE((p->>'lastCheckedAt')::timestamptz, last_checked_at),
    stop_reason = COALESCE(p->>'stopReason', stop_reason),
    error = CASE WHEN p ? 'error' THEN p->>'error' ELSE error END, updated_at = now()
  WHERE id = (p->>'id')::uuid
    AND (p->>'expectStatus' IS NULL OR status = p->>'expectStatus')
  RETURNING ella_ad_json(ella_ads)
$$;

CREATE OR REPLACE FUNCTION ella_api_ads_list(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT COALESCE(jsonb_agg(ella_ad_json(a) || jsonb_build_object('permalink', po.permalink, 'platform', po.platform,
    'providerPostId', po.provider_post_id, 'slug', pr.slug, 'title', b.title) ORDER BY a.created_at DESC), '[]'::jsonb)
  FROM ella_ads a JOIN ella_posts po ON po.id = a.post_id JOIN ella_productions pr ON pr.id = po.production_id
  LEFT JOIN ella_blog_registry b ON b.slug = pr.slug
  WHERE p->'statuses' IS NULL OR a.status IN (SELECT jsonb_array_elements_text(p->'statuses'))
$$;

-- Money: every cost Ella has caused, by period ──────────────────────────────
CREATE OR REPLACE FUNCTION ella_api_spend(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT jsonb_build_object(
    'videoUsdSince', (SELECT COALESCE(sum(cost_usd), 0) FROM ella_steps WHERE created_at >= (p->>'since')::timestamptz),
    'videoUsdTotal', (SELECT COALESCE(sum(cost_usd), 0) FROM ella_steps),
    'adsAudSince', (SELECT COALESCE(sum(spend_aud), 0) FROM ella_ads WHERE created_at >= (p->>'since')::timestamptz),
    'adsAudTotal', (SELECT COALESCE(sum(spend_aud), 0) FROM ella_ads),
    'aiCalls', (SELECT count(*) FROM ella_ai_usage WHERE at >= (p->>'since')::timestamptz))
$$;

-- Everything the Atlas screen needs in one call ─────────────────────────────
CREATE OR REPLACE FUNCTION ella_api_dashboard(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT jsonb_build_object(
    'counts', (SELECT COALESCE(jsonb_object_agg(status, n), '{}'::jsonb) FROM (SELECT status, count(*) n FROM ella_productions GROUP BY status) c),
    'library', jsonb_build_object(
      'total', (SELECT count(*) FROM ella_blog_registry WHERE in_library AND NOT excluded),
      'used', (SELECT count(*) FROM ella_slug_claims)),
    'queue', (SELECT COALESCE(jsonb_agg(jsonb_build_object('id', x.id, 'slug', x.slug, 'title', b.title, 'pillar', x.pillar,
               'status', x.status, 'hookType', x.hook_type, 'ctaType', x.cta_type, 'updatedAt', x.updated_at) ORDER BY x.updated_at DESC), '[]'::jsonb)
               FROM ella_productions x LEFT JOIN ella_blog_registry b ON b.slug = x.slug
               WHERE x.status IN ('drawn', 'scripting', 'script_ready', 'needs_jo', 'approved', 'producing', 'video_ready', 'video_needs_jo', 'scheduled')),
    'alerts', (SELECT COALESCE(jsonb_agg(jsonb_build_object('id', id, 'kind', kind, 'message', message, 'createdAt', created_at) ORDER BY created_at DESC), '[]'::jsonb)
               FROM ella_alerts WHERE resolved_at IS NULL),
    'followers', (SELECT COALESCE(jsonb_agg(jsonb_build_object('platform', platform, 'day', day, 'followers', followers) ORDER BY day), '[]'::jsonb)
               FROM ella_followers WHERE day >= current_date - 200),
    'recentAudit', (SELECT COALESCE(jsonb_agg(jsonb_build_object('at', at, 'actor', actor, 'action', action, 'detail', detail) ORDER BY at DESC), '[]'::jsonb)
               FROM (SELECT * FROM ella_audit ORDER BY at DESC LIMIT 25) a))
$$;

-- ── Lockdown: RLS on, nothing for anon and authenticated ───────────────────
ALTER TABLE ella_blog_registry  ENABLE ROW LEVEL SECURITY;
ALTER TABLE ella_productions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE ella_slug_claims    ENABLE ROW LEVEL SECURITY;
ALTER TABLE ella_scripts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE ella_alerts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE ella_audit          ENABLE ROW LEVEL SECURITY;
ALTER TABLE ella_ai_usage       ENABLE ROW LEVEL SECURITY;
ALTER TABLE ella_steps          ENABLE ROW LEVEL SECURITY;
ALTER TABLE ella_renders        ENABLE ROW LEVEL SECURITY;
ALTER TABLE ella_settings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE ella_posts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE ella_metrics        ENABLE ROW LEVEL SECURITY;
ALTER TABLE ella_ads            ENABLE ROW LEVEL SECURITY;
ALTER TABLE ella_followers      ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE t text; f record;
BEGIN
  FOREACH t IN ARRAY ARRAY['ella_blog_registry', 'ella_productions', 'ella_slug_claims', 'ella_scripts', 'ella_alerts',
    'ella_audit', 'ella_ai_usage', 'ella_steps', 'ella_renders', 'ella_settings', 'ella_posts', 'ella_metrics',
    'ella_ads', 'ella_followers'] LOOP
    EXECUTE format('REVOKE ALL ON %I FROM anon, authenticated', t);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON %I TO service_role', t);
  END LOOP;
  FOR f IN SELECT p.oid::regprocedure AS sig FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
           WHERE n.nspname = 'public' AND p.proname LIKE 'ella\_%' LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated', f.sig);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', f.sig);
  END LOOP;
END $$;
GRANT USAGE, SELECT ON SEQUENCE ella_alerts_id_seq, ella_audit_id_seq, ella_ai_usage_id_seq,
  ella_metrics_id_seq, ella_followers_id_seq TO service_role;

-- Tell the Supabase API to pick up the new functions at once.
NOTIFY pgrst, 'reload schema';
