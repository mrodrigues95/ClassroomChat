using Application.Common.Dtos;
using MediatR;

namespace Application.Auth.Commands.RegisterNewUser {
    public class RegisterNewUserCommand : IRequest<UserAndTokenDto> {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
