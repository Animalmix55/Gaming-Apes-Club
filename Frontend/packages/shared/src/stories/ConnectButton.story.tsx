import React from 'react';
import {
    ConnectButton,
    MetaMaskButton,
    WalletConnectButton,
    WalletLinkButton,
} from '../atoms/ConnectButton';

export default {
    title: 'Shared/v1/Atoms/ConnectButton',
    component: ConnectButton,
};

export const MetaMask = (): JSX.Element => {
    return <MetaMaskButton />;
};

export const WalletConnect = (): JSX.Element => {
    return <WalletConnectButton />;
};

export const WalletLink = (): JSX.Element => {
    return <WalletLinkButton />;
};
