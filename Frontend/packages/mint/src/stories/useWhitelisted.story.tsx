import { Spinner } from '@fluentui/react';
import { useProvider } from '@gac/shared';
import React from 'react';
import { MetaMaskButton } from '../atoms/ConnectButton';
import { useWhitelisted } from '../hooks/useWhitelisted';

export default {
    title: 'Hooks/UseWhitelisted',
};

export const WithConnector = (): JSX.Element => {
    const { accounts } = useProvider();
    const { data: whitelistData } = useWhitelisted(accounts?.[0]);

    if (!whitelistData) return <Spinner />;

    const { isWhitelisted } = whitelistData;

    return (
        <div>
            <MetaMaskButton />
            {isWhitelisted === undefined && <Spinner />}
            <div>Whitelisted: {isWhitelisted ? 'Yes' : 'No'}</div>
        </div>
    );
};

export const Input = (): JSX.Element => {
    const [address, setAddress] = React.useState<string>();
    const { data: whitelistData } = useWhitelisted(address);

    if (!whitelistData) return <Spinner />;

    const { isWhitelisted } = whitelistData;

    return (
        <div>
            <input
                value={address}
                onChange={(e): void => setAddress(e.target.value)}
                placeholder="Address"
            />
            {isWhitelisted === undefined && <Spinner />}
            <div>Whitelisted: {isWhitelisted ? 'Yes' : 'No'}</div>
        </div>
    );
};
