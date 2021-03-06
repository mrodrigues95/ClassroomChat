using Application.Common;
using Application.Common.Dtos;
using MediatR;

namespace Application.User.Queries.GetUserDetail {
    public class GetUserDetailQuery : IRequest<Result<UserDto>> { }
}
