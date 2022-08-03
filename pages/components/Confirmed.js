import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import rectIcon from '/static/rectIcon.png';
import nftImage from '/static/01.png';

import btnNext from '/public/next.png'
import btnPrev from '/public/previous.png'

import {DragonArray} from '/data/stakeData.js'

import styles from '/styles/mint.module.scss';


const Confirmed = ({mintNum, etherscanLink, setIsMinted}) => {
  const { t } = useTranslation('common');
  const [isCheckouts, setCheckout] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const onClickNext = () =>{
    let tmp = imgIndex+1;
    if(tmp==4) {tmp=0}
    setImgIndex(tmp);
  }
  const onClickPrev = () =>{
    let tmp = imgIndex-1;
    if(tmp==-1) (tmp=3)
    setImgIndex(tmp);
  }

    return(
       <div>
        {
          !isCheckouts?
            <div className={styles.mintedNFTWrap}>
                  <div className={styles.mintNFTWarp}>
                    <div className={styles.mintedNFT}>
                      <div className={styles.img}>
                        <Image src={DragonArray[imgIndex].src} alt={DragonArray[imgIndex].alt} layout='fill'/>
                      </div>  
                                    
                    </div>
                    <div className={styles.controlButtons}>
                        {
                          /*
                            <button>
                              <Image src={btnPrev} alt='Button Icon' onClick={onClickPrev}/>
                            </button>
                            <div className={styles.numbers}>{imgIndex+1+'/4'}</div>
                            <button >
                              <Image src={btnNext} alt='Button Icon' onClick={onClickNext}/>
                            </button>
                          */
                        }
                        <div className={styles.numbers}>{t('mint.confirm.congratulation')}</div>
                        
                      </div>  
                    <div className={styles.mintText}>
                      {mintNum === 1 ? (
                        <span>
                          {t('mint.confirm.minted')} <br></br>
                          {t('mint.confirm.1minted')}
                        </span>
                      ) : (
                        <span>
                           {t('mint.confirm.minted')} <br></br>[{mintNum}] {t('mint.mminted')}
                        </span>
                      )}
                    </div>
                    <div className={styles.mintSocial}>
                      <div className={styles.mintTrade}>
                        <div className={styles.mintHead}>
                          <div className={styles.mintRectIcon}>
                            <Image
                              src={rectIcon}
                              width="15px"
                              height="15px"
                              alt="rectIcon"
                            />
                          </div>
                          <h3>{t('mint.confirm.buymore')}</h3>
                        </div>
                        <Link href="https://testnets.opensea.io/collection/serpenta">
                          <a target="_blank" rel="noopener noreferrer">
                            OpenSea
                          </a>
                        </Link>
                      </div>
                      <div className={styles.mintTwitter}>
                        <div className={styles.mintHead}>
                          <div className={styles.mintRectIcon}>
                            <Image
                              src={rectIcon}
                              width="15px"
                              height="15px"
                              alt="rectIcon"
                            />
                          </div>
                          <h3>{t('mint.confirm.share')}</h3>
                        </div>
                        <Link href="https://twitter.com/SerpentaNFT">
                          <a target="_blank" rel="noopener noreferrer">
                            Twitter
                          </a>
                        </Link>
                      </div>
                      <div className={styles.mintEther}>
                        <div className={styles.mintHead}>
                          <div className={styles.mintRectIcon}>
                            <Image
                              src={rectIcon}
                              width="15px"
                              height="15px"
                              alt="rectIcon"
                            />
                          </div>
                          <h3>{t('mint.transactionConfirm')}</h3>
                        </div>
                        <Link href={process.env.NEXT_PUBLIC_URL_ETHERSCAN_TX + etherscanLink}>
                          <a target="_blank" rel="noopener noreferrer">
                            {t('mint.etherScan')}
                          </a>
                        </Link>
                      </div>
                    </div>
                    
                    <div className={styles.mintBtn}>
                      <button onClick={() => setCheckout(true)}>
                        {t('mint.mintAuthor').toUpperCase()}
                      </button>
                    </div>
                  </div>
            </div>
          :
            <div className={styles.checkoutWrap}>              
                <div className={styles.contentWrap}>
                  <h1>{t('mint.confirm.check')}</h1>
                 
                  <table>
                    <thead></thead>
                    <tbody>
                    <tr>
                      <td className={styles.type}>{t('mint.confirm.yfund').toUpperCase()}</td>
                      <td className={styles.amount}>{`[${t('mint.confirm.yfund').toUpperCase()}]`}</td>
                    </tr>
                    <tr>
                      <td className={styles.type}>{t('mint.confirm.quantity').toUpperCase()}</td>
                      <td className={styles.amount}>[5]</td>
                    </tr>
                    <tr>
                      <td className={styles.type}>{t('mint.confirm.subtotal').toUpperCase()}</td>
                      <td className={styles.amount}>[X.XX ETH]</td>
                    </tr>
                    <tr>
                      <td className={styles.type}>{t('mint.confirm.egf').toUpperCase()}</td>
                      <td className={styles.amount}>{`[X.XXXXXX ${t('mint.confirm.value').toUpperCase()}]`}</td>
                    </tr>
                    <tr className={styles.total}>
                      <td className={styles.type}>{t('mint.confirm.total').toUpperCase()}</td>
                      <td className={styles.amount}>{`[X.XXXXXX ${t('mint.confirm.value').toUpperCase()}]`}</td>
                    </tr>
                    </tbody>
                    <tfoot></tfoot>
                    
                  </table>

                  <h3> {t('mint.confirm.confirmReq')}</h3>        
                  <div className={styles.mintBtn}>
                      <button onClick={() => setIsMinted(false)}>
                        {t('mint.confirm.tomint').toUpperCase()}
                      </button>
                  </div>      
                </div>
            </div>
        }
        </div>
        
      
        
         
    )
}
export default Confirmed;