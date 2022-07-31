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
  setParentEmail,
}) => {
  const { t, i18n, ready } = useTranslation('common', { useSuspense: false });

  const [mintQuantity, setMintQuantity] = useState('');
  const [email, setEmail] = useState('');

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

  function emailHandler(value) {
    setEmail(value);
  }

  function setParentMintQuantityHandler() {
    setParentMintQuantity(mintQuantity);
  }

  function setParentEmailHandler() {
    setParentEmail(email);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setParentMintQuantityHandler();
    setParentEmailHandler();
    setModalOpen(false);
  }

  return (
    <Modal
      centered
      show={modalOpen && !hideModal}
      dialogClassName="modal-serpenta"
    >
      <div className="mint-quantity-modal">
        <div className="mint-quantity-modal__top">
          <div className="mint-quantity-modal__title">
            {t('profile.mintQuantityModal.title')}
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
              {t('profile.mintQuantityModal.description')}
            </div>
            <div className="mint-quantity-modal__answer">
              <form
                className="mint-quantity-modal__form"
                onSubmit={handleSubmit}
              >
                <label
                  htmlFor="mint-quantity"
                  className="mint-quantity-modal__label"
                >
                  {t('profile.mintQuantityModal.mintQuantityLabel')}
                  <span className="mint-quantity-modal__required">*</span>
                  <input
                    type="number"
                    id="mint-quantity"
                    className="mint-quantity-modal__input"
                    min="0"
                    max={maxMintQuantity}
                    value={mintQuantity}
                    onChange={(e) => {
                      mintQuantityHandler(e.target.value);
                    }}
                    placeholder={t(
                      'profile.mintQuantityModal.mintQuantityPlaceHolder'
                    )}
                    required
                  />
                </label>

                <label
                  htmlFor="mint-quantity-email"
                  className="mint-quantity-modal__label"
                >
                  {t('profile.mintQuantityModal.mintEmailLabel')}
                  <input
                    type="email"
                    id="mint-quantity-email"
                    className="mint-quantity-modal__input"
                    value={email}
                    onChange={(e) => {
                      emailHandler(e.target.value);
                    }}
                    placeholder={t(
                      'profile.mintQuantityModal.mintEmailPlaceHolder'
                    )}
                  />
                </label>

                <p className="mint-quantity-modal__input-description">
                  {t('profile.mintQuantityModal.mintEmailDescription')}
                </p>

                <Button
                  title={`Submit Mint Quantity`}
                  style="short"
                  type="submit"
                >
                  {t('profile.mintQuantityModal.button')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MintQuantityModal;
