import { GamingApeContextProvider } from '../src/contexts/GamingApeClubContext';

export default (story) => <GamingApeContextProvider value={{ homeUrl: 'https://gamingapeclub.com', api: 'http://localhost:3000', tokenAddress: '0xC45d9156b8EB1b2C8b9dF0ebD81F29C8212855E5', chainId: 1337 }}>{story()}</GamingApeContextProvider> 