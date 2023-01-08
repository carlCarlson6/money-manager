import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { Expense } from "../expense";

@Entity({name: "expenses"})
export class ExpenseEntity extends BaseEntity {
    @PrimaryColumn({unique: true}) id!: string;
    @Column() amount!: number    
    @Column() concept!: string
    @Column() label!: string
}

export const toExpenseEntity = ({id, amount, concept, label}: Expense): ExpenseEntity => {
    const expenseEntity = new ExpenseEntity();
    expenseEntity.id = id;
    expenseEntity.amount = amount;
    expenseEntity.concept = concept;
    expenseEntity.label = label;
    return expenseEntity;
}
