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
if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}
export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <DefaultSeo {...seo} />
      <Layout
        headerMenu={pageProps?.headerMenu}
        footerMenu={pageProps?.footerMenu}
        key={`${router.asPath}-${router.locale}`}>
        {/* > */}
        <Component {...pageProps} key={`${router.asPath}-${router.locale}`} />
      </Layout>
    </FaustProvider>
  );
}
