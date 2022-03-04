import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 } from 'uuid';
import { Listing } from '../../models/Listing';

export class StoredListing extends Model<Listing> {}

export const InitializeListingModel = (instance: Sequelize): void => {
    StoredListing.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: () => v4(),
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdBy: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdOn: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            supply: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            maxPerUser: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            requiresHoldership: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false,
            },
            disabled: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            requiresLinkedAddress: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize: instance,
            modelName: 'Listing',
        }
    );
};

export default StoredListing;
