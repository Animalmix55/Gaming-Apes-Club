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
import { ProfilePage } from './organisms/ProfilePage';
import { AuthorizationContextProvider } from './contexts/AuthorizationContext';

initializeIcons();

const {
    api,
    homeUrl,
    discordUrl,
    twitterUrl,
    openseaUrl,
    adminRoles,
    defaultDiscordMessage,
    gacStakingContractAddress,
    gamingApeClubAddress,
    gacXPAddress,
    chainId,
    gacStakingChildContractAddress,
} = {
    ...window,
} as unknown as GamingApeClubContextType;

const styletron = new Client();
const queryClient = new QueryClient();

const providers = {
    1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    137: 'https://polygon-rpc.com',
};

const Root = (): JSX.Element => {
    return (
        <Web3ContextProvider defaultProviders={providers}>
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
                                gacStakingContractAddress,
                                gacStakingChildContractAddress,
                                gamingApeClubAddress,
                                gacXPAddress,
                                chainId,
                                polygonChainId: 137,
                                ethereumChainId: 1,
                            }}
                        >
                            <AuthorizationContextProvider>
                                <>
                                    <ProfilePage />
                                    <ToastContainer position="bottom-left" />
                                </>
                            </AuthorizationContextProvider>
                        </GamingApeContextProvider>
                    </ThemeContextProviderV2>
                </QueryClientProvider>
            </Provider>
        </Web3ContextProvider>
    );
};

const container = document.getElementById('self-injecting-react-app');
ReactDOM.render(<Root />, container);
