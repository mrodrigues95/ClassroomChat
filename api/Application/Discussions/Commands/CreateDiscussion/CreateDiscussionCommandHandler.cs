using Application.Common.Interfaces;
using Application.Discussions.Commands;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Classrooms.Discussions {
    /// <summary>
    /// Creates a new discussion channel.
    /// </summary>
    public class CreateDiscussionCommandHandler : IRequestHandler<CreateDiscussionCommand> {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreateDiscussionCommandHandler(DataContext context, IUserAccessor userAccessor) {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Unit> Handle(CreateDiscussionCommand request, CancellationToken cancellationToken) {
            // Create a new entry in the Discussions table.
            var discussion = new Discussion {
                Id = request.Id,
                Name = request.Name,
            };
            _context.Discussions.Add(discussion);

            // Get the currently authorized user.
            var user = await _context.Users.SingleOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetCurrentUsername());

            // Get the classroom that this discussion belongs to.
            var classroom = await _context.Classrooms.SingleOrDefaultAsync(x =>
                x.Id == request.ClassroomId);

            // Create a new entry in the ClassroomDiscussions table.
            var classroomDiscussion = new ClassroomDiscussion {
                AppUser = user,
                Classroom = classroom,
                Discussion = discussion
            };
            _context.ClassroomDiscussions.Add(classroomDiscussion);

            // Save changes to the database.
            var success = await _context.SaveChangesAsync() > 0;

            // Return the final response.
            if (success)
                return Unit.Value;

            throw new Exception("There was a problem saving changes.");
        }
    }
}
