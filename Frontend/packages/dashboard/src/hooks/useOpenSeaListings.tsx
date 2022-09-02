//

import { RequestResult, useRequest } from '@gac/shared-v2';
import axios from 'axios';
import React from 'react';
import { useGamingApeContext } from '../contexts/GamingApeClubContext';

export const ListingsKey = 'OPENSEA_LISTINGS';

type Listing = {
    eventTimestamp: string;
    image_url: string;
    permalink: string;
    price: string;
    priceInUSD: string;
    priceSymbol: string;
    tokenId: string;
};

export const useOpenSeaListings = (limit = 20): RequestResult<Listing[]> => {
    const { gamingApeClubAddress } = useGamingApeContext();

    const queryFn = React.useCallback(
        async (address: string | undefined) => {
            if (!address) return [];
            const url = `https://api.modulenft.xyz/api/v1/opensea/listings/new-listings?type=${address}&count=${limit}&currencySymbol=ETH`;

            const { data } = await axios.get(url);
            return data.listings;
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
