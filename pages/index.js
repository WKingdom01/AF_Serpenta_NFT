import Head from 'next/head'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Background  = dynamic(() =>  import('./background'))
const Content  = dynamic(() =>  import('./components/Content'))
const NavBar  = dynamic(() =>  import('./components/NavBar'))
const Team  = dynamic(() =>  import('./components/Team'))
const GrayFrame  = dynamic(() =>  import('./components/GrayFrame'))
const Grid  = dynamic(() =>  import('./components/Grid'))
const Roadmap  = dynamic(() =>  import('./components/Roadmap'))
const FAQ  = dynamic(() =>  import('./components/FAQ'))
const GoogleAnalytics  = dynamic(() =>  import('./components/GoogleAnalytics'))


export default function Home() {

  const { t } = useTranslation('common')

  return (
    <div className="home">
        <GoogleAnalytics strategy="afterInteractive"></GoogleAnalytics>
           
      <Head>
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
        <meta property="og:title" content="Serpenta Dragons | NFTs" />
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
       
       
      </Head>
      <main className="main">
        <NavBar></NavBar>
        <section>
          <Background 
            top={  <div className="navbar--static"></div>}
              bottom={<Content></Content>}>
          </Background>
        </section>
        <div className="components">
          <h1 className="tagline">{t('tagline')}</h1>
          <Grid></Grid>
          <div className="container">
            <GrayFrame></GrayFrame> 
            <Roadmap></Roadmap>
          </div>    
          <FAQ></FAQ>
          <Team></Team>
        </div>
      </main>
    </div>
  )
}


export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})