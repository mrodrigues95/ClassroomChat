using Application.Common.Dtos;
using Application.Discussions.Commands;
using Application.Discussions.Queries.GetDiscussionDetail;
using Application.Discussions.Queries.GetDiscussionMessagesList;
using classroom_messenger_api.SignalR;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class DiscussionController : ControllerBase {
        private readonly IMediator _mediator;
        private readonly IHubContext<DiscussionHub> _hub;

        public DiscussionController(IMediator mediator, IHubContext<DiscussionHub> hub) {
            _mediator = mediator;
            _hub = hub;
        }

        // GET api/discussion/{id}
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<DiscussionDto>> Get([FromRoute] Guid id) {
            return Ok(await _mediator.Send(new GetDiscussionDetailQuery { Id = id }));
        }

        // POST api/discussion
        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] CreateDiscussionCommand command) {
            await _mediator.Send(command);
            return NoContent();
        }

        // GET api/discussion/{id}/message/list
        [HttpGet("{id}/message/list")]
        public async Task<ActionResult<DiscussionMessagesListDto>> GetAllDiscussionMessages([FromRoute] Guid id) {
            return Ok(await _mediator.Send(new GetDiscussionMessagesListQuery { DiscussionId = id }));
        }
    }
}
