/* eslint-disable react/jsx-props-no-spreading */
import { MessageBar, Modal } from '@fluentui/react';
import React from 'react';
import { useStyletron } from 'styletron-react';
import {
    MetaMaskButton,
    WalletConnectButton,
    WalletLinkButton,
} from '../atoms/ConnectButton';
import { CHAINS } from '../Chains';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';
import { useProvider } from '../contexts/ProviderContext';
import { useThemeContext } from '../contexts/ThemeContext';

const Web3ConnectModalInner = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const { chainId } = useProvider();
    const { chainId: expectedChainId } = useGamingApeContext();

    const invalidChain =
        expectedChainId !== undefined &&
        chainId !== undefined &&
        chainId !== expectedChainId;

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
            {invalidChain && (
                <MessageBar>
                    You are connected to the wrong chain. Connect to{' '}
                    {CHAINS[expectedChainId].name}
                </MessageBar>
            )}
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
                    invalidChain={invalidChain}
                />
                <WalletConnectButton className={css({ margin: '1px' })} />
                <WalletLinkButton className={css({ margin: '1px' })} />
            </div>
        </div>
    );
};

export const Web3ConnectModal = (): JSX.Element => {
    const { web3, chainId } = useProvider();
    const { chainId: expectedChainId } = useGamingApeContext();
    const theme = useThemeContext();

    const invalidChain =
        expectedChainId !== undefined &&
        chainId !== undefined &&
        chainId !== expectedChainId;

    return (
        <Modal
            isOpen={!web3 || invalidChain}
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
