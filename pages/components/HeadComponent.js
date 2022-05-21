import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Script from 'next/script';

const GoogleAnalytics = dynamic(() => import('./GoogleAnalytics'))



const HeadComponent = () => {
  const { t } = useTranslation('common')

  console.log('g')
  return <Head>

    <title>Sepenta</title>
    <meta name="description" content={t('description')} />
    <title>{t('title')}</title>
    <link rel="icon" href="/favicon.ico" />

    <link
      rel="preload"
      href="/fonts/BasierSquareMono-Regular.otf"
      as="font"
      crossOrigin=""
      type="font/woff"
    />
    <link
      rel="preload"
      href="/fonts/BasierSquareMono-SemiBold.otf"
      as="font"
      crossOrigin=""
      type="font/woff"
    />

    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:title" content={t('title')} />
    <meta property="og:url" content="https://serpenta.io" />
    <meta property="og:type" content="Website" />
    <meta property="og:description" content={t('tagline')} />
    <meta property="og:image" content="/king-kaiju-city-attack-1200-630.jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Serpenta" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:creator" content="@serpentaNFT" />
    <meta property="twitter:title" content={t('title')} />
    <meta property="twitter:description" content={t('tagline')} />
    <meta property="twitter:image" content="/king-kaiju-city-attack-1200-630.jpeg" />
    {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
    <GoogleAnalytics></GoogleAnalytics>

  </Head>
}

export default HeadComponent