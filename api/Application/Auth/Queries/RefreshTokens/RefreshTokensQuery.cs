using Application.Common.Dtos;
using MediatR;

namespace Application.Auth.Queries.RefreshTokens {
    public class RefreshTokensQuery : IRequest<UserAndTokenDto> { }
}
