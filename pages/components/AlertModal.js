import Modal from 'react-bootstrap/Modal';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Button = dynamic(() => import('./Button'));

const AlertModal = ({ modalOpen, setModalOpen }) => {
 

  return (
    <Modal centered show={modalOpen} dialogClassName="modal-serpenta">
      <div className="connect-wallet">
        <div className="connect-wallet__top">
          <div className="connect-wallet__title">Change The Network</div>
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
              className="help-center__close"
            />
          </button>
        </div>
        <div className="connect-wallet__butsWrap">
         Change the network to Rinkeby test net!
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;
