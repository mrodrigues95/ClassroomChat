using Application.Common;
using Application.Common.Dtos;
using Application.Discussions.Queries.GetDiscussionDetail;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Classrooms.Discussions {
    /// <summary>
    /// Get the details of a given discussion.
    /// </summary>
    public class GetDiscussionDetailQueryHandler : IRequestHandler<GetDiscussionDetailQuery, Result<DiscussionDto>> {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public GetDiscussionDetailQueryHandler(ApplicationContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<DiscussionDto>> Handle(GetDiscussionDetailQuery request, CancellationToken cancellationToken) {
            var discussion = await _context.Discussions.FindAsync(request.Id);
            if (discussion is null) return Result<DiscussionDto>.Failure("Unable to find discussion.");
            return Result<DiscussionDto>.Success(_mapper.Map<Discussion, DiscussionDto>(discussion));
        }
    }
}
