using Application.Invites.Commands;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    public class InviteLinkController : BaseApiController {
        /// <summary>
        /// POST api/invitelink
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create(CreateInviteCommand command) {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
