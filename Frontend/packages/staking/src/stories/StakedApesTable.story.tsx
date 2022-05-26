import React from 'react';
import { StakedApesTable } from '../molecules/StakedApesTable';

export default {
    title: 'Staking/Atoms/StakedApesTable',
    component: StakedApesTable,
};

export const StandAlone = (): JSX.Element => {
    return <StakedApesTable />;
};
