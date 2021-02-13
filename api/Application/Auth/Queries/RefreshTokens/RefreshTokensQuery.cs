using Application.Common;
using Application.Common.Dtos;
using MediatR;

namespace Application.Auth.Queries.RefreshTokens {
    public class RefreshTokensQuery : IRequest<Result<UserAndTokenDto>> { }
}
