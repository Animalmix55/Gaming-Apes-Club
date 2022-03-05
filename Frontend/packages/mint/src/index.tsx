import { initializeIcons } from '@fluentui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import { Client } from 'styletron-engine-atomic';
import { Provider } from 'styletron-react';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
    DefaultTheme,
    ThemeContextProvider,
    ProviderContextProvider,
} from '@gac/shared';
import {
    GamingApeClubContextType,
    GamingApeContextProvider,
} from './contexts/GamingApeClubContext';
import { MintPage } from './organisms/MintPage';
import { ContractContextProvider } from './contexts/ContractContext';

initializeIcons();

const {
    api,
    homeUrl,
    chainId,
    tokenAddress,
    discordUrl,
    twitterUrl,
    openseaUrl,
    etherscanUrl,
} = { ...window } as unknown as GamingApeClubContextType;

const styletron = new Client();
const queryClient = new QueryClient();

const Root = (): JSX.Element => {
    return (
        <Provider value={styletron}>
            <QueryClientProvider client={queryClient}>
                <ThemeContextProvider value={DefaultTheme}>
                    <ProviderContextProvider>
                        <GamingApeContextProvider
                            value={{
                                api,
                                homeUrl,
                                chainId,
                                tokenAddress,
                                discordUrl,
                                twitterUrl,
                                openseaUrl,
                                etherscanUrl,
                            }}
                        >
                            <ContractContextProvider>
                                <>
                                    <MintPage />
                                    <ToastContainer position="bottom-left" />
                                </>
                            </ContractContextProvider>
                        </GamingApeContextProvider>
                    </ProviderContextProvider>
                </ThemeContextProvider>
            </QueryClientProvider>
        </Provider>
    );
};

const container = document.getElementById('self-injecting-react-app');
ReactDOM.render(<Root />, container);
