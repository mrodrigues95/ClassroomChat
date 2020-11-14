namespace Application.Common.Interfaces {
    public interface IHttpContextManager {
        string GetJWT();
        string GetHttpCookieRefreshToken();
        void SetHttpCookieRefreshToken(string refreshToken);
    }
}
