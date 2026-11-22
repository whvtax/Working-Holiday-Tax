-- Ella, Nov 22: the Log tab reads the whole audit trail (every action, tick, step and studio stage), newest first.
-- Run after 051-055. Service role only, like every other Ella function.
CREATE OR REPLACE FUNCTION ella_api_audit_list(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT COALESCE(jsonb_agg(to_jsonb(a) ORDER BY a.at DESC, a.id DESC), '[]'::jsonb)
  FROM (
    SELECT id, at, actor, action, detail FROM ella_audit
    ORDER BY at DESC, id DESC
    LIMIT LEAST(GREATEST(COALESCE((p->>'limit')::int, 300), 1), 1000)
  ) a
$$;

REVOKE ALL ON FUNCTION ella_api_audit_list(jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION ella_api_audit_list(jsonb) TO service_role;
