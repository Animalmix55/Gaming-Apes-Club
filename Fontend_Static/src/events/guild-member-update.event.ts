import { GuildMember, Role } from "discord.js";
import { handleRolesAdd, handleRolesRemove } from "../service/autorole.service";

async function execute(oldMember: GuildMember, newMember: GuildMember) {
	// ignore non role updates
	if (
		oldMember.roles.cache.size === newMember.roles.cache.size ||
		oldMember.user.bot
	)
		return;

	const oldMemberRoles = Array.from(oldMember.roles.cache.values());
	const newMemberRoles = Array.from(newMember.roles.cache.values());

	if (oldMember.roles.cache.size < newMember.roles.cache.size) {
		// role add
		const addedRoles: Role[] = [];

		for (const role of newMemberRoles) {
			if (!oldMemberRoles.includes(role)) {
				addedRoles.push(role);
			}
		}

		await handleRolesAdd(oldMember, addedRoles).catch((e) => {});
	} else {
		// role remove
		const removedRoles: Role[] = [];

		for (const role of oldMemberRoles) {
			if (!newMemberRoles.includes(role)) {
				removedRoles.push(role);
			}
		}

		await handleRolesRemove(oldMember, removedRoles).catch((e) => {});
	}
}

export = {
	name: "guildMemberUpdate",
	once: false,
	execute,
};
