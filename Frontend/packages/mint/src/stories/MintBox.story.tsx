import React from 'react';
import { MintBox } from '../molecules/MintBox';

export default {
    title: 'Mint/Molecules/MintBox',
    component: MintBox,
};

export const StandAlone = (): JSX.Element => (
    <div
        style={{
            height: '80vh',
            width: '80vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <MintBox />
    </div>
);
