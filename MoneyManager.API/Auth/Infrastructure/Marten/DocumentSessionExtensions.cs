using Marten;

namespace MoneyManager.API.Auth.Infrastructure.Marten;

public static class DocumentSessionExtensions
{
    public static async Task<User?> FindUserByName(this IDocumentStore store, string userName)
    {
        await using var session = store.LightweightSession();
        return await session.FindUserByName(userName);
    }

    public static async Task<User?> FindUserByName(this IDocumentSession session, string userName) =>
        await session.Query<User>().FirstOrDefaultAsync(x => x.Name == userName);
}
