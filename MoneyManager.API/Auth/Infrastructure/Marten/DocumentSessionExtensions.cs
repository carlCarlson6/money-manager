using Marten;

namespace MoneyManager.API.Auth.Infrastructure.Marten;

public static class DocumentSessionExtensions
{
    public static async Task<User?> FindUserByName(this IDocumentStore store, string userName, CancellationToken cancellationToken = default)
    {
        await using var session = store.LightweightSession();
        return await session.FindUserByName(userName, cancellationToken);
    }

    public static async Task<User?> FindUserByName(this IDocumentSession session, string userName, CancellationToken cancellationToken = default) =>
        await session.Query<User>().FirstOrDefaultAsync(x => x.Name == userName, token: cancellationToken);
}
