import { ProviderContextProvider } from '@gac/shared';

export default (story) => <ProviderContextProvider>{story()}</ProviderContextProvider>;