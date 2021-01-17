using Application.Common.Dtos;
using Application.Messages.Discussions.Commands;
using Application.Messages.Discussions.Queries.GetDiscussionMesagesList;
using classroom_messenger_api.SignalR;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase {
        private readonly IMediator _mediator;
        private readonly IHubContext<DiscussionHub> _hub;

        public MessageController(IMediator mediator, IHubContext<DiscussionHub> hub) {
            _mediator = mediator;
            _hub = hub;
        }

        // GET api/message/list/discussion/{id}
        [HttpGet("list/discussion/{id}")]
        public async Task<ActionResult<DiscussionMessagesListDto>> GetAllDiscussionMessages([FromRoute] Guid id) {
            return Ok(await _mediator.Send(new GetDiscussionMessagesListQuery { DiscussionId = id }));
        }

        // POST api/message
        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] CreateDiscussionMessageCommand command) {
            var message = await _mediator.Send(command);
            await _hub.Clients.Group(command.DiscussionId.ToString()).SendAsync("NewMessage", message);
            return NoContent();
        }
    }
}
