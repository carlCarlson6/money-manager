using Microsoft.AspNetCore.Authorization;
using MoneyManager.API.Auth.Infrastructure;
using OneOf;

namespace MoneyManager.API.Auth.SignIn;

[HttpPost(EndpointRoutes.Auth)]
[AllowAnonymous]
public class SignInEndpoint : Endpoint<SignInRequest>
{
    private readonly ITokenGenerator _tokenGenerator;
    public SignInEndpoint(ITokenGenerator tokenGenerator) => _tokenGenerator = tokenGenerator;

    public override async Task HandleAsync(SignInRequest request, CancellationToken cancellation)
    {
        var userOrErrors = await request.ExecuteAsync(cancellation);
        await userOrErrors
            .Match(
                user => SendOkAsync(
                    new SingInResponse(
                        _tokenGenerator.Execute(user).ToString(),
                        user.ToDto()),
                    cancellation),
                errors => SendAsync(
                    new ErrorResponse(errors.Select(error => error.FormatError()).ToList()),
                    400,
                    cancellation)
            );
    }
}

public record SignInRequest(string Name, string Password) : ICommand<OneOf<User, IEnumerable<CreateUserError>>>;
public record SingInResponse(string Token, UserDto User);
