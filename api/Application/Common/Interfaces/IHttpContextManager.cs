using Domain.Entities;

namespace Application.Common.Interfaces {
    /// <summary>
    /// Provides a set of helper methods for handling HTTP context.
    /// </summary>
    public interface IHttpContextManager {
        /// <summary>
        /// Gets the JWT access token string from the HTTP context authorization header.
        /// </summary>
        string GetJWT();
        /// <summary>
        /// Gets the refresh token from the HTTP context request cookies. Returns null if no cookie is found.
        /// </summary>
        string GetHttpCookieRefreshToken();
        /// <summary>
        /// Appends the refresh token to the HTTP context response cookies.
        /// </summary>
        void SetHttpCookieRefreshToken(RefreshToken refreshToken);
        /// <summary>
        /// Deletes the refresh token from the current HTTP context response cookies.
        /// </summary>
        void DeleteHttpCookieRefreshToken();
    }
}
