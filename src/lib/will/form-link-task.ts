// Pure helpers for the unmatched-questionnaire task's context text.
//
// Split out of form-link.ts (audit, 5 Sep): form-link.ts imports getStore
// (./store, which pulls in store-file.ts and `fs`) at module scope, so any
// client component importing anything from it — even a function that itself
// touches no store — dragged Node's `fs` into the browser bundle and broke
// the build. LinkFormTask.tsx (the "Link to chat" control) only ever needs
// parseUnmatchedFormTask, which has never touched the store, so it lives
// here instead. form-link.ts re-exports both names, so every existing
// server-side import keeps working unchanged.
export function unmatchedFormTaskContext(waNumber: string, email?: string | null, hasMedicare?: string | null): string {
  const medicare = typeof hasMedicare === 'string' && hasMedicare.trim()
    ? ` Medicare answer: "${hasMedicare.trim().replace(/"/g, '')}".`
    : '';
  return `The website questionnaire was submitted with the phone number "${waNumber}"${email ? ` and the email ${email}` : ''}, and no WhatsApp customer has that number.${medicare} Use Link to chat below to pick the right chat: Will then marks the form complete, stops the form reminders and sends the confirmation, exactly as if the number had matched.`;
}

/** Read the submission back out of an unmatched-questionnaire task. Null for
 *  any other task, so the CRM only offers "Link to chat" where it applies. */
export function parseUnmatchedFormTask(context: string | null | undefined): { waNumber: string; email: string | null; hasMedicare: string | null } | null {
  if (!context) return null;
  const m = context.match(/^The website questionnaire was submitted with the phone number "([^"]+)"(?: and the email (\S+))?, and no WhatsApp customer has that number\./);
  if (!m) return null;
  const med = context.match(/Medicare answer: "([^"]*)"/);
  return { waNumber: m[1], email: m[2] ?? null, hasMedicare: med ? med[1] : null };
}
