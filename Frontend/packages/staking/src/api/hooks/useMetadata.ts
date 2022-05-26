import { ERC721Meta, RequestResult, useRequest } from '@gac/shared-v2';
import { getMetadata } from '../Requests';

export const TOKEN_METADATA_KEY = 'TOKEN_METADATA';

export const useMetadata = (
    tokenUri?: string
): RequestResult<ERC721Meta | undefined> => {
    return useRequest(getMetadata, TOKEN_METADATA_KEY, [tokenUri], {
        staleTime: Infinity,
    });
};
