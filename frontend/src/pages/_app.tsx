import dynamic from "next/dynamic";
import {FaustProvider} from "@faustwp/core";
import type {AppProps} from "next/app";
import {useRouter} from "next/router";
import "../../faust.config";
import "swiper/css";

import "@/styles/globals.scss";
import clsx from "clsx";
import {LocaleContextProvider} from "@/context/LocaleContext";
import {AnimatePresence, LazyMotion} from "framer-motion";
import {Overpass} from "next/font/google";
import {ApolloProvider} from "@apollo/client";
import {client} from "@/libs/graphql/utils";
import {ModalContext, ModalContextProvider} from "@/context/modalContext";
const Layout = dynamic(() => import("@/components/Layout"));

//font
const overpass = Overpass({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-overpass",
  preload: true,
});

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();

  // console.log("page data ", page);
  // const footerText = page?.translation?.pagesSetting
  //   ? page?.translation?.pagesSetting.footerText
  //   : "";
  return (
    <ApolloProvider client={client}>
      <FaustProvider pageProps={pageProps}>
        <LocaleContextProvider
          localeData={{
            DE:
              pageProps?.__TEMPLATE_QUERY_DATA__?.page.translation?.DELang
                ?.link || null,
            EN:
              pageProps?.__TEMPLATE_QUERY_DATA__?.page.translation?.ENLang
                ?.link || null,
          }}>
          <ModalContextProvider>
            <AnimatePresence initial={false} mode="wait">
              <main className={clsx(overpass.variable, "overflow-x-clip")}>
                <Layout
                  footerText={
                    pageProps?.__TEMPLATE_QUERY_DATA__?.page?.translation
                      ?.pagesSetting?.footerText
                  }
                  key={`${router.asPath}-${router.locale}`}>
                  {/* > */}
                  <Component
                    {...pageProps}
                    key={`${router.asPath}-${router.locale}`}
                  />
                </Layout>
              </main>
            </AnimatePresence>
          </ModalContextProvider>
        </LocaleContextProvider>
      </FaustProvider>
    </ApolloProvider>
  );
}
