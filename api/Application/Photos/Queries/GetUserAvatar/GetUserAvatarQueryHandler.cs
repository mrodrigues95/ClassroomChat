using Application.Common;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Photos.Queries.GetUserAvatar {
    public class GetUserAvatarQueryHandler : IRequestHandler<GetUserAvatarQuery, Result<UserAvatarDto>> {
        private readonly ApplicationContext _context;
        private readonly IUserAccessor _userAccessor;

        public GetUserAvatarQueryHandler(ApplicationContext context, IUserAccessor userAccessor) {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<UserAvatarDto>> Handle(GetUserAvatarQuery request, CancellationToken cancellationToken) {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
            if (user is null) return Result<UserAvatarDto>.Failure("Unable to find user", true);

            var imageUrl = user.Photos.FirstOrDefault(p => p.IsCurrent).Url;
            if (imageUrl is null) return Result<UserAvatarDto>.Failure("Unable to find user photo");

            var userAvatarDto = new UserAvatarDto {
                Url = imageUrl
            };

            return Result<UserAvatarDto>.Success(userAvatarDto);
        }
    }
}
