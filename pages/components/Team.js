import Image from 'next/image'

const Team = () => (
  <section className="team component">
      
      <div className="container team__container">
      <h2 className="team__title title">TEAM</h2>
    <div className="team__members">
    <div className="team__member">
        
        <div className="team__image">
            <Image
                alt="dragon"
                src="/2.png"
                layout="intrinsic"
                width="200"
                height="200"
                quality={100}
                loading="lazy"
                />
        </div>
        <div className="team__text">
            <h2>Pine</h2>
            <h3>creative designer</h3> 
            <p>Our creative lead, a prolific and successful collector of fine digital antiquities, a respected member in many communities and a determined proponent of the hard work behind the business grind and hustle.</p> 
            <a className="team__twitter" href="https://twitter.com/cryptpine" target="_blank" rel="noreferrer">
                <Image
                    alt="twitter"
                    src="/twitter.svg"
                    layout="intrinsic"
                    width="121"
                    height="100"
                    quality={100}
                    loading="lazy"
                    />
            </a>
        </div>
    </div>
    <div className="team__member">
        <div className="team__image">
            <Image
                alt="dragon"
                src="/1.png"
                layout="intrinsic"
                width="200"
                height="200"
                quality={100}
                loading="lazy"
                />
        </div>
        <div className="team__text">
            <h2>Miaoux</h2>
            <h3>marketing, biz-dev</h3> 
            <p>Storyteller and geek polymath specialising in growth and logistics. Serial builder of multi-million dollar companies. He&apos;s channeling his seasoned expertise in business, NFTs and crypto to benefit Serpenta.</p>
            <a className="team__twitter" href="https://twitter.com/miaoux" target="_blank" rel="noreferrer">
                <Image
                    alt="twitter"
                    src="/twitter.svg"
                    layout="intrinsic"
                    width="121"
                    height="100"
                    quality={100}
                    loading="lazy"
                    />
            </a>
        </div>
    </div>
    <div className="team__member">
        <div className="team__image">
            <Image
                alt="dragon"
                src="/d3.png"
                layout="intrinsic"
                width="200"
                height="200"
                quality={100}
                loading="lazy"
                />
        </div>
        <div className="team__text">
            <h2>Remo</h2>
            <h3>Designer</h3> 
            <p>Bringing the dragons to vibrant life is our inspired indie artist. He joined our talented team many moons ago and astounds us with his skill daily. We are fortunate to have his visionary abilities. </p> 
            <a className="team__twitter" href="https://twitter.com/remimoth" target="_blank" rel="noreferrer">
                <Image
                    alt="twitter"
                    src="/twitter.svg"
                    layout="intrinsic"
                    width="121"
                    height="100"
                    quality={100}
                    loading="lazy"
                    />
            </a>
        </div>
    </div>
    <div className="team__member">
        <div className="team__image">
            <Image
                alt="Logo"
                src="/d4.png"
                layout="intrinsic"
                width="200"
                height="200"
                quality={100}
                loading="lazy"
                />
        </div>
        <div className="team__text">
            <h2>Dani</h2>
            <h3>solidity engineer</h3> 
            <p>Our insanely skilled dev has contributed to a more efficient ERC721A and written many more ethereum contracts. He is in constant demand from developers for his solidity expertise. We are in safe hands. </p> 
            <a className="team__twitter" href="https://twitter.com/danipopes" target="_blank" rel="noreferrer">
                <Image
                    alt="twitter"
                    src="/twitter.svg"
                    layout="intrinsic"
                    width="121"
                    height="100"
                    quality={100}
                    loading="lazy"
                    />
            </a>
        </div>
    </div>
    </div>
    </div>
  </section>
)

export default Team