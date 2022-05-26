import React from 'react';
import Ranks from '../assets/json/GamingApeClubRankings.json';

export const useGamingApeClubTokenRank = (
    tokenId: string | number
): number | undefined => {
    return React.useMemo(() => Ranks[String(tokenId) as never], [tokenId]);
};

export default useGamingApeClubTokenRank;
