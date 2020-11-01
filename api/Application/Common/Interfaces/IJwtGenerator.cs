using Domain;
using System.Security.Claims;

namespace Application.Interfaces {
    public interface IJwtGenerator {
        string GenerateAccessToken(AppUser user);
        string GenerateRefreshToken();
        ClaimsPrincipal GetPrincipalFromExpiredAccessToken(string accessToken);
    }
}
