import { Chain } from '@gac/shared-v2';
import React from 'react';

export interface GamingApeClubContextType {
    twitterUrl?: string;
    discordUrl?: string;
    openseaUrl?: string;
    homeUrl?: string;
    api?: string;
    adminRoles?: string[];
    defaultDiscordMessage?: string;
    chainId?: Chain;
    ethereumChainId?: Chain;
    polygonChainId?: Chain;
    gacXPAddress?: string;
    gacStakingContractAddress?: string;
    gacStakingChildContractAddress?: string;
    gamingApeClubAddress?: string;
}

export const GamingApeClubContext =
    React.createContext<GamingApeClubContextType>({});

export const GamingApeContextProvider = GamingApeClubContext.Provider;

export const useGamingApeContext = (): GamingApeClubContextType =>
    React.useContext(GamingApeClubContext);
