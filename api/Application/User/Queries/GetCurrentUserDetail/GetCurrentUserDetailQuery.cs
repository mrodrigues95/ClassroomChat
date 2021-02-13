using Application.Common;
using MediatR;

namespace Application.User.Queries.GetCurrentUserDetail {
    public class GetCurrentUserDetailQuery : IRequest<Result<UserDto>> { }
}
