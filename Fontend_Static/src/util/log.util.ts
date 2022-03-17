import { BotConfig } from "../types/config.type";
import { getBotConfig } from "./config.util";

const config = getBotConfig();

export function postLog(
	title: string,
	content: any,
	type: BotConfig["LOG TYPES"]
) {
	if (config["LOG TYPES"].includes(type)) {
		try {
			if (content.errorData) {
				content.errorData =
					content.errorData.code || content.errorData.toString() || "";
			}
			console.log(`${title}: `, content);
		} catch (e) {}
	}
}
