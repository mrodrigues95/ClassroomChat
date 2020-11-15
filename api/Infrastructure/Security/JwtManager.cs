using Application.Common.Interfaces;
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
    public class JwtManager : IJwtManager {
        private readonly SymmetricSecurityKey _key;

        public JwtManager(IConfiguration config) {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string GenerateJWT(AppUser user) {
            var claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.UserName)
            };

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

        public string GenerateRefreshToken() {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create()) {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public ClaimsPrincipal GetPrincipalFromExpiredJWT(string accessTokenString) {
            if (string.IsNullOrEmpty(accessTokenString)) return null;

            var accessTokenValidationParameters = new TokenValidationParameters {
                ValidateAudience = false, // We may want to validate the audience and issuer.
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _key,
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var principal = tokenHandler.ValidateToken(accessTokenString, accessTokenValidationParameters,
                out SecurityToken securityToken);

            // Check if the security algorithm we used to sign the access token matches up with the
            // request.
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(
                SecurityAlgorithms.HmacSha512, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid access token.");

            return principal;
        }

        public DateTime GetJWTExpirationDate(string accessTokenString) {
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.ReadToken(accessTokenString);
            var tokenExpirationDate = token.ValidTo;

            if (tokenExpirationDate == DateTime.MinValue) throw new Exception("Could not get exp claim from token.");

            return tokenExpirationDate;
        }
    }
}
