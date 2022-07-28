import { faChevronDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Image from 'next/image';



import metamask from '/public/metamask.png';
import walletconnect from '/public/walletconnect.png';
import coinbase from '/public/coinbase.png';

const Button = ({
  text,
  link,
  disabled = false,
  title,
  active,
  dropdown,
  style = 'gray',
  clickHandler,
  symbol,
  children,
  address,
  icon,
}) => {
  const [clicked, setClick] = useState(false);
  const [hovered, setHover] = useState(false);
  return (
    <div className={`button-container ${style}`}>
      {!link && (
        <button
          className={`button button--${clicked ? 'clicked' : ''}`}
          onClick={clickHandler}
          title={title ?? text}
          disabled={disabled}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className={address?"button__textaddress":"button__text"}>
            <div>
              {text} {children}
            </div>   
            {address&&
             <div className={"button__textaddress__address"}>
                {address}
              </div>  } 
            {icon&&<div className="icon">{icon.includes('Meta')?<Image src={metamask} alt='icon' width='32px' height='32px' layout='fixed'/>
            :icon.includes('Connect')?<Image src={walletconnect} alt='icon' width='32px' height='32px' layout='fixed'/>
            :<Image src={coinbase} alt='icon' width='32px' height='32px' layout='fixed'/>}</div>
              
            } 
                
           
            {dropdown && (
              <div>
                <FontAwesomeIcon className="icon" icon={faChevronDown} />
              </div>
            )}
          </div>          
        </button>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className={`button button--${clicked ? 'clicked' : ''}`}
          onMouseDown={() => {
            setClick(true);
          }}
          onMouseUp={() => {
            setClick(false);
          }}
          title={title ?? text}
          disabled={disabled}
        >
          <div className="button__text">
            {text} {children}
            {symbol && (
              <div>
                <FontAwesomeIcon className="icon" icon={faArrowRight} />
              </div>
            )}
          </div>
        </a>
      )}
      
    </div>
  );
};

export default Button;
