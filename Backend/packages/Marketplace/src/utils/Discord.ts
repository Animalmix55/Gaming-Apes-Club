import { User } from '@gac/login';
import { sendMessage } from '@gac/shared';
import { Client } from 'discord.js';
import { Listing } from '../models/Listing';

export const sendTransactionMessage = async (
    client: Client,
    channelId: string,
    user: User,
    listing: Listing
): Promise<void> => {
    const message = `<@${user.id}> just spent **${listing.price} GAC XP** to purchase **${listing.title}** at the GAC Shack!`;

    await sendMessage(client, channelId, message);
};

export default {};
