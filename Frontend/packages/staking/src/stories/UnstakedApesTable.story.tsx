import React from 'react';
import { UnstakedApesTable } from '../molecules/UnstakedApesTable';

export default {
    title: 'Staking/Atoms/UnstakedApesTable',
    component: UnstakedApesTable,
};

export const StandAlone = (): JSX.Element => {
    return <UnstakedApesTable />;
};
