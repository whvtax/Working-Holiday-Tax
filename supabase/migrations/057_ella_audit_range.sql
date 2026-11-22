-- Ella, Nov 22: the Learning tab's "Starts with no video" reports read the log lines of one Start
-- (from that Start to the next one), oldest first. Run after 051-056. Service role only.
CREATE INDEX IF NOT EXISTS ella_audit_at_idx ON ella_audit (at);

CREATE OR REPLACE FUNCTION ella_api_audit_range(p jsonb) RETURNS jsonb
LANGUAGE sql SET search_path = public, pg_temp AS $$
  SELECT COALESCE(jsonb_agg(to_jsonb(a) ORDER BY a.at, a.id), '[]'::jsonb)
  FROM (
    SELECT id, at, actor, action, detail FROM ella_audit
    WHERE at >= (p->>'from')::timestamptz
      AND (p->>'to' IS NULL OR at < (p->>'to')::timestamptz)
      AND (p->'actions' IS NULL OR action = ANY (ARRAY(SELECT jsonb_array_elements_text(p->'actions'))))
    ORDER BY at, id
    LIMIT LEAST(GREATEST(COALESCE((p->>'limit')::int, 5000), 1), 20000)
  ) a
$$;

REVOKE ALL ON FUNCTION ella_api_audit_range(jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION ella_api_audit_range(jsonb) TO service_role;
