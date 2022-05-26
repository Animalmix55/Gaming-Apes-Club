import React from 'react';
import { useGamingApeClubContract, useWeb3 } from '@gac/shared-v2';
import { StakedTokenTile } from '../atoms/StakedTokenTile';

export default {
    title: 'Staking/Atoms/StakedTokenTile',
    component: StakedTokenTile,
};

export const StandAlone = ({
    tokenId,
    contractAddress,
    selected,
}: {
    tokenId: string;
    contractAddress: string;
    selected: boolean;
}): JSX.Element => {
    const { web3 } = useWeb3();
    const contract = useGamingApeClubContract(web3, contractAddress);

    if (!contract) return <></>;

    return (
        <StakedTokenTile
            rank={6500}
            selected={selected}
            tokenId={tokenId}
            contract={contract}
        />
    );
};

StandAlone.args = {
    tokenId: '1',
    selected: true,
    contractAddress: '0xAc2a6706285b91143eaded25d946Ff17A60A6512',
}; // mainnet GAC
