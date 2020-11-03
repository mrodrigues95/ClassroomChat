using Application.Errors;
using Application.Interfaces;
using Application.User.Queries.LoginUser;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User {
    /// <summary>
    /// Login a user into the application.
    /// </summary>
    public class LoginUserQueryHandler : IRequestHandler<LoginUserQuery, UserDto> {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;

        public LoginUserQueryHandler(DataContext context, UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator) {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
        }

        public async Task<UserDto> Handle(LoginUserQuery request, CancellationToken cancellationToken) {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null) throw new RestException(HttpStatusCode.Unauthorized);

            // Create a new refresh token and user refresh token.
            var refreshToken = new RefreshToken {
                Token = _jwtGenerator.GenerateRefreshToken(),
                ExpiryDate = DateTime.UtcNow.AddDays(2)
            };
            _context.RefreshTokens.Add(refreshToken);
            var userRefreshToken = new UserRefreshToken {
                AppUser = user,
                RefreshToken = refreshToken
            };
            _context.UserRefreshTokens.Add(userRefreshToken);

            var createRefreshTokenSuccess = await _context.SaveChangesAsync() > 0;
            if (!createRefreshTokenSuccess) throw new Exception("There was a problem logging in the user.");

            var loginUser = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            // Check if the sign in was successful or not.
            if (loginUser.Succeeded) {
                return new UserDto {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    AccessToken = _jwtGenerator.GenerateAccessToken(user),
                    RefreshToken = refreshToken.Token
                };
            }

            // Sign in failed.
            throw new RestException(HttpStatusCode.Unauthorized);
        }
    }
}
