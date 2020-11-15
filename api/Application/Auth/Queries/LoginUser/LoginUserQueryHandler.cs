using Application.Auth.Queries.LoginUser;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using Application.Errors;
using Application.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Auth {
    /// <summary>
    /// Login a user into the application.
    /// </summary>
    public class LoginUserQueryHandler : IRequestHandler<LoginUserQuery, UserAndTokenDto> {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtManager _jwtManager;
        private readonly IHttpContextManager _httpContextManager;

        public LoginUserQueryHandler(DataContext context, UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager, IJwtManager jwtManager, IHttpContextManager httpContextManager) {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtManager = jwtManager;
            _httpContextManager = httpContextManager;
        }

        public async Task<UserAndTokenDto> Handle(LoginUserQuery request, CancellationToken cancellationToken) {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null) throw new RestException(HttpStatusCode.Unauthorized);

            var loginUser = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
            if (!loginUser.Succeeded) throw new RestException(HttpStatusCode.Unauthorized);

            var refreshToken = await CreateAndSaveRefreshToken(user);

            return FinishLogin(user, refreshToken);
        }

        private async Task<RefreshToken> CreateAndSaveRefreshToken(AppUser user) {
            var refreshToken = new RefreshToken {
                Token = _jwtManager.GenerateRefreshToken(),
                ExpiresAt = DateTime.UtcNow.AddDays(2)
            };
            _context.RefreshTokens.Add(refreshToken);
            var uRefreshToken = new UserRefreshToken {
                AppUser = user,
                RefreshToken = refreshToken
            };
            _context.UserRefreshTokens.Add(uRefreshToken);

            var success = await _context.SaveChangesAsync() > 0;
            if (!success) throw new Exception("Unable to save new refresh token.");

            return refreshToken;
        }

        private UserAndTokenDto FinishLogin(AppUser user, RefreshToken refreshToken) {
            _httpContextManager.SetHttpCookieRefreshToken(refreshToken.Token);
            var accessToken = _jwtManager.GenerateJWT(user);

            var userDto = new UserDto {
                Name = user.Name,
                Email = user.Email
            };

            return new UserAndTokenDto {
                User = userDto,
                AccessToken = accessToken,
                ExpiresAt = _jwtManager.GetJWTExpirationDate(accessToken),
            };
        }
    }
}
