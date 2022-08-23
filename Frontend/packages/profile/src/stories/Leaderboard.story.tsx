import React from 'react';
import { Leaderboard } from '../organisms/Leaderboard';
import '../styles/global.css';

export default {
    title: 'Profile/Organisms/Leaderboard',
    component: Leaderboard,
};

export const StandAlone = (): JSX.Element => {
    return (
        <div style={{ background: 'black', padding: '3em' }}>
            <Leaderboard />
        </div>
    );
};
