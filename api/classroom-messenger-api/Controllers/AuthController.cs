using Application.Auth.Commands.RegisterNewUser;
using Application.Auth.Queries.LoginUser;
using Application.Auth.Queries.RefreshTokens;
using Application.Common.Dtos;
using Application.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator) {
            _mediator = mediator;
        }

        // POST api/auth/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserAndTokenDto>> Login([FromBody] LoginUserQuery query) {
            return Ok(await _mediator.Send(query));
        }

        // POST api/auth/register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserAndTokenDto>> Register([FromBody] RegisterNewUserCommand command) {
            return Ok(await _mediator.Send(command));
        }

        // GET api/auth/refresh
        [AllowAnonymous]
        [HttpGet("refresh")]
        public async Task<ActionResult<UserAndTokenDto>> RefreshTokens([FromBody] RefreshTokensQuery query) {
            return Ok(await _mediator.Send(query));
        }
    }
}
