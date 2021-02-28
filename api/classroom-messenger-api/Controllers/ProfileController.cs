using Application.Profile.Commands.UpdateProfilePhoto;
using Application.Profile.Queries.GetProfilePhoto;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    public class ProfileController : BaseApiController {
        // GET api/profile
        [HttpGet]
        public async Task<IActionResult> Get() {
            return HandleResult(await Mediator.Send(new GetProfileDetailQuery()));
        }

        // PUT api/profile/photo
        [HttpPut("photo")]
        public async Task<IActionResult> UpdatePhoto([FromForm] UpdateProfilePhotoCommand command) {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
