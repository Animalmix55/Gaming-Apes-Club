import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 } from 'uuid';
import { Transaction } from '../../models/Transaction';

export class StoredTransaction extends Model<Transaction> {}

export const InitializeTransactionModel = (instance: Sequelize): void => {
    StoredTransaction.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: () => v4(),
            },
            listingId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            user: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize: instance,
            modelName: 'Transaction',
        }
    );
};

export default StoredTransaction;
