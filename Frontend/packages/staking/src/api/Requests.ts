import { ERC721Meta } from '@gac/shared-v2';
import axios from 'axios';

export const getMetadata = async (
    tokenUri?: string
): Promise<ERC721Meta | undefined> => {
    if (!tokenUri) return undefined;

    const { data } = await axios.get<ERC721Meta>(tokenUri);

    return data;
};

export default {};
