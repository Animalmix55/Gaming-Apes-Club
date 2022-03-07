import { GamingApeContextProvider as MintContextProvider } from '@gac/mint/src/contexts/GamingApeClubContext';
import { GamingApeContextProvider as MarketContextProvider } from '@gac/market/src/contexts/GamingApeClubContext';

export default (story) => 
    <MintContextProvider
        value={{
            homeUrl: 'https://gamingapeclub.com',
            api: 'http://localhost:3000',
            tokenAddress: '0xC45d9156b8EB1b2C8b9dF0ebD81F29C8212855E5',
            chainId: 1337 
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