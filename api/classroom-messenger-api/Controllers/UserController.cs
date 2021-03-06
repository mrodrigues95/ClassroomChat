using Application.User.Commands.UpdateUserPhoto;
using Application.User.Queries.GetUserDetail;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    public class UserController : BaseApiController {
        /// <summary>
        /// GET api/user
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Get() {
            return HandleResult(await Mediator.Send(new GetUserDetailQuery()));
        }

        /// <summary>
        /// PUT api/user/photo/update
        /// </summary>
        [HttpPut("photo/update")]
        public async Task<IActionResult> UpdatePhoto([FromForm] UpdateUserPhotoCommand command, [FromQuery] bool random = false) {
            if (random) command = new UpdateUserPhotoCommand { IsRandom = true }; 
            return HandleResult(await Mediator.Send(command));
        }
    }
}
