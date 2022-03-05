/* eslint-disable react/jsx-props-no-spreading */
import { Modal } from '@fluentui/react';
import React from 'react';
import { useStyletron } from 'styletron-react';
import {
    MetaMaskButton,
    useProvider,
    useThemeContext,
    WalletConnectButton,
    WalletLinkButton,
} from '@gac/shared';

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
                    fontFamily: theme.fonts.headers,
                    fontSize: '42px',
                    marginBottom: '10px',
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
                    flexWrap: 'wrap',
                })}
            >
                <MetaMaskButton
                    className={css({ margin: '1px' })}
                    requiredChainId={1}
                />
                <WalletConnectButton
                    className={css({ margin: '1px' })}
                    requiredChainId={1}
                />
                <WalletLinkButton
                    className={css({ margin: '1px' })}
                    requiredChainId={1}
                />
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
                scrollableContent: { height: '100%', padding: '15px' },
            }}
        >
            <Web3ConnectModalInner />
        </Modal>
    );
};

export default Web3ConnectModal;
