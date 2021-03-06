using Application.Common;
using MediatR;

namespace Application.Auth.Queries.LogoutUser {
    public class LogoutUserQuery : IRequest<Result<Unit>> { }
}
