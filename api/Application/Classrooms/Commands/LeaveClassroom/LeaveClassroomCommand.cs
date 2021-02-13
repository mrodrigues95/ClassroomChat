using Application.Common;
using MediatR;
using System;

namespace Application.Classrooms.Commands.LeaveClassroom {
    public class LeaveClassroomCommand : IRequest<Result<Unit>> {
        public Guid Id { get; set; }
    }
}
