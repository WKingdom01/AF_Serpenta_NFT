import Image from 'next/image'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next';




const Journey = ({ title }) => {
    const { t } = useTranslation('common')


    return <div className={`journey component js-wrapper`}>
        <div className="journey__content js-slideContainer">
            <div className="journey__stage">
                <div className="journey__image">
                    <Image
                        className="journey__image"
                        alt="town"
                        src="/town.png"
                        layout="intrinsic"
                        // object-fit="cover"
                        width="538"
                        height="400"
                        quality={100}
                        loading="lazy"
                    />
                </div>

                <div className="journey__header">
                    {t('roadmap.stageOne.header')}
                </div>
                <div className="journey__text">
                    {t('roadmap.stageOne.text')}
                </div>
            </div>
            <div className="journey__stage">
                <div className="journey__image">
                    <Image

                        alt="castle"
                        src="/castle.png"
                        layout="intrinsic"
                        width="590"
                        height="380"
                        quality={100}
                        loading="lazy"
                    />
                </div>
                <div className="journey__header">
                    {t('roadmap.stageTwo.header')}
                </div>
                <div className="journey__text">
                    {t('roadmap.stageTwo.text')}
                </div>
            </div>
            <div className="journey__stage">
                <   div className="journey__image">
                    <Image
                        className="journey__image"
                        alt="shop"
                        src="/shop.png"
                        layout="intrinsic"
                        width="538"
                        height="420"
                        quality={100}
                        loading="lazy"
                    />
                </div>
                <div className="journey__header">
                    {t('roadmap.stageThree.header')}
                </div>
                <div className="journey__text">
                    {t('roadmap.stageThree.text')}
                </div>
            </div>
            <div className="journey__stage">
                <div className="journey__image">
                    <Image
                        className="journey__image"
                        alt="key"
                        src="/key.png"
                        layout="intrinsic"
                        width="538"
                        height="300"
                        quality={100}
                        loading="lazy"
                    />
                </div>
                <div className="journey__header">
                    {t('roadmap.stageFour.header')}
                </div>
                <div className="journey__text">
                    {t('roadmap.stageFour.text')}
                </div>
            </div>
        </div>

    </div>
}

export default Journey