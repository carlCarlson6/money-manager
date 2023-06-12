using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using MoneyManager.API.Auth.Infrastructure;
using OneOf;

namespace MoneyManager.API.Auth.Login;

[HttpPut(EndpointRoutes.Auth)]
[AllowAnonymous]
public class LoginEndpoint : Endpoint<LoginRequest>
{
    private readonly ITokenGenerator _tokenGenerator;
    public LoginEndpoint(UserAuthenticator authenticator, ITokenGenerator tokenGenerator) => _tokenGenerator = tokenGenerator;

    public override async Task HandleAsync(LoginRequest request, CancellationToken cancellation)
    {
        var userOrInvalidCredentials = await request.ExecuteAsync(cancellation);
        await userOrInvalidCredentials
            .Match(
                user => SendOkAsync(
                    new LoginResponse(
                        _tokenGenerator.Execute(user).ToString(),
                        user.ToDto()),
                    cancellation),
                credentials => SendAsync(
                    new ErrorResponse(
                        new List<ValidationFailure> {credentials.FormatError()},
                        401),
                    401,
                    cancellation)
            );
    }
}

public record LoginRequest(string Name, string Password) : ICommand<OneOf<User, InvalidCredentials>>;
public record LoginResponse(string Token, UserDto User);
