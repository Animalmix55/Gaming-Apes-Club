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

export const getRolesById = async (client: Client, guildId: string) => {
    const guild = await client.guilds.fetch(guildId);
    const roles = await guild.roles.fetch();

    const rolesById = Array.from(roles.keys()).reduce((prev, cur) => {
        const role = roles.get(cur);

        if (!role) return prev;

        return { ...prev, [role.id]: role.name };
    }, {} as Record<string, string>);

    return rolesById;
};

export const getGuildMember = async (
    client: Client,
    userId: string,
    guildId: string
) => {
    const guild = await client.guilds.fetch(guildId);
    return guild.members.fetch(userId);
};
