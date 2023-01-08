import { router } from ".";
import { authRouter } from "../../auth";
import { expensesRouter } from "../../expenses/infrastructure/trpc-router";

export const appRouter = router({
	expenses: expensesRouter,
	auth: authRouter,
});

export type AppRouter = typeof appRouter;
