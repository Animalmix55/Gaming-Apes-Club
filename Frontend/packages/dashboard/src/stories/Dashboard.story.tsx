import React from 'react';
import { Dashboard } from '../molecules/Dashboard';

export default {
    title: 'Market/Molecules/Dashboard',
    component: Dashboard,
};

export const StandAlone = (): JSX.Element => {
    return (
        <div>
            <Dashboard />
        </div>
    );
};
