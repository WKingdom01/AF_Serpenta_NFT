
import Link from "next/link";
import Image from "next/image";
import styles from "/styles/mint.module.scss";
import { OPENSEA_URL, TWITTER_URL, DISCORD_URL } from '/data/constants';

import Opensea from "/static/opensea.png";
import Twitter from "/static/Twitter.png";
import Discord from "/static/Discord.png";

const footerUrls = [
  {
    href: OPENSEA_URL,
    src: Opensea,
    alt: 'Serpenta - OpenSea',
  },
  {
    href: TWITTER_URL,
    src: Twitter,
    alt: 'Serpenta - Twitter',
  },
  {
    href: DISCORD_URL,
    src: Discord,
    alt: 'Serpenta - Discord',
  }
]
const Footer = () => {

	return (
        <div className={styles.footerContainer}>
            <ul className={styles.socialLinks}>
              {footerUrls.map((url, index) => (
                  <li>
                    <Link href={url.href}>
                      <Image src={url.src} alt={url.alt} />
                    </Link>
                  </li>
                ))}
            </ul>
        </div>
	);
};

export default Footer;

// pages/components/footer/footer.js - template
