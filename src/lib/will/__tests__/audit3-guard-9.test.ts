/**
 * Audit 3 (5 Sep), guard finding 9: the playbook's myGov reply is
 * "reassurance, then the next step for their stage". The next step is OUR form,
 * link or option ("submit the form", "open the link", "choose which option
 * suits you"), and those verbs are also portal walkthrough verbs, so the whole
 * mandated reply was refused as MYGOV_TROUBLESHOOTING and became an URGENT
 * task. The same family was refused as SENSITIVE_CONTENT when it said "you
 * won't need your myGov password", although the customer's problem is literally
 * a password.
 *
 * The second half of each block matters as much as the first: every real
 * walkthrough and every real credential leak the older tests pin still fires.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';

function ctx(over: Partial<GuardContext> = {}): GuardContext {
  return {
    state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false,
    optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
    isApprovedTemplate: false, estimateFromTeam: null, ...over,
  };
}
const has = (text: string, code: string) =>
  policyGuard(text, ctx()).violations.some((x) => x === code || x.startsWith(code));

describe('reassurance followed by OUR next step is not myGov troubleshooting', () => {
  it.each([
    "You won't need your myGov at all, we handle it with the ATO. Just submit the form and we take it from there.",
    'No stress about myGov, we deal with the ATO directly. Just open the link and fill in the form',
    "You don't need myGov for any of this, we sort it with the ATO. Just choose which option suits you",
    'Leave the ATO side to us. Just enter your details in the form',
    'We never need your myGov login. Select the option that suits you and complete the questionnaire.',
    'You do not need to log in to myGov, we access it all through the ATO. Just pick whichever option suits you and enter your payment details on the form.',
  ])('sends: %p', (t) => {
    expect(has(t, 'MYGOV_TROUBLESHOOTING')).toBe(false);
  });

  it.each([
    // the pinned split-sentence bypass: the last clause names the ATO
    'No stress about myGov. Open the app, tap Services, then select Australian Taxation Office and enter your TFN to link it.',
    // our verbs with a portal object are still a portal step
    'Leave the ATO side to us, but if you want to check, open the app and log in to myGov.',
    "You don't need to do much, just go to my.gov.au and click Link a service.",
    'No stress about myGov. Select the option Australian Taxation Office.',
    'Submit the form, then select Link a service and enter your TFN in myGov.',
    'Just submit the Medicare Entitlement Statement in myGov and try logging in again.',
    'Open the link in the myGov email and reset your password.',
  ])('still blocks: %p', (t) => {
    expect(has(t, 'MYGOV_TROUBLESHOOTING')).toBe(true);
  });
});

describe('the negated myGov password reassurance is not a credential leak', () => {
  it.each([
    "you won't need your myGov password at all, we deal with the ATO directly",
    'We never need your myGov login or credentials.',
    "You don't need to give us your ATO password, we access everything through our agent portal.",
    'No need for your myGov password, leave that side to us.',
    'We will never ask for your myGov password.',
  ])('sends: %p', (t) => {
    expect(has(t, 'SENSITIVE_CONTENT')).toBe(false);
  });

  it.each([
    'Your myGov password is hunter2, use that to log in.',
    'Just reset your myGov password and log back in.',
    'For the ATO portal, here is the API key: sk_live_abc123.',
    "We don't need your myGov password. The admin panel password is hunter2.",
    // no myGov/ATO term: the carve-out does not apply at all
    "You won't need your password for this.",
  ])('still blocks: %p', (t) => {
    expect(has(t, 'SENSITIVE_CONTENT')).toBe(true);
  });
});
