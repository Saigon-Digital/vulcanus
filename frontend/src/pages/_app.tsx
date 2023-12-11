import Layout from "@/components/Layout";
import "@/styles/globals.css";
import {FaustProvider} from "@faustwp/core";
import type {AppProps} from "next/app";
import {useRouter} from "next/router";
import "../../faust.config";
import "swiper/css";

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();
  return (
    <FaustProvider pageProps={pageProps}>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </FaustProvider>
  );
}
