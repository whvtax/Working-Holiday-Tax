-- Ella: start-over follow-up. (1) Start over now deletes library-empty alerts, so the next exhaustion
-- is announced again (the dedupe key would otherwise stay blocked). (2) Only the service role may run it:
-- no public, anon or authenticated access to the claims table through this function.
CREATE OR REPLACE FUNCTION ella_api_start_over_blogs(p jsonb) RETURNS jsonb
LANGUAGE plpgsql SET search_path = public, pg_temp AS $$
DECLARE n integer;
BEGIN
  DELETE FROM ella_slug_claims c
  USING ella_productions pr
  WHERE pr.id = c.production_id
    AND pr.status NOT IN ('drawn', 'scripting', 'script_ready', 'needs_jo', 'approved', 'producing',
                          'video_ready', 'video_needs_jo', 'scheduled');
  GET DIAGNOSTICS n = ROW_COUNT;
  DELETE FROM ella_alerts WHERE kind = 'library_empty';
  INSERT INTO ella_audit (actor, action, detail)
    VALUES (COALESCE(p->>'actor', 'jo'), 'start_over_blogs', jsonb_build_object('released', n));
  RETURN jsonb_build_object('released', n);
END
$$;

REVOKE ALL ON FUNCTION ella_api_start_over_blogs(jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION ella_api_start_over_blogs(jsonb) TO service_role;
