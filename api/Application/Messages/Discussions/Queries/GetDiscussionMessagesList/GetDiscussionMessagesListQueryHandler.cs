using Application.Common.Dtos;
using Application.Common.Interfaces;
using Application.Errors;
using Application.Messages.Discussions.Queries.GetDiscussionMesagesList;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Messages.Discussions.Queries.GetDiscussionMessagesList {
    /// <summary>
    /// Gets a list of messages that belong to a specific discussion.
    /// </summary>
    public class GetDiscussionMessagesListQueryHandler : IRequestHandler<GetDiscussionMessagesListQuery, DiscussionMessagesListDto> {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserAccessor _userAccessor;

        public GetDiscussionMessagesListQueryHandler(ApplicationContext context, IMapper mapper,
            UserManager<ApplicationUser> userManager, IUserAccessor userAccessor) {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
            _userAccessor = userAccessor;
        }

        public async Task<DiscussionMessagesListDto> Handle(GetDiscussionMessagesListQuery request, CancellationToken cancellationToken) {
            var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());
            if (user == null) throw new RestException(HttpStatusCode.Unauthorized, new { User = "Not found." });

            var queryable = _context.Messages.AsQueryable();
            var discussionMessages = await queryable
                .Where(x => x.Discussion.Id == request.DiscussionId)
                .ToListAsync();

            return new DiscussionMessagesListDto {
                Discussion = _mapper.Map<Discussion, DiscussionDto>(discussionMessages.First().Discussion),
                Messages = _mapper.Map<List<Message>, List<DiscussionMessageDto>>(discussionMessages)
            };
        }
    }
}
