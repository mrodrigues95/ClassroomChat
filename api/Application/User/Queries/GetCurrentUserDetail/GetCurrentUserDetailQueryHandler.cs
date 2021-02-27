using Application.Common;
using Application.Common.Interfaces;
using Application.User.Queries.GetCurrentUserDetail;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User {
    /// <summary>
    /// Gets the credentials of the current user that is authenticated.
    /// </summary>
    public class GetCurrentUserDetailQueryHandler : IRequestHandler<GetCurrentUserDetailQuery, Result<UserDto>> {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserAccessor _userAccessor;

        public GetCurrentUserDetailQueryHandler(UserManager<ApplicationUser> userManager, IUserAccessor userAccessor) {
            _userManager = userManager;
            _userAccessor = userAccessor;
        }

        public async Task<Result<UserDto>> Handle(GetCurrentUserDetailQuery request, CancellationToken cancellationToken) {
            var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

            var userDto = new UserDto {
                Name = user.Name,
                Email = user.Email,
            };

            return Result<UserDto>.Success(userDto);
        }
    }
}
