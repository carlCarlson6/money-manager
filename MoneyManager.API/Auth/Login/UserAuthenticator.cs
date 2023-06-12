using FluentValidation.Results;
using Marten;
using MoneyManager.API.Auth.Infrastructure.Marten;
using MoneyManager.API.Common;
using OneOf;

namespace MoneyManager.API.Auth.Login;

public class UserAuthenticator : ICommandHandler<LoginRequest, OneOf<User, InvalidCredentials>>
{
    private readonly IDocumentStore _store;
    public UserAuthenticator(IDocumentStore store) => _store = store;

    public async Task<OneOf<User, InvalidCredentials>> ExecuteAsync(LoginRequest command, CancellationToken ct = new())
    {
        var maybeUser = await _store.FindUserByName(command.Name, ct);
        if (maybeUser is null)
            return new InvalidCredentials();

        if (!maybeUser.IsValidPassword(command.Password))
            return new InvalidCredentials();

        return maybeUser;
    }
}

public record InvalidCredentials : IFormatsError
{
    public ValidationFailure FormatError() => new(nameof(InvalidCredentials), nameof(InvalidCredentials));
}
