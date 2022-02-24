import { ProviderContextProvider } from '../src/contexts/ProviderContext';

export default (story) => <ProviderContextProvider>{story()}</ProviderContextProvider> 