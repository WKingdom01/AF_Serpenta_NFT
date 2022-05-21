
import Document, { Html, Head, Main, NextScript } from 'next/document'
import dynamic from 'next/dynamic'
import Script from 'next/script';
// import { GTM_ID } from '../lib/gtm'
const HeadComponent = dynamic(() => import('./components/HeadComponent'))

export default class MyDocument extends Document {

    render() {
        const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
        return (
            <Html>

                <Head>

                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                    />
                    asdasdasdasds
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
                    {/* <HeadComponent></HeadComponent> */}
                </Head>

                <body>

                    <Main />
                    <NextScript />

                </body>
            </Html>
        )
    }
}