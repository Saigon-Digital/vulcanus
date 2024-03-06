import {AcfLink, Maybe} from "@/__generated__/graphql";

export function getUrlPathname(url: string | undefined) {
  if (!url) return "";
  try {
    return new URL(url)?.pathname;
  } catch (error) {
    return "";
  }
}

export function getAcfLinkProps(link?: Maybe<AcfLink >) {
  return {
    href: getUrlPathname(link?.url || ""),
    target: link?.target || "_self",
    rel: link?.target === "_blank" ? "noopener noreferrer" : undefined,
  };
}
