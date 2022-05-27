import { useWeb3, Web3Context } from '@gac/shared-v2';
import React from 'react';
import { Dashboard } from '../atoms/Dashboard';

export default {
    title: 'Staking/Atoms/Dashboard',
    component: Dashboard,
};

export const NotLoggedIn = (): JSX.Element => {
    const web3ContextValue = useWeb3();

    return (
        <Web3Context.Provider
            value={{ ...web3ContextValue, accounts: undefined }}
        >
            <div style={{ display: 'flex' }}>
                <Dashboard />
            </div>
        </Web3Context.Provider>
    );
};

export const Loginable = (): JSX.Element => {
    return (
        <div style={{ display: 'flex' }}>
            <Dashboard />
        </div>
    );
};
