import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Grid = dynamic(() => import('./Grid'))
const Button = dynamic(() => import('./Button'))


const MintBlock = ({ walletConnected }) => {

  const [width, setWidth] = useState('100%')
  const [mints, setMints] = useState(1);
  const [mintError, setMintError] = useState(false)
  const [soldOut, setSoldOut] = useState(true)

  const incrementMints = (newMintValue) => {
    if (newMintValue <= 10 && newMintValue > 0) {
      setMints(newMintValue)
    }
  }

  const mint = () => {
    if (!walletConnected) {
      setMintError(true)
    }
  }

  const connectWallet = () => {
    if (!walletConnected) {
      setWalletConnected(true)
    }
  }
  return (
    <div className="mint__block container">
      <Grid alt="true"></Grid>
      <div className="mint__container">
        <div className="mint__amount">


          <div className="mint__left">
            <div className="mint__eyebrow">
              Amount
            </div>
            <div className="mint__input">
              <input value={mints}>
              </input>
              <div className="mint__counters">
                <button className="mint__counter-button">
                  <FontAwesomeIcon className="icon" icon={faMinus} onClick={() => { incrementMints(mints--) }} />
                </button>
                <button className="mint__counter-button">
                  <FontAwesomeIcon className="icon" icon={faPlus} onClick={() => { incrementMints(mints++) }} />
                </button>
              </div>
            </div>
          </div>
          <div className="mint__right">
            <div className="mint__eyebrow">
              Total Price
            </div>
            <div className="mint__price">
              0.12 ETH
            </div>
          </div>
        </div>
        <div className="mint__score">
          <div className="mint__eyebrow">
            Minting Now
          </div>

          <div className="mint__progress-bar">
            <div className="mint__progress-bar--filled" style={{ width: width }}></div>
            <div className="mint__minted">100/5000</div>
          </div>
          {mintError && <div className="mint__error">You will need to authorise your wallet to buy NFTs</div>}

        </div>
        {!soldOut ? <div className="mint__button">
          <Button text="Mint" style="papaya short" clickHandler={mint}></Button>
        </div> :
          <div className="mint__sold-out">
            <div className="label label--red">SOLD OUT!</div>
            <div className="label">Go to opensea.io to buy one</div>
          </div>}

      </div>


    </div>
  )
}

export default MintBlock