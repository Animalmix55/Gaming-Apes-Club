import { Sequelize } from 'sequelize';
import ListingRole, { InitializeListingRolesModel } from './models/ListingRole';
import StoredListing, { InitializeListingModel } from './models/StoredListing';
import StoredTransaction, {
    InitializeTransactionModel,
} from './models/StoredTransaction';

export const InitializeModels = (instance: Sequelize): void => {
    InitializeListingModel(instance);
    InitializeTransactionModel(instance);
    InitializeListingRolesModel(instance);

    StoredListing.hasMany(StoredTransaction, {
        foreignKey: 'listingId',
    });

    StoredListing.hasMany(ListingRole, {
        foreignKey: 'listingId',
        as: 'roles',
    });

    StoredListing.sync({}).then(() =>
        StoredTransaction.sync({}).then(() => ListingRole.sync())
    );
};

export default InitializeModels;
