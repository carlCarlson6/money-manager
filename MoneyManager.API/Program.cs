global using FastEndpoints;
global using FastEndpoints.Security;
using MoneyManager.API.Infrastructure;
using static Microsoft.AspNetCore.Builder.WebApplication;

CreateBuilder(args)
    .AddApplicationServices()
    .Build()
    .ConfigureApplication()
    .Run();
