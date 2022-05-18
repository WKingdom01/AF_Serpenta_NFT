import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { faDiamond } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
const Button = dynamic(() => import('./Button'))


const Stage = ({ title, body, buttonText, buttonLink, imageUrl, alt, children }) => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const section = document.querySelector('.js-wrapper')
        const w = document.querySelector('.js-slideContainer');
        console.log(w.scrollWidth, section.offsetWidth)
        const [x, xEnd] = ['0%', (w.scrollWidth - section.offsetWidth) * -1]
        gsap.fromTo(w, { x }, {
            x: xEnd,
            scrollTrigger: {
                pin: true,
                trigger: section,
                scrub: .5,
                start: "bottom 80%"
            }
        });



    })

    return <div className={`stage ${alt ? 'stage--alt' : ''} component ${children ? 'js-wrapper' : ''}`}>
        <div className={`stage__content ${children ? 'js-slideContainer' : ''}`}>
            <div className="stage__text">
                <div>
                    <h3 className="stage__title"><FontAwesomeIcon className="stage__diamond icon" icon={faDiamond}></FontAwesomeIcon>{title}</h3>
                    <div className="stage__body">{body}</div>
                </div>
                {buttonText && <div className="stage__button">
                    <Button text={buttonText} style="blue" link={buttonLink}></Button>
                </div>}
            </div>

            <div className="stage__image">
                {children ? children :
                    <Image
                        alt="banner"
                        src={imageUrl}
                        layout="fill"
                        objectFit="contain"
                        quality={100}
                        priority
                    />}
            </div>
        </div>
    </div>
}

export default Stage