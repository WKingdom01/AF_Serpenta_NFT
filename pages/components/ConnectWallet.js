import Modal from 'react-bootstrap/Modal';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useConnect } from 'wagmi';

const Button = dynamic(() => import('./Button'));

const ConnectWallet = ({ modalOpen, setModalOpen }) => {
  const { isConnecting, pendingConnector, connectors, error, connect } =
    useConnect({
      onConnect(data) {
        setModalOpen(false);
      },
    });

  return (
    <Modal centered show={modalOpen}>
      <div className="connect-wallet">
        
          <div className="connect-wallet__top">
            <div className="connect-wallet__title">CONNECT WALLET</div>
            <button
              onClick={() => {
                setModalOpen(false);
              }}
            >
              {' '}
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
          {connectors.map((option) => (
              <Button
                title={`Connect Your Wallet With ${option.name}`}
                style="lightBlue"
                disabled={!option.ready}
                key={option.name}
                clickHandler={() => connect(option)}
                text={option.name}
                icon={option.name}
              >
                {!option.ready && ' (unsupported)'}
              </Button>
            ))}
        </div>    
        </div>
        
        
        
        
          
    
    </Modal>
  );
};

export default ConnectWallet;
