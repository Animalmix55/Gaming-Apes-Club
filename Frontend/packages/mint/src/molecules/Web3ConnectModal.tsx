import React from 'react';
import { useProvider, Web3ConnectModalManual } from '@gac/shared';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';

export const Web3ConnectModal = (): JSX.Element => {
    const { web3, chainId } = useProvider();
    const { chainId: expectedChainId } = useGamingApeContext();

    const invalidChain =
        expectedChainId !== undefined &&
        chainId !== undefined &&
        chainId !== expectedChainId;

    return (
        <Web3ConnectModalManual
            isOpen={!web3 || invalidChain}
            expectedChainId={expectedChainId}
        />
    );
};

export default Web3ConnectModal;
