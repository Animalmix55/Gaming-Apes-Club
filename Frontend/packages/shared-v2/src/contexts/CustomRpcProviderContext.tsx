/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Web3ReactHooks } from '@web3-react/core';
import Web3 from 'web3';
import { initializeJsonRpcConnector } from '../connectors/JsonRPC';

interface CustomRpcProviderContextType {
    providerTag: unknown;
    providerUrl: string;
    hooks: Web3ReactHooks;
    web3?: Web3;
    getParent: (tag: unknown) => CustomRpcProviderContextType | undefined;
}

const CustomRpcProviderContext = React.createContext<
    CustomRpcProviderContextType | undefined
>(undefined);

interface CustomRpcProviderProps {
    providerTag: unknown;
    providerUrl: string;
    children: React.ReactNode;
}

export const CustomRpcProvider = (
    props: CustomRpcProviderProps
): JSX.Element => {
    const { providerTag, providerUrl, children } = props;
    const [, hooks] = React.useMemo(
        () => initializeJsonRpcConnector(providerUrl, true),
        [providerUrl]
    );

    const provider = hooks.useProvider();
    const parent = React.useContext(CustomRpcProviderContext);

    const getParent = React.useCallback(
        (providerTag: unknown) => {
            if (!parent) return undefined;

            const {
                providerTag: parentProviderTag,
                getParent: parentGetParent,
            } = parent;
            if (parentProviderTag === providerTag) return parent;

            return parentGetParent(providerTag);
        },
        [parent]
    );

    const web3 = React.useMemo((): Web3 | undefined => {
        if (!provider) return undefined;
        const { provider: web3Provider } = provider;

        return new Web3(web3Provider as never);
    }, [provider]);

    return (
        <CustomRpcProviderContext.Provider
            value={{ providerTag, providerUrl, hooks, web3, getParent }}
        >
            {children}
        </CustomRpcProviderContext.Provider>
    );
};

/**
 * Fetches the provider context from the nearest parent that has the specified tag.
 * @param tag the tag of the provider to retrieve
 * @returns the matching RPC provider.
 */
export const useCustomRpcProvider = (
    tag: unknown
): CustomRpcProviderContextType | undefined => {
    const context = React.useContext(CustomRpcProviderContext);

    return React.useMemo(() => {
        if (!context) return undefined;
        if (context.providerTag === tag) return context;

        return context.getParent(tag);
    }, [context, tag]);
};
