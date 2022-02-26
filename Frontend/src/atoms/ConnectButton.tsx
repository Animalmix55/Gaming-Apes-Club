/* eslint-disable react/jsx-props-no-spreading */
import { Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';
import { WalletLink } from '@web3-react/walletlink';
import React from 'react';
import { useStyletron } from 'styletron-react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { GlowButton } from './GlowButton';
import { getAddChainParameters } from '../Chains';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';

import MetaMaskLogo from '../assets/svg/metamask-fox.svg';
import WalletLinkLogo from '../assets/png/coinbase-wallet.png';
import WalletConnectLogo from '../assets/svg/walletconnect-square-white.svg';
import { metaMask, hooks as MMHooks } from '../connectors/Metamask';
import { walletConnect, hooks as WCHooks } from '../connectors/WalletConnect';
import { walletLink, hooks as WLHooks } from '../connectors/WalletLink';

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
    const { connector, isActivating, isActive, children, className } = props;

    const [css] = useStyletron();
    const usingWalletConnect = isWalletConnect(connector);

    const onClick = (): void => {
        if (isActivating) {
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
            <GlowButton type="button" className={className} onClick={onClick}>
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
            className={className}
            type="button"
            forceglow={isActive}
            onClick={(): Promise<void> | void => connector.deactivate()}
        >
            {children}
        </GlowButton>
    );
};

interface ButtonProps {
    className?: string;
}

export const MetaMaskButton = (props: ButtonProps): JSX.Element => {
    const { className } = props;

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
            className={className}
        >
            <div className={css({ padding: '5px' })}>
                <div>
                    <img
                        className={css({ height: '70px', width: 'auto' })}
                        src={MetaMaskLogo}
                        alt={
                            isActive
                                ? 'Disconnect Metamask'
                                : 'Connect Metamask'
                        }
                    />
                </div>
                <div className={css({ fontSize: '15px' })}>MetaMask</div>
            </div>
        </ConnectButton>
    );
};

export const WalletLinkButton = (props: ButtonProps): JSX.Element => {
    const { className } = props;

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
            className={className}
        >
            <div className={css({ padding: '5px' })}>
                <div>
                    <img
                        className={css({ height: '70px', width: 'auto' })}
                        src={WalletLinkLogo}
                        alt={
                            isActive
                                ? 'Disconnect Coinbase Wallet'
                                : 'Connect Coinbase Wallet'
                        }
                    />
                </div>
                <div className={css({ fontSize: '15px' })}>Coinbase</div>
                <div className={css({ fontSize: '15px' })}>Wallet</div>
            </div>
        </ConnectButton>
    );
};

export const WalletConnectButton = (props: ButtonProps): JSX.Element => {
    const { className } = props;

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
            className={className}
        >
            <div className={css({ padding: '5px' })}>
                <div>
                    <img
                        className={css({ height: '48px', width: 'auto' })}
                        src={WalletConnectLogo}
                        alt={
                            isActive
                                ? 'Disconnect WalletConnect'
                                : 'Connect WalletConnect'
                        }
                    />
                </div>
                <div className={css({ fontSize: '15px' })}>Wallet</div>
                <div className={css({ fontSize: '15px' })}>Connect</div>
            </div>
        </ConnectButton>
    );
};

export default ConnectButton;
