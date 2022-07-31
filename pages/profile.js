import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useAccount, useConnect } from 'wagmi';
import useSwr from 'swr';
import ConnectWallet from './components/ConnectWallet';
import Footer from './components/Footer';
import MintNavBar from './components/MintNavBar';
import PageSlot from './components/PageSlot';
import { statusHelper } from '../utils/helpers/status-helper';
import { getCountdownVariables } from '../utils/helpers/time-module';
import noConImg from '/public/profile.png';

import styles from '/styles/profile.module.scss';

const fetcher = (url) => fetch(url).then((res) => res.json());

const DiscordRoles = dynamic(() => import('./components/DiscordRoles'));
const LaunchCountdown = dynamic(() => import('./components/LaunchCountDown'));

const Phases = ({ isWhitelisted, isWaitlisted, isPublic, t }) => {
  return (
    <div className={styles.stages}>
      <div className={styles.stageTxts}>
        <div className={isWhitelisted ? styles.current : styles.passed}>
          <span className={styles.list}>{t('profile.phases.0.name')}</span>
          <span className={styles.amount}>
            {t('profile.phases.0.description')}
          </span>
        </div>

        <div
          className={
            isWhitelisted
              ? styles.upcoming
              : isWaitlisted
              ? styles.current
              : styles.passed
          }
        >
          <span className={styles.list}>
            <span className={styles.centerTxt}>
              {t('profile.phases.1.name')}
            </span>
          </span>
          <span className={styles.amount}>
            <span className={styles.centerTxt}>
              {t('profile.phases.1.description')}
            </span>
          </span>
        </div>

        <div className={isPublic ? styles.current : styles.upcoming}>
          <span className={styles.list}>
            <span className={styles.rightTxt}>
              {t('profile.phases.2.name')}
            </span>
          </span>
          <span className={styles.amount}>
            <span className={styles.rightTxt}>
              {t('profile.phases.2.description')}
            </span>
          </span>
        </div>
      </div>

      <div className={styles.stageGraph}>
        <div className={isWhitelisted ? styles.current : styles.passed}>
          {!isWhitelisted ? <div className={styles.check}></div> : 1}
        </div>
        <div
          className={!isWhitelisted ? styles.passline : styles.timeline}
        ></div>
        <div
          className={
            isWhitelisted
              ? styles.upcoming
              : isWaitlisted
              ? styles.current
              : styles.passed
          }
        >
          {isPublic ? <div className={styles.check}></div> : 2}
        </div>
        <div className={isPublic ? styles.passline : styles.timeline}></div>
        <div className={isPublic ? styles.current : styles.upcoming}>3</div>
      </div>
    </div>
  );
};

const ConnectedWalletInfo = ({
  discord_username,
  roles,
  address,
  status,
  whitelisted,
  t,
}) => {
  const { time } = statusHelper(whitelisted);

  return (
    <div className={styles.infoBox}>
      {time && (
        <div className={styles.info}>
          <span className={styles.title}>{t('profile.mintPhaseTitle')}</span>
          <span className={styles.content}>{time.toString()}</span>
        </div>
      )}
      {discord_username && (
        <div className={styles.info}>
          <span className={styles.title}>{t('profile.discordNameTitle')}</span>
          <span className={styles.content}>{discord_username}</span>
        </div>
      )}
      {roles && (
        <div className={styles.info}>
          <span className={styles.title}>{t('profile.discordRoleTitle')}</span>
          <div className={styles.roles}>
            <DiscordRoles roles={roles} />
          </div>
        </div>
      )}
      {address && (
        <div className={styles.info}>
          <span className={styles.title}>
            {t('profile.walletAddressTitle')}
          </span>
          <span className={styles.content}>{address}</span>
        </div>
      )}
      {status && (
        <div className={styles.info}>
          <span className={styles.title}>{t('profile.statusTitle')}</span>
          <span className={styles.content}>{status}</span>
        </div>
      )}
    </div>
  );
};

const DisconnectWalletInfo = ({ setOpenmodal, t }) => {
  return (
    <div className={styles.body}>
      <div className={styles.img}>
        <Image src={noConImg} alt="No connected Image" />
      </div>
      <div className={styles.title}>{t('profile.disconnectedWalletTitle')}</div>
      <div className={styles.content}>
        {t('profile.disconnectedWalletDescription')}
      </div>
      <div className={styles.mintbox}>
        <button className={styles.link} onClick={() => setOpenmodal(true)}>
          {t('profile.disconnectedWalletButton')}
        </button>
      </div>
    </div>
  );
};

const LootBoxes = ({ lootbox_quantity, t }) => {
  return (
    <div className={styles.lootboxes}>
      <span className={styles.title}>{t('profile.lootBoxesTitle')}</span>
      <div className={styles.content}>
        <i className={styles.number}>{lootbox_quantity ?? 0}</i>
      </div>
    </div>
  );
};

const MintBox = ({ distance, t }) => {
  return (
    <div className={styles.mintbox}>
      {distance && (
        <LaunchCountdown
          countDownPrefix={t('profile.countdownTitle')}
          days={distance.days}
          hours={distance.hours}
          minutes={distance.minutes}
          seconds={distance.seconds}
        />
      )}

      <Link href="/mint">
        <a className={styles.link}>{t('profile.countdownButtonText')}</a>
      </Link>
    </div>
  );
};

export default function Profile() {
  const { t } = useTranslation('common');
  const { isConnected } = useConnect();
  const { data: accountData } = useAccount();

  const address = accountData?.address;
  const { data } = useSwr(address ? `/api/proof/${address}` : null, fetcher);

  const [openmodal, setOpenmodal] = useState(false);
  const [distance, setDistance] = useState();
  const [userData, setUserData] = useState(null);

  const { whitelisted, roles, discord_username, lootbox_quantity } =
    userData || {};
  const { status, time, alert, code } = statusHelper(whitelisted);

  const isWhitelisted = code === 1;
  const isWaitlisted = code === 2;
  const isPublic = code === 3;

  useEffect(() => {
    if (address && data) {
      const { days, hours, minutes, seconds } = getCountdownVariables(time);

      setDistance({ days, hours, minutes, seconds });
      setUserData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, data]);

  return (
    <div style={{ background: 'url("/starrybg.png")' }}>
      <PageSlot title="profile">
        <MintNavBar />
        {isConnected && data ? (
          <div className={styles.body}>
            <Phases
              isWhitelisted={isWhitelisted}
              isWaitlisted={isWaitlisted}
              isPublic={isPublic}
              t={t}
            />

            <div className={styles.status}>{alert}</div>

            <ConnectedWalletInfo
              discord_username={discord_username}
              roles={roles}
              address={address}
              status={status}
              whitelisted={whitelisted}
              t={t}
            />

            <LootBoxes lootbox_quantity={lootbox_quantity} t={t} />

            <MintBox distance={distance} t={t} />
          </div>
        ) : (
          <DisconnectWalletInfo setOpenmodal={setOpenmodal} t={t} />
        )}
        <Footer />
      </PageSlot>

      <ConnectWallet modalOpen={openmodal} setModalOpen={setOpenmodal} />
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
