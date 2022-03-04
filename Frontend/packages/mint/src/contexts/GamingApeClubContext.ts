import { Chain } from '@gac/shared';
import React from 'react';

export interface GamingApeClubContextType {
    tokenAddress?: string;
    chainId?: Chain;
    twitterUrl?: string;
    discordUrl?: string;
    openseaUrl?: string;
    etherscanUrl?: string;
    homeUrl?: string;
    api?: string;
}

export const GamingApeClubContext =
    React.createContext<GamingApeClubContextType>({});

export const GamingApeContextProvider = GamingApeClubContext.Provider;

export const useGamingApeContext = (): GamingApeClubContextType =>
    React.useContext(GamingApeClubContext);
