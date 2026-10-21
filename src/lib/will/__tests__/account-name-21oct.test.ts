/**
 * 21 Oct: "What's the name connected to this account?" was answered by the model
 * with "Simple Tax Services. Yes, those are the right details". The question was
 * not recognised as an account-name question, and the guard missed the reply.
 */
import { isAccountNameQuestion, namesAccountWrongly } from '@/lib/will/account-name';

describe('account-name question wording', () => {
  it('"name connected to this account" is an account-name question', () => {
    expect(isAccountNameQuestion("What's the name connected to this account?")).toBe(true);
  });
  it('"name linked to the account" is an account-name question', () => {
    expect(isAccountNameQuestion('What name is linked to the account?')).toBe(true);
  });
  it('an unrelated question about the customer\'s own name is not', () => {
    expect(isAccountNameQuestion('What is your name?')).toBe(false);
  });
});

describe('a reply that names the old account is refused', () => {
  it('"Simple Tax Services / Yes, those are the right details" is refused', () => {
    expect(namesAccountWrongly('Simple Tax Services\n\nYes, those are the right details')).toBe(true);
  });
  it('the correct name is accepted', () => {
    expect(namesAccountWrongly('The account name is The Accounting Academy.\n\nBSB: 062692\nAccount: 81049952')).toBe(false);
  });
  it('a reply about the old name that does not name a payment account is not refused', () => {
    expect(namesAccountWrongly('Simple Tax Services is an old name; you don\'t need to use it.')).toBe(false);
  });
});
