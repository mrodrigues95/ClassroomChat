using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Security.Claims;

namespace Infrastructure.Security {
    /// <summary>
    /// Retrieve the current sessions username out of the JSON Web Token.
    /// </summary>
    public class UserAccessor : IUserAccessor {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor) {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetCurrentUsername() {
            var username = _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x =>
                x.Type == ClaimTypes.NameIdentifier)?.Value;
            return username;
        }
    }
}
