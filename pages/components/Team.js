import { useTranslation } from 'next-i18next'
import Image from 'next/image'

const Team = () => {
    const {t} = useTranslation('common')
  return  (
  <section className="team component">
      
      <div className="container team__container">
      <h2 className="team__title title">{t('team.title')}</h2>
    <div className="team__members">
    <div className="team__member">
        
        <div className="team__image">
            <Image
                alt="dragon"
                src={t('team.memberOne.image')}
                layout="intrinsic"
                width="200"
                height="200"
                quality={100}
                loading="lazy"
                />
        </div>
        <div className="team__text">
            <h2> {t('team.memberOne.name')}</h2>
            <h3>{t('team.memberOne.title')}</h3> 
            <p> {t('team.memberOne.description')}</p> 
            <a className="team__twitter" href="https://twitter.com/cryptpine" target="_blank" rel="noreferrer">
                <Image
                    alt="twitter"
                    src="/twitter.svg"
                    layout="intrinsic"
                    width="121"
                    height="100"
                    quality={100}
                    loading="lazy"
                    />
            </a>
        </div>
    </div>
    <div className="team__member">
        <div className="team__image">
            <Image
                alt="dragon"
                src={t('team.memberTwo.image')}
                layout="intrinsic"
                width="200"
                height="200"
                quality={100}
                loading="lazy"
                />
        </div>
        <div className="team__text">
            <h2> {t('team.memberTwo.name')}</h2>
            <h3>{t('team.memberTwo.title')}</h3> 
            <p> {t('team.memberTwo.description')}</p> 
            <a className="team__twitter" href="https://twitter.com/miaoux" target="_blank" rel="noreferrer">
                <Image
                    alt="twitter"
                    src="/twitter.svg"
                    layout="intrinsic"
                    width="121"
                    height="100"
                    quality={100}
                    loading="lazy"
                    />
            </a>
        </div>
    </div>
    <div className="team__member">
        <div className="team__image">
            <Image
                alt="dragon"
                src={t('team.memberThree.image')}
                layout="intrinsic"
                width="200"
                height="200"
                quality={100}
                loading="lazy"
                />
        </div>
        <div className="team__text">
            <h2> {t('team.memberThree.name')}</h2>
            <h3>{t('team.memberThree.title')}</h3> 
            <p> {t('team.memberThree.description')}</p> 
            <a className="team__twitter" href="https://twitter.com/remimoth" target="_blank" rel="noreferrer">
                <Image
                    alt="twitter"
                    src="/twitter.svg"
                    layout="intrinsic"
                    width="121"
                    height="100"
                    quality={100}
                    loading="lazy"
                    />
            </a>
        </div>
    </div>
    <div className="team__member">
        <div className="team__image">
            <Image
                alt="Logo"
                src={t('team.memberFour.image')}
                layout="intrinsic"
                width="200"
                height="200"
                quality={100}
                loading="lazy"
                />
        </div>
        <div className="team__text">
            <h2> {t('team.memberFour.name')}</h2>
            <h3>{t('team.memberFour.title')}</h3> 
            <p> {t('team.memberFour.description')}</p> 
            <a className="team__twitter" href="https://twitter.com/danipopes" target="_blank" rel="noreferrer">
                <Image
                    alt="twitter"
                    src="/twitter.svg"
                    layout="intrinsic"
                    width="121"
                    height="100"
                    quality={100}
                    loading="lazy"
                    />
            </a>
        </div>
    </div>
    </div>
    </div>
  </section>
)}

export default Team