using Application.Common.Dtos;
using Application.Common.Interfaces;
using Application.Errors;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Discussions.Commands.CreateDiscussionMessage {
    /// <summary>
    /// Creates a new discussion message.
    /// </summary>
    public class CreateDiscussionMessageCommandHandler : IRequestHandler<CreateDiscussionMessageCommand, DiscussionMessageDto> {
        private readonly ApplicationContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreateDiscussionMessageCommandHandler(ApplicationContext context, IUserAccessor userAccessor) {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<DiscussionMessageDto> Handle(CreateDiscussionMessageCommand request, CancellationToken cancellationToken) {
            var discussion = await _context.Discussions.FindAsync(request.DiscussionId);
            if (discussion == null) throw new RestException(HttpStatusCode.NotFound, new { Discussion = "Not found." });

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
            if (user == null) throw new RestException(HttpStatusCode.Unauthorized);

            var message = new Message {
                Discussion = discussion,
                Body = request.Body,
                CreatedBy = user
            };
            discussion.Messages.Add(message);

            var success = await _context.SaveChangesAsync() > 0;

            if (!success) throw new Exception("Unable to save new discussion message.");

            return new DiscussionMessageDto {
                Body = message.Body,
                CreatedAt = message.CreatedAt,
                CreatedBy = user.Name
            };
        }
    }
}
