using System.Security.Claims;

namespace MoneyManager.API.Expenses.Groups;

[HttpPost("/api/groups")]
public class CreateGroupEndpoint : Endpoint<CreateGroupRequest>
{
    public override async Task HandleAsync(CreateGroupRequest request, CancellationToken cancellationToken) =>
        await SendOkAsync(
            await request.ExecuteAsync(cancellationToken),
            cancellationToken);
}

public record CreateGroupRequest(
    string Name,
    [property: FromClaim(ClaimType = ClaimTypes.NameIdentifier)]
    Guid UserId
) : ICommand<NewExpensesGroupCreated>;
