import React from 'react';

export interface GamingApeClubContextType {
    twitterUrl?: string;
    discordUrl?: string;
    openseaUrl?: string;
    homeUrl?: string;
    api?: string;
    adminRoles?: string[];
}

export const GamingApeClubContext =
    React.createContext<GamingApeClubContextType>({});

export const GamingApeContextProvider = GamingApeClubContext.Provider;

export const useGamingApeContext = (): GamingApeClubContextType =>
    React.useContext(GamingApeClubContext);
