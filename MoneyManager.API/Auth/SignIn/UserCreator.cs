using Marten;
using MoneyManager.API.Auth.Infrastructure.Marten;
using OneOf;
using static System.String;
using static MoneyManager.API.Auth.User;

namespace MoneyManager.API.Auth.SignIn;

public class UserCreator : ICommandHandler<SignInRequest, OneOf<User, IEnumerable<CreateUserError>>>
{
    private readonly IDocumentStore _store;
    public UserCreator(IDocumentStore store) => _store = store;

    public async Task<OneOf<User, IEnumerable<CreateUserError>>> ExecuteAsync(SignInRequest command, CancellationToken ct = new())
    {
        var (name, password) = command;
        var validationErrors = ValidateInputs(name, password);
        if (validationErrors.Any())
            return validationErrors;

        await using var session = _store.LightweightSession();
        var maybeExistingUser = await session.FindUserByName(name, ct);
        if (maybeExistingUser is not null)
            return validationErrors.Append((CreateUserError)new UserAlreadyExists()).ToList();

        var newUser = CreateNewUser(name, password);
        session.Store(newUser);
        await session.SaveChangesAsync(ct);

        return newUser;
    }

    private static List<CreateUserError> ValidateInputs(string name, string password)
    {
        var possibleErrors = new List<CreateUserError>();
        if (IsNullOrWhiteSpace(name))
            possibleErrors.Add((CreateUserError) new InvalidUserName());
        if (IsNullOrWhiteSpace(password))
            possibleErrors.Add((CreateUserError) new InvalidPassword());
        return possibleErrors;
    }

}
