import dynamic from 'next/dynamic';

const PageSlot = dynamic(() => import('./components/PageSlot'), {
  ssr: false,
});
const MintBlock = dynamic(() => import('./components/MintBlock'), {
  ssr: false,
});

export default function Mint() {
  return (
    <PageSlot>
      <MintBlock />
    </PageSlot>
  );
}
