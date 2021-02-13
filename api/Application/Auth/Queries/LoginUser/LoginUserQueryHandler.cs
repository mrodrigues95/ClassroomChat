using Application.Auth.Queries.LoginUser;
using Application.Common;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using Application.User;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Auth {
    /// <summary>
    /// Login a user into the application.
    /// </summary>
    public class LoginUserQueryHandler : IRequestHandler<LoginUserQuery, Result<UserAndTokenDto>> {
        private readonly ApplicationContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IJwtManager _jwtManager;
        private readonly IHttpContextManager _httpContextManager;

        public LoginUserQueryHandler(ApplicationContext context, UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager, IJwtManager jwtManager, IHttpContextManager httpContextManager) {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtManager = jwtManager;
            _httpContextManager = httpContextManager;
        }

        public async Task<Result<UserAndTokenDto>> Handle(LoginUserQuery request, CancellationToken cancellationToken) {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user is null) return Result<UserAndTokenDto>.Failure("Unable to find user.", true);

            var loginUser = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
            if (!loginUser.Succeeded) return Result<UserAndTokenDto>.Failure("Failed to login user.", true);

            var refreshToken = await CreateAndSaveRefreshToken(user);

            return FinishLogin(user, refreshToken);
        }

        private async Task<RefreshToken> CreateAndSaveRefreshToken(ApplicationUser user) {
            var refreshToken = new RefreshToken {
                Token = _jwtManager.GenerateRefreshToken(),
                ApplicationUser = user
            };
            _context.RefreshTokens.Add(refreshToken);

            var success = await _context.SaveChangesAsync() > 0;
            if (!success) throw new Exception("Unable to save new refresh token.");

            return refreshToken;
        }

        private Result<UserAndTokenDto> FinishLogin(ApplicationUser user, RefreshToken refreshToken) {
            _httpContextManager.SetHttpCookieRefreshToken(refreshToken);
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
