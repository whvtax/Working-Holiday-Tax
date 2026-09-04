/**
 * Language must not drift on a stray word (Jo, 31 Aug).
 *
 * FOUND IN PRODUCTION (+61 472 724 880): the whole chat was in English, yet Will
 * drafted a reply in Spanish. The cause was the language detector: it fired on a
 * SINGLE keyword and the code stored whatever it returned, so one stray foreign
 * word flipped the conversation language, and every later reply followed the
 * wrong stored value. English was also undetectable, so an English message could
 * never pull the conversation back.
 *
 * The detector now returns a confidence flag, and the caller only acts on a
 * CONFIDENT read: Japanese script, or at least two distinctive keyword hits with
 * a lead over every other language. English is a first-class signal, so a real
 * English message reclaims a chat that had drifted.
 */
import { detectLanguage } from '@/lib/will/i18n';

describe('detectLanguage confidence', () => {
  it('reads a clear English message as confident English', () => {
    const d = detectLanguage("I dont have it! Let me ask to my friend");
    expect(d.lang).toBe('en');
    expect(d.confident).toBe(true);
  });

  it('reads Japanese script as confident Japanese', () => {
    expect(detectLanguage('こんにちは、税金について質問があります')).toMatchObject({ lang: 'ja', confident: true });
  });

  it('reads a clear German message as confident German', () => {
    const d = detectLanguage('Hallo, ich danke dir für die Hilfe');
    expect(d.lang).toBe('de');
    expect(d.confident).toBe(true);
  });

  it('reads a clear Spanish message as confident Spanish', () => {
    const d = detectLanguage('Hola, gracias, necesito ayuda por favor');
    expect(d.lang).toBe('es');
    expect(d.confident).toBe(true);
  });

  it('is NOT confident when a lone foreign word sits in an English sentence', () => {
    // "dove" is an Italian keyword and an English word ("I dove in"). It must not
    // be enough to claim Italian.
    const d = detectLanguage('I dove straight in, thanks');
    expect(d.confident).toBe(false);
  });

  it('is NOT confident on a single stray Spanish-looking word', () => {
    // "para" alone (a preposition) must never claim Spanish.
    expect(detectLanguage('the form is para 2024').confident).toBe(false);
  });

  it('returns unknown, not English, on text with no signal at all', () => {
    expect(detectLanguage('123 456').lang).toBe(null);
    expect(detectLanguage('').lang).toBe(null);
  });
});
