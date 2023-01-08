import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { createContext, type Context } from "./context";
import { AppRouter, appRouter } from "./router";

const trpc = initTRPC.context<Context>().create({
  	transformer: superjson,
  	errorFormatter({ shape }) {
    	return shape;
  	},
});

const router = trpc.router;

const publicProcedure = trpc.procedure;

const isAuthedMiddleWare = trpc.middleware(({ ctx, next }) => {
  	if (!ctx.session || !ctx.session.user) {
    	throw new TRPCError({ code: "UNAUTHORIZED" });
  	}
  	return next({
    	ctx: {
      		// infers the `session` as non-nullable
      		session: { ...ctx.session, user: ctx.session.user },
    	},
  });
});

const protectedProcedure = trpc.procedure.use(isAuthedMiddleWare);

export { 
	appRouter, 
	createContext,
	publicProcedure,
	protectedProcedure,
	router
}

export type {
	AppRouter
}
