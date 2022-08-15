import React from 'react';
import { DashboardPage } from '../organisms/DashboardPage';
import '../styles/global.css';

export default {
    title: 'Dashboard/Organisms/DashboardPage',
    component: DashboardPage,
};

export const StandAlone = (): JSX.Element => {
    return (
        <div style={{ height: '100vh' }}>
            <DashboardPage />
        </div>
    );
};
