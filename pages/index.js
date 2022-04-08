import Head from 'next/head'
import Script from 'next/script'
import dynamic from 'next/dynamic'

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
  return (
    <div className="home">
        <GoogleAnalytics strategy="afterInteractive"></GoogleAnalytics>
           
      <Head>
        <title>Sepenta</title>
        <meta name="description" content="5555 Genesis Kaiju Dragon NFTs, their true natures concealed until they hatch at mint." />
        <title>Serpenta NFT Collection</title>
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
        <meta property="og:description" content="5555 Genesis Dragons Unleashed on the Metaverse" />
        <meta property="og:image" content="/king-kaiju-city-attack-1200-630.jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Serpenta" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="@serpentaNFT" />
        <meta property="twitter:title" content="Serpenta Dragons | NFTs" />
        <meta property="twitter:description" content="5555 Genesis Dragons Unleashed on the Metaverse" />
        <meta property="twitter:image" content="/king-kaiju-city-attack-1200-630.jpeg" />
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
          <h1 className="tagline">5555 Genesis Dragons hatching soon!</h1>
          <Grid></Grid>
          <div className="container">
            <GrayFrame></GrayFrame> 
            <Roadmap></Roadmap>
          </div>    
          <FAQ></FAQ>
          <Team></Team>
        </div>
      </main>

      {/* <footer className="footer">
        
      </footer> */}
    </div>
  )
}
