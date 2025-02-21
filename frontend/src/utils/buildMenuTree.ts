import { TSiteData } from "@/components/Layout";

export interface MenuChildItem {
  __typename: string;
  title: null | string;
  uri: string;
  label: string;
}

export interface MenuItem {
  __typename: string;
  uri: string;
  label: string;
  title: null | string;
  parentId: string | null;
  id: string;
  target: null | string;
  childItems: {
    __typename: string;
    nodes: MenuChildItem[];
  };
}

interface MenuData {
  __typename: string;
  locations: string[];
  menuItems: {
    __typename: string;
    nodes: MenuItem[];
  };
}

function buildMenuTree(menu: MenuData | undefined) {
  if (!menu?.menuItems?.nodes) {
    return [];
  }

  return menu.menuItems.nodes;
}

export default buildMenuTree;