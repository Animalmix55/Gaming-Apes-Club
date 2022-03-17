import {
	CommandInteraction,
	Guild,
	MessageActionRow,
	MessageButton,
	MessageEmbed,
	Role,
} from "discord.js";
import { SlashCommandBuilder, roleMention } from "@discordjs/builders";
import {
	getErrorReplyContent,
	getSuccessReplyContent,
} from "../util/common.util";
import { getPrismaClient } from "../service/database.service";
import { APIRole } from "discord-api-types";

const prisma = getPrismaClient();

async function execute(interaction: CommandInteraction): Promise<any> {
	await interaction.deferReply({ ephemeral: true });

	if (!interaction.inGuild() || !interaction.guild) {
		return await interaction.editReply(
			getErrorReplyContent("This command can only be used in servers.")
		);
	}

	if (!interaction.memberPermissions?.has("ADMINISTRATOR")) {
		return await interaction.editReply(
			getErrorReplyContent("Only administrators can run this command.")
		);
	}

	const subcommand = interaction.options.getSubcommand();

	switch (subcommand) {
		case "add-rule":
			await addRule(interaction, interaction.guild);
			break;
		case "list-rules":
			await listRules(interaction, interaction.guild);
			break;
		case "remove-rule":
			await removeRule(interaction, interaction.guild);
			break;
	}
}

async function addRule(interaction: CommandInteraction, guild: Guild) {
	const hasRole = interaction.options.getRole("has", true);
	const forDuration = interaction.options.getNumber("for", true);
	const giveRole = interaction.options.getRole("give", true);
	const unit = interaction.options.getString("unit", true);

	let milliseconds = 0;

	if (unit === "minutes") {
		milliseconds = forDuration * 60000;
	} else {
		milliseconds = forDuration * 8.64e7;
	}

	// check if rule already exits
	const existingRecord = await prisma.ageRoleRule.findFirst({
		where: {
			hasRoleId: hasRole.id,
			forDuration: milliseconds,
			giveRoleId: giveRole.id,
		},
	});

	if (existingRecord) {
		return await interaction.editReply(
			getErrorReplyContent("A rule with same information already exists.")
		);
	}

	const confirmation = await getRuleAddConfirmation(
		interaction,
		hasRole,
		forDuration,
		unit,
		giveRole
	);
	if (!confirmation) return;

	// create a new rule
	await prisma.ageRoleRule.create({
		data: {
			hasRoleId: hasRole.id,
			forDuration: milliseconds,
			forUnit: unit,
			giveRoleId: giveRole.id,
		},
	});

	return await interaction.editReply(
		getSuccessReplyContent("Your rule has been successfully added.")
	);
}

async function listRules(interaction: CommandInteraction, guild: Guild) {
	const rules = await prisma.ageRoleRule.findMany();

	if (rules.length === 0) {
		return interaction.editReply(
			getSuccessReplyContent("You don't have any rules added.")
		);
	}

	// build the embed
	let list = rules
		.map((r, i) => {
			let duration = 0;

			if (r.forUnit === "minutes") {
				duration = Math.floor(r.forDuration / 60000);
			} else {
				duration = Math.floor(r.forDuration / 8.64e7);
			}

			return `${i + 1}) If a member has ${roleMention(
				r.hasRoleId
			)} for ${duration} ${r.forUnit}, give ${roleMention(
				r.giveRoleId
			)} [**ID: ${r.id}**]`;
		})
		.join("\n");

	const embed = new MessageEmbed()
		.setTitle("AutoRole | Rules List")
		.setDescription(
			`There are currently ${rules.length} active rules.\n\n${list}`
		)
		.setColor("BLURPLE");

	await interaction.editReply({ embeds: [embed] });
}

async function removeRule(interaction: CommandInteraction, guild: Guild) {
	const id = interaction.options.getNumber("id", true);

	const existingRecord = await prisma.ageRoleRule.findFirst({
		where: { id: id },
	});

	if (!existingRecord) {
		return await interaction.editReply(
			getErrorReplyContent("A rule with the given ID doesn't exist!")
		);
	}

	await prisma.ageRoleRule.delete({ where: { id } });

	await interaction.editReply(
		getSuccessReplyContent("Rule has been successfully removed.")
	);
}

const getRuleAddConfirmation = async (
	interaction: CommandInteraction,
	hasRole: Role | APIRole,
	forDuration: number,
	unit: string,
	giveRole: Role | APIRole
) => {
	if (!interaction.channel) return;

	await interaction.deferReply().catch((e) => {});

	const row = new MessageActionRow().addComponents(
		new MessageButton()
			.setCustomId(`${interaction.user.id}-yes`)
			.setLabel("Confirm")
			.setStyle("SUCCESS"),

		new MessageButton()
			.setCustomId(`${interaction.user.id}-no`)
			.setLabel("Cancel")
			.setStyle("DANGER")
	);

	const confirmation = await interaction.editReply({
		embeds: [
			{
				color: "BLURPLE",
				title: "AutoRole | New Rule Confirmation",
				description: `If a member has ${hasRole.toString()} for ${forDuration} ${unit}, ${giveRole.toString()} should get added.`,
				footer: {
					text: "This will expire in 5 minutes",
				},
			},
		],
		components: [row],
	});

	const confirmationRes = await interaction.channel
		.awaitMessageComponent({
			componentType: "BUTTON",
			time: 300000,
			filter: (i) => i.customId.startsWith(interaction.user.id),
		})
		.catch((e) => {});

	if (!confirmationRes) {
		await interaction.editReply({
			...getErrorReplyContent(
				"**You failed to provide a response. Please try running the command again.**"
			),
			components: [],
		});
		return false;
	}

	if (confirmationRes.customId.endsWith("no")) {
		await interaction.editReply({
			...getSuccessReplyContent(
				"**Confirmation has been successfully cancelled.**"
			),
			components: [],
		});

		return false;
	}

	await interaction.editReply({ components: [] });

	return true;
};

export = {
	data: new SlashCommandBuilder()
		.setName("roles")
		.setDescription("Manage rules for assigning roles based on role ages")
		.addSubcommand((command) =>
			command
				.setName("add-rule")
				.setDescription("Add new rule")
				.addRoleOption((option) =>
					option
						.setName("has")
						.setDescription("Role member should have")
						.setRequired(true)
				)
				.addNumberOption((option) =>
					option
						.setName("for")
						.setDescription("How long a member should have the previous role ")
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("unit")
						.setDescription("Unit for the previous duration")
						.addChoice("Minutes", "minutes")
						.addChoice("Days", "days")
						.setRequired(true)
				)
				.addRoleOption((option) =>
					option
						.setName("give")
						.setDescription("New role member should get")
						.setRequired(true)
				)
		)
		.addSubcommand((command) =>
			command
				.setName("list-rules")
				.setDescription("Add new role for role age system")
		)
		.addSubcommand((command) =>
			command
				.setName("remove-rule")
				.setDescription("Add new role for role age system")
				.addNumberOption((option) =>
					option
						.setName("id")
						.setRequired(true)
						.setDescription("ID of the rule from list-rules command")
				)
		),
	execute: execute,
};
