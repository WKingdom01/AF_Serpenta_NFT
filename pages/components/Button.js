import Image from 'next/image'

import React, { useState } from 'react';

const Button = ({text, link, style = 'gray'}) =>  {
    const [clicked, setClick] = useState(false)

    const images = {
        gold: {
            pressed: '/gold_pressed.png',
            unpressed: '/gold_unpressed.png'
        },
        gray: {
            pressed: '/gray_pressed.png',
            unpressed: '/gray_unpressed.png'
        }
    }

//  style={{backgroundImage: 'url(/gray_unpressed.png)'}}

   return ( 
        <div className={`button-container ${style}`}>
        {!link && 
            <button className={`button button--${clicked ? 'clicked' : ''}`} onMouseDown={() => {setClick(true)}} onMouseUp={() => {setClick(false)}} >
                {!clicked && <Image 
                    alt="button"
                    src={images[style].unpressed}
                    layout="intrinsic"
                    width="256"
                    height="118"
                    quality={100}
                    priority>
                </Image>
                }
                {clicked && <Image 
                    alt="button"
                    src={images[style].pressed}
                    layout="intrinsic"
                    width="256"
                    height="118"
                    quality={100}
                    priority>
                    </Image>}
                <div className="button__text">
                    {text}
                </div>
            </button>
        }
            {link && <a href={link} className={`button button--${clicked ? 'clicked' : ''}`} onMouseDown={() => {setClick(true)}} onMouseUp={() => {setClick(false)}} >
                <div>
                    {!clicked && <Image 
                        alt="button"
                        src={images[style].unpressed}
                        layout="intrinsic"
                        width="256"
                        height="118"
                        quality={100}
                        priority>
                    </Image>}
                    {clicked && <Image 
                        alt="button"
                        src={images[style].pressed}
                        layout="intrinsic"
                        width="256"
                        height="118"
                        quality={100}
                        priority>
                    </Image>}
                    <div className="button__text">
                        {text}
                    </div>
                </div>
            </a>}
        </div>
    )
       
 

}

export default Button