import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Image from 'next/image'
import { useTranslation } from 'next-i18next';
import styles from '/styles/stake.module.scss';

const ArtefactModal = ({ modalopen, setModalOpen, img }) => {

    const [questionOpen, setQuestionOpen] = useState(0)

    const { t, i18n, ready } = useTranslation('common', { useSuspense: false });

    const toggleQuestionOpen = (index) => {
        const i = index + 1
        if (i === questionOpen) {
            setQuestionOpen(0)
        } else {
            setQuestionOpen(i)
        }

    }

    return (

        <Modal centered show={modalopen}>
            <div className={styles.artefactModal}>
            <button onClick={() => { setModalOpen(false) }}> 
                    <Image
                        alt="help"
                        src="/cross.png"
                        layout="intrinsic"
                        width="50"
                        height="50"
                        quality={100}
                        priority
                        className="help-center__close"
                    />
                </button>
                <div className={styles.body}>
                    
                   
                    <Image src={img} alt="Artefact" className={styles.img}/>
                   
                    <div className={styles.box}>
                        <p>REROL (0.12) ETH</p>
                        
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default ArtefactModal