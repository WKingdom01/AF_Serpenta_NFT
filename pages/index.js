
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'

const Team = dynamic(() => import('./components/Team'))
const GrayFrame = dynamic(() => import('./components/GrayFrame'))
const Grid = dynamic(() => import('./components/Grid'))
const Roadmap = dynamic(() => import('./components/Roadmap'))
const FAQ = dynamic(() => import('./components/FAQ'))
const PageSlot = dynamic(() => import('./components/PageSlot'))
const HeadComponent = dynamic(() => import('./components/HeadComponent'))
const Stage = dynamic(() => import('./components/Stage'))
const Journey = dynamic(() => import('./components/Journey'))

const NavBar = dynamic(() => import('./components/NavBar'))

export default function Home() {

  const { t } = useTranslation('common')


  return (
    <PageSlot>
      <NavBar></NavBar>
      <div className="components">
        <div className="component logo">
          <div className="logo__container">
            <Image
              alt="Logo"
              src="/logo.png"
              layout="intrinsic"
              width="625"
              height="305"
              quality={100}
              priority
            />
          </div>
        </div>
        <div className="component banner">
          <div className="banner__image">
            <Image
              alt="banner"
              src="/dragon-banner.png"
              layout="intrinsic"
              width="1300"
              height="440"
              quality={100}
              priority
            />
          </div>
        </div>
        <Stage title={t('roadmapOne.title')} body={t('roadmapOne.body')} buttonLink={t('roadmapOne.buttonLink')} buttonText={t('roadmapOne.buttonText')} imageUrl="/hatchery.png"></Stage>
        <h1 className="tagline">{t('tagline')}</h1>
        <Grid></Grid>

        <Stage title={t('roadmapTwo.title')} body={t('roadmapTwo.body')} imageUrl="/roadmap-part2.png" alt="true"></Stage>

        {<div className="stage__wrapper">
          <Stage title={t('roadmapThree.title')} body={t('roadmapThree.body')}>
            <Journey></Journey>
          </Stage>
        </div>}
        <div className="tagline">{t('faqTitle')}</div>
        <FAQ></FAQ>
        <div className="tagline">{t('teamTitle')}</div>
        <Team></Team>

        <div className="component copyright">
          {t('copyright')}
        </div>
      </div>
    </PageSlot>
  )
}


export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})
