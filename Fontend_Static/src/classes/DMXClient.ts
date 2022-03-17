import { Client, Collection } from "discord.js";
import { getDirFiles } from "../util/common.util";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { getBotConfig } from "../util/config.util";
import {
	SlashCommand,
	ClassicCommand,
	DMXClientOptions,
} from "../types/dmx.type";
import { postLog } from "../util/log.util";

const config = getBotConfig();

export class DMXClient extends Client {
	slashCommands: Collection<string, SlashCommand> = new Collection();
	classicCommands: Collection<string, ClassicCommand> = new Collection();
	prefix: string | undefined;

	constructor(options: DMXClientOptions) {
		super(options.clientOptions);
		this.registerEvents(options.eventsDir);
		this.registerCommands(options.commandsDir);
		this.prefix = options.prefix;
	}

	private registerEvents = async (eventsDir: string) => {
		const eventFiles = await (
			await getDirFiles(eventsDir)
		).filter((f) => f.endsWith(".ts") || f.endsWith("js"));

		for (const f of eventFiles) {
			const event = await import(f);

			if (event.once) {
				this.once(event.name, (...args) => event.execute(...args));
			} else {
				this.on(event.name, (...args) => event.execute(...args));
			}
		}
	};

	private registerCommands = async (commandsDir: string) => {
		await this.performLogin();

		const commandFiles = await (
			await getDirFiles(commandsDir)
		).filter((f) => f.endsWith(".ts") || f.endsWith("js"));

		const configurationSlashCommandData: Array<any> = [];
		const slashCommandsData: Array<any> = [];

		for (const f of commandFiles) {
			const command = await import(f);

			// classic command
			if (command.trigger) {
				this.classicCommands.set(command.trigger, command);
				for (const alias of command.alias) {
					this.classicCommands.set(alias, command);
				}
			}

			// slash command
			if (!command.data) continue;

			if (command.configuration) {
				configurationSlashCommandData.push(command.data.toJSON());
			} else {
				slashCommandsData.push(command.data.toJSON());
			}

			this.slashCommands.set(command.data.name, command);
		}

		if (this.classicCommands.size > 0) {
			postLog("Loaded", `${this.classicCommands.size} Classic Commands`, "bot");
		}

		if (slashCommandsData.length === 0) return;

		const rest = new REST({ version: "9" }).setToken(config.TOKEN);

		try {
			await rest.put(Routes.applicationCommands(config["CLIENT ID"]), {
				body: [],
			});

			await rest.put(
				Routes.applicationGuildCommands(
					config["CLIENT ID"],
					config["DISCORD SERVER ID"]
				),
				{
					body: slashCommandsData,
				}
			);
		} catch (e) {
			console.log(slashCommandsData);
			console.error(e);
		}
		if (this.slashCommands.size > 0) {
			postLog("Loaded", `${this.slashCommands.size} Slash Commands`, "bot");
		}
	};

	private async performLogin() {
		await this.login(config.TOKEN);
	}
}
