import Image from 'next/image'

import React, { useState } from 'react';

const Button = ({text, link, style = 'gray', clickHandler}) =>  {
    const [clicked, setClick] = useState(false)

   return ( 
        <div className={`button-container ${style}`}>
        {!link && 
            <button className={`button button--${clicked ? 'clicked' : ''}`} onMouseDown={() => {setClick(true)}} onMouseUp={() => {setClick(false)}} onClick={clickHandler}>
                <div className="button__text">
                    {text}
                </div>
            </button>
        }
            {link && <a href={link} className={`button button--${clicked ? 'clicked' : ''}`} onMouseDown={() => {setClick(true)}} onMouseUp={() => {setClick(false)}}>
               
                <div className="button__text">
                    {text}
                </div>
       
            </a>}
        </div>
    )
       
 

}

export default Button