import { SlashCommandBuilder } from "@discordjs/builders";
import { ClientOptions, CommandInteraction, Message } from "discord.js";

export type ClassicCommand = {
	trigger: string;
	alias: Array<string>;
	execute: (msg: Message) => Promise<any>;
};

export type SlashCommand = {
	data: SlashCommandBuilder;
	execute: (interaction: CommandInteraction) => Promise<any>;
	configuration?: true;
};

export type DMXClientOptions = {
	clientOptions: ClientOptions;
	eventsDir: string;
	commandsDir: string;
	prefix?: string;
};
