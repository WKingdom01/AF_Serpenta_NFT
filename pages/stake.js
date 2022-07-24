import dynamic from "next/dynamic";
import React, { useState } from "react";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styles from "../styles/stake.module.scss";

// Images
import { firstPageItems } from "/data/stakeData";
import Arrow from "../static/stake/arrow.png";

//wagmi react hook
import { useConnect } from "wagmi";

//Components
const Dashboard = dynamic(() => import("./components/StakeDashboard"));
const Serpenta = dynamic(() => import("./components/StakeSerpenta"));
const PageSlot = dynamic(() => import("./components/PageSlot"));
const MintNavBar = dynamic(() => import("./components/MintNavBar"));
const ConnectWallet = dynamic(() => import("./components/ConnectWallet"));

export default function Stake() {
  const { t } = useTranslation("common");
  const { isConnected } = useConnect();
  const [isDashboard, setDashboard] = useState(true);
  const [openmodal, setOpenmodal] = useState(false);
  return (
    <div>
      <PageSlot>
        <MintNavBar />
        {!isConnected ? (
          <section>
            <div className={styles.imageContainer}>
              {firstPageItems.map((item, index) => (
                <div key={index} className={styles.imageWrap}>
                  <Image src={item.src} alt={item.alt} />
                </div>
              ))}
            </div>
            <div className={styles.contentWarp}>
              <h2>{t("stake.staking").toUpperCase()}</h2>
              <p>{t("stake.firstExp")}</p>
            </div>
            {!isConnected && (
              <div className={styles.connectWarp}>
                <button
                  onClick={() => {
                    setOpenmodal(true);
                  }}
                >
                  {t("stake.connectwallet").toUpperCase()} &nbsp;
                  <Image src={Arrow} alt="arrow" />
                </button>
              </div>
            )}
            <div className={styles.footer}>
              <span>{t("copyright")}</span>
            </div>
          </section>
        ) : isDashboard ? (
          <Dashboard setDashboard={setDashboard} />
        ) : (
          <Serpenta setDashboard={setDashboard} />
        )}
      </PageSlot>
      <ConnectWallet modalOpen={openmodal} setModalOpen={setOpenmodal} />
    </div>
  );
}
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
