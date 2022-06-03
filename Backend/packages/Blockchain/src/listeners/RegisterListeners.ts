import { getGACStakingAncilaryContract } from '@gac/shared';
import { Sequelize } from 'sequelize';
import Web3 from 'web3';
import InitializeListingRolesModel from '../database/ProcessedGACXPMigrationEntity';
import getSentOffChainListener from './SentOffChainListener';

export const registerListeners = async (
    web3: Web3,
    gacStakingAncilaryAddress: string,
    unbToken: string,
    guildId: string,
    sequelize: Sequelize
): Promise<void> => {
    const gacXp = getGACStakingAncilaryContract(
        gacStakingAncilaryAddress,
        web3
    );

    await InitializeListingRolesModel(sequelize);

    const currentBlock = await web3.eth.getBlockNumber();
    gacXp.events
        .SentOffChain({ fromBlock: currentBlock - 2208 }) // about 8 hours
        .on('connected', () =>
            console.log('Connected to blockchain listening for SentOffChain')
        )
        .on('data', getSentOffChainListener(unbToken, guildId))
        .on('error', (e) =>
            console.error('The blockchain listener had an error', e)
        );
};

export default registerListeners;
