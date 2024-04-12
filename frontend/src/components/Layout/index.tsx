import clsx from "clsx";
import {PropsWithChildren, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {Overpass} from "next/font/google";
import {MenuItemsQuery, MenuLocationEnum} from "@/__generated__/graphql";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import Header from "../Header";
import LazyImport from "../LazyImport";
import siteData from "../../data/site_data.json"
const Footer = dynamic(() => import("../Footer"));


const overpass = Overpass({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-overpass",
  preload: true,
});

export type TSiteData = {
  menus?: typeof siteData["menus"]["nodes"][number];
  // footerMenu?: typeof siteData["menus"];

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
  const menu = siteData.menus.nodes.find(menu => menu.locations[0] === location )
  return menu ;
}


 function getGlobalSiteData(locale: string | undefined) {
  const menuLocation = menuLocations[(locale as "de" | "en") || "de"];
  const headerMenu =  getMenu(menuLocation.header);
  const footerMenu =  getMenu(menuLocation.footer);

  return {
    headerMenu: headerMenu,
    footerMenu: footerMenu,
  };
}


const Layout = ({children}: PropsWithChildren) => {

  
  const router = useRouter();

  const {headerMenu,footerMenu} = getGlobalSiteData(router.locale)
  
  

  return (
    <>
      <div className={clsx(overpass.variable, "overflow-x-clip")}>
        <Header
          menu={headerMenu}
        />
        <motion.main
          initial={{opacity: 0, scale: 1}}
          animate={{opacity: 1, scale: 1}}
          transition={{
            duration: 0.5,
          }}>
          {children}
        </motion.main>
          <LazyImport>
          <Footer
            menu={footerMenu}
            />
          </LazyImport>
       
      </div>
    </>
  );
};

export default Layout;
