import { Sequelize } from 'sequelize';
import ListingRole, { InitializeListingRolesModel } from './models/ListingRole';
import {
    initializeListingTagEntity,
    ListingTagEntity,
} from './models/ListingTag';
import {
    initializeListingTagToListingEntity,
    ListingTagToListingEntity,
} from './models/ListingTagToListing';
import StoredListing, { InitializeListingModel } from './models/StoredListing';
import StoredTransaction, {
    InitializeTransactionModel,
} from './models/StoredTransaction';

export const InitializeModels = (instance: Sequelize): void => {
    InitializeListingModel(instance);
    InitializeTransactionModel(instance);
    InitializeListingRolesModel(instance);
    initializeListingTagEntity(instance);
    initializeListingTagToListingEntity(instance);

    StoredListing.hasMany(StoredTransaction, {
        foreignKey: 'listingId',
        as: 'transactions',
    });

    StoredTransaction.belongsTo(StoredListing, {
        targetKey: 'id',
        foreignKey: 'listingId',
        as: 'listing',
    });

    StoredListing.hasMany(ListingRole, {
        foreignKey: 'listingId',
        as: 'roles',
    });

    StoredListing.hasMany(ListingTagToListingEntity, {
        as: 'listingToTags',
        foreignKey: 'listingId',
    });

    ListingTagToListingEntity.hasOne(ListingTagEntity, {
        as: 'tag',
        foreignKey: 'id',
        sourceKey: 'tagId',
    });

    ListingTagToListingEntity.hasOne(StoredListing, {
        as: 'listing',
        foreignKey: 'id',
        sourceKey: 'listingId',
    });

    StoredListing.belongsToMany(ListingTagEntity, {
        through: ListingTagToListingEntity,
        as: 'tags',
        foreignKey: 'listingId',
        otherKey: 'tagId',
    });

    ListingTagEntity.belongsToMany(StoredListing, {
        through: ListingTagToListingEntity,
        as: 'listings',
        foreignKey: 'tagId',
        otherKey: 'listingId',
    });

    ListingTagEntity.hasMany(ListingTagToListingEntity, {
        as: 'listingToTags',
        foreignKey: 'tagId',
    });

    StoredListing.sync({}).then(() =>
        StoredTransaction.sync({}).then(() =>
            ListingRole.sync().then(() =>
                ListingTagEntity.sync({}).then(() =>
                    ListingTagToListingEntity.sync({})
                )
            )
        )
    );
};

export default InitializeModels;
