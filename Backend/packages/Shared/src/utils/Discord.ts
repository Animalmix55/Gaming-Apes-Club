import { BitFieldResolvable, Client, IntentsString } from 'discord.js';

export const getClient = async (
    token: string,
    intents: BitFieldResolvable<IntentsString, number>
): Promise<Client> => {
    const client = await new Client({ intents });
    await client.login(token);

    return client;
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
