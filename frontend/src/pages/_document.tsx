import {Html, Head, Main, NextScript} from "next/document"
import Script from "next/script"

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />

        <noscript>
          <iframe
            title="Google Tag Manager"
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJT5DR2G"
            height={0}
            width={0}
            style={{display: "none", visibility: "hidden"}}
          />
        </noscript>
      </body>
    </Html>
  )
}
