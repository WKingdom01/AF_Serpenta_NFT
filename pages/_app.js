import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import { providers } from 'ethers';
import { chain, createClient, defaultChains, WagmiConfig } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import nextI18NextConfig from '../next-i18next.config.js';
import * as gtag from '../utils/gtag';

import '../styles/globals.scss';
import '../styles/reset.scss';
import '../styles/main.scss';
import { FeatureToggle } from './components/FeatureToggle';

const chains = defaultChains;
const defaultChain = chain.mainnet;

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const etherscanApiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
const appName = process.env.NEXT_PUBLIC_APP_NAME;

/**
 *
 * @param {number} chainId
 * @returns {boolean}
 */
const isChainSupported = (chainId) =>
  chains.some((chain) => chain.id === chainId);

/**
 *
 * @param {Array} connectors
 * @returns
 */
const connectors = ({ chainId }) => {
  // RPC
  const rpcUrls =
    chains.find((x) => x.id === chainId)?.rpcUrls ?? chain.mainnet.rpcUrls;

  // Return options
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new CoinbaseWalletConnector({
      options: {
        appName,
        jsonRpcUrl: `${rpcUrls.alchemy}/${infuraId}`,
      },
    }),
  ];
};

/**
 *
 * @param {number} chainId
 * @returns BaseProvider
 */
const provider = ({ chainId }) =>
  providers.getDefaultProvider(
    isChainSupported(chainId) ? chainId : defaultChain.id,
    {
      alchemy: alchemyApiKey,
      etherscan: etherscanApiKey,
      infura: infuraId,
    }
  );

/**
 * @param {Object} options
 */
const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const enabledFeatures = [
    process.env.NEXT_PUBLIC_FEATURE_PROFILE === 'true' ? 'profile' : '',
    process.env.NEXT_PUBLIC_FEATURE_MINT === 'true' ? 'mint' : '',
    process.env.NEXT_PUBLIC_FEATURE_STAKE === 'true' ? 'stake' : '',
  ].filter(Boolean);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="nextjs-google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <WagmiConfig client={client}>
        <FeatureToggle enabledFeatures={enabledFeatures}>
          <Component {...pageProps} />
        </FeatureToggle>
      </WagmiConfig>
    </>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
