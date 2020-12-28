using Application.Classrooms.Commands.LeaveClassroom;
using Application.Common.Interfaces;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Classrooms {
    /// <summary>
    /// Allows a user to leave any classroom they are currently a part of.
    /// </summary>
    public class LeaveClassroomCommandHandler : IRequestHandler<LeaveClassroomCommand> {
        private readonly Persistence.ApplicationContext _context;
        private readonly IUserAccessor _userAccessor;

        public LeaveClassroomCommandHandler(Persistence.ApplicationContext context, IUserAccessor userAccessor) {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Unit> Handle(LeaveClassroomCommand request, CancellationToken cancellationToken) {
            // Get the classroom.
            var classroom = await _context.Classrooms.FindAsync(request.Id);

            // No classroom  was found with the given id.
            if (classroom == null) {
                throw new RestException(HttpStatusCode.NotFound, new { Classroom = "Could not find classroom." });
            }

            // Get the currently authorized user.
            var user = await _context.Users.SingleOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetCurrentUsername());
            var student = await _context.ApplicationUserClassrooms
                .SingleOrDefaultAsync(x => x.ClassroomId == classroom.Id &&
                    x.ApplicationUserId == user.Id);

            // They already left the classroom.
            if (student == null)
                return Unit.Value;

            // TODO: Implement functionality to hand over admin privileges to another user.
            if (student.IsCreator) {
                throw new RestException(HttpStatusCode.BadRequest, new { Classroom = "You cannot leave the classroom if you are the creator." });
            }

            // Save changes to the database.
            _context.ApplicationUserClassrooms.Remove(student);
            var success = await _context.SaveChangesAsync() > 0;

            // Return the final response.
            if (success) return Unit.Value;

            throw new Exception("There was a problem saving changes.");
        }
    }
}
