import dynamic from 'next/dynamic';

const HeadComponent = dynamic(() => import('./HeadComponent'));

const PageSlot = ({ title, children }) => {
  return (
    <div className="home">
      <HeadComponent title={title}></HeadComponent>
      <main className="main">{children}</main>
    </div>
  );
};

export default PageSlot;
