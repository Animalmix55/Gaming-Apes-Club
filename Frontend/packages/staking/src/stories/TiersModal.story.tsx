/* eslint-disable no-void */
import React from 'react';
import { TiersModal } from '../molecules/TiersModal';

export default {
    title: 'Staking/Molecules/TiersModal',
    component: TiersModal,
};

export const StandAlone = (): JSX.Element => {
    return <TiersModal isOpen />;
};
