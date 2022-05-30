import { useWeb3 } from '@gac/shared-v2';
import React from 'react';
import { useMetadata } from '../api/hooks/useMetadata';
import { TraitGrid } from '../atoms/TraitGrid';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';
import { useTokenUri } from '../web3/hooks/useTokenUri';

export default {
    title: 'Staking/Atoms/TraitGrid',
    component: TraitGrid,
};

export const StandAlone = ({ tokenId }: { tokenId: string }): JSX.Element => {
    const { GamingApeClubAddress, EthereumChainId } = useAppConfiguration();
    const { web3 } = useWeb3(EthereumChainId);

    const uri = useTokenUri(web3, tokenId, GamingApeClubAddress);
    const meta = useMetadata(uri.data);

    return <TraitGrid traits={meta.data?.attributes ?? []} />;
};

StandAlone.args = {
    tokenId: '1',
};
