using Application.Common;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Discussions.Queries.GetDiscussionMessagesList {
    public class GetDiscussionMessagesListQueryHandler : IRequestHandler<GetDiscussionMessagesListQuery, Result<PagedList<DiscussionMessageDto>>> {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public GetDiscussionMessagesListQueryHandler(ApplicationContext context, IMapper mapper, IUserAccessor userAccessor) {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result<PagedList<DiscussionMessageDto>>> Handle(GetDiscussionMessagesListQuery request, CancellationToken cancellationToken) {
            var user = await _context.Users.Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
            if (user is null) return Result<PagedList<DiscussionMessageDto>>.Failure("Unable to find user.", true);

            IQueryable<DiscussionMessageDto> query;
            if (request.Params.Cursor is null) {
                query = _context.Messages
                    .Where(x => x.Discussion.Id == request.DiscussionId)
                    .OrderByDescending(d => d.SequentialId)
                    .ProjectTo<DiscussionMessageDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();
            } else {
                query = _context.Messages
                    .Where(x => x.Discussion.Id == request.DiscussionId &&
                        x.SequentialId <= Convert.ToInt32(request.Params.Cursor))
                    .OrderByDescending(d => d.SequentialId)
                    .ProjectTo<DiscussionMessageDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();
            }

            var messages = await PagedList<DiscussionMessageDto>.CreateCursorAsync(query, request.Params.Cursor, request.Params.Size, "Cursor");
            return Result<PagedList<DiscussionMessageDto>>.Success(messages);
        }
    }
}
