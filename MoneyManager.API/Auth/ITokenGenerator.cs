using System.Security.Claims;
using ValueOf;

namespace MoneyManager.API.Auth;

public interface ITokenGenerator
{
    Token Execute(User user);
}

public class FastEndpointsTokenGenerator : ITokenGenerator
{
    public Token Execute(User user) => Token.From(JWTBearer.CreateToken(
        signingKey: "token-signin-key", // TODO - should be read from config,
        expireAt: DateTime.UtcNow.AddHours(8),
        claims: new (string claimType, string claimValue)[]
        {
            (ClaimTypes.NameIdentifier, user.Id),
            (ClaimTypes.Name, user.Name)
        }));
}

public class Token : ValueOf<string, Token> { }
