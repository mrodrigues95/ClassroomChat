using Application.Common.Dtos;
using MediatR;
using System;

namespace Application.Discussions.Queries.GetDiscussionDetail {
    public class GetDiscussionDetailQuery : IRequest<DiscussionDto> {
        public Guid Id { get; set; }
    }
}
