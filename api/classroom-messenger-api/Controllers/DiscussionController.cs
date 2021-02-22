using Application.Discussions.Commands;
using Application.Discussions.Queries.GetDiscussionDetail;
using Application.Discussions.Queries.GetDiscussionMessagesList;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    public class DiscussionController : BaseApiController {
        // GET api/discussion/{id}
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] Guid id) {
            return HandleResult(await Mediator.Send(new GetDiscussionDetailQuery { Id = id }));
        }

        // POST api/discussion
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDiscussionCommand command) {
            return HandleResult(await Mediator.Send(command));
        }

        // GET api/discussion/{id}/message/list
        [HttpGet("{id}/message/list")]
        public async Task<IActionResult> GetAllDiscussionMessages([FromRoute] Guid id) {
            return HandleResult(await Mediator.Send(new GetDiscussionMessagesListQuery { DiscussionId = id }));
        }
    }
}
