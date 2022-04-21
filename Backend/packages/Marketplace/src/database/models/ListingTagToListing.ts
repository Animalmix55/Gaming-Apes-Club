import { Sequelize, Model, DataTypes } from 'sequelize';
import { ListingTagToListing } from '../../models/ListingTag';

export class ListingTagToListingEntity extends Model<ListingTagToListing> {}

export const initializeListingTagToListingEntity = (
    instance: Sequelize
): void => {
    ListingTagToListingEntity.init(
        {
            tagId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },
            listingId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            sequelize: instance,
            modelName: 'ListingTagToListing',
        }
    );
};
