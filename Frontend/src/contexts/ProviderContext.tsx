import { Web3Provider } from '@ethersproject/providers';
import React from 'react';
import Web3 from 'web3';

import { hooks as MMHooks } from '../connectors/Metamask';
import { hooks as WCHooks } from '../connectors/WalletConnect';
import { hooks as WLHooks } from '../connectors/WalletLink';

export interface ProviderContextType {
    provider?: Web3Provider;
    web3?: Web3;
    accounts?: string[];
}

export const ProviderContext = React.createContext<ProviderContextType>({});

export const ProviderContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const MMProvider = MMHooks.useProvider();
    const MMActive = MMHooks.useIsActive();
    const MMAccounts = MMHooks.useAccounts();

    const WCProvider = WCHooks.useProvider();
    const WCActive = WCHooks.useIsActive();
    const WCAccounts = WCHooks.useAccounts();

    const WLProvider = WLHooks.useProvider();
    const WLActive = WLHooks.useIsActive();
    const WLAccounts = WLHooks.useAccounts();

    const provider = React.useMemo(() => {
        if (MMActive && MMProvider) return MMProvider;
        if (WCActive && WCProvider) return WCProvider;
        if (WLActive && WLProvider) return WLProvider;
        return undefined;
    }, [MMActive, MMProvider, WCActive, WCProvider, WLActive, WLProvider]);

    const accounts = React.useMemo(() => {
        if (MMActive && MMAccounts) return MMAccounts;
        if (WCActive && WCAccounts) return WCAccounts;
        if (WLActive && WLAccounts) return WLAccounts;
        return undefined;
    }, [MMAccounts, MMActive, WCAccounts, WCActive, WLAccounts, WLActive]);

    const web3 = React.useMemo(() => {
        if (!provider) return undefined;
        return new Web3(provider as never);
    }, [provider]);

    return (
        <ProviderContext.Provider value={{ provider, web3, accounts }}>
            {children}
        </ProviderContext.Provider>
    );
};

export const useProvider = (): ProviderContextType =>
    React.useContext(ProviderContext);
