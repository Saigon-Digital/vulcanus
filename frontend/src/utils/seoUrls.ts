const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || ""

/**
 * Turns a WordPress uri ("/en/services/milling/") into the path the frontend
 * really serves ("/en/services/milling"): no trailing slash, and the English
 * homepage ("/en/home-page/", which next.config.js redirects) becomes "/en".
 * The German homepage ("/") becomes "" so the absolute URL has no trailing slash.
 */
export function cleanUri(uri?: string | null): string | undefined {
  if (!uri) return undefined
  const path = uri.replace(/\/+$/, "")
  return path === "/en/home-page" ? "/en" : path
}

/** Absolute URL for a WordPress uri, or undefined when there is no uri. */
export function absoluteUrl(uri?: string | null): string | undefined {
  const path = cleanUri(uri)
  return path === undefined ? undefined : `${SITE_URL}${path}`
}
