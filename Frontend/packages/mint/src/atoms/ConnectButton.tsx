/* eslint-disable react/jsx-props-no-spreading */
import { Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';
import { WalletLink } from '@web3-react/walletlink';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { ClassNameBuilder, getAddChainParameters } from '@gac/shared';
import { GlowButton } from './GlowButton';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';

import MetaMaskLogo from '../assets/png/Metamask.png';
import WalletLinkLogo from '../assets/png/coinbase-wallet.png';
import WalletConnectLogo from '../assets/png/walletconnect.png';
import { metaMask, hooks as MMHooks } from '../connectors/Metamask';
import { walletConnect, hooks as WCHooks } from '../connectors/WalletConnect';
import { walletLink, hooks as WLHooks } from '../connectors/WalletLink';
import { useThemeContext } from '../contexts/ThemeContext';

interface ConnectButtonProps<
    TConnector extends MetaMask | WalletConnect | WalletLink =
        | MetaMask
        | WalletConnect
        | WalletLink
> {
    className?: string;
    connector: TConnector;
    isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
    // eslint-disable-next-line react/no-unused-prop-types
    error: ReturnType<Web3ReactHooks['useError']>;
    isActive: ReturnType<Web3ReactHooks['useIsActive']>;
    invalidChain?: boolean;
}

export const isWalletConnect = (
    connector: ConnectButtonProps['connector']
): connector is WalletConnect => connector instanceof WalletConnect;
export const isMetamask = (
    connector: ConnectButtonProps['connector']
): connector is MetaMask => connector instanceof MetaMask;
export const isWalletLink = (
    connector: ConnectButtonProps['connector']
): connector is WalletLink => connector instanceof WalletLink;

export const ConnectButton = (
    props: ConnectButtonProps & { children: React.ReactNode }
): JSX.Element => {
    const { chainId: requiredChainId } = useGamingApeContext();
    const {
        connector,
        isActivating,
        isActive,
        children,
        className,
        invalidChain,
    } = props;

    const [css] = useStyletron();
    const usingWalletConnect = isWalletConnect(connector);
    const theme = useThemeContext();

    const onClick = (): void => {
        if ((isActive && !invalidChain) || isActivating) {
            connector.deactivate();
            return;
        }

        if (usingWalletConnect) {
            connector.activate(requiredChainId);
        } else {
            connector.activate(
                requiredChainId
                    ? getAddChainParameters(requiredChainId)
                    : undefined
            );
        }
    };

    if (!isActive)
        return (
            <GlowButton
                type="button"
                className={ClassNameBuilder(
                    className,
                    css({
                        height: '150px',
                        width: '150px',
                        fontFamily: `${theme.fonts.buttons} !important`,
                    })
                )}
                onClick={onClick}
            >
                {children}
                {isActivating && (
                    <Spinner
                        size={SpinnerSize.medium}
                        className={css({
                            position: 'absolute',
                            top: '0px',
                            bottom: '0px',
                            right: '0px',
                            left: '0px',
                            margin: 'auto',
                        })}
                    />
                )}
            </GlowButton>
        );

    return (
        <GlowButton
            className={ClassNameBuilder(
                className,
                css({
                    height: '150px',
                    width: '150px',
                    fontFamily: `${theme.fonts.buttons} !important`,
                })
            )}
            type="button"
            forceglow={isActive}
            onClick={onClick}
        >
            {children}
        </GlowButton>
    );
};

interface ButtonProps {
    className?: string;
    invalidChain?: boolean;
}

export const MetaMaskButton = (props: ButtonProps): JSX.Element => {
    const { className, invalidChain } = props;

    const [css] = useStyletron();
    const isActive = MMHooks.useIsActive();
    const isActivating = MMHooks.useIsActivating();
    const error = MMHooks.useError();

    return (
        <ConnectButton
            connector={metaMask}
            isActivating={isActivating}
            isActive={isActive}
            error={error}
            invalidChain={invalidChain}
            className={className}
        >
            <div className={css({ padding: '5px' })}>
                <div>
                    <img
                        className={css({
                            height: '55px',
                            width: 'auto',
                            margin: '8px',
                        })}
                        src={MetaMaskLogo}
                        alt={
                            isActive
                                ? 'Disconnect Metamask'
                                : 'Connect Metamask'
                        }
                    />
                </div>
                <div className={css({ fontSize: '17px' })}>MetaMask Wallet</div>
            </div>
        </ConnectButton>
    );
};

export const WalletLinkButton = (props: ButtonProps): JSX.Element => {
    const { className, invalidChain } = props;

    const [css] = useStyletron();
    const isActive = WLHooks.useIsActive();
    const isActivating = WLHooks.useIsActivating();
    const error = WLHooks.useError();

    return (
        <ConnectButton
            connector={walletLink}
            isActivating={isActivating}
            isActive={isActive}
            error={error}
            invalidChain={invalidChain}
            className={className}
        >
            <div className={css({ padding: '5px' })}>
                <div>
                    <img
                        className={css({
                            height: '55px',
                            width: 'auto',
                            margin: '8px',
                        })}
                        src={WalletLinkLogo}
                        alt={
                            isActive
                                ? 'Disconnect Coinbase Wallet'
                                : 'Connect Coinbase Wallet'
                        }
                    />
                </div>
                <div className={css({ fontSize: '17px' })}>Coinbase Wallet</div>
            </div>
        </ConnectButton>
    );
};

export const WalletConnectButton = (props: ButtonProps): JSX.Element => {
    const { className, invalidChain } = props;

    const [css] = useStyletron();
    const isActive = WCHooks.useIsActive();
    const isActivating = WCHooks.useIsActivating();
    const error = WCHooks.useError();

    return (
        <ConnectButton
            connector={walletConnect}
            isActivating={isActivating}
            isActive={isActive}
            error={error}
            invalidChain={invalidChain}
            className={className}
        >
            <div className={css({ padding: '5px' })}>
                <div>
                    <img
                        className={css({
                            height: '55px',
                            width: 'auto',
                            margin: '8px',
                        })}
                        src={WalletConnectLogo}
                        alt={
                            isActive
                                ? 'Disconnect WalletConnect'
                                : 'Connect WalletConnect'
                        }
                    />
                </div>
                <div className={css({ fontSize: '17px' })}>Wallet Connect</div>
            </div>
        </ConnectButton>
    );
};

export default ConnectButton;
