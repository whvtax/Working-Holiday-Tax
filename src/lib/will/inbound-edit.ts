// ============================================================
// A customer editing a message they already sent.
//
// WHAT WAS HAPPENING
//   When someone corrects a typo, Meta delivers `type: 'edit'` and nothing
//   else: no text, no media. It fell through to the generic "no readable text"
//   stand-in, so ONE corrected word produced a
//   "📎 [Message - open WhatsApp to view]" bubble in the middle of the thread
//   AND a task for a person to go and look at.
//
//   Seen twice before it was understood — リョウタ correcting "I work" to
//   "I worked", and Jp correcting "Xeros" to "Xero" — and confirmed when the
//   type itself reached a Decision Log card on 27 Aug. Typo corrections are
//   common, and most of these customers are writing in a second language, so
//   this was a steady drip of phantom bubbles and invented work.
//
// WHAT META ACTUALLY GIVES US, AND WHAT IT DOES NOT
//   It tells us WHICH message was edited (`context.id`). It does NOT tell us
//   what the new wording is. That is a platform limitation and there is no way
//   around it from here, so the message is marked as edited and its stored text
//   is left exactly as the customer first typed it. Overwriting it with a guess
//   would corrupt the one record that is supposed to be what they really said.
//
//   The chat shows an "Edited" mark on the bubble, the same as WhatsApp, which
//   is how the owner knows the wording on their phone is the newer one.
//
// WHY THIS IS NOT IN THE WEBHOOK ROUTE
//   Next.js validates route files against a fixed set of allowed exports and
//   fails the build on anything else, so nothing in there can be imported by a
//   test. This is the part worth testing, so this is where it lives.
// ============================================================
import { getStore } from './store';

/** The shape of an inbound message, narrowed to what an edit needs. */
export interface EditableWaMessage {
  id?: string;
  from?: string;
  type?: string;
  text?: { body?: string };
  /** On an edit, the message being edited. Also present on an ordinary REPLY,
   *  which is why `context` alone never means "edit" — only the type does. */
  context?: { id?: string; from?: string };
  /** Where the new wording WOULD live if Meta sent it. */
  edit?: { body?: string; text?: { body?: string } };
  edited_message?: { text?: { body?: string } };
}

export interface InboundEdit {
  /** Meta's id of the message being edited, or null when it did not say. */
  targetProviderId: string | null;
  /** The new wording, or null — which is what Meta sends today. */
  newText: string | null;
}

/** Only the declared type may decide this. A reply carries `context` too. */
export const isEditMessage = (m: EditableWaMessage): boolean => m.type === 'edit';

/**
 * The new wording of an edited message, if Meta sent it.
 *
 * Returns null in practice today. It is still written to look in every
 * plausible field, because the cost is four lines and the alternative is that
 * the day Meta starts including the text, nobody notices for a year.
 */
export function editedTextOf(m: EditableWaMessage): string | null {
  const candidates = [m.text?.body, m.edit?.body, m.edit?.text?.body, m.edited_message?.text?.body];
  const found = candidates.find((v) => typeof v === 'string' && v.trim());
  return typeof found === 'string' ? found : null;
}

export function editFrom(m: EditableWaMessage): InboundEdit {
  return { targetProviderId: m.context?.id ?? null, newText: editedTextOf(m) };
}

/**
 * Apply the edits in one delivery.
 *
 * Best-effort and deliberately quiet: an edit is a correction, not an event
 * anyone needs to be told about. It must never fail the delivery, and it must
 * never leave anything behind on the board.
 */
export async function applyInboundEdits(
  edits: { messageId?: string; from?: string; edit: InboundEdit }[],
  maskWa: (n: string) => string = (n) => n,
): Promise<void> {
  const store = getStore();
  for (const item of edits) {
    try {
      if (!item.edit.targetProviderId) {
        // No id to attach it to. Recorded rather than acted on — inventing a
        // target would rewrite the wrong message in someone's history.
        await store.audit('channel', 'inbound_edit_unmatched', {
          id: item.messageId ?? null,
          from: item.from ? maskWa(item.from) : null,
          reason: 'no context id',
        });
        continue;
      }
      const applied = await store.applyEditByProviderId(item.edit.targetProviderId, item.edit.newText);
      await store.audit('channel', applied ? 'inbound_edit_applied' : 'inbound_edit_unmatched', {
        id: item.messageId ?? null,
        from: item.from ? maskWa(item.from) : null,
        target: item.edit.targetProviderId,
        // The interesting bit for later: whether Meta has started sending the
        // new wording. Today it does not, and the message is only marked edited.
        hadNewText: !!item.edit.newText,
      });
    } catch {
      // An edit must never take a delivery down. Meta would redeliver the whole
      // payload, and the real messages in it would be reprocessed for the sake
      // of a corrected typo.
    }
  }
}
