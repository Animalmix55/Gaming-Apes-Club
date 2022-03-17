import { GuildMember, Role } from "discord.js";
import { getPrismaClient } from "../service/database.service";

const prisma = getPrismaClient();

async function execute(member: GuildMember) {
	// remove member records
	await prisma.memberRole
		.deleteMany({ where: { memberId: member.id } })
		.catch((e) => {});
}

export = {
	name: "guildMemberRemove",
	once: false,
	execute,
};
