import React from 'react';
import ConnectDiscord from '../molecules/ConnectDiscord';
import '../styles/global.css';

export default {
    title: 'Profile/Molecules/ConnectDiscord',
    component: ConnectDiscord,
};

export const StandAlone = (): JSX.Element => {
    return (
        <div style={{ height: '100vh', padding: '3em', background: 'black' }}>
            <ConnectDiscord />
        </div>
    );
};
