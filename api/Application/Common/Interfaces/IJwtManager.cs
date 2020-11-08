using Domain;
using System;
using System.Security.Claims;

namespace Application.Interfaces {
    public interface IJwtManager {
        string GenerateJWTAccessToken(AppUser user);
        string GenerateRefreshToken();
        DateTime GetJWTAccessTokenExpirationDate(string accessTokenString);
        ClaimsPrincipal GetPrincipalFromExpiredAccessToken(string accessTokenString);
        string GetHttpCookieRefreshToken();
        void SetHttpCookieRefreshToken(string refreshToken);
    }
}
