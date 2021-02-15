using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Infrastructure.Security {
    public class TokenManager : ITokenManager {
        private readonly SymmetricSecurityKey _key;
        private readonly ILogger<TokenManager> _logger;

        public TokenManager(IConfiguration config, ILogger<TokenManager> logger) {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            _logger = logger;
        }

        public string GenerateJWT(ApplicationUser user) {
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

            var validationParameters = new TokenValidationParameters {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _key,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            ClaimsPrincipal principal;
            try {
                principal = tokenHandler.ValidateToken(accessTokenString, validationParameters, out securityToken);
            } catch (SecurityTokenExpiredException) {
                return null;
            } catch (Exception ex) {
                _logger.LogError(ex, ex.Message);
                throw;
            }

            // Check if the security algorithm we used to sign the access token matches up with the request.
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken is null || !jwtSecurityToken.Header.Alg.Equals(
                SecurityAlgorithms.HmacSha512, StringComparison.InvariantCultureIgnoreCase)) {
                throw new SecurityTokenException("Invalid access token.");
            }

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
