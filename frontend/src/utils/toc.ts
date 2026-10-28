export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

// Some posts carry a hand-written, link-less "Table of contents" section.
const MANUAL_TOC_REGEX = /^(table of contents|inhaltsverzeichnis|inhalt)$/i;

const HEADING_REGEX = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const stripTags = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&#8217;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Adds an `id` to every h2/h3 of the post HTML and returns the matching
 * table-of-contents entries. Runs on the server so ids are in the first render.
 */
export const buildToc = (html: string): {html: string; toc: TocItem[]} => {
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const result = html.replace(
    HEADING_REGEX,
    (match, level: string, attrs: string, inner: string) => {
      const text = stripTags(inner);
      if (!text) return match;

      const existing = attrs.match(/\sid=["']([^"']+)["']/i);
      let id = existing ? existing[1] : slugify(text) || "section";
      if (!existing) {
        const base = id;
        let n = 2;
        while (used.has(id)) id = `${base}-${n++}`;
      }
      used.add(id);
      if (!MANUAL_TOC_REGEX.test(text)) {
        toc.push({id, text, level: Number(level) as 2 | 3});
      }

      const nextAttrs = existing ? attrs : `${attrs} id="${id}"`;
      return `<h${level}${nextAttrs}>${inner}</h${level}>`;
    }
  );

  return {html: result, toc};
};
