using Application.Auth.Commands.RegisterNewUser;
using Application.Common;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using Application.User;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Auth {
    /// <summary>
    /// Registers a new user with Identity.
    /// </summary>
    public class RegisterNewUserCommandHandler : IRequestHandler<RegisterNewUserCommand, Result<UserAndTokenDto>> {
        private readonly Persistence.ApplicationContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtManager _jwtManager;
        private readonly IHttpContextManager _httpContextManager;

        public RegisterNewUserCommandHandler(Persistence.ApplicationContext context, UserManager<ApplicationUser> userManager,
            IJwtManager jwtManager, IHttpContextManager httpContextManager) {
            _context = context;
            _userManager = userManager;
            _jwtManager = jwtManager;
            _httpContextManager = httpContextManager;
        }

        public async Task<Result<UserAndTokenDto>> Handle(RegisterNewUserCommand request, CancellationToken cancellationToken) {
            if (await _context.Users.AnyAsync(x => x.Email == request.Email)) {
                return Result<UserAndTokenDto>.Failure("Email already exists.");
            }

            var newUser = await CreateNewUser(request);
            if (newUser is null) return Result<UserAndTokenDto>.Failure("Unable to create new user.");

            var refreshToken = await CreateAndSaveRefreshToken(newUser);
            if (refreshToken is null) return Result<UserAndTokenDto>.Failure("Unable to save new refresh token.");

            return FinishRegister(newUser, refreshToken);
        }

        private async Task<ApplicationUser> CreateNewUser(RegisterNewUserCommand request) {
            var newUser = new ApplicationUser {
                Name = request.Name,
                UserName = request.Email,
                Email = request.Email
            };

            var createUser = await _userManager.CreateAsync(newUser, request.Password);
            if (!createUser.Succeeded) return null;

            return newUser;
        }

        private async Task<RefreshToken> CreateAndSaveRefreshToken(ApplicationUser user) {
            var refreshToken = new RefreshToken {
                Token = _jwtManager.GenerateRefreshToken(),
                ApplicationUser = user
            };
            _context.RefreshTokens.Add(refreshToken);

            var success = await _context.SaveChangesAsync() > 0;
            if (!success) return null;

            return refreshToken;
        }

        private Result<UserAndTokenDto> FinishRegister(ApplicationUser user, RefreshToken refreshToken) {
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
