using Application.Auth.Queries.LoginUser;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using Application.Errors;
using Application.User;
using Domain.Entities;
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

        public async Task<UserAndTokenDto> Handle(LoginUserQuery request, CancellationToken cancellationToken) {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null) throw new RestException(HttpStatusCode.Unauthorized);

            var loginUser = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
            if (!loginUser.Succeeded) throw new RestException(HttpStatusCode.Unauthorized);

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

        private UserAndTokenDto FinishLogin(ApplicationUser user, RefreshToken refreshToken) {
            _httpContextManager.SetHttpCookieRefreshToken(refreshToken);
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
