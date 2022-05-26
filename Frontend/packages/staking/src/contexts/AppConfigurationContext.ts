import React from 'react';

export interface AppConfigurationContextType {
    PolygonProvider?: string;
    EthereumChainId?: number;
    GACXPContractAddress?: string;
    GamingApeClubAddress?: string;
    GACStakingContractAddres?: string;
    GACStakingChildContractAddress?: string;
    EtherscanUrl?: string;
    TwitterUrl?: string;
    DiscordUrl?: string;
    OpenSeaUrl?: string;
}
export const AppConfigurationContext =
    React.createContext<AppConfigurationContextType>({});

export const AppCongfigurationContextProvider =
    AppConfigurationContext.Provider;

export const useAppConfiguration = (): AppConfigurationContextType =>
    React.useContext(AppConfigurationContext);
