import React from 'react';
import { Web3ConnectButton } from '../atoms/Web3ConnectButton';

export default {
    title: 'Market/Atoms/Web3ConnectButton',
    component: Web3ConnectButton,
};

export const StandAlone = (): JSX.Element => {
    const [modalOpen, setModalOpen] = React.useState(false);

    return (
        <div
            style={{
                backgroundColor: 'black',
                height: '900px',
                width: '600px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Web3ConnectButton
                setConnectModalOpen={setModalOpen}
                connectModalOpen={modalOpen}
            />
        </div>
    );
};
