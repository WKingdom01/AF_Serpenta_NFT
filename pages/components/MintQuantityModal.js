import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Modal from 'react-bootstrap/Modal';
import Button from './Button';
import { MINT_QUANTITY_MODAL_POPUP_DUE_DATE } from '../../data/constants';

const MintQuantityModal = ({
  modalOpen,
  setModalOpen,
  maxMintQuantity = 0,
  setParentMintQuantity,
}) => {
  const { t, i18n, ready } = useTranslation('common', { useSuspense: false });

  const [mintQuantity, setMintQuantity] = useState(maxMintQuantity);
  const { pathname } = useRouter();

  const currentDate = new Date();
  const dueDate = MINT_QUANTITY_MODAL_POPUP_DUE_DATE;

  const hideModal = currentDate > dueDate || pathname !== '/profile';

  function mintQuantityHandler(value) {
    if (value > maxMintQuantity) {
      setMintQuantity(maxMintQuantity);
    } else if (value < 0) {
      setMintQuantity(0);
    } else {
      setMintQuantity(value);
    }
  }

  function setParentMintQuantityHandler() {
    setParentMintQuantity(mintQuantity);
  }

  return (
    <Modal centered show={modalOpen && !hideModal}>
      <div className="mint-quantity-modal">
        <div className="mint-quantity-modal__top">
          <div className="mint-quantity-modal__title">
            {t('mint.mintQuantityModal.title')}
          </div>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <Image
              alt="help"
              src="/close.svg"
              layout="intrinsic"
              width="50"
              height="50"
              quality={100}
              priority
              className="mint-quantity-modal__close"
            />
          </button>
        </div>
        <div className="mint-quantity-modal__questions">
          <div className="mint-quantity-modal__question">
            <div className="mint-quantity-modal__prompt">
              {t('mint.mintQuantityModal.description')}
            </div>
            <div className="mint-quantity-modal__answer">
              <input
                type="number"
                className="mint-quantity-modal__input"
                min="0"
                max={maxMintQuantity}
                value={mintQuantity}
                onChange={(e) => {
                  mintQuantityHandler(e.target.value);
                }}
              />

              <Button
                title={`Submit Mint Quantity`}
                style="short"
                clickHandler={() => {
                  setParentMintQuantityHandler();
                }}
              >
                {t('mint.mintQuantityModal.button')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MintQuantityModal;
