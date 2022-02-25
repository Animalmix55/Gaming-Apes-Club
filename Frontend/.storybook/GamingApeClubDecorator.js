import { GamingApeContextProvider } from '../src/contexts/GamingApeClubContext';

export default (story) => <GamingApeContextProvider value={{ homeUrl: 'https://gamingapeclub.com', api: 'http://localhost:3000', tokenAddress: '0xa5d36f191A8E58138D628C823aE16Aa9c5440789', chainId: 1337 }}>{story()}</GamingApeContextProvider> 