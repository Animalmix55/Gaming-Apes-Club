import { ClientPresenceStatus, ExcludeEnum } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";

export type BotConfig = {
	TOKEN: string;
	"CLIENT ID": string;
	"ACTIVITY TYPE": ExcludeEnum<typeof ActivityTypes, "CUSTOM"> | undefined;
	"ACTIVITY NAME": string;
	STATUS: ClientPresenceStatus;
	"LOG TYPES": "bot" | "scanner" | "error";
	"DISCORD SERVER ID": string;
};
