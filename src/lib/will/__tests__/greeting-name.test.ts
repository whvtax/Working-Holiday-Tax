import { cleanFirstName, nameFromText, greetingName } from '../text-normalize';
import { APPROVED } from '../approved-messages';

describe('cleanFirstName — only a real, presentable first name survives', () => {
  it('accepts plain first names and title-cases all-lower/all-upper input', () => {
    expect(cleanFirstName('Sarah')).toBe('Sarah');
    expect(cleanFirstName('sarah')).toBe('Sarah');
    expect(cleanFirstName('SARAH')).toBe('Sarah');
    expect(cleanFirstName('Daniel Haas')).toBe('Daniel'); // first word only
  });

  it('keeps mixed-case names as typed', () => {
    expect(cleanFirstName('McDonald')).toBe('McDonald');
  });

  it('strips emoji and punctuation from the edges', () => {
    expect(cleanFirstName('🎉 Sarah')).toBe('Sarah');
    expect(cleanFirstName('"Tom"')).toBe('Tom');
  });

  it('rejects emoji-only, digits, handles, and filler words', () => {
    expect(cleanFirstName('🎉')).toBe('');
    expect(cleanFirstName('😊😊')).toBe('');
    expect(cleanFirstName('12345')).toBe('');
    expect(cleanFirstName('xX_Dave_Xx')).toBe('');
    expect(cleanFirstName('+61412345678')).toBe('');
    expect(cleanFirstName('')).toBe('');
    expect(cleanFirstName(null)).toBe('');
    expect(cleanFirstName('hi')).toBe('');
    expect(cleanFirstName('WhatsApp')).toBe('');
  });
});

describe('nameFromText — a name the customer stated in their message', () => {
  it('reads "my name is" / "this is"', () => {
    expect(nameFromText('Hi, my name is Sarah and I need help')).toBe('Sarah');
    expect(nameFromText('this is Tom, interested in more info')).toBe('Tom');
  });

  it('reads "I\'m Name" only when capitalised', () => {
    expect(nameFromText("Hey I'm Dave")).toBe('Dave');
  });

  it('never mistakes "I\'m interested" / "I\'m from Germany" for a name', () => {
    expect(nameFromText("hey! im interested in more information :-)")).toBe('');
    expect(nameFromText("I'm from Germany")).toBe('');
    expect(nameFromText("I'm looking for help with tax")).toBe('');
  });

  it('is empty when nothing looks like a stated name', () => {
    expect(nameFromText('hi, how much does it cost?')).toBe('');
    expect(nameFromText('')).toBe('');
  });
});

describe('greetingName — profile first, then the message, else plain', () => {
  it('prefers a clean profile name', () => {
    expect(greetingName('Sarah Miller', "I'm Dave")).toBe('Sarah');
  });

  it('falls back to a name stated in the message when the profile is unusable', () => {
    expect(greetingName('🎉', 'Hi, my name is Dave')).toBe('Dave');
    expect(greetingName('', "Hey I'm Tom")).toBe('Tom');
  });

  it('is empty (plain "Hey!") when neither gives a clean name', () => {
    expect(greetingName('😊', 'hey! im interested in more information :-)')).toBe('');
    expect(greetingName(null, 'how much is it?')).toBe('');
  });
});

describe('the menu opening', () => {
  it('starts with a plain "Hey!" the name slots into, and shows both tracks', () => {
    expect(APPROVED.opening.startsWith('Hey!')).toBe(true);
    expect(APPROVED.opening).toContain('TFN: $220');
    expect(APPROVED.opening).toContain('TFN + ABN: $385');
    expect(APPROVED.opening).toContain('Which option suits you?');
  });

  it('keeps its paragraph breaks (blank lines between blocks)', () => {
    // WhatsApp renders blank lines as separate blocks; the owner asked for the
    // message to stay divided into paragraphs (Jo, 3 Sep).
    expect(APPROVED.opening.split('\n\n').length).toBeGreaterThanOrEqual(5);
  });

  it('has no dashes', () => {
    expect(APPROVED.opening).not.toMatch(/[—–]|\s-\s/);
  });
});
