import dynamic from 'next/dynamic'
const Button  = dynamic(() =>  import('./Button'))
const GrayFrame  = dynamic(() =>  import('./GrayFrame'))


const MintBlock =() => {          
  return (
    <div className="mint-block container">
      <GrayFrame title="mint">
        <div className="mint-block__block">
          <Button link="/" text="Connect Your Wallet"></Button>
          {/* <Button link="/" text="Mint"></Button> */}
        </div> 
      </GrayFrame>
    </div>
  )
}

export default MintBlock