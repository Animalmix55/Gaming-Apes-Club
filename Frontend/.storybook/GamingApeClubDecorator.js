import { GamingApeContextProvider } from '../src/contexts/GamingApeClubContext';

export default (story) => <GamingApeContextProvider value={{ homeUrl: 'https://gamingapeclub.com' }}>{story()}</GamingApeContextProvider> 