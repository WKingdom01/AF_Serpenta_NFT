import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

const GoogleAnalytics  = dynamic(() =>  import('./GoogleAnalytics'))



const HeadComponent =() => {      
    const { t } = useTranslation('common')    
    return <Head>
    
      <title>Sepenta</title>
      <meta name="description" content={t('description')} />
      <title>{t('title')}</title>
      <link rel="icon" href="/favicon.ico" />

      <link
        rel="preload"
        href="/fonts/VP-Regular.woff"
        as="font"
        crossOrigin=""
        type="font/woff"
      />
       <link
        rel="preload"
        href="/fonts/TubeOfCorn.woff"
        as="font"
        crossOrigin=""
        type="font/woff"
      />
       <link
        rel="preload"
        href="/fonts/VP-Bold.woff"
        as="font"
        crossOrigin=""
        type="font/woff"
      />
       <link
        rel="preload"
        href="/fonts/cc.woff"
        as="font"
        crossOrigin=""
        type="font/woff"
      />

      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta property="og:title" content={t('title')} />
        <meta property="og:url" content="https://serpenta.io" />
        <meta property="og:type" content="Website" />
        <meta property="og:description" content={t('tagline')}/>
        <meta property="og:image" content="/bare_dragon_transparent_bg.png" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:site_name" content="Serpenta" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="@serpentaNFT" />
        <meta property="twitter:title" content={t('title')} />
        <meta property="twitter:description" content={t('tagline')} />
        <meta property="twitter:image" content="/bare_dragon_transparent_bg.png" />
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
     
      <GoogleAnalytics strategy="afterInteractive"></GoogleAnalytics>
    </Head>
}

export default HeadComponent