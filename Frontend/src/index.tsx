import { initializeIcons } from '@fluentui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import { Client } from 'styletron-engine-atomic';
import { Provider } from 'styletron-react';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';
import {
    GamingApeClubContextType,
    GamingApeContextProvider,
} from './contexts/GamingApeClubContext';
import { DefaultTheme, ThemeContextProvider } from './contexts/ThemeContext';

initializeIcons();

const theme = createTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '*, *::before, *::after': {
                    boxSizing: 'content-box',
                },

                body: {
                    backgroundColor: '#fff',
                    fontFamily: 'unset',
                },
            },
        },
    },
});

const {
    api,
    homeUrl,
    chainId,
    tokenAddress,
    discordUrl,
    twitterUrl,
    openseaUrl,
} = { ...window } as unknown as GamingApeClubContextType;

const styletron = new Client();

const Root = (): JSX.Element => {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider value={styletron}>
                <ThemeContextProvider value={DefaultTheme}>
                    <GamingApeContextProvider
                        value={{
                            api,
                            homeUrl,
                            chainId,
                            tokenAddress,
                            discordUrl,
                            twitterUrl,
                            openseaUrl,
                        }}
                    >
                        <>
                            {/* <Header /> */}
                            <ToastContainer position="bottom-left" />
                            {/* <Footer /> */}
                        </>
                    </GamingApeContextProvider>
                </ThemeContextProvider>
            </Provider>
        </MuiThemeProvider>
    );
};

const container = document.getElementById('self-injecting-react-app');
ReactDOM.render(<Root />, container);
