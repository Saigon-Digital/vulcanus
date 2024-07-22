import Script from 'next/script';
import { useEffect } from 'react';

const CookieConsent = () => {
  useEffect(() => {
    cookieconsent.run({
      "notice_banner_type": "interstitial",
      "consent_type": "express",
      "palette": "dark",
      "language": "de",
      "page_load_consent_levels": ["strictly-necessary"],
      "notice_banner_reject_button_hide": false,
      "preferences_center_close_button_hide": false,
      "page_refresh_confirmation_buttons": false,
      "website_name": "Vulcanus Stahl",
      "website_privacy_policy_url": "https://www.vulcanus-stahl.de/datenschutz"
    });
  }, []);

  return (
    <>
      <Script 
        id='cookie-consent'
        src="https://www.freeprivacypolicy.com/public/cookie-consent/4.1.0/cookie-consent.js"
        strategy="beforeInteractive"
        charSet="UTF-8"
      />
      <Script
        id="google-tag-manager"
        type="text/plain"
        data-cookie-consent="tracking"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TJT5DR2G');
          `,
        }}
      />
      <noscript>
        Cookie Consent by <a href="https://www.freeprivacypolicy.com/">Free Privacy Policy Generator</a>
      </noscript>
    </>
  );
};

export default CookieConsent;
