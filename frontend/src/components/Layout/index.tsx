import clsx from "clsx";
import {PropsWithChildren, useEffect, useLayoutEffect, useState} from "react";
import dynamic from "next/dynamic";
import {Overpass} from "next/font/google";
import {MenuItemsQuery} from "@/__generated__/graphql";
import SEO, {TSEO} from "../SEO";
import {GET_MENUS, getGlobalSiteData} from "@/libs/graphql/utils";
import {useQuery} from "@apollo/client";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import Header from "../Header";
import LazyImport from "../LazyImport";
const Footer = dynamic(() => import("../Footer"));
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
  useEffect(() => {
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
      <LazyImport>
        <Footer
          menuItems={
            footerMenu?.menuItems || fallbackData.footerMenu?.menuItems
          }
        />
      </LazyImport>
    </div>
  );
};

export default Layout;
