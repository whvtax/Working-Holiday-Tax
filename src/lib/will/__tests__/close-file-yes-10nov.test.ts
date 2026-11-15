/** Jo, 10 Nov: "Hi 임재도, should I close your file for now?" -> "Yes", and Will
 *  asked for a payment screenshot. A plain yes to that question closes the
 *  file with one friendly line. */
import fs from 'fs';
import path from 'path';
import { isCloseFileQuestion, saysPlainYes, closeFileReply } from '@/lib/will/service';

it('recognises our close question in every language and as the template', () => {
  expect(isCloseFileQuestion('Hi 임재도, should I close your file for now?')).toBe(true);
  expect(isCloseFileQuestion('Hi Jakob, soll ich deine Akte vorerst schließen?')).toBe(true);
  expect(isCloseFileQuestion('こんにちは、星野さん。いったんファイルを閉じてもよろしいでしょうか？')).toBe(true);
  expect(isCloseFileQuestion('', 'fu_pre_7d_de')).toBe(true);
  expect(isCloseFileQuestion('Hi Sam, did the transfer go through on your end?')).toBe(false);
});

it('only a plain yes counts', () => {
  for (const y of ['Yes', 'yes!', 'Yes please', 'sure 👍', 'ok close it', 'Ja', 'はい']) expect(saysPlainYes(y)).toBe(true);
  for (const n of ['No', 'not yet', 'Yes, but can I pay tomorrow?', 'yes I paid already yesterday evening', 'wait']) expect(saysPlainYes(n)).toBe(false);
});

it('the close line, no dash', () => {
  expect(closeFileReply('en')).toBe('No problem at all, all the best 😊');
  for (const l of ['en', 'de', 'ja', 'ko']) expect(closeFileReply(l)).not.toMatch(/[–—―]/);
});

it('wired before the model, closes the lead', () => {
  const s = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');
  const i = s.indexOf('"Should I close your file for now?" -> "Yes" (Jo, 10 Nov)');
  expect(i).toBeGreaterThan(0);
  expect(i).toBeLessThan(s.indexOf('THE CHOICE IS THE "YES": price message at once'));
  expect(s.slice(i, i + 2500)).toContain('closeLeadAfterNo(store, customer');
});
