import dynamic from "next/dynamic";
import {FaustProvider} from "@faustwp/core";
import type {AppProps} from "next/app";
import "../../faust.config";
import "swiper/css";
import "@/styles/globals.scss";
import {LocaleContextProvider} from "@/context/LocaleContext";
import {AnimatePresence, LazyMotion} from "framer-motion";
const Layout = dynamic(() => import("@/components/Layout"));
const features = () =>
  import("@/components/motionFeature").then((mod) => mod.default);

export default function App({Component, pageProps}: AppProps) {
  return (
    <FaustProvider pageProps={pageProps}>
      <LocaleContextProvider
        localeData={{
          DE:
            pageProps?.__TEMPLATE_QUERY_DATA__?.page.translation?.DELang.link ||
            null,
          EN:
            pageProps?.__TEMPLATE_QUERY_DATA__?.page.translation?.ENLang.link ||
            null,
        }}>
        <LazyMotion features={features}>
          <AnimatePresence initial={false} mode="wait">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AnimatePresence>
        </LazyMotion>
      </LocaleContextProvider>
    </FaustProvider>
  );
}
