import Link from 'next/link';
import Image from 'next/image';

import { DISCORD_URL, OPENSEA_URL, TWITTER_URL } from '/data/constants';
import Opensea from '/static/opensea.png';
import Twitter from '/static/Twitter.png';
import Discord from '/static/Discord.png';

import styles from '/styles/mint.module.scss';

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
  },
];

const Item = ({ url }) => {
  return (
    <li>
      <Link href={url.href ? url.href : '/'} passHref>
        <a href={url.href} target="_blank" rel="noreferrer noopener">
          <Image src={url.src} alt={url.alt} />
        </a>
      </Link>
    </li>
  );
};

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <ul className={styles.socialLinks}>
        {footerUrls.map((url, index) => (
          <Item key={index} url={url} />
        ))}
      </ul>
    </div>
  );
};

export default Footer;
