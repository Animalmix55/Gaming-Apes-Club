import BigDecimal from 'js-big-decimal';
import { SentOffChain } from '@gac/shared/lib/models/GACStakingAncilary';
import { editBalance, GridCraftClient } from '@gac/token';
import { ProcessedGACXPMigrationEntity } from '../database/ProcessedGACXPMigrationEntity';

const SentOffChainListener = async (
    args: SentOffChain,
    gridcraftClient: GridCraftClient
) => {
    const { returnValues, transactionHash } = args;
    const { amount, userId } = returnValues;

    if (await ProcessedGACXPMigrationEntity.findByPk(transactionHash)) {
        console.log(
            `${transactionHash} already processed from event SentOffChain. Skipping.`
        );
    }

    const amountAsNumber = Number(
        new BigDecimal(amount)
            .divide(new BigDecimal(String(10 ** 18)), 30)
            .getValue()
    );
    console.log(
        `Recieved a SentOffChain event from the blockchain. Tx: ${transactionHash}, user id: ${userId}, amount: ${amountAsNumber}`
    );

    console.log('Increasing balance by the amount', amountAsNumber);
    editBalance(gridcraftClient, userId, amountAsNumber)
        .then(() => {
            console.log(
                `Successfully increased the balance for ${userId} by ${amountAsNumber} for SentOffChain ${transactionHash}. Writing to database.`
            );

            ProcessedGACXPMigrationEntity.create({
                transactionHash,
                amount: amountAsNumber,
            })
                .then(() => {
                    console.log(
                        `Successfully wrote to database for SentOffChain ${transactionHash}.`
                    );
                })
                .catch((err) => {
                    console.error(
                        `Failed to write to database for SentOffChain ${transactionHash}.`,
                        err
                    );
                });
        })
        .catch((e) => {
            console.error(
                `Failed to increase the balance for ${userId} by ${amountAsNumber} for SentOffChain ${transactionHash}`,
                e
            );
        });
};

export const getSentOffChainListener =
    (gridcraftClient: GridCraftClient) => (args: SentOffChain) =>
        SentOffChainListener(args, gridcraftClient);

export default getSentOffChainListener;
