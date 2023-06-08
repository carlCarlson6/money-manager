using FluentValidation.Results;
using MoneyManager.API.Common;
using OneOf;

namespace MoneyManager.API.Auth.SignIn;

public class CreateUserError : OneOfBase<InvalidUserName, InvalidPassword, UserAlreadyExists>, IFormatsError
{
    private CreateUserError(OneOf<InvalidUserName, InvalidPassword, UserAlreadyExists> input) : base(input) { }

    public ValidationFailure FormatError() => Match(
        name => name.FormatError(),
        password => password.FormatError(),
        exists => exists.FormatError()
    );

    public static explicit operator CreateUserError(InvalidUserName error) => new(error);
    public static explicit operator CreateUserError(InvalidPassword error) => new(error);
    public static explicit operator CreateUserError(UserAlreadyExists error) => new(error);
}

public record InvalidUserName : IFormatsError
{
    public ValidationFailure FormatError() => new(nameof(InvalidUserName), nameof(InvalidUserName));
}

public record InvalidPassword : IFormatsError
{
    public ValidationFailure FormatError() => new(nameof(InvalidPassword), nameof(InvalidPassword));
}

public record UserAlreadyExists : IFormatsError
{
    public ValidationFailure FormatError() => new(nameof(UserAlreadyExists), nameof(UserAlreadyExists));
}
