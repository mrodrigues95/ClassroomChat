using MediatR;

namespace Application.Classrooms.Commands.JoinClassroom {
    public class JoinClassroomCommand : IRequest {
        public string Token { get; set; }
    }
}
