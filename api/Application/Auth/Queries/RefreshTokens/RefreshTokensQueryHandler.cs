using Application.Common.Dtos;
using Application.Errors;
using Application.Interfaces;
using Application.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Auth.Queries.RefreshTokens {
    public class RefreshTokensQueryHandler : IRequestHandler<RefreshTokensQuery, UserAndTokenDto> {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtManager _jwtManager;

        public RefreshTokensQueryHandler(DataContext context, UserManager<AppUser> userManager,
            IJwtManager jwtManager) {
            _context = context;
            _userManager = userManager;
            _jwtManager = jwtManager;
        }

        public async Task<UserAndTokenDto> Handle(RefreshTokensQuery request, CancellationToken cancellationToken) {
            var principal = _jwtManager.GetPrincipalFromExpiredAccessToken(request.AccessToken);

            var authenticatedRefreshToken = await AuthenticateRefreshToken();

            // This checks whether or not we are passing the JWT Access Token in with the request.
            // We save the token in memory on the client side which means there will be scenarios
            // where we don't have the access token. For this reason we may need to execute
            // extra steps to retrieve the user.
            AppUser user;
            if (principal != null) {
                user = await _userManager.FindByNameAsync(principal.Identity.Name);
            } else {
                user = await GetUserFromAuthenticatedRefreshToken(authenticatedRefreshToken);
            }

            if (user == null) throw new RestException(HttpStatusCode.Unauthorized);

            return await UpdateAndSaveRefreshToken(user, authenticatedRefreshToken);
        }

        private async Task<RefreshToken> AuthenticateRefreshToken() {
            var refreshToken = _jwtManager.GetHttpCookieRefreshToken();

            if (string.IsNullOrEmpty(refreshToken)) throw new Exception("Invalid refresh token.");

            var storedRefreshToken = await _context.RefreshTokens.SingleOrDefaultAsync(x =>
                x.Token == refreshToken);

            if (storedRefreshToken?.Token != refreshToken || storedRefreshToken?.ExpiresAt < DateTime.Now)
                throw new RestException(HttpStatusCode.Unauthorized, new { RefreshToken = "Invalid or expired refresh token." });

            return storedRefreshToken;
        }
        private async Task<AppUser> GetUserFromAuthenticatedRefreshToken(RefreshToken refreshToken) {
            var userRefreshToken = await _context.UserRefreshTokens.SingleOrDefaultAsync(x =>
                x.RefreshTokenId == refreshToken.Id);
            return await _userManager.FindByIdAsync(userRefreshToken.AppUserId);
        }

        private async Task<UserAndTokenDto> UpdateAndSaveRefreshToken(AppUser user, RefreshToken refreshToken) {
            _context.RefreshTokens.Remove(refreshToken);

            var newRefreshToken = new RefreshToken {
                Token = _jwtManager.GenerateRefreshToken(),
                ExpiresAt = DateTime.UtcNow.AddDays(2)
            };
            _context.RefreshTokens.Add(newRefreshToken);
            var newUserRefreshToken = new UserRefreshToken {
                AppUser = user,
                RefreshToken = newRefreshToken
            };
            _context.UserRefreshTokens.Add(newUserRefreshToken);

            var success = await _context.SaveChangesAsync() > 0;
            if (!success) throw new Exception("Unable to save new refresh token.");

            // We need to set the new refresh token cookie.
            _jwtManager.SetHttpCookieRefreshToken(newRefreshToken.Token);

            return CreateUserAndTokenDto(user);
        }

        private UserAndTokenDto CreateUserAndTokenDto(AppUser user) {
            var accessToken = _jwtManager.GenerateJWTAccessToken(user);

            var userDto = new UserDto {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };

            return new UserAndTokenDto {
                User = userDto,
                AccessToken = accessToken,
                ExpiresAt = _jwtManager.GetJWTAccessTokenExpirationDate(accessToken),
            };
        }
    }
}
