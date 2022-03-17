import dotenv from "dotenv";
dotenv.config();
import { Intents } from "discord.js";
import { DMXClient } from "./classes/DMXClient";

(async function init() {
	const client = new DMXClient({
		clientOptions: {
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
			partials: ["GUILD_MEMBER"],
		},
		eventsDir: `${__dirname}/events`,
		commandsDir: `${__dirname}/commands`,
	});
})();
