import { Sequelize, Model, DataTypes } from 'sequelize';
import { v4 } from 'uuid';
import { ListingTag } from '../../models/ListingTag';

export class ListingTagEntity extends Model<ListingTag> {}

export const initializeListingTagEntity = (instance: Sequelize): void => {
    ListingTagEntity.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                unique: true,
                defaultValue: () => v4(),
            },
            displayName: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize: instance,
            modelName: 'ListingTag',
        }
    );
};
