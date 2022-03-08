import React from 'react';
import { DiscordLoginButton } from '../atoms/DiscordLoginButton';

export default {
    title: 'Market/Atoms/DiscordLoginButton',
    component: DiscordLoginButton,
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
        <DiscordLoginButton />
    </div>
);
