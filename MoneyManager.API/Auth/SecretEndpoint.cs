using MoneyManager.API.Common;
using static MoneyManager.API.Auth.Infrastructure.EndpointRoutes;

namespace MoneyManager.API.Auth;

[HttpGet(Secret)]
public class SecretEndpoint : EndpointWithoutRequest
{
    public override Task HandleAsync(CancellationToken ct)
    {
        var user = HttpContext.ReadUser();
        return SendOkAsync($"welcome this {user.Name} is a secret", ct);
    }
}
