import {PropsWithChildren} from "react";
import dynamic from "next/dynamic";
import {MenuLocationEnum} from "@/__generated__/graphql";
import {ReactLenis} from "lenis/react";

import siteData from "../../data/site_data.json";
import {useLocaleContext} from "@/context/LocaleContext";
import Modal from "../Modal";
const Header = dynamic(() => import("../Header"));
const Footer = dynamic(() => import("../Footer"), {ssr: false});

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

const Layout = ({
  children,
  footerText,
}: PropsWithChildren & {footerText?: string | null | undefined}) => {
  const {locale} = useLocaleContext();

  const {headerMenu, footerMenu} = getGlobalSiteData(locale);

  return (
    <>
      <Header menu={headerMenu} />
      <ReactLenis root>{children}</ReactLenis>
      <Footer footerText={footerText} menu={footerMenu} />
    </>
  );
};

export default Layout;
