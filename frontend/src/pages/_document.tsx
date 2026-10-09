import {Html, Head, Main, NextScript} from "next/document"
import Script from "next/script"

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Netlify serves "//blog///x" as "/blog/x" but the address bar keeps the
            slashes, and Next's client router crashes on them. Collapse before it boots. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(l){var p=l.pathname.replace(/\\/{2,}/g,"/");if(p!==l.pathname)l.replace(p+l.search+l.hash)})(location)`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />


        <noscript
          dangerouslySetInnerHTML={{
            __html: `
             <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TJT5DR2G"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
              `,
          }}></noscript>

      </body>
    </Html>
  )
}
