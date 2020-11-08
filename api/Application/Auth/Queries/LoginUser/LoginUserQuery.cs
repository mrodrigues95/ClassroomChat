using Application.Common.Dtos;
using MediatR;

namespace Application.Auth.Queries.LoginUser {
    public class LoginUserQuery : IRequest<UserAndTokenDto> {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
