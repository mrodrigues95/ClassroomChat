using Application.Common;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using Application.User;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Auth.Queries.RefreshTokens {
    public class RefreshTokensQueryHandler : IRequestHandler<RefreshTokensQuery, Result<UserAndTokenDto>> {
        private readonly Persistence.ApplicationContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtManager _jwtManager;
        private readonly IHttpContextManager _httpContextManager;

        public RefreshTokensQueryHandler(Persistence.ApplicationContext context, UserManager<ApplicationUser> userManager,
            IJwtManager jwtManager, IHttpContextManager httpContextManager) {
            _context = context;
            _userManager = userManager;
            _jwtManager = jwtManager;
            _httpContextManager = httpContextManager;
        }

        public async Task<Result<UserAndTokenDto>> Handle(RefreshTokensQuery request, CancellationToken cancellationToken) {
            var principal = _jwtManager.GetPrincipalFromExpiredJWT(_httpContextManager.GetJWT());

            var authenticatedRefreshToken = await AuthenticateRefreshToken();
            if (authenticatedRefreshToken is null) return Result<UserAndTokenDto>.Failure("Invalid or expired refresh token.", true);

            // This checks whether or not we are passing the JWT Access Token in with the request.
            // We save the token in memory on the client side which means there will be scenarios
            // where we don't have the access token. For this reason we may need to execute
            // extra steps to retrieve the user.
            ApplicationUser user;
            if (principal != null) {
                user = await _userManager.FindByNameAsync(principal.Identity.Name);
            } else {
                user = await GetUserFromAuthenticatedRefreshToken(authenticatedRefreshToken);
            }

            if (user is null) return Result<UserAndTokenDto>.Failure("Unable to find user.", true);

            return await UpdateAndSaveRefreshToken(user, authenticatedRefreshToken);
        }

        private async Task<RefreshToken> AuthenticateRefreshToken() {
            var refreshToken = _httpContextManager.GetHttpCookieRefreshToken();

            if (string.IsNullOrEmpty(refreshToken)) return null;

            var storedRefreshToken = await _context.RefreshTokens.SingleOrDefaultAsync(x =>
                x.Token == refreshToken);

            if (storedRefreshToken?.Token != refreshToken || storedRefreshToken.IsExpired) return null;            

            return storedRefreshToken;
        }
        private async Task<ApplicationUser> GetUserFromAuthenticatedRefreshToken(RefreshToken refreshToken) {
            var user = await _context.ApplicationUsers.SingleOrDefaultAsync(x =>
                x == refreshToken.ApplicationUser);
            return await _userManager.FindByIdAsync(user.Id);
        }

        private async Task<Result<UserAndTokenDto>> UpdateAndSaveRefreshToken(ApplicationUser user, RefreshToken refreshToken) {
            _context.RefreshTokens.Remove(refreshToken);

            var newRefreshToken = new RefreshToken {
                Token = _jwtManager.GenerateRefreshToken(),
                ApplicationUser = user,
            };
            _context.RefreshTokens.Add(newRefreshToken);

            var success = await _context.SaveChangesAsync() > 0;
            if (!success) throw new Exception("Unable to save new refresh token.");

            // Set the refresh token cookie.
            _httpContextManager.SetHttpCookieRefreshToken(newRefreshToken);

            return CreateUserAndTokenDto(user);
        }

        private Result<UserAndTokenDto> CreateUserAndTokenDto(ApplicationUser user) {
            var accessToken = _jwtManager.GenerateJWT(user);

            var userDto = new UserDto {
                Name = user.Name,
                Email = user.Email
            };

            var userAndTokenDto = new UserAndTokenDto {
                User = userDto,
                AccessToken = accessToken,
                ExpiresAt = _jwtManager.GetJWTExpirationDate(accessToken),
            };

            return Result<UserAndTokenDto>.Success(userAndTokenDto);
        }
    }
}
