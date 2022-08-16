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
    DefaultTheme as DefaultThemeV2,
    ThemeContextProvider as ThemeContextProviderV2,
    Web3ContextProvider,
} from '@gac/shared-v2';

import {
    GamingApeClubContextType,
    GamingApeContextProvider,
} from './contexts/GamingApeClubContext';
import { DashboardPage } from './organisms/DashboardPage';

initializeIcons();

const {
    api,
    homeUrl,
    discordUrl,
    twitterUrl,
    openseaUrl,
    adminRoles,
    defaultDiscordMessage,
    gacStakingAncilaryAddress,
    gacXPAddress,
    chainId,
} = {
    ...window,
} as unknown as GamingApeClubContextType;

const styletron = new Client();
const queryClient = new QueryClient();

const Root = (): JSX.Element => {
    return (
        <Web3ContextProvider>
            <Provider value={styletron}>
                <QueryClientProvider client={queryClient}>
                    <ThemeContextProviderV2 value={DefaultThemeV2}>
                        <GamingApeContextProvider
                            value={{
                                api,
                                homeUrl,
                                discordUrl,
                                twitterUrl,
                                openseaUrl,
                                adminRoles,
                                defaultDiscordMessage,
                                gacStakingAncilaryAddress,
                                gacXPAddress,
                                chainId,
                            }}
                        >
                            <>
                                <DashboardPage />
                                <ToastContainer position="bottom-left" />
                            </>
                        </GamingApeContextProvider>
                    </ThemeContextProviderV2>
                </QueryClientProvider>
            </Provider>
        </Web3ContextProvider>
    );
};

const container = document.getElementById('self-injecting-react-app');
ReactDOM.render(<Root />, container);
