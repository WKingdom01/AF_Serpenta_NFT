import dynamic from 'next/dynamic'

const HeadComponent = dynamic(() =>  import('./HeadComponent'))
const Background  = dynamic(() =>  import('./background'))
const NavBar  = dynamic(() =>  import('./NavBar'))

const PageSlot =({topComponent, children}) => {          
    return (
        <div className="home">
          <HeadComponent></HeadComponent>
          <main className="main">
            <NavBar></NavBar>
            <section>
              <Background 
                top={<div className="navbar--static"></div>}
                bottom={topComponent}>
              </Background>
            </section>
          </main>
          {children}
        </div>
    )
}

export default PageSlot