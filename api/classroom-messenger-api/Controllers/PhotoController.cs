using Application.Photos.Commands.DeletePhoto;
using Application.Photos.Commands.UploadProfilePhoto;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    public class PhotoController : BaseApiController {
        // POST api/photo/profile
        [HttpPost("profile")]
        public async Task<IActionResult> UploadProfilePhoto([FromForm] UploadProfilePhotoCommand command) {
            return HandleResult(await Mediator.Send(command));
        }

        // DELETE api/photo/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id) {
            return HandleResult(await Mediator.Send(new DeletePhotoCommand { Id = id }));
        }
    }
}
