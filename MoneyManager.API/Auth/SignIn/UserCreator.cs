using Marten;
using MoneyManager.API.Auth.Infrastructure;
using MoneyManager.API.Auth.Infrastructure.Marten;
using OneOf;
using static System.String;
using static MoneyManager.API.Auth.User;

namespace MoneyManager.API.Auth.SignIn;

public class UserCreator
{
    private readonly IDocumentStore _store;
    public UserCreator(IDocumentStore store) => _store = store;

    public async Task<OneOf<User, IEnumerable<CreateUserError>>> Execute(string name, string password)
    {
        var validationErrors = ValidateInputs(name, password);
        if (validationErrors.Any())
            return validationErrors;

        await using var session = _store.LightweightSession();
        var maybeExistingUser = await session.FindUserByName(name);
        if (maybeExistingUser is not null)
            return validationErrors.Append((CreateUserError)new UserAlreadyExists()).ToList();

        var newUser = CreateNewUser(name, password);
        session.Store(newUser);
        await session.SaveChangesAsync();

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
