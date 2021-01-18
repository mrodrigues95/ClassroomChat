using Application.Common.Dtos;
using MediatR;
using System;

namespace Application.Discussions.Commands.CreateDiscussionMessage {
    public class CreateDiscussionMessageCommand : IRequest<DiscussionMessageDto> {
        public Guid DiscussionId { get; set; }
        public string Body { get; set; }
    }
}
