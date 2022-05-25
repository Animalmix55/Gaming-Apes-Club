import { Web3ContextProvider } from '@gac/shared-v2';

export default (story) => <Web3ContextProvider>{story()}</Web3ContextProvider>;