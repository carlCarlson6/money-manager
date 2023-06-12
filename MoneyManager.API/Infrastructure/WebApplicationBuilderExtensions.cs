using MoneyManager.API.Auth.Infrastructure;

namespace MoneyManager.API.Infrastructure;

public static class WebApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddApplicationServices(this WebApplicationBuilder builder)
    {
        builder.Services
            .AddCors(options =>
            {
                options.AddDefaultPolicy(policy => policy
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin()
                );
            })
            .AddMartenDb(builder.Configuration, builder.Environment)
            .AddFastEndpoints()
            .AddAuth();
        return builder;
    }

}

public static class WebAppExtensions
{
    public static WebApplication ConfigureApplication(this WebApplication webApp)
    {
        webApp
            .UseRouting()
            .UseCors()
            .UseAuthentication()
            .UseAuthorization()
            .UseFastEndpoints();
        return webApp;
    }
}
