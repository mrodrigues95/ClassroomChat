using Application.Invites;
using Application.Invites.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class InviteLinkController : ControllerBase {
        private readonly IMediator _mediator;

        public InviteLinkController(IMediator mediator) {
            _mediator = mediator;
        }

        // POST api/invitelink
        [HttpPost]
        public async Task<ActionResult<InviteLinkDto>> Create(CreateInviteCommand command) {
            return Ok(await _mediator.Send(command));
        }
    }
}
