using Application.Photos.Commands.DeletePhoto;
using Application.Photos.Commands.UploadUserAvatar;
using Application.Photos.Queries.GetUserAvatar;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    public class PhotoController : BaseApiController {
        // GET api/photo/avatar
        [HttpGet("avatar")]
        public async Task<IActionResult> GetUserAvatar() {
            return HandleResult(await Mediator.Send(new GetUserAvatarQuery()));
        }

        // POST api/photo/avatar
        [HttpPost("avatar")]
        public async Task<IActionResult> UploadUserAvatar([FromForm] UploadUserAvatarCommand command) {
            return HandleResult(await Mediator.Send(command));
        }

        // DELETE api/photo/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id) {
            return HandleResult(await Mediator.Send(new DeletePhotoCommand { Id = id }));
        }
    }
}
