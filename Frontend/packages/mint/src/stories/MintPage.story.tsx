import React from 'react';
import MintPage from '../organisms/MintPage';

export default {
    title: 'Organisms/MintPage',
    component: MintPage,
};

export const StandAlone = (): JSX.Element => (
    <div
        style={{
            height: '100vh',
            width: '100vw',
        }}
    >
        <MintPage />
    </div>
);
