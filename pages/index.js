
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


const Team  = dynamic(() =>  import('./components/Team'))
const GrayFrame  = dynamic(() =>  import('./components/GrayFrame'))
const Grid  = dynamic(() =>  import('./components/Grid'))
const Roadmap  = dynamic(() =>  import('./components/Roadmap'))
const FAQ  = dynamic(() =>  import('./components/FAQ'))
const GoldFrame  = dynamic(() =>  import('./components/GoldFrame'))
const PageSlot  = dynamic(() =>  import('./components/PageSlot'))
const HeadComponent  = dynamic(() =>  import('./components/HeadComponent'))



export default function Home() {

  const { t } = useTranslation('common')

  return (
    <PageSlot topComponent={<GoldFrame>
      <div className="main-image image">
          <div className="image__front">
              <img
                  alt="dragon"
                  src={'/serpenta_samurai_hat.png'}
                  
              />
          </div>
      </div></GoldFrame>}
    >
    <div className="components">
      <h1 className="tagline">{t('tagline')}</h1>
      <Grid></Grid>
      <div className="container">
        <GrayFrame title="About">
        <div className="grayframe__title">
          {t('about.title')}
        </div>
        <div className="grayframe__text" dangerouslySetInnerHTML={{__html: t('about.content')}}>
               
               </div>
          
          </GrayFrame> 
        <Roadmap></Roadmap>
      </div>    
      <FAQ></FAQ>
      <Team></Team>
    </div>
  </PageSlot>
  )
}


export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})