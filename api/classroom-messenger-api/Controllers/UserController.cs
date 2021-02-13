using Application.User.Queries.GetCurrentUserDetail;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseApiController {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator) {
            _mediator = mediator;
        }

        // GET api/user
        [HttpGet]
        public async Task<IActionResult> Get() {
            return HandleResult(await _mediator.Send(new GetCurrentUserDetailQuery()));
        }
    }
}
