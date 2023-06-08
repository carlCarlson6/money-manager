using FluentValidation.Results;
using Marten;
using MoneyManager.API.Auth.Infrastructure;
using MoneyManager.API.Auth.Infrastructure.Marten;
using MoneyManager.API.Common;
using OneOf;

namespace MoneyManager.API.Auth.Login;

public class UserAuthenticator
{
    private readonly IDocumentStore _store;

    public UserAuthenticator(IDocumentStore store) => _store = store;

    public async Task<OneOf<User, InvalidCredentials>> Execute(string userName, string password)
    {
        var maybeUser = await _store.FindUserByName(userName);
        if (maybeUser is null)
            return new InvalidCredentials();

        if (!maybeUser.IsValidPassword(password))
            return new InvalidCredentials();

        return maybeUser;
    }


}

public record InvalidCredentials : IFormatsError
{
    public ValidationFailure FormatError() => new(nameof(InvalidCredentials), nameof(InvalidCredentials));
}
