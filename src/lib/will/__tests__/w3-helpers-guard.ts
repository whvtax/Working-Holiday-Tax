/** Test helper: any em dash, en dash, horizontal bar or double dash. */
export const hasDash = (s: string): boolean => /[—–―]|——/.test(s);
