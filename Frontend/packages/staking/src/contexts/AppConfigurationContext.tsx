import React from 'react';

export interface AppConfigurationContextType {
    /**
     * For when no provider is specified by the browser.
     */
    DefaultPolygonProvider?: string;
    /**
     * For when no provider is specified by the browser.
     */
    DefaultEthereumProvider?: string;
    EthereumChainId?: number;
    PolygonChainId?: number;
    GACXPContractAddress?: string;
    GamingApeClubAddress?: string;
    GACStakingContractAddress?: string;
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
