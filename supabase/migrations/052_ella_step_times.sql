-- Ella: each step now carries its start and last-update time, so the history shows how long every step took.
-- Replaces only the JSON shape of a step; the table and every other function are unchanged.
CREATE OR REPLACE FUNCTION ella_step_json(s ella_steps) RETURNS jsonb
LANGUAGE sql IMMUTABLE SET search_path = public, pg_temp AS $$
  SELECT jsonb_build_object('id', s.id, 'productionId', s.production_id, 'scriptVersion', s.script_version,
    'kind', s.kind, 'scene', s.scene, 'attempt', s.attempt, 'status', s.status, 'providerJobId', s.provider_job_id,
    'idempotencyKey', s.idempotency_key, 'input', s.input, 'output', s.output, 'costUsd', s.cost_usd, 'error', s.error,
    'createdAt', s.created_at, 'updatedAt', s.updated_at)
$$;
