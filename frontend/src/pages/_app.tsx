import "@/styles/globals.css";
import clsx from "clsx";
import type {AppProps} from "next/app";

import {Overpass} from "next/font/google";

const overpass = Overpass({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-overpass",
});

export default function App({Component, pageProps}: AppProps) {
  return (
    <main className={clsx(overpass.variable, "overflow-x-clip")}>
      <Component {...pageProps} />
    </main>
  );
}
