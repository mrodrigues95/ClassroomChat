using MediatR;

namespace Application.User.Queries.RefreshUser {
    public class RefreshUserCommand : IRequest<UserDto> {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
