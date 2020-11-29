using Domain;
using System;
using System.Security.Claims;

namespace Application.Common.Interfaces {
    /// <summary>
    /// Provides a set of helper methods for handling and creating
    /// JSON Web Tokens for client side use.
    /// </summary>
    public interface IJwtManager {
        /// <summary>
        /// Generates a JSON Web Token.
        /// </summary>
        string GenerateJWT(AppUser user);
        /// <summary>
        /// Generates a refresh token that can be used alongside a JSON Web Token for
        /// re-authenticating a user on the client.
        /// </summary>
        string GenerateRefreshToken();
        /// <summary>
        /// Gets the expiration date in UTC for the given JSON Web Token string.
        /// </summary>
        DateTime GetJWTExpirationDate(string accessTokenString);
        /// <summary>
        /// Validates the JSON Web Token string and checks if the signing algorithm matches
        /// the one we used to create the token.
        /// </summary>
        ClaimsPrincipal GetPrincipalFromExpiredJWT(string accessTokenString);
    }
}
