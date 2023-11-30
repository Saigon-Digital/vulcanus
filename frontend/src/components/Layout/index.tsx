import React, {PropsWithChildren} from "react";
import Footer from "../Footer";

const Layout = ({children}: PropsWithChildren) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
