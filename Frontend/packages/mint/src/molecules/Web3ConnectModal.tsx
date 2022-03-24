import React from 'react';
import { GlowButton, useProvider, Web3ConnectModalManual } from '@gac/shared';
import { useStyletron } from 'styletron-react';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import { TroubleConnectingModal } from './TroubleConnectingModal';

export const Web3ConnectModal = (): JSX.Element => {
    const { web3, chainId } = useProvider();
    const { chainId: expectedChainId } = useGamingApeContext();

    const [css] = useStyletron();
    const [troubleModalOpen, setTroubleModalOpen] = React.useState(false);

    const invalidChain =
        expectedChainId !== undefined &&
        chainId !== undefined &&
        chainId !== expectedChainId;

    return (
        <Web3ConnectModalManual
            isOpen={!web3 || invalidChain}
            expectedChainId={expectedChainId}
        >
            <TroubleConnectingModal
                onClose={(): void => setTroubleModalOpen(false)}
                isOpen={troubleModalOpen}
            />
            <div className={css({ display: 'flex', width: '100%' })}>
                <GlowButton
                    onClick={(): void => setTroubleModalOpen(true)}
                    className={css({ margin: '10px 0px 0px auto' })}
                >
                    Not Working?
                </GlowButton>
            </div>
        </Web3ConnectModalManual>
    );
};

export default Web3ConnectModal;
