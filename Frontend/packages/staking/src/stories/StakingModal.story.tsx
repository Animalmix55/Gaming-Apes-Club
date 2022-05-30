/* eslint-disable no-void */
import React from 'react';
import { StakingModal } from '../molecules/StakingModal';

export default {
    title: 'Staking/Molecules/StakingModal',
    component: StakingModal,
};

export const StandAlone = (): JSX.Element => {
    return (
        <StakingModal
            onClose={(): void => void 0}
            isOpen
            transactionHash="0xdfa3b5fc6cb37bc749e9af044d5146cab855cd28439389b2e0a0e706eccc5cfc"
        />
    );
};
