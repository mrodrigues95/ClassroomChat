using Application.Common;
using Application.Common.Dtos;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
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
            if (discussion is null) Result<DiscussionMessageDto>.Failure("Unable to find discussion.");

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
            if (user is null) Result<DiscussionMessageDto>.Failure("Unable to find user.", true);

            var message = new Message {
                Discussion = discussion,
                Body = request.Body,
                CreatedBy = user
            };
            discussion.Messages.Add(message);

            var success = await _context.SaveChangesAsync() > 0;
            if (!success) Result<DiscussionMessageDto>.Failure("There was a problem saving changes.");

            return new DiscussionMessageDto {
                Id = message.Id,
                Body = message.Body,
                CreatedAt = message.CreatedAt,
                CreatedBy = user.Name,
                CreatedByImageUrl = user.Photos.FirstOrDefault(x => x.IsCurrentUserPhoto)?.Url,
            };
        }
    }
}
