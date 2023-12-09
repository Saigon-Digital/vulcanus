import React, {PropsWithChildren} from "react";
import Footer from "../Footer";
import clsx from "clsx";

import {Overpass} from "next/font/google";

const overpass = Overpass({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-overpass",
});

const Layout = ({children}: PropsWithChildren) => {
  return (
    <main className={clsx(overpass.variable, "overflow-x-clip")}>
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
