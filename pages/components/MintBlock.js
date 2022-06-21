import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  useConnect,
  useAccount,
  useNetwork,
  useSignMessage,
  useDisconnect,
} from 'wagmi';
import { SiweMessage } from 'siwe';
import shortenAddress from '../../utils/helpers/shortenAddress';

const Button = dynamic(() => import('./Button'));

const MintBlock = () => {
  const [state, setState] = useState({});
  const [message, setMessage] = useState();
  const [signature, setSignature] = useState();
  const [me, setMe] = useState();

  const { isConnecting, pendingConnector, connectors, error, connect } =
    useConnect();
  const { data: accountData } = useAccount();
  const { disconnect } = useDisconnect();
  const { activeChain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const domain = window.location.host;
  const origin = window.location.origin;

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
  }, []);

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
  }, []);

  /**
   * Unset all state variables
   */
  const unsetAll = () => {
    setMe(undefined);
    setMessage(undefined);
    setSignature(undefined);
  };

  return (
    <div className='mint-block container'>
      <div>
        <h2>Serpenta Mint Page</h2>
        {accountData ? (
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
              text='Disconnect'
            />
            <h2>Siwe Actions</h2>
            <Button clickHandler={() => signIn()} text='Sign in' />
            <Button
              clickHandler={() => retrieveMe()}
              text='Retrieve Wallet Info'
            />
            <Button
              clickHandler={() => {
                unsetAll();
                logOut();
              }}
              text='Log out'
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

      {!accountData ? (
        <div>
          <h2>Wallet Connectors</h2>
          {connectors.map((option) => (
            <Button
              title={`Connect Your Wallet With ${option.name}`}
              disabled={!option.ready}
              key={option.name}
              clickHandler={() => connect(option)}
              text={option.name}
            >
              {!option.ready && ' (unsupported)'}
              {isConnecting && pendingConnector?.id === option.id && (
                <small>(Awaiting Connection...)</small>
              )}
            </Button>
          ))}

          {error ? (
            <div>
              <h2>Errors</h2>
              <span>Error!</span>
              <br />
              <span>
                {error?.message ? `${error?.message}.` : 'Unknown error.'}
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default MintBlock;
