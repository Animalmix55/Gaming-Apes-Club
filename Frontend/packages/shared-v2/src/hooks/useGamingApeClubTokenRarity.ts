import React from 'react';
import Rarities from '../assets/json/GamingApeClubRarities.json';

export const useGamingApeClubTokenRarity = (
    tokenId: string | number
): number | undefined => {
    return React.useMemo(() => Rarities[String(tokenId) as never], [tokenId]);
};

export default useGamingApeClubTokenRarity;
