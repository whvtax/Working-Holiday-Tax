// Reading and writing the rules Jo added (lib/will/rules.ts).
//
// Split out of rules.ts because that file is imported by the Rules TAB, which
// is a client component: anything it touches ends up in the browser bundle, and
// the store reaches `fs` two hops down. So the catalogue and the matching logic
// stay pure over there, and the parts that need a database live here, where
// only server code can reach them.
import { getStore } from './store';
import { CustomRule, parseCustomRules, CUSTOM_RULES_KEY, MAX_CUSTOM_RULES } from './rules';

/** The rules Will is currently held to.
 *
 *  NEVER THROWS, and that matters more here than anywhere else this is called:
 *  it runs on the path that answers a real customer. A store that cannot be
 *  read means no custom rules for this message — which is the behaviour that
 *  existed before custom rules did — rather than no reply at all. */
export async function loadCustomRules(): Promise<CustomRule[]> {
  try {
    return parseCustomRules(await getStore().getSetting(CUSTOM_RULES_KEY));
  } catch {
    return [];
  }
}

export async function saveCustomRules(rules: CustomRule[]): Promise<void> {
  await getStore().setSetting(CUSTOM_RULES_KEY, rules.slice(0, MAX_CUSTOM_RULES));
}
