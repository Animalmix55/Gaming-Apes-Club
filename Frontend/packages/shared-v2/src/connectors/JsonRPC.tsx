import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { Web3ReactStore } from '@web3-react/types';
import { Url } from '@web3-react/url';

/**
 * A connector for a custom JSON RPC provider.
 * @param provider a url for a custom RPC provider
 * @param autoInitialize whether to immediately connect or to wait for activation manually.
 * @returns hooks and things
 */
export const initializeJsonRpcConnector = (
    provider: string,
    autoInitialize: boolean
): [Url, Web3ReactHooks, Web3ReactStore] =>
    initializeConnector<Url>(
        (actions) => new Url(actions, provider, autoInitialize)
    );

export default initializeJsonRpcConnector;
