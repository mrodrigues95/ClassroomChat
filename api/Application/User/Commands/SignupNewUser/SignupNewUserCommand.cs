using MediatR;

namespace Application.User.Commands.SignupNewUser {
    public class SignupNewUserCommand : IRequest<UserDto> {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
