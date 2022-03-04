import React from 'react';
import { Chain } from '../models/Chain';

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
