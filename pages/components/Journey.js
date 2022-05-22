import Image from 'next/image'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next';




const Journey = ({ title }) => {
    const { t, i18n, ready } = useTranslation('common', { useSuspense: false });


    return <div className={`journey component js-wrapper`}>
        <div className="journey__content js-slideContainer">
            {ready && t('roadmap.stages', { returnObjects: true }).map((stage, index) => {
                return <div className="journey__stage" key={`stage--${index}`}>
                    <div className="journey__image">
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
                    </div>

                    <div className="journey__header">
                        {stage.header}
                    </div>
                    <div className="journey__text">
                        {stage.text}
                    </div>
                </div>
            })
            }
        </div>

    </div>
}

export default Journey