using Application.Profiles.Queries.GetProfileDetail;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    public class ProfileController : BaseApiController {
        // GET api/profile/username
        [HttpGet("{username}")]
        public async Task<IActionResult> Get([FromRoute] string username) {
            return HandleResult(await Mediator.Send(new GetProfileDetailQuery { Username = username }));
        }
    }
}
