using System.Security.Cryptography;
using static System.Array;
using static System.Convert;
using static System.Guid;
using static System.Security.Cryptography.RandomNumberGenerator;

namespace MoneyManager.API.Auth;

public record User(string Id, string Name, string HashedPassword)
{
    public static User CreateNewUser(string name, string password) => new(
        NewGuid().ToString(),
        name,
        HashPassword(password));

    private static string HashPassword(string password)
    {
        var salt = GetBytes(16);
        var hash = new Rfc2898DeriveBytes(password, salt, 100000).GetBytes(20);
        var hashBytes = new byte[36];
        Copy(salt, 0, hashBytes, 0, 16);
        Copy(hash, 0, hashBytes, 16, 20);
        return ToBase64String(hashBytes);
    }

    public bool IsValidPassword(string password)
    {
        var hashBytes = FromBase64String(HashedPassword);
        var salt = new byte[16];
        Copy(hashBytes, 0, salt, 0, 16);
        var hash = new Rfc2898DeriveBytes(password, salt, 100000).GetBytes(20);
        for (var i=0; i < 20; i++)
            if (hashBytes[i + 16] != hash[i])
                return false;
        return true;
    }

    public UserDto ToDto() => new(Id, Name);

}

public record UserDto(string Id, string Name);
