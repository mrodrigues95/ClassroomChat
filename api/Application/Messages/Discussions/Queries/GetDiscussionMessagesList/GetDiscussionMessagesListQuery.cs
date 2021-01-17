using Application.Common.Dtos;
using MediatR;
using System;

namespace Application.Messages.Discussions.Queries.GetDiscussionMesagesList {
    public class GetDiscussionMessagesListQuery : IRequest<DiscussionMessagesListDto> {
        public Guid DiscussionId { get; set; }
    }
}
