using MediatR;
using System;

namespace Application.Discussions.Commands {
    public class CreateDiscussionCommand : IRequest {
        public Guid Id { get; set; }
        public Guid ClassroomId { get; set; }
        public string Name { get; set; }
    }
}
