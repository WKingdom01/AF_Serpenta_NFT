import { faArrowRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  icon = '',
  isCon,
  nextLink,
  lowerCase = false,
}) => {
  const [clicked, setClick] = useState(false);

  const ConnectWalletButton = ({ icon }) => {
    switch (icon) {
      case 'MetaMask':
        return (
          <>
            <div className="iconwallet">
              <Image
                src={metamask}
                alt="icon"
                width="32px"
                height="32px"
                layout="fixed"
              />
            </div>
            <div className="wallettext">MetaMask Wallet</div>
          </>
        );
      case 'WalletConnect':
        return (
          <>
            <div className="iconwallet">
              <Image
                src={walletconnect}
                alt="icon"
                width="32px"
                height="32px"
                layout="fixed"
              />
            </div>
            <div className="wallettext">WalletConnect</div>
          </>
        );
      case 'Coinbase Wallet':
        return (
          <>
            <div className="iconwallet">
              <Image
                src={coinbase}
                alt="icon"
                width="32px"
                height="32px"
                layout="fixed"
              />
            </div>
            <div className="wallettext">Coinbase Wallet</div>
          </>
        );
      default:
        return  (
          <>
            <div className="iconwallet">
              <Image
                src={metamask}
                alt="icon"
                width="32px"
                height="32px"
                layout="fixed"
              />
            </div>
            <div className="wallettext">Please install Metamask</div>
          </>
        );
    }
  };

  return (
    <div className={`button-container ${style}`}>
      {!link && !nextLink && (
        <button
          className={`button button--${clicked ? 'clicked' : ''}`}
          onClick={clickHandler}
          title={title ?? text}
          disabled={disabled}
        >
          <div
            className={
              isCon
                ? 'button__textaddress'
                : `button__text ${lowerCase ? 'button__text--lowercase' : ''}`
            }
          >
            {icon ? (
              <ConnectWalletButton icon={icon} />
            ) : (
              <div>
                {text} {children}
              </div>
            )}
            {address && (
              <div className="button__textaddress__address">{address}</div>
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
        >
          <div
            className={`button__text ${
              lowerCase ? 'button__text--lowercase' : ''
            }`}
          >
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
          <a href={nextLink}>
            <div className={`button button--${clicked ? 'clicked' : ''}`}>
              <div
                className={`button__text ${
                  lowerCase ? 'button__text--lowercase' : ''
                }`}
              >
                {text} {children}
                {symbol && (
                  <div>
                    <FontAwesomeIcon className="icon" icon={faArrowRight} />
                  </div>
                )}
              </div>
            </div>
          </a>
        </Link>
      )}
    </div>
  );
};

export default Button;
