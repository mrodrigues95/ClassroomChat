using MediatR;
using System;

namespace Application.Classrooms.Commands.LeaveClassroom {
    public class LeaveClassroomCommand : IRequest {
        public Guid Id { get; set; }
    }
}
