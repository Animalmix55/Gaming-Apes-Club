import { GamingApeContextProvider as MintContextProvider } from '@gac/mint/src/contexts/GamingApeClubContext';
import { GamingApeContextProvider as MarketContextProvider } from '@gac/market/src/contexts/GamingApeClubContext';
import { GamingApeContextProvider as DashboardContextProvider } from '@gac/dashboard/src/contexts/GamingApeClubContext';
import { GamingApeContextProvider as ProfileContextProvider } from '@gac/profile/src/contexts/GamingApeClubContext';

const PROVIDER_VALUE = {
    homeUrl: 'https://gamingapeclub.com',
    api: 'http://localhost:3000',
    openseaUrl: 'test',
    twitterUrl: 'test',
    discordUrl: 'test',
    gamingApeClubAddress: '0xAc2a6706285b91143eaded25d946Ff17A60A6512',
    gacStakingContractAddress: '0x412aCAd86FFa3b287C1043ab4e56F7C4A6A9e385',
    gacXPAddress: '0xAc2a6706285b91143eaded25d946Ff17A60A6512',
    chainId: 137,
    ethereumChainId: 1,
    polygonChainId: 1,
};

export default (story) => (
    <MintContextProvider
        value={{
            homeUrl: 'https://gamingapeclub.com',
            api: 'http://localhost:3000',
            tokenAddress: '0xb05dd03C025e12294f144d0897c50eBB37Cbd7E9',
            chainId: 4,
            openseaUrl: 'test',
            twitterUrl: 'test',
            discordUrl: 'test',
        }}
    >
        <MarketContextProvider
            value={{
                homeUrl: 'https://gamingapeclub.com',
                api: 'http://localhost:3000',
                openseaUrl: 'test',
                twitterUrl: 'test',
                discordUrl: 'test',
            }}
        >
            <DashboardContextProvider value={PROVIDER_VALUE}>
                <ProfileContextProvider value={PROVIDER_VALUE}>
                    {story()}
                </ProfileContextProvider>
            </DashboardContextProvider>
        </MarketContextProvider>
    </MintContextProvider>
);
