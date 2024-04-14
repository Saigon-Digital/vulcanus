import {PropsWithChildren} from "react";
import dynamic from "next/dynamic";
import {MenuLocationEnum} from "@/__generated__/graphql";
import {useRouter} from "next/router";
import {m} from "framer-motion";
import LazyImport from "../LazyImport";
import siteData from "../../data/site_data.json";
const Header = dynamic(() => import("../Header"));
const Footer = dynamic(() => import("../Footer"));

export type TSiteData = {
  menus?: (typeof siteData)["menus"]["nodes"][number];
};

const menuLocations = {
  de: {
    header: MenuLocationEnum.Header,
    footer: MenuLocationEnum.Footer,
  },
  en: {
    header: MenuLocationEnum.HeaderEn,
    footer: MenuLocationEnum.FooterEn,
  },
};

function getMenu(location: MenuLocationEnum) {
  const menu = siteData.menus.nodes.find(
    (menu) => menu.locations[0] === location
  );
  return menu;
}

function getGlobalSiteData(locale: string | undefined) {
  const menuLocation = menuLocations[(locale as "de" | "en") || "de"];
  const headerMenu = getMenu(menuLocation.header);
  const footerMenu = getMenu(menuLocation.footer);

  return {
    headerMenu: headerMenu,
    footerMenu: footerMenu,
  };
}

const Layout = ({children}: PropsWithChildren) => {
  const router = useRouter();

  const {headerMenu, footerMenu} = getGlobalSiteData(router.locale);

  return (
    <>
      <Header menu={headerMenu} />

      <m.div
        initial={{opacity: 0, scale: 1}}
        animate={{opacity: 1, scale: 1}}
        transition={{
          duration: 0.5,
        }}>
        {children}
      </m.div>
      <LazyImport>
        <Footer menu={footerMenu} />
      </LazyImport>
    </>
  );
};

export default Layout;
