using Application.Interfaces;
using Application.User.Queries.GetCurrentUserDetail;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User {
    /// <summary>
    /// Gets the credentials of the current user that is logged in and authenticated.
    /// </summary>
    public class GetCurrentUserDetailQueryHandler : IRequestHandler<GetCurrentUserDetailQuery, UserDto> {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserAccessor _userAccessor;

        public GetCurrentUserDetailQueryHandler(UserManager<AppUser> userManager, IUserAccessor userAccessor) {
            _userManager = userManager;
            _userAccessor = userAccessor;
        }

        public async Task<UserDto> Handle(GetCurrentUserDetailQuery request, CancellationToken cancellationToken) {
            // Retrieve the users information.
            var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

            return new UserDto {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
            };
        }
    }
}
