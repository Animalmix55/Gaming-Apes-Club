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
    ConfirmationContextProvider,
    DefaultTheme,
    ThemeContextProvider,
    Web3ContextProvider,
} from '@gac/shared-v2';
import {
    AppConfigurationContextType,
    AppCongfigurationContextProvider,
} from './contexts/AppConfigurationContext';
import { StakingContextProvider } from './contexts/StakingContext';
import { MainPage } from './pages/Main';

initializeIcons();

const {
    EthereumChainId,
    PolygonChainId,
    DefaultPolygonProvider,
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
                        defaultProviders={{
                            ...(EthereumChainId !== undefined && {
                                [EthereumChainId]: DefaultEthereumProvider,
                            }),
                            ...(PolygonChainId !== undefined && {
                                [PolygonChainId]: DefaultPolygonProvider,
                            }),
                        }}
                    >
                        <StakingContextProvider>
                            <ConfirmationContextProvider>
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
                                        PolygonChainId,
                                        DefaultPolygonProvider,
                                    }}
                                >
                                    <MainPage />
                                    <ToastContainer position="bottom-left" />
                                </AppCongfigurationContextProvider>
                            </ConfirmationContextProvider>
                        </StakingContextProvider>
                    </Web3ContextProvider>
                </ThemeContextProvider>
            </QueryClientProvider>
        </Provider>
    );
};

const container = document.getElementById('self-injecting-react-app');
ReactDOM.render(<Root />, container);
