import { Web3ContextProvider } from '@gac/shared-v2';

export default (story) => <Web3ContextProvider defaultProvider="https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161">{story()}</Web3ContextProvider>;