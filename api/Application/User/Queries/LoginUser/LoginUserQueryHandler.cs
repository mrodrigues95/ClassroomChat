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

            // User was not found.
            if (user == null)
                throw new RestException(HttpStatusCode.Unauthorized);

            // Update the refresh token in the database.
            user.RefreshToken = _jwtGenerator.GenerateRefreshToken();
            var updateRefreshTokenSuccess = await _context.SaveChangesAsync() > 0;
            if (!updateRefreshTokenSuccess) throw new Exception("There was a problem logging in the user.");

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            // Check if the sign in was successful or not.
            if (result.Succeeded) {
                return new UserDto {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Token = _jwtGenerator.GenerateAccessToken(user),
                    RefreshToken = user.RefreshToken
                };
            }

            // Sign in failed.
            throw new RestException(HttpStatusCode.Unauthorized);
        }
    }
}
