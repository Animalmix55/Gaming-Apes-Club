import { User } from '@gac/login';
import { sendMessage } from '@gac/shared';
import { Client } from 'discord.js';
import { Listing } from '../models/Listing';

export const sendTransactionMessage = async (
    client: Client,
    channelId: string,
    user: User,
    listing: Listing
): Promise<string> => {
    const { discordMessage } = listing;

    let message =
        discordMessage ||
        '<@{user.id}> just spent **{listing.price} GAC XP** to purchase **{listing.title}** at the GAC Shack!';

    const data = { user, listing };

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

export const applyRole = async (
    client: Client,
    userId: string,
    guildId: string,
    roleId: string
) => {
    const guild = await client.guilds.fetch(guildId);
    const user = await guild.members.fetch({ user: userId });

    await user.roles.add(roleId);
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
