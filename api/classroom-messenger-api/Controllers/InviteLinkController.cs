using Application.Invites.Commands;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class InviteLinkController : BaseApiController {
        // POST api/invitelink
        [HttpPost]
        public async Task<IActionResult> Create(CreateInviteCommand command) {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
