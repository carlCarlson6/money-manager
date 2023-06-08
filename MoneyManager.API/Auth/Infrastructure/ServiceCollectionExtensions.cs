using MoneyManager.API.Auth.Login;
using MoneyManager.API.Auth.SignIn;

namespace MoneyManager.API.Auth.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddAuth(this IServiceCollection services) => services
        .AddJWTBearerAuth("token-signin-key") // TODO - should be read from config,
        .AddScoped<UserCreator>()
        .AddScoped<UserAuthenticator>()
        .AddScoped<ITokenGenerator, FastEndpointsTokenGenerator>();
}
