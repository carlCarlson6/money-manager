namespace MoneyManager.API.Expenses.Groups;

public record ExpensesGroup(Guid Id, Guid Owner);

public record NewExpensesGroupCreated(Guid Id, string Name, Guid Owner);
