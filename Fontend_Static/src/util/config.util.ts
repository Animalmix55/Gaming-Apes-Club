import { existsSync } from "fs";
import { BotConfig } from "../types/config.type";
import { parseYAML } from "./common.util";

export function getBotConfig(): BotConfig {
	return parseYAML(`${__dirname}/../../setup/bot.yaml`);
}
