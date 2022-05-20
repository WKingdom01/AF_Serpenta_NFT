import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { faDiamond } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { gsap, TimelineMax } from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useTranslation } from 'next-i18next';
const Button = dynamic(() => import('./Button'))


const Stage = ({ title, body, buttonText, buttonLink, imageUrl, alt, children }) => {
    const { t } = useTranslation('common')
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        const tl = new TimelineMax()

        if (typeof window !== 'undefined' && children) {
            // Handler to call on window resize
            function handleResize() {
                // Set window width/height to state

                const section = document.querySelector('.journey--desktop .js-wrapper')
                const w = document.querySelector('.journey--desktop .js-slideContainer');

                const [x, xEnd] = ['0%', (w.scrollWidth - section.offsetWidth + 300) * -1]

                tl.fromTo(w, { x }, {
                    x: xEnd,
                    scrollTrigger: {
                        pin: true,
                        trigger: section,
                        scrub: .5,
                        start: "top 5%"
                    }
                });

            }

            // Add event listener
            window.addEventListener("resize", handleResize);

            // Call handler right away so state gets updated with initial window size
            handleResize();

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }

    })

    return <div className={`stage ${alt ? 'stage--alt' : ''} component ${children ? 'js-wrapper' : ''}`}>
        <div className={`stage__content ${children ? 'js-slideContainer' : ''}`}>
            <div className="stage__text">
                <div>
                    <h3 className="stage__title"><FontAwesomeIcon className="stage__diamond icon" icon={faDiamond}></FontAwesomeIcon>{title}</h3>
                    <div className="stage__body">{body}</div>
                </div>
                {buttonText && <div className="stage__button">
                    <Button text={buttonText} link={t('discordLink')} symbol="true" style="blue" ></Button>
                </div>}
            </div>

            <div className="stage__image">
                {children ? children :
                    <Image
                        alt="banner"
                        src={imageUrl}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        priority
                    />}
            </div>
        </div>
    </div>
}

export default Stage