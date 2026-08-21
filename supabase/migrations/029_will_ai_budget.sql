-- ════════════════════════════════════════════════════════════════════════════
-- 029 — Atomic daily AI spend counter
--
-- WHY THIS EXISTS
--   aiBudgetExhausted() in src/lib/will/service.ts was a read-modify-write:
--
--       const used = Number(await store.getSetting(key) ?? 0);
--       if (used >= budget) return true;
--       await store.setSetting(key, used + 1);
--
--   getSetting/setSetting are a plain SELECT then an upsert -- no row lock, no
--   transaction. The per-customer mutex in service.ts serialises one waId inside
--   ONE process; concurrent senders and every additional serverless instance all
--   read the same `used` and all write `used + 1`. Under N-way concurrency the
--   counter advanced by ~1 instead of N, so the daily cap was not a spend cap at
--   all -- only a backstop against slow, serial runaway.
--
--   That matters because the path it guards is reachable by anyone who sends a
--   WhatsApp message to the business number: every inbound message is a paid
--   Anthropic call.
--
--   This function does the check and the increment in a single statement, so
--   the limit holds no matter how many instances are running.
--
-- CONTRACT
--   Returns TRUE  -> budget already spent, caller must NOT make the paid call.
--   Returns FALSE -> a slot was reserved (counter incremented), caller may proceed.
--
-- SAFE TO RUN MORE THAN ONCE.
-- ════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION will_bump_counter(p_key text, p_limit integer)
RETURNS boolean
LANGUAGE plpgsql
-- Explicit search_path: this function is called with the service role, and
-- pinning the schema stops a shadowed relation from changing what it touches.
SET search_path = public, pg_temp
AS $$
DECLARE
  v_new integer;
BEGIN
  -- One statement. The INSERT ... ON CONFLICT DO UPDATE takes a row lock, so
  -- concurrent callers serialise on it and each gets a distinct value back.
  INSERT INTO will_settings (key, value)
  VALUES (p_key, to_jsonb(1))
  ON CONFLICT (key) DO UPDATE
    SET value = to_jsonb(COALESCE(NULLIF(will_settings.value::text, 'null')::integer, 0) + 1)
  RETURNING NULLIF(value::text, 'null')::integer INTO v_new;

  -- v_new is this caller's own slot number. Over the limit means the slot we
  -- just took is not allowed to be used.
  IF v_new > p_limit THEN
    RETURN true;   -- exhausted
  END IF;
  RETURN false;    -- proceed
END $$;
