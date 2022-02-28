import { Balance, Client } from 'unb-api';

export const getUNBClient = (token: string) => {
    return new Client(token);
};

export const getBalance = (client: Client, guildId: string, userId: string) =>
    client.getUserBalance(guildId, userId);

export const setBalance = (
    client: Client,
    guildId: string,
    userId: string,
    amounts: Balance
) => client.setUserBalance(guildId, userId, amounts);

interface Query {
    /**
     * @default 'total'
     */
    sort?: 'cash' | 'bank' | 'total';
    limit?: number;
    offset?: number;
    page?: number;
}
export const getLeaderboard = (client: Client, guildId: string, query: Query) =>
    client.getGuildLeaderboard(guildId, query);

export const spend = async (
    client: Client,
    guildId: string,
    userId: string,
    amount: number
) => {
    const { total, cash, bank } = await getBalance(client, guildId, userId);
    if (total < amount) throw new Error('Insufficient balance');

    if (cash >= amount) {
        await setBalance(client, guildId, userId, {
            bank,
            cash: cash - amount,
        });
    } else {
        const newBankBalance = bank - amount + cash;

        await setBalance(client, guildId, userId, {
            bank: newBankBalance,
            cash: 0,
        });
    }
};
