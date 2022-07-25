import dynamic from 'next/dynamic';
import Image from 'next/image';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config.js';

const BlockGrid = dynamic(() => import('./components/BlockGrid'));
const FAQ = dynamic(() => import('./components/FAQ'));
const Grid = dynamic(() => import('./components/Grid'));
const Journey = dynamic(() => import('./components/Journey'));
const NavBar = dynamic(() => import('./components/NavBar'));
const PageSlot = dynamic(() => import('./components/PageSlot'));
const Stage = dynamic(() => import('./components/Stage'));
const Team = dynamic(() => import('./components/Team'));
const Question = dynamic(() => import('./components/Question'));

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <PageSlot>
      <NavBar />
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
        <Stage
          title={t('roadmapOne.title')}
          body={t('roadmapOne.body')}
          buttonLink={t('roadmapOne.buttonLink')}
          buttonText={t('roadmapOne.buttonText')}
          imageUrl="/hatchery.png"
        ></Stage>
        <h1 className="tagline">{t('tagline')}</h1>
        <Grid></Grid>

        <Stage
          title={t('roadmapTwo.title')}
          body={t('roadmapTwo.body')}
          imageUrl="/roadmap-part2.png"
          alt="true"
        ></Stage>

        {
          <div className="stage__wrapper">
            <Stage
              title={t('roadmapThree.title')}
              body={t('roadmapThree.body')}
            >
              <Journey></Journey>
            </Stage>
          </div>
        }
        <div className="tagline">{t('gridTitle')}</div>
        <BlockGrid />
        <BlockGrid reverse={true} />
        <div className="tagline">{t('faqTitle')}</div>
        <FAQ>
          <Question
            question={t('faq.questionOne')}
            answer={t('faq.answerOne')}
          ></Question>
          <Question
            question={t('faq.questionTwo')}
            answer={t('faq.answerTwo')}
          ></Question>
          <Question
            question={t('faq.questionThree')}
            answer={t('faq.answerThree')}
          ></Question>
          <Question
            question={t('faq.questionFour')}
            answer={t('faq.answerFour')}
          ></Question>
          <Question
            question={t('faq.questionFive')}
            answer={t('faq.answerFive')}
          ></Question>
        </FAQ>
        <div className="tagline">{t('teamTitle')}</div>
        <Team />
        <div className="component copyright">{t('copyright')}</div>
      </div>
    </PageSlot>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
};
