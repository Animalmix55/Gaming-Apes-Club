//

import { RequestResult, useRequest } from '@gac/shared-v2';
import axios from 'axios';
import React from 'react';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';

// modulenft.xyz
const MODULE_NFT_KEY = 'fe065f88-b3ab-47ec-bfad-5ad983c96f46';

export const ListingsKey = 'OPENSEA_LISTINGS';

type Listing = {
    createdAt: string;
    metadata: {
        name: string;
        image: string;
    };
    marketplace: string;
    price: string;
    tokenId: string;
};

export const useOpenSeaListings = (limit = 20): RequestResult<Listing[]> => {
    const { gamingApeClubAddress } = useGamingApeContext();

    const queryFn = React.useCallback(
        async (address: string | undefined) => {
            if (!address) return [];
            const url = `https://api.modulenft.xyz/api/v2/eth/nft/listings?active=true&count=${limit}&offset=0&sortDirection=timeDesc&marketplace=Opensea&contractAddress=${address}&withMetadata=true`;

            const { data } = await axios.get(url, {
                headers: {
                    'x-api-key': MODULE_NFT_KEY,
                },
            });

            if (!data || data.error) {
                throw new Error(data.error ?? 'Failed to fetch new listings');
            }

            return data.data ?? [];
        },
        [limit]
    );

    const result = useRequest(
        queryFn,
        ListingsKey,
        [gamingApeClubAddress, limit],
        {
            staleTime: 10 * 60 * 1000, // 10 mins
        }
    );

    return result;
};

export default useOpenSeaListings;
