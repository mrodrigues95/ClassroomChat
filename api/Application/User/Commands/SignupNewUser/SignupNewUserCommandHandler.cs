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

            var user = new AppUser {
                FirstName = request.FirstName,
                LastName = request.LastName,
                UserName = request.Email,
                Email = request.Email,
            };

            // Create the user.
            var result = await _userManager.CreateAsync(user, request.Password);

            if (result.Succeeded) {
                return new UserDto {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Username = user.Email,
                    Email = user.Email,
                    Token = _jwtGenerator.CreateToken(user),
                };
            }

            throw new Exception("There was a problem creating the user");
        }
    }
}
