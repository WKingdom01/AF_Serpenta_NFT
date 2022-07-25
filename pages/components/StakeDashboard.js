import React from 'react';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/autoplay';

import { dashboardArtefactItems, dashboardDrgItems } from '/data/stakeData';

import Key from '/static/stake/key.png';
import Box from '/static/stake/box.png';

import styles from '/styles/stake.module.scss';

const Dragon = ({ Id, level, img, lblImg }) => {
  return (
    <div className={styles.dragonWarp}>
      <div className={styles.drgImg} style={{ background: '#FBEDD6' }}>
        <Image src={img} alt="level"></Image>
      </div>
      <div className={styles.drgProp}>
        <div className={styles.dragonId}>
          <span>DRAGON </span>
          <span>#{Id}</span>
        </div>
        <div className={styles.lblWarp}>
          <Image src={lblImg} alt="level"></Image>
          <span className={styles.levelTxt}>Current level is {level}</span>
        </div>
      </div>
    </div>
  );
};

const StakeDashboard = ({ setDashboard }) => {
  return (
    <main>
      <div className={styles.contentWarpDashboard}>
        <h2>DASHBOARD</h2>
        <p>
          This is an overview of all of your items. To start exploring, click on
          the button below.
        </p>
      </div>
      <div className={styles.serpentaWarp}>
        <button onClick={() => setDashboard(false)}>THE SERPENTA WORLD</button>
      </div>

      <div className={styles.row}>
        <h1>
          <span>MY DRAGONS </span>
          <span className={styles.badge}>(4)</span>
        </h1>
        <div className={styles.dragonsArray}>
          {dashboardDrgItems.map((item, index) => (
            <Dragon
              key={index}
              Id={item.Id}
              level={item.level}
              img={item.img}
              lblImg={item.lblImg}
            />
          ))}
        </div>
      </div>

      <div className={styles.row1}>
        <div className={styles.inventoryWarp}>
          <h1>
            <span>INVENTORY </span>
            <span className={styles.badge}>(63)</span>
          </h1>
          <div className={styles.row2}>
            <div className={styles.artefactsWarp}>
              <h2>
                <span>ARTEFACTS </span>
                <span className={styles.badge}>(7)</span>
              </h2>
              <div className={styles.efactArrayWarp}>
                {dashboardArtefactItems.map((item, index) => (
                  <div key={index} className={styles.efactWarp}>
                    <Image src={item.src} alt={item.alt}></Image>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.keysWarp}>
              <h2>
                <span>KEYS </span>
                <span className={styles.badge}>(56)</span>
              </h2>
              <div>
                <Image src={Key} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.inventoryWarp}>
          <h1>
            <span>LOOTBOX </span>
            <span className={styles.badge}>(63)</span>
          </h1>
          <div className={styles.box}>
            <Image src={Box} alt="" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default StakeDashboard;
