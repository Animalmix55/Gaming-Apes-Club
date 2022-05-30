import { ConfirmationContextProvider } from '@gac/shared-v2';

export default (story) => 
    <ConfirmationContextProvider>
        {story()}
    </ConfirmationContextProvider>;