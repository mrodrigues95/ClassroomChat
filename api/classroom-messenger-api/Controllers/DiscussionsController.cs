using Application.Discussions.Commands;
using Application.Discussions.Queries.GetDiscussionDetail;
using Application.Discussions.Queries.GetDiscussionMessagesList;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    public class DiscussionsController : BaseApiController {
        /// <summary>
        /// GET api/discussions/{id}
        /// </summary>
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] Guid id) {
            return HandleResult(await Mediator.Send(new GetDiscussionDetailQuery { Id = id }));
        }

        /// <summary>
        /// POST api/discussions
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDiscussionCommand command) {
            return HandleResult(await Mediator.Send(command));
        }

        /// <summary>
        /// GET api/discussions/{id}/messages
        /// </summary>
        [HttpGet("{id}/messages")]
        public async Task<IActionResult> GetAllMessages([FromRoute] Guid id) {
            return HandleResult(await Mediator.Send(new GetDiscussionMessagesListQuery { DiscussionId = id }));
        }
    }
}
