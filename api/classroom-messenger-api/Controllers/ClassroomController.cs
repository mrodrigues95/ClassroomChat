using Application.Classrooms;
using Application.Classrooms.Commands.CreateClassroom;
using Application.Classrooms.Commands.JoinClassroom;
using Application.Classrooms.Commands.LeaveClassroom;
using Application.Classrooms.Queries.GetClassroomDetail;
using Application.Classrooms.Queries.GetClassroomsList;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ClassroomController : ControllerBase {
        private readonly IMediator _mediator;

        public ClassroomController(IMediator mediator) {
            _mediator = mediator;
        }

        // GET api/classroom
        [HttpGet]
        public async Task<ActionResult<ClassroomsListDto>> GetAll() {
            return Ok(await _mediator.Send(new GetClassroomsListQuery()));
        }

        // GET api/classroom/{id}
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ClassroomDto>> Get(Guid id) {
            return Ok(await _mediator.Send(new GetClassroomDetailQuery { Id = id }));
        }

        // POST api/classroom
        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] CreateClassroomCommand command) {
            await _mediator.Send(command);
            return NoContent();
        }

        // POST api/classroom/{token}/join
        [HttpPost("{token}/join")]
        public async Task<ActionResult<Unit>> Join(string token) {
            await _mediator.Send(new JoinClassroomCommand { Token = token });
            return NoContent();
        }

        // POST api/classroom/{token}/leave
        [HttpDelete("{id}/leave")]
        public async Task<ActionResult<Unit>> Leave(Guid id) {
            await _mediator.Send(new LeaveClassroomCommand { Id = id });
            return NoContent();
        }
    }
}
