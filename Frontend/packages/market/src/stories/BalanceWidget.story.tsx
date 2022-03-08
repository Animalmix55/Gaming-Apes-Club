import React from 'react';
import { BalanceWidget } from '../atoms/BalanceWidget';

export default {
    title: 'Market/Atoms/BalanceWidget',
    component: BalanceWidget,
};

export const StandAlone = (): JSX.Element => (
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
        <BalanceWidget />
    </div>
);
