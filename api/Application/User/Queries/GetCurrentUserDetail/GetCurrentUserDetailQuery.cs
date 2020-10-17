using MediatR;

namespace Application.User.Queries.GetCurrentUserDetail {
    public class GetCurrentUserDetailQuery : IRequest<UserDto> { }
}
