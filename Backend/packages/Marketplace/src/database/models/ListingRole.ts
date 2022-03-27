import { DataTypes, Model, Sequelize } from 'sequelize';
import { ListingRole as ListingRoleModel } from '../../models/ListingRole';

export class ListingRole extends Model<ListingRoleModel> {}

export const InitializeListingRolesModel = (instance: Sequelize): void => {
    ListingRole.init(
        {
            listingId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            roleId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize: instance,
            modelName: 'ListingRole',
        }
    );
};

export default ListingRole;
