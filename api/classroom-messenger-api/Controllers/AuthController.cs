using Application.Auth.Commands.RegisterNewUser;
using Application.Auth.Queries.LoginUser;
using Application.Auth.Queries.RefreshTokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseApiController {
        // POST api/auth/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserQuery query) {
            return HandleResult(await Mediator.Send(query));
        }

        // POST api/auth/register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterNewUserCommand command) {
            return HandleResult(await Mediator.Send(command));
        }

        // GET api/auth/refresh
        [AllowAnonymous]
        [HttpGet("refresh")]
        public async Task<IActionResult> RefreshTokens() {
            return HandleResult(await Mediator.Send(new RefreshTokensQuery()));
        }
    }
}
