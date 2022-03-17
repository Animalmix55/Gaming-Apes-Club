import { Client, Guild, GuildMember, Role } from "discord.js";
import { DateTime } from "luxon";
import { getBotConfig } from "../util/config.util";
import { getPrismaClient } from "./database.service";
import cron from "node-cron";

const prisma = getPrismaClient();
const config = getBotConfig();

export async function initializeAutoRoleService(client: Client) {
	const guild = await client.guilds
		.fetch(config["DISCORD SERVER ID"])
		.catch((e) => {});

	if (!guild) {
		return console.log(
			"Failed to find the discord server. Please check your bot config."
		);
	}

	console.log("Status: Saving server member role information");
	// save information about roles members have
	const members = await (
		await guild.members.fetch({ force: true })
	).filter((m) => !m.user.bot);

	// go through members
	for (const m of Array.from(members.values())) {
		for (const r of Array.from(m.roles.cache.values())) {
			if (r.id === m.guild.roles.everyone.id) continue;

			await prisma.memberRole.upsert({
				update: {},
				create: {
					memberId: m.id,
					roleId: r.id,
					addedDate: DateTime.now().toJSDate(),
				},
				where: {
					memberId_roleId: {
						memberId: m.id,
						roleId: r.id,
					},
				},
			});
		}
	}

	console.log("Status: Successfully saved server member role information");

	await runRoleCheckingJob(guild).catch(console.log);

	console.log("Status: Started role checking service schedule");

	cron.schedule("0 */12 * * *", () => {
		runRoleCheckingJob(guild).catch(console.log);
	});
}

export async function handleRolesAdd(member: GuildMember, roles: Role[]) {
	for (const r of roles) {
		await prisma.memberRole
			.upsert({
				update: {
					addedDate: DateTime.now().toJSDate(),
				},
				create: {
					memberId: member.id,
					roleId: r.id,
					addedDate: DateTime.now().toJSDate(),
				},
				where: {
					memberId_roleId: {
						memberId: member.id,
						roleId: r.id,
					},
				},
			})
			.catch((e) => {});
	}
}

export async function handleRolesRemove(member: GuildMember, roles: Role[]) {
	for (const r of roles) {
		await prisma.memberRole
			.deleteMany({
				where: {
					roleId: r.id,
					memberId: member.id,
				},
			})
			.catch((e) => {});
	}
}

async function runRoleCheckingJob(guild: Guild) {
	console.log("Status: Running role checking job");

	const rules = await prisma.ageRoleRule.findMany();

	for (const rule of rules) {
		// find member with role in this rule
		const memberRecords = await prisma.memberRole.findMany({
			where: { roleId: rule.hasRoleId },
		});

		for (const mr of memberRecords) {
			const member = await guild.members.fetch(mr.memberId).catch((e) => {});
			if (!member) continue;

			// how many days member had the role
			const memberRoleAge = Math.floor(
				DateTime.now().diff(DateTime.fromJSDate(mr.addedDate), ["milliseconds"])
					.milliseconds
			);

			// didn't have role for long enough
			if (memberRoleAge < rule.forDuration) continue;

			// give role to member
			await member.roles.add(rule.giveRoleId).catch((e) => {});
		}
	}
}
