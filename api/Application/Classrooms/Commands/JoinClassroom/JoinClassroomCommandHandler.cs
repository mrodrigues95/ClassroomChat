using Application.Classrooms.Commands.JoinClassroom;
using Application.Common.Interfaces;
using Application.Errors;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Classrooms {
    /// <summary>
    /// Allows a user to join a classroom with an invite link.
    /// </summary>
    public class JoinClassroomCommandHandler : IRequestHandler<JoinClassroomCommand> {
        private readonly Persistence.ApplicationContext _context;
        private readonly IUserAccessor _userAccessor;

        public JoinClassroomCommandHandler(Persistence.ApplicationContext context, IUserAccessor userAccessor) {
            _context = context;
            _userAccessor = userAccessor;
        }

        // TODO: Need to check for expired tokens/invite links.
        // TODO: Need to update the 'Hits' column in the InviteLinks table whenever a token gets used successfully.
        public async Task<Unit> Handle(JoinClassroomCommand request, CancellationToken cancellationToken) {
            // Get the invite link and the related classroom id.
            var inviteLink = await _context.InviteLinks.SingleOrDefaultAsync(x =>
                x.Token == request.Token);

            // Get the classroom.
            var classroom = await _context.Classrooms.FindAsync(inviteLink.Classroom.Id);

            // No classroom was found with the given id.
            if (classroom == null) {
                throw new RestException(HttpStatusCode.NotFound, new { Classroom = "Could not find classroom." });
            }

            // Get the currently authorized user.
            var user = await _context.Users.SingleOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetCurrentUsername());
            var student = await _context.ApplicationUserClassrooms
                .SingleOrDefaultAsync(x => x.ClassroomId == classroom.Id &&
                    x.ApplicationUserId == user.Id);

            // User is already attending this classroom.
            if (student != null) {
                throw new RestException(HttpStatusCode.BadRequest, new { Students = "User is already participating in this classroom." });
            }

            // Create a new entry in the UserClassroom table.
            student = new ApplicationUserClassroom(user.Id, classroom.Id, true, user, classroom);
            _context.ApplicationUserClassrooms.Add(student);

            // Save changes to the database.
            var success = await _context.SaveChangesAsync() > 0;

            // Return the final response.
            if (success) return Unit.Value;

            throw new Exception("There was a problem saving changes.");
        }
    }
}
