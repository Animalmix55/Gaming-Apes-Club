import React from 'react';
import { SocialEarnings } from '../organisms/SocialEarnings';
import '../styles/global.css';

export default {
    title: 'Profile/Organisms/SocialEarnings',
    component: SocialEarnings,
};

export const Normal = (): JSX.Element => {
    return (
        <div style={{ background: 'black', padding: '3em' }}>
            <SocialEarnings comingSoon={false} />
        </div>
    );
};

export const ComingSoon = (): JSX.Element => {
    return (
        <div style={{ background: 'black', padding: '3em' }}>
            <SocialEarnings />
        </div>
    );
};
