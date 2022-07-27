import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import Button from './Button';

const MintQuantityModal = ({
  modalOpen,
  setModalOpen,
  maxMintQuantity = 0,
  setParentMintQuantity,
}) => {
  const { t, i18n, ready } = useTranslation('common', { useSuspense: false });

  const [mintQuantity, setMintQuantity] = useState(maxMintQuantity);

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
    <Modal centered show={modalOpen}>
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
