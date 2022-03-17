import { PrismaClient } from "@prisma/client";

let client: any;

export function getPrismaClient(): PrismaClient {
	if (!client) {
		client = new PrismaClient();
	}

	return client;
}
