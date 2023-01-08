import { router } from "../../infrastructure/trpc";
import { storeExpenseMutation } from "../store-expense";

export const expensesRouter = router({
    storeExpense: storeExpenseMutation
});
