import { Sequelize } from 'sequelize';
import StoredListing, { InitializeListingModel } from './models/StoredListing';
import StoredTransaction, {
    InitializeTransactionModel,
} from './models/StoredTransaction';

export const InitializeModels = (instance: Sequelize): void => {
    InitializeListingModel(instance);
    InitializeTransactionModel(instance);

    StoredListing.hasMany(StoredTransaction, {
        foreignKey: 'listingId',
    });

    StoredListing.sync({}).then(() => StoredTransaction.sync({}));
};

export default InitializeModels;
