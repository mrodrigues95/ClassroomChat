using Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security {
    public class HttpContextManager : IHttpContextManager {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HttpContextManager(IHttpContextAccessor httpContextAccessor) {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetJWT() {
            string jwt = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(jwt) || !jwt.StartsWith("Bearer")) return null;

            // Extract the token.
            jwt = jwt.Substring("Bearer ".Length).Trim();

            // It is possible for the client to pass in 'undefined' so we need to check for this as well.
            if (jwt.Equals("undefined")) return null;

            return jwt;
        }

        public string GetHttpCookieRefreshToken() {
            if (!_httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("refresh_token", out var refreshToken)) {
                return null;
            }
            return refreshToken;
        }

        public void SetHttpCookieRefreshToken(string refreshToken) {
            _httpContextAccessor.HttpContext.Response.Cookies.Append("refresh_token", refreshToken,
                new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
        }
    }
}
