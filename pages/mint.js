import dynamic from 'next/dynamic'

const PageSlot  = dynamic(() =>  import('./components/PageSlot'))
const MintBlock  = dynamic(() =>  import('./components/MintBlock'))

export default function Home() {
    return  (<PageSlot topComponent={<MintBlock></MintBlock>}></PageSlot>)
}