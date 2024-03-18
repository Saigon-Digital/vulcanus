import clsx from "clsx";
import {PropsWithChildren} from "react";
import Footer from "../Footer";

import {Overpass} from "next/font/google";
import Header from "../Header";
import {MenuItemsQuery} from "@/__generated__/graphql";

const overpass = Overpass({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-overpass",
});

type Props = PropsWithChildren & {
  headerMenu: MenuItemsQuery;
  footerMenu: MenuItemsQuery;
};

const Layout = ({children, headerMenu, footerMenu}: Props) => {
  console.log("footer ", footerMenu);

  return (
    <div className={clsx(overpass.variable, "overflow-x-clip")}>
      <Header menuItems={headerMenu?.menuItems} />
      <main>{children}</main>
      <Footer menuItems={footerMenu?.menuItems} />
    </div>
  );
};

export default Layout;
