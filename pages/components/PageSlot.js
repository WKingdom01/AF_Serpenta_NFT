import dynamic from 'next/dynamic'

const HeadComponent = dynamic(() => import('./HeadComponent'))
const NavBar = dynamic(() => import('./NavBar'))

const PageSlot = ({ topComponent, children }) => {
  return (
    <div className="home">
      <HeadComponent></HeadComponent>
      <main className="main">
        <NavBar></NavBar>

      </main>
      {children}
    </div>
  )
}

export default PageSlot