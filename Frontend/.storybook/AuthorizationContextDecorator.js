import { AuthorizationContextProvider } from '@gac/market/src/contexts/AuthorizationContext';

export default (story) => <AuthorizationContextProvider>{story()}</AuthorizationContextProvider> 