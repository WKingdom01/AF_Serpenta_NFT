import dynamic from 'next/dynamic'
import React, { useState, useRef, useEffect, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import styles from "../styles/stake.module.scss";


// Images
import GetHelpIcon from "../static/Question-icon.png";
import Logo from "../static/main-logo.png";
import CloseIcon from "../static/Close-icon.png";
import IMG1 from '../static/stake/NFT_DRAGONS_BATCH2_6 1.png';
import IMG2 from '../static/stake/NFT_DRAGONS_BATCH2_3 1.png';
import IMG3 from '../static/stake/NFT_DRAGONS_BATCH2_4 1.png';
import Arrow from '../static/stake/arrow.png' 

//wagmi react hook
import { ethers } from 'ethers'
import { useConnect,useAccount,useDisconnect } from 'wagmi';

//Components
const Dashboard = dynamic(() => import ('./components/StakeDashboard'))
const Serpenta = dynamic(() => import ('./components/Serpenta'))
const PageSlot = dynamic(() => import('./components/PageSlot'));
const MintNavBar = dynamic(() => import('./components/MintNavBar'));


export default function Stake() {
	const { isConnected } = useConnect()
    const { disconnect } = useDisconnect();


	const [isDashboard, setDashboard] = useState(true);

	console.log("connnect:",isConnected);

	return (
		<div >
			<PageSlot>
				<MintNavBar/>
				{!isConnected ? 
					<main>
						<div className={styles.imageContainer}>
							<div className={styles.imageWrap}>
								<Image src={IMG1} alt="dragon"/>
							</div>
							<div className={styles.imageWrap}>
								<Image src={IMG2} alt="dragon"/>
							</div>					
							<div className={styles.imageWrap}>
								<Image src={IMG3} alt="dragon"/>
							</div>
						</div>
						<div className={styles.contentWarp}>
							<h2>STAKING</h2>
							<p>Rawr! Log in and explore the dimensions that your dragons have visited. Collect artefacts and uncover the dimension images over time; unveil the lore and dive deep into the world of Serpenta.</p>
						</div>
						<div className={styles.connectWarp}>
							<button >CONNECT WALLET &nbsp;<Image src={Arrow} alt="arrow"/></button>
						</div>
						<div className={styles.footer}>
							<span>@ SERPENTA 2022</span>
						</div>
					</main>
				:(isDashboard ? <Dashboard setDashboard = {setDashboard }/> : <Serpenta setDashboard = {setDashboard }/>)
				}
			</PageSlot>
			
		</div>  

		
	);
}
export const getStaticProps = async ({ locale }) => ({
	props: {
	  ...(await serverSideTranslations(locale, ['common'])),
	},
  });