import { Spinner } from '@fluentui/react';
import React from 'react';
import { MetaMaskButton } from '../atoms/ConnectButton';
import { useProvider } from '../contexts/ProviderContext';
import useWhitelisted from '../hooks/useWhitelisted';

export default {
    title: 'Hooks/UseWhitelisted',
};

export const WithConnector = (): JSX.Element => {
    const { accounts } = useProvider();
    const { isWhitelisted } = useWhitelisted(accounts?.[0]);

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
    const { isWhitelisted } = useWhitelisted(address);

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
