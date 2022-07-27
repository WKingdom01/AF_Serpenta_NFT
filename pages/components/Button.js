import { faChevronDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

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
  address='',
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
          <div className="button__text">
            <div>
              {text} {children}
            </div>    
            {address!=''&&
             <div className="button__text__address">
             {address}
           </div>  }      
           
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
