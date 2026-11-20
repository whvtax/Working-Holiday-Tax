/** Jo, 18 Nov (review): the track choice must not pick the $385 track on weak signals. */
import { detectChoice } from '@/lib/will/instant-choice';

describe('track choice reads the customer right', () => {
  it.each([
    ['TFN and a second job at a cafe'],
    ['I worked for both employers, TFN'],
    ['employment contract at a cafe, TFN'],
    ['not sure if ABN'],
    ['I think I had an ABN'],
    ['maybe ABN'],
    ["I'm not sure I had an ABN"],
  ])('asks (no clear track): %s', (t) => {
    expect(detectChoice(t, null)).toBeNull();
  });

  it.each([
    ["I don't think I have an ABN", 'TFN'],
    ["I didn't work under an ABN", 'TFN'],
    ['I am not registered for an ABN', 'TFN'],
    ["I wasn't on an ABN, just employers", 'TFN'],
    ['No tengo ABN, solo TFN', 'TFN'],
    ["Je n'ai pas d'ABN, seulement TFN", 'TFN'],
    ['TFN only', 'TFN'],
    ['I have an ABN', 'TFN_ABN'],
  ])('%s -> %s', (t, track) => {
    expect(detectChoice(t, null)).toBe(track);
  });
});
