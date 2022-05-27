import { Web3Provider } from '@ethersproject/providers';
import { Connector } from '@web3-react/types';
import React from 'react';
import Web3 from 'web3';

import { hooks as MMHooks, metaMask } from '../connectors/Metamask';
import { hooks as WCHooks, walletConnect } from '../connectors/WalletConnect';
import { hooks as WLHooks, walletLink } from '../connectors/WalletLink';

export interface Web3ContextType {
    provider?: Web3Provider;
    web3?: Web3;
    accounts?: string[];
    disconnect?: () => void;
    connector?: Connector;
    chainId?: number;
}

export const Web3Context = React.createContext<Web3ContextType>({});

export const Web3ContextProvider = ({
    children,
    defaultProvider,
}: {
    children: React.ReactNode;
    defaultProvider?: string;
}): JSX.Element => {
    const MMProvider = MMHooks.useProvider();
    const MMActive = MMHooks.useIsActive();
    const MMAccounts = MMHooks.useAccounts();
    const MMChainId = MMHooks.useChainId();

    const WCProvider = WCHooks.useProvider();
    const WCActive = WCHooks.useIsActive();
    const WCAccounts = WCHooks.useAccounts();
    const WCChainId = MMHooks.useChainId();

    const WLProvider = WLHooks.useProvider();
    const WLActive = WLHooks.useIsActive();
    const WLAccounts = WLHooks.useAccounts();
    const WLChainId = MMHooks.useChainId();

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

    const chainId = React.useMemo(() => {
        if (MMActive) return MMChainId;
        if (WCActive) return WCChainId;
        if (WLActive) return WLChainId;
        return undefined;
    }, [MMActive, MMChainId, WCActive, WCChainId, WLActive, WLChainId]);

    const disconnect = React.useCallback(() => {
        if (MMActive) return metaMask.deactivate();
        if (WCActive) return walletConnect.deactivate();
        if (WLActive) return walletLink.deactivate();
        return undefined;
    }, [MMActive, WCActive, WLActive]);

    const web3 = React.useMemo(() => {
        return new Web3((provider?.provider as never) ?? defaultProvider);
    }, [defaultProvider, provider?.provider]);

    return (
        <Web3Context.Provider
            value={{ provider, web3, accounts, chainId, disconnect }}
        >
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = (): Web3ContextType => React.useContext(Web3Context);
