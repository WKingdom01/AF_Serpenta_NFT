import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import HelpCenter from './HelpCenter';
import { useAccount, useConnect, useDisconnect, useProvider } from 'wagmi';
import shortenAddress from '/utils/helpers/shortenAddress';
import MintQuantityModal from './MintQuantityModal';
import Button from './Button';
import AlertModal  from './AlertModal';

const ConnectWallet = dynamic(() => import('./ConnectWallet'));

const MintNavBar = () => {
  let insertedWallet;
  let insertedQuantity;

  const { t } = useTranslation('common');
  const [modalOpen, setModalOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [mintQuantityModalOpen, setMintQuantityModalOpen] = useState(false);
  const [parentMintQuantity, setParentMintQuantity] = useState(null);
  const [parentEmail, setParentEmail] = useState(null);

  const { isConnected } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: accountData } = useAccount();
  const address = accountData?.address;
  const provider = useProvider();

  if (typeof window !== 'undefined') {
    insertedWallet = localStorage.getItem('inserted_wallet');
    insertedQuantity = localStorage.getItem('inserted_quantity');
  }

  function resetMintQuantity() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('inserted_quantity');
    }
    setParentMintQuantity(null);
    setParentEmail(null);
  }

  useEffect(() => {
    if (
      isConnected &&
      address &&
      (insertedWallet === null || insertedWallet !== address)
    ) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('inserted_wallet', address);
        resetMintQuantity();
      }

      fetch('/api/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
        }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (isConnected && address && insertedQuantity === null) {
      setMintQuantityModalOpen(true);

      if (parentMintQuantity) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('inserted_quantity', parentMintQuantity);
          localStorage.setItem('inserted_email', parentEmail);
        }

        fetch('/api/wallet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address,
            mint_quantity: parentMintQuantity,
            email: parentEmail,
          }),
        }).then(() => {
          setMintQuantityModalOpen(false);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, parentMintQuantity, parentEmail, insertedQuantity]);
  useEffect(()=>{
    if(provider._network.chainId!=process.env.NEXT_PUBLIC_NETWORK_ID){
       setAlertModalOpen(true);
    }
  },[provider])
  return (
    <div>
      <div className="mint-navbar">
        <button
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
          className="mint-navbar__help"
        >
          <Image
            alt="help"
            src="/help.svg"
            layout="intrinsic"
            width="50"
            height="50"
            quality={100}
            priority
            className="mint-navbar__icon"
          />
          <div className="mint-navbar__help-text">
            {t('mint.helpCenter.button').toUpperCase()}
          </div>
        </button>
        <div className="mint-navbar__logo">
          <Link href="/" passHref>
            <a>
              <Image
                alt="Logo"
                src="/logo.png"
                layout="intrinsic"
                width="625"
                height="305"
                quality={100}
                priority
              />
            </a>
          </Link>
        </div>

        <div className="mint-navbar__button">
          <div className="mint-navbar__address"></div>
          <Button
            clickHandler={() => {
              isConnected ? disconnect() : setConnectModalOpen(true);
            }}
            style="outline ThreeD"
            text={isConnected ? 'Disconnect' : 'Connect Wallet'}
            address={address && shortenAddress(address)}
            isCon={isConnected}
          ></Button>
        </div>
      </div>
      <HelpCenter
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      ></HelpCenter>
      <ConnectWallet
        modalOpen={connectModalOpen}
        setModalOpen={setConnectModalOpen}
      ></ConnectWallet>
      <MintQuantityModal
        modalOpen={mintQuantityModalOpen}
        setModalOpen={setMintQuantityModalOpen}
        setParentMintQuantity={setParentMintQuantity}
        setParentEmail={setParentEmail}
        maxMintQuantity={3}
      />
      <AlertModal  modalOpen={alertModalOpen}  setModalOpen={setAlertModalOpen}/>
    </div>
  );
};

export default MintNavBar;
