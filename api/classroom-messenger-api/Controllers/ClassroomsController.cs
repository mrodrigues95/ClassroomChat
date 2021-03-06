using Application.Classrooms.Commands.CreateClassroom;
using Application.Classrooms.Commands.JoinClassroom;
using Application.Classrooms.Commands.LeaveClassroom;
using Application.Classrooms.Queries.GetClassroomDetail;
using Application.Classrooms.Queries.GetClassroomsList;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace classroom_messenger_api.Controllers {
    public class ClassroomsController : BaseApiController {
        /// <summary>
        /// GET api/classrooms
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll() {
            return HandleResult(await Mediator.Send(new GetClassroomsListQuery()));
        }

        /// <summary>
        /// GET api/classrooms/{id}
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] Guid id) {
            return HandleResult(await Mediator.Send(new GetClassroomDetailQuery { Id = id }));
        }

        /// <summary>
        /// POST api/classrooms
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateClassroomCommand command) {
            return HandleResult(await Mediator.Send(command));
        }

        /// <summary>
        /// POST api/classrooms/{token}/join
        /// </summary>
        [HttpPost("{token}/join")]
        public async Task<IActionResult> Join(string token) {
            return HandleResult(await Mediator.Send(new JoinClassroomCommand { Token = token }));
        }

        /// <summary>
        /// POST api/classrooms/{token}/leave
        /// </summary>
        [HttpDelete("{id}/leave")]
        public async Task<IActionResult> Leave(Guid id) {
            return HandleResult(await Mediator.Send(new LeaveClassroomCommand { Id = id }));
        }
    }
}
