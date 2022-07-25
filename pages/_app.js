import '../styles/globals.scss';
import '../styles/reset.scss';
import '../styles/main.scss';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';
import { providers } from 'ethers';
import { WagmiConfig, createClient, chain, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

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
 * @returns provider
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

import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';

function MyApp({ Component, pageProps, store }) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <>
      <WagmiConfig client={client}>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        />

        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            _html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${gaMeasurementId}, {
                page_path: window.location.pathname,
            });
        `,
          }}
        />
        <Component {...pageProps} />
      </WagmiConfig>
    </>
  );
}

export default wrapper.withRedux(appWithTranslation(MyApp, nextI18NextConfig));
