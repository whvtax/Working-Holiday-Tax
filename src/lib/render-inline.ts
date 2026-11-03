/**
 * Inline markdown for guide bodies: **bold** and [text](href).
 *
 * The output is injected with dangerouslySetInnerHTML (GuideArticle.tsx), so it
 * must never pass raw HTML or a script-capable URL through. Guide bodies are
 * static repo content today, which is why this was safe in practice, but a
 * renderer that is only safe because its input happens to be tidy is one
 * pasted `<img onerror=...>` away from a stored-XSS bug once content comes
 * from anywhere else (a CMS, a translation vendor, a contractor's pull request).
 *
 * Behaviour for every existing guide body is byte-for-byte unchanged (pinned by
 * src/lib/__tests__/render-inline.test.ts, which compares against the previous
 * implementation across all guides). What changed:
 *   - `<` and `>` in the source are escaped, so no tag can be written into a body.
 *   - a link is only rendered as <a> when its href is an internal path (/x or #x),
 *     https://, or mailto:. Anything else (javascript:, data:, protocol-relative
 *     //host, http://) renders as plain text, never as a link.
 */
const SAFE_HREF = /^(?:\/(?!\/)|#|https:\/\/|mailto:)[^\s"'`<>\\]*$/

export function renderInlineMarkdown(raw: string): string {
  return raw
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:600;color:#0B5240;">$1</strong>')
    // A real underline, not a 1px #DCE0DE bottom border at 1.18:1 against
    // white. The border did not read as a link at all, which is the only
    // thing an inline link has to do.
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_: string, text: string, href: string) =>
      SAFE_HREF.test(href)
        ? `<a href="${href}" style="color:#0B5240;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;font-weight:600;padding:2px 0;">${text}</a>`
        : text
    )
}
