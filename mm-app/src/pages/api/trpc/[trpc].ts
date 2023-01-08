import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "../../../env/server.mjs";
import { createContext } from "../../../server/infrastructure/trpc";
import { appRouter } from "../../../server/infrastructure/trpc";

export default createNextApiHandler({
	router: appRouter,
	createContext,
	onError: env.NODE_ENV === "development"
	? ({ path, error }) => { console.error(`❌ tRPC failed on ${path}: ${error}`); }
	: undefined,
});
