import { User } from '@gac/login';
import { sendMessage } from '@gac/shared';
import { Client } from 'discord.js';
import { Listing } from '../models/Listing';
import Transaction from '../models/Transaction';

export const sendTransactionMessage = async (
    client: Client,
    channelId: string,
    user: User,
    listing: Listing,
    transaction: Transaction,
    defaultMessage: string
): Promise<string> => {
    const { discordMessage } = listing;

    let message = discordMessage || defaultMessage;

    const data = { user, listing, transaction };

    message = message.replace(
        /{([a-zA-Z]+)\.([A-Za-z]+)\}/g,
        (match, ...args): string => {
            const [obj, attribute] = args;

            const targetObject = data[obj as keyof typeof data];
            if (!attribute || !targetObject) return match;
            const newVal = targetObject[attribute as keyof typeof targetObject];
            if (typeof newVal === 'object') return match;

            return String(newVal);
        }
    );

    await sendMessage(client, channelId, message);

    return message;
};

export default {};
