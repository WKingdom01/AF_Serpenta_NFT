
import Image from 'next/image'
import { gsap } from 'gsap';
import { useEffect } from 'react';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import StageText from './StageText'


const Roadmap = () =>  {


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
        gsap.registerPlugin(ScrollTrigger);
        gsap.registerPlugin(TextPlugin);
        const stages = [{selector: '.stage--one', text: 'The Hatchery'}, {selector: '.stage--two', text: 'Quest for treasure'}, {selector: '.stage--three', text: 'Breeding Grounds'}, {selector: '.stage--four', text: 'The Great Void'}]

        stages.forEach((stage, i) => {
            stageOne(stage, i)
        })
    })

    return <section className="roadmap">
                <h2 className="roadmap__title title">
                    Roadmap
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
                        <StageText text="The Serpenta Dragons’ birthplace, a holy domain where all the eggs are gathered together and blessed. Minting occurs late April 2022 in two phases. An initial phase for the chosen, and a public phase for the subsequent unwashed masses. Each wallet for the chosen - the whitelist - will be allowed up to 2 eggs. Hatching will take place after all the eggs have been claimed."></StageText>
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
                        <StageText text="Post-hatching, we learn that Dragons are naturally curious creatures and they can be sent out to hunt (stake) treasure in all its forms. Mostly you will discover pockets of gold, but in very rare cases you may happen upon other unexpected treasures too. It has been rumored that the more dragons you send out to hunt, the greater the chance for rarer drops."></StageText>
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
                        <StageText text="Dragons’ gold has been found to augment and accelerate the birth of the next generation. With so many being sent to explore unknown worlds through the Great Void, the urgency to repopulate the land has lead to the Council leaders experimenting with long-abandoned rituals. What hybrids have been grown in the dark breeding grounds?"></StageText>
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
                       <StageText text="Every dragon that returns through the Great Void has new discoveries to report to the Council. What new decisions will be brought to the citizenry of the land and how will these wonders, or threats be dealt with?"></StageText>
                    </div>                
                </div>

        </section>
}

export default Roadmap