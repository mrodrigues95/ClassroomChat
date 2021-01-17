using Application.Common.Dtos;
using MediatR;
using System;

namespace Application.Messages.Discussions.Commands {
    public class CreateDiscussionMessageCommand : IRequest<DiscussionMessageDto> {
        public Guid DiscussionId { get; set; }
        public string Body { get; set; }
    }
}
