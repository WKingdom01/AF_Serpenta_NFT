import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import { useAccount, useDisconnect, useNetwork, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import shortenAddress from '../../utils/helpers/shortenAddress';

const Button = dynamic(() => import('./Button'));
const Grid = dynamic(() => import('./Grid'));

const MintBlock = () => {
  const [state, setState] = useState({});
  const [message, setMessage] = useState();
  const [signature, setSignature] = useState();
  const [me, setMe] = useState();

  const [width, setWidth] = useState('100%');
  const [mints, setMints] = useState(1);
  const [mintError, setMintError] = useState(false);
  const [soldOut, setSoldOut] = useState(false);

  const { t, i18n, ready } = useTranslation('common', { useSuspense: false });

  const { data: accountData } = useAccount();
  const { disconnect } = useDisconnect();
  const { activeChain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  if (typeof window !== 'undefined') {
    const domain = window.location.host;
    const origin = window.location.origin;
  }

  const address = accountData?.address;
  const chainId = activeChain?.id;
  const chainName = activeChain?.name;
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  /**
   * Sign in method for siwe protocol
   */
  const signIn = async () => {
    try {
      if (!address || !chainId) return;

      // Set loading
      setState({
        ...state,
        error: undefined,
        isLoading: true,
      });

      const message = new SiweMessage({
        domain,
        address,
        statement: `Sign in with ${chainName} on ${appName}`,
        uri: origin,
        chainId,
        version: 1,
      });

      setMessage(message);

      const signResult = await signMessageAsync({
        message: message.prepareMessage(),
      });
      setSignature(signResult);

      // Reset loading state
      setState({
        ...state,
        isLoading: false,
      });
    } catch (error) {
      setState({
        ...state,
        error,
        isLoading: false,
      });
    }
  };

  const retrieveMe = useCallback(async () => {
    if (!address || !chainId) return;
    // Set loading
    setState({
      ...state,
      error: undefined,
      isLoading: true,
    });

    try {
      // Retrieve me
      const meResult = await fetch(`/api/proof/${address}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const meJson = await meResult.json();

      setMe(meJson);

      // Reset loading state
      setState({
        ...state,
        isLoading: false,
      });
    } catch (error) {
      setState({
        ...state,
        error: error,
        isLoading: false,
      });
    }
  }, [address, chainId, state]);

  /**
   * logout method for siwe protocol
   */
  const logOut = useCallback(async () => {
    // Set loading
    setState({
      ...state,
      error: undefined,
      isLoading: true,
    });

    try {
      // TODO: Maybe we should do some api functions to logout from siwe?

      // Reset loading state
      setState({
        ...state,
        isLoading: false,
      });
    } catch (error) {
      setState({
        ...state,
        error: error,
        isLoading: false,
      });
    }
  }, [state]);

  /**
   * Unset all state variables
   */
  const unsetAll = () => {
    setMe(undefined);
    setMessage(undefined);
    setSignature(undefined);
  };

  const incrementMints = (newMintValue) => {
    if (newMintValue <= 10 && newMintValue > 0) {
      setMints(newMintValue);
    }
  };

  const mint = () => {
    if (!accountData) {
      setMintError(true);
    }
  };

  return (
    <div className="mint-block container">
      <div className="mint__block container">
        <Grid alt="true"></Grid>
        <div className="mint__container">
          <div className="mint__amount">
            <div className="mint__left">
              <div className="mint__eyebrow">{t('mint.amountLabel')}</div>
              <div className="mint__input">
                <input value={mints}></input>
                <div className="mint__counters">
                  <button className="mint__counter-button">
                    <FontAwesomeIcon
                      className="icon"
                      icon={faMinus}
                      onClick={() => {
                        incrementMints(mints--);
                      }}
                    />
                  </button>
                  <button className="mint__counter-button">
                    <FontAwesomeIcon
                      className="icon"
                      icon={faPlus}
                      onClick={() => {
                        incrementMints(mints++);
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="mint__right">
              <div className="mint__eyebrow">{t('mint.totalPriceLabel')}</div>
              <div className="mint__price">0.12 ETH</div>
            </div>
          </div>
          <div className="mint__score">
            <div className="mint__eyebrow">{t('mint.mintingLabel')}</div>

            <div className="mint__progress-bar">
              <div
                className="mint__progress-bar--filled"
                style={{ width: width }}
              ></div>
              <div className="mint__minted">100/5000</div>
            </div>
            {mintError && (
              <div className="mint__error">
                {' '}
                {t('mint.errors.authorizeLabel')}
              </div>
            )}
          </div>
          {!soldOut ? (
            <div className="mint__button">
              <Button
                text="Mint"
                style="papaya short"
                clickHandler={mint}
              ></Button>
            </div>
          ) : (
            <div className="mint__sold-out">
              <div className="label label--red"> {t('mint.soldOut')}</div>
              <div className="label"> {t('mint.openSea')}</div>
            </div>
          )}
        </div>
      </div>
      <div>
        {false && accountData ? ( //hiding this for now.
          <div>
            <p>
              <small>Connected With</small>
            </p>
            <pre title={accountData?.address}>
              <dl>
                <dt>Full Address:</dt>
                <dd>
                  <code>{accountData?.address}</code>
                </dd>
                <dt>Short Address:</dt>
                <dd>
                  <code>{shortenAddress(accountData?.address)}</code>
                </dd>
              </dl>
            </pre>
            <h2>Wallet Actions</h2>
            <Button
              title={'Disconnect your Wallet'}
              clickHandler={() => {
                unsetAll();
                disconnect();
              }}
              text="Disconnect"
            />
            <h2>Siwe Actions</h2>
            <Button clickHandler={() => signIn()} text="Sign in" />
            <Button
              clickHandler={() => retrieveMe()}
              text="Retrieve Wallet Info"
            />
            <Button
              clickHandler={() => {
                unsetAll();
                logOut();
              }}
              text="Log out"
            />

            <h3>Debug SIWE</h3>
            <p>
              <small>Debug</small>
            </p>
            <pre>
              <code>
                {JSON.stringify(
                  {
                    me,
                    message,
                    signature,
                  },
                  null,
                  ' '
                )}
              </code>
            </pre>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MintBlock;
