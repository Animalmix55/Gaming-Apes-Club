import axios, { AxiosRequestHeaders } from 'axios';

interface GridCraftBalanceGetResponse {
    success: boolean;
    balance?: number;
    timestamp: string;
}

interface GridCraftBalancePatchResponse {
    success: boolean;
}

export enum GridCraftAccountType {
    Discord = 'DISCORD',
    Minecraft = 'MINECRAFT',
    Ethereum = 'ETHEREUM',
    Gridcraft = 'GRIDCRAFT',
}

export enum GridcraftCurrency {
    GACXP = 'gac_xp',
}

export class GridCraftClient {
    private _authToken: string;

    private _baseUrl: string;

    private _wafSecret: string;

    constructor(baseUrl: string, authToken: string, wafSecret: string) {
        this._authToken = authToken;
        this._wafSecret = wafSecret;
        this._baseUrl = baseUrl;
    }

    private getHeaders = (): AxiosRequestHeaders => ({
        Authorization: this._authToken,
        Cookie: `waf-secret=${this._wafSecret}`,
    });

    public getUserBalance = async (
        userId: string,
        accountType = GridCraftAccountType.Discord,
        currency = GridcraftCurrency.GACXP
    ): Promise<number> => {
        const { data } = await axios.get<GridCraftBalanceGetResponse>(
            `${this._baseUrl}/api/currency?identifier=${userId}&account_type=${accountType}&currency=${currency}`,
            {
                headers: this.getHeaders(),
            }
        );

        const { balance, success } = data;
        if (!success) throw new Error('Request failed');
        if (balance == null)
            throw new Error('Missing balance from Gridcraft response');

        return balance;
    };

    public editUserBalance = async (
        userId: string,
        amount: number,
        accountType = GridCraftAccountType.Discord,
        currency = GridcraftCurrency.GACXP
    ): Promise<void> => {
        const { data } = await axios.patch<GridCraftBalancePatchResponse>(
            `${this._baseUrl}/api/currency`,
            {
                identifier: userId,
                account_type: accountType,
                currency,
                amount,
            },
            {
                headers: this.getHeaders(),
            }
        );

        const { success } = data;
        if (!success) throw new Error('Request failed');
    };
}

export const getGridcraftClient = (
    baseUrl: string,
    authToken: string,
    wafSecret: string
) => {
    return new GridCraftClient(baseUrl, authToken, wafSecret);
};

export const getBalance = (
    client: GridCraftClient,
    userId: string,
    accountType = GridCraftAccountType.Discord,
    currency = GridcraftCurrency.GACXP
) => client.getUserBalance(userId, accountType, currency);

/**
 * Sepnds/adds the given amount depending on the sign of the values
 */
export const editBalance = (
    client: GridCraftClient,
    userId: string,
    amount: number,
    accountType = GridCraftAccountType.Discord,
    currency = GridcraftCurrency.GACXP
) => client.editUserBalance(userId, amount, accountType, currency);

/**
 * Spends the given amount of tokens, does not do balance checking
 */
export const spend = async (
    client: GridCraftClient,
    userId: string,
    amount: number,
    accountType = GridCraftAccountType.Discord,
    currency = GridcraftCurrency.GACXP
) => editBalance(client, userId, 0 - amount, accountType, currency);

/**
 * Gives the given amount of tokens
 */
export const give = async (
    client: GridCraftClient,
    userId: string,
    amount: number,
    accountType = GridCraftAccountType.Discord,
    currency = GridcraftCurrency.GACXP
) => editBalance(client, userId, amount, accountType, currency);
