using MediatR;

namespace Application.User.Queries.LoginUser {
    public class LoginUserQuery : IRequest<UserDto> {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
