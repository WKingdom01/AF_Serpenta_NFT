import dynamic from 'next/dynamic';
import useSwr from 'swr';
import Image from 'next/image';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import Link from 'next/link';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAccount, useConnect } from 'wagmi';
import getWhitelistedAddresses from '/utils/helpers/get-whitelisted-addresses';

import styles from '/styles/profile.module.scss';

import Box from '/static/stake/box.png';

const fetcher = (url) => fetch(url).then((res) => res.json());

const PageSlot = dynamic(() => import('./components/PageSlot'));
const MintNavBar = dynamic(() => import('./components/MintNavBar'));

//whitelist Address
import whitelistAddresses from '../public/static/whitelisted-wallets.json';

let waitlistOnlyAddresses = [];
export default function Profile() {
  const { isConnected } = useConnect();
  const { data: accountData } = useAccount();
  const address = accountData?.address;
  const { data, error } = useSwr(`/api/proof/${address}`, fetcher);
  const [status, SetWalletStatus] = useState('');
  const [text, setText] = useState('');
  const [phaseTime, setPhaseTime] = useState('');
  useEffect(() => {
    if (address) {
      let flag = false;
      getWhitelistedAddresses().map((item) => {
        if (address.localeCompare(item) == 0) {
          SetWalletStatus('Whitelist');
          setText(
            'You are in the Whitelist : This starts at Wednesday, August 17, 2022 12:00 AM'
          );
          const date = new Date('2022', '7', '17', '00', '00', '00', '00');
          setPhaseTime(date.getTime());
          flag = true;
          return;
        } else {
        }
      });

      waitlistOnlyAddresses.map((item) => {
        if (item === address) {
          SetWalletStatus('Waitlist');
          setText(
            'You are in the Waitlist : This starts at Wednesday, August 17, 2022 11:00 PM'
          );
          const date = new Date('2022', '7', '17', '23', '00', '00', '00');
          setPhaseTime(date.getTime());
          flag = true;
          return;
        } else {
        }
      });
      if (!flag) {
        SetWalletStatus('Public');
        setText(
          'This wallet has not been found in our white or wait list.\
        The public mint starts at Thursday, August 18, 2022 1:00 AM'
        );
        const date = new Date('2022', '7', '18', '1', '00', '00', '00');
        setPhaseTime(date.toLocaleString());
      }
    }
  }, [address]);
  return (
    <div style={{ background: 'url("/starrybg.png")' }}>
      <PageSlot>
        <MintNavBar />
        {isConnected && data ? (
          <main className={styles.main}>
            <div className={styles.statusWarp}>
              <p>{text}</p>
            </div>

            <div className={styles.statusWarp}>
              <span>Discord ID: </span>
              <span>{data.discord_username}</span>
            </div>
            <div className={styles.statusWarp}>
              <span>Wallet Address:</span>
              <span>{address}</span>
            </div>
            <div className={styles.statusWarp}>
              <span>Lootboxes Gifted with each dragon minted:</span>
              <span>
                <Image src={Box} height="100px" width="100px" alt="" />
              </span>
            </div>

            <div className={styles.countdown}>
              <span>Countdown to mint:</span>
              <Link href="/mint" passHref>
                <span className={styles.mint}>Go to mint page</span>
              </Link>
            </div>
          </main>
        ) : (
          <main className={styles.main}>
            <div className={styles.statusWarp}>
              <p>
                Connect your wallet to check your whitelist/waitlist status for
                Serpenta. We will not ask you to pay any gas or complete an
                transactions.It`&apos`s just a connection to check you own the
                wallet
              </p>
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
