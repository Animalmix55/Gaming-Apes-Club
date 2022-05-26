/* eslint-disable react/jsx-props-no-spreading */
import { Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';
import { WalletLink } from '@web3-react/walletlink';
import React from 'react';
import { useStyletron } from 'styletron-react';
import {
    MetaMask as MMConnector,
    WalletConnect as WCConnector,
    WalletLink as WLConnector,
} from '../connectors';

import { Chain } from '../models/Chain';
import { useThemeContext } from '../contexts/ThemeContext';
import { getAddChainParameters } from '../Chains';
import { ClassNameBuilder } from '../utilties';
import { Button } from './Button';
import { Icons } from '../utilties/Icons';

const { hooks: MMHooks, metaMask } = MMConnector;
const { hooks: WCHooks, walletConnect } = WCConnector;
const { hooks: WLHooks, walletLink } = WLConnector;

export interface ConnectButtonProps<
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
    requiredChainId?: Chain;
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
    props: ConnectButtonProps & { text: string; icon: string }
): JSX.Element => {
    const {
        connector,
        isActivating,
        isActive,
        text,
        icon,
        className,
        invalidChain,
        requiredChainId,
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

    return (
        <Button
            type="button"
            iconClass={css({ height: '36px !important' })}
            className={ClassNameBuilder(
                className,
                css({
                    padding: '8px 4px !important',
                    backgroundColor: isActive
                        ? `${theme.buttonPallette.hovered.toRgbaString()} !important`
                        : undefined,
                    ':hover': {
                        backgroundColor: `${theme.buttonPallette.primary.toRgbaString()} !important`,
                    },
                })
            )}
            icon={icon}
            text={text}
            onClick={onClick}
        />
    );
};

interface ButtonProps {
    className?: string;
    invalidChain?: boolean;
    requiredChainId?: Chain;
}

export const MetaMaskButton = (props: ButtonProps): JSX.Element => {
    const { className, invalidChain, requiredChainId } = props;

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
            icon={Icons.MetaMask}
            text="MetaMask"
            requiredChainId={requiredChainId}
        />
    );
};

export const WalletLinkButton = (props: ButtonProps): JSX.Element => {
    const { className, invalidChain, requiredChainId } = props;

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
            icon={Icons.Coinbase}
            text="Coinbase Wallet"
            requiredChainId={requiredChainId}
        />
    );
};

export const WalletConnectButton = (props: ButtonProps): JSX.Element => {
    const { className, invalidChain, requiredChainId } = props;

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
            icon={Icons.WalletConnect}
            text="Wallet Connect"
            requiredChainId={requiredChainId}
        />
    );
};

export default ConnectButton;
