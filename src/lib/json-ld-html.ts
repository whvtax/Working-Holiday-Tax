// Serialises structured data for <script type="application/ld+json">.
// JSON.stringify does not escape "<", so a string containing "</script>" could
// end the script tag early. Escaping "<", ">" and "&" keeps the JSON valid and
// makes that impossible. Output is the same JSON for every normal value.
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
}
