import dynamic from 'next/dynamic'
import Image from 'next/image'
const Question  = dynamic(() =>  import('./Question'))
import { Parallax } from 'react-parallax'


const FAQ = ({children}) => {



  return (
   
      <section className="container">
        <div className="FAQ component">
          <div className="FAQ__questions">
          <Question question="Mint Information" answer="5555 Genesis Dragons are quietly incubating and will reveal themselves two days after the mint date. Get whitelisted early to be able to mint your dragon eggs before the public phase. Public access will be granted to all once after the whitelisted members have minted their dragon eggs. Every wallet will be able to mint up to 2 dragons. Expect our launch March/April 2022. Follow our twitter for the latest news as it happens. "></Question>
          <Question question="What will the mint price be?" answer="The initial sale price for a Serpenta Dragon will be REDACTED ETH, +some ETH for the gas fee."></Question>
          <Question question="How do I buy a Serpenta Dragon?" answer="During the whitelist or public mint periods you can visit the Serpenta mint page on this page and buy your unrevealed dragon NFT. After these times, you will be able to make your purchases on OpenSea. We recommend using the Metamask extension for Chrome. Do not forget to get some ETH for the mint."></Question>
          <Question question="What is the total supply?" answer="There will be a total of 5555 Serpenta Genesis Dragons."></Question>
          <Question question="Further Questions?" answer="Feel free to ask us questions on Twitter or direct them at our community in our Discord. Everyone is super friendly!"></Question>
          </div>
        </div>
      </section>
)
  }

export default FAQ