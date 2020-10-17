using MediatR;
using System;

namespace Application.Classrooms.Commands.CreateClassroom {
    public class CreateClassroomCommand : IRequest {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
