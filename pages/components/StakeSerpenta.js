import React, { useState } from 'react';

import Image from 'next/image';

import Artefact from './Artefact';

//Import style
import styles from '/styles/stake.module.scss';

//Import Image
import Img1 from '/static/stake/drg1.png';
import Img2 from '/static/stake/drg2.png';

import lvl1 from '/static/stake/lvl1.png';
import lvl2 from '/static/stake/lvl2.png';
import lvl3 from '/static/stake/lvl3.png';
import lvl4 from '/static/stake/lvl4.png';
import lvl5 from '/static/stake/lvl5.png';

import reveal from '/static/stake/reveal.png';
import unreveal0 from '/static/stake/unreveal11.png';
import unreveal1 from '/static/stake/unreveal0.png';
import unreveal2 from '/static/stake/unreveal2.png';
import unreveal3 from '/static/stake/unreveal3.png';
import unreveal6 from '/static/stake/unreveal6.png';

import Artefactnone from '/static/stake/Artefact_none.png';
import Artefactunreveal from '/static/stake/Artefact_unreveal.png';
import Artefact1 from '/static/stake/Artefact1.png';
import Artefact2 from '/static/stake/Artefact2.png';
import Artefact3 from '/static/stake/Artefact3.png';

import key from '/static/stake/1key.png';
const DragonDetail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState();
  const onClickArtefact = (img) => {
    setSelectedImg(img);
    setModalOpen(show);
  };

  return (
    <div className={styles.row2}>
      <div className={styles.columnLeft}>
        <div className={styles.drgImg} style={{ background: '#FBEDD6' }}>
          <Image src={Img1} alt="level"></Image>
        </div>
        <div className={styles.lvlstatus}>
          <div className={styles.bar} style={{ width: '30%' }}></div>
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
          <span>#1029</span>
        </div>
        <div className={styles.cirLvlText}>
          <span>Current level is Bronze</span>
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
            <div className={styles.leftTxt}> 2 weeks until next reveal</div>
            <div className={styles.rightTxt}>Total staking time: 19 days</div>
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
          <Artefact img={reveal} item={Artefact1} isReveal={true} />
          <Artefact img={unreveal1} item={Artefactunreveal} isReveal={false} />
          <Artefact img={unreveal2} item={Artefactunreveal} isReveal={false} />
          <Artefact img={unreveal3} item={Artefactunreveal} isReveal={false} />
          <Artefact img={unreveal6} item={Artefactunreveal} isReveal={false} />
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
        <DragonDetail />
        <DragonDetail />
      </div>
    </section>
  );
};
export default Serpenta;
