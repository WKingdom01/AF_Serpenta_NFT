import dynamic from 'next/dynamic';

const HeadComponent = dynamic(() => import('./HeadComponent'));
const NavBar = dynamic(() => import('./NavBar'));

const PageSlot = ({ children }) => {
  return (
    <div className='home'>
      <HeadComponent />
      <main className='main'>
        <NavBar />
      </main>
      {children}
    </div>
  );
};

export default PageSlot;
