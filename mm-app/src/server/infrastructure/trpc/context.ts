import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";
import { getServerAuthSession } from "../../auth/get-server-auth-session";
import { typeOrm } from "../type-orm"

type CreateContextOptions = {
	session: Session | null;
};

const initTypeOrm = async () => {
	console.log("init db connection");
	return await typeOrm.initialize()
};

export const createContextInner = async (opts: CreateContextOptions) => {
	return ({
		session: opts.session,
		typeOrmDataSource: !typeOrm.isInitialized ? await initTypeOrm() : typeOrm
	});
};

export const createContext = async (opts: CreateNextContextOptions) => await createContextInner({
	session: await getServerAuthSession({ req: opts.req, res: opts.res }),
});

export type Context = inferAsyncReturnType<typeof createContext>;
