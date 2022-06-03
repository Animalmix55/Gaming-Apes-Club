import { DataTypes, Model, Sequelize } from 'sequelize';
import { ProcessedGACXPMigration } from '../models/ProcessedGACXPMigration';

export class ProcessedGACXPMigrationEntity extends Model<ProcessedGACXPMigration> {}

export const InitializeListingRolesModel = async (
    instance: Sequelize
): Promise<void> => {
    ProcessedGACXPMigrationEntity.init(
        {
            transactionHash: {
                type: DataTypes.STRING(66),
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize: instance,
            modelName: 'ProcessedGACXPMigration',
        }
    );

    await ProcessedGACXPMigrationEntity.sync({});
};

export default InitializeListingRolesModel;
