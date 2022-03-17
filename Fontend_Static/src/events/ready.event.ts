import { Client } from "discord.js";
import { initializeAutoRoleService } from "../service/autorole.service";
import { getBotConfig } from "../util/config.util";
import { postLog } from "../util/log.util";
const config = getBotConfig();

function execute(client: Client) {
	postLog(
		"Status",
		`Status: Ready [${client.user?.tag}] [${
			process.env.PRODUCTION ? "PRODUCTION" : "DEVELOPMENT"
		}]`,
		"bot"
	);

	client.user?.setPresence({
		activities: [
			{ name: config["ACTIVITY NAME"], type: config["ACTIVITY TYPE"] },
		],
		status: config["STATUS"],
	});

	initializeAutoRoleService(client).catch(console.log);
}

export = {
	name: "ready",
	once: true,
	execute,
};
