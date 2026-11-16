export const TITLE_SUFFIX = " | Vulcanus Stahl"

/**
 * Yoast appends " - Vulcanus" to every title, and some hand-typed titles end in
 * " | Vulcanus". Cut any brand suffix and add the one site-wide suffix, so all
 * titles end the same way and never get the brand twice.
 */
export function normalizeTitle(title?: string | null): string | undefined {
  const bare = (title ?? "")
    .replace(/\s*[-|–—]\s*Vulcanus(\s+Stahl)?\s*$/i, "")
    .trim()
  return bare ? `${bare}${TITLE_SUFFIX}` : undefined
}
