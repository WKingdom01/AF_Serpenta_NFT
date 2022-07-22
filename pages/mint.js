import dynamic from 'next/dynamic'
import React, { useState, useRef, useEffect, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script"
import styles from "../styles/mint.module.scss";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';



// Images
import GetHelpIcon from "../static/Question-icon.png";
import Logo from "../static/main-logo.png";
import CloseIcon from "../static/Close-icon.png";
import rectIcon from "../static/rectIcon.png"
//temp image
import nftImage from '../static/01.png'

//wagmi react hook
import { ethers } from 'ethers'
import { useConnect,useAccount,useDisconnect,useContractRead,useContract ,useSigner,useProvider  } from 'wagmi';
//contract
import mintABI from '../services/abi/mint.json'
//whitelist address
import whitelistAddress from '../public/static/whitelisted-wallets.json'
//Components
const Accordion = dynamic(() => import('./components/FAQ/FAQ'));
const SwiperDragon = dynamic(() => import('./components/SWIPER/swiperDragon'));
const Footer = dynamic(()=>import('./components/FOOTER/footer'));
const PageSlot = dynamic(() => import('./components/PageSlot'));
const MintNavBar = dynamic(() => import('./components/MintNavBar'));
//MerkleTree
const { MerkleTree } = require("merkletreejs");
const keccak256 = require('keccak256');

let whitelistOnlyAddress= [];
const getWhitelistOnlyAddress = ()=>{
	whitelistAddress.map((item)=>(
		whitelistOnlyAddress.push(item.wallet_address)
	));
}	
getWhitelistOnlyAddress();
export default function Mint() {


	const [showModal, setShowModal] = useState(false);
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
	const [etherscanLink,setEtherScanLink] = useState('');
	const [connectText, setText] = useState('CONNECTED')


	const { data: accountData } = useAccount();
  	const address = accountData?.address;
	// const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
	// const { address, isConnecting,isConnected , isDisconnected } = useAccount();
	const { disconnect } = useDisconnect();

	// get the end user
	const  { data: signer, isError, isLoadings } = useSigner ();
	const provider = useProvider()

	// get the smart contract
	const contract = useContract({
		addressOrName: process.env.NEXT_PUBLIC_ANALYTICS_CONTRACT_ADDRESS,
		contractInterface: mintABI,
		signerOrProvider: provider,
	})
	

	const publicTimeStamp = useContractRead({
		addressOrName: process.env.NEXT_PUBLIC_ANALYTICS_CONTRACT_ADDRESS,
		contractInterface: mintABI,
		functionName: 'publicTimestamp'
	})

	const privateTimeStamp = useContractRead({
		addressOrName: process.env.NEXT_PUBLIC_ANALYTICS_CONTRACT_ADDRESS,
		contractInterface: mintABI,
		functionName: 'privateTimestamp'
	})



	const decrease = () => {
		if(mintNum > 1) {
			setMintNum(mintNum - 1)
		}
	}

	const increase = () => {
		if(mintNum<max_tx){
			setMintNum(mintNum + 1)

		}
	}

	const modalRef = useRef();
	const openModal = (e) => {
		e.preventDefault();
		setShowModal((prev) => !prev);
	};
	const closeModal = (e) => {
		if (modalRef.current === e.target) {
			setShowModal(false);
			setIsMinted(false);
			setShowWalletModal(false);
		}
	};

	const keyPress = useCallback(
		(e) => {
			if (e.key === "Escape" && showModal) {
				setShowModal(false);
			}
		},
		[setShowModal, showModal]
	);

	const mint = async() => {
		setIsMinting(true);
		if(address==undefined){
			setAuthorizedError(true);
		} else {
			try {
				const currentTime = Math.floor(Date.now()/1000);
				let contract =  new ethers.Contract(process.env.NEXT_PUBLIC_ANALYTICS_CONTRACT_ADDRESS, mintABI, signer);
				const currentBalance = await contract.balanceOf(address);

				if(Number(currentBalance) + mintNum < max_wallet){
					if (currentTime < priveTime || priveTime === 0 || publicTime === 0) {
						console.log("sale has not started");
					} else if (currentTime >= priveTime && currentTime < publicTime) {
						let tx = await contract.privateMint(mintNum,merkleProof,{value: ethers.utils.parseEther((mintPrice*mintNum).toString())})
						let receipt =await tx.wait();
						if(receipt!==null){
							getInfo();
							setIsMinted(true);
							setEtherScanLink("https://rinkeby.etherscan.io/tx/"+receipt["transactionHash"])
						}
					} else if (currentTime >= publicTime) {
						let tx = await contract.publicMint(mintNum,{value: ethers.utils.parseEther((mintPrice*mintNum).toString())})
						let receipt =await tx.wait();
						if(receipt!==null){
							getInfo();
							setIsMinted(true);
							setEtherScanLink("https://rinkeby.etherscan.io/tx/"+receipt["transactionHash"])
						}
					} 
					else throw new Error("Unreachable");
				} else {
					setIsMinting(false)
					console.log("you can't mint nft more than "+ max_wallet)
				}

			} catch (error) {
				console.log(error)
			}
		}
		setIsMinting(false);
	}
	
	const getInfo = async() => {
		//MerkleTree and MerkleProof
		const leafNodes = whitelistOnlyAddress.map(addr => keccak256(addr));
		const merkleTree = new MerkleTree(leafNodes, keccak256,{sortPairs: true});
		setMerkleProof(merkleTree.getHexProof(keccak256(address)));
		console.log("sdsdsds");
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

			setMintPrice(Number(price)/Math.pow(10,18));
			setTotalNFT(Number(totalNTFCount));
			setMintedNFT(Number(mintedNFT));
			setPublicTime(Number(publicTimeStamp.data));
			setPrivateTime(Number(privateTimeStamp.data));
			setMaxTx(Number(maxTx));
			setMaxWallet(Number(maxWallet));

			if(Number(mintedNFT) === Number(totalNTFCount)) {
				setSoldOut(true);
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", keyPress);
		return () => document.removeEventListener("keydown", keyPress);
	}, [keyPress]);

	useEffect(()=> {
		if(address){
			setShowWalletModal(false);
			setAuthorizedError(false);
			setText("CONNECTED");
		}
	},[address])

	useEffect(()=>{
		if(address){
			getInfo()
		}
	},[address])

	return (
		<div style={{ background: `url('/starrybg.png')` }}>
      		<PageSlot>
        		<MintNavBar/>
				<main>
				<div className={styles.mintContainer}>
					<div className={styles.sliderContainer}>
						<SwiperDragon/>
					</div>
					<div className={styles.amountpriceWrap}>
						<div className={styles.amount}>
							<h3>AMOUNT</h3>
							<div className={styles.counterWrap}>
								<div className={styles.numfield}>{mintNum}</div>
								<div className={styles.Btnfield}>
									<button onClick={() => decrease()}>-</button>
									<button onClick={() => increase()}>+</button>
								</div>
							</div>
						</div>
						<div className={styles.price}>
							<h3>TOTAL PRICE</h3>
							<span>{(mintPrice * mintNum).toFixed(3)} ETH</span>
						</div>
					</div>
					<div className={styles.mintProgress}>
						{
							soldout?
							<h3>SOLD OUT</h3>
							:
							<h3>MINTING NOW</h3>
						}
						<div className={styles.progressWrap}>
							<div className={styles.progressBar} style={{ width: "8%" }}></div>
							<span>{mintedNftID}/{totalNftID}</span>

						</div>
					</div>
					<div className={styles.errorMessage}>
						{authorizedError && <span>You will need to authorise your wallet to buy NFTs</span>}
					</div>
					<div className={styles.soldErrorMessage}>
						{soldout && <div><h3>SOLD OUT!</h3><span>Go to <a href="https://testnets.opensea.io/collection/serpenta"  rel="noreferrer" target="_blank">opensea.io</a> to buy one.</span></div>}
					</div>
					<div className={styles.mintBtn}>
						{
							isMinting?
							<button disabled>MINT<i className="fa fa-spinner fa-spin"/>ING</button>
							:
							<button onClick={()=>mint()}>MINT</button>

						}
					</div>

				</div>
			</main>
			<Footer/>
			{showModal ? (
				<div
					className={styles.getHelpContainer}
					onClick={closeModal}
					ref={modalRef}
				>
					<div className={styles.getHelpWrap}>
						<div className={styles.helpwrapHead}>
							<h2>HELP CENTER</h2>
							<div
								className={styles.closeIcon}
								onClick={() => {
									setShowModal(!showModal);
								}}
							>
								<Image src={CloseIcon} alt="close" />
							</div>
						</div>

						<div className={styles.accordionContainer}>
							<div className={styles.accordion}>
								<div className={styles.accordionContainer}>
									<div className={styles.accordion}>
										{accordionData.map(({ title, content, id }) => (
											<Accordion key={id} title={title} content={content} />
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}


			
			{
				isMinted?(
					<div
						className={styles.getHelpContainer}
						onClick={closeModal}
						ref={modalRef}
					>
						<div className={styles.mintNFTWarp}>
							<div className={styles.mintedNFT}>
								<Image src={nftImage} alt="mint"/>
							</div>
							<div className={styles.mintText}>
								{
									mintNum===1?
										<span>
											RAWR! You JUST minted <br></br>A SERPENTA NFT!
										</span>
									:
										<span>
											RAWR! You JUST minted <br></br>[{mintNum}] SERPENTA NFTS!
										</span>	
								}
								
							</div>
							<div className={styles.mintSocial}>
								<div className={styles.mintTrade}>
									<div className={styles.mintHead}>
										<div className={styles.mintRectIcon} >
											<Image src={rectIcon} width="15px" height="15px" alt="rectIcon"/>
										</div>
										<h3>sell and trade</h3>
									</div>
									<Link href="https://testnets.opensea.io/collection/serpenta"><a target="_blank"  rel="noopener noreferrer">Open Sea</a></Link>
								</div>
								<div className={styles.mintTwitter}>
									<div className={styles.mintHead}>
										<div className={styles.mintRectIcon} >
											<Image src={rectIcon} width="15px" height="15px" alt="rectIcon"/>
										</div>
										<h3>share</h3>
									</div>
									<Link href="https://twitter.com/SerpentaNFT" ><a target="_blank"  rel="noopener noreferrer">Twitter</a></Link>
								</div>
								<div className={styles.mintEther}>
									<div className={styles.mintHead}>
										<div className={styles.mintRectIcon} >
											<Image src={rectIcon} width="15px" height="15px" alt="rectIcon"/>
										</div>
										<h3>transaction confirmation</h3>
									</div>
									<Link href={etherscanLink}><a target="_blank"  rel="noopener noreferrer">Ether Scan</a></Link>
								</div>
							</div>
							<div className={styles.mintBtn}>
								<button onClick={()=>setIsMinted(false)}>MINT ANOTHER</button>
							</div>
						</div>
					</div>
				) : (
					""
				)
			}
			</PageSlot>
		</div>	
		
	);
}

const accordionData = [
	{
		id: 1,
		title: "> How to Install Metamask for NFTs:",
		content: `Here is a guide we have written for newbies to the NFT space. You will need a basic crypto account on Binance / Coinbase etc. Minting an NFT is usually easier on a desktop, and totally possible on mobile, but it's might be a little more cumbersome. https://medium.com/@miaoux_17900/installing-a-metamask-wallet-for-nfts-7e810e1c1b5c`,
	},
	{
		id: 2,
		title: "> How to Add Funds to your wallet:",
		content: `Please see the earlier guide on how to install metamask (or any crypto wallet on your browser). To add funds to your wallet, just take the address that was created along with your wallet (on Ethereum it will start with 0x..... and the remainder will be a string of letters and numbers), and paste that into your withdrawal address on the Ethereum network. If requested, you will want "ERC-20". 

		It should only take about 5 minutes for your funds to be visible in your wallet once they have been successfully sent over. Please remember to add extra for normal gas fees. The Serpenta contract for minting is optimised, so it will be gas-efficient.`,
	},
	{
		id: 3,
		title: "> How to Mint an NFT:",
		content: `Connect your Wallet to the mint page on the official https://serpenta.io/ website. 
		Click "Connect Wallet" - this will tell you if you are authorised to mint in the whitelisted phase of the mint. If you are not, then you will have to wait for the public phase of the mint. Write the date and times down - you won't want to miss it. 
		If you do - you can always buy a dragon from the official OpenSea NFT site here: https://opensea.io/collection/Serpenta
		`,
	},
	{
		id: 4,
		title: "> Other issues:",
		content: `If you have any other issues, please open a ticket or ask in our discord where you will receive prompt 24/7 support. That being said, we do have to sleep sometime, so it might take up to a few hours. Please be patient. Thanks!
		`,
	},
];

export const getStaticProps = async ({ locale }) => ({
	props: {
	  ...(await serverSideTranslations(locale, ['common'])),
	},
  });