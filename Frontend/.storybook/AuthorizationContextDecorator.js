import { AuthorizationContextProvider } from '@gac/market/src/contexts/AuthorizationContext';
import { AuthorizationContextProvider as ProfileAuthorizationContextProvider } from '@gac/profile/src/contexts/AuthorizationContext';

export default (story) => (
    <ProfileAuthorizationContextProvider>
        <AuthorizationContextProvider>{story()}</AuthorizationContextProvider>
    </ProfileAuthorizationContextProvider>
);
