/** Jo, 18 Nov (language and culture reviews): the name is the right word for the language,
 *  and with no usable name there is no name at all (never "there", never お客様). */
import { firstNameOf, fillNameSlot, greetingName as greetingNameText } from '../text-normalize';
import { greetingName } from '../scheduler';
import { withGreetingName, openingMessage } from '../approved-messages';
import { residencyCheckMessage, followUpMessage } from '../i18n';
import { refundCheckinMessage } from '../review-asks';
import type { CustomerRow } from '../store';

const cust = (name: string | null, lang: string) => ({ id: 'c', waId: '61400000000', name, lang } as unknown as CustomerRow);

describe('Vietnamese greets with the given name, the last word', () => {
  it('Nguyễn Văn An is An, Nguyen Thi Lan is Lan', () => {
    expect(firstNameOf('Nguyễn Văn An', 'vi')).toBe('An');
    expect(greetingName(cust('Nguyen Thi Lan', 'vi'))).toBe('Lan');
    expect(greetingNameText('Trần Minh Thư', '', 'vi')).toBe('Thư');
  });
  it('a single word stays as it is', () => {
    expect(greetingName(cust('Linh', 'vi'))).toBe('Linh');
  });
  it('other languages keep the first word', () => {
    expect(greetingName(cust('Sarah Miller', 'en'))).toBe('Sarah');
    expect(firstNameOf('Nguyen Lan', 'en')).toBe('Nguyen');
  });
});

describe('Chinese in Latin letters with a family name first gets no name', () => {
  it('Wang Xiaoming, Chan Tai Man, Lee Mei: no name', () => {
    expect(firstNameOf('Wang Xiaoming', 'zh')).toBe('');
    expect(greetingName(cust('Chan Tai Man', 'zh'))).toBe('');
    expect(greetingName(cust('Lee Mei', 'zh'))).toBe('');
  });
  it('a given name first, a single word, or Chinese script keep the name', () => {
    expect(greetingName(cust('Xiaoming Wang', 'zh'))).toBe('Xiaoming');
    expect(greetingName(cust('Mei', 'zh'))).toBe('Mei');
    expect(greetingName(cust('王小明', 'zh'))).toBe('王小明');
  });
});

describe('no usable name, no name at all', () => {
  it('greetingName is empty, never "there"', () => {
    expect(greetingName(cust(null, 'en'))).toBe('');
    expect(greetingName(cust('🌸', 'ja'))).toBe('');
    expect(greetingName(cust('+61 412 345 678', 'de'))).toBe('');
  });
  it('the name slot goes away cleanly in every language', () => {
    expect(fillNameSlot('Hi {{1}}😊\nDid the transfer go through on your end?', '')).toBe('Hi😊\nDid the transfer go through on your end?');
    expect(fillNameSlot('Hola, {{1}}😊', '')).toBe('Hola😊');
    expect(fillNameSlot('こんにちは、{{1}}さん😊', '')).toBe('こんにちは😊');
    expect(fillNameSlot('嗨 {{1}}！😊', '')).toBe('嗨！😊');
    expect(fillNameSlot('Chào {{1}}😊', '')).toBe('Chào bạn😊');
    expect(fillNameSlot('Salut {{1}}😊', '')).toBe('Salut😊');
    expect(fillNameSlot('Hi {{1}}😊', 'Sam')).toBe('Hi Sam😊');
  });
  it('the refund check-in and follow-ups carry no stand-in word', () => {
    for (const l of ['en', 'de', 'ja', 'es', 'fr', 'it', 'pt', 'zh', 'vi']) {
      const t = refundCheckinMessage(l, '');
      expect(t).not.toMatch(/there|お客様|\{\{1\}\}/);
      const f = followUpMessage('fu_price_sent', l);
      if (f) expect(fillNameSlot(f, '')).not.toMatch(/there|お客様|\{\{1\}\}/);
    }
  });
  it('the residency check never says "there"', () => {
    for (const l of ['en', 'de', 'ja', 'es', 'fr', 'it', 'pt', 'zh', 'vi']) {
      expect(residencyCheckMessage(l, '')).not.toMatch(/\bthere\b|\{\{1\}\}/);
    }
  });
});

describe('Spanish writes the vocative comma', () => {
  it('¡Hola, Ana!', () => {
    expect(openingMessage('es', 'Ana').split('\n')[0]).toBe('¡Hola, Ana! Con gusto te ayudo😊');
    expect(openingMessage('es', '').split('\n')[0]).toBe('¡Hola! Con gusto te ayudo😊');
  });
  it('the other languages are unchanged', () => {
    expect(withGreetingName('Hey! Happy to help😊', 'Sam')).toBe('Hey Sam! Happy to help😊');
    expect(openingMessage('vi', 'An').startsWith('Chào An!')).toBe(true);
  });
});
