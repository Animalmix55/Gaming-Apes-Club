import React from 'react';
import { DashboardPage } from '../organisms/DashboardPage';

export default {
    title: 'Market/Organisms/DashboardPage',
    component: DashboardPage,
};

export const StandAlone = (): JSX.Element => {
    return (
        <div style={{ height: '100vh' }}>
            <DashboardPage />
        </div>
    );
};
