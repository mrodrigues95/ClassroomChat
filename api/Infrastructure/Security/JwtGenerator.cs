using Application.Interfaces;
using Domain;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Infrastructure.Security {
    public class JwtGenerator : IJwtGenerator {
        private readonly SymmetricSecurityKey _key;

        public JwtGenerator(IConfiguration config) {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        /// <summary>
        /// Generates a JWT access token.
        /// </summary>
        public string GenerateAccessToken(AppUser user) {
            var claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.UserName)
            };

            // Generate signing credentials.
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512);

            // Describe the token.
            var accessTokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(claims),
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = creds
            };

            // Generate and create the token.
            var tokenHandler = new JwtSecurityTokenHandler();
            var accessToken = tokenHandler.CreateToken(accessTokenDescriptor);
            return tokenHandler.WriteToken(accessToken);
        }

        /// <summary>
        /// Generates a refresh token that can be used alongside a JWT access token.
        /// </summary>
        public string GenerateRefreshToken() {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create()) {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        /// <summary>
        /// Validates the access token and checks if the signing algorithm matches
        /// the one we used to create the token.
        /// </summary>
        public ClaimsPrincipal GetPrincipalFromExpiredAccessToken(string accessToken) {
            var accessTokenValidationParameters = new TokenValidationParameters {
                ValidateAudience = false, // We may want to validate the audience and issuer.
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _key,
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;

            var principal = tokenHandler.ValidateToken(accessToken, accessTokenValidationParameters,
                out securityToken);

            // Check if the security algorithm we used to sign the access token matches up with the
            // request.
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(
                SecurityAlgorithms.HmacSha512, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid access token");

            return principal;
        }
    }
}
