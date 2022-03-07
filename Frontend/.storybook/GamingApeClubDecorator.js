import { GamingApeContextProvider as MintContextProvider } from '@gac/mint/src/contexts/GamingApeClubContext';
import { GamingApeContextProvider as MarketContextProvider } from '@gac/market/src/contexts/GamingApeClubContext';

export default (story) => 
    <MintContextProvider
        value={{
            homeUrl: 'https://gamingapeclub.com',
            api: 'http://localhost:3000',
            tokenAddress: '0xb05dd03C025e12294f144d0897c50eBB37Cbd7E9',
            chainId: 4
        }}>
            <MarketContextProvider
                value={{
                    homeUrl: 'https://gamingapeclub.com',
                    api: 'http://localhost:3000',
                }}
            >
                {story()}
            </MarketContextProvider>
    </MintContextProvider> 