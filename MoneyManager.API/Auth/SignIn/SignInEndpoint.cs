using Microsoft.AspNetCore.Authorization;
using MoneyManager.API.Auth.Infrastructure;

namespace MoneyManager.API.Auth.SignIn;

[HttpPost(EndpointRoutes.Auth)]
[AllowAnonymous]
public class SignInEndpoint : Endpoint<SignInRequest>
{
    private readonly UserCreator _userCreator;
    private readonly ITokenGenerator _tokenGenerator;

    public SignInEndpoint(UserCreator userCreator, ITokenGenerator tokenGenerator)
    {
        _userCreator = userCreator;
        _tokenGenerator = tokenGenerator;
    }

    public override async Task HandleAsync(SignInRequest request, CancellationToken ct) =>
        await (await _userCreator.Execute(request.Name, request.Password))
            .Match(
                user => SendOkAsync(
                    new SingInResponse(
                        _tokenGenerator.Execute(user).ToString(),
                        user.ToDto()),
                    cancellation: ct),
                errors => SendAsync(
                    new ErrorResponse(
                        errors.Select(error => error.FormatError()).ToList()),
                    400,
                    cancellation: ct)
            );
}

public record SignInRequest(string Name, string Password);
public record SingInResponse(string Token, UserDto User);
