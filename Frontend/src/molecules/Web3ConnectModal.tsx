/* eslint-disable react/jsx-props-no-spreading */
import { Modal } from '@fluentui/react';
import React from 'react';
import { useStyletron } from 'styletron-react';
import {
    MetaMaskButton,
    WalletConnectButton,
    WalletLinkButton,
} from '../atoms/ConnectButton';
import { useProvider } from '../contexts/ProviderContext';
import { useThemeContext } from '../contexts/ThemeContext';

const Web3ConnectModalInner = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    return (
        <div
            className={css({
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            })}
        >
            <div
                className={css({
                    fontFamily: theme.fonts.title,
                    fontSize: '40px',
                    color: theme.fontColors.light.toRgbaString(1),
                })}
            >
                Connect
            </div>
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                })}
            >
                <MetaMaskButton className={css({ margin: '5px' })} />
                <WalletConnectButton className={css({ margin: '5px' })} />
                <WalletLinkButton className={css({ margin: '5px' })} />
            </div>
        </div>
    );
};

export const Web3ConnectModal = (): JSX.Element => {
    const { web3 } = useProvider();
    const theme = useThemeContext();

    return (
        <Modal
            isOpen={!web3}
            styles={{
                main: {
                    background: theme.backgroundGradients.purpleBlue,
                    display: 'flex',
                },
                scrollableContent: { height: '100%', padding: '20px' },
            }}
        >
            <Web3ConnectModalInner />
        </Modal>
    );
};

export default Web3ConnectModal;