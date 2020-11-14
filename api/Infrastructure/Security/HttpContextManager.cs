using Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using System;

namespace Infrastructure.Security {
    public class HttpContextManager : IHttpContextManager {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HttpContextManager(IHttpContextAccessor httpContextAccessor) {
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Gets the JWT access token string from the HTTP context authorization header.
        /// </summary>
        public string GetJWT() {
            string jwt = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(jwt) || !jwt.StartsWith("Bearer")) return null;

            // Extract the token.
            jwt = jwt.Substring("Bearer ".Length).Trim();

            // It is possible for the client to pass in 'undefined' so we need to check for this as well.
            if (jwt.Equals("undefined")) return null;

            return jwt;
        }

        /// <summary>
        /// Gets the refresh token from the HTTP context request cookies. Returns null if no cookie is found.
        /// </summary>
        public string GetHttpCookieRefreshToken() {
            if (!_httpContextAccessor.HttpContext.Request.Cookies.TryGetValue("refresh_token", out var refreshToken)) {
                return null;
            }
            return refreshToken;
        }

        /// <summary>
        /// Appends the refresh token to the HTTP context response cookies.
        /// </summary>
        public void SetHttpCookieRefreshToken(string refreshToken) {
            _httpContextAccessor.HttpContext.Response.Cookies.Append("refresh_token", refreshToken,
                new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });
        }
    }
}
