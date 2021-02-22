using Application.User.Queries.GetCurrentUserDetail;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    public class UserController : BaseApiController {
        // GET api/user
        [HttpGet]
        public async Task<IActionResult> Get() {
            return HandleResult(await Mediator.Send(new GetCurrentUserDetailQuery()));
        }
    }
}
