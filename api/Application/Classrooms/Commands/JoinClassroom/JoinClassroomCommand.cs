using Application.Common;
using MediatR;

namespace Application.Classrooms.Commands.JoinClassroom {
    public class JoinClassroomCommand : IRequest<Result<Unit>> {
        public string Token { get; set; }
    }
}
