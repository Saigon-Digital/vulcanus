import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import {FaustProvider} from "@faustwp/core";
import type {AppProps} from "next/app";
import {useRouter} from "next/router";
import "../../faust.config";
import "swiper/css";
import {__DEV__} from "@apollo/client/utilities/globals";
import {loadErrorMessages, loadDevMessages} from "@apollo/client/dev";
import {DefaultSeo} from "next-seo";
import seo from "@/next-seo.config";
import {MenuItem, MenuItemsQuery} from "@/__generated__/graphql";
import {ApolloProvider, useQuery} from "@apollo/client";
import {GET_MENUS, client} from "@/libs/graphql/utils";
import {languages} from "@/utils/language";
import {LocaleContextProvider} from "@/context/LocaleContext";
import {AnimatePresence} from "framer-motion";
if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();

  return (
    <ApolloProvider client={client}>
      <FaustProvider pageProps={pageProps}>
        <LocaleContextProvider
          localeData={{
            DE:
              pageProps?.__TEMPLATE_QUERY_DATA__?.page.translation?.DELang ||
              null,
            EN:
              pageProps?.__TEMPLATE_QUERY_DATA__?.page.translation?.ENLang ||
              null,
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
