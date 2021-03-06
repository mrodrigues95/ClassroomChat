using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Auth.Queries.LogoutUser {
    public class LogoutUserQueryHandler : IRequestHandler<LogoutUserQuery, Result<Unit>> {
        private readonly IHttpContextManager _httpContextManager;

        public LogoutUserQueryHandler(IHttpContextManager httpContextManager) {
            _httpContextManager = httpContextManager;
        }

        public async Task<Result<Unit>> Handle(LogoutUserQuery request, CancellationToken cancellationToken) {
            _httpContextManager.DeleteHttpCookieRefreshToken();
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
