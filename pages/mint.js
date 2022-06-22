import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
const PageSlot = dynamic(() => import('./components/PageSlot'))
const MintBlock = dynamic(() => import('./components/MintBlock'), { ssr: false })
const MintNavBar = dynamic(() => import('./components/MintNavBar'))



export default function Home() {
    const { t } = useTranslation('common')
    const [walletConnected, setWalletConnected] = useState(false)

    return (<div style={{ background: `url('/starrybg.png')` }} >
        <PageSlot>
            <MintNavBar ></MintNavBar>
            <div className="mint">
                <MintBlock></MintBlock>
                <div className="mint__socials">
                    <Link href={t('navbar.linkOneLink')} className="mint__social-link">
                        <a>
                            <Image
                                alt="Logo"
                                src="/opensea.svg"
                                layout="intrinsic"
                                width="31"
                                height="25"
                                quality={100}
                                priority
                            />
                        </a>
                    </Link>
                    <Link href={t('navbar.linkOneLink')} className="mint__social-link">
                        <a>
                            <Image
                                alt="Logo"
                                src="/twitter.svg"
                                layout="intrinsic"
                                width="31"
                                height="25"
                                quality={100}
                                priority
                            />
                        </a>
                    </Link>
                    <Link href={t('navbar.linkOneLink')} className="mint__social-link">
                        <a>
                            <Image
                                alt="Logo"
                                src="/discord.svg"
                                layout="intrinsic"
                                width="31"
                                height="25"
                                quality={100}
                                priority
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </PageSlot>
    </div>)
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})
