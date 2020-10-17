using Application.Classrooms.Discussions;
using Application.Discussions.Commands;
using Application.Discussions.Queries.GetDiscussionDetail;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class DiscussionController : ControllerBase {
        private readonly IMediator _mediator;

        public DiscussionController(IMediator mediator) {
            _mediator = mediator;
        }

        // GET api/discussion/{id}
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<DiscussionDto>> Get(Guid id) {
            return Ok(await _mediator.Send(new GetDiscussionDetailQuery { Id = id }));
        }

        // POST api/discussion
        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] CreateDiscussionCommand command) {
            await _mediator.Send(command);
            return NoContent();
        }
    }
}
