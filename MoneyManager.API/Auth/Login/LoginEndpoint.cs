using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using MoneyManager.API.Auth.Infrastructure;

namespace MoneyManager.API.Auth.Login;

[HttpPut(EndpointRoutes.Auth)]
[AllowAnonymous]
public class LoginEndpoint : Endpoint<LoginRequest>
{
    private readonly UserAuthenticator _authenticator;
    private readonly ITokenGenerator _tokenGenerator;

    public LoginEndpoint(UserAuthenticator authenticator, ITokenGenerator tokenGenerator)
    {
        _authenticator = authenticator;
        _tokenGenerator = tokenGenerator;
    }

    public override async Task HandleAsync(LoginRequest request, CancellationToken ct) =>
        await (await _authenticator.Execute(request.Name, request.Password))
            .Match(
                user => SendOkAsync(
                    new LoginResponse(
                        _tokenGenerator.Execute(user).ToString(),
                        user.ToDto()),
                    cancellation: ct),
                credentials => SendAsync(
                    new ErrorResponse(
                        new List<ValidationFailure> {credentials.FormatError()}, 401), 401,
                    cancellation: ct)
            );
}

public record LoginRequest(string Name, string Password);
public record LoginResponse(string Token, UserDto User);
