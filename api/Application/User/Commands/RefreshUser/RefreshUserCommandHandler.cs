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

            if (user == null) throw new RestException(HttpStatusCode.Unauthorized);

            return await ProcessRefreshToken(request, user);
        }

        private async Task<UserDto> ProcessRefreshToken(RefreshUserCommand request, AppUser user) {
            // Get the token that's stored in the database.
            var storedRefreshToken = await _context.RefreshTokens.SingleOrDefaultAsync(x =>
                x.Token == request.RefreshToken);

            // Check if the refresh token matches the one stored against the user.
            if (storedRefreshToken?.Token != request.RefreshToken
                    || storedRefreshToken?.ExpiryDate < DateTime.Now)
                throw new RestException(HttpStatusCode.Unauthorized);

            // Delete the previous refresh token.
            _context.RefreshTokens.Remove(storedRefreshToken);

            // Generate new tokens.
            var newRefreshToken = new RefreshToken {
                Token = _jwtGenerator.GenerateRefreshToken(),
                ExpiryDate = DateTime.UtcNow.AddDays(2)
            };
            _context.RefreshTokens.Add(newRefreshToken);
            var userRefreshToken = new UserRefreshToken {
                AppUser = user,
                RefreshToken = newRefreshToken
            };
            _context.UserRefreshTokens.Add(userRefreshToken);

            // Save changes to the database.
            var success = await _context.SaveChangesAsync() > 0;

            if (!success) throw new Exception("There was a problem refreshing the user.");

            return new UserDto {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                AccessToken = _jwtGenerator.GenerateAccessToken(user),
                RefreshToken = newRefreshToken.Token
            };
        }
    }
}
