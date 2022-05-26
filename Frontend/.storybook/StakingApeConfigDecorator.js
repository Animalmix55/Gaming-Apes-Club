import { AppCongfigurationContextProvider } from '@gac/staking/src/contexts/AppConfigurationContext';

export default (story) => 
    <AppCongfigurationContextProvider
        value={{
            PolygonProvider: 'https://rpc-mainnet.matic.network',
            EthereumChainId: 5,
            EtherscanUrl: 'https://goerli.etherscan.io/',
            GACStakingChildContractAddress: '0x779742E4c1863ee9BE63A65f09A81Fd5C19d1c1f',
            GACStakingContractAddres: '0xb522Aa86D2379a30e8D4A89cc7Ea29c9b9C257E9',
            GACXPContractAddress: '0x953898Ea6dc1e4643AB09c20A45378e550e11123',
            OpenSeaUrl: 'https://opensea.io/collection/gamingapeclub',
            TwitterUrl: 'https://twitter.com/GamingApeClub',
            DiscordUrl: 'http://discord.gg/GamingApeClub',
            GamingApeClubAddress: '0xcB9dFFf3942c1A0418A8717Eae940d0d2C8399B9',
        }}>
            {story()}
    </AppCongfigurationContextProvider>;