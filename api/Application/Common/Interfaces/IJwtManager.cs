using Domain;
using System;
using System.Security.Claims;

namespace Application.Common.Interfaces {
    public interface IJwtManager {
        string GenerateJWTAccessToken(AppUser user);
        string GenerateRefreshToken();
        DateTime GetJWTAccessTokenExpirationDate(string accessTokenString);
        ClaimsPrincipal GetPrincipalFromExpiredAccessToken(string accessTokenString);
    }
}
