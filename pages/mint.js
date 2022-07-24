import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import styles from "../styles/mint.module.scss";

import { useTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Images
import GetHelpIcon from "../static/Question-icon.png";
import Logo from "../static/main-logo.png";
import CloseIcon from "../static/Close-icon.png";
import rectIcon from "../static/rectIcon.png";
//temp image
import nftImage from "../static/01.png";

//wagmi react hook
import { ethers } from "ethers";
import {
  useConnect,
  useAccount,
  useDisconnect,
  useContractRead,
  useContract,
  useSigner,
  useProvider,
} from "wagmi";
//contract
import mintABI from "../services/abi/mint.json";
//whitelist address
import whitelistAddress from "../public/static/whitelisted-wallets.json";
//Components

const SwiperDragon = dynamic(() => import("./components/SwiperDragon"));
const Footer = dynamic(() => import("./components/Footer"));
const PageSlot = dynamic(() => import("./components/PageSlot"));
const MintNavBar = dynamic(() => import("./components/MintNavBar"));
//MerkleTree
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
let whitelistOnlyAddress = [];
const getWhitelistOnlyAddress = () => {
  whitelistAddress.map((item) =>
    whitelistOnlyAddress.push(item.wallet_address)
  );
};
getWhitelistOnlyAddress();
export default function Mint() {
  const { t } = useTranslation("common");

  const [showWalletModal, setShowWalletModal] = useState(false);

  const [authorizedError, setAuthorizedError] = useState(false);
  const [soldout, setSoldOut] = useState(false);

  const [mintNum, setMintNum] = useState(3);
  const [totalNftID, setTotalNFT] = useState(0);
  const [mintedNftID, setMintedNFT] = useState(0);
  const [max_tx, setMaxTx] = useState(0);
  const [max_wallet, setMaxWallet] = useState(0);
  const [merkleProof, setMerkleProof] = useState(null);
  const [mintPrice, setMintPrice] = useState(0);
  const [priveTime, setPrivateTime] = useState(0);
  const [publicTime, setPublicTime] = useState(0);
  const [isMinting, setIsMinting] = useState(0);
  const [isMinted, setIsMinted] = useState(false);
  const [etherscanLink, setEtherScanLink] = useState("");

  const { data: accountData } = useAccount();
  const address = accountData?.address;
  const { isConnected } = useConnect();

  // get the end user
  const { data: signer, isError, isLoadings } = useSigner();
  const provider = useProvider();

  // get the smart contract
  const contract = useContract({
    addressOrName: process.env.NEXT_PUBLIC_ANALYTICS_CONTRACT_ADDRESS,
    contractInterface: mintABI,
    signerOrProvider: provider,
  });

  const publicTimeStamp = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_ANALYTICS_CONTRACT_ADDRESS,
    contractInterface: mintABI,
    functionName: "publicTimestamp",
  });

  const privateTimeStamp = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_ANALYTICS_CONTRACT_ADDRESS,
    contractInterface: mintABI,
    functionName: "privateTimestamp",
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

  const mint = async () => {
    setIsMinting(true);
    if (address == undefined) {
      setAuthorizedError(true);
    } else {
      try {
        const currentTime = Math.floor(Date.now() / 1000);
        let contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_ANALYTICS_CONTRACT_ADDRESS,
          mintABI,
          signer
        );
        const currentBalance = await contract.balanceOf(address);

        if (Number(currentBalance) + mintNum < max_wallet) {
          if (currentTime < priveTime || priveTime === 0 || publicTime === 0) {
            console.log("sale has not started");
          } else if (currentTime >= priveTime && currentTime < publicTime) {
            let tx = await contract.privateMint(mintNum, merkleProof, {
              value: ethers.utils.parseEther((mintPrice * mintNum).toString()),
            });
            let receipt = await tx.wait();
            if (receipt !== null) {
              getInfo();
              setIsMinted(true);
              setEtherScanLink(
                process.env.NEXT_PUBLIC_URL_ETHERSCAN_TX +
                  receipt["transactionHash"]
              );
            }
          } else if (currentTime >= publicTime) {
            let tx = await contract.publicMint(mintNum, {
              value: ethers.utils.parseEther((mintPrice * mintNum).toString()),
            });
            let receipt = await tx.wait();
            if (receipt !== null) {
              getInfo();
              setIsMinted(true);
              setEtherScanLink(
                process.env.NEXT_PUBLIC_URL_ETHERSCAN_TX +
                  receipt["transactionHash"]
              );
            }
          } else throw new Error("Unreachable");
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

  const getInfo = async () => {
    //MerkleTree and MerkleProof
    const leafNodes = whitelistOnlyAddress.map((addr) => keccak256(addr));
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

      setMintPrice(ethers.utils.formatEther(Number(price)));
      setTotalNFT(Number(totalNTFCount));
      setMintedNFT(Number(mintedNFT));
      setPublicTime(Number(publicTimeStamp.data));
      setPrivateTime(Number(privateTimeStamp.data));
      setMaxTx(Number(maxTx));
      setMaxWallet(Number(maxWallet));

      if (Number(mintedNFT) === Number(totalNTFCount)) {
        setSoldOut(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      getInfo();
    }
  }, [isConnected]);

  return (
    <div style={{ background: `url('/starrybg.png')` }}>
      <PageSlot>
        <MintNavBar />
        <main>
          <div className={styles.mintContainer}>
            <div className={styles.sliderContainer}>
              <SwiperDragon />
            </div>
            <div className={styles.amountpriceWrap}>
              <div className={styles.amount}>
                <h3>{t("mint.amountLabel").toUpperCase()}</h3>
                <div className={styles.counterWrap}>
                  <div className={styles.numfield}>{mintNum}</div>
                  <div className={styles.Btnfield}>
                    <button onClick={() => decrease()}>-</button>
                    <button onClick={() => increase()}>+</button>
                  </div>
                </div>
              </div>
              <div className={styles.price}>
                <h3>{t("mint.totalPriceLabel").toUpperCase()}</h3>
                <span>{(mintPrice * mintNum).toFixed(3)} ETH</span>
              </div>
            </div>
            <div className={styles.mintProgress}>
              {soldout ? (
                <h3>{t("mint.mintingLabel").toUpperCase()}</h3>
              ) : (
                <h3>{t("mint.mintingLabel").toUpperCase()}</h3>
              )}
              <div className={styles.progressWrap}>
                <div
                  className={styles.progressBar}
                  style={{ width: "8%" }}
                ></div>
                <span>
                  {mintedNftID}/{totalNftID}
                </span>
              </div>
            </div>
            <div className={styles.errorMessage}>
              {authorizedError && (
                <span>{t("mint.errors.authorizeLabel")}</span>
              )}
            </div>
            <div className={styles.soldErrorMessage}>
              {soldout && (
                <div>
                  <h3>{t("mint.soldOut").toUpperCase()}</h3>
                  <span>
                    {t("mint.opensea.first")}
                    <a
                      href={process.env.NEXT_PUBLIC_URL_OPENSEA_COLLECTION}
                      rel="noreferrer"
                      target="_blank"
                    >
                      opensea.io
                    </a>
                    {t("mint.opensea.second")}
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
              ) : (
                <button onClick={() => mint()}>MINT</button>
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
                    {t("mint.minted")} <br></br>
                    {t("mint.1minted")}
                  </span>
                ) : (
                  <span>
                    {t("mint.minted")} <br></br>[{mintNum}] {t("mint.mminted")}
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
                    <h3>t{"mint.transactionConfirm"}</h3>
                  </div>
                  <Link href={etherscanLink}>
                    <a target="_blank" rel="noopener noreferrer">
                      {t("mint.etherScan")}
                    </a>
                  </Link>
                </div>
              </div>
              <div className={styles.mintBtn}>
                <button onClick={() => setIsMinted(false)}>
                  {t("mint.mintAuthor").toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </PageSlot>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
