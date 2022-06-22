import dynamic from 'next/dynamic'

const HeadComponent = dynamic(() => import('./HeadComponent'))


const PageSlot = ({ topComponent, children }) => {
  return (
    <div className="home">
      <HeadComponent></HeadComponent>
      <main className="main">

        {children}
      </main>

    </div>
  )
}

export default PageSlot