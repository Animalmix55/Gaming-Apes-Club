import { useTokenUri, useWeb3 } from '@gac/shared-v2';
import React from 'react';
import { useMetadata } from '../api/hooks/useMetadata';
import { TraitGrid } from '../atoms/TraitGrid';
import { useAppConfiguration } from '../contexts/AppConfigurationContext';

export default {
    title: 'Staking/Atoms/TraitGrid',
    component: TraitGrid,
};

export const StandAlone = ({ tokenId }: { tokenId: string }): JSX.Element => {
    const { GamingApeClubAddress, EthereumChainId } = useAppConfiguration();
    const { provider } = useWeb3(EthereumChainId);

    const uri = useTokenUri(provider, tokenId, GamingApeClubAddress);
    const meta = useMetadata(uri.data);

    return <TraitGrid traits={meta.data?.attributes ?? []} />;
};

StandAlone.args = {
    tokenId: '1',
};
