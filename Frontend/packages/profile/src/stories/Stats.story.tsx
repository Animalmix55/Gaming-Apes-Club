import React from 'react';
import { Stats } from '../organisms/Stats';
import '../styles/global.css';

export default {
    title: 'Profile/Organisms/Stats',
    component: Stats,
};

export const StandAlone = (): JSX.Element => {
    return (
        <div style={{ height: '100vh', padding: '3rem', background: 'black' }}>
            <Stats />
        </div>
    );
};
