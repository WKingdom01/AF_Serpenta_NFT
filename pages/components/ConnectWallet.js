import Modal from 'react-bootstrap/Modal';
import dynamic from 'next/dynamic'
import {
    useConnect, isConnecting, pendingConnector, connectors, error, connect
} from 'wagmi';


const Button = dynamic(() => import('./Button'));

const ConnectWallet = ({ modalOpen, setModalOpen }) => {

    const { isConnecting, pendingConnector, connectors, error, connect } =
        useConnect({
            onConnect(data) {
                setModalOpen(false)
            },
        });

    return (
        <Modal centered show={modalOpen}>
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
        </Modal>
    )
}

export default ConnectWallet