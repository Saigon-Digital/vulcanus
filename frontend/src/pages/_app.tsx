import dynamic from "next/dynamic";
import {FaustProvider} from "@faustwp/core";
import type {AppProps} from "next/app";
import {useRouter} from "next/router";
import "../../faust.config";
import "swiper/css";

import "@/styles/globals.scss";

import {ApolloProvider} from "@apollo/client";
import {client} from "@/libs/graphql/utils";
import {LocaleContextProvider} from "@/context/LocaleContext";
import {AnimatePresence} from "framer-motion";

const Layout = dynamic(() => import("@/components/Layout"));

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();

  return (
    <ApolloProvider client={client}>
      <FaustProvider pageProps={pageProps}>
        <LocaleContextProvider
          localeData={{
            DE:
              pageProps?.__TEMPLATE_QUERY_DATA__?.page.translation?.DELang
                .link || null,
            EN:
              pageProps?.__TEMPLATE_QUERY_DATA__?.page.translation?.ENLang
                .link || null,
          }}>
          <AnimatePresence initial={false} mode="wait">
            <Layout
              headerMenu={pageProps?.headerMenu}
              footerMenu={pageProps?.footerMenu}
              key={`${router.asPath}-${router.locale}`}>
              {/* > */}
              <Component
                {...pageProps}
                key={`${router.asPath}-${router.locale}`}
              />
            </Layout>
          </AnimatePresence>
        </LocaleContextProvider>
      </FaustProvider>
    </ApolloProvider>
  );
}
