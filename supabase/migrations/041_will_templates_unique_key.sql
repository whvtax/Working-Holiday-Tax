-- (audit, 5 Sep) will_templates.key had no unique index. Two paths could each
-- insert a second row for the same key (a stray seed re-run over a "looked
-- empty" read, or two backfill ticks racing after a TEMPLATE_BACKFILL_VERSION
-- bump). Once duplicated, the Library showed two identical cards and the live
-- prompt (built ordered by updated_at DESC, last one wins on a key clash)
-- could use the OLDER, unedited copy even after the operator edited the other
-- one and saw "Saved". De-duplicate by key, keeping the most recently updated
-- row, then make a repeat impossible.

DELETE FROM will_templates a
USING will_templates b
WHERE a.key = b.key
  AND a.key <> ''
  AND (a.updated_at, a.id) < (b.updated_at, b.id);

CREATE UNIQUE INDEX IF NOT EXISTS will_templates_key_uq
  ON will_templates (key)
  WHERE key <> '';
