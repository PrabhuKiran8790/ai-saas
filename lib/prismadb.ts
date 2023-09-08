import { PrismaClient } from "@prisma/client";

declare global {
	// rome-ignore lint/style/noVar: <explanation>
	var prisma: PrismaClient | undefined;
}

const prismaDB = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === "production") {
	globalThis.prisma = prismaDB;
}

export default prismaDB;
