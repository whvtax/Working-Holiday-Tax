// Stop and "one at a time" rules (Jo, Nov 22).
//
// Stop: pressing Cancel or Stop writes the time of the stop. Any run that began
// before that time halts at its next check (paid steps, polls, studio stages,
// new blogs). Scheduled runs do nothing until Jo presses Start, which writes
// the time of the Start. A run that began after a Start is not stopped.

export const STOP_AT_KEY = 'ella_stop_at'
export const START_AT_KEY = 'ella_start_at'

export interface SettingsReader { settings(keys: string[]): Promise<Record<string, unknown>> }

async function marks(repo: SettingsReader) {
  const v = await repo.settings([STOP_AT_KEY, START_AT_KEY])
  return { stopAt: Number(v[STOP_AT_KEY] ?? 0) || 0, startAt: Number(v[START_AT_KEY] ?? 0) || 0 }
}

/**
 * True when the work that began at `since` must stop.
 * - A run that began before the last stop always stops (a run started in the same
 *   millisecond as the stop is treated as started after it).
 * - A run that began after the stop stops only if no Start was pressed after the stop.
 */
export function haltsRun(stopAt: number, startAt: number, since: number): boolean {
  if (!stopAt) return false
  return since < stopAt || startAt < stopAt
}

export async function stopped(repo: SettingsReader, since: number): Promise<boolean> {
  const { stopAt, startAt } = await marks(repo)
  return haltsRun(stopAt, startAt, since)
}
