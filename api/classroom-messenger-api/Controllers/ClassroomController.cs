using Application.Classrooms.Commands.CreateClassroom;
using Application.Classrooms.Commands.JoinClassroom;
using Application.Classrooms.Commands.LeaveClassroom;
using Application.Classrooms.Queries.GetClassroomDetail;
using Application.Classrooms.Queries.GetClassroomsList;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    public class ClassroomController : BaseApiController {
        // GET api/classroom/list
        [HttpGet("list")]
        public async Task<IActionResult> GetAll() {
            return HandleResult(await Mediator.Send(new GetClassroomsListQuery()));
        }

        // GET api/classroom/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] Guid id) {
            return HandleResult(await Mediator.Send(new GetClassroomDetailQuery { Id = id }));
        }

        // POST api/classroom
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateClassroomCommand command) {
            return HandleResult(await Mediator.Send(command));
        }

        // POST api/classroom/{token}/join
        [HttpPost("{token}/join")]
        public async Task<IActionResult> Join(string token) {
            return HandleResult(await Mediator.Send(new JoinClassroomCommand { Token = token }));
        }

        // POST api/classroom/{token}/leave
        [HttpDelete("{id}/leave")]
        public async Task<IActionResult> Leave(Guid id) {
            return HandleResult(await Mediator.Send(new LeaveClassroomCommand { Id = id }));
        }
    }
}
