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

function buildMenuTree(menu: any, parentId=null) {
  const result = [];
  for (const item of menu) {
    if (item.parentId === parentId) {
      const children = buildMenuTree(menu, item.id);
      const menuItem = { ...item }; // Create a new object
      if (children.length > 0) {
        menuItem.children = children;
      }
      result.push(menuItem);
    }
  }
  return result;
}

export default buildMenuTree;