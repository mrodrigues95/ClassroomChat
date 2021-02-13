﻿using Application.Common;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Discussions.Queries.GetDiscussionMessagesList {
    /// <summary>
    /// Gets a list of messages that belong to a specific discussion.
    /// </summary>
    public class GetDiscussionMessagesListQueryHandler : IRequestHandler<GetDiscussionMessagesListQuery, Result<DiscussionMessagesListDto>> {
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

        public async Task<Result<DiscussionMessagesListDto>> Handle(GetDiscussionMessagesListQuery request, CancellationToken cancellationToken) {
            var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());
            if (user is null) Result<DiscussionMessagesListDto>.Failure("Unable to find user.", true);

            var queryable = _context.Messages.AsQueryable();
            var discussionMessages = await queryable
                .Where(x => x.Discussion.Id == request.DiscussionId)
                .ToListAsync();

            var list = new DiscussionMessagesListDto {
                Messages = _mapper.Map<List<Message>, List<DiscussionMessageDto>>(discussionMessages)
            };

            return Result<DiscussionMessagesListDto>.Success(list);
        }
    }
}
