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
import { AuthorizationContextProvider } from './contexts/AuthorizationContext';
import { MarketplacePage } from './organisms/MarketplacePage';

initializeIcons();

const {
    api,
    homeUrl,
    discordUrl,
    twitterUrl,
    openseaUrl,
    adminRoles,
    defaultDiscordMessage,
} = {
    ...window,
} as unknown as GamingApeClubContextType;

const styletron = new Client();
const queryClient = new QueryClient();

const Root = (): JSX.Element => {
    return (
        <Provider value={styletron}>
            <QueryClientProvider client={queryClient}>
                <ThemeContextProvider value={DefaultTheme}>
                    <ProviderContextProvider>
                        <AuthorizationContextProvider>
                            <GamingApeContextProvider
                                value={{
                                    api,
                                    homeUrl,
                                    discordUrl,
                                    twitterUrl,
                                    openseaUrl,
                                    adminRoles,
                                    defaultDiscordMessage,
                                }}
                            >
                                <>
                                    <MarketplacePage />
                                    <ToastContainer position="bottom-left" />
                                </>
                            </GamingApeContextProvider>
                        </AuthorizationContextProvider>
                    </ProviderContextProvider>
                </ThemeContextProvider>
            </QueryClientProvider>
        </Provider>
    );
};

const container = document.getElementById('self-injecting-react-app');
ReactDOM.render(<Root />, container);
