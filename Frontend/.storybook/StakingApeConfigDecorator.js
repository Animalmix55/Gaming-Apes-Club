import { AppCongfigurationContextProvider } from '@gac/staking/src/contexts/AppConfigurationContext';

export default (story) => 
    <AppCongfigurationContextProvider
        value={{
            PolygonProvider: 'https://rpc-mainnet.matic.network',
            EthereumChainId: 5,
            EtherscanUrl: 'https://goerli.etherscan.io/',
            GACStakingChildContractAddress: '0x779742E4c1863ee9BE63A65f09A81Fd5C19d1c1f',
            GACStakingContractAddres: '0xFcBb6a69Ec0070f7D3ffaBF82511E2e3255C7621',
            GACXPContractAddress: '0x953898Ea6dc1e4643AB09c20A45378e550e11123',
            OpenSeaUrl: 'https://opensea.io/collection/gamingapeclub',
            TwitterUrl: 'https://twitter.com/GamingApeClub',
            DiscordUrl: 'http://discord.gg/GamingApeClub',
            GamingApeClubAddress: '0x953898Ea6dc1e4643AB09c20A45378e550e11123',
        }}>
            {story()}
    </AppCongfigurationContextProvider>;