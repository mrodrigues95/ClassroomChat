using Application.Auth.Commands.RegisterNewUser;
using Application.Auth.Queries.LoginUser;
using Application.Auth.Queries.RefreshTokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    public class AuthController : BaseApiController {
        /// <summary>
        /// POST api/auth/login
        /// </summary>
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserQuery query) {
            return HandleResult(await Mediator.Send(query));
        }

        /// <summary>
        /// POST api/auth/register
        /// </summary>
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterNewUserCommand command) {
            return HandleResult(await Mediator.Send(command));
        }

        /// <summary>
        /// GET api/auth/refresh
        /// </summary>
        [AllowAnonymous]
        [HttpGet("refresh")]
        public async Task<IActionResult> RefreshTokens() {
            return HandleResult(await Mediator.Send(new RefreshTokensQuery()));
        }
    }
}
