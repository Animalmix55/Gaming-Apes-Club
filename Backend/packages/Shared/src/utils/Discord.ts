import { BitFieldResolvable, Client, IntentsString } from 'discord.js';

export const getClient = async (
    token: string,
    intents: BitFieldResolvable<IntentsString, number>
): Promise<Client> => {
    const client = await new Client({ intents });
    await client.login(token);

    return client;
};

export const getGuildMember = async (
    client: Client,
    userId: string,
    guildId: string
) => {
    const guild = await client.guilds.fetch(guildId);
    return guild.members.fetch(userId);
};

export const sendMessage = async (
    client: Client,
    channelId: string,
    message: string
) => {
    const channel = await client.channels.fetch(channelId);

    if (!channel) {
        throw new Error(`Failed to get channel ${channelId}`);
    }

    if (channel.isText()) {
        channel.send(message);
    } else {
        throw new Error(`Channel ${channelId} is not a text channel`);
    }
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
