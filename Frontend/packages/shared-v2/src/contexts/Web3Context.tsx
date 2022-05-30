import { Web3Provider } from '@ethersproject/providers';
import { Connector } from '@web3-react/types';
import React from 'react';
import Web3 from 'web3';

import { hooks as MMHooks, metaMask } from '../connectors/Metamask';
import { hooks as WCHooks, walletConnect } from '../connectors/WalletConnect';
import { hooks as WLHooks, walletLink } from '../connectors/WalletLink';
import { Chain } from '../models/Chain';

export interface Web3ContextType {
    provider?: Web3Provider;
    web3?: Web3;
    accounts?: string[];
    disconnect?: () => void;
    connector?: Connector;
    chainId?: number;
    defaultProviders?: DefaultProviders;
}

export const Web3Context = React.createContext<Web3ContextType>({});

export type DefaultProviders = { [key in Chain]?: string };

export const Web3ContextProvider = ({
    children,
    defaultProviders,
}: {
    children: React.ReactNode;
    defaultProviders?: DefaultProviders;
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

    const connector = React.useMemo(() => {
        if (MMActive) return metaMask;
        if (WCActive) return walletConnect;
        if (WLActive) return walletLink;
        return undefined;
    }, [MMActive, WCActive, WLActive]);

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
        if (!provider?.provider) return undefined;
        return new Web3(provider.provider as never);
    }, [provider?.provider]);

    return (
        <Web3Context.Provider
            value={{
                provider,
                web3,
                accounts,
                chainId,
                connector,
                disconnect,
                defaultProviders,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = (
    expectedChain?: Chain
): Web3ContextType & {
    readonly: boolean;
    requestNewChain: () => Promise<void>;
} => {
    const currentContext = React.useContext(Web3Context);
    const { chainId, defaultProviders, connector } = currentContext;

    return React.useMemo(() => {
        const requestNewChain = async (): Promise<void> => {
            if (
                connector === undefined ||
                expectedChain === undefined ||
                expectedChain === chainId
            )
                return;

            await connector.activate(expectedChain);
        };

        if (expectedChain === undefined || expectedChain === chainId) {
            if (chainId === undefined)
                return { readonly: true, requestNewChain };
            return { ...currentContext, readonly: false, requestNewChain };
        }
        if (!defaultProviders || !defaultProviders[expectedChain])
            return { readonly: true, requestNewChain };

        const defaultProvider = defaultProviders[expectedChain] as string;
        const web3 = new Web3(defaultProvider);

        return {
            ...currentContext,
            provider: undefined,
            web3,
            readonly: true,
            chainId: expectedChain,
            requestNewChain,
        };
    }, [chainId, connector, currentContext, defaultProviders, expectedChain]);
};
