import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react';
const Button  = dynamic(() =>  import('./Button'))
const GrayFrame  = dynamic(() =>  import('./GrayFrame'))


const MintBlock =() => {  
  const [walletConnected, setWalletConnected] = useState(false)
  
  const connectWallet = () => {
    if(!walletConnected) {
      setWalletConnected(true)
    }
  }
  return (
    <div className="mint-block container">
      <GrayFrame title="mint">
        <div className="mint-block__block">
          {
            walletConnected ? 
              <div className="mint-block__container">
                <div className="mint-block__score">
                    300/3000 Minted

                </div>
                <Button link="/" text="Mint"></Button> 
              
              </div>
              : <Button clickHandler={connectWallet} text="Connect Your Wallet"></Button>
          }
        </div> 
      </GrayFrame>
    </div>
  )
}

export default MintBlock