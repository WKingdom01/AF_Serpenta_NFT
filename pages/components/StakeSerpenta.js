import React, { useState } from 'react';

import Image from 'next/image';

import Artefact from './Artefact';

//Import style
import styles from '/styles/stake.module.scss';


import lvl1 from '/static/stake/lvl1.png';
import lvl2 from '/static/stake/lvl2.png';
import lvl3 from '/static/stake/lvl3.png';
import lvl4 from '/static/stake/lvl4.png';
import lvl5 from '/static/stake/lvl5.png';
import key from '/static/stake/1key.png';

import { dragonDetailItems } from '/data/stakeData';

const DragonDetail = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState();
  const onClickArtefact = (img) => {
    setSelectedImg(img);
    setModalOpen(show);
  };

  return (
    <div className={styles.row2}>
      <div className={styles.columnLeft}>
        <div className={styles.drgImg} style={{ background: data.bgColor }}>
          <Image src={data.imgSrc} alt="level"></Image>
        </div>
        <div className={styles.lvlstatus}>
          <div
            className={styles.bar}
            style={{ width: data.lvl * 20 + '%' }}
          ></div>
        </div>
        <div className={styles.row3}>
          <div className={styles.lvlArrayImg}>
            <Image src={lvl1}></Image>
          </div>
          <div className={styles.lvlArrayImg}>
            <Image src={lvl2}></Image>
          </div>
          <div className={styles.lvlArrayImg}>
            <Image src={lvl3}></Image>
          </div>
          <div className={styles.lvlArrayImg}>
            <Image src={lvl4}></Image>
          </div>
          <div className={styles.lvlArrayImg}>
            <Image src={lvl5}></Image>
          </div>
        </div>
        <div className={styles.dragonId}>
          <span>DRAGON </span>
          <span>#{data.id}</span>
        </div>
        <div className={styles.cirLvlText}>
          <span>Current level is {data.lvlStr}</span>
        </div>
        <div className={styles.drgExplainTxt}>
          <p>
            This dragon is generating keys! Use them to open the lootboxes & win
            rewards. The key will generate in:
          </p>
          <div className={styles.row4}>
            <div>2d</div>
            <div>2h</div>
            <div>
              <Image src={key}></Image>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.columnRight}>
        <div className={styles.columnRight}>
          <div className={styles.revealTxt}>
            <div className={styles.leftTxt}>
              {' '}
              {data.nextRevealTime}
              {data.nextRevealTimeUnit}s until next reveal
            </div>
            <div className={styles.rightTxt}>
              Total staking time: {data.stakingDays} days
            </div>
          </div>
          <div className={styles.timeline}>
            <div className={styles.passline} style={{ width: '30%' }}></div>
          </div>
        </div>
        <div className={styles.revealExpTxt}>
          <p>
            Click on the slice to view it or reroll it. Each slice contains an
            image of a dimension that the dragon has visited. There is a
            possibility of an artefact with each reveal.<br></br>Follow the
            journey of your personal Serpenta dragons closely and who knows what
            you can obtain!{' '}
          </p>
        </div>
        <div className={styles.revealImgArray}>
          {data.revealItemArray.map((item, index) => (
            <Artefact
              key={index}
              img={item.imgSrc}
              item={item.itemSrc}
              isReveal={item.isReveal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
const Serpenta = (props) => {
  return (
    <section>
      <div className={styles.contentWarpDashboard}>
        <h2>THE SERPENTA WORLD</h2>
        <p>
          Find your Kaiju dragons here. Explore the dimensions, dive into the
          lore, and collect artefacts. Oh, and don’t forget to check-in for the
          keys — they will surely be handy to open the loot boxes!
        </p>
      </div>
      <div className={styles.serpentaWarp}>
        <button onClick={() => props.setDashboard(true)}>
          BACK TO DASHBOARD
        </button>
      </div>
      <div className={styles.hLinen}></div>
      <div className={styles.dragonsList}>
        {dragonDetailItems.map((item, index) => (
          <DragonDetail key={index} data={item} />
        ))}
      </div>
    </section>
  );
};
export default Serpenta;
