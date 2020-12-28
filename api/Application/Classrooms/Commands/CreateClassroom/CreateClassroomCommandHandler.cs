using Application.Classrooms.Commands.CreateClassroom;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Classrooms {
    /// <summary>
    /// Creates a new classroom server.
    /// </summary>
    public class CreateClassroomCommandHandler : IRequestHandler<CreateClassroomCommand> {
        private readonly Persistence.ApplicationContext _context;
        private readonly IUserAccessor _userAccessor;

        public CreateClassroomCommandHandler(Persistence.ApplicationContext context, IUserAccessor userAccessor) {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Unit> Handle(CreateClassroomCommand request, CancellationToken cancellationToken) {
            var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());

            // Create the classroom.
            var classroom = new Classroom {
                Id = request.Id,
                Name = request.Name,
                DiscussionsCount = 0,
                CreatedBy = user
            };
            _context.Classrooms.Add(classroom);

            var student = new ApplicationUserClassroom(user.Id, classroom.Id, true, user, classroom);
            _context.ApplicationUserClassrooms.Add(student);

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return Unit.Value;

            throw new Exception("There was a problem saving changes.");
        }
    }
}
