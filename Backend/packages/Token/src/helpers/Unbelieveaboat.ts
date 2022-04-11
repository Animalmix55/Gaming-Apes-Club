import { Balance, Client } from 'unb-api';

export const getUNBClient = (token: string) => {
    return new Client(token, { maxRetries: 0 });
};

export const getBalance = (client: Client, guildId: string, userId: string) =>
    client.getUserBalance(guildId, userId);

export const setBalance = (
    client: Client,
    guildId: string,
    userId: string,
    amounts: Balance
) => client.setUserBalance(guildId, userId, amounts);

/**
 * Sepnds/adds the given amount depending on the sign of the values
 */
export const editBalance = (
    client: Client,
    guildId: string,
    userId: string,
    amounts: Balance
) => client.editUserBalance(guildId, userId, amounts);

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

/**
 * Spends the given amount of tokens, does not do balance checking
 */
export const spend = async (
    client: Client,
    guildId: string,
    userId: string,
    amount: number
) =>
    editBalance(client, guildId, userId, {
        cash: 0 - amount,
    });

/**
 * Gives the given amount of tokens
 */
export const give = async (
    client: Client,
    guildId: string,
    userId: string,
    amount: number
) =>
    editBalance(client, guildId, userId, {
        cash: amount,
    });
