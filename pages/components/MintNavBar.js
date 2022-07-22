import dynamic from 'next/dynamic';
const Button = dynamic(() => import('./Button'))
const ConnectWallet = dynamic(() => import('./ConnectWallet'))
import Image from 'next/image'
import HelpCenter from './HelpCenter';
import { useState } from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux';

import {
    useConnect,
    useDisconnect
} from 'wagmi';

const MintNavBar = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [connectModalOpen, setConnectModalOpen] = useState(false)
    const state = useSelector(state => state.wallet)
    const { isConnected } = useConnect()
    const { disconnect } = useDisconnect();   
    return (
        <div>
            <div className="mint-navbar">

                <button onClick={() => { setModalOpen(!modalOpen) }} className="mint-navbar__help">
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
                        Help Center
                    </div>
                </button>
                <div className="mint-navbar__logo">
                    <Image
                        alt="Logo"
                        src="/logo.png"
                        layout="intrinsic"
                        width="625"
                        height="305"
                        quality={100}
                        priority
                    />
                </div>
                <div className="mint-navbar__button">
                    <Button clickHandler={() => { isConnected ? disconnect() : setConnectModalOpen(true) }} style="outline ThreeD" text={isConnected ?'Connected' : 'Connect Wallet'}></Button>
                </div>

            </div>
            <HelpCenter modalOpen={modalOpen} setModalOpen={setModalOpen}></HelpCenter>
            <ConnectWallet modalOpen={connectModalOpen} setModalOpen={setConnectModalOpen}></ConnectWallet>
        </div>
    )
}

export default MintNavBar