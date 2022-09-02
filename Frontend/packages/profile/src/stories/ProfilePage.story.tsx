import React from 'react';
import { ProfilePage } from '../organisms/ProfilePage';
import '../styles/global.css';

export default {
    title: 'Profile/Organisms/MainPage',
    component: ProfilePage,
};

export const StandAlone = (): JSX.Element => {
    return (
        <div style={{ height: '100vh' }}>
            <ProfilePage />
        </div>
    );
};
