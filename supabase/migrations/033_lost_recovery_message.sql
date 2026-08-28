-- ============================================================
-- The win-back message, stored with the post-mortem that produced it.
--
-- WHY (Jo, 28 Aug). The report already said whether a lost lead could still be
-- recovered and, in a sentence, what to do about it. That sentence was advice,
-- and advice still leaves the owner with a blank message box to fill at the
-- exact moment his attention is somewhere else. So the assessment now also
-- writes the message itself, to this conversation, in this person's language.
--
-- NOTHING SENDS FROM HERE. Pressing the button on the card raises an ordinary
-- task in Will with this text as its suggested reply. It reaches a customer
-- only when a person reads it and presses send, through the same policy guard
-- as every other outbound message.
--
-- Nullable, because a lead assessed as NO must not carry one, and because every
-- row written before today has none. Those rows keep their existing assessment
-- and simply have no message until they are re-analysed.
-- ============================================================
ALTER TABLE will_lost_analysis
  ADD COLUMN IF NOT EXISTS recovery_message TEXT;
