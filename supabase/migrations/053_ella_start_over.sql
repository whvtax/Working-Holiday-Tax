-- Ella: "Start over" for blogs. When every blog has been used, Jo can put the finished ones back
-- into the draw. Only claims of productions that are no longer open are released; open work is untouched.
-- Adds one function and changes nothing else.
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
  UPDATE ella_alerts SET resolved_at = now() WHERE kind = 'library_empty' AND resolved_at IS NULL;
  INSERT INTO ella_audit (actor, action, detail)
    VALUES (COALESCE(p->>'actor', 'jo'), 'start_over_blogs', jsonb_build_object('released', n));
  RETURN jsonb_build_object('released', n);
END
$$;
