/** HTML-escape a value for insertion into markup. */
export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Join an array of markup strings. */
export const join = (arr, sep = '\n') => arr.join(sep);

/**
 * Fill `{token}` slots in a copy string. Copy stays a plain string (so the
 * translation sheets show it whole) while facts and placeholders are
 * substituted at render time rather than typed into the prose.
 */
export const fill = (str, vars) => String(str).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
