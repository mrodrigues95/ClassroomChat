using Application.Common;
using Application.Common.Dtos;
using Application.Common.Paging;
using MediatR;
using System;

namespace Application.Discussions.Queries.GetDiscussionMessagesList {
    public class GetDiscussionMessagesListQuery : IRequest<Result<PagedList<DiscussionMessageDto>>> {
        public Guid DiscussionId { get; set; }
        public PagingParams Params { get; set; }
    }
}
