using Application.Common;
using Application.Common.Dtos;
using Application.Common.Paging;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Discussions.Queries.GetDiscussionMessagesList {
    public class GetDiscussionMessagesListQueryHandler : IRequestHandler<GetDiscussionMessagesListQuery, Result<PagedList<DiscussionMessageDto>>> {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public GetDiscussionMessagesListQueryHandler(ApplicationContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<PagedList<DiscussionMessageDto>>> Handle(GetDiscussionMessagesListQuery request, CancellationToken cancellationToken) {
            IQueryable<DiscussionMessageDto> query;
            if (request.Params.Cursor is null) {
                query = _context.Messages
                    .Where(x => x.Discussion.Id == request.DiscussionId)
                    .OrderByDescending(d => d.CursorId)
                    .ProjectTo<DiscussionMessageDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();
            } else {
                query = _context.Messages
                    .Where(x => x.Discussion.Id == request.DiscussionId &&
                        x.CursorId <= Convert.ToInt32(request.Params.Cursor))
                    .OrderByDescending(d => d.CursorId)
                    .ProjectTo<DiscussionMessageDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();
            }

            var messages = await PagedList<DiscussionMessageDto>.CreateCursorAsync(query, request.Params.Cursor, request.Params.Size, "CursorId");
            return Result<PagedList<DiscussionMessageDto>>.Success(messages);
        }
    }
}
