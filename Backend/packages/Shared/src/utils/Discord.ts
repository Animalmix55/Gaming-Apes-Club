import {
    BitFieldResolvable,
    Client,
    IntentsString,
    GuildMember,
} from 'discord.js';

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
    let result = await guild.members.cache.get(userId);
    if (!result) result = await guild.members.fetch(userId);

    return result;
};

export const getGuildMembers = async (
    client: Client,
    userIds: string[],
    guildId: string
) => {
    const guild = await client.guilds.fetch(guildId);
    const unprocessedIds = [...userIds];

    const members: Record<string, GuildMember> = {};
    for (let i = unprocessedIds.length - 1; i >= 0; i--) {
        const id = unprocessedIds[i];

        const member = guild.members.cache.get(id);
        if (member) {
            members[id] = member;
            unprocessedIds.pop();
        }
    }

    const remaining = unprocessedIds.length;
    const groupSize = 100;
    const groups = Math.ceil(remaining / groupSize);

    for (let i = 0; i < groups; i++) {
        const group = unprocessedIds.slice(i * groupSize, (i + 1) * groupSize);

        // eslint-disable-next-line no-await-in-loop
        const results = await guild.members.fetch({ user: group });
        results.forEach((val, key) => {
            members[key] = val;
        });
    }

    return members;
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
