using Application.Common;
using MediatR;
using System;

namespace Application.Discussions.Commands {
    public class CreateDiscussionCommand : IRequest<Result<Unit>> {
        public Guid Id { get; set; }
        public Guid ClassroomId { get; set; }
        public string Name { get; set; }
    }
}
