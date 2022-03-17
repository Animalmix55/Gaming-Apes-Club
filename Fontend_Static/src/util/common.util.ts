import { Dirent, readFileSync } from "fs";
import YAML from "yaml";
const { resolve } = require("path");
const { readdir } = require("fs").promises;

export function parseYAML(filePath: string) {
	return YAML.parse(readFileSync(filePath, "utf8"));
}

export async function getDirFiles(dirPath: string): Promise<Array<string>> {
	const dirents = await readdir(dirPath, { withFileTypes: true });
	const files = await Promise.all(
		dirents.map((dirent: Dirent) => {
			const res = resolve(dirPath, dirent.name);
			return dirent.isDirectory() ? getDirFiles(res) : res;
		})
	);
	return Array.prototype.concat(...files);
}

export function getErrorReplyContent(text: string) {
	return {
		embeds: [
			{
				color: 0xff0000,
				description: text,
			},
		],
	};
}

export function getSuccessReplyContent(text: string) {
	return {
		embeds: [
			{
				color: 0x00ff00,
				description: text,
			},
		],
	};
}
