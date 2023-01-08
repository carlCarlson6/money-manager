import { DataSource } from "typeorm";
import { z } from "zod";
import { protectedProcedure } from "../infrastructure/trpc";
import { Expense } from "./expense";
import { ExpenseEntity, toExpenseEntity } from "./infrastructure/expense-entity";

export const storeExpenseMutation = protectedProcedure
    .input(z.object({
        amount: z.number(),
        concept: z.string(),
        label: z.string(),
    }))
    .mutation(async ({input, ctx}) => await storeExpenseByTypeOrm(ctx.typeOrmDataSource)(input));


export type StoreExpenseCommand = {
    amount: number,
    concept: string,
    label: string,
}

export type StoreExpense = (command: StoreExpenseCommand) => Promise<void>
export type StoreExpenseTypeOrm = (dataSource: DataSource) => StoreExpense

export const storeExpenseByTypeOrm: StoreExpenseTypeOrm = (dataSource: DataSource) => async (command: StoreExpenseCommand) => {
    const expense = Expense.createNew({...command});
    await dataSource.getRepository(ExpenseEntity).save(toExpenseEntity(expense));
}
