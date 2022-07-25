import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAccount } from 'wagmi';
import useSwr from 'swr';

import styles from '../styles/profile.module.scss';
//whitelist Address
import whitelistAddresses from '../public/static/whitelisted-wallets.json';

const fetcher = (url) => fetch(url).then((res) => res.json());

const PageSlot = dynamic(() => import('./components/PageSlot'));
const MintNavBar = dynamic(() => import('./components/MintNavBar'));

let whitelistOnlyAddresses = [];
let waitlistOnlyAddresses = [];

const getWhitelistOnlyAddress = () => {
  whitelistAddresses.map((item) =>
    whitelistOnlyAddresses.push(item.wallet_address)
  );
};
getWhitelistOnlyAddress();

export default function Profile() {
  const { data: accountData } = useAccount();
  const address = accountData?.address;
  const { data, error } = useSwr(`/api/proof/${address}`, fetcher);
  const [status, SetWalletStatus] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    if (address) {
      let flag = false;
      whitelistOnlyAddresses.map((item) => {
        if (item === address) {
          SetWalletStatus('WHITELIST');
          setCurrentTime(Date().toLocaleString());
          return;
        } else {
        }
      });

      waitlistOnlyAddresses.map((item) => {
        if (item === address) {
          SetWalletStatus('WAITLIST');
          setCurrentTime(Date().toLocaleString());
          eturn;
        } else {
        }
      });
      SetWalletStatus('PUBLIC');
      setCurrentTime(Date().toLocaleString());
    }
  }, [address]);

  return (
    <div style={{ background: `url('/starrybg.png')` }}>
      <PageSlot>
        <MintNavBar />
        {!data && <p>Loading profile data...</p>}

        {data && (
          <main className={styles.main}>
            <div className={styles.statusWarpWhitelist}>
              <span>{'Whitelist (mint 3 max)'}</span>
            </div>
            <div className={styles.statusWarpReserve}>
              <span>{'Reserve (max of 3)'}</span>
            </div>
            <div className={styles.statusWarpPublic}>
              <span>{'Public (unlimited)'}</span>
            </div>
            <div className={styles.statusWarp}>
              <span>Mint Phase Date/Time:</span>
              <span>{currentTime}</span>
            </div>
            <div className={styles.statusWarp}>
              <span>Discord ID: </span>
              <span>{data.discord_id}</span>
            </div>
            <div className={styles.statusWarp}>
              <span>Wallet Address:</span>
              <span>{data.wallet_address}</span>
            </div>
            <div className={styles.statusWarp}>
              <span>Lootboxes Gifted with each dragon minted:</span>
              <span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="" height={'100px'} width={'100px'} alt=""></img>
              </span>
            </div>

            <div className={styles.countdown}>
              <span>Countdown to mint:</span>
              <Link href="/mint" passHref>
                <span className={styles.mint}>Go to mint page</span>
              </Link>
            </div>
          </main>
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
