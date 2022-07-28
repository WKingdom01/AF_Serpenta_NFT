import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAccount, useConnect } from 'wagmi';
import useSwr from 'swr';
import { statusHelper } from '../utils/helpers/status-helper';
import getDiscordRole from '../utils/helpers/get-role-by-discordName';

import styles from '/styles/profile.module.scss';

const fetcher = (url) => fetch(url).then((res) => res.json());

const PageSlot = dynamic(() => import('./components/PageSlot'));
const MintNavBar = dynamic(() => import('./components/MintNavBar'));
const DiscordRoles = dynamic(() => import('./components/DiscordRoles'));
const LaunchCountdown = dynamic(() => import('./components/LaunchCountDown'));
const Footer = dynamic(() => import('./components/Footer'));

export default function Profile() {
  const { isConnected } = useConnect();
  const { data: accountData } = useAccount();
  const address = accountData?.address;
  const { data, error } = useSwr(`/api/proof/${address}`, fetcher);
  const [status, setWalletStatus] = useState('');
  const [alertTxt, setAlertTxt] = useState('');
  const [phaseTime, setPhaseTime] = useState('');
  const [statusCode, setStatusCode] = useState('');
  const [userName, setUserName] = useState();
  const [discordRoleList, setDiscrodRoleList] = useState();
  const [distance, setDistance] = useState();
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const current = new Date();

  useEffect(() => {
    if (address && data) {
      setStatusCode(data.whitelisted);
      const info = statusHelper(data.whitelisted);
      setWalletStatus(info.status);
      setAlertTxt(info.alert);
      setPhaseTime(info.time);
      setUserName(data.discord_username);
      setDiscrodRoleList(getDiscordRole(data.discord_username));
      const distance = phaseTime - current;
      const days = Math.floor(distance / day);
      const hours = Math.floor((distance % day) / hour);
      const mins = Math.floor((distance % hour) / minute);
      const seconds = Math.floor((distance % minute) / second);
      setDistance({ days: days, hours: hours, mins: mins, secs: seconds });
    }
  });
  useEffect(() => {
    if (address && data) {
      setStatusCode(data.whitelisted);
      const info = statusHelper(data.whitelisted);
      setWalletStatus(info.status);
      setAlertTxt(info.alert);
      setPhaseTime(info.time);
      setUserName(data.discord_username);
      console.log('Ready for showing');
    }
  }, [address]);

  return (
    <div style={{ background: 'url("/starrybg.png")' }}>
      <PageSlot title="profile">
        <MintNavBar />
        {isConnected && data ? (
          <div className={styles.body}>
            <div className={styles.stages}>
              <div className={styles.stageTxts}>
                <div
                  className={statusCode == '1' ? styles.current : styles.passed}
                >
                  <span className={styles.list}>whitelist</span>
                  <span className={styles.amount}>Mint 3 max</span>
                </div>
                <div
                  className={
                    statusCode == '1'
                      ? styles.upcoming
                      : statusCode == '2'
                      ? styles.current
                      : styles.passed
                  }
                >
                  <span className={styles.list}>
                    <span className={styles.centerTxt}>reserve</span>
                  </span>
                  <span className={styles.amount}>
                    <span className={styles.centerTxt}>Mint 3 max</span>
                  </span>
                </div>

                <div
                  className={
                    statusCode != '1' && statusCode != '2'
                      ? styles.current
                      : styles.upcoming
                  }
                >
                  <span className={styles.list}>
                    <span className={styles.rightTxt}>public</span>
                  </span>
                  <span className={styles.amount}>
                    <span className={styles.rightTxt}>Unlimited</span>
                  </span>
                </div>
              </div>
              <div className={styles.stageGraph}>
                <div
                  className={statusCode == '1' ? styles.current : styles.passed}
                >
                  {statusCode != '1' ? <div className={styles.check}></div> : 1}
                </div>
                <div
                  className={
                    statusCode != '1' ? styles.passline : styles.timeline
                  }
                ></div>
                <div
                  className={
                    statusCode == '1'
                      ? styles.upcoming
                      : statusCode == '2'
                      ? styles.current
                      : styles.passed
                  }
                >
                  {statusCode != '1' && statusCode != '2' ? (
                    <div className={styles.check}></div>
                  ) : (
                    2
                  )}
                </div>
                <div
                  className={
                    statusCode != '1' && statusCode != '2'
                      ? styles.passline
                      : styles.timeline
                  }
                ></div>
                <div
                  className={
                    statusCode != '1' && statusCode != '2'
                      ? styles.current
                      : styles.upcoming
                  }
                >
                  3
                </div>
              </div>
            </div>
            <div className={styles.status}>{alertTxt}</div>
            <div className={styles.infoBox}>
              <div className={styles.info}>
                <span className={styles.title}>mint phase date/time</span>
                <span className={styles.content}>{phaseTime.toString()}</span>
              </div>
              <div className={styles.info}>
                <span className={styles.title}>your discord id</span>
                <span className={styles.content}>{userName}</span>
              </div>
              <div className={styles.info}>
                <span className={styles.title}>discord role</span>
                <div className={styles.roles}>
                  {discordRoleList && <DiscordRoles roles={discordRoleList} />}
                </div>
              </div>
              <div className={styles.info}>
                <span className={styles.title}>wallet address</span>
                <span className={styles.content}>{address}</span>
              </div>
              <div className={styles.info}>
                <span className={styles.title}>status</span>
                <span className={styles.content}>{status}</span>
              </div>
            </div>
            <div className={styles.lootboxes}>
              <span className={styles.title}>
                Lootboxes gifted with each dragon minted
              </span>
              <div className={styles.content}>
                <i className={styles.number}>2</i>
              </div>
            </div>
            <div className={styles.mintbox}>
              {distance && (
                <LaunchCountdown
                  days={distance.days}
                  hours={distance.hours}
                  minutes={distance.mins}
                  seconds={distance.secs}
                />
              )}

              <Link href="/mint">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  go to mint
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <main className={styles.main}>
            <div className={styles.statusWarp}>
              <p>
                Connect your wallet to check your whitelist/waitlist status for
                Serpenta. We will not ask you to pay any gas or complete an
                transactions.It`&#39` just a connection to check you own the
                wallet
              </p>
            </div>
          </main>
        )}

        <Footer />
      </PageSlot>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
