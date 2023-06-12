using Marten;

namespace MoneyManager.API.Expenses.Groups;

public class GroupManager : ICommandHandler<CreateGroupRequest, NewExpensesGroupCreated>
{
    private readonly IDocumentStore _store;
    public GroupManager(IDocumentStore store) => _store = store;

    public async Task<NewExpensesGroupCreated> ExecuteAsync(CreateGroupRequest command, CancellationToken ct = new())
    {
        await using var session = _store.LightweightSession();
        var @event = new NewExpensesGroupCreated(Guid.NewGuid(), command.Name, command.UserId);
        session.Events.StartStream<ExpensesGroup>(@event.Id, @event);
        await session.SaveChangesAsync(ct);
        return @event;
    }
}
