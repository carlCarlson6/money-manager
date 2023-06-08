using Marten;

namespace MoneyManager.API.Auth.Infrastructure.Marten;

public static class AuthIndexes
{
    public static void IndexUserByName(this MartenRegistry schema) =>
        schema.For<User>().Index(x => x.Name);
}
