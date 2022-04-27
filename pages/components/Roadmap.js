
import Image from 'next/image'
import { gsap } from 'gsap';
import { useEffect } from 'react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import StageText from './StageText'
import { useTranslation } from 'next-i18next';


const Roadmap = () =>  {

    const {t} = useTranslation('common')

     function stageOne(stage, index) {
        var tl = gsap.timeline({scrollTrigger: {trigger:stage.selector, start: 'bottom bottom'}})
        
        var m = index % 2 === 1 ? -50 : 50
        var random = Math.round(Math.random() * 100) / 100 
   
        if(window.innerWidth >= 992) {
            tl.to(stage.selector, 1, {opacity: 1})
            tl.to(stage.selector + ' .stage-text__header', 1, {text: stage.text}, '-=1')
            tl.fromTo(stage.selector + ' .stage__image', 7, {y: 0}, {y: 50, repeat: -1, yoyo:true}, `+=${random}`)
            
        } 
        else {
            tl.to(stage.selector, 1, { opacity: 1})
            tl.to(stage.selector + ' .stage-text__header', 1, {text: stage.text}, '-=1')
            tl.fromTo(stage.selector + ' .stage__image', 7, {y: -25}, {y: 0, repeat: -1, yoyo:true}, `+=${random}`)
        }
     }

    useEffect(() => {
        // const tl = new gsap.timeline()
        gsap.registerPlugin(ScrollTrigger);
        gsap.registerPlugin(TextPlugin);
        const stages = [{selector: '.stage--one', text: t('roadmap.stageOne.header')}, {selector: '.stage--two', text: t('roadmap.stageTwo.header')}, {selector: '.stage--three', text: t('roadmap.stageThree.header')}, {selector: '.stage--four', text: t('roadmap.stageFour.header')}]

        stages.forEach((stage, i) => {
            stageOne(stage, i)
        })
    })

    return <section className="roadmap">
                <h2 className="roadmap__title title">
                    {t('roadmap.title')}
                </h2>
                <div className="stages">
                    <div className="stage stage--one">
                        
                        <div className="stage__image">
                            <Image
            
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
                        <StageText text={t('roadmap.stageOne.text')}></StageText>
                    </div>          
                    <div className="stage stage--two">
                       
                        <div className="stage__image">
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
                        <StageText text={t('roadmap.stageTwo.text')}></StageText>
                    </div>
                    <div className="stage stage--three">
                        
                        <div className="stage__image">
                        <Image
                            alt="shop"
                            src="/shop.png"
                            layout="intrinsic"
                            width="538"
                            height="420"
                            quality={100}
                            loading="lazy"
                        />
                        </div>
                        <StageText text={t('roadmap.stageThree.text')}></StageText>
                    </div>      
                    <div className="stage stage--four">
                        
                        <div className="stage__image">
                        <Image
                            alt="key"
                            src="/key.png"
                            layout="intrinsic"
                            width="538"
                            height="300"
                            quality={100}
                            loading="lazy"
                        />
                        </div>
                       <StageText text={t('roadmap.stageFour.text')}></StageText>
                    </div>                
                </div>

        </section>
}

export default Roadmap