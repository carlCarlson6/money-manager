import { randomUUID } from "crypto"
import { StoreExpenseCommand } from "./store-expense";

export class Expense {
    constructor(
        readonly id: string,
        readonly amount: number,
        readonly concept: string,
        readonly label: string,
    ) { }

    static createNew({amount, concept, label}: StoreExpenseCommand) {
        return new Expense(randomUUID(), amount, concept, label);
    }
}
