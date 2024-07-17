import dynamic from "next/dynamic"
import {FaustProvider} from "@faustwp/core"
import type {AppProps} from "next/app"
import {useRouter} from "next/router"
import "../../faust.config"
import "swiper/css"
import "swiper/css"
import "swiper/css/pagination"
import "@/styles/globals.scss"

import {LocaleContextProvider} from "@/context/LocaleContext"
import {AnimatePresence, LazyMotion} from "framer-motion"
import {Overpass} from "next/font/google"
import {ApolloProvider} from "@apollo/client"
import {client} from "@/libs/graphql/utils"
import {ModalContext, ModalContextProvider} from "@/context/modalContext"
import {TextContent, TextContentProvider} from "@/context/textContent"
import Head from "next/head"

const Layout = dynamic(() => import("@/components/Layout"))
import CookieConsent, {Cookies} from "react-cookie-consent"
import {languages} from "@/utils/language"
//font
const overpass = Overpass({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-overpass",
  preload: true,
})

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter()

  // console.log("page data ", page);
  // const footerText = page?.translation?.pagesSetting
  //   ? page?.translation?.pagesSetting.footerText
  //   : "";
  return (
    <ApolloProvider client={client}>
      <style jsx global>{`
        html {
          font-family: ${overpass.style.fontFamily};
        }
      `}</style>
      <Head>
        <meta
          name="viewport"
          content="initial-scale = 1.0,maximum-scale = 1.0"
        />
      </Head>
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
            <TextContentProvider>
              <AnimatePresence initial={false} mode="wait">
                <Layout
                  footerText={
                    pageProps?.__TEMPLATE_QUERY_DATA__?.page?.translation
                      ?.pagesSetting?.footerText
                  }
                  key={`${router.asPath}-${router.locale}`}>
                  {/* > */}
                  <CookieConsent
                    // ButtonComponent={}
                    buttonWrapperClasses="!my-auto "
                    style={{
                      background: "#050014",
                      padding: "20px 15px 5px 15px",
                    }}
                    buttonText={languages(router.locale)?.allowAll}
                    contentClasses="!max-w-[88%]"
                    buttonClasses="!bg-primary-blue-main !my-auto hover:!bg-primary-blue-main/30 hover:!text-primary-blue-main 
                    !transition-all hover:!border-primary-blue-main hover:!border  ">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: languages(router.locale)?.cookieContent || "",
                      }}
                      className="cookie-content"></div>
                  </CookieConsent>
                  <Component
                    {...pageProps}
                    key={`${router.asPath}-${router.locale}`}
                  />
                </Layout>
              </AnimatePresence>
            </TextContentProvider>
          </ModalContextProvider>
        </LocaleContextProvider>
      </FaustProvider>
    </ApolloProvider>
  )
}
