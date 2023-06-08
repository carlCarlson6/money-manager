using System.Security.Claims;

namespace MoneyManager.API.Common;

public record UserContext(string Id, string Name);

public static class HttpContextExtensions
{
    public static UserContext ReadUser(this HttpContext context)
    {
        var id = context.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        var name = context.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name);
        if (id is null || name is null)
            throw new UnauthorizedAccessException();

        return new UserContext(id.Value, name.Value);
    }
}
