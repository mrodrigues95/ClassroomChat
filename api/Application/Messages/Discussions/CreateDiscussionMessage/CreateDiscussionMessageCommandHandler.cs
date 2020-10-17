using Application.Errors;
using Application.Messages.Discussions.CreateDiscussionMessage;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Messages.Discussions {
    /// <summary>
    /// Creates a new discussion message.
    /// </summary>
    public class CreateDiscussionMessageCommandHandler : IRequestHandler<CreateDiscussionMessageCommand, DiscussionMessageDto> {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CreateDiscussionMessageCommandHandler(DataContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public async Task<DiscussionMessageDto> Handle(CreateDiscussionMessageCommand request, CancellationToken cancellationToken) {
            // Get the discussion this message belongs to.
            var discussion = await _context.Discussions.FindAsync(request.DiscussionId);

            // Discussion not found.
            if (discussion == null)
                throw new RestException(HttpStatusCode.NotFound, new { Discussion = "Not found." });

            // Get the details of the user who is sending the message.
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

            // Create the new message.
            var message = new DiscussionMessage {
                Author = user,
                Discussion = discussion,
                Body = request.Body,
                CreatedAt = DateTime.Now
            };
            discussion.Messages.Add(message);

            // Save changes to the database.
            var success = await _context.SaveChangesAsync() > 0;

            // Return the final response.
            if (success)
                return _mapper.Map<DiscussionMessageDto>(message);

            throw new Exception("There was a problem saving changes.");
        }
    }
}
