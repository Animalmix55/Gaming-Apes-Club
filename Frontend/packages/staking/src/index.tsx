import { initializeIcons } from '@fluentui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import { Client } from 'styletron-engine-atomic';
import './css/global.css';
import { Provider } from 'styletron-react';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
    DefaultTheme,
    ThemeContextProvider,
    Web3ContextProvider,
} from '@gac/shared-v2';
import {
    AppConfigurationContextType,
    AppCongfigurationContextProvider,
} from './contexts/AppConfigurationContext';

initializeIcons();

const {
    EthereumChainId,
    EtherscanUrl,
    GACXPContractAddress,
    GACStakingChildContractAddress,
    GACStakingContractAddress,
    GamingApeClubAddress,
    TwitterUrl,
    DiscordUrl,
    OpenSeaUrl,
    DefaultEthereumProvider,
} = { ...window } as unknown as AppConfigurationContextType;

const styletron = new Client();
const queryClient = new QueryClient();

const Root = (): JSX.Element => {
    return (
        <Provider value={styletron}>
            <QueryClientProvider client={queryClient}>
                <ThemeContextProvider value={DefaultTheme}>
                    <Web3ContextProvider
                        defaultProvider={DefaultEthereumProvider}
                    >
                        <AppCongfigurationContextProvider
                            value={{
                                EthereumChainId,
                                EtherscanUrl,
                                GACXPContractAddress,
                                GACStakingChildContractAddress,
                                GACStakingContractAddress,
                                GamingApeClubAddress,
                                TwitterUrl,
                                DiscordUrl,
                                OpenSeaUrl,
                            }}
                        >
                            <>
                                <ToastContainer position="bottom-left" />
                            </>
                        </AppCongfigurationContextProvider>
                    </Web3ContextProvider>
                </ThemeContextProvider>
            </QueryClientProvider>
        </Provider>
    );
};

const container = document.getElementById('self-injecting-react-app');
ReactDOM.render(<Root />, container);
