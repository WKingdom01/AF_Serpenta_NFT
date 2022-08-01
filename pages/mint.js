import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ethers } from 'ethers';
import { useAccount, useConnect, useContract, useContractRead, useProvider, useSigner, useWaitForTransaction } from 'wagmi';

import Footer from './components/Footer';
import MintNavBar from './components/MintNavBar';
import PageSlot from './components/PageSlot';
import SwiperDragon from './components/SwiperDragon';

import { getWhitelistedAddresses } from '/utils/helpers/get-exported-addresses';
import getCurrentPhase from '/utils/helpers/get-current-phase';

import mintABI from '../services/abi/mint.json';
import rectIcon from '../static/rectIcon.png';
import nftImage from '../static/01.png';

import styles from '../styles/mint.module.scss';

//MerkleTree
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

export default function Mint() {
  const { t } = useTranslation('common');

  const [authorizedError, setAuthorizedError] = useState(false);
  const [etherscanLink, setEtherScanLink] = useState('');
  const [isMinted, setIsMinted] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [max_tx, setMaxTx] = useState(0);
  const [max_wallet, setMaxWallet] = useState(0);
  const [merkleProof, setMerkleProof] = useState(null);
  const [mintNum, setMintNum] = useState(3);
  const [mintPrice, setMintPrice] = useState(0);
  const [mintedNftID, setMintedNFT] = useState(0);
  const [priveTime, setPrivateTime] = useState(0);
  const [publicTime, setPublicTime] = useState(0);
  const [soldout, setSoldOut] = useState(false);
  const [totalNftID, setTotalNFT] = useState(0);

  const { data: accountData } = useAccount();
  const address = accountData?.address;
  const { isConnected } = useConnect();

  // get the end user
  const { data: signer } = useSigner();
  const provider = useProvider();

  // get the smart contract
  const contract = useContract({
    addressOrName: process.env.NEXT_PUBLIC_ANALYTICS_CONTRACT_ADDRESS,
    contractInterface: mintABI,
    signerOrProvider: signer,
  });

  const publicTimeStamp = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_ANALYTICS_CONTRACT_ADDRESS,
    contractInterface: mintABI,
    functionName: 'publicTimestamp',
  });

  const privateTimeStamp = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_ANALYTICS_CONTRACT_ADDRESS,
    contractInterface: mintABI,
    functionName: 'privateTimestamp',
  });

  const decrease = () => {
    if (mintNum > 1) {
      setMintNum(mintNum - 1);
    }
  };

  const increase = () => {
    if (mintNum < max_tx) {
      setMintNum(mintNum + 1);
    }
  };
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setIsMinted(false);
    }
  };
  const modalRef = useRef();
  const mint = async () => {
    setIsMinting(true);
    if (address === undefined) {
      setAuthorizedError(true);
    } else {
      try {
        const currentTime = Math.floor(Date.now() / 1000);
        
        const currentBalance = await contract.balanceOf(address);
        setMaxWallet(await contract.MAX_WALLET());
        if (Number(currentBalance) + mintNum < max_wallet) {
          if (currentTime < priveTime || priveTime === 0 || publicTime === 0) {
            console.log('sale has not started');
          } else if (currentTime >= priveTime && currentTime < publicTime) {
            let tx = await contract.privateMint(mintNum, merkleProof, {
              value: ethers.utils.parseEther((mintPrice * mintNum).toString()),
            });
            let receipt = await tx.wait();
            if (receipt !== null) {
              await getInfo();
              setIsMinted(true);
              setEtherScanLink(
                process.env.NEXT_PUBLIC_URL_ETHERSCAN_TX +
                  receipt['transactionHash']
              );
            }
          } else if (currentTime >= publicTime) {
            let tx = await contract.publicMint(mintNum, {
              value: ethers.utils.parseEther((mintPrice * mintNum).toString()),
            });
            let receipt = await tx.wait();
            if (receipt !== null) {
              setIsMinted(true);
              setEtherScanLink(
                process.env.NEXT_PUBLIC_URL_ETHERSCAN_TX +
                  receipt['transactionHash']
              );
            }
          } else throw new Error('Unreachable');
        } else {
          setIsMinting(false);
          console.log("you can't mint nft more than " + max_wallet);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsMinting(false);
  };

  const getInfo = useCallback(async () => {
    //MerkleTree and MerkleProof
    const leafNodes = getWhitelistedAddresses().map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {
      sortPairs: true,
    });
    setMerkleProof(merkleTree.getHexProof(keccak256(address)));
    try {
      //Mint Price
      const price = await contract.PRICE();
      // total supply
      const totalNTFCount = await contract.MAX_SUPPLY();
      //next tokenId
      const mintedNFT = await contract.totalSupply();
      // max tx
      const maxTx = await contract.MAX_TX();
      //max wallet
      const maxWallet = await contract.MAX_WALLET();
      //public time stamp
      const publictimestamp = await contract.publicTimestamp();
      const prvtimestamp = await contract.privateTimestamp();      
      setPublicTime(publictimestamp);
      setPrivateTime(prvtimestamp);
      setMintPrice(ethers.utils.formatEther(Number(price)));
      setTotalNFT(Number(totalNTFCount));
      setMintedNFT(Number(mintedNFT));
      setMaxTx(Number(maxTx));
      setMaxWallet(Number(maxWallet));
     
      if (Number(mintedNFT) === Number(totalNTFCount)) {
        setSoldOut(true);
      }
    } catch (error) {
      console.log('Getinfo_ERROR:', error);
    }
  }, [address, contract, publicTimeStamp, privateTimeStamp]);


  useEffect(() => {
    
    if (isConnected) {      
      getInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isMinted, signer]);
 
  return (
    <div style={{ background: `url('/starrybg.png')` }}>
      <PageSlot title="mint">
        <MintNavBar />
        <main>
          <div className={styles.mintContainer}>
            <div className={styles.sliderContainer}>
              <SwiperDragon />
            </div>
            <div className={styles.amountpriceWrap}>
              <div className={styles.amount}>
                <h3>{t('mint.amountLabel').toUpperCase()}</h3>
                <div className={styles.counterWrap}>
                  <div className={styles.numfield}>{mintNum}</div>
                  <div className={styles.Btnfield}>
                    <button onClick={() => decrease()}>-</button>
                    <button onClick={() => increase()}>+</button>
                  </div>
                </div>
              </div>
              <div className={styles.price}>
                <h3>{t('mint.totalPriceLabel').toUpperCase()}</h3>
                <span>{(mintPrice * mintNum).toFixed(3)} ETH</span>
              </div>
            </div>
            <div className={styles.mintProgress}>
              {soldout ? (
                <h3>{t('mint.mintingLabel').toUpperCase()}</h3>
              ) : (
                <h3>{getCurrentPhase().toUpperCase()}</h3>
              )}
              <div className={styles.progressWrap}>
                <div
                  className={styles.progressBar}
                  style={{ width: '8%' }}
                ></div>
                <span>
                  {mintedNftID}/{totalNftID}
                </span>
              </div>
            </div>
            <div className={styles.errorMessage}>
              {authorizedError && (
                <span>{t('mint.errors.authorizeLabel')}</span>
              )}
            </div>
            <div className={styles.soldErrorMessage}>
              {soldout && (
                <div>
                  <h3>{t('mint.soldOut').toUpperCase()}</h3>
                  <span>
                    {t('mint.opensea.first')}
                    <a
                      href={process.env.NEXT_PUBLIC_URL_OPENSEA_COLLECTION}
                      rel="noreferrer"
                      target="_blank"
                    >
                      opensea.io
                    </a>
                    {t('mint.opensea.second')}
                  </span>
                </div>
              )}
            </div>
            <div className={styles.mintBtn}>
              {isMinting ? (
                <button disabled>
                  MINT
                  <i className="fa fa-spinner fa-spin" />
                  ING
                </button>
              ) : getCurrentPhase().includes('soon') && process.env.NEXT_PUBLIC_DEVELOPMENT=='0' ? (
                <button
                  onClick={() => mint()} className={isConnected&&styles.connected} disabled>
                  MINT
                </button>
              ) : (
                <button onClick={() => mint()}className={isConnected&&styles.connected}>MINT</button>
              )}
            </div>
          </div>
        </main>
        <Footer />

        {isMinted ? (
          <div
            className={styles.getHelpContainer}
            onClick={closeModal}
            ref={modalRef}
          >
            <div className={styles.mintNFTWarp}>
              <div className={styles.mintedNFT}>
                <Image src={nftImage} alt="mint" />
              </div>
              <div className={styles.mintText}>
                {mintNum === 1 ? (
                  <span>
                    {t('mint.minted')} <br></br>
                    {t('mint.1minted')}
                  </span>
                ) : (
                  <span>
                    {t('mint.minted')} <br></br>[{mintNum}] {t('mint.mminted')}
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
                    <h3>sell and trade</h3>
                  </div>
                  <Link href="https://testnets.opensea.io/collection/serpenta">
                    <a target="_blank" rel="noopener noreferrer">
                      Open Sea
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
                    <h3>share</h3>
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
                  <Link href={etherscanLink}>
                    <a target="_blank" rel="noopener noreferrer">
                      {t('mint.etherScan')}
                    </a>
                  </Link>
                </div>
              </div>
              <div className={styles.mintBtn}>
                <button onClick={() => setIsMinted(false)}>
                  {t('mint.mintAuthor').toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </PageSlot>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
