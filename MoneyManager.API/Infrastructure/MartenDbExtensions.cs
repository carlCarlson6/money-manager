using Marten;
using MoneyManager.API.Auth.Infrastructure.Marten;
using Weasel.Core;

namespace MoneyManager.API.Infrastructure;

public static class MartenDbExtensions
{
    public static IServiceCollection AddMartenDb(this IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
    {
        services.AddMarten(options =>
        {
            options.Connection(configuration.GetConnectionString("supabase-db")!);
            if (environment.IsDevelopment())
                options.AutoCreateSchemaObjects = AutoCreate.All;
            options.Schema.IndexUserByName();
        });
        return services;
    }
}
