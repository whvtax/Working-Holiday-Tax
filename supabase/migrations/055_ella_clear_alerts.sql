-- Ella, Nov 22: "reset everything" clears every open alert (notifications) in one step.
-- Run after 051-054. Service role only, like every other Ella function.
CREATE OR REPLACE FUNCTION ella_api_clear_alerts(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  WITH u AS (UPDATE ella_alerts SET resolved_at = now() WHERE resolved_at IS NULL RETURNING 1)
  SELECT to_jsonb(count(*)) FROM u
$$;

REVOKE ALL ON FUNCTION ella_api_clear_alerts(jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION ella_api_clear_alerts(jsonb) TO service_role;
