import clsx from "clsx";
import {PropsWithChildren} from "react";
import Footer from "../Footer";

import {Overpass} from "next/font/google";
import Header from "../Header";
import {MenuItemsQuery} from "@/__generated__/graphql";
import SEO, {TSEO} from "../SEO";

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

const Layout = ({children, headerMenu, footerMenu, seo}: Props) => {
  return (
    <div className={clsx(overpass.variable, "overflow-x-clip")}>
      <Header menuItems={headerMenu?.menuItems} />
      <main>{children}</main>
      <Footer menuItems={footerMenu?.menuItems} />
    </div>
  );
};

export default Layout;
