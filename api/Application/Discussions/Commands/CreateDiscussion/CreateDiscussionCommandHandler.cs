using Application.Common;
using Application.Common.Interfaces;
using Application.Discussions.Commands;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Classrooms.Discussions {
    /// <summary>
    /// Creates a new discussion channel.
    /// </summary>
    public class CreateDiscussionCommandHandler : IRequestHandler<CreateDiscussionCommand, Result<Unit>> {
        private readonly Persistence.ApplicationContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreateDiscussionCommandHandler(Persistence.ApplicationContext context, IUserAccessor userAccessor) {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(CreateDiscussionCommand request, CancellationToken cancellationToken) {
            // Get the currently authorized user.
            var user = await _context.Users.SingleOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetCurrentUsername());

            // Get the classroom that this discussion belongs to.
            var classroom = await _context.Classrooms.SingleOrDefaultAsync(x =>
                x.Id == request.ClassroomId);

            // Create a new entry in the Discussions table.
            var discussion = new Discussion {
                Id = request.Id,
                Name = request.Name,
                Classroom = classroom,
                CreatedBy = user
            };
            _context.Discussions.Add(discussion);

            // Save changes to the database.
            var success = await _context.SaveChangesAsync() > 0;

            // Return the final response.
            if (success) return Result<Unit>.Success(Unit.Value);

            return Result<Unit>.Failure("There was a problem saving changes.");
        }
    }
}
