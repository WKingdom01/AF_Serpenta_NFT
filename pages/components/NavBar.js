import dynamic from 'next/dynamic'

const Button = dynamic(() =>  import( './Button'));

import React, { useState, useEffect } from 'react';
import throttle from 'lodash/throttle';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

var lastScrollTop = 0;

const NavBar = () => {

  const [open, setOpen] = useState(false)
  const [fixed, setFixed] = useState(false)
  const [hide, setHide] = useState(false)
  // const [lastScrollTop, setLastScrollTop] = useState(0)
 

  const handleScroll = () => {
   
    
      var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop || st === 0){
       // downscroll code
       setHide(false)
    } else {
       // upscroll code
       setHide(true)
    }
   


    if (window.pageYOffset > 0) {
      // document.querySelector('.navbar--static').addClass('navbar-fixed');
      setFixed(true)
    } else {
      setFixed(false)
    }
    
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
   
  }

  const keyDown = (e) => {
    if(e.key === "Escape") {
      setOpen(false)
    }
  }


  useEffect(() => { 
    if(window.innerWidth >= 992) {
      handleScroll()
    } else {
      if(!fixed) {
        setFixed(true)
      }
      if(hide) {
        setHide(false)
      }
    }
      // window.addEventListener('resize', (event) => {  
      //   if(window.innerWidth >= 992) {

      //       desktop();
          
            
      //   } 
      //   else {
      //       mobile()
            
      //   }
      // });
      document.addEventListener('keydown', keyDown);

      window.addEventListener('scroll', handleScroll);
      return () => {window.removeEventListener('scroll', handleScroll); document.removeEventListener('keydown', keyDown)};
    });
  
  return (
    <nav>
      <div className={`navbar ${hide ? 'navbar--hide' :'' } ${fixed ? 'navbar--fixed' :'' } ${open ? 'navbar--open' : ''}`}>
          <div className="navbar__toggle">
          <button onClick={()=>setOpen(!open)}>
            <FontAwesomeIcon className="navbar__icon icon" icon={open ? faClose : faBars} />
          </button>
          </div>
          <div className="navbar__list">
              
              <li><Button link="/" text="Open Sea"></Button></li> 
              <li><Button link="https://twitter.com/SerpentaNFT"  text="Twitter"></Button></li>
              <li><Button link="https://discord.gg/serpentaNFT" style="gold" text="Discord"></Button></li>
              {/* <li><Button text="connect" style="gold"></Button></li> */}
              
          </div>
      </div>
    
    </nav>
  )}

export default NavBar