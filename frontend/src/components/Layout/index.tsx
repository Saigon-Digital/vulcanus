import clsx from "clsx";
import {PropsWithChildren, useLayoutEffect, useState} from "react";
import Footer from "../Footer";

import {Overpass} from "next/font/google";
import Header from "../Header";
import {MenuItemsQuery} from "@/__generated__/graphql";
import SEO, {TSEO} from "../SEO";
import {GET_MENUS, getGlobalSiteData} from "@/libs/graphql/utils";
import {useQuery} from "@apollo/client";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
const overpass = Overpass({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-overpass",
});

type Props = PropsWithChildren & {
  headerMenu: MenuItemsQuery;
  footerMenu: MenuItemsQuery;
  seo?: TSEO;
};
type fallBackData = {
  headerMenu?: MenuItemsQuery;
  footerMenu?: MenuItemsQuery;
};
const Layout = ({children, headerMenu, footerMenu, seo}: Props) => {
  let [fallbackData, setFallbackData] = useState<fallBackData>({});
  const router = useRouter();
  useLayoutEffect(() => {
    if (!headerMenu || !footerMenu) {
      getFallbackData();
    }
  }, []);
  const getFallbackData = async () => {
    const {headerMenu, footerMenu} = await getGlobalSiteData(router.locale);

    setFallbackData({headerMenu: headerMenu, footerMenu: footerMenu});
  };

  return (
    <div className={clsx(overpass.variable, "overflow-x-clip")}>
      <Header
        menuItems={headerMenu?.menuItems || fallbackData.headerMenu?.menuItems}
      />
      <motion.main
        initial={{opacity: 0, scale: 1}}
        animate={{opacity: 1, scale: 1}}
        transition={{
          duration: 0.5,
        }}>
        {children}
      </motion.main>
      <Footer
        menuItems={footerMenu?.menuItems || fallbackData.footerMenu?.menuItems}
      />
    </div>
  );
};

export default Layout;
