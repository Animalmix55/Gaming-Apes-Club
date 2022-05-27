import React from 'react';
import { useGamingApeClubContract, useWeb3 } from '@gac/shared-v2';
import { StakedApeTile, StakedTokenTile } from '../atoms/StakedTokenTile';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';

export default {
    title: 'Staking/Atoms/StakedTokenTile',
    component: StakedTokenTile,
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
        <StakedTokenTile
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
    const { GamingApeClubAddress } = useAppConfiguration();
    const { web3 } = useWeb3();
    const contract = useGamingApeClubContract(web3, GamingApeClubAddress);
    const [isSelected, setSelected] = React.useState(selected);

    if (!contract) return <></>;

    return (
        <StakedApeTile
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
