using Application.Common;
using Application.Common.Dtos;
using MediatR;

namespace Application.Photos.Queries.GetUserAvatar {
    public class GetUserAvatarQuery : IRequest<Result<UserAvatarDto>> { }
}
