import React from 'react';
import { useGamingApeClubContract, useWeb3 } from '@gac/shared-v2';
import { UnstakedApeTile, UnstakedTokenTile } from '../atoms/UnstakedTokenTile';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';

export default {
    title: 'Staking/Atoms/UnstakedTokenTile',
    component: UnstakedTokenTile,
};

export const StandAlone = ({
    tokenId,
    selected,
}: {
    tokenId: string;
    selected: boolean;
}): JSX.Element => {
    const { GamingApeClubAddress } = useAppConfiguration();
    const [isSelected, setSelected] = React.useState(selected);

    return (
        <UnstakedTokenTile
            rank={6500}
            onSelect={(): void => setSelected((s) => !s)}
            selected={isSelected}
            tokenId={tokenId}
            contractAddress={GamingApeClubAddress}
        />
    );
};

StandAlone.args = {
    tokenId: '1',
    selected: true,
};

export const ApeTile = ({
    tokenId,
    selected,
}: {
    tokenId: string;
    selected: boolean;
}): JSX.Element => {
    const { GamingApeClubAddress, EthereumChainId } = useAppConfiguration();
    const { provider } = useWeb3(EthereumChainId);
    const contract = useGamingApeClubContract(provider, GamingApeClubAddress);
    const [isSelected, setSelected] = React.useState(selected);

    if (!contract) return <></>;

    return (
        <UnstakedApeTile
            onSelect={(): void => setSelected((s) => !s)}
            selected={isSelected}
            tokenId={tokenId}
        />
    );
};

ApeTile.args = {
    tokenId: '1',
    selected: true,
}; // mainnet GAC
