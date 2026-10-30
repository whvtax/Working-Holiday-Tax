import { buildSystemPrompt } from '@/lib/will/playbook';
// Jo, 29 Oct (Kris): the rule that stops the "message you in two weeks" loop must be in the prompt.
it('the playbook forbids the myGov / two-weeks loop after lodgement', () => {
  const ctx = { name: 'Kris', state: 'DONE', income: 'TFN_ABN', paid: true, formComplete: true, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [] } as never;
  const { stable } = buildSystemPrompt(ctx);
  // 30 Oct (Jo): Will answers directly; a task for Jo only when the email did not arrive.
  expect(stable).toContain('A CUSTOMER WHO OWES TAX');
  expect(stable).toContain('within 14 days of lodging they receive an email from the ATO');
  expect(stable).toContain('there is no task for Jo up front');
  expect(stable).toContain('THE CUSTOMER SAYS THE EMAIL DID NOT ARRIVE');
  expect(stable).toContain('human_task for Jo to send the payment details');
  expect(stable).toContain('we\'ll message you in about two weeks" (retired)');
});
