import dynamic from 'next/dynamic'


const NavBar = dynamic(() => import('./NavBar'))

const PageSlot = ({ topComponent, children }) => {
  return (
    <div className="home">

      <main className="main">
        <NavBar></NavBar>

      </main>
      {children}
    </div>
  )
}

export default PageSlot