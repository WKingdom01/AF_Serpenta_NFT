
import dynamic from 'next/dynamic'


const Team  = dynamic(() =>  import('./components/Team'))
const GrayFrame  = dynamic(() =>  import('./components/GrayFrame'))
const Grid  = dynamic(() =>  import('./components/Grid'))
const Roadmap  = dynamic(() =>  import('./components/Roadmap'))
const FAQ  = dynamic(() =>  import('./components/FAQ'))
const GoldFrame  = dynamic(() =>  import('./components/GoldFrame'))
const PageSlot  = dynamic(() =>  import('./components/PageSlot'))




export default function Home() {
  return (
    <PageSlot topComponent={<GoldFrame>
        <div className="main-image image">
            <div className="image__front">
                <img
                    alt="dragon"
                    src={'/serpenta_samurai_hat.png'}
                    
                />
            </div>
        </div></GoldFrame>}
      >
      <div className="components">
        <h1 className="tagline">5555 Genesis Dragons hatching soon!</h1>
        <Grid></Grid>
        <div className="container">
          <GrayFrame title="About">
              <div className="grayframe__text">
                  <h2>What is Serpenta NFT?</h2> 

                    <p>
                      <p>Rawr! Serpenta is our draconic love letter to Japanese and retro indie game characters. Our Tokyo founder lives in the very birthplace of Kaiju, gatcha and anime culture. Stylish, fashionable and fiery - we pay homage through our timeless interpretation of these magnificent dragon-kaiju personalities. You are totally going to vibe with them as much as we do!</p>

                      <p>The first and most powerful 5555 Genesis Dragons will soon emerge into this world; flaunt your  personality through your own unique avatar. Staking and breeding them grants you unique access to subsequent generations of dragonlings, hidden treasures, new NFT drops from Japanese artists and future access passes to other projects. </p>

                      <p>We have great things planned for all our dragon fam and dragon stakers. New designs, evolving mechanics and exclusive collaborations with Japanese creators are just the tip of this iceberg.</p>
                        
                      <p>Don&apos;t miss out - join the fam!</p>
                    </p>
                </div>
            
            </GrayFrame> 
          <Roadmap></Roadmap>
        </div>    
        <FAQ></FAQ>
        <Team></Team>
      </div>
    </PageSlot>
  )
}
