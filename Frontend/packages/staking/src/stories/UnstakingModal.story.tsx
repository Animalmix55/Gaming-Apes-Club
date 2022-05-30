/* eslint-disable no-void */
import React from 'react';
import { UnstakingModal } from '../molecules/UnstakingModal';

export default {
    title: 'Staking/Molecules/UnstakingModal',
    component: UnstakingModal,
};

export const StandAlone = (): JSX.Element => {
    return (
        <UnstakingModal
            onClose={(): void => void 0}
            isOpen
            transactionHash="0xdfa3b5fc6cb37bc749e9af044d5146cab855cd28439389b2e0a0e706eccc5cfc"
        />
    );
};
