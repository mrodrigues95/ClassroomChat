using Application.Errors;
using Application.Interfaces;
using Application.User.Commands.SignupNewUser;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User {
    /// <summary>
    /// Registers a new user with the application.
    /// </summary>
    public class SignupNewUserCommandHandler : IRequestHandler<SignupNewUserCommand, UserDto> {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtGenerator _jwtGenerator;

        public SignupNewUserCommandHandler(DataContext context, UserManager<AppUser> userManager,
            IJwtGenerator jwtGenerator) {
            _context = context;
            _userManager = userManager;
            _jwtGenerator = jwtGenerator;
        }

        public async Task<UserDto> Handle(SignupNewUserCommand request, CancellationToken cancellationToken) {
            // Check for an existing email.
            if (await _context.Users.AnyAsync(x => x.Email == request.Email))
                throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });

            var user = await CreateNewUser(request);

            return new UserDto {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Token = _jwtGenerator.GenerateAccessToken(user),
                RefreshToken = user.RefreshToken
            };
        }

        private async Task<AppUser> CreateNewUser(SignupNewUserCommand request) {
            // Create a new refresh token.
            var refreshToken = new RefreshToken {
                Token = _jwtGenerator.GenerateRefreshToken(),
                ExpiryDate = DateTime.UtcNow.AddDays(2)
            };
            _context.RefreshTokens.Add(refreshToken);

            // Create the user.
            var user = new AppUser {
                FirstName = request.FirstName,
                LastName = request.LastName,
                UserName = request.Email,
                Email = request.Email,
                RefreshToken = refreshToken.Token
            };
            var createUser = await _userManager.CreateAsync(user, request.Password);
            if (!createUser.Succeeded) throw new Exception("There was a problem creating the user.");

            // Create a new user refresh token.
            var userRefreshToken = new UserRefreshToken {
                AppUser = user,
                RefreshToken = refreshToken
            };
            _context.UserRefreshTokens.Add(userRefreshToken);

            // Save changes to the database.
            var success = await _context.SaveChangesAsync() > 0;

            if (!success) throw new Exception("There was a problem saving changes.");

            return user;
        }
    }
}
