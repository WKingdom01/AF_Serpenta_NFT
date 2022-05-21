import '../styles/globals.scss'
import '../styles/reset.scss'
import '../styles/main.scss'
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
    />

    <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
      _html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            console.log(window.location.pathname)
            gtag('config', ${gaMeasurementId}, {
                page_path: window.location.pathname,
            });
        `}}>

    </Script>
    <Component {...pageProps} />
  </>
}

export default appWithTranslation(MyApp)
