import {AcfLink, Maybe} from "@/__generated__/graphql";

import {useRouter} from "next/router";

export function getUrlPathname(url: string | undefined) {
  if (!url) return "";
  try {
    return new URL(url)?.pathname;
  } catch (error) {
    return "";
  }
}

export function getAcfLinkProps(link?: Maybe<AcfLink>) {
  return {
    href: getUrlPathname(link?.url || ""),
    target: link?.target || "_self",
    rel: link?.target === "_blank" ? "noopener noreferrer" : undefined,
  };
}

export const allLowercase = (s: string): string => {
  var result = "";
  s.split("").forEach((w) => (result += w.toLowerCase()));
  return result;
};

export const urlHelper = (url: string) => {
  if (url.charAt(url.length - 1) === "/") {
    return url.substring(0, url.length - 1);
  } else {
    return url;
  }
};

export const flatListToHierarchical = (
  data = [],
  {idKey = "key", parentKey = "parentId", childrenKey = "children"} = {}
) => {
  const tree: any[] = [];
  const childrenOf: any = {};
  data.forEach((item: any) => {
    const newItem = {...item};
    const {[idKey]: id, [parentKey]: parentId = 0} = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem);
  });
  return tree;
};
