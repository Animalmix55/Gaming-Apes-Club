import React from 'react';
import { Leaderboard } from '../organisms/Leaderboard';
import '../styles/global.css';

export default {
    title: 'Profile/Organisms/Leaderboard',
    component: Leaderboard,
};

export const Normal = (): JSX.Element => {
    return (
        <div style={{ background: 'black', padding: '3em' }}>
            <Leaderboard comingSoon={false} />
        </div>
    );
};

export const Comingsoon = (): JSX.Element => {
    return (
        <div style={{ background: 'black', padding: '3em' }}>
            <Leaderboard />
        </div>
    );
};
