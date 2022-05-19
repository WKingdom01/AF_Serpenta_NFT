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


        if (typeof window !== 'undefined' && children) {
            // Handler to call on window resize
            function handleResize() {
                // Set window width/height to state
                var getBreakpoint = function () {
                    return window.getComputedStyle(document.body, ':before').content;
                };

                console.log(getBreakpoint(), getBreakpoint() === '"desktop"')

                if (getBreakpoint() === '"desktop"') {
                    const section = document.querySelector('.js-wrapper')
                    const w = document.querySelector('.js-slideContainer');
                    console.log(w.scrollWidth, section.offsetWidth, (w.scrollWidth - section.offsetWidth) * -1)
                    const [x, xEnd] = ['0%', (w.scrollWidth - section.offsetWidth + 300) * -1]
                    gsap.fromTo(w, { x }, {
                        x: xEnd,
                        scrollTrigger: {
                            pin: true,
                            trigger: section,
                            scrub: .5,
                            start: "top 20%"
                        }
                    });
                } else {
                    gsap.fromTo(document.querySelector('.js-slideContainer')).kill()
                }
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