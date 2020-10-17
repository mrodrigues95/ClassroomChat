using Application.Classrooms.Discussions;
using MediatR;
using System;

namespace Application.Discussions.Queries.GetDiscussionDetail {
    public class GetDiscussionDetailQuery : IRequest<DiscussionDto> {
        public Guid Id { get; set; }
    }
}
