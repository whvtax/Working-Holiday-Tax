/**
 * The 2025-26 self-lodgment deadline (fact L4): 11:59 pm local time,
 * 31 October 2026. After it, the pages that state the date say it has passed,
 * by themselves: the article and llms.txt are regenerated daily (ISR), so no
 * redeploy is needed on 1 November. Next year's date replaces this one.
 */
import type { SvtLocale } from './i18n'

/** End of 31 October in Perth (the last Australian time zone to reach it). */
export const SELF_LODGE_DEADLINE_MS = Date.parse('2026-11-01T00:00:00+08:00')

export const deadlinePassed = (now: number = Date.now()) => now >= SELF_LODGE_DEADLINE_MS

/** The line shown at the top of the deadline article once the date passed. */
export const DEADLINE_PASSED_NOTE: Readonly<Record<SvtLocale, string>> = {
  en: 'Update: the 2025-26 deadline for lodging your own return was 11:59 pm on 31 October 2026, and it has now passed. You can still lodge: do it as soon as you can. The rest of this page explains what that means.',
  zh: '更新：自己申报 2025-26 年度报税的截止时间是 2026 年 10 月 31 日晚上 11:59，现在已经过了。你仍然可以申报，请尽快完成。本页其余内容说明了这意味着什么。',
  vi: 'Cập nhật: hạn tự nộp hồ sơ thuế năm 2025-26 là 11 giờ 59 tối ngày 31/10/2026, và nay đã qua. Bạn vẫn có thể nộp, và nên nộp càng sớm càng tốt. Phần còn lại của trang này giải thích điều đó có nghĩa là gì.',
}

/** The same fact for llms.txt, before and after the date. */
export function deadlineFact(now: number = Date.now()): string {
  return deadlinePassed(now)
    ? 'The 2025-26 deadline for people lodging their own return was 11:59 pm local time on 31 October 2026. A late return can still be lodged; the ATO says it generally does not apply the failure to lodge penalty to an isolated late return. A registered tax agent\'s later dates apply only to clients added to the agent\'s list by 31 October 2026.'
    : 'People lodging their own 2025-26 return have until 11:59 pm local time on 31 October 2026. To use a registered tax agent\'s later date, you need to be on the agent\'s client list by 31 October 2026.'
}
