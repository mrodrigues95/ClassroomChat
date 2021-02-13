using Application.Invites.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class InviteLinkController : BaseApiController {
        private readonly IMediator _mediator;

        public InviteLinkController(IMediator mediator) {
            _mediator = mediator;
        }

        // POST api/invitelink
        [HttpPost]
        public async Task<IActionResult> Create(CreateInviteCommand command) {
            return HandleResult(await _mediator.Send(command));
        }
    }
}
