import React from 'react';
import { PurchaseHistory } from '../organisms/PurchaseHistory';
import '../styles/global.css';

export default {
    title: 'Profile/Organisms/PurchaseHistory',
    component: PurchaseHistory,
};

export const StandAlone = (): JSX.Element => {
    return (
        <div style={{ background: 'black', padding: '3em' }}>
            <PurchaseHistory />
        </div>
    );
};
