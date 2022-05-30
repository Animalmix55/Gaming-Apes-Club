import { Chain, Web3ContextProvider } from '@gac/shared-v2';

export default (story) => 
        <Web3ContextProvider
            defaultProviders={
                { 
                    [Chain.Mumbai]: 'https://polygon-mumbai.g.alchemy.com/v2/N9z2-3yIizTLar_wuuRseVM857Kj0blW',
                    [Chain.Goerli]: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
                }
            }
        >
            {story()}
        </Web3ContextProvider>;