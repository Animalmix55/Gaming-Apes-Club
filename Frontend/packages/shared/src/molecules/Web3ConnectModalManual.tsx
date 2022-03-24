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

import { useProvider } from '../contexts/ProviderContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { Chain } from '../models/Chain';

interface BaseProps {
    expectedChainId?: Chain;
    /**
     * Renders below all buttons
     */
    children?: React.ReactNode;
}

const Web3ConnectModalInner = ({
    expectedChainId,
    children,
}: BaseProps): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const { chainId } = useProvider();

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
                    {CHAINS[expectedChainId]?.name || 'Unknown'}
                </MessageBar>
            )}
            <div
                className={css({
                    fontFamily: theme.fonts.headers,
                    fontSize: '42px',
                    fontWeight: '900',
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
                    requiredChainId={expectedChainId}
                />
                <WalletConnectButton
                    className={css({ margin: '1px' })}
                    invalidChain={invalidChain}
                    requiredChainId={expectedChainId}
                />
                <WalletLinkButton
                    className={css({ margin: '1px' })}
                    invalidChain={invalidChain}
                    requiredChainId={expectedChainId}
                />
            </div>
            {children}
        </div>
    );
};

interface OuterProps extends BaseProps {
    isOpen: boolean;
    onClose?: () => void;
}

export const Web3ConnectModalManual = ({
    isOpen,
    expectedChainId,
    onClose,
    children,
}: OuterProps): JSX.Element => {
    const theme = useThemeContext();

    return (
        <Modal
            onDismiss={onClose}
            closeButtonAriaLabel="Close"
            isOpen={isOpen}
            styles={{
                main: {
                    background: theme.backgroundGradients.purpleBlue,
                    display: 'flex',
                },
                scrollableContent: { height: '100%', padding: '15px' },
            }}
        >
            <Web3ConnectModalInner expectedChainId={expectedChainId}>
                {children}
            </Web3ConnectModalInner>
        </Modal>
    );
};

export default Web3ConnectModalManual;
