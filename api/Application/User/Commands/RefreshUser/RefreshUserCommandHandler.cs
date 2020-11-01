using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Queries.RefreshUser {
    /// <summary>
    /// Generates a new access and refresh token.
    /// </summary>
    public class RefreshUserCommandHandler : IRequestHandler<RefreshUserCommand, UserDto> {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtGenerator _jwtGenerator;

        public RefreshUserCommandHandler(DataContext context, UserManager<AppUser> userManager,
            IJwtGenerator jwtGenerator) {
            _context = context;
            _userManager = userManager;
            _jwtGenerator = jwtGenerator;
        }

        public async Task<UserDto> Handle(RefreshUserCommand request, CancellationToken cancellation) {
            var principal = _jwtGenerator.GetPrincipalFromExpiredAccessToken(request.AccessToken);
            var user = await _userManager.FindByNameAsync(principal.Identity.Name);

            // Check if the refresh token matches the one stored against the user.
            if (user == null || user.RefreshToken != request.RefreshToken)
                throw new RestException(HttpStatusCode.Unauthorized);

            // Delete the previous refresh token.
            var refreshToken = await _context.RefreshTokens
                .SingleOrDefaultAsync(x => x.Token == request.RefreshToken);
            _context.RefreshTokens.Remove(refreshToken);

            // Generate new tokens.
            var newAccessToken = _jwtGenerator.GenerateAccessToken(user);
            var newRefreshToken = new RefreshToken {
                Token = _jwtGenerator.GenerateRefreshToken(),
                ExpiryDate = DateTime.UtcNow.AddDays(2)
            };
            _context.RefreshTokens.Add(refreshToken);
            
            // Save changes to the database.
            var success = await _context.SaveChangesAsync() > 0;

            // Return the updated user.
            if (success) {
                return new UserDto {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Token = newAccessToken,
                    RefreshToken = user.RefreshToken
                };
            }

            throw new Exception("There was a problem refreshing the user.");
        }
    }
}
