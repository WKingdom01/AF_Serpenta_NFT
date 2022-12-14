import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OPENSEA_URL } from '../../data/constants';
import { useFeatureToggle } from '../../hooks/useFeatureToggle';

const Button = dynamic(() => import('./Button'));
const LanguageSelect = dynamic(() => import('./LanguageSelect'));

let lastScrollTop = 0;

const NavBar = () => {
  const [isEnabled] = useFeatureToggle();
  const [open, setOpen] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [hide, setHide] = useState(false);
  const { t } = useTranslation('common');

  const handleScroll = () => {
    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop || st === 0) {
      // downscroll code
      setHide(false);
    } else {
      // upscroll code
      setHide(true);
    }

    if (window.pageYOffset > 0) {
      setFixed(true);
    } else {
      setFixed(false);
    }

    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  };

  const keyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth >= 992) {
      handleScroll();
    } else {
      if (!fixed) {
        setFixed(true);
      }
      if (hide) {
        setHide(false);
      }
    }
    document.addEventListener('keydown', keyDown);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', keyDown);
    };
  }, [fixed, hide]);

  return (
    <nav>
      <div className={`navbar ${open ? 'navbar--open' : ''}`}>
        <div className="navbar__toggle">
          <button onClick={() => setOpen(!open)}>
            <FontAwesomeIcon
              className="navbar__icon icon"
              icon={open ? faClose : faBars}
            />
          </button>
        </div>
        <div className="navbar__language-toggle"></div>
        <ul className="navbar__list">
          <li className="navbar__button-item">
            <Button
              style="ThreeD"
              nextLink={OPENSEA_URL}
              text={t('navbar.linkOneText')}
            ></Button>
          </li>
          {isEnabled('profile') && (
            <li className="navbar__button-item">
              <Button
                style="ThreeD"
                nextLink="/profile"
                text={t('navbar.linkCheckText')}
              ></Button>
            </li>
          )}
          {isEnabled('mint') && (
            <li className="navbar__button-item">
              <Button
                style="ThreeD"
                nextLink="/mint"
                text={t('navbar.linkMintText')}
              ></Button>
            </li>
          )}
          {/* <li><Button text="connect" style="gold"></Button></li> */}
          <li className="navbar__button-item">
            <LanguageSelect></LanguageSelect>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
