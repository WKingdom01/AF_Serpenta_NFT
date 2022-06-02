
import { faChevronDown, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react';

const Button = ({ text, link, active, dropdown, style = 'gray', clickHandler, symbol }) => {
    const [clicked, setClick] = useState(false)

    return (
        <div className={`button-container ${style}`}>
            {!link &&
                <button className={`button button--${clicked ? 'clicked' : ''}`} onMouseDown={() => { setClick(true) }} onMouseUp={() => { setClick(false) }} onClick={clickHandler}>
                    <div className="button__text">
                        <div>{text}</div>
                        {dropdown && <div><FontAwesomeIcon className="icon" icon={faChevronDown} /></div>}
                    </div>
                </button>
            }
            {link && <a href={link} target="_blank" rel="noreferrer" className={`button button--${clicked ? 'clicked' : ''}`} onMouseDown={() => { setClick(true) }} onMouseUp={() => { setClick(false) }}>

                <div className="button__text">
                    {text}
                    {symbol && <div><FontAwesomeIcon className="icon" icon={faArrowRight} /></div>}

                </div>

            </a>}
        </div>
    )



}

export default Button