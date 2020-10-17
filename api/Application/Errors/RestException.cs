using System;
using System.Net;

namespace Application.Errors {
    /// <summary>
    /// Handle common REST exceptions that may occur throughout the application.
    /// E.g. 400 errors.
    /// </summary>
    public class RestException : Exception {
        public RestException(HttpStatusCode code, object errors = null) {
            Code = code;
            Errors = errors;
        }

        public HttpStatusCode Code { get; }
        public object Errors { get; }
    }
}
