using Application.Common;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Auth.Queries.LogoutUser {
    public class LogoutUserQueryHandler : IRequestHandler<LogoutUserQuery, Result<Unit>> {
        private readonly IHttpContextManager _httpContextManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public LogoutUserQueryHandler(IHttpContextManager httpContextManager, SignInManager<ApplicationUser> signInManager) {
            _httpContextManager = httpContextManager;
            _signInManager = signInManager;
        }

        public async Task<Result<Unit>> Handle(LogoutUserQuery request, CancellationToken cancellationToken) {
            _httpContextManager.DeleteHttpCookieRefreshToken();
            await _signInManager.SignOutAsync();
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
