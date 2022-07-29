import { faArrowRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Image from 'next/image';

import metamask from '/public/metamask.png';
import walletconnect from '/public/walletconnect.png';
import coinbase from '/public/coinbase.png';
import Link from 'next/link';

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
  icon="",
  isCon,
  nextLink,
}) => {
  const [clicked, setClick] = useState(false);
  const [hovered, setHover] = useState(false);
  if (address == 'x') {
    console.log(address);
  }
  return (
    <div className={`button-container ${style}`}>
      {!link && !nextLink && (
        <button
          className={`button button--${clicked ? 'clicked' : ''}`}
          onClick={clickHandler}
          title={title ?? text}
          disabled={disabled}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className={isCon ? 'button__textaddress' : 'button__text'}>
            {icon && (
              <div className="iconwallet">
                {icon.includes('Meta') ? (
                  <Image
                    src={metamask}
                    alt="icon"
                    width="32px"
                    height="32px"
                    layout="fixed"
                  />
                ) : icon.includes('Connect') ? (
                  <Image
                    src={walletconnect}
                    alt="icon"
                    width="32px"
                    height="32px"
                    layout="fixed"
                  />
                ) : (
                  <Image
                    src={coinbase}
                    alt="icon"
                    width="32px"
                    height="32px"
                    layout="fixed"
                  />
                )}
              </div>
            )}
            {icon.length> 0?
                <div className="wallettext">
                {icon.includes('Meta') ? (
                  <span>Metamask Wallet</span>
                ) : icon.includes('Connect') ? (
                  <span>WalletConnect</span>

                ) : (
                  <span> Coinbase Wallet</span>

                )}
              </div>
              :
              <div>
                {text} {children}
             </div>


            }

            {address&& (
              <div className={'button__textaddress__address'}>{address}</div>
            )}


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
      {nextLink && (
        <Link href={nextLink} passHref>
          <div className={`button button--${clicked ? 'clicked' : ''}`}>
            <div className="button__text">
              {text} {children}
              {symbol && (
                <div>
                  <FontAwesomeIcon className="icon" icon={faArrowRight} />
                </div>
              )}
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Button;
