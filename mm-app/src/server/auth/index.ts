import { router, publicProcedure, protectedProcedure } from "../infrastructure/trpc";

export const authRouter = router({
  	getSession: publicProcedure.query(({ctx}) => ctx.session),
  	getSecretMessage: protectedProcedure.query(({ctx}) => {
    	return `you can now see this secret message! ${ctx.session.user.email}`;
  	}),
});
