import React from 'react';
import { CustomRpcProvider } from '@gac/shared-v2';

export enum RPCProviderTag {
    Polygon,
}

export interface AppConfigurationContextType {
    PolygonProvider?: string;
    EthereumChainId?: number;
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

export const AppCongfigurationContextProvider = ({
    children,
    value,
}: {
    children: React.ReactNode;
    value: AppConfigurationContextType;
}): JSX.Element => {
    const { PolygonProvider } = value;

    if (!PolygonProvider)
        return (
            <AppConfigurationContext.Provider value={value}>
                {children}
            </AppConfigurationContext.Provider>
        );

    return (
        <CustomRpcProvider
            providerTag={RPCProviderTag.Polygon}
            providerUrl={PolygonProvider}
        >
            <AppConfigurationContext.Provider value={value}>
                {children}
            </AppConfigurationContext.Provider>
        </CustomRpcProvider>
    );
};

export const useAppConfiguration = (): AppConfigurationContextType =>
    React.useContext(AppConfigurationContext);
