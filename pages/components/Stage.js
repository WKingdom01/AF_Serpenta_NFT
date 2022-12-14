import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gsap, TimelineMax } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Button = dynamic(() => import('./Button'));

const Stage = ({ title, body, buttonText, imageUrl, alt, children }) => {
  const { t } = useTranslation('common');
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = new TimelineMax();

    if (typeof window !== 'undefined' && children) {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        const bp = window.getComputedStyle(document.body, ':before').content;
        const section = document.querySelector('.js-wrapper');
        const w = document.querySelector('.js-slideContainer');

        const [x, xEnd] = [
          '0%',
          (w?.scrollWidth - section?.offsetWidth + 800) * -1,
        ];

        tl.fromTo(
          w,
          { x },
          {
            x: xEnd,
            scrollTrigger: {
              id: 'id',
              pin: true,
              trigger: section,
              scrub: 0.5,
              start: 'top -10vh',
              animation: tl,
            },
          }
        );

        if (bp !== '"desktop"') {
          ScrollTrigger.getAll().forEach((st) => st.disable());
        } else {
          ScrollTrigger.getAll().forEach((st) => st.enable());
        }
      }

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  });

  return (
    <div>
      <div
        className={`stage ${alt ? 'stage--alt' : ''} component ${
          children ? 'js-wrapper' : ''
        }`}
      >
        {children && (
          <div className="tagline tagline--no-padding-left">
            {t('roadmapTitle')}
          </div>
        )}
        <div
          className={`stage__content  ${children ? 'js-slideContainer' : ''} `}
        >
          <div className="stage__text">
            <div>
              <h3 className="stage__title">
                <FontAwesomeIcon
                  className="stage__diamond icon"
                  icon={faDiamond}
                ></FontAwesomeIcon>
                {title}
              </h3>
              <div
                className="stage__body"
                dangerouslySetInnerHTML={{ __html: body }}
              ></div>
            </div>
            {buttonText && (
              <div className="stage__button">
                <Button
                  text={buttonText}
                  link={t('discordLink')}
                  symbol="true"
                  style="blue"
                ></Button>
              </div>
            )}
          </div>

          <div className={`stage__image`}>
            {children ? (
              children
            ) : (
              <div className="unset-img">
                <Image
                  className="custom-img"
                  alt="banner"
                  src={imageUrl}
                  layout="responsive"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  quality={100}
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage;
