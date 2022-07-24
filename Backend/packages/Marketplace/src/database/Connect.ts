import { Sequelize } from 'sequelize';

export const connectDatabase = async (
    host: string,
    port: number,
    db: string,
    username: string,
    password: string
) => {
    const sequelize = new Sequelize(db, username, password, {
        host,
        port,
        dialect: 'mysql',
        logging: false,
        retry: {
            max: 10,
        },
    });

    console.log(`Connecting to DB at ${host}:${port}`);

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync();
        console.log('Database synced.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }

    return sequelize;
};

export default connectDatabase;
