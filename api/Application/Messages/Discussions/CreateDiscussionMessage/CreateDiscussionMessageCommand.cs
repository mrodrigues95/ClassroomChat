using MediatR;
using System;

namespace Application.Messages.Discussions.CreateDiscussionMessage {
    public class CreateDiscussionMessageCommand : IRequest<DiscussionMessageDto> {
        public Guid DiscussionId { get; set; }
        public string Body { get; set; }
        public string Username { get; set; }
    }
}
