using Application.Common;
using Application.Common.Dtos;
using MediatR;
using System;

namespace Application.Discussions.Queries.GetDiscussionMessagesList {
    public class GetDiscussionMessagesListQuery : IRequest<Result<DiscussionMessagesListDto>> {
        public Guid DiscussionId { get; set; }
    }
}
