import connectDatabase from './Connect';
import InitializeModels from './InitializeModels';

export const StartDatabase = async (
    host: string,
    port: number,
    db: string,
    username: string,
    password: string
) => {
    const dbContext = await connectDatabase(host, port, db, username, password);
    InitializeModels(dbContext);

    return dbContext;
};

export default StartDatabase;
