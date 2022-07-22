import React from "react";
import styles from "/styles/mint.module.scss";
import Link from "next/link";
import Image from "next/image";

import Opensea from "/static/opensea.png";
import Twitter from "/static/Twitter.png";
import Discord from "/static/Discord.png";

const FOOTER = () => {

	return (
        <div className={styles.footerContainer}>
            <ul className={styles.socialLinks}>
                <li>
                    <Link href="https://testnets.opensea.io/collection/serpenta">
                        <Image src={Opensea} alt="opensea" />
                    </Link>
                </li>
                <li>
                    <Link href="https://twitter.com/SerpentaNFT">
                        <Image src={Twitter} alt="twitter" />
                    </Link>
                </li>
                <li>
                    <Link href="https://discord.gg/KHsF52fD">
                        <Image src={Discord} alt="discord" />
                    </Link>
                </li>
            </ul>
        </div>
	);
};

export default FOOTER;
