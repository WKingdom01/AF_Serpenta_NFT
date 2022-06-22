import dynamic from 'next/dynamic';
const Button = dynamic(() => import('./Button'))
import Image from 'next/image'
import HelpCenter from './HelpCenter';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'


const MintNavBar = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const state = useSelector(state => state.wallet)
    const dispatch = useDispatch()

    const connectWallet = () => {
        console.log('connect')
        if (true) {
            dispatch({
                type: 'CONNECT_WALLET', payload: {
                    wallet: {
                        connected: true
                    }
                }
            })
        }
    }
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
                    <Button clickHandler={connectWallet} style="outline ThreeD" text={state?.wallet?.connected ? 'Wallet Connected' : 'Connect Wallet'}></Button>
                </div>

            </div>
            <HelpCenter modalOpen={modalOpen} setModalOpen={setModalOpen}></HelpCenter>
        </div>
    )
}

export default MintNavBar