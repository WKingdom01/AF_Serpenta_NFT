import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

const Journey = ({ title }) => {
  const { t, i18n, ready } = useTranslation('common', { useSuspense: false });

  const [shortScreen, setShortScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        const bp = window.getComputedStyle(document.body, ':after').content;

        if (bp === '"short"') {
          setShortScreen(true);
        } else {
          setShortScreen(false);
        }
      }
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  });

  return (
    <div className={`journey component js-wrapper`}>
      <div className="journey__content js-slideContainer">
        {ready &&
          t('roadmap.stages', { returnObjects: true }).map((stage, index) => {
            return (
              <div className="journey__stage" key={`stage--${index}`}>
                <div className="journey__image">
                  {shortScreen ? (
                    <Image
                      className="journey__image"
                      alt="town"
                      src={stage.image}
                      layout="intrinsic"
                      // object-fit="cover"
                      width="228"
                      height="147"
                      quality={100}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      className="journey__image"
                      alt="town"
                      src={stage.image}
                      layout="intrinsic"
                      // object-fit="cover"
                      width="457"
                      height="294"
                      quality={100}
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="journey__header">{stage.header}</div>
                <div className="journey__text">{stage.text}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Journey;
