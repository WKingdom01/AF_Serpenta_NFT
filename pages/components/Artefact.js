import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import Q from '/static/stake/question.png';
import styles from '/styles/stake.module.scss';

const ArtefactModal = dynamic(() => import('./ArtefactModal'));

const Artefact = ({ img, item, isReveal }) => {
  const [modalopen, setModalOpen] = useState(false);
  return (
    <div>
      <div className={styles.revealImg}>
        <button
          className={styles.revealButton}
          onClick={() => setModalOpen(true)}
        >
          <Image src={img} alt="" />
        </button>
        {!isReveal && (
          <div className={styles.question}>
            <Image src={Q} alt="" />
          </div>
        )}
      </div>

      <div className={styles.artefactImg}>
        <Image src={item} alt="" />
      </div>

      <ArtefactModal
        modalopen={modalopen}
        setModalOpen={setModalOpen}
        img={img}
      />
    </div>
  );
};

export default Artefact;
