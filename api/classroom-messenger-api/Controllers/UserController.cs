using Application.User;
using Application.User.Commands.SignupNewUser;
using Application.User.Queries.GetCurrentUserDetail;
using Application.User.Queries.LoginUser;
using Application.User.Queries.RefreshUser;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator) {
            _mediator = mediator;
        }

        // GET api/user
        [HttpGet]
        public async Task<ActionResult<UserDto>> Get() {
            return Ok(await _mediator.Send(new GetCurrentUserDetailQuery()));
        }

        // POST api/user/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] LoginUserQuery query) {
            return Ok(await _mediator.Send(query));
        }

        // POST api/user/signup
        [AllowAnonymous]
        [HttpPost("signup")]
        public async Task<ActionResult<UserDto>> Signup([FromBody] SignupNewUserCommand command) {
            return Ok(await _mediator.Send(command));
        }

        // POST api/user/refresh
        [HttpPost("refresh")]
        public async Task<ActionResult<UserDto>> Refresh([FromBody] RefreshUserCommand query) {
            return Ok(await _mediator.Send(query));
        }
    }
}
