import dynamic from 'next/dynamic'

const GoldFrame  = dynamic(() =>  import('./GoldFrame'))


const Content = () =>  {
    const imgs = ['/1.png','/2.png','/3.png','/5.png']


    return <div>
            <GoldFrame>
                <div className="main-image image">
                    <div className="image__front">
                        <img
                            alt="dragon"
                            src={'/serpenta_samurai_hat.png'}
                            
                        />
                    </div>
                    {/* <div className="image__back">
                        <img
                            alt="dragon"
                            src={imgs[Math.floor(Math.random() * imgs.length)]}
                            
                        />
                    </div> */}
                    
                </div>
                
            </GoldFrame>

           
         
            
        </div>
}

export default Content