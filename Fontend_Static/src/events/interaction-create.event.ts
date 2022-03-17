import { Interaction } from "discord.js";
import { DMXClient } from "../classes/DMXClient";

async function execute(interaction: Interaction) {
	if (!interaction.isCommand()) return;

	const client = interaction.client as DMXClient;

	const command = client.slashCommands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (e) {
		console.error(e);
		await interaction.reply({
			content: "There was an error while executing this command!",
			ephemeral: true,
		});
	}
}

export = {
	name: "interactionCreate",
	once: false,
	execute,
};
