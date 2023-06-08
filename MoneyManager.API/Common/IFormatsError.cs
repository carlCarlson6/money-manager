using FluentValidation.Results;

namespace MoneyManager.API.Common;

public interface IFormatsError
{
    ValidationFailure FormatError();
}
