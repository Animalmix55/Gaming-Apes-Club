import { GamingApeContextProvider as MintContextProvider } from '@gac/mint/src/contexts/GamingApeClubContext';
import { GamingApeContextProvider as MarketContextProvider } from '@gac/market/src/contexts/GamingApeClubContext';
import { GamingApeContextProvider as DashboardContextProvider } from '@gac/dashboard/src/contexts/GamingApeClubContext';

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
            <DashboardContextProvider
                value={{
                    homeUrl: 'https://gamingapeclub.com',
                    api: 'http://localhost:3000',
                    openseaUrl: 'test',
                    twitterUrl: 'test',
                    discordUrl: 'test',
                    gacStakingAncilaryAddress:
                        '0xf4a08D9c5CfA5281A242eEA7c777A4014225B14a',
                    gacXPAddress: '0xAc2a6706285b91143eaded25d946Ff17A60A6512',
                    chainId: 137,
                }}
            >
                {story()}
            </DashboardContextProvider>
        </MarketContextProvider>
    </MintContextProvider>
);
